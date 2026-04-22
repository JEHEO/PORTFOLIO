/**
 * Experience 섹션 — 회사 요약 카드 + 프로젝트 리스트.
 *
 * - 진행 중인 Next.js 프로젝트(`hasDetail: true`) 는 기본적으로 "상세 보기"
 *   디스클로저로 접혀 있습니다. Bomulsen 과의 시각적 무게 역전을 방지하기 위한 조치.
 */

import React from "react";

import { ArrowRightIcon } from "@/components/icons";
import { AtomicDesignDiagram } from "@/components/sections/code-showcase/AtomicDesignDiagram";
import { ArchitectureTree } from "@/components/sections/experience/ArchitectureTree";
import { CommitConventionSection } from "@/components/sections/experience/CommitConventionSection";
import { ScreenshotGallery } from "@/components/sections/experience/ScreenshotGallery";
import { TechStackGrid } from "@/components/sections/experience/TechStackGrid";
// import { EvidenceSection } from "@/components/ui/EvidencePlaceholder"; // 증거 섹션 보류 중
import { Section, SectionTitle } from "@/components/ui/Section";
import { StatBadge } from "@/components/ui/StatBadge";
import {
  // EVIDENCE_CONVENTION, // RN 0.76 · 팀 컨벤션 증거 섹션 보류 중
  // EVIDENCE_RN076,
  PROJECT_DETAIL,
} from "@/lib/data/project-detail";
import type { Lang } from "@/lib/stores/uiStore";
import type { Project, Translation } from "@/lib/types/portfolio";

function ProjectCard({
  project,
  index,
  t,
  lang,
}: {
  project: Project;
  index: number;
  t: Translation;
  lang: Lang;
}) {
  return (
    <article className="group">
      {/* 프로젝트 번호 구분선 */}
      <div className="mb-5 flex items-center gap-3">
        <span className="text-accent-500 font-mono text-[11px] font-bold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* 프로젝트 헤더 */}
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="group-hover:text-accent-500 text-base font-bold text-zinc-900 transition-colors dark:text-white">
          {project.title}
        </h4>
        <span className="rounded border border-zinc-200 px-2 py-0.5 text-[10px] font-bold text-zinc-400 uppercase dark:border-zinc-800">
          {project.tag}
        </span>
      </div>
      <p className="mb-4 text-sm font-medium text-zinc-500">{project.sub}</p>
      <ul className={"mb-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-300"}>
        {project.details.map((detail) => (
          <li key={detail} className="flex gap-2">
            <span className="text-zinc-400">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      {/* 스크린샷/영상 — 데이터 없으면 회색 placeholder 로 대체 */}
      {project.screenshots && project.screenshots.length > 0 ? (
        <ScreenshotGallery groups={project.screenshots} />
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 w-28 shrink-0 rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
            />
          ))}
        </div>
      )}

      {/* RN 0.76 업그레이드 증거 (보물선 프로젝트) — 증거 스크린샷 준비 전까지 보류 */}
      {/* {project.hasRN076Evidence && (
        <EvidenceSection
          sectionLabel={t.rn076EvidenceLabel}
          items={EVIDENCE_RN076}
          pendingLabel={t.evidencePendingLabel}
        />
      )} */}

      {/* 보물선 브랜치 전략 디스클로저 */}
      {project.hasBranchStrategy && <BranchStrategyDetail t={t} />}

      {/* Next.js 프로젝트 상세 — 디스클로저로 접을 수 있게 */}
      {project.hasDetail && <NextJsProjectDetail t={t} lang={lang} />}
    </article>
  );
}

