/**
 * 인트로 히어로 섹션 — 첫 화면.
 *
 * 컨셉: "디자이너로 출발해 계속 나아간다" 를 시각화
 * - 그라데이션(violet → pink → cyan) 으로 채워진 고래 SVG
 * - 스크롤에 따라 `hue-rotate` 가 점차 이동해 고래 색이 부드럽게 변함 → "신비로운" 느낌
 * - 제자리 bob 모션으로 헤엄치는 듯한 흐름 유지
 * - 커리어 경로: Designer → Publisher → Frontend Developer → …
 *   마지막 "..." 는 펄스하며 무한하게 이어진다는 시그널
 * - 하단 스크롤 인디케이터
 *
 * 애니메이션은 `prefers-reduced-motion: reduce` 사용자에게 자동으로 비활성화됩니다.
 */

"use client";

import React, { useEffect, useRef } from "react";

const CAREER_PATH = ["Designer", "Publisher", "Frontend Developer"] as const;

/** 스크롤 100vh 내리면 hue 가 이만큼 회전합니다 (도 단위). */
const SCROLL_HUE_SHIFT_DEG = 120;

export function IntroSection() {
  /**
   * 스크롤 진행도(0~1)에 따라 `--whale-hue` CSS 변수를 갱신합니다.
   * 그 값은 고래 SVG 의 `filter: hue-rotate(...)` 에 연결되어,
   * 스크롤할수록 그라데이션의 색조가 부드럽게 shift 됩니다.
   */
  const whaleWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const apply = () => {
      const el = whaleWrapperRef.current;
      if (!el) return;
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / window.innerHeight),
      );
      el.style.setProperty(
        "--whale-hue",
        `${progress * SCROLL_HUE_SHIFT_DEG}deg`,
      );
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        apply();
        ticking = false;
      });
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative -mx-8 mb-16 flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center overflow-hidden px-8">
      {/* 고래 — hue wrapper + bob wrapper 2겹 */}
      <div
        ref={whaleWrapperRef}
        className="mb-14"
        style={{
          filter: "hue-rotate(var(--whale-hue, 0deg))",
          transition: "filter 80ms linear",
          willChange: "filter",
        }}
      >
        <div
          data-intro-motion
          style={{ animation: "whaleBob 5s ease-in-out infinite" }}
        >
          <WhaleSvg />
        </div>
      </div>

      {/* 커리어 경로 — Instrument Serif (모던 디스플레이), 색 그라데이션으로 진행감 표현 */}
      <div className="flex flex-wrap items-baseline justify-center gap-x-10 gap-y-2 font-serif text-3xl tracking-tight sm:text-4xl">
        {CAREER_PATH.map((label, i) => {
          const isCurrent = i === CAREER_PATH.length - 1;
          return (
            <span
              key={label}
              className={
                isCurrent
                  ? "text-accent-500 dark:text-accent-400"
                  : "text-zinc-400 dark:text-zinc-500"
              }
              style={{
                animation: `introFadeUp 0.8s ease-out ${0.1 + i * 0.2}s both`,
              }}
            >
              {label}
            </span>
          );
        })}
        {/* "..." 는 "무한하게 나아간다" 시그널 — 펄스 애니메이션 */}
        <span
          data-intro-motion
          className="text-zinc-300 dark:text-zinc-600"
          style={{
            animation: `introDotPulse 2.4s ease-in-out infinite, introFadeUp 0.8s ease-out ${0.1 + CAREER_PATH.length * 0.2}s both`,
          }}
        >
          …
        </span>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400">
        <span>Scroll</span>
        <svg
          data-intro-motion
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "introScrollBounce 2s ease-in-out infinite" }}
          aria-hidden
        >
          <path d="M6 2v16" />
          <path d="M2 14l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}

/**
 * 고래 SVG — violet → pink → cyan 3색 그라데이션으로 채움.
 *
 * - `<linearGradient>` 정의를 SVG 내부 `<defs>` 에 두고 모든 path 가 `url(#whale-gradient)` 로 참조.
 * - 그라데이션 방향: top-left → bottom-right (대각선) 로 고래 몸 전체를 감싸도록.
 * - 상위 wrapper 의 `filter: hue-rotate(...)` 가 걸려 있어, 스크롤 시 전체 색조가 부드럽게 shift.
 */
