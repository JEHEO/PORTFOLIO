/**
 * 홈 페이지 고정 네비게이션.
 *
 * - 스크롤에 따라 배경/보더가 활성화됩니다.
 * - 모바일(< sm) 에서는 링크가 숨겨지고 로고 + 토글 버튼만 노출됩니다.
 *   (현재 포트폴리오 구조상 모든 섹션이 홈 한 페이지에 있어 햄버거 메뉴 없이도 스크롤로 접근 가능)
 */

"use client";

import React from "react";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useScrolled } from "@/hooks/useScrolled";
import { PROFILE } from "@/lib/data/profile";
import type { Lang } from "@/lib/stores/uiStore";
import type { Translation } from "@/lib/types/portfolio";

export function TopNav({
  lang,
  isDark,
  onToggleLang,
  onToggleTheme,
  t,
}: {
  lang: Lang;
  isDark: boolean;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  t: Translation;
}) {
  const scrolled = useScrolled(10);
  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/80"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <a
          href="#top"
          className="text-sm font-bold text-zinc-900 transition-colors hover:text-accent-500 dark:text-white"
        >
          {PROFILE.name}
        </a>
        <div className="hidden items-center gap-5 sm:flex">
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
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
