/**
 * 프로젝트 상세의 디렉토리 구조 트리.
 * - 외곽 카드 없이, 라벨 + monospace 블록만 노출합니다. 계층은 들여쓰기로 전달.
 */

import React from "react";

export function ArchitectureTree({
  architecture,
}: {
  architecture: { label: string; items: string[] }[];
}) {
  return (
    <div className="mt-6 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        Project Architecture
      </p>
      <div className="font-mono text-xs">
        <p className="mb-2 text-zinc-400">src/</p>
        {architecture.map((dir) => (
          <div key={dir.label} className="mb-2 ml-3">
            <p className="font-semibold text-accent-500">{dir.label}</p>
            {dir.items.map((item) => (
              <p
                key={item}
                className="ml-3 text-zinc-500 dark:text-zinc-400"
              >
                └ {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
