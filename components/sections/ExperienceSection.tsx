// Experience 섹션. 회사 요약 + 프로젝트 카드 리스트로 구성.
// 퍼블리셔 직무 톤으로 정리하면서 dev-only 디스클로저(브랜치 전략 / 상세 스택)는 제거.

import React from "react";

import { ScreenshotGallery } from "@/components/sections/experience/ScreenshotGallery";
import { Section, SectionTitle } from "@/components/ui/Section";
import type { Project, Translation } from "@/lib/types/portfolio";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
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
      <p
        className={
          project.period
            ? "mb-1 text-sm font-medium text-zinc-500"
            : "mb-4 text-sm font-medium text-zinc-500"
        }
      >
        {project.sub}
      </p>
      {project.period && (
        <p className="mb-4 font-mono text-[11px] text-zinc-400">
          {project.period}
        </p>
      )}
      <ul className={"mb-6 space-y-2 text-sm leading-loose text-zinc-600 dark:text-zinc-300"}>
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

    </article>
  );
}

export function ExperienceSection({ t }: { t: Translation }) {
  const prior = t.experience.priorCareer;
  return (
    <Section id="experience">
      <SectionTitle>{t.experienceLabel}</SectionTitle>

      {/* 이전 커리어를 한 줄 정도로만 끼워둔 영역. 데이터가 없으면 통째로 숨김. */}
      {prior && (
        <div className="mb-8 border-l-2 border-zinc-300 pl-4 dark:border-zinc-700">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Prior Career
          </p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {prior.role}
            </p>
            <span className="font-mono text-[11px] text-zinc-400">
              {prior.period}
            </span>
          </div>
          {prior.note && (
            <p className="mt-1 text-xs leading-loose text-zinc-500 dark:text-zinc-400">
              {prior.note}
            </p>
          )}
        </div>
      )}

      {/* 회사 요약은 "회사 정보" → "내 역할" 두 단으로 나눠서 읽기 쉽게. */}
      <div className="mb-10">
        {/* 회사 블록 */}
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            {t.experience.company}
          </h3>
          <span className="text-xs font-medium text-zinc-400">
            {t.experience.period}
          </span>
        </div>
        {t.experience.companyDesc && (
          <p className="mt-2 text-xs leading-loose text-zinc-500 dark:text-zinc-400">
            {t.experience.companyDesc}
          </p>
        )}

        {/* 내 역할 블록 */}
        <div className="mt-5">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {t.experience.position}
          </p>
          <p className="mt-1.5 text-sm leading-loose text-zinc-600 dark:text-zinc-400">
            {t.experience.description}
          </p>
        </div>
      </div>

      {/* 프로젝트 리스트 */}
      <div className="space-y-12">
        {t.experience.projects.map((project, pIdx) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={pIdx}
          />
        ))}
      </div>
    </Section>
  );
}
