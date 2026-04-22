/**
 * 프로젝트 상세의 커밋 컨벤션 섹션.
 * - 타입 레전드 + 실제 파이프라인에서 가져온 샘플 커밋을 함께 노출합니다.
 * - 커밋 메시지는 현재 언어(`lang`)에 따라 ko/en 으로 스위칭됩니다.
 */

import React from "react";

import { COMMIT_COLORS, COMMIT_SAMPLES } from "@/lib/data/code-showcase";
import type { Lang } from "@/lib/stores/uiStore";

export function CommitConventionSection({
  label,
  desc,
  lang,
}: {
  label: string;
  desc: string;
  lang: Lang;
}) {
  return (
    <div className="mt-6 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {label}
      </p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
      {/* Type legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(COMMIT_COLORS).map(([type, cls]) => (
          <span
            key={type}
            className={`rounded px-2 py-0.5 text-[11px] font-bold ${cls}`}
          >
            {type}
          </span>
        ))}
      </div>
      {/* Actual commit samples — 구분선 없이 컬러 type chip 을 시각 앵커로 사용 */}
      <div className="space-y-1">
        {COMMIT_SAMPLES.map((c) => (
          <div
            key={`${c.type}-${c.num}-${c.message}`}
            className="flex items-center gap-3 py-1 text-sm"
          >
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold ${
                COMMIT_COLORS[c.type] ?? COMMIT_COLORS.chore
              }`}
            >
              {c.type}
            </span>
            <span className="text-zinc-700 dark:text-zinc-300">
              {lang === "ko" ? c.message : c.messageEn}
            </span>
            <span className="ml-auto shrink-0 font-mono text-[11px] text-zinc-400">
              #{c.num}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
