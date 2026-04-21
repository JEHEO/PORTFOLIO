/**
 * Impact at a Glance — 핵심 정량 지표 스트립.
 *
 * - About 바로 아래에 배치해 "이 지원자가 만든 영향력" 을 한 화면에 요약합니다.
 * - 큰 숫자(`value`) · 한 줄 설명(`label`) · 보조 문구(`hint`) 3요소.
 */

import React from "react";

import { Section, SectionTitle } from "@/components/ui/Section";
import type { Translation } from "@/lib/types/portfolio";

export function ImpactStrip({ t }: { t: Translation }) {
  if (t.impactMetrics.length === 0) return null;
  return (
    <Section id="impact">
      <SectionTitle>{t.impactLabel}</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2">
        {t.impactMetrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-accent-500/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-accent-500/40"
          >
            <p className="mb-1 font-mono text-2xl font-bold text-accent-500">
              {m.value}
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              {m.label}
            </p>
            {m.hint && (
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {m.hint}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
