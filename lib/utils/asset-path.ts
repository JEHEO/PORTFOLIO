/**
 * 정적 asset 경로에 Next.js `basePath` 를 수동으로 prefix 하는 헬퍼.
 *
 * 왜 필요한가
 * - Next.js 의 `basePath` 는 `<Link>` / `next/image` 에만 자동 적용됩니다.
 * - 이 프로젝트는 외부 CDN 이미지(cdn.simpleicons.org, ghchart 등) 와 혼재돼 있어
 *   `<img>` / `<video>` 태그를 직접 사용하는데, 이 경우 `/experience/foo.png` 같은 경로는
 *   basePath 가 붙지 않아 GitHub Pages 배포 시 404 가 납니다.
 * - `asset(path)` 로 감싸면 로컬 dev 에선 원래 경로, 배포 환경에선 `/PORTFOLIO_2026/...` 로 prefix.
 *
 * 외부 URL · data URI 은 그대로 반환하므로 모든 src 를 안전하게 래핑해도 무방합니다.
 *
 * `NEXT_PUBLIC_` prefix 덕분에 클라이언트 번들에도 env 값이 인라인됩니다.
 * (`next.config.ts` 의 basePath 와 반드시 같은 값을 써야 합니다 — 둘 다 같은 env 변수를 읽음)
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string | undefined): string | undefined {
  if (!path) return path;
  // 외부 URL · data URI 는 그대로
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
