/**
 * 2020 레거시 포트폴리오 링크.
 */

import React from "react";

import { Section, SectionTitle } from "@/components/ui/Section";
import { PORTFOLIO_LINKS } from "@/lib/data/profile";
import type { Translation } from "@/lib/types/portfolio";

export function LegacyPortfolioSection({ t }: { t: Translation }) {
  return (
    <Section id="portfolio">
      <SectionTitle>{t.portfolioLabel}</SectionTitle>
      <div className="flex gap-4">
        <a
          href={PORTFOLIO_LINKS.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-black"
        >
          GitHub
        </a>
        <a
          href={PORTFOLIO_LINKS.demo}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
        >
          Live Demo
        </a>
      </div>
    </Section>
  );
}
