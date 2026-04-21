/**
 * Clean Code Showcase 섹션.
 * - Atomic Design 다이어그램 + Custom Hook 설명 + 핵심 파일 리스트 구성.
 */

import React from "react";

import { AtomicDesignDiagram } from "@/components/sections/code-showcase/AtomicDesignDiagram";
import { CodeFileRow } from "@/components/ui/CodeFileRow";
import { Section, SectionTitle } from "@/components/ui/Section";
import { CODE_FILES } from "@/lib/data/code-showcase";
import type { Lang } from "@/lib/stores/uiStore";
import type { Translation } from "@/lib/types/portfolio";

export function CodeShowcaseSection({
  t,
  lang,
}: {
  t: Translation;
  lang: Lang;
}) {
  return (
    <Section id="code-showcase">
      <SectionTitle>{t.codeShowcaseLabel}</SectionTitle>
      <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        {t.codeShowcaseDesc}
      </p>
      <div className="space-y-6">
        <AtomicDesignDiagram desc={t.atomicDesignDesc} />
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {t.hooksDesc}
          </p>
          {CODE_FILES.map((file) => (
            <CodeFileRow
              key={file.label}
              {...file}
              lang={lang}
              btnLabel={t.codeShowcaseBtnLabel}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
