/**
 * Technical Skills 섹션.
 */

import React from "react";

import { Section, SectionTitle } from "@/components/ui/Section";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { SKILLS } from "@/lib/data/profile";
import type { Translation } from "@/lib/types/portfolio";

export function SkillsSection({ t }: { t: Translation }) {
  return (
    <Section id="skills">
      <SectionTitle>{t.skillsLabel}</SectionTitle>
      <div className="flex flex-wrap gap-3">
        {SKILLS.map((skill) => (
          <SkillBadge key={skill.name} {...skill} />
        ))}
      </div>
    </Section>
  );
}
