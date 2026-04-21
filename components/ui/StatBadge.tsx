/**
 * 프로젝트 상세 블록의 통계 배지 (아이콘 · 값 · 라벨 3요소).
 */

import React from "react";

export function StatBadge({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="text-sm font-bold text-zinc-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-zinc-500">{label}</p>
      </div>
    </div>
  );
}
