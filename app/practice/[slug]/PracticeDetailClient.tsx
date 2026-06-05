// 학원 시기 작업물 상세 페이지의 클라이언트 렌더러.
// 서버 컴포넌트 page.tsx 에서 slug 만 받아오고, 실제 콘텐츠는 여기서
// PRACTICE_WORKS 에서 찾아 그린다. 언어 토글이 필요해 use client.

"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { ArrowLeftIcon, MoonIcon, SunIcon } from "@/components/icons";
import {
  toggleLang as doToggleLang,
  toggleTheme as doToggleTheme,
  useIsDark,
  useLang,
} from "@/hooks/useUiState";
import { findPracticeWork } from "@/lib/practice-works";
import type { Lang } from "@/lib/stores/uiStore";

const COPY: Record<
  Lang,
  {
    back: string;
    demo: string;
    notFoundTitle: string;
    notFoundBody: string;
    sectionPoint: string;
    sectionOverview: string;
    sectionFont: string;
    sectionColor: string;
    fontHeading: string;
    fontBody: string;
    client: string;
    period: string;
  }
> = {
  ko: {
    back: "돌아가기",
    demo: "데모 사이트 열기",
    notFoundTitle: "작업물을 찾을 수 없습니다",
    notFoundBody: "요청하신 작업물이 존재하지 않거나 이동되었습니다.",
    sectionPoint: "Renewal Point",
    sectionOverview: "Overview",
    sectionFont: "Font",
    sectionColor: "Color",
    fontHeading: "제목",
    fontBody: "본문",
    client: "Client",
    period: "Period",
  },
  en: {
    back: "Back",
    demo: "Open Demo Site",
    notFoundTitle: "Work not found",
    notFoundBody:
      "The work you requested doesn't exist or has been moved.",
    sectionPoint: "Renewal Point",
    sectionOverview: "Overview",
    sectionFont: "Font",
    sectionColor: "Color",
    fontHeading: "Heading",
    fontBody: "Body",
    client: "Client",
    period: "Period",
  },
};

interface Props {
  slug: string;
}

export function PracticeDetailClient({ slug }: Props) {
  const work = findPracticeWork(slug);
  const router = useRouter();
  const lang = useLang();
  const isDark = useIsDark();

  const onToggleTheme = () => doToggleTheme(isDark);
  const onToggleLang = () => doToggleLang(lang);

  const onBack = React.useCallback(() => {
    router.push("/");
  }, [router]);

  const c = COPY[lang];

  if (!work) {
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <TopBar
          lang={lang}
          isDark={isDark}
          onToggleLang={onToggleLang}
          onToggleTheme={onToggleTheme}
          onBack={onBack}
          backLabel={c.back}
        />
        <main className="mx-auto max-w-3xl px-4 pt-28 pb-20">
          <h1 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">
            {c.notFoundTitle}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {c.notFoundBody}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <TopBar
        lang={lang}
        isDark={isDark}
        onToggleLang={onToggleLang}
        onToggleTheme={onToggleTheme}
        onBack={onBack}
        backLabel={c.back}
      />

      <main className="mx-auto max-w-3xl px-4 pt-28 pb-20">
        {/* 히어로 */}
        <header className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-500">
            Practice Work · {work.period}
          </p>
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            {work.title}
          </h1>
          <p className="mb-5 text-sm leading-loose text-zinc-600 dark:text-zinc-300">
            {work.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              <span className="font-bold uppercase tracking-widest text-zinc-400">
                {c.client}
              </span>{" "}
              {work.client}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">·</span>
            <span>
              <span className="font-bold uppercase tracking-widest text-zinc-400">
                {c.period}
              </span>{" "}
              {work.period}
            </span>
          </div>
        </header>

        {/* 메인 이미지 — 박스/배경 없이 이미지 자체만 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={work.mainImage}
          alt={`${work.title} 메인 화면`}
          className="mb-10 w-full"
        />

        {/* 데모 버튼 */}
        <a
          href={work.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-12 inline-flex items-center gap-2 rounded-md bg-accent-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
        >
          {c.demo}
          <ExternalLinkIcon />
        </a>

        <div className="space-y-12">
          {/* Renewal Point */}
          <section>
            <SectionHeading>{c.sectionPoint}</SectionHeading>
            <ul className="space-y-2 text-sm leading-loose text-zinc-600 dark:text-zinc-300">
              {work.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Overview */}
          <section>
            <SectionHeading>{c.sectionOverview}</SectionHeading>
            <p className="text-sm leading-loose text-zinc-600 dark:text-zinc-300">
              {work.overview}
            </p>

            {work.detailImages && work.detailImages.length > 0 && (
              <div className="mt-6 space-y-4">
                {work.detailImages.map((img) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    className="w-full"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </section>

          {/* Font */}
          <section>
            <SectionHeading>{c.sectionFont}</SectionHeading>
            <div className="space-y-2 text-sm">
              <p className="text-zinc-900 dark:text-white">
                <span className="mr-2 inline-block w-12 text-xs font-bold uppercase tracking-widest text-accent-500">
                  {c.fontHeading}
                </span>
                {work.font.heading}
              </p>
              <p className="text-zinc-900 dark:text-white">
                <span className="mr-2 inline-block w-12 text-xs font-bold uppercase tracking-widest text-accent-500">
                  {c.fontBody}
                </span>
                {work.font.body}
              </p>
            </div>
            <p className="mt-3 text-xs leading-loose text-zinc-500 dark:text-zinc-400">
              {work.font.note}
            </p>
          </section>

          {/* Color */}
          <section>
            <SectionHeading>{c.sectionColor}</SectionHeading>
            <div className="mb-3 flex flex-wrap gap-3">
              {work.colors.palette.map((hex) => (
                <div key={hex} className="flex flex-col items-start gap-1.5">
                  <span
                    className="h-12 w-12 rounded-md ring-1 ring-zinc-200 dark:ring-zinc-700"
                    style={{ backgroundColor: hex }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {hex}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs leading-loose text-zinc-500 dark:text-zinc-400">
              {work.colors.note}
            </p>
          </section>
        </div>

        {/* 하단 돌아가기 */}
        <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-accent-500 dark:text-zinc-400"
          >
            <ArrowLeftIcon />
            {c.back}
          </button>
        </div>
      </main>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-500">
      {children}
    </h2>
  );
}

function TopBar({
  lang,
  isDark,
  onToggleLang,
  onToggleTheme,
  onBack,
  backLabel,
}: {
  lang: Lang;
  isDark: boolean;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onBack: () => void;
  backLabel: string;
}) {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-accent-500 dark:text-zinc-400"
        >
          <ArrowLeftIcon />
          {backLabel}
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLang}
            aria-label="Toggle language"
            className="flex h-7 w-14 items-center justify-center rounded-full border border-zinc-200 text-[11px] font-bold text-zinc-600 transition-all hover:border-accent-400 hover:text-accent-500 dark:border-zinc-700 dark:text-zinc-400"
          >
            {lang === "ko" ? "EN" : "KO"}
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-all hover:border-accent-400 hover:text-accent-500 dark:border-zinc-700 dark:text-zinc-400"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 2H2v10h10V8.5M8.5 1.5h4v4M12 2L7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
