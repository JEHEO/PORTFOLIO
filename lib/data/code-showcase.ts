/**
 * Clean Code Showcase 섹션 및 커밋 컨벤션 데이터.
 */

export type CodeFile = {
  label: string;
  path: string;
  /** 실제 GitHub 파일 URL. `"#"` 이면 자동으로 비활성(🔒) 처리됩니다. */
  href: string;
  patterns: string[];
  desc: string;
  descEn: string;
};

/**
 * Clean Code 패턴을 보여주는 핵심 파일 목록.
 * TODO: href 값을 실제 GitHub file URL 로 교체하세요.
 */
export const CODE_FILES: CodeFile[] = [
  {
    label: "useAsyncList.ts",
    path: "src/hooks/useAsyncList.ts",
    href: "#",
    patterns: ["Custom Hook", "SRP"],
    desc: "서버 데이터 비동기 fetch + 로딩/에러 상태를 단일 훅으로 추상화",
    descEn:
      "Abstracts async server fetch + loading/error state into a single hook",
  },
  {
    label: "useDataTable.ts",
    path: "src/hooks/useDataTable.ts",
    href: "#",
    patterns: ["Custom Hook", "Separation of Concerns"],
    desc: "TanStack Table 설정·컬럼·정렬·페이지네이션 로직 캡슐화",
    descEn:
      "Encapsulates TanStack Table config, columns, sorting, and pagination logic",
  },
  {
    label: "Button.stories.tsx",
    path: "src/components/atoms/button/Button.stories.tsx",
    href: "#",
    patterns: ["Atomic Design", "Storybook"],
    desc: "variants · size · disabled 상태를 Storybook으로 문서화한 Atom 컴포넌트",
    descEn:
      "Atom component with variants, size, and disabled states documented via Storybook",
  },
  {
    label: "useSearchStore.ts",
    path: "src/stores/useSearchStore.ts",
    href: "#",
    patterns: ["Zustand", "Global State"],
    desc: "Zustand persist + shallow compare로 불필요한 리렌더링 차단",
    descEn:
      "Zustand store with persist + shallow compare to prevent unnecessary re-renders",
  },
  {
    label: "http.ts",
    path: "src/api/http.ts",
    href: "#",
    patterns: ["Axios Interceptor", "Error Handling"],
    desc: "토큰 갱신·에러 핸들링을 인터셉터로 중앙화한 HTTP 클라이언트",
    descEn:
      "Centralized HTTP client with token refresh and error handling via interceptors",
  },
];

/** 실제 파이프라인 히스토리에서 가져온 커밋 샘플 (스크린샷 소스) */
export const COMMIT_SAMPLES: { type: string; message: string; num: number }[] =
  [
    { type: "fix", message: "ReviewListPage import 순서 자동 수정", num: 19 },
    { type: "fix", message: "Next.js 15 params async 타입 대응", num: 17 },
    {
      type: "fix",
      message: "upgrade Next.js to fix security vulnerability",
      num: 10,
    },
    { type: "feat", message: "dashboard 작업중", num: 20 },
    {
      type: "chore",
      message: "build warnings 제거 및 hydration 오류 수정",
      num: 24,
    },
    { type: "chore", message: "lint test 정리", num: 23 },
  ];

export const COMMIT_COLORS: Record<string, string> = {
  feat: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  fix: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  refactor:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  style: "bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400",
  docs: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  test: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-600",
  chore: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
};
