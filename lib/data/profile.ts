/**
 * 프로필 / 계정 / 스킬처럼 언어·라이프사이클과 무관한 상수.
 */

export const PROFILE = {
  name: "허정은",
  email: "heo940122@gmail.com",
} as const;

/** GitHub Stats 카드에 사용됩니다. */
export const GITHUB_USERNAME = "JEHEO";

/**
 * 기술 스킬 그룹. SkillsSection 이 이 순서대로 렌더합니다.
 */
export type SkillGroup = "Frontend" | "Styling" | "Tools";
export const SKILL_GROUP_ORDER: readonly SkillGroup[] = [
  "Frontend",
  "Styling",
  "Tools",
] as const;

/**
 * 기술 스킬 배지 리스트.
 *
 * - `slug` 가 지정되지 않으면 `name` 을 소문자로 변환해 simpleicons.org 슬러그로 사용합니다.
 * - simpleicons 에 고유 슬러그가 없거나 표기가 다른 경우(예: React Native 는 React 와 같은 아이콘)
 *   `slug` 를 직접 지정해 주세요.
 * - `group` 은 SkillsSection 에서 카테고리 레이블로 묶여 렌더됩니다.
 */
export type SkillItem = {
  name: string;
  color: string;
  slug?: string;
  group: SkillGroup;
};

export const SKILLS: SkillItem[] = [
  // Frontend
  { name: "React", color: "#61DAFB", group: "Frontend" },
  // simpleicons 에 `reactnative` 가 없으므로 React 아이콘(slug: "react") 을 재사용합니다.
  { name: "React Native", color: "#61DAFB", slug: "react", group: "Frontend" },
  { name: "Next.js", color: "current", group: "Frontend" },
  { name: "TypeScript", color: "#3178C6", group: "Frontend" },
  { name: "jQuery", color: "#0769AD", group: "Frontend" },

  // Styling / Design
  { name: "Tailwind CSS", color: "#06B6D4", slug: "tailwindcss", group: "Styling" },
  { name: "Figma", color: "#F24E1E", group: "Styling" },
  { name: "Storybook", color: "#FF4785", group: "Styling" },

  // Tools / DevOps
  { name: "Git", color: "#F05032", group: "Tools" },
  { name: "Bitbucket", color: "#2684FF", group: "Tools" },
  { name: "Jira", color: "#0052CC", group: "Tools" },
];

/** 2020 레거시 포트폴리오 링크 */
export const PORTFOLIO_LINKS = {
  github: "https://github.com/JEHEO/PORTFOLIO_2020",
  demo: "https://jeheo.github.io/PORTFOLIO_2020/",
} as const;
