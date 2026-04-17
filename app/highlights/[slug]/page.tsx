"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useSyncExternalStore } from "react";

import { findHighlight, type HighlightSection } from "@/lib/highlights";
import { langStore, themeStore, type Lang } from "@/lib/stores/uiStore";

// ─── Icons (root 페이지와 동일한 라인 아이콘) ───────────────────────────────

const SunIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="5" />
    <path
      strokeLinecap="round"
      d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
    />
  </svg>
);
const MoonIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

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
          {(section.body as string[]).map((item, i) => (
            <li key={i} className="flex gap-2">
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
            onClick={onToggleLang}
            aria-label="Toggle language"
            className="flex h-7 w-14 items-center justify-center rounded-full border border-zinc-200 text-[11px] font-bold text-zinc-600 transition-all hover:border-blue-400 hover:text-blue-500 dark:border-zinc-700 dark:text-zinc-400"
          >
            {lang === "ko" ? "EN" : "KO"}
          </button>
          <button
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HighlightDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const highlight = findHighlight(slug);

  const lang = useSyncExternalStore(langStore.subscribe, langStore.get, () => "ko" as Lang);
  const isDark = useSyncExternalStore(themeStore.subscribe, themeStore.get, () => false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => themeStore.set(!isDark);
  const toggleLang = () => langStore.set(lang === "ko" ? "en" : "ko");

  // 존재하지 않는 slug — 간단한 404 UI
  if (!highlight) {
    const c = COPY[lang];
    return (
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <TopBar lang={lang} isDark={isDark} onToggleLang={toggleLang} onToggleTheme={toggleTheme} />
        <main className="mx-auto max-w-3xl px-8 pt-28 pb-20">
          <h1 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">{c.notFoundTitle}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{c.notFoundBody}</p>
        </main>
      </div>
    );
  }

  const content = highlight[lang];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <TopBar lang={lang} isDark={isDark} onToggleLang={toggleLang} onToggleTheme={toggleTheme} />

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
