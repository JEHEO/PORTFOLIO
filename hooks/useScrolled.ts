/**
 * 페이지 스크롤이 일정 값 이상 내려갔는지 여부를 반환합니다.
 * - 고정 네비게이션의 배경/보더 on/off 같은 UI 상태에 사용합니다.
 */

"use client";

import { useEffect, useState } from "react";

export function useScrolled(threshold: number = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
