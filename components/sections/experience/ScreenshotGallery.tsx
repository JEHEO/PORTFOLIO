/* eslint-disable @next/next/no-img-element */

/**
 * 프로젝트 스크린샷/영상 갤러리.
 *
 * 레이아웃
 * - `cylinder` (기본): 3D 원통형 카루셀. 자동 회전 + 드래그 회전.
 * - `scroll`: 평면 가로 드래그 스크롤 (다이어그램/영상 혼합 그룹용).
 *
 * 오리엔테이션
 * - `portrait` (기본): 모바일 스크린샷용 170×340 카드.
 * - `landscape`: 웹 스크린샷용 340×200 카드.
 *
 * 썸네일 클릭 → 라이트박스 모달로 원본 크게 보기.
 * - 드래그와 클릭은 포인터 이동량 5px 기준으로 구분합니다.
 */

"use client";

import React, { useRef, useState } from "react";

import type {
  ScreenshotGroup,
  ScreenshotItem,
} from "@/lib/types/portfolio";

import { Lightbox } from "./Lightbox";

// ─── 스타일 / 치수 상수 ───────────────────────────────────────────────────────

type Orientation = "portrait" | "landscape";
const PRESETS: Record<
  Orientation,
  { cardW: number; cardH: number; stageH: number }
> = {
  portrait: { cardW: 170, cardH: 340, stageH: 400 },
  landscape: { cardW: 450, cardH: 280, stageH: 340 },
};

const GAP = 24; // px — 인접 카드 사이 최소 간격 (원주 기준)
const MIN_RADIUS = 220; // px — 아이템 수가 적어도 너무 얇아지지 않도록 하한
const AUTO_ROTATE_DEG_PER_FRAME = 0.06; // ≈ 3.6°/sec @60fps — 천천히
const DRAG_PX_PER_DEG = 3; // 드래그 감도. 숫자가 클수록 둔해짐
const DRAG_RESUME_MS = 1200; // 드래그 손 뗀 뒤 자동 회전 재개까지 대기
const CLICK_THRESHOLD_PX = 8; // 이 이하로 움직였으면 드래그가 아닌 클릭으로 판정 (마우스 미세 떨림 흡수)

/**
 * 비디오 파일 확장자에 맞는 MIME 타입을 반환합니다.
 * - `.mov` (QuickTime) 는 `video/quicktime`, 그 외는 `video/mp4` 기본값.
 * - 브라우저는 실제로는 내부 코덱으로 재생 가능 여부를 판단하므로, 이 hint 는 보조용입니다.
 */
function guessVideoType(src: string): string {
  const ext = src.toLowerCase().split("?")[0].split("#")[0].split(".").pop();
  if (ext === "mov") return "video/quicktime";
  if (ext === "webm") return "video/webm";
  if (ext === "ogg" || ext === "ogv") return "video/ogg";
  return "video/mp4";
}

// ─── Thumbnail (카드 내부 렌더) ───────────────────────────────────────────────

function Thumbnail({ item }: { item: ScreenshotItem }) {
  // 카드 영역을 꽉 채우도록 object-cover. 비율이 다르면 가장자리가 잘릴 수 있음.
  const className =
    "pointer-events-none h-full w-full rounded-xl border border-zinc-200 bg-zinc-50 object-cover shadow-lg dark:border-zinc-700 dark:bg-zinc-900";
  if (item.video) {
    return (
      <video
        className={className}
        autoPlay
        muted
        loop
        playsInline
        poster={item.poster}
        aria-label={item.alt}
      >
        <source src={item.src} type={guessVideoType(item.src)} />
      </video>
    );
  }
  return (
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      draggable={false}
      className={className}
    />
  );
}

// ─── 이벤트 → 아이템 인덱스 추출 헬퍼 ────────────────────────────────────────
//
// 중요: setPointerCapture 가 활성화된 상태에서는 `event.target` 이 캡처 대상 요소로 고정되어
// 하위 아이템을 찾을 수 없습니다. 실제 포인터 위치의 요소를 얻으려면
// `document.elementFromPoint(clientX, clientY)` 를 사용해야 합니다.
// (Thumbnail 이미지/영상에 `pointer-events-none` 을 줘 두었기 때문에 hit-test 결과는 항상 래퍼 div 입니다.)

