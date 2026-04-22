/**
 * Contact 섹션 — 연락 채널 카드 (이메일 · 전화 등).
 *
 * 구성
 * - 좌측: 채널 아이콘 칩 (accent 톤, hover 시 반전)
 * - 중앙: "LABEL" uppercase + description
 * - 우측: 화살표 아이콘 (hover 시 살짝 오른쪽 이동)
 *
 * 전화번호 등 민감 정보는 `<svg><text>` 로 렌더해 단순 regex 기반
 * 크롤러의 스크래핑을 회피합니다 (parent `<a href="tel:...">` 는 유지해 사용자 탭 경험은 그대로).
 */

import React from "react";

import {
  ArrowRightIcon,
  EmailIcon,
  PhoneIcon,
} from "@/components/icons";
import { Section, SectionTitle } from "@/components/ui/Section";
import type { Translation } from "@/lib/types/portfolio";

function getIcon(label: string, className: string) {
  switch (label) {
    case "Email":
      return <EmailIcon className={className} />;
    case "Phone":
      return <PhoneIcon className={className} />;
    default:
      return null;
  }
}

/**
 * 민감 정보(전화번호 등) 를 `<svg><text>` 로 그립니다.
 * - HTML text node 가 아니라 SVG 내부 text 라 단순 regex 기반 봇 수집에 취약하지 않음.
 * - `aria-hidden` 처리. 실제 다이얼 기능은 parent `<a href="tel:...">` 가 담당.
 */
function ObfuscatedSvgText({ value }: { value: string }) {
  // viewBox 는 문자 수 기반으로 대략 조정 (전화번호 15자 내외 기준)
  const width = Math.max(110, value.length * 8);
  return (
    <svg
      width={width}
      height="16"
      viewBox={`0 0 ${width} 16`}
      fill="currentColor"
      className="inline-block align-middle"
      aria-hidden
    >
      <text
        x="0"
        y="12"
        fontSize="13"
        fontFamily="var(--font-sans), ui-sans-serif, system-ui"
      >
        {value}
      </text>
    </svg>
  );
}

export function ContactSection({ t }: { t: Translation }) {
  return (
    <Section id="contact">
      <SectionTitle>{t.contactLabel}</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2">
        {t.contact.links.map((link) => {
          const isExternal = /^https?:\/\//.test(link.href);
          const icon = getIcon(link.label, "h-5 w-5");
          const isPhone = link.label === "Phone";
          return (
            <a
              key={link.href}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-accent-500/50 hover:bg-accent-50/30 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-accent-950/20"
            >
              {/* Icon chip — hover 시 accent 반전 */}
              {icon && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-100 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-white dark:bg-accent-950/40 dark:text-accent-300 dark:group-hover:bg-accent-500 dark:group-hover:text-white">
                  {icon}
                </div>
              )}

              {/* Label + value */}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {link.label}
                </p>
                <div className="mt-0.5 flex items-center text-sm font-semibold text-zinc-900 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                  {link.description && isPhone ? (
                    <ObfuscatedSvgText value={link.description} />
                  ) : (
                    link.description
                  )}
                </div>
              </div>

              {/* Arrow */}
              <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition-all group-hover:translate-x-0.5 group-hover:text-accent-500" />
            </a>
          );
        })}
      </div>
    </Section>
  );
}
