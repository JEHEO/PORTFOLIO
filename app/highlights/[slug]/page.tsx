/**
 * Highlight 상세 페이지 (서버 컴포넌트).
 *
 * - `output: "export"` 정적 빌드를 위해 `generateStaticParams()` 를 export 합니다.
 *   (동적 라우트는 빌드 타임에 어떤 slug 를 미리 생성할지 알려줘야 함)
 * - 실제 UI · 인터랙션은 `HighlightDetailClient` 에 위임. 이 파일은 "use client" 가 아니어야
 *   `generateStaticParams` 가 유효합니다.
 */

import { HIGHLIGHTS } from "@/lib/highlights";

import { HighlightDetailClient } from "./HighlightDetailClient";

/** 빌드 타임에 모든 highlight slug 에 대해 정적 페이지를 생성 */
export function generateStaticParams() {
  return HIGHLIGHTS.map((h) => ({ slug: h.slug }));
}

/** Next.js 15+ 에서 params 는 Promise 로 전달됩니다 */
export default async function HighlightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <HighlightDetailClient slug={slug} />;
}
