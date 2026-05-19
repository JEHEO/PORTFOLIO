// 히어로 타이틀 전용 타이핑 애니메이션 컴포넌트.
// HeaderSection 은 서버 컴포넌트로 두고, 타이틀 부분만 이 클라이언트 컴포넌트로 분리.
//
// 동작 흐름
//  1. line1 은 마운트 직후부터 풀텍스트로 노출 (타이핑 X)
//  2. line2 시작 위치에 캐럿이 깜빡이며 대기
//  3. startDelayMs 만큼 호흡 후 line2 만 한 글자씩 타이핑 — accent 색상
//  4. 완료 후 caretHoldMs 동안 캐럿이 더 깜빡이다 사라짐
//
// 설계 의도
//  - 타이틀의 "맥락" 인 line1 은 채용 담당자에게 즉시 가독되어야 함.
//  - "결론" 에 해당하는 line2 만 타이핑으로 시선 유도 + 약간의 연출 무게.
//
// 접근성
//  - h1 자체에 aria-label 로 전체 텍스트 박아 스크린리더가 한 번에 읽도록
//  - 실제 글자는 aria-hidden 처리
//  - prefers-reduced-motion 이면 즉시 풀 텍스트 표시 + 캐럿 숨김
//
// 언어 변경
//  - line2 가 바뀌면 useEffect 의 deps 로 다시 트리거되며 처음부터 재실행

"use client";

import React from "react";

type Props = {
  line1: string;
  line2?: string;
  className?: string;
  /** line2 한 글자 추가 간격 (ms). 기본 45 */
  charDelayMs?: number;
  /** mount 후 line2 첫 글자 찍기까지 대기 (ms). 기본 320 */
  startDelayMs?: number;
  /** 타이핑 끝나고 캐럿을 몇 ms 동안 더 깜빡이게 둘지. 기본 2400 */
  caretHoldMs?: number;
};

export function TypewriterTitle({
  line1,
  line2 = "",
  className,
  charDelayMs = 45,
  startDelayMs = 320,
  caretHoldMs = 2400,
}: Props) {
  const [typed2, setTyped2] = React.useState("");
  // "idle" → "line2" → "done" → "hidden"
  // 각 단계마다 캐럿 표시 여부가 달라진다.
  const [phase, setPhase] = React.useState<
    "idle" | "line2" | "done" | "hidden"
  >("idle");

  React.useEffect(() => {
    // line2 가 없으면 타이핑 자체가 없다. 캐럿도 안 보이게 끝낸다.
    if (!line2) {
      setTyped2("");
      setPhase("hidden");
      return;
    }

    // prefers-reduced-motion 이면 즉시 풀텍스트로 띄우고 종료.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTyped2(line2);
      setPhase("hidden");
      return;
    }

    // 언어 토글 등으로 재실행될 때 이전 상태 리셋
    setTyped2("");
    setPhase("idle");

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timers.push(t);
      });

    const typeLine = async (
      text: string,
      setter: (v: string) => void,
    ) => {
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return;
        setter(text.slice(0, i));
        await wait(charDelayMs);
      }
    };

    (async () => {
      await wait(startDelayMs);
      if (cancelled) return;
      setPhase("line2");
      await typeLine(line2, setTyped2);
      if (cancelled) return;
      setPhase("done");
      await wait(caretHoldMs);
      if (cancelled) return;
      setPhase("hidden");
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [line2, charDelayMs, startDelayMs, caretHoldMs]);

  const showCaret = phase !== "hidden";
  const ariaLabel = line2 ? `${line1} ${line2}` : line1;

  return (
    <h1 className={className} aria-label={ariaLabel}>
      <span aria-hidden="true">{line1}</span>
      {line2 && (
        <>
          <br />
          <span
            aria-hidden="true"
            className="text-accent-500 dark:text-accent-400"
          >
            {typed2}
            {showCaret && (
              <span className="typewriter-caret" aria-hidden="true" />
            )}
          </span>
        </>
      )}
    </h1>
  );
}
