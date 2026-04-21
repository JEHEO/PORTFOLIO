/**
 * Clean Code Showcase 섹션의 파일 row.
 * - `href === "#"` 또는 빈 문자열이면 자동으로 비활성(🔒) 처리됩니다.
 */

import React from "react";

import { GitHubIcon } from "@/components/icons";
import type { CodeFile } from "@/lib/data/code-showcase";
import type { Lang } from "@/lib/stores/uiStore";

export function CodeFileRow({
  label,
  path,
  href,
  patterns,
  desc,
  descEn,
  lang,
  btnLabel,
}: CodeFile & { lang: Lang; btnLabel: string }) {
  const isPlaceholder = !href || href === "#";
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:flex-row sm:items-center">
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
      <a
        href={isPlaceholder ? undefined : href}
        target={isPlaceholder ? undefined : "_blank"}
        rel="noreferrer"
        aria-disabled={isPlaceholder}
        className={`inline-flex shrink-0 items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
          isPlaceholder
            ? "cursor-default border-zinc-200 text-zinc-300 dark:border-zinc-800 dark:text-zinc-600"
            : "border-zinc-200 text-zinc-600 hover:border-blue-400 hover:text-blue-500 dark:border-zinc-700 dark:text-zinc-400"
        }`}
      >
        <GitHubIcon />
        {btnLabel}
        {isPlaceholder && <span className="ml-0.5 opacity-50">🔒</span>}
      </a>
    </div>
  );
}
