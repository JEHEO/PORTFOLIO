/**
 * UI 전역 상태 (언어 / 다크모드)
 *
 * - `useSyncExternalStore` 와 함께 사용하기 위해 `subscribe` / `get` / `set` 인터페이스를 제공합니다.
 * - FOUC 방지는 `app/layout.tsx` 의 인라인 부트 스크립트에서 처리하며,
 *   런타임에서는 이 스토어가 `<html>` 의 `lang` / `.dark` 클래스를 DOM 외부 시스템으로 동기화합니다.
 */

export type Lang = "ko" | "en";

// ─── Language store ──────────────────────────────────────────────────────────

export const langStore = {
  get: (): Lang => {
    if (typeof window === "undefined") return "ko";
    const s = window.localStorage.getItem("lang");
    return s === "en" ? "en" : "ko";
  },
  set: (lang: Lang) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("lang", lang);
    // SEO / 접근성: html lang 을 UI 언어와 동기화
    document.documentElement.lang = lang;
    window.dispatchEvent(new Event("lang-update"));
  },
  subscribe: (cb: () => void) => {
    window.addEventListener("lang-update", cb);
    return () => window.removeEventListener("lang-update", cb);
  },
};

// ─── Theme (dark mode) store ─────────────────────────────────────────────────

export const themeStore = {
  get: (): boolean => {
    if (typeof window === "undefined") return false;
    // 부트 스크립트(app/layout.tsx) 가 이미 .dark 클래스를 반영했으므로
    // hydration 직후에는 DOM 상태를 믿는 편이 flash 를 줄입니다.
    if (document.documentElement.classList.contains("dark")) return true;
    const s = window.localStorage.getItem("theme");
    return (
      s === "dark" ||
      (!s && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  },
  set: (dark: boolean) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
    window.dispatchEvent(new Event("theme-update"));
  },
  subscribe: (cb: () => void) => {
    window.addEventListener("theme-update", cb);
    return () => window.removeEventListener("theme-update", cb);
  },
};
