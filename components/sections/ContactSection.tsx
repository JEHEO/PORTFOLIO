/**
 * Contact 섹션 — 연락 채널(이메일 / GitHub 등) 링크 카드만 노출.
 * - 링크 데이터는 `lib/i18n/translations.ts` 의 `t.contact.links` 에서 주입받습니다.
 */

import React from "react";

import { ArrowRightIcon } from "@/components/icons";
import { Section, SectionTitle } from "@/components/ui/Section";
import type { Translation } from "@/lib/types/portfolio";

export function ContactSection({ t }: { t: Translation }) {
  return (
    <Section id="contact">
      <SectionTitle>{t.contactLabel}</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2">
        {t.contact.links.map((link) => {
          const isExternal = /^https?:\/\//.test(link.href);
          return (
            <a
              key={link.href}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="group flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm transition-all hover:border-accent-500/50 hover:bg-accent-50/30 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-accent-900/10"
            >
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {link.label}
                </p>
                {link.description && (
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {link.description}
                  </p>
                )}
              </div>
              <ArrowRightIcon className="h-3.5 w-3.5 text-zinc-400 transition-all group-hover:translate-x-0.5 group-hover:text-accent-500" />
            </a>
          );
        })}
      </div>
    </Section>
  );
}
