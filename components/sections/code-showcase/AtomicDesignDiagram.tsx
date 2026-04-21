/**
 * Atomic Design 5계층 다이어그램.
 * - 텍스트 버튼이 단계적으로 커지며 위계를 시각화합니다.
 */

import React from "react";

const LAYERS = [
  {
    label: "Atoms",
    color:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    examples: "Button, Input, Badge",
  },
  {
    label: "Molecules",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    examples: "SearchBar, FormField",
  },
  {
    label: "Organisms",
    color:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    examples: "Header, DataTable",
  },
  {
    label: "Templates",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    examples: "DashboardLayout",
  },
  {
    label: "Pages",
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    examples: "AdminPage, LoginPage",
  },
] as const;

export function AtomicDesignDiagram({ desc }: { desc: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-accent-500">
        Atomic Design
      </p>
      <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
      <div className="flex flex-col gap-2">
        {LAYERS.map((l, i) => (
          <div key={l.label} className="flex items-center gap-3">
            <div
              className="flex h-7 items-center justify-center rounded text-[11px] font-bold"
              style={{ minWidth: `${56 + i * 20}px` }}
            >
              <span className={`rounded px-2 py-0.5 ${l.color}`}>
                {l.label}
              </span>
            </div>
            <span className="text-xs text-zinc-400">{l.examples}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