function resolveClickedItemIndex(
  clientX: number,
  clientY: number,
): number | null {
  if (typeof document === "undefined") return null;
  const el = document.elementFromPoint(clientX, clientY);
  if (!el) return null;
  const itemEl = el.closest("[data-item-index]") as HTMLElement | null;
  if (!itemEl) return null;
  const raw = itemEl.getAttribute("data-item-index");
  if (!raw) return null;
  const idx = parseInt(raw, 10);
  return Number.isFinite(idx) ? idx : null;
}

// ─── Cylinder ────────────────────────────────────────────────────────────────

function Cylinder({
  items,
  orientation = "portrait",
  onItemClick,
}: {
  items: ScreenshotItem[];
  orientation?: Orientation;
  onItemClick?: (index: number) => void;
}) {
  const { cardW, cardH, stageH } = PRESETS[orientation];
  const innerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStateRef = useRef({
    startX: 0,
    startRotation: 0,
    maxAbsDx: 0,
  });
  const autoRotateTimerRef = useRef<number | null>(null);
  const autoRotatePausedRef = useRef(false);

  const n = items.length;
  const angularStep = 360 / n;
  const computedRadius =
    (cardW + GAP) / (2 * Math.sin((angularStep / 2) * (Math.PI / 180)));
  const radius = Math.max(MIN_RADIUS, computedRadius);

  // 자동 회전 RAF
  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let rafId = 0;
    const applyTransform = () => {
      if (innerRef.current) {
        innerRef.current.style.transform = `translateZ(-${radius}px) rotateY(${rotationRef.current}deg)`;
      }
    };

    const tick = () => {
      if (
        !isDraggingRef.current &&
        !autoRotatePausedRef.current &&
        !prefersReducedMotion
      ) {
        rotationRef.current -= AUTO_ROTATE_DEG_PER_FRAME;
      }
      applyTransform();
      rafId = requestAnimationFrame(tick);
    };

    applyTransform();
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [radius]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    autoRotatePausedRef.current = true;
    dragStateRef.current = {
      startX: e.clientX,
      startRotation: rotationRef.current,
      maxAbsDx: 0,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    if (autoRotateTimerRef.current !== null) {
      window.clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStateRef.current.startX;
    if (Math.abs(dx) > dragStateRef.current.maxAbsDx) {
      dragStateRef.current.maxAbsDx = Math.abs(dx);
    }
    rotationRef.current =
      dragStateRef.current.startRotation + dx / DRAG_PX_PER_DEG;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const wasClick = dragStateRef.current.maxAbsDx < CLICK_THRESHOLD_PX;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }

    if (wasClick && onItemClick) {
      const idx = resolveClickedItemIndex(e.clientX, e.clientY);
      if (idx !== null) onItemClick(idx);
    }

    autoRotateTimerRef.current = window.setTimeout(() => {
      autoRotatePausedRef.current = false;
      autoRotateTimerRef.current = null;
    }, DRAG_RESUME_MS);
  };

  return (
    <div
      className="relative w-full cursor-grab overflow-hidden select-none active:cursor-grabbing"
      style={{
        height: `${stageH}px`,
        perspective: "1100px",
        touchAction: "pan-y",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      role="group"
      aria-label="screenshot carousel — drag to rotate, click to enlarge"
    >
      <div
        ref={innerRef}
        className="absolute top-1/2 left-1/2"
        style={{
          width: `${cardW}px`,
          height: `${cardH}px`,
          marginLeft: `-${cardW / 2}px`,
          marginTop: `-${cardH / 2}px`,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.src}
            data-item-index={i}
            className="absolute inset-0 cursor-zoom-in"
            style={{
              transform: `rotateY(${i * angularStep}deg) translateZ(${radius}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <Thumbnail item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ScrollRow — 평면 가로 드래그 스크롤 ─────────────────────────────────────

function ScrollThumbnail({ item }: { item: ScreenshotItem }) {
  const className =
    "pointer-events-none h-full w-auto rounded-xl border border-zinc-200 bg-zinc-50 object-contain dark:border-zinc-700 dark:bg-zinc-900";
  if (item.video) {
    return (
      <video
        className={className}
        autoPlay
        muted
        loop
        playsInline
        poster={item.poster}
        aria-label={item.alt}
      >
        <source src={item.src} type={guessVideoType(item.src)} />
      </video>
    );
  }
  return (
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      draggable={false}
      className={className}
    />
  );
}

function ScrollRow({
  items,
  onItemClick,
}: {
  items: ScreenshotItem[];
  onItemClick?: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStateRef = useRef({
    startX: 0,
    startScrollLeft: 0,
    maxAbsDx: 0,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // 터치는 네이티브 스크롤에 맡김
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    dragStateRef.current = {
      startX: e.clientX,
      startScrollLeft: scrollRef.current.scrollLeft,
      maxAbsDx: 0,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const dx = e.clientX - dragStateRef.current.startX;
    if (Math.abs(dx) > dragStateRef.current.maxAbsDx) {
      dragStateRef.current.maxAbsDx = Math.abs(dx);
    }
    scrollRef.current.scrollLeft =
      dragStateRef.current.startScrollLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      // 터치 클릭(핸들러가 개입하지 않은 경우) — 그래도 클릭 감지 수행
      if (e.pointerType === "touch" && onItemClick) {
        const idx = resolveClickedItemIndex(e.clientX, e.clientY);
        if (idx !== null) onItemClick(idx);
      }
      return;
    }
    const wasClick = dragStateRef.current.maxAbsDx < CLICK_THRESHOLD_PX;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    if (wasClick && onItemClick) {
      const idx = resolveClickedItemIndex(e.clientX, e.clientY);
      if (idx !== null) onItemClick(idx);
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex cursor-grab gap-3 overflow-x-auto overflow-y-hidden pb-4 select-none active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      {items.map((item, i) => (
        <div
          key={item.src}
          data-item-index={i}
          className="h-72 w-auto shrink-0 cursor-zoom-in"
          style={{ minWidth: "4rem" }}
        >
          <ScrollThumbnail item={item} />
        </div>
      ))}
    </div>
  );
}

// ─── Gallery (그룹 단위 + 라이트박스 상태 관리) ──────────────────────────────

type LightboxState = { groupIndex: number; itemIndex: number } | null;

export function ScreenshotGallery({
  groups,
}: {
  groups: ScreenshotGroup[];
}) {
  const [open, setOpen] = useState<LightboxState>(null);

  const close = () => setOpen(null);
  const activeItems =
    open !== null ? groups[open.groupIndex]?.items ?? [] : [];
  const navigate = (delta: number) => {
    if (!open) return;
    const total = activeItems.length;
    if (total === 0) return;
    setOpen({
      groupIndex: open.groupIndex,
      itemIndex: (open.itemIndex + delta + total) % total,
    });
  };

  if (groups.length === 0) return null;

  return (
    <>
      <div className="space-y-8">
        {groups.map((group, gi) => {
          const layout = group.layout ?? "cylinder";
          const orientation = group.orientation ?? "portrait";
          const preset = PRESETS[orientation];
          const handleClick = (itemIndex: number) =>
            setOpen({ groupIndex: gi, itemIndex });

          return (
            <div key={group.label ?? `group-${gi}`}>
              {group.label && (
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {group.label}
                </p>
              )}
              {group.items.length <= 1 ? (
                // 1개짜리 그룹 — 정적 + 클릭으로 라이트박스
                <div className="flex justify-center">
                  <div
                    data-item-index={0}
                    className="cursor-zoom-in"
                    style={{
                      width: `${preset.cardW}px`,
                      height: `${preset.cardH}px`,
                    }}
                    onClick={() => group.items[0] && handleClick(0)}
                  >
                    {group.items[0] && <Thumbnail item={group.items[0]} />}
                  </div>
                </div>
              ) : layout === "scroll" ? (
                <ScrollRow
                  items={group.items}
                  onItemClick={handleClick}
                />
              ) : (
                <Cylinder
                  items={group.items}
                  orientation={orientation}
                  onItemClick={handleClick}
                />
              )}
            </div>
          );
        })}
      </div>

      {open && activeItems.length > 0 && (
        <Lightbox
          items={activeItems}
          index={open.itemIndex}
          onClose={close}
          onPrev={() => navigate(-1)}
          onNext={() => navigate(1)}
        />
      )}
    </>
  );
}
