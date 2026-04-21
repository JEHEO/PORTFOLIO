/**
 * Education 섹션 — 역연대순 학력.
 * - 카드도 구분선도 없이, typography 위계 + 넉넉한 수직 여백으로 항목을 분리합니다.
 * - 학점 등 부가 정보(notes) 는 선택 필드로, 학교명 아래 작게 노출됩니다.
 */

import React from "react";

import { Section, SectionTitle } from "@/components/ui/Section";
import type { EducationItem, Translation } from "@/lib/types/portfolio";

function EducationRow({
  item,
  isFirst,
}: {
  item: EducationItem;
  isFirst?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-baseline justify-between gap-2 py-5 ${
        isFirst ? "pt-0" : "border-t border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className="min-w-0">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
          {item.school}
        </h3>
        <p className="mt-0.5 text-sm text-zinc-500">
          {item.major}
          <span className="mx-1.5 text-zinc-300 dark:text-zinc-600">·</span>
          {item.degree}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <span className="font-mono text-[11px] text-zinc-400">
          {item.period}
        </span>
        {item.notes && item.notes.length > 0 && (
          <ul className="mt-1 space-y-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {item.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function EducationSection({ t }: { t: Translation }) {
  if (t.education.length === 0) return null;
  return (
    <Section id="education">
      <SectionTitle>{t.educationLabel}</SectionTitle>
      <div>
        {t.education.map((item, i) => (
          <EducationRow
            key={`${item.school}-${item.period}`}
            item={item}
            isFirst={i === 0}
          />
        ))}
      </div>
    </Section>
  );
}
