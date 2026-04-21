/**
 * 클라이언트 UI 전역 상태(`lang`, `isDark`) 를 `useSyncExternalStore` 로 구독합니다.
 *
 * - 서버 스냅샷은 기본값(`ko` / false) 으로 고정합니다. FOUC 는 `app/layout.tsx` 의
 *   부트 스크립트가 `<html>` 에 미리 클래스를 반영해 해결합니다.
 * - 컴포넌트는 이 훅만 import 하면 되므로 페이지/섹션에 `useSyncExternalStore`
 *   호출이 중복 노출되지 않습니다.
 */

"use client";

import { useSyncExternalStore } from "react";

import { type Lang, langStore, themeStore } from "@/lib/stores/uiStore";

export function useLang(): Lang {
  return useSyncExternalStore(
    langStore.subscribe,
    langStore.get,
    () => "ko" as Lang,
  );
}

export function useIsDark(): boolean {
  return useSyncExternalStore(themeStore.subscribe, themeStore.get, () => false);
}

export function toggleLang(current: Lang) {
  langStore.set(current === "ko" ? "en" : "ko");
}

export function toggleTheme(currentDark: boolean) {
  themeStore.set(!currentDark);
}
