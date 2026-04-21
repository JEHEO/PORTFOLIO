/**
 * About 섹션 — 짧은 자기소개 문단.
 *
 * - 각 문단은 `AboutParagraphSegment[]` 이며, `emphasis: true` 인 조각은 진한 bold 로 렌더됩니다.
 * - 카드 없이 평면 텍스트. 채용 담당자가 가장 먼저 보도록 섹션 상단에 배치.
 */

import React from "react";

import { Section, SectionTitle } from "@/components/ui/Section";
import type { Translation } from "@/lib/types/portfolio";

export function AboutSection({ t }: { t: Translation }) {
  return (
    <Section id="about" first>
      <SectionTitle>{t.aboutLabel}</SectionTitle>
      <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
        {t.about.heading}
      </h3>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {t.about.paragraphs.map((segments, i) => (
          <p key={i}>
            {segments.map((seg, j) =>
              seg.emphasis ? (
                <strong
                  key={j}
                  className="font-semibold text-zinc-900 dark:text-white"
                >
                  {seg.text}
                </strong>
              ) : (
                <React.Fragment key={j}>{seg.text}</React.Fragment>
              ),
            )}
          </p>
        ))}
      </div>
    </Section>
  );
}
