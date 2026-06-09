/* eslint-disable @next/next/no-img-element */

/**
 * 스킬 배지. 기본은 `cdn.simpleicons.org` 의 컬러 아이콘을 사용합니다.
 *
 * - 외부 CDN 이라 `next/image` 대신 기본 `<img>` 를 사용합니다
 *   (remotePatterns 지정 없이도 동작, `next.config.ts` 설정 부담을 줄임).
 * - `color === "current"` 이면 팔레트 색을 지정하지 않고 중립(zinc) 배경을 씁니다.
 * - simpleicons 슬러그가 `name` 과 일치하지 않는 경우(예: React Native) `slug` 로 override 가능합니다.
 * - simpleicons 에 없는 아이콘은 `iconUrl` 로 로컬 SVG 경로를 직접 지정하면 됩니다
 *   (Adobe 제품군은 2022 년 브랜드 정책으로 simpleicons 에서 제거됨).
 */

import React from "react";

import { asset } from "@/lib/utils/asset-path";

function autoSlug(name: string): string {
  return name.toLowerCase().replace(/\./g, "dot").replace(/\s+/g, "");
}

export function SkillBadge({
  name,
  color,
  slug,
  iconUrl,
}: {
  name: string;
  color: string;
  slug?: string;
  iconUrl?: string;
}) {
  const isCustom = color !== "current";
  const iconSlug = slug ?? autoSlug(name);
  const iconColor = isCustom ? color.replace("#", "") : "888";
  // 로컬 SVG 경로는 GitHub Pages basePath 가 붙도록 asset() 으로 감싼다.
  // 외부 simpleicons CDN URL 은 asset() 이 자동으로 그대로 통과시킨다.
  const src = asset(
    iconUrl ?? `https://cdn.simpleicons.org/${iconSlug}/${iconColor}`,
  );
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
        isCustom ? "" : "bg-zinc-100 dark:bg-zinc-800"
      }`}
      style={isCustom ? { backgroundColor: `${color}1A` } : undefined}
    >
      <img
        src={src}
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
