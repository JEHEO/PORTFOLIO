/**
 * Expertise & Leadership 상세 페이지 데이터.
 *
 * - 홈의 카드 미리보기(title · description · tags) 는 `app/page.tsx` 의 번역본 `T.highlights`
 *   를 사용하고, 본 모듈은 각 카드의 **상세 페이지** 에 필요한 전체 콘텐츠를 제공합니다.
 * - `slug` 는 `/highlights/[slug]` 라우트 세그먼트에 그대로 대응됩니다.
 */

export type HighlightSection = {
  /** 섹션 헤딩. 예) "Context", "Approach" */
  heading: string;
  /** 문단(paragraph) 또는 불릿 리스트. 배열이면 <ul> 로 렌더됨 */
  body: string | string[];
};

export type HighlightLangContent = {
  title: string;
  /** 상단 메타 라인. 예) "2025 · 4주 · Bomulsen" */
  meta: string;
  /** 리드(요약) 문단. Hero 바로 아래에 한 문단으로 노출 */
  summary: string;
  sections: HighlightSection[];
};

export type Highlight = {
  slug: string;
  tags: string[];
  ko: HighlightLangContent;
  en: HighlightLangContent;
};

export const HIGHLIGHTS: Highlight[] = [
  // ─── 01. React Native 0.76 업그레이드 ─────────────────────────────────────
  {
    slug: "rn-upgrade",
    tags: ["Technical", "Problem Solving"],
    ko: {
      title: "React Native 0.76 업그레이드 트러블슈팅",
      meta: "2025 · 약 4주 · Bomulsen (React Native · Hermes)",
      summary:
        "Google Play 16KB 페이지 정책 대응을 위해 RN 0.70 → 0.76 마이그레이션을 주도했고, 13.7만 활성 사용자 서비스를 무중단으로 롤아웃했습니다.",
      sections: [
        {
          heading: "배경 (Context)",
          body: "2025년 하반기부터 Google Play 는 신규 업로드 앱에 16KB 페이지 정렬을 요구했습니다. 보물선은 네이티브 의존성이 많은 RN 0.70 기반 서비스였고, 13.7만 명의 활성 유저를 보유하고 있어 '정책 통과' 와 '서비스 안정성' 을 동시에 달성해야 했습니다.",
        },
        {
          heading: "문제 정의 (Problem)",
          body: [
            "서드파티 라이브러리 호환성 이슈 — RN 버전과 맞지 않아 빌드/런타임 에러를 내는 항목 대응",
            "RN 0.71 → 0.76 사이 Gradle · Xcode 빌드 설정 변경 누적 대응",
            "상단 status bar · 하단 home indicator 영역까지 콘텐츠가 채워져 안전 영역(safe area) 이 침범되는 회귀 이슈",
            "iOS 에서 한 Modal 이 닫히자마자 다음 Modal 을 열면 두 번째 팝업이 렌더되지 않는 스태킹 타이밍 경합",
          ],
        },
        {
          heading: "접근 (Approach)",
          body: [
            "RN Upgrade Helper 를 기준으로 0.70 → 0.76 구간을 단계별 diff 로 분해, 파일 단위로 체크리스트화",
            "호환되지 않는 라이브러리는 patch-package 로 임시 패치 후 업스트림에 이슈 리포트",
            "스테이징 환경에서 핵심 유저 플로우(로그인 · 결제 · 박스 오픈) 회귀 테스트 후 단계적 롤아웃",
            "안전 영역 이슈 — `react-native-safe-area-context` 의 `useSafeAreaInsets` 로 상단·하단 inset 값을 측정해 루트 화면에 일관 적용, status bar · home indicator 영역 겹침 제거",
            "iOS 팝업 연속 오픈 이슈 — 이전 Modal 의 `onDismiss` 콜백 안에서 다음 Modal 을 열도록 오케스트레이션해 스태킹 타이밍 경합 해소",
          ],
        },
        {
          heading: "결과 (Result)",
          body: [
            "Play Store 16KB ELF alignment 정책 통과 · 정식 업로드 성공",
            "크래시율 무변화 상태로 100% 유저 롤아웃 완료",
          ],
        },
        {
          heading: "회고 (Takeaway)",
          body: "메이저 버전업은 소스 diff 보다 '빌드 시스템 변화' 에서 실제 공수가 발생한다는 걸 체감했습니다. 이후부터는 RN 코어뿐 아니라 Android · iOS SDK 업데이트 사이클도 분기별로 함께 관리하도록 팀 프로세스를 보강했습니다.",
        },
      ],
    },
    en: {
      title: "React Native 0.76 Upgrade Troubleshooting",
      meta: "2025 · ~4 weeks · Bomulsen (React Native · Hermes)",
      summary:
        "Led the RN 0.70 → 0.76 migration to comply with Google Play's 16KB alignment policy, rolling it out with zero downtime to a 137K MAU service.",
      sections: [
        {
          heading: "Context",
          body: "In late 2025, Google Play started requiring 16KB page alignment for newly uploaded apps. Bomulsen was an RN 0.70 service with heavy native dependencies and 137K active users, so we had to satisfy the policy and preserve stability at the same time.",
        },
        {
          heading: "Problem",
          body: [
            "Third-party library compatibility — handling libraries that broke at build or runtime under the new RN version",
            "Absorb accumulated Gradle / Xcode build config changes between 0.71 and 0.76",
            "Regression where content overflowed into the status bar and home indicator areas, breaking the safe-area layout",
            "On iOS, opening a second Modal immediately after the previous one closed caused the second popup to fail to render (stacking timing race)",
          ],
        },
        {
          heading: "Approach",
          body: [
            "Broke the 0.70 → 0.76 jump into step-wise diffs using RN Upgrade Helper and a per-file checklist",
            "Applied temporary fixes via patch-package for incompatible libs and reported upstream",
            "Ran critical user-flow regression tests (login · payment · box open) on staging, then rolled out in phases",
            "Safe-area regression — adopted `react-native-safe-area-context`'s `useSafeAreaInsets` consistently across every root screen, using the top/bottom inset values to eliminate status-bar and home-indicator overlap",
            "iOS chained-popup bug — orchestrated consecutive Modals by opening the next one inside the previous one's `onDismiss` callback, resolving the stacking timing race",
          ],
        },
        {
          heading: "Result",
          body: [
            "Passed the Play Store 16KB ELF alignment policy · successful production upload",
            "Rolled out to 100% of users with no increase in crash rate",
          ],
        },
        {
          heading: "Takeaway",
          body: "Major upgrades cost far more at the build-system layer than at the source-diff layer. After this, we added quarterly tracking of Android / iOS SDK update cycles — not just the RN core — into our team process.",
        },
      ],
    },
  },

  // ─── 02. 팀 프로세스 & 자동화 (컨벤션 수립 + AI 워크플로우 통합) ─────────────
  {
    slug: "team-process-automation",
    tags: ["Leadership", "Process", "AI"],
    ko: {
      title: "팀 프로세스 & 자동화",
      meta: "2023 – 2026 · 지속 개선 · 팀 규모 3명",
      summary:
        "Atomic Design · 코드 리뷰 프로세스를 팀에 정착시키고, Claude Code 기반 AI 페어 프로그래밍을 워크플로우에 통합해 사람 + 에이전트가 함께 컨벤션 · 셀프 리뷰 · 린트/타입 체크를 자동으로 수행하도록 설계했습니다.",
      sections: [
        {
          heading: "배경 (Context)",
          body: "빠른 성장기에 신규 팀원 온보딩과 레거시 유지보수가 동시에 진행되며 코드 스타일이 일관성을 잃기 시작했고, 이후 Next.js 16 신규 프로젝트로 진입하며 비교적 새로운 스택에서 컨벤션을 빠르게 안착시켜야 했습니다. '사람이 꼭 봐야 할 것' 과 '자동화가 대신할 수 있는 것' 을 명확히 분리하는 것이 목표였습니다.",
        },
        {
          heading: "문제 정의 (Problem)",
          body: [
            "컴포넌트 분리 기준이 개발자마다 달라 재사용성이 떨어짐",
            "스타일 · 상태 관리 · 폴더 구조 일관성 부족",
            "코드 리뷰가 '의미' 보다 '형식' 에 집중됨",
            "컨벤션 문서가 있어도 신규 파일 작성 시 일관되게 지켜지지 않음",
            "린트 · 타입 체크를 빌드 이전 단계에서 반복적으로 수동 실행",
            "신규 팀원 온보딩 초반 1 – 2주 생산성 저하",
          ],
        },
        {
          heading: "접근 (Approach) · 사람 레이어",
          body: [
            "Atomic Design 5계층 구조 (Atoms / Molecules / Organisms / Templates / Pages) 도입 — 분리 기준을 문서로 명문화",
            "ESLint · Prettier · simple-import-sort · tailwindcss plugin 표준화로 포맷 논쟁을 린터에 위임",
            "Storybook 으로 Atom · Molecule 단위 격리 개발 — 사이드 이펙트 없이 UI 변경",
            "PR 템플릿에 접근성 · 반응형 · 성능 체크리스트 삽입 — 작성자와 리뷰어가 같은 기준 사용",
            "격주 코드 리뷰 회고로 규칙 자체를 팀이 함께 개선",
          ],
        },
        {
          heading: "접근 (Approach) · 자동화 레이어",
          body: [
            "CLAUDE.md 에 기술 스택 · 패키지 구조 · 네이밍 · 커밋 컨벤션 · 워크플로우 4단계를 집약 — 에이전트가 항상 동일한 컨텍스트로 작동",
            ".claude/commands/ 에 `/review` (리뷰 기준 자동 적용) · `/lint-check` (ESLint + tsc 일괄 실행) 등 커스텀 커맨드 정의",
            ".claude/templates/ 에 Component · Hook · Screen · ViewModel · RouteHandler 5종 템플릿을 관리 — 신규 파일 생성 시 컨벤션 자동 준수",
            "표준 워크플로우 정립: 코드 작성 → /review → /lint-check → 빌드 검증 (중요 변경시)",
            "문서 · 정적 파일 변경 같은 예외는 문서에 명시해 에이전트가 과도하게 개입하지 않도록 가드레일 설정",
          ],
        },
        {
          heading: "결과 (Result)",
          body: [
            "리뷰 사이클 평균 시간 체감상 약 30% 단축 (팀 내 자체 평가)",
            "신규 팀원 첫 PR 머지까지 기간 단축 · 중복 컴포넌트 감소",
            "리뷰 단계 '스타일' 지적 감소 — 본질적 설계 논의에 집중",
            "린트 에러로 인한 빌드 실패 사전 차단",
            "본 포트폴리오 자체도 동일 워크플로우로 유지 — 프로세스를 스스로 증명",
          ],
        },
        {
          heading: "회고 (Takeaway)",
          body: "컨벤션은 '문서' 가 아니라 '사람의 합의 + 자동화 + 팀 문화' 세 축이 함께 작동할 때 유지됩니다. 린터로 막을 수 있는 것은 린터에, 에이전트가 강제할 수 있는 것은 에이전트에, 사람이 꼭 판단해야 할 부분만 리뷰에 남기는 구조가 장기적으로 지속 가능했습니다. 에이전트는 '더 빠른 개발자' 가 아니라 '컨벤션을 자동으로 강제하는 장치' 로 쓰는 쪽이 실질 ROI 가 높았습니다.",
        },
      ],
    },
    en: {
      title: "Team Process & Automation",
      meta: "2023 – 2026 · Continuous improvement · Team of 3",
      summary:
        "Formalized Atomic Design and code review processes, and integrated Claude Code-based AI pair programming into the team workflow — so conventions, self-reviews, and lint / type checks are performed automatically by human + agent together.",
      sections: [
        {
          heading: "Context",
          body: "During a period of fast growth, onboarding new engineers and maintaining legacy code happened in parallel, and code style started drifting. Later, entering a new Next.js 16 project required landing conventions quickly on a relatively new stack. The goal was to clearly separate 'what a human must review' from 'what automation can handle'.",
        },
        {
          heading: "Problem",
          body: [
            "Component boundaries differed per developer, hurting reusability",
            "Inconsistent styling / state management / folder structure",
            "Code reviews focused on 'form' rather than 'intent'",
            "Even with written conventions, new files didn't consistently follow them",
            "Lint and type checks were run manually over and over before builds",
            "New hires were ~1–2 weeks less productive during onboarding",
          ],
        },
        {
          heading: "Approach · Human layer",
          body: [
            "Adopted a 5-layer Atomic Design structure (Atoms / Molecules / Organisms / Templates / Pages) and documented the boundaries",
            "Standardized ESLint · Prettier · simple-import-sort · tailwindcss plugin to delegate formatting debates to the linter",
            "Used Storybook for isolated Atom / Molecule development — UI changes without side effects",
            "Added accessibility / responsive / performance checklists to the PR template so reviewer and author share the same bar",
            "Held biweekly review retros to let the team iterate on the rules themselves",
          ],
        },
        {
          heading: "Approach · Automation layer",
          body: [
            "Consolidated tech stack · package structure · naming · commit conventions · the 4-step workflow into CLAUDE.md — so the agent always operates with the same context",
            "Defined custom commands under .claude/commands/ — `/review` (apply review criteria) and `/lint-check` (run ESLint + tsc together)",
            "Maintained 5 code-generation templates (Component · Hook · Screen · ViewModel · RouteHandler) under .claude/templates/ so new files follow conventions by default",
            "Formalized the workflow: write code → /review → /lint-check → build verification (for significant changes)",
            "Documented exceptions (docs-only changes, minor style tweaks, static assets) so the agent doesn't over-intervene — guardrails, not shackles",
          ],
        },
        {
          heading: "Result",
          body: [
            "~30% perceived reduction in average review cycle time (self-reported by team)",
            "Shorter time-to-first-merged-PR for new hires · fewer duplicate components",
            "Fewer style / structure nits in review — more room for real design discussion",
            "Lint errors caught before they broke the build",
            "This portfolio itself is maintained with the same workflow — the process proves itself",
          ],
        },
        {
          heading: "Takeaway",
          body: "Conventions survive only when 'team agreement + automation + team culture' all work together. Let the linter enforce what it can, let the agent enforce what it can, and leave reviews for decisions that truly need human judgment — that's the sustainable shape. Using the agent as 'a tool that automatically enforces team conventions' delivered better ROI than using it as 'a faster developer'.",
        },
      ],
    },
  },

  // ─── 03. 보물함 화면 — 복합 상태 리스트 설계 (Bomulsen) ─────────────────────
  {
    slug: "bomulsen-treasure-box",
    tags: ["Technical", "State Machine", "UX"],
    ko: {
      title: "보물함 화면 — 복합 상태 리스트 설계",
      meta: "2024 · Bomulsen (React Native · FlatList)",
      summary:
        "탭·검색·필터·정렬·잠금 토글이 동시에 작동하는 단일 화면에서, 11종 상태코드 × 2종 타입코드 × 잠금 여부가 교차하는 버튼 매트릭스와 6종 모달을 하나의 패턴으로 정리했습니다.",
      sections: [
        {
          heading: "배경 (Context)",
          body: "보물선은 유저가 랜덤박스에서 획득한 보물을 보관 · 배송요청 · 거래소 출품 · 분해 · 판매중단 상품 포인트 환급까지 수행하는 서비스입니다. 이 모든 생애주기가 '내 보물함' 단일 화면에 모이기 때문에, 상태코드(00·01·02·03·40·41·43·45·70·-100·-200) × 타입코드(일반/쿠칩 기프티콘) × 잠금 여부가 교차하는 복합 UI를 설계해야 했습니다.",
        },
        {
          heading: "문제 정의 (Problem)",
          body: [
            "6개 탭 × 4종 정렬 × 검색어 × 카테고리 필터 × 잠금 토글이 동시에 유지되면서도 페이지네이션이 깨지지 않아야 함",
            "배송 · 거래 · 분해 · 환급 4개 액션의 활성/비활성/텍스트/이동 경로가 아이템 상태마다 달라짐",
            "서로 다른 6종 모달(이미지 알림 · 확인 · 단순 알림 · 환급 완료 · 필터 · 일반 알림)이 하나의 화면에서 간섭 없이 동작",
            "쿠칩 기프티콘 발송 제한 · 판매중단 상품 포인트 환급 등 서버 도메인 규칙이 UI 액션에 직접 반영됨",
            "수백 개 아이템 무한스크롤에서 스크롤 저하 · 재렌더 비용 관리",
            "푸시 · 알림센터에서 이 화면으로 딥링크 진입 시 배송 상세 페이지로 자동 이동 필요",
          ],
        },
        {
          heading: "접근 (Approach)",
          body: [
            "탭 × 검색 × 필터 × 정렬 × 잠금을 단일 fetch 쿼리 파라미터로 수렴하고, 상태 리셋은 listResetAction 한 곳에서만 일어나도록 정리 — '리스트가 지금 어떤 조건으로 그려지는가' 를 코드 한 곳에서 읽을 수 있게 함",
            "state_code × type_code × lock_yn 조합을 아이템 단위 버튼 매트릭스로 선언형 분기 — 배송요청/상세정보/발송요청, 거래하기/거래취소, 분해하기 활성 여부와 텍스트가 데이터만 보면 결정됨",
            "6종 모달을 공통 goEvent 콜백 패턴으로 통일 — 거래취소 · 포인트 환급처럼 위험한 액션도 '확인 → 실행 → 결과 피드백 → 리스트 리셋' 흐름으로 수렴",
            "쿠칩 발송 전 서버 제한 엔드포인트(couchipSendPriceLimitCheck) 사전 호출, 판매중단 기프티콘은 display_price 1,000원 단위 올림 포인트로 환급 — 도메인 규칙을 UI 레이어에서 안전하게 처리",
            "useCallback(renderItem) · React.memo(LockBtn) · FastImage · 페이지 끝 도달 시 stop-fetching 가드 · pull-to-refresh 조합으로 대량 아이템에서의 스크롤 성능 유지",
            "푸시 · 알림센터 진입을 route.params.params 기반 자동 내비게이션으로 처리하고, Android 물리 백버튼은 useFocusEffect + BackHandler 로 가로채 홈으로 리셋",
          ],
        },
        {
          heading: "결과 (Result)",
          body: [
            "하나의 화면에서 보물 생애주기 전 구간(보관 → 배송 → 거래 → 분해 → 환급)을 관리할 수 있게 됨",
            "버튼 · 모달 매트릭스를 코드 한 곳에 모아 신규 상태코드 추가 시 변경 지점을 최소화",
            "모달 오케스트레이션 · 리스트 파라미터 수렴 패턴을 거래소 · 구매 내역 등 다른 복합 리스트 화면에 재사용",
            "잠금 토글 · 포인트 환급 같은 되돌릴 수 없는 액션에서 '확인 모달 누락' 같은 사용자 실수 경로를 제거",
          ],
        },
        {
          heading: "회고 (Takeaway)",
          body: "복합 상태 UI는 UI 를 그리기 전에 '데이터 흐름과 버튼 매트릭스' 를 먼저 설계하는 편이 디버깅 공수를 크게 줄였습니다. 특히 '버튼이 언제 활성화되는가' 를 단일 매트릭스로 정리하니 QA 사이클도 짧아졌고, 이후 거래소 · 구매 내역처럼 상태가 많은 화면을 만들 때 그대로 재사용할 수 있는 템플릿이 되었습니다.",
        },
      ],
    },
    en: {
      title: "Treasure Box Screen — Complex State List Design",
      meta: "2024 · Bomulsen (React Native · FlatList)",
      summary:
        "On a single screen where tab, search, filter, sort, and a lock toggle all operate at once, I unified the button matrix across 11 state codes × 2 type codes × lock-flag combinations — and corralled six different modals into a single pattern.",
      sections: [
        {
          heading: "Context",
          body: "Bomulsen lets users store, ship, list, dismantle, and point-refund treasures obtained from random boxes. The entire lifecycle lives on one screen — 'My Treasure Box' — so the UI has to cross state codes (00·01·02·03·40·41·43·45·70·-100·-200) × type codes (regular / gift voucher) × the lock flag.",
        },
        {
          heading: "Problem",
          body: [
            "6 tabs × 4 sort options × search × category filter × lock toggle all had to coexist without breaking pagination",
            "Four actions (Ship, Trade, Dismantle, Refund) each had different enabled/disabled/label/navigation behaviour per item state",
            "Six distinct modals (image alert, confirm, simple alert, refund-complete, filter, info) had to operate on one screen without interfering",
            "Server-side domain rules — gift-voucher send limits, point refunds for discontinued products — had to surface directly in the UI",
            "Infinite scroll over hundreds of items required careful re-render and scroll-performance tuning",
            "Push / notification-center entry had to deep-link straight into the correct delivery-detail page",
          ],
        },
        {
          heading: "Approach",
          body: [
            "Collapsed tab × search × filter × sort × lock into a single fetch-query parameter, funnelling every state reset through one listResetAction — so 'what conditions the list is currently rendered with' can be read in one place",
            "Expressed the state_code × type_code × lock_yn combinations as a declarative per-item button matrix — Ship/Detail/Send, Trade/Cancel, Dismantle availability and label are all decided from data alone",
            "Unified all six modals behind a shared goEvent callback pattern — even irreversible actions like trade-cancel and point refund follow the same 'confirm → execute → feedback → list reset' flow",
            "Called the server limit endpoint (couchipSendPriceLimitCheck) before sending vouchers and rounded discontinued-product point refunds up to the nearest 1,000-won — keeping domain rules safe inside the UI layer",
            "Combined useCallback(renderItem) · React.memo(LockBtn) · FastImage · an end-of-list stop-fetching guard · pull-to-refresh to keep scrolling smooth on large item sets",
            "Handled push / notification-center entry via route.params.params auto-navigation, and intercepted the Android hardware back button with useFocusEffect + BackHandler to reset to home",
          ],
        },
        {
          heading: "Result",
          body: [
            "One screen covers the full treasure lifecycle — store → ship → trade → dismantle → refund",
            "Centralizing the button · modal matrix minimised the number of change sites when new state codes were added",
            "The modal-orchestration and list-parameter-funnelling patterns were reused on other complex list screens (marketplace, purchase history)",
            "Removed 'missing confirm modal' classes of user-error paths for irreversible actions like lock toggles and point refunds",
          ],
        },
        {
          heading: "Takeaway",
          body: "For state-heavy UIs, designing the data flow and the button matrix first — before drawing the UI — dramatically cut debugging overhead. Reducing 'when is this button active?' to a single matrix shortened QA cycles, and the pattern became a reusable template for subsequent state-rich screens.",
        },
      ],
    },
  },

  // ─── 04. 디자인-엔지니어링 크로스 스킬 (NEW) ───────────────────────────────
  {
    slug: "design-engineering-crosskill",
    tags: ["Design", "Frontend", "Collaboration"],
    ko: {
      title: "디자인-엔지니어링 크로스 스킬",
      meta: "2012 – 현재 · 시각디자인 전공 → 프론트엔드 리드",
      summary:
        "시각디자인 전공자로 시작해 웹디자인기능사 · SQL 개발자 · 정보처리기사 · 컴퓨터공학 학사까지 의도적인 전환 경로를 밟았고, 지금은 디자인 시스템 · Figma 프로토타입 · 1인 UI/UX 담당까지 수행하는 프론트엔드 개발자로 일하고 있습니다.",
      sections: [
        {
          heading: "배경 (Context)",
          body: "2014년 충청대학 시각디자인을 졸업했지만 웹 퍼블리싱 현장에서 '디자인을 구현하는 쪽' 의 언어가 더 잘 맞는다고 느꼈습니다. 이후 웹디자인기능사(2020) → SQL 개발자(2023) → 정보처리기사(2024) → 학점은행제 컴퓨터공학 학사(2024) 순서로, 취미 전환이 아닌 '정식 자격 · 학위로 프론트엔드 엔지니어 포지션을 증명' 하는 경로를 선택했습니다.",
        },
        {
          heading: "실무에서 어떻게 작용하는가 (How it shows up in my work)",
          body: [
            "디자이너·기획자 미팅에서 '구현 가능성' 과 'UX 의도' 를 동시에 번역 — 시안 리뷰 단계에서 인터랙션 · 상태 변화 · 엣지 케이스까지 같이 정의",
            "디자인 시스템·토큰·컴포넌트 분리 기준을 함께 설계 — 구현 시점이 아니라 설계 시점에 Atomic Design 경계를 그음",
            "GOPANG — 인도네시아향 React 웹앱 전체를 디자인 · 퍼블리싱 · 구현 모두 1인으로 엔드투엔드 구축 (관리자 페이지 포함)",
            "Figma 프로토타입 · 상호작용 스펙을 스스로 작성해 개발자/디자이너 간 핑퐁 횟수 감소",
            "타이포그래피·여백·컬러 팔레트에 대한 기준을 코드 레벨(Tailwind 토큰, CSS 변수) 로 변환",
          ],
        },
        {
          heading: "정식 자격으로 증명한 엔지니어링 (Formal engineering credentials)",
          body: [
            "정보처리기사 (2024.12, 한국산업인력공단) — 소프트웨어 설계·DB·네트워크·운영체제 등 CS 기초 자격 국가 표준",
            "SQL 개발자 (2023.10, 한국데이터산업진흥원) — 관계형 모델·SQL 작성·성능 기초",
            "웹디자인기능사 (2020.12, 한국산업인력공단) — HTML/CSS/JS 및 디자인 툴 실무 자격",
            "컴퓨터공학 학사 (2023.08 – 2024.10, 학점은행제, 4.13 / 4.5) — 알고리즘·자료구조·시스템 프로그래밍 등 학사 수준 커리큘럼 이수",
          ],
        },
        {
          heading: "결과 (Result)",
          body: [
            "디자인 리뷰 · 개발 리뷰가 분리되지 않고, 같은 자리에서 이뤄지는 협업 루프 정착",
            "관리자 페이지 등 '디자이너 리소스가 부족한 영역' 을 자체 소화 — 전체 일정 단축",
            "신규 피처 기획 시 '구현 가능한 디자인' 을 빠르게 제안해 시안 폐기율 감소",
            "시각 디자인 감각과 CS 기초 자격을 함께 갖춰 디자인·엔지니어링 어느 쪽 조직에 배치돼도 컨텍스트 스위치 비용이 낮음",
          ],
        },
        {
          heading: "회고 (Takeaway)",
          body: "'디자인도 할 줄 아는 프론트엔드' 는 자칫 구현 깊이를 희생하는 포지션으로 읽히기 쉬워서, 정반대 방향 — 정식 자격 · 학위로 엔지니어링 정체성을 명확히 — 을 선택했습니다. 지금은 디자인 감각을 보유하되, 그것이 '엔지니어링 품질' 을 대체하지 않고 강화한다는 조합으로 포지셔닝하고 있습니다.",
        },
      ],
    },
    en: {
      title: "Design–Engineering Cross-Skill",
      meta: "2012 – present · Design major → frontend lead",
      summary:
        "I started as a Visual Communication Design major and chose an intentional path into engineering — Craftsman Web Design, SQL Developer, Engineer Information Processing, and a Bachelor in Computer Science. Today I work as a frontend engineer who also owns design systems, Figma prototypes, and solo UI/UX ownership for admin surfaces.",
      sections: [
        {
          heading: "Context",
          body: "I graduated in Visual Communication Design from Chungcheong University in 2014, but in the field I found I fit better on the 'implementation' side of the design/dev seam. From there I took a formal route — Craftsman Web Design (2020) → SQL Developer (2023) → Engineer Information Processing (2024) → a BEng in Computer Science through Korea's Academic Credit Bank System (2024) — not as a hobby switch, but to formally certify a frontend engineer identity.",
        },
        {
          heading: "How it shows up in my work",
          body: [
            "In design reviews I translate between 'what's buildable' and 'what the UX intends' at the same time — interactions, state transitions, and edge cases are defined alongside the mock",
            "I co-define design tokens, systems, and component boundaries at the design phase — Atomic Design boundaries get drawn before code, not during",
            "GOPANG — solo end-to-end build of the Indonesian React web app (design · publishing · implementation, including the admin dashboard)",
            "I build Figma prototypes and interaction specs myself, cutting the dev/design ping-pong loop",
            "Typography, spacing, and palette judgments translate directly into code-level tokens (Tailwind, CSS variables)",
          ],
        },
        {
          heading: "Formal engineering credentials",
          body: [
            "Engineer Information Processing (Dec 2024, HRD Korea) — Korea's national CS foundation license covering software design, DB, networking, and OS",
            "SQL Developer / SQLD (Oct 2023, Korea Data Agency) — relational modeling, SQL authoring, and performance basics",
            "Craftsman Web Design (Dec 2020, HRD Korea) — HTML/CSS/JS and design-tool practice",
            "B.Eng. in Computer Science (Aug 2023 – Oct 2024, Academic Credit Bank System, GPA 4.13 / 4.5) — algorithms, data structures, systems programming, and the rest of the bachelor-level curriculum",
          ],
        },
        {
          heading: "Result",
          body: [
            "Design review and engineering review happen in the same conversation rather than as separate passes",
            "'Design-resource-limited' surfaces like admin dashboards are absorbed in-house, shortening total timelines",
            "Faster feasibility feedback at the idea stage — fewer mocks scrapped",
            "I fit either into a design-leaning team or an engineering-leaning team with low context-switch cost",
          ],
        },
        {
          heading: "Takeaway",
          body: "A 'designer who can code' positioning often sacrifices engineering depth. I chose the opposite — formal credentials and a BEng to cement the engineering identity first. Design sensibility doesn't replace engineering quality; it reinforces it.",
        },
      ],
    },
  },

];

export const HIGHLIGHT_SLUGS = HIGHLIGHTS.map((h) => h.slug);

export function findHighlight(slug: string): Highlight | undefined {
  return HIGHLIGHTS.find((h) => h.slug === slug);
}
