// 학원 시기 작업물 상세 페이지 — 정적 export 용 generateStaticParams 로
// 빌드 시점에 5개 슬러그를 모두 정적 페이지로 만들어둡니다.

import { PRACTICE_WORKS } from "@/lib/practice-works";

import { PracticeDetailClient } from "./PracticeDetailClient";

export function generateStaticParams() {
  return PRACTICE_WORKS.map((w) => ({ slug: w.slug }));
}

export default async function PracticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PracticeDetailClient slug={slug} />;
}