function WhaleSvg() {
  return (
    <svg
      viewBox="0 0 512 512"
      className="h-40 w-40 sm:h-56 sm:w-56"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Whale"
    >
      <defs>
        <linearGradient
          id="whale-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          {/* accent-500 → pink-500 → cyan-500 */}
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="55%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#whale-gradient)"
        d="M501.3,197.77c-9.917-12.997-24.979-20.45-41.328-20.45H129.118c6.299-9.858,12.175-22.977,12.175-37.642c0-30.94-26.153-55.03-27.265-56.04c-3.889-3.529-9.821-3.529-13.708,0c-1.113,1.011-27.264,25.1-27.264,56.04c0,5.917,0.962,11.582,2.517,16.884c-5.303-1.555-10.967-2.517-16.886-2.517c-30.94,0-55.029,26.152-56.04,27.265c-3.529,3.889-3.529,9.821,0,13.709c1.011,1.113,25.1,27.265,56.04,27.265c15.869,0,29.924-6.879,39.999-13.731c6.237,62.364,39.983,118.871,92.953,154.023c14.605,9.693,30.297,17.476,46.758,23.221c-6.521,17.569-5.832,34.446-5.782,35.471c0.254,5.245,4.449,9.439,9.693,9.693c0.201,0.01,1.014,0.044,2.323,0.044c8.46,0,37.639-1.446,56.583-20.391c4.025-4.025,7.254-8.512,9.852-13.163c82.073-1.351,155.988-50.452,188.976-125.871c4.04-9.237,7.43-18.823,10.079-28.494C514.442,227.299,511.227,210.781,501.3,197.77z M58.684,201.887c-13.424,0-25.765-7.723-33.311-13.705c7.573-5.988,19.954-13.737,33.311-13.737c13.421,0,25.76,7.72,33.31,13.706C84.423,194.139,72.041,201.887,58.684,201.887z M93.451,139.679c0-13.437,7.735-25.786,13.721-33.329c5.989,7.548,13.722,19.896,13.722,33.329s-7.732,25.78-13.722,33.329C101.183,165.46,93.451,153.113,93.451,139.679z M286.788,396.193c-9.499,9.499-23.697,12.762-33.269,13.865c1.102-9.573,4.365-23.771,13.866-33.27c9.5-9.5,23.703-12.763,33.269-13.866C299.551,372.494,296.288,386.693,286.788,396.193z M318.912,376.729c3.127-13.293,2.685-24.2,2.646-25.018c-0.254-5.244-4.449-9.439-9.693-9.693c-1.5-0.074-37.027-1.533-58.906,20.347c-1.682,1.682-3.21,3.45-4.626,5.272c-11.964-3.935-23.498-9.056-34.453-15.302c79.464-72.664,170.984-76.668,197.94-76.089c10.906,0.236,19.949,0.346,28.456,0.346h34.696C443.991,334.775,384.851,372.797,318.912,376.729z M490.444,237.703c-1.705,6.23-3.753,12.422-6.113,18.49h-44.054c-8.357,0-17.26-0.108-28.016-0.341c-29.365-0.633-130.137,3.783-216.067,85.06c-46.354-33.688-74.859-86.141-77.905-143.193h341.684c9.933,0,19.085,4.528,25.11,12.425C491.121,218.054,493.074,228.099,490.444,237.703z"
      />
      <path
        fill="url(#whale-gradient)"
        d="M420.767,212.72c-6.467,0-11.729,5.262-11.729,11.729s5.262,11.729,11.729,11.729s11.729-5.262,11.729-11.729S427.234,212.72,420.767,212.72z"
      />
      <path
        fill="url(#whale-gradient)"
        d="M263.133,206.025H148.904c-5.632,0-10.199,4.566-10.199,10.199s4.567,10.199,10.199,10.199h114.229c5.633,0,10.199-4.566,10.199-10.199S268.765,206.025,263.133,206.025z"
      />
      <path
        fill="url(#whale-gradient)"
        d="M296.79,206.025h-2.04c-5.632,0-10.199,4.566-10.199,10.199s4.567,10.199,10.199,10.199h2.04c5.632,0,10.199-4.566,10.199-10.199S302.422,206.025,296.79,206.025z"
      />
    </svg>
  );
}
