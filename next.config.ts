import type { NextConfig } from "next";

/**
 * GitHub Pages 정적 배포용 설정.
 *
 * - `basePath` 는 `NEXT_PUBLIC_BASE_PATH` 환경변수에서 가져옵니다.
 *   - 로컬 dev: env 변수 없음 → `""` → `localhost:3000/` 에서 바로 접근
 *   - GitHub Actions 빌드: deploy.yml 의 env `NEXT_PUBLIC_BASE_PATH=/PORTFOLIO_2026` 적용
 * - 런타임에서도 `lib/utils/asset-path.ts` 의 `asset()` 헬퍼가 같은 env 변수를 읽어
 *   `<img src>`·`<video src>` 등에 동일 prefix 를 붙입니다.
 * - `output: "export"` — 정적 사이트 빌드
 * - `images: { unoptimized: true }` — GitHub Pages 에는 이미지 최적화 서버 없음
 * - `trailingSlash: true` — 디렉토리 기반 호스팅 호환
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
