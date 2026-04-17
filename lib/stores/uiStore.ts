/**
 * UI 전역 상태 (언어 / 다크모드)
 *
 * - `useSyncExternalStore` 와 함께 사용하기 위해 `subscribe` / `get` / `set` 인터페이스를 제공합니다.
 * - SSR snapshot 은 각 훅 소비부에서 기본값을 지정해 hydration mismatch 를 피합니다.
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
    const s = window.localStorage.getItem("theme");
    return (
      s === "dark" ||
      (!s && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  },
  set: (dark: boolean) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", dark ? "dark" : "light");
    window.dispatchEvent(new Event("theme-update"));
  },
  subscribe: (cb: () => void) => {
    window.addEventListener("theme-update", cb);
    return () => window.removeEventListener("theme-update", cb);
  },
};
