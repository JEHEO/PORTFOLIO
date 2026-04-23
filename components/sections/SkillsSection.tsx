/**
 * Technical Skills 섹션.
 * - SKILLS 를 `group` 별로 나눠 카테고리 레이블과 함께 렌더합니다.
 */

import React from "react";

import { Section, SectionTitle } from "@/components/ui/Section";
import { SkillBadge } from "@/components/ui/SkillBadge";
import {
  SKILL_GROUP_ORDER,
  SKILLS,
  type SkillGroup,
} from "@/lib/data/profile";
import type { Translation } from "@/lib/types/portfolio";

export function SkillsSection({ t }: { t: Translation }) {
  // group 별로 분류. 순서는 SKILL_GROUP_ORDER 고정.
  const grouped = SKILL_GROUP_ORDER.map((group) => ({
    group,
    items: SKILLS.filter((s) => s.group === group),
  })).filter((g) => g.items.length > 0);

  return (
    <Section id="skills">
      <SectionTitle>{t.skillsLabel}</SectionTitle>
      <div className="space-y-5">
        {grouped.map(({ group, items }) => (
          <div key={group} className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              {group}
            </p>
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => (
                <SkillBadge key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// SkillGroup 은 타입 re-export 로만 사용 (lint: 직접 호출 안 함)
export type { SkillGroup };
