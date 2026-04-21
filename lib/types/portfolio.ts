/**
 * 포트폴리오 데이터 타입.
 *
 * - 홈 페이지(`app/page.tsx`) 와 섹션 컴포넌트(`components/sections/`) 가 공유합니다.
 * - 상세 페이지(`app/highlights/[slug]/page.tsx`) 쪽 타입은 `lib/highlights.ts` 에 정의돼 있습니다.
 */

export type TechItem = { name: string; desc: string };
export type TechCategory = { category: string; items: TechItem[] };

export type ProjectDetail = {
  /** `cicd` / `branches` 의 실제 표시 값은 번역본(Translation.cicdValue / branchesValue) 에서 주입됩니다.
   * 이 객체는 `ProjectDetail` 에 추가 stat 이 생길 때의 확장 지점으로 남겨둡니다. */
  stats: { cicd: string; branches: string };
  techStack: TechCategory[];
  architecture: { label: string; items: string[] }[];
};

/**
 * 스크린샷/영상 아이템.
 * - `video: true` 이면 `<video>` 태그로 렌더됩니다. `poster` 는 재생 전 썸네일.
 */
export type ScreenshotItem = {
  src: string;
  alt: string;
  video?: boolean;
  poster?: string;
};

/**
 * 스크린샷 그룹.
 * - 한 프로젝트에 여러 문맥(예: "주요 화면" vs "월간 이벤트 WebView") 의 스크린샷이 섞여 있을 때 사용합니다.
 * - `layout` 기본값은 "cylinder" (3D 원통 카루셀). 다이어그램/영상 처럼 그냥 가로 스크롤이 더 잘 맞는
 *   그룹은 "scroll" 로 지정하세요.
 * - `orientation` 은 카드의 가로/세로 비율 프리셋. 모바일 스크린샷이면 "portrait" (기본),
 *   웹 스크린샷이면 "landscape" 로 설정하세요.
 */
export type ScreenshotGroup = {
  label?: string;
  items: ScreenshotItem[];
  layout?: "cylinder" | "scroll";
  orientation?: "portrait" | "landscape";
};

export type Project = {
  title: string;
  tag: string;
  sub: string;
  details: string[];
  /** `hasDetail` 이 true 인 프로젝트에만 상세 블록(stats·techStack·architecture·evidence) 이 붙습니다. */
  hasDetail?: boolean;
  /** RN 0.76 업그레이드 증거 섹션 노출 여부 */
  hasRN076Evidence?: boolean;
  /**
   * 프로젝트 스크린샷/영상. 그룹 단위로 라벨과 함께 렌더됩니다.
   * - 값이 없거나 빈 배열이면 placeholder(회색 박스) 로 대체됩니다.
   */
  screenshots?: ScreenshotGroup[];
};

export type ExperienceData = {
  company: string;
  position: string;
  period: string;
  description: string;
  projects: Project[];
};

export type HighlightItem = {
  /** 홈 카드 → 상세 페이지 라우트. `/highlights/${slug}` 로 이동합니다. */
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

/**
 * About 섹션의 문단 조각.
 * - 일반 텍스트는 `{ text }`, 강조는 `{ text, emphasis: true }`.
 * - 문단 단위로 segment 배열을 만들어 파서 없이도 부분 강조가 가능합니다.
 */
export type AboutParagraphSegment = { text: string; emphasis?: boolean };

export type AboutContent = {
  heading: string;
  paragraphs: AboutParagraphSegment[][];
};

export type ContactContent = {
  links: { label: string; href: string; description?: string }[];
};

export type NavItem = { label: string; href: string };

export type EducationItem = {
  school: string;
  degree: string;
  major: string;
  period: string;
  /** 주요 활동/논문/프로젝트 등 부가 정보 (선택) */
  notes?: string[];
};

export type CertificationItem = {
  name: string;
  issuer: string;
  date: string;
  /** 공식 링크 (검증 가능한 경우) */
  href?: string;
};

export type AwardItem = {
  title: string;
  issuer: string;
  date: string;
  description?: string;
};

export type ImpactMetric = {
  /** 큰 숫자 / 핵심 값. 예) "137K", "7,700%", "0.70 → 0.76" */
  value: string;
  /** 한 줄 설명 */
  label: string;
  /** 보조 문구 (선택) */
  hint?: string;
};

export type Translation = {
  role: string;
  roleSub: string;
  title: string;
  /** 헤더 우측 하단 "구직 상태" 칩 라벨 */
  availability: string;
  nav: NavItem[];
  aboutLabel: string;
  about: AboutContent;
  impactLabel: string;
  impactMetrics: ImpactMetric[];
  highlightsLabel: string;
  viewMore: string;
  experienceLabel: string;
  educationLabel: string;
  education: EducationItem[];
  certificationsLabel: string;
  certifications: CertificationItem[];
  awardsLabel: string;
  awards: AwardItem[];
  projectDetailLabel: string;
  projectDetailHint: string;
  codeShowcaseLabel: string;
  codeShowcaseDesc: string;
  codeShowcaseBtnLabel: string;
  atomicDesignDesc: string;
  hooksDesc: string;
  performanceLabel: string;
  commitConventionLabel: string;
  commitConventionDesc: string;
  skillsLabel: string;
  portfolioLabel: string;
  contactLabel: string;
  contact: ContactContent;
  statsLabels: { cicd: string; branches: string };
  cicdValue: string;
  branchesValue: string;
  evidencePendingLabel: string;
  rn076EvidenceLabel: string;
  conventionEvidenceLabel: string;
  experience: ExperienceData;
  highlights: HighlightItem[];
};
