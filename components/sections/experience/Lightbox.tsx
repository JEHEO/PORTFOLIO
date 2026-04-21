/* eslint-disable @next/next/no-img-element */

/**
 * 이미지/영상 라이트박스 모달.
 *
 * 기능
 * - React Portal 로 `document.body` 에 마운트되어 상위 컴포넌트의 z-index/overflow 영향 없음
 * - 키보드: ESC(닫기) · ←/→ (이전/다음)
 * - 터치: 가로 스와이프로 이전/다음 (수평 이동 > 수직 이동 && > 50px)
 * - 배경 클릭 시 닫기 (미디어 클릭은 이벤트 전파 차단으로 유지)
 * - 열려 있는 동안 body 스크롤 잠금
 * - 영상은 `<video controls>` 로 재생 (라이트박스 내에서는 사운드 ON 가능)
 * - 단일 아이템 그룹에서는 좌/우 버튼과 카운터가 자동 숨김
 */

"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import type { ScreenshotItem } from "@/lib/types/portfolio";

const SWIPE_THRESHOLD_PX = 50;

/**
 * 비디오 파일 확장자에 맞는 MIME 타입 hint.
 * - `.mov` 는 `video/quicktime`, 그 외는 `video/mp4` 기본값.
 */
function guessVideoType(src: string): string {
  const ext = src.toLowerCase().split("?")[0].split("#")[0].split(".").pop();
  if (ext === "mov") return "video/quicktime";
  if (ext === "webm") return "video/webm";
  if (ext === "ogg" || ext === "ogv") return "video/ogg";
  return "video/mp4";
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: ScreenshotItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  // 키보드 · body 스크롤 잠금
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 스크린 리더/포커스 흐름: 닫기 버튼에 초기 포커스
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  // 스와이프 검출 (터치 전용)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    swipeStartRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (
      Math.abs(dx) > SWIPE_THRESHOLD_PX &&
      Math.abs(dx) > Math.abs(dy)
    ) {
      if (dx > 0) onPrev();
      else onNext();
    }
  };

  const item = items[index];
  if (!item) return null;
  // Portal 대상인 document 가 없는 환경(SSR)에서는 렌더하지 않음.
  // 이 컴포넌트는 클라이언트 상호작용(`open` state)으로만 마운트되므로 실질적인 영향은 없지만 안전 가드.
  if (typeof document === "undefined") return null;

  const hasMulti = items.length > 1;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="image viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* 닫기 버튼 */}
      <button
        ref={closeBtnRef}
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <CloseIcon />
      </button>

      {/* 이전 */}
      {hasMulti && (
        <button
          type="button"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="fixed top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronLeft />
        </button>
      )}

      {/* 다음 */}
      {hasMulti && (
        <button
          type="button"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="fixed top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronRight />
        </button>
      )}

      {/* 미디어 — 배경 클릭으로 닫는 동작과 분리하기 위해 propagation 중단 */}
      <div
        className="relative flex max-h-[90vh] max-w-[92vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.video ? (
          <video
            key={item.src}
            className="max-h-[90vh] max-w-[92vw] rounded-lg shadow-2xl"
            controls
            autoPlay
            playsInline
            poster={item.poster}
            aria-label={item.alt}
          >
            <source src={item.src} type={guessVideoType(item.src)} />
          </video>
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            draggable={false}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />
        )}
      </div>

      {/* 카운터 */}
      {hasMulti && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white">
          {index + 1} / {items.length}
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}
