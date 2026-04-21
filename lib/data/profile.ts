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
 * 기술 스킬 배지 리스트.
 *
 * - `slug` 가 지정되지 않으면 `name` 을 소문자로 변환해 simpleicons.org 슬러그로 사용합니다.
 * - simpleicons 에 고유 슬러그가 없거나 표기가 다른 경우(예: React Native 는 React 와 같은 아이콘)
 *   `slug` 를 직접 지정해 주세요.
 */
export type SkillItem = {
  name: string;
  color: string;
  slug?: string;
};

export const SKILLS: SkillItem[] = [
  // Frontend
  { name: "React", color: "#61DAFB" },
  // simpleicons 에 `reactnative` 가 없으므로 React 아이콘(slug: "react") 을 재사용합니다.
  { name: "React Native", color: "#61DAFB", slug: "react" },
  { name: "Next.js", color: "current" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "jQuery", color: "#0769AD" },

  // Styling / Design
  { name: "Tailwind CSS", color: "#06B6D4", slug: "tailwindcss" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Storybook", color: "#FF4785" },

  // Tools / DevOps
  { name: "Git", color: "#F05032" },
  { name: "Bitbucket", color: "#2684FF" },
  { name: "Jira", color: "#0052CC" },
];

/** 2020 레거시 포트폴리오 링크 */
export const PORTFOLIO_LINKS = {
  github: "https://github.com/JEHEO/PORTFOLIO_2020",
  demo: "https://jeheo.github.io/PORTFOLIO_2020/",
} as const;
