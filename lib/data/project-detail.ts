/**
 * Next.js 프로젝트 상세 블록(stats·techStack·architecture) + Evidence placeholder.
 *
 * stats 의 표시 값(CI/CD · Branches) 은 번역본에서 주입됩니다.
 * 실제 증거는 Experience 섹션의 "Atomic Design · 아키텍처 · CI/CD" 스크린샷 그룹에서 확인할 수 있습니다.
 */

import type { ProjectDetail } from "@/lib/types/portfolio";

export const PROJECT_DETAIL: ProjectDetail = {
  stats: { cicd: "", branches: "" },
  techStack: [
    {
      category: "Framework & Runtime",
      items: [
        {
          name: "Next.js 16 (App Router)",
          desc: "Server Components 기반 렌더링 · Route Handlers · Middleware 일원화",
        },
        {
          name: "React 19",
          desc: "Actions / use() · Suspense 기본 활용",
        },
        {
          name: "TypeScript 5 (strict)",
          desc: "런타임 + 컴파일 타임 타입 안전성",
        },
      ],
    },
    {
      category: "Styling",
      items: [
        {
          name: "Tailwind CSS 4",
          desc: "JIT 컴파일로 미사용 클래스 zero — 최소 CSS 번들",
        },
        {
          name: "shadcn/ui",
          desc: "Radix UI 기반 접근성 + 완전한 커스터마이징",
        },
      ],
    },
    {
      category: "UI & Data",
      items: [
        {
          name: "TanStack Table",
          desc: "가상화(virtualization) 지원 — 대용량 데이터 무한스크롤",
        },
      ],
    },
    {
      category: "State",
      items: [
        {
          name: "Zustand",
          desc: "Redux 대비 ~90% 보일러플레이트 감소. shallow compare 로 리렌더 최소화",
        },
      ],
    },
    {
      category: "Auth",
      items: [
        {
          name: "Auth.js v5",
          desc: "Next.js middleware 통합으로 서버사이드 세션 검증 일원화",
        },
      ],
    },
    {
      category: "Forms & Validation",
      items: [
        {
          name: "Zod + React Hook Form",
          desc: "런타임 타입 검증 + 비제어 입력으로 리렌더 최소화",
        },
      ],
    },
    {
      category: "Permissions",
      items: [
        {
          name: "CASL",
          desc: "역할 기반 UI 분기를 컴포넌트 외부에서 선언형으로 처리",
        },
      ],
    },
    {
      category: "Utilities",
      items: [
        {
          name: "Day.js",
          desc: "Moment.js 대비 번들 크기 ~97% 절감 (~2 kB vs ~67 kB)",
        },
      ],
    },
    {
      category: "Infrastructure",
      items: [
        {
          name: "Vercel",
          desc: "PR 마다 Preview URL 자동 생성 → 빠른 디자인 피드백 루프",
        },
        {
          name: "GitHub Actions",
          desc: "lint · type check · build 3단계 자동화",
        },
      ],
    },
    {
      category: "Code Quality",
      items: [
        {
          name: "ESLint + simple-import-sort",
          desc: "import 순서 자동 정렬 → diff 노이즈 제거",
        },
        {
          name: "Prettier + tailwindcss plugin",
          desc: "Tailwind 클래스 순서 자동 정렬 → 일관된 코드베이스",
        },
        {
          name: "Storybook",
          desc: "Atom · Molecule 격리 개발 → 사이드 이펙트 없는 UI 변경",
        },
      ],
    },
  ],
  architecture: [
    {
      label: "src/app/",
      items: [
        "(auth) — login, signup",
        "(main) — admin, dashboard, operate, users",
        "(popup)",
      ],
    },
    {
      label: "src/components/",
      items: [
        "atoms — button, checkbox, dialog, dropdown, input, loadingSpinner, popover, radio, text",
        "molecules",
        "organisms",
        "templates",
      ],
    },
    {
      label: "src/features/",
      items: ["admin", "dashboard", "operate"],
    },
    {
      label: "src/hooks/",
      items: ["use-mobile.ts", "useAsyncList.ts", "useDataTable.ts"],
    },
    {
      label: "src/lib/",
      items: ["date.ts", "utils.ts"],
    },
    {
      label: "src/stores/",
      items: ["useSearchStore.ts"],
    },
    {
      label: "src/api/",
      items: ["client.ts", "http.ts"],
    },
  ],
};

/**
 * Evidence placeholder 아이템.
 *
 * - `src` 가 비어 있으면 UI 는 자동으로 "준비 중" 상태로 렌더됩니다
 *   (EvidencePlaceholder 컴포넌트). `hint` 는 개발자 전용 메모라 UI에 노출되지 않습니다.
 * - 실제 이미지를 `public/evidence/` 에 저장한 뒤 `src` 만 교체하세요.
 */
export type EvidenceItem = { label: string; hint: string; src: string };

export const EVIDENCE_RN076: EvidenceItem[] = [
  {
    label: "package.json 버전 변경 이력",
    hint: "public/evidence/package-diff.png",
    src: "",
  },
  {
    label: "Hermes 프로파일러 메모리 개선",
    hint: "public/evidence/hermes-memory.png",
    src: "",
  },
  {
    label: "patch-package 파일 목록",
    hint: "public/evidence/patch-package.png",
    src: "",
  },
];

export const EVIDENCE_CONVENTION: EvidenceItem[] = [
  {
    label: "ESLint 설정 파일",
    hint: "public/evidence/eslint-config.png",
    src: "",
  },
  {
    label: "Storybook 컴포넌트 목록",
    hint: "public/evidence/storybook-sidebar.png",
    src: "",
  },
  {
    label: "컴포넌트 명명 규칙 문서",
    hint: "Notion 링크 또는 public/evidence/naming-convention.png",
    src: "",
  },
];
