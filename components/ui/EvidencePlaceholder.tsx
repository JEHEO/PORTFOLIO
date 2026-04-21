/* eslint-disable @next/next/no-img-element */

/**
 * 증거(스크린샷) placeholder.
 *
 * - `src` 가 비어 있으면 점선 박스 + 사용자용 "준비 중" 라벨이 보입니다.
 * - 개발자 메모(`hint`) 는 UI 에 노출되지 않고 `title` 속성으로만 남깁니다
 *   → 내부 파일 경로가 외부에 보이지 않습니다.
 */

import React from "react";

import type { EvidenceItem } from "@/lib/data/project-detail";

export function EvidencePlaceholder({
  label,
  hint,
  src,
  pendingLabel,
}: EvidenceItem & { pendingLabel: string }) {
  if (src) {
    return (
      <div className="space-y-1">
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {label}
        </p>
        <img
          src={src}
          alt={label}
          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700"
        />
      </div>
    );
  }
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </p>
      <div
        title={hint}
        className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30"
      >
        <svg
          className="h-6 w-6 text-zinc-300 dark:text-zinc-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500">
          {pendingLabel}
        </p>
      </div>
    </div>
  );
}

export function EvidenceSection({
  sectionLabel,
  items,
  pendingLabel,
}: {
  sectionLabel: string;
  items: EvidenceItem[];
  pendingLabel: string;
}) {
  return (
    <div className="mt-6 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {sectionLabel}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <EvidencePlaceholder
            key={item.label}
            {...item}
            pendingLabel={pendingLabel}
          />
        ))}
      </div>
    </div>
  );
}
