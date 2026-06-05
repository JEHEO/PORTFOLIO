// Practice Works — 학원 시기 1인 디자인+퍼블 작업물 갤러리.
//
// 지그재그 가로 카드:
//   - 5개 카드 모두 동일 크기
//   - 가로 분할 (이미지 1/2 + 설명 1/2)
//   - 짝수 idx → 이미지 왼쪽 / 설명 오른쪽
//   - 홀수 idx → 이미지 오른쪽 / 설명 왼쪽
//   - 이미지는 object-contain 으로 본래 비율 유지 (잘림 방지)
//   - 모바일은 위에 이미지 / 아래에 설명으로 자연스럽게 스택
//
// 카드 클릭 시 sessionStorage 에 스크롤 위치를 저장해 상세 → 홈 복귀 시 위치 복원.

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Section, SectionTitle } from "@/components/ui/Section";
import { PRACTICE_WORKS, type PracticeWork } from "@/lib/practice-works";
import type { Translation } from "@/lib/types/portfolio";

export const PRACTICE_SCROLL_KEY = "practiceScrollY";

interface Props {
  t: Translation;
}

export function PracticeWorksSection({ t }: Props) {
  const router = useRouter();

  // 카드 클릭 시 현재 스크롤 위치 저장 → 상세에서 돌아올 때 복원
  const handleNavigate = React.useCallback(
    (slug: string) => {
      try {
        sessionStorage.setItem(PRACTICE_SCROLL_KEY, String(window.scrollY));
      } catch {
        // 프라이빗 모드 등은 무시
      }
      router.push(`/practice/${slug}`);
    },
    [router],
  );

  return (
    <Section id="practice">
      <SectionTitle>{t.practiceLabel}</SectionTitle>
      <p className="mb-6 text-sm leading-loose text-zinc-500 dark:text-zinc-400">
        {t.practiceDesc}
      </p>

      <div className="space-y-5">
        {PRACTICE_WORKS.map((work, index) => (
          <WorkCard
            key={work.slug}
            work={work}
            onNavigate={handleNavigate}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </Section>
  );
}

function WorkCard({
  work,
  onNavigate,
  reversed,
}: {
  work: PracticeWork;
  onNavigate: (slug: string) => void;
  /** true 면 이미지가 오른쪽 / 설명이 왼쪽으로 (지그재그용). */
  reversed: boolean;
}) {
  return (
    <Link
      href={`/practice/${work.slug}`}
      onClick={(e) => {
        // Cmd/Ctrl+클릭은 새 탭이라 기본 동작에 맡김
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        onNavigate(work.slug);
      }}
      className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:border-accent-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent-500"
    >
      <div
        className={`flex flex-col ${reversed ? "sm:flex-row-reverse" : "sm:flex-row"}`}
      >
        {/* 이미지 영역 — 모바일 풀폭, 데스크탑 1/2 */}
        <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-zinc-50 p-4 dark:bg-zinc-950 sm:aspect-auto sm:w-1/2 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={work.mainImage}
            alt={`${work.title} 메인 화면`}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* 설명 영역 — 모바일 풀폭, 데스크탑 1/2 */}
        <div className="flex flex-col justify-center gap-3 p-5 sm:w-1/2 sm:p-7">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-base font-bold text-zinc-900 transition-colors group-hover:text-accent-500 dark:text-white">
              {work.title}
            </h3>
            <span className="shrink-0 font-mono text-[10px] text-zinc-400">
              {work.period}
            </span>
          </div>

          <p className="text-xs leading-loose text-zinc-500 dark:text-zinc-400">
            {work.tagline}
          </p>

          {/* Renewal Point — 카드에 최대 3개 미리보기 */}
          <ul className="space-y-1 pt-1">
            {work.points.slice(0, 3).map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* 컬러 팔레트 + 클라이언트 */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-1.5">
              {work.colors.palette.map((hex) => (
                <span
                  key={hex}
                  className="h-3 w-3 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-700"
                  style={{ backgroundColor: hex }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-zinc-400">
              {work.client}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
