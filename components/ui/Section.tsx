/**
 * 섹션 공통 래퍼 및 섹션 타이틀.
 * - 첫 섹션만 상단 구분선을 생략합니다(`first` prop).
 */

import React from "react";

export const SectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="mb-8 flex items-center gap-3">
    <div className="h-4 w-0.5 shrink-0 rounded-full bg-blue-500" />
    <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
      {children}
    </h2>
    <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
  </div>
);

export function Section({
  id,
  first = false,
  children,
}: {
  id: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 pb-20 ${first ? "" : "pt-14"}`}
    >
      {children}
    </section>
  );
}
