/**
 * Clean Code Showcase 섹션 및 커밋 컨벤션 데이터.
 */

export type CodeFile = {
  label: string;
  path: string;
  patterns: string[];
  desc: string;
  descEn: string;
  /**
   * 패턴을 보여주는 짧은 코드 스니펫.
   * - 실무 회사 코드가 아닌, 해당 패턴의 **NDA-safe 한 교과서적 예시** 입니다.
   * - 10~20줄 수준으로 짧게 유지해 "이런 구조로 구현한다" 를 한 눈에 전달.
   */
  snippet: string;
};

/**
 * Clean Code 패턴을 보여주는 핵심 파일 목록.
 * 각 파일의 `snippet` 은 실제 구현에서 비즈니스 로직만 마스킹한 sanitize 버전입니다.
 * 클릭 시 인라인으로 펼쳐져 디스클로저 형태로 노출됩니다.
 */
export const CODE_FILES: CodeFile[] = [
  {
    label: "useAsyncList.ts",
    path: "src/hooks/useAsyncList.ts",
    patterns: ["Custom Hook", "SRP"],
    desc: "서버 데이터 비동기 fetch + 로딩 상태를 단일 훅으로 추상화",
    descEn:
      "Abstracts async server fetch + loading state into a single hook",
    snippet: `import { useState } from "react";

export function useAsyncList<TResponse, TParams>(
  fetcher: (params: TParams) => Promise<TResponse>,
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(params: TParams): Promise<TResponse> {
    setLoading(true);
    try {
      const res = await fetcher(params);
      setData(res);
      return res;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, load };
}`,
  },
  {
    label: "useTable.ts",
    path: "src/hooks/useTable.ts",
    patterns: ["Custom Hook", "Separation of Concerns"],
    desc: "TanStack Table 설정 + 정렬 · 필터 · 행 선택 상태를 훅으로 캡슐화",
    descEn:
      "Encapsulates TanStack Table config + sorting, filtering, and row-selection state in a hook",
    snippet: `"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type UseTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
};

export function useTable<TData>({ data, columns }: UseTableProps<TData>) {
  "use no memo";
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  // 상태도 노출해 페이지 레벨에서 직접 제어 가능
  return {
    table,
    sorting, setSorting,
    columnFilters, setColumnFilters,
    rowSelection, setRowSelection,
  };
}`,
  },
  {
    label: "Button.stories.tsx",
    path: "src/components/atoms/button/Button.stories.tsx",
    patterns: ["Atomic Design", "Storybook"],
    desc: "variants · size 옵션을 argTypes + autodocs 로 문서화한 Atom 컴포넌트",
    descEn:
      "Atom component with variant / size options, documented via argTypes + autodocs",
    snippet: `import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "atoms/button",
  component: Button,
  args: {
    children: "Button",
    onClick: () => console.log("button clicked"),
  },
  argTypes: {
    variant: {
      options: ["default", "secondary", "outline", "disable"],
      description: "버튼 스타일",
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "lg", "icon"],
      description: "버튼 크기",
      control: { type: "radio" },
    },
    asChild: { table: { disable: true } },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Secondary: Story = { args: { variant: "secondary", size: "sm" } };
export const Outline: Story = { args: { variant: "outline", size: "lg" } };
export const Disable: Story = { args: { variant: "disable" } };`,
  },
  {
    label: "useSearchStore.ts",
    path: "src/stores/useSearchStore.ts",
    patterns: ["Zustand", "Separation of Concerns"],
    desc: "검색 키워드 / 날짜 범위를 각자 store 로 분리 — 관심사별 독립 구독",
    descEn:
      "Search keyword and date range split into independent Zustand stores — concern-based subscription",
    snippet: `import { create } from "zustand";
import { getDateRangeByPeriod } from "@/lib/date";

interface SearchKeywordStore {
  searchType: string;
  keyword: string;
  setKeyword: (keyword: string) => void;
  setSearchType: (type: string) => void;
  reset: () => void;
}

interface SearchDateStore {
  startDate: Date | null;
  endDate: Date | null;
  period: string; // day | week | month | 3months | 6months | all
  setDateRange: (start: Date | null, end: Date | null) => void;
  setPeriod: (period: string) => void;
}

export const useSearchKeyword = create<SearchKeywordStore>((set) => ({
  keyword: "",
  searchType: "",
  setKeyword: (keyword) => set({ keyword }),
  setSearchType: (searchType) => set({ searchType }),
  reset: () => set({ keyword: "" }),
}));

export const useSearchDate = create<SearchDateStore>((set) => ({
  period: "week",
  ...getDateRangeByPeriod("week"),
  setPeriod: (period) => {
    const { startDate, endDate } = getDateRangeByPeriod(period);
    set({ period, startDate, endDate });
  },
  setDateRange: (startDate, endDate) =>
    set({ startDate, endDate, period: "" }),
}));`,
  },
  {
    label: "http.ts",
    path: "src/api/http.ts",
    patterns: ["Type-Safe Wrapper", "REST Facade"],
    desc: "제네릭 리턴 타입을 강제한 얇은 REST 메서드 wrapper (인터셉터는 apiClient 에서 중앙화)",
    descEn:
      "Thin REST method wrapper that enforces typed return values (interceptors centralized in apiClient)",
    snippet: `import { apiClient } from "./client";

export const http = {
  get: <T>(url: string, params?: unknown) =>
    apiClient.get<T>(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: unknown) =>
    apiClient.post<T>(url, data).then((res) => res.data),

  put: <T>(url: string, data?: unknown) =>
    apiClient.put<T>(url, data).then((res) => res.data),

  delete: <T>(url: string, params?: unknown) =>
    apiClient.delete<T>(url, { params }).then((res) => res.data),
};`,
  },
];

/**
 * 실제 파이프라인 히스토리에서 가져온 커밋 샘플.
 *
 * - 팀 컨벤션이 `feat` · `fix` · `chore` 3종 타입으로 운영되어 해당 타입에 맞춘 예시만 수록.
 * - 번호(`num`) 는 내림차순 = 최근순으로 표시.
 * - `message` (ko) / `messageEn` (en) 으로 언어별 렌더. 렌더러(CommitConventionSection) 가
 *   `lang` prop 에 따라 스위칭합니다.
 */
export type CommitSample = {
  type: string;
  message: string;
  messageEn: string;
  num: number;
};

export const COMMIT_SAMPLES: CommitSample[] = [
  {
    type: "feat",
    message: "관리자 페이지 사용자 일괄 승인 기능 추가",
    messageEn: "Add bulk user approval to admin page",
    num: 28,
  },
  {
    type: "feat",
    message: "검색 필터 다중 선택 지원",
    messageEn: "Support multi-select in search filter",
    num: 25,
  },
  {
    type: "fix",
    message: "Next.js 15 params async 타입 대응",
    messageEn: "Handle Next.js 15 async params type",
    num: 22,
  },
  {
    type: "fix",
    message: "세션 만료 시 자동 로그아웃 처리",
    messageEn: "Auto-logout on session expiry",
    num: 19,
  },
  {
    type: "chore",
    message: "ESLint + Prettier 규칙 표준화",
    messageEn: "Standardize ESLint + Prettier rules",
    num: 15,
  },
  {
    type: "chore",
    message: "Next.js 보안 패치 버전 업그레이드",
    messageEn: "Upgrade Next.js for security patch",
    num: 12,
  },
];

export const COMMIT_COLORS: Record<string, string> = {
  feat: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  fix: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  //   refactor:
  //     "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  //   style: "bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400",
  //   docs: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  //   test: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-600",
  chore: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
};
