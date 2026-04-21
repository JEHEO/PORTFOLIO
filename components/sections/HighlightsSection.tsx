/**
 * Expertise & Leadership 카드 리스트.
 *
 * - 각 카드는 번역본(`t.highlights[i].slug`) 을 통해 상세 페이지와 결합됩니다
 *   (index 기반 결합 제거).
 */

import Link from "next/link";
import React from "react";

import { ArrowRightIcon } from "@/components/icons";
import { Section, SectionTitle } from "@/components/ui/Section";
import type { Translation } from "@/lib/types/portfolio";

export function HighlightsSection({ t }: { t: Translation }) {
  return (
    <Section id="highlights">
      <SectionTitle>{t.highlightsLabel}</SectionTitle>
      <div className="grid gap-4">
        {t.highlights.map((item) => (
          <Link
            key={item.slug}
            href={`/highlights/${item.slug}`}
            className="group relative rounded-xl border border-zinc-200 p-5 transition-all hover:border-accent-500/50 hover:bg-accent-50/30 dark:border-zinc-800 dark:hover:bg-accent-900/10"
          >
            <div className="mb-2 flex gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-tight text-accent-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h3 className="mb-2 font-bold transition-colors group-hover:text-accent-500">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {item.description}
            </p>
            <div className="mt-3 flex items-center text-xs font-medium text-accent-500 opacity-0 transition-opacity group-hover:opacity-100">
              {t.viewMore}
              <ArrowRightIcon className="ml-1 h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
