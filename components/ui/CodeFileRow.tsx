/**
 * Clean Code Showcase 섹션의 파일 row.
 *
 * - 행 자체가 `<details>` 기반 disclosure 입니다. 클릭하면 패턴을 보여주는 코드 스니펫이
 *   인라인으로 펼쳐집니다.
 * - 스니펫은 실무 회사 코드가 아닌 **NDA-safe 한 교과서적 예시** (`lib/data/code-showcase.ts`).
 */

import React from "react";

import { ArrowRightIcon } from "@/components/icons";
import type { CodeFile } from "@/lib/data/code-showcase";
import type { Lang } from "@/lib/stores/uiStore";

export function CodeFileRow({
  label,
  path,
  patterns,
  desc,
  descEn,
  snippet,
  lang,
}: CodeFile & { lang: Lang }) {
  return (
    <details className="group/code overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-accent-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-accent-500/60">
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              {label}
            </span>
            {patterns.map((p) => (
              <span
                key={p}
                className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="font-mono text-[10px] text-zinc-400">{path}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {lang === "ko" ? desc : descEn}
          </p>
        </div>
        <ArrowRightIcon className="h-4 w-4 shrink-0 rotate-90 text-zinc-400 transition-transform group-open/code:rotate-[270deg] group-hover/code:text-accent-500" />
      </summary>
      {/* 코드 스니펫 — 어두운 톤으로 IDE 느낌 */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <pre className="overflow-x-auto bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-100">
          <code className="font-mono">{snippet}</code>
        </pre>
      </div>
    </details>
  );
}
