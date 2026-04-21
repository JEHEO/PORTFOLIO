/* eslint-disable @next/next/no-img-element */

/**
 * 스킬 배지. `cdn.simpleicons.org` 의 컬러 아이콘을 사용합니다.
 *
 * - 외부 CDN 이라 `next/image` 대신 기본 `<img>` 를 사용합니다
 *   (remotePatterns 지정 없이도 동작, `next.config.ts` 설정 부담을 줄임).
 * - `color === "current"` 이면 팔레트 색을 지정하지 않고 중립(zinc) 배경을 씁니다.
 * - simpleicons 슬러그가 `name` 과 일치하지 않는 경우(예: React Native) `slug` 로 override 가능합니다.
 */

import React from "react";

function autoSlug(name: string): string {
  return name.toLowerCase().replace(/\./g, "dot").replace(/\s+/g, "");
}

export function SkillBadge({
  name,
  color,
  slug,
}: {
  name: string;
  color: string;
  slug?: string;
}) {
  const isCustom = color !== "current";
  const iconSlug = slug ?? autoSlug(name);
  const iconColor = isCustom ? color.replace("#", "") : "888";
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
        isCustom ? "" : "bg-zinc-100 dark:bg-zinc-800"
      }`}
      style={isCustom ? { backgroundColor: `${color}1A` } : undefined}
    >
      <img
        src={`https://cdn.simpleicons.org/${iconSlug}/${iconColor}`}
        alt={name}
        className="h-5 w-5"
      />
      <span
        className={`text-sm font-medium ${
          isCustom ? "" : "text-zinc-900 dark:text-white"
        }`}
        style={isCustom ? { color } : undefined}
      >
        {name}
      </span>
    </div>
  );
}