function BranchStrategyDetail({ t }: { t: Translation }) {
  return (
    <details className="group/detail mt-4">
      {/* CTA 스타일 summary — NextJsProjectDetail 과 동일 톤 */}
      <summary className="border-accent-500/40 bg-accent-50/60 hover:border-accent-500 hover:bg-accent-50 dark:border-accent-500/30 dark:bg-accent-950/20 dark:hover:border-accent-500/60 dark:hover:bg-accent-950/30 flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl border p-5 transition-all [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-4">
          <div className="bg-accent-500 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-sm">
            {/* Git branch 아이콘 */}
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-accent-700 dark:text-accent-300 text-sm font-bold">
              {t.branchStrategyLabel}
            </p>
            <p className="text-accent-600/70 dark:text-accent-400/70 mt-0.5 text-xs leading-relaxed">
              {t.branchStrategyHint}
            </p>
          </div>
        </div>
        <ArrowRightIcon className="text-accent-500 h-5 w-5 shrink-0 rotate-90 transition-transform group-open/detail:rotate-[270deg]" />
      </summary>
      <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
        {/* 5단계 flow — 번호 chip + 설명 */}
        <ol className="space-y-4">
          {t.branchStrategySteps.map((step, i) => (
            <li key={step.label} className="flex gap-4">
              <span className="bg-accent-100 text-accent-700 dark:bg-accent-950/40 dark:text-accent-300 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {step.label}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
}

function NextJsProjectDetail({ t, lang }: { t: Translation; lang: Lang }) {
  return (
    <details className="group/detail mt-4">
      {/* CTA 스타일 summary — 눈에 띄도록 블루 액센트 카드로 */}
      <summary className="border-accent-500/40 bg-accent-50/60 hover:border-accent-500 hover:bg-accent-50 dark:border-accent-500/30 dark:bg-accent-950/20 dark:hover:border-accent-500/60 dark:hover:bg-accent-950/30 flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl border p-5 transition-all [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-4">
          <div className="bg-accent-500 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-sm">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-accent-700 dark:text-accent-300 text-sm font-bold">
              {t.projectDetailLabel}
            </p>
            <p className="text-accent-600/70 dark:text-accent-400/70 mt-0.5 text-xs leading-relaxed">
              {t.projectDetailHint}
            </p>
          </div>
        </div>
        <ArrowRightIcon className="text-accent-500 h-5 w-5 shrink-0 rotate-90 transition-transform group-open/detail:rotate-[270deg]" />
      </summary>
      <div className="mt-4 space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
        {/* Stats — CI/CD · Branches 2종. 증거 스크린샷은 Atomic Design · CI/CD 그룹에 포함됨 */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StatBadge
            icon={<span aria-hidden>✅</span>}
            value={t.cicdValue}
            label={t.statsLabels.cicd}
          />
          <StatBadge
            icon={<span aria-hidden>🌿</span>}
            value={t.branchesValue}
            label={t.statsLabels.branches}
          />
        </div>
        <CommitConventionSection
          label={t.commitConventionLabel}
          desc={t.commitConventionDesc}
          lang={lang}
        />
        <TechStackGrid
          stack={PROJECT_DETAIL.techStack}
          performanceLabel={t.performanceLabel}
          lang={lang}
        />
        <ArchitectureTree architecture={PROJECT_DETAIL.architecture} />
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold tracking-widest text-zinc-400 uppercase">
            Atomic Design 구조 예시
          </p>
          <AtomicDesignDiagram desc={t.atomicDesignDesc} />
        </div>
        {/* <EvidenceSection
          sectionLabel={t.conventionEvidenceLabel}
          items={EVIDENCE_CONVENTION}
          pendingLabel={t.evidencePendingLabel}
        /> */}
      </div>
    </details>
  );
}

export function ExperienceSection({
  t,
  lang,
}: {
  t: Translation;
  lang: Lang;
}) {
  return (
    <Section id="experience">
      <SectionTitle>{t.experienceLabel}</SectionTitle>
      {/* 회사 요약 — 카드 없이 섹션 인트로로. 바로 아래 프로젝트들이 "여기서 진행한 일" 로 자연스럽게 이어짐 */}
      <div className="mb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              {t.experience.company}
            </h3>
            <p className="text-sm text-zinc-500">{t.experience.position}</p>
          </div>
          <span className="text-xs font-medium text-zinc-400">
            {t.experience.period}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t.experience.description}
        </p>
      </div>

      {/* 프로젝트 리스트 */}
      <div className="space-y-12">
        {t.experience.projects.map((project, pIdx) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={pIdx}
            t={t}
            lang={lang}
          />
        ))}
      </div>
    </Section>
  );
}
