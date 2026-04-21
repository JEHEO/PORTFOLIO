# ROADMAP.md — 피처 히스토리 + 의존관계 + 진행 상태

> 마지막 업데이트: 2026-04-20
> 상태 기호: ✅ 완료 | 🚧 진행 중 | 📋 예정 | ❌ 취소

---

## 현재 스프린트 (v0.2)

| # | 피처 | 상태 | 담당 | 의존 |
|---|------|------|------|------|
| F-001 | 프로젝트 초기 세팅 (Next.js + TS + Tailwind) | ✅ 완료 | — | — |
| F-002 | 문서 구조 세팅 (CLAUDE.md, docs/, templates/) | ✅ 완료 | — | F-001 |
| F-003 | 홈 페이지 레이아웃 (섹션 10개) | ✅ 완료 | — | F-001 |
| F-004 | i18n / 테마 스토어 + FOUC 방지 | ✅ 완료 | — | F-001 |
| F-005 | Highlight 상세 페이지 (4종) | ✅ 완료 | — | F-003 |
| F-006 | 공통 UI/섹션 컴포넌트 분리 | ✅ 완료 | — | F-003 |
| F-007 | GitHub Contributions / Stats 연동 | ✅ 완료 | — | F-003 |
| F-008 | Evidence 스크린샷 채우기 (public/evidence/) | 🚧 진행 중 | — | F-005 |
| F-009 | Clean Code Showcase — 실제 GitHub 파일 URL 교체 | 🚧 진행 중 | — | F-003 |
| F-010 | `next/image` 전면 적용 + remotePatterns 설정 | 📋 예정 | — | F-008 |
| F-011 | 반응형 네비게이션 (모바일 햄버거 메뉴) | 📋 예정 | — | F-003 |
| F-012 | 메타데이터 / OG 이미지 / sitemap.ts | 📋 예정 | — | F-003 |

---

## 마일스톤

### v0.1 — 기반 구축 ✅ 완료
**목표:** 프로젝트 초기 구조 및 개발 환경 완성
**기간:** 2026-03-01 ~ 2026-03-31

- [x] Next.js 16 + React 19 + TypeScript 세팅
- [x] Tailwind CSS v4 세팅 (class-based dark mode)
- [x] ESLint / Prettier 설정
- [x] 프로젝트 문서 구조 (CLAUDE.md, docs/)
- [x] 홈 페이지 기본 레이아웃

---

### v0.2 — 콘텐츠 구성 (현재)
**목표:** 주요 섹션 채우기 + 내부 결합도 정리
**기간:** 2026-04-01 ~ 2026-04-30

- [x] About / 자기소개 섹션
- [x] Expertise & Leadership 카드 (4개)
- [x] Experience (회사 + 프로젝트 3개)
- [x] Clean Code Showcase
- [x] Skills / 기술 스택
- [x] GitHub Contributions · Stats
- [x] 2020 레거시 포트폴리오 링크
- [x] Contact 섹션
- [x] Highlight 상세 페이지 4종
- [x] app/page.tsx 분해 → components/sections/
- [x] Highlight index coupling 제거 (slug 직접 매핑)
- [x] FOUC 방지 인라인 스크립트
- [ ] Evidence 스크린샷 채우기 (public/evidence/)
- [ ] Clean Code Showcase GitHub 파일 URL 채우기

---

### v0.3 — 고도화 (예정)
**목표:** 성능 최적화 및 사용자 경험 개선
**기간:** 2026-05-01 ~ 2026-05-31

- [ ] 이미지 최적화 (next/image 적용 + remotePatterns)
- [ ] 메타데이터 / OG 이미지 / sitemap.ts SEO 최적화
- [ ] 반응형 네비게이션 (모바일 햄버거 메뉴)
- [ ] 에러 바운더리 / 404 UI 고도화
- [ ] 성능 측정 및 Core Web Vitals 개선

---

### v1.0 — 프로덕션 릴리스 (예정)
**목표:** 프로덕션 배포 준비 완료
**기간:** 2026-06-01 ~

- [ ] GitHub Actions 기반 CI (lint + type check + build)
- [ ] Vercel 자동 배포 + Preview URL
- [ ] 모니터링/에러 트래킹 연동 (필요 시)
- [ ] 도메인 연결

---

## 피처 의존관계 그래프

```
F-001 (초기 세팅)
  ├── F-002 (문서 구조)
  ├── F-003 (홈 페이지)
  │     ├── F-005 (상세 페이지)
  │     │     └── F-008 (Evidence 채우기)
  │     ├── F-006 (컴포넌트 분리)
  │     ├── F-007 (GitHub 연동)
  │     ├── F-009 (Code Showcase URL)
  │     └── F-011 (모바일 네비)
  └── F-004 (i18n / 테마 / FOUC)
```

---

## 취소된 피처

| # | 피처 | 취소 사유 | 날짜 |
|---|------|----------|------|
| — | `seededRand` 기반 로컬 기여도 캘린더 | 가짜 데이터 문제 → 실제 SVG(ghchart.rshah.org) 로 교체 | 2026-04-20 |

---

## 변경 로그

### 2026-04-20
- app/page.tsx(1,059줄) 를 components/sections/ 10개로 분해 (F-006)
- Highlight 카드 index coupling 제거, slug 직접 매핑으로 전환
- globals.css body 폰트 버그(Arial로 덮어씀) 수정
- <html lang> 동적 전환 + 다크모드 FOUC 방지 인라인 스크립트 추가 (F-004)
- GitHub 잔디 가짜 데이터 제거, ghchart.rshah.org 실제 히트맵 연결 (F-007)
- Experience Next.js 프로젝트 상세를 <details> 디스클로저로 접기 — Bomulsen 과의 시각 무게 균형
- About / Contact 섹션 신규 추가
- 영어 타이틀 재작성 ("A Design-Trained Frontend Lead Who Ships with Grit")
- ROADMAP 현행화

### 2026-03-25
- 프로젝트 문서 구조 초기 세팅 완료 (F-002)
- ROADMAP, FRAMEWORK, API_SPEC, BACKLOG 문서 생성

### 2026-03-01
- Next.js 16.2.1 기반 프로젝트 초기 생성 (F-001)
