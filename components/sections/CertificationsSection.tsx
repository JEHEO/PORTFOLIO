/**
 * Certifications & Awards 섹션.
 *
 * - "공식 문서" 느낌을 주기 위해 수직 타이포 카드로 구성.
 *   Contact (가로형 인터랙션 카드, 아이콘 칩) 과 구조적으로 구분됩니다.
 * - 각 카드: 좌측 accent 스트라이프 + 상단 날짜 액센트 + 제목(굵게) + 발급기관(보조) 구성.
 * - 자격증(3열) / 수상(2열) 그리드. 두 블록 중 비어있는 쪽은 자동 숨김.
 */

import React from "react";

import { Section, SectionTitle } from "@/components/ui/Section";
import type {
  AwardItem,
  CertificationItem,
  Translation,
} from "@/lib/types/portfolio";

// ─── 수직 문서형 카드 (공통) ─────────────────────────────────────────────────
//
// 좌측에 4px accent 스트라이프 + 수직 타이포 컨텐츠.
// Contact 섹션의 "아이콘 칩 + 가로형" 과 명확히 구분되도록 구조적으로 분리했습니다.
function DocumentCard({
  date,
  title,
  subtitle,
  description,
  href,
}: {
  date: string;
  title: string;
  subtitle: string;
  description?: string;
  href?: string;
}) {
  const inner = (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 pl-6 transition-all hover:-translate-y-0.5 hover:border-accent-500/50 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-accent-500/40">
      {/* 좌측 accent 스트라이프 — "공식 문서" 분위기 */}
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-1 bg-accent-500/40 transition-colors group-hover:bg-accent-500"
      />
      {/* 날짜 액센트 — 시각적 anchor */}
      <p className="font-mono text-[11px] font-bold tracking-wider text-accent-500 uppercase">
        {date}
      </p>
      {/* 자격 이름 */}
      <p className="mt-2.5 text-sm font-bold leading-snug text-zinc-900 dark:text-white">
        {title}
      </p>
      {/* 발급 기관 */}
      <p className="mt-1 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
        {subtitle}
      </p>
      {description && (
        <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

function CertificationCell({ item }: { item: CertificationItem }) {
  return (
    <DocumentCard
      date={item.date}
      title={item.name}
      subtitle={item.issuer}
      href={item.href}
    />
  );
}

function AwardCell({ item }: { item: AwardItem }) {
  return (
    <DocumentCard
      date={item.date}
      title={item.title}
      subtitle={item.issuer}
      description={item.description}
    />
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
        <div className="grid gap-3 sm:grid-cols-3">
          {t.certifications.map((c) => (
            <CertificationCell key={`${c.name}-${c.date}`} item={c} />
          ))}
        </div>
      )}
      {hasAwards && (
        <div className={hasCerts ? "mt-8" : ""}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {t.awardsLabel}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.awards.map((a) => (
              <AwardCell key={`${a.title}-${a.date}`} item={a} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
