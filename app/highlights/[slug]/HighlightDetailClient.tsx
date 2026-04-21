/**
 * Highlight 상세 페이지의 클라이언트 렌더러.
 *
 * - 서버 컴포넌트 `page.tsx` 에서 `slug` 를 prop 으로 받아 렌더합니다.
 * - 이 파일만 "use client" 라서 언어/테마 토글 같은 브라우저 상태를 사용할 수 있습니다.
 * - 콘텐츠는 `lib/highlights.ts` 의 HIGHLIGHTS 에서 slug 로 조회합니다.
 */

"use client";

import Link from "next/link";
import React from "react";

import { ArrowLeftIcon, MoonIcon, SunIcon } from "@/components/icons";
import {
  toggleLang as doToggleLang,
  toggleTheme as doToggleTheme,
  useIsDark,
  useLang,
} from "@/hooks/useUiState";
import { findHighlight, type HighlightSection } from "@/lib/highlights";
import type { Lang } from "@/lib/stores/uiStore";

// ─── i18n copy (디테일 페이지 전용 짧은 텍스트) ─────────────────────────────

const COPY: Record<Lang, { back: string; notFoundTitle: string; notFoundBody: string }> = {
  ko: {
    back: "돌아가기",
    notFoundTitle: "페이지를 찾을 수 없습니다",
    notFoundBody: "요청하신 하이라이트가 존재하지 않거나 이동되었습니다.",
  },
  en: {
    back: "Back",
    notFoundTitle: "Page not found",
    notFoundBody: "The highlight you requested doesn't exist or has been moved.",
  },
};

// ─── 섹션 렌더러 ──────────────────────────────────────────────────────────────

function Section({ section }: { section: HighlightSection }) {
  const isList = Array.isArray(section.body);
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
        {section.heading}
      </h2>
      {isList ? (
        <ul className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {(section.body as string[]).map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {section.body as string}
        </p>
      )}
    </section>
  );
}

// ─── 상단 바 (간소화 버전) ────────────────────────────────────────────────────

function TopBar({
  lang,
  isDark,
  onToggleLang,
  onToggleTheme,
}: {
  lang: Lang;
  isDark: boolean;
  onToggleLang: () => void;
  onToggleTheme: () => void;
}) {
  const backLabel = COPY[lang].back;
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-8 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-blue-500 dark:text-zinc-400"
        >
          <ArrowLeftIcon />
          {backLabel}
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLang}
            aria-label="Toggle language"
            className="flex h-7 w-14 items-center justify-center rounded-full border border-zinc-200 text-[11px] font-bold text-zinc-600 transition-all hover:border-blue-400 hover:text-blue-500 dark:border-zinc-700 dark:text-zinc-400"
          >
            {lang === "ko" ? "EN" : "KO"}
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-all hover:border-blue-400 hover:text-blue-500 dark:border-zinc-700 dark:text-zinc-400"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Client Renderer ─────────────────────────────────────────────────────────

export function HighlightDetailClient({ slug }: { slug: string }) {
  const highlight = findHighlight(slug);

  const lang = useLang();
  const isDark = useIsDark();

  const onToggleTheme = () => doToggleTheme(isDark);
  const onToggleLang = () => doToggleLang(lang);

  // 존재하지 않는 slug — 간단한 404 UI
  if (!highlight) {
    const c = COPY[lang];
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <TopBar
          lang={lang}
          isDark={isDark}
          onToggleLang={onToggleLang}
          onToggleTheme={onToggleTheme}
        />
        <main className="mx-auto max-w-3xl px-8 pt-28 pb-20">
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

  const content = highlight[lang];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <TopBar
        lang={lang}
        isDark={isDark}
        onToggleLang={onToggleLang}
        onToggleTheme={onToggleTheme}
      />

      <main className="mx-auto max-w-3xl px-8 pt-28 pb-20">
        {/* ── Hero ── */}
        <header className="mb-12 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <div className="mb-3 flex flex-wrap gap-2">
            {highlight.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-tight text-blue-500"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {content.title}
          </h1>
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-zinc-400">
            {content.meta}
          </p>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            {content.summary}
          </p>
        </header>

        {/* ── Sections ── */}
        <div className="space-y-10">
          {content.sections.map((section) => (
            <Section key={section.heading} section={section} />
          ))}
        </div>

        {/* ── Footer: back to home ── */}
        <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-blue-500 dark:text-zinc-400"
          >
            <ArrowLeftIcon />
            {COPY[lang].back}
          </Link>
        </div>
      </main>
    </div>
  );
}
