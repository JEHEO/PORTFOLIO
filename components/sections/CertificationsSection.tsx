/**
 * Certifications & Awards 섹션.
 *
 * - 카드/구분선 없이 3열 인라인 그리드로 배치. typography 위계(날짜→이름→발급기관) 로 분리.
 * - 자격증과 수상 두 블록 중 비어 있는 쪽은 자동 숨김.
 */

import React from "react";

import { Section, SectionTitle } from "@/components/ui/Section";
import type {
  AwardItem,
  CertificationItem,
  Translation,
} from "@/lib/types/portfolio";

function CertificationCell({ item }: { item: CertificationItem }) {
  const content = (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[11px] text-zinc-400">{item.date}</span>
      <p className="text-sm font-semibold leading-snug text-zinc-900 dark:text-white">
        {item.name}
      </p>
      <p className="text-xs leading-snug text-zinc-500 dark:text-zinc-400">
        {item.issuer}
      </p>
    </div>
  );
  return item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="block transition-colors hover:text-accent-600 dark:hover:text-accent-400"
    >
      {content}
    </a>
  ) : (
    content
  );
}

function AwardCell({ item }: { item: AwardItem }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[11px] text-zinc-400">{item.date}</span>
      <p className="text-sm font-semibold leading-snug text-zinc-900 dark:text-white">
        {item.title}
      </p>
      <p className="text-xs leading-snug text-zinc-500 dark:text-zinc-400">
        {item.issuer}
      </p>
      {item.description && (
        <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {item.description}
        </p>
      )}
    </div>
  );
}

export function CertificationsSection({ t }: { t: Translation }) {
  const hasCerts = t.certifications.length > 0;
  const hasAwards = t.awards.length > 0;
  if (!hasCerts && !hasAwards) return null;

  return (
    <Section id="certifications">
      <SectionTitle>{t.certificationsLabel}</SectionTitle>
      {hasCerts && (
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
          {t.certifications.map((c) => (
            <CertificationCell key={`${c.name}-${c.date}`} item={c} />
          ))}
        </div>
      )}
      {hasAwards && (
        <div className={hasCerts ? "mt-10" : ""}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {t.awardsLabel}
          </p>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {t.awards.map((a) => (
              <AwardCell key={`${a.title}-${a.date}`} item={a} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
