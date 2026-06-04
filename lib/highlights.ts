/**
 * Expertise & Leadership 상세 페이지 데이터.
 *
 * - 홈의 카드 미리보기(title · description · tags)는 `app/page.tsx` 의 번역본 `T.highlights`
 *   를 사용하고, 본 모듈은 각 카드의 상세 페이지에 필요한 전체 콘텐츠를 제공합니다.
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
  {
    slug: "team-process-automation",
    tags: ["Publishing", "Design System", "Process"],
    ko: {
      title: "마크업 컨벤션 & 디자인 시스템 정착",
      meta: "2023 – 2026 · 지속 개선 · 팀 규모 3명",
      summary:
        "팀의 마크업·UI 일관성을 위해 Atomic Design 5계층 구조와 디자인 토큰 기반 공통 컴포넌트 체계를 정착시키고, PR 템플릿에 반응형·접근성·시각 일관성 체크리스트를 더해 퍼블리싱 품질을 표준화했습니다.",
      sections: [
        {
          heading: "배경",
          body: "팀이 빠르게 성장하면서 신규 입사자 온보딩과 레거시 유지보수가 동시에 진행되다 보니 마크업 스타일과 컴포넌트 분리 기준이 개발자마다 조금씩 달라지기 시작했어요. 신규 Next.js 프로젝트를 새로 시작하면서 '한 팀이 같은 시각 언어로 마크업을 짠다' 는 기준선을 빠르게 안착시켜야 했습니다.",
        },
        {
          heading: "문제 정의",
          body: [
            "컴포넌트를 어떻게 나눌지 기준이 개발자마다 달라 같은 UI 가 여러 번 새로 마크업됨",
            "디자인 토큰 (color · spacing · typography) 이 흩어져 있어 시각 일관성 유지 어려움",
            "리뷰가 '들여쓰기·따옴표' 같은 형식 지적에 머물러 시각·인터랙션 의도 논의가 부족했음",
            "반응형 · 접근성 · hover · focus 같은 마크업 디테일이 사람마다 챙기는 수준이 달랐음",
            "신규 입사자가 어디서부터 시안을 옮겨야 할지 감을 잡는 데 시간이 오래 걸림",
          ],
        },
        {
          heading: "접근 · 사람 레이어",
          body: [
            "팀원과 함께 논의해 Atomic Design 5계층(Atoms / Molecules / Organisms / Templates / Pages) 분리 기준을 문서로 정리 — 같은 UI 패턴은 한 번만 마크업",
            "Tailwind 디자인 토큰(color · spacing · typography · radius)을 시안과 1:1 매핑해 일관성을 마크업 단위에서 강제",
            "Storybook 환경을 셋업해 Atom · Molecule 단위 컴포넌트를 격리 개발 — 디자이너·기획자와 시안의 상태/상호작용까지 사전 합의",
            "ESLint · Prettier · simple-import-sort · tailwindcss plugin 을 표준으로 묶어 포맷 논쟁은 린터에 맡김",
            "PR 템플릿에 반응형 / 접근성 / 시각 일관성 / hover·focus 체크리스트를 넣어 작성자·리뷰어가 같은 기준으로 보도록",
            "격주 코드 리뷰 회고로 규칙 자체를 팀이 함께 다듬는 구조 마련",
          ],
        },
        {
          heading: "결과",
          body: [
            "같은 UI 가 여러 번 마크업되던 중복이 사라지고 컴포넌트 재사용률이 올라감",
            "리뷰가 '형식' 보다 '시안 의도 일치 여부 · 인터랙션 디테일' 같은 본질에 집중됨",
            "신규 입사자가 시안을 받자마자 Atom 단위로 분해해 작업 시작하는 흐름이 자연스러워짐",
          ],
        },
        {
          heading: "회고",
          body: "컨벤션은 문서만으로 유지되지 않고, 사람의 합의 · 디자인 시스템 · 팀 문화 세 축이 함께 돌아갈 때만 살아남는다는 걸 배웠습니다. 린터로 막을 수 있는 건 린터에, 디자인 토큰으로 강제할 수 있는 건 토큰에, 사람이 꼭 판단해야 할 시안 의도와 시각 디테일만 리뷰에 남기는 구조가 장기적으로 지속 가능했어요.",
        },
      ],
    },
    en: {
      title: "Markup Conventions & Design System",
      meta: "2023 – 2026 · Continuous improvement · Team of 3",
      summary:
        "Established a 5-layer Atomic Design system and design-token-based shared components for team-wide markup consistency. Added responsive · a11y · visual-consistency checklists to the PR template to standardize publishing quality.",
      sections: [
        {
          heading: "Context",
          body: "During a period of fast growth, onboarding new engineers and maintaining legacy code happened in parallel, and markup styles and component boundaries started drifting per developer. Entering a new Next.js project required landing the baseline 'one team, one visual language' for markup quickly.",
        },
        {
          heading: "Problem",
          body: [
            "Component boundaries differed per developer — the same UI was re-marked-up multiple times",
            "Design tokens (color · spacing · typography) were scattered, making visual consistency hard to keep",
            "Reviews stayed on indent/quote nits — not enough room to discuss visual or interaction intent",
            "Responsive · a11y · hover · focus details were maintained inconsistently",
            "New hires struggled to get a foothold on where to start translating mocks",
          ],
        },
        {
          heading: "Approach · Human layer",
          body: [
            "Co-decided a 5-layer Atomic Design split (Atoms / Molecules / Organisms / Templates / Pages) and documented the boundaries — each UI pattern gets marked up once",
            "Mapped Tailwind design tokens (color · spacing · typography · radius) 1:1 with the design system so consistency is enforced at the markup layer",
            "Set up Storybook for isolated Atom / Molecule development — pre-aligned states and interactions with designers and PMs",
            "Standardized ESLint · Prettier · simple-import-sort · tailwindcss plugin to delegate formatting debates to the linter",
            "Added responsive / a11y / visual-consistency / hover-focus checklists to the PR template so reviewer and author share the same bar",
            "Biweekly review retros let the team iterate on the rules themselves",
          ],
        },
        {
          heading: "Result",
          body: [
            "Redundant re-markup disappeared and component reuse went up",
            "Reviews moved from form to substance — design intent and interaction nuance",
            "New hires settled into 'receive mock → decompose into atoms → start building' as a natural rhythm",
          ],
        },
        {
          heading: "Takeaway",
          body: "Conventions survive only when team agreement, the design system, and team culture all work together. Let the linter enforce what it can, let design tokens enforce what they can, and reserve reviews for the design intent and visual nuance that only humans should judge — that's the sustainable shape.",
        },
      ],
    },
  },

  // ─── 03. 보물함 화면 — 복합 상태 리스트 설계 (Bomulsen) ─────────────────────
  {
    slug: "bomulsen-treasure-box",
    tags: ["Publishing", "Interaction", "UX"],
    ko: {
      title: "보물함 화면 — 복합 상태 UI 마크업",
      meta: "2024 · Bomulsen (React Native)",
      summary:
        "탭·검색·필터·정렬·잠금 토글이 한 화면에서 동시 동작하는 보물함 화면에서, 11종 상태코드 × 2종 타입코드 × 잠금 여부 조합에 따라 4개 액션 버튼과 6종 모달이 시안 의도대로 일관 동작하도록 마크업·인터랙션을 설계했습니다.",
      sections: [
        {
          heading: "배경",
          body: "보물선은 사용자가 랜덤박스에서 얻은 보물을 보관 · 배송 요청 · 거래소 출품 · 분해 · 판매중단 상품 포인트 환급까지 처리하는 서비스입니다. 이 모든 과정이 '내 보물함' 이라는 한 화면에 모이다 보니, 상태코드(00·01·02·03·40·41·43·45·70·-100·-200) × 타입코드(일반 / 쿠칩 기프티콘) × 잠금 여부가 복잡하게 교차하는 UI를 설계해야 했습니다.",
        },
        {
          heading: "문제 정의",
          body: [
            "6개 탭 · 4종 정렬 · 검색어 · 카테고리 필터 · 잠금 토글이 동시 작동하는 와중에도 리스트 마크업이 깨지지 않아야 함",
            "배송·거래·분해·환급 4개 액션 버튼의 활성 여부·문구·이동 경로가 아이템 상태마다 다른 시안",
            "6종 모달(이미지 알림·확인·단순 알림·환급 완료·필터·일반 알림)이 한 화면에서 서로 간섭 없이 동작해야 함",
            "쿠칩 기프티콘 발송 제한, 판매중단 상품 포인트 환급 등 도메인 규칙이 UI 표시로 즉시 반영돼야 함",
            "아이템이 수백 개 쌓여도 부드러운 스크롤 유지",
            "푸시·알림센터 딥링크 진입 시 배송 상세 화면으로 자연스럽게 이동",
          ],
        },
        {
          heading: "접근",
          body: [
            "탭·검색·필터·정렬·잠금 값을 한 묶음으로 정리해, 리스트 마크업이 '지금 어떤 조건으로 그려지는지' 한 지점에서 읽히도록 구조화",
            "state_code × type_code × lock_yn 조합에 따라 4개 액션 버튼의 활성 여부·문구·이동 경로를 시안 의도대로 일관 분기 마크업",
            "6종 모달을 공통 콜백 패턴으로 묶어, 거래 취소·포인트 환급처럼 되돌릴 수 없는 액션도 '확인 → 실행 → 피드백 → 리스트 갱신' 흐름이 동일하게 흐르도록 마크업",
            "쿠칩 발송 제한, 판매중단 기프티콘 1,000원 단위 올림 포인트 환급 같은 도메인 규칙을 UI 표시 단계에서 안전하게 노출",
            "FlatList 가상 스크롤 + FastImage + 페이지 끝 fetch 가드 + pull-to-refresh 조합으로 수백 개 아이템에서도 부드러운 스크롤 유지",
            "푸시·알림센터 진입은 자동 내비게이션으로, Android 물리 뒤로가기는 별도 가로채 홈으로 리셋되도록 인터랙션 정리",
          ],
        },
        {
          heading: "결과",
          body: [
            "한 화면에서 보물의 전체 생애주기(보관 → 배송 → 거래 → 분해 → 환급) 를 모두 관리할 수 있게 됨",
            "상태별 버튼·모달 분기 로직을 한 화면 안에 모아둔 덕분에 새 상태코드가 추가돼도 고쳐야 할 지점이 최소화",
            "모달 오케스트레이션과 리스트 파라미터 수렴 패턴을 거래소 · 구매 내역 같은 다른 복합 리스트 화면에 그대로 재사용",
            "거래 취소나 포인트 환급처럼 되돌릴 수 없는 액션에서 '확인 모달 누락' 같은 사용자 실수 경로를 원천 차단",
          ],
        },
        {
          heading: "회고",
          body: "상태가 많은 UI 는 화면을 그리기 전에 '데이터 흐름과 버튼 활성화 조건' 을 먼저 정리해두는 편이 디버깅 비용을 크게 줄여준다는 걸 배웠습니다. 특히 '이 버튼이 어떤 조건에서 활성화되는가' 를 한곳에 모으니 QA 사이클도 눈에 띄게 짧아졌고, 이후 거래소나 구매 내역처럼 상태가 많은 화면을 만들 때 그대로 가져다 쓸 수 있는 템플릿이 되어주었습니다.",
        },
      ],
    },
    en: {
      title: "Treasure Box — Complex-State UI Markup",
      meta: "2024 · Bomulsen (React Native)",
      summary:
        "On a single screen where tab, search, filter, sort, and a lock toggle all act at once, designed markup and interactions so 4 action buttons and 6 modals behave consistently across 11 status codes × 2 type codes × lock-flag combinations — faithful to the design intent.",
      sections: [
        {
          heading: "Context",
          body: "Bomulsen lets users store, ship, list, dismantle, and point-refund treasures obtained from random boxes. The entire lifecycle lives on one screen — 'My Treasure Box' — so the UI has to cross state codes (00·01·02·03·40·41·43·45·70·-100·-200) × type codes (regular / gift voucher) × the lock flag.",
        },
        {
          heading: "Problem",
          body: [
            "6 tabs · 4 sort options · search · category filter · lock toggle had to coexist without breaking the list markup",
            "Four action buttons (Ship · Trade · Dismantle · Refund) had different enabled state, label, and navigation per item — all coming from the mocks",
            "Six different modals (image alert · confirm · simple alert · refund-complete · filter · info) had to coexist on one screen without interfering",
            "Domain rules (gift-voucher send limits, point refunds for discontinued products) had to surface in the UI display layer instantly",
            "Hundreds of items needed to scroll smoothly",
            "Push / notification-center deep links had to flow naturally into the right delivery-detail screen",
          ],
        },
        {
          heading: "Approach",
          body: [
            "Bundled tab · search · filter · sort · lock together so the list markup can be read in one place — 'what conditions is the list currently rendered under'",
            "Branched the 4 action buttons' enabled state · label · navigation by state_code × type_code × lock_yn — consistently in markup, faithful to the design intent",
            "Wrapped all 6 modals in a shared callback pattern so even irreversible actions like trade-cancel and point refund flow through the same 'confirm → execute → feedback → list refresh' markup",
            "Surfaced domain rules (voucher send limits, 1,000-won-rounded point refunds for discontinued items) safely at the UI display layer",
            "Combined FlatList virtualization · FastImage · end-of-list fetch guard · pull-to-refresh to keep scrolling smooth across hundreds of items",
            "Handled push / notification-center entry via auto-navigation; intercepted the Android hardware back button to reset to home — interaction nuances tidied up",
          ],
        },
        {
          heading: "Result",
          body: [
            "One screen covers the full treasure lifecycle — store → ship → trade → dismantle → refund",
            "Keeping the per-state button and modal branching in one place minimised the number of change sites when new state codes were added",
            "The modal-orchestration and list-parameter-funnelling patterns were reused on other complex list screens (marketplace, purchase history)",
            "Removed 'missing confirm modal' classes of user-error paths for irreversible actions like trade-cancel and point refund",
          ],
        },
        {
          heading: "Takeaway",
          body: "For state-heavy UIs, mapping out the data flow and the button enable / label rules first — before drawing the UI — dramatically cut debugging overhead. Pulling 'when is this button active?' into one source shortened QA cycles, and the pattern became a reusable template for subsequent state-rich screens.",
        },
      ],
    },
  },

  // ─── 03. 디자인 베이스의 퍼블리싱 ─────────────────────────────────────────
  {
    slug: "design-engineering-crosskill",
    tags: ["Design", "Publishing", "Collaboration"],
    ko: {
      title: "디자인 베이스의 퍼블리싱",
      meta: "2012 – 현재 · 시각디자인 전공 → 편집 디자이너 6년 → 퍼블리셔 / 프론트",
      summary:
        "시각디자인 전공 후 편집 디자이너로 약 6년간 현장 경험을 쌓은 뒤, 웹디자인기능사 · SQL 개발자 · 정보처리기사 · 컴퓨터공학 학사까지 의도적으로 퍼블리싱·프론트엔드 전환 경로를 밟았습니다. 지금은 시안 리뷰부터 마크업·인터랙션·관리자 페이지 UI/UX 1인 담당까지 수행하는 퍼블리셔로 일하고 있어요.",
      sections: [
        {
          heading: "배경",
          body: "2014년 충청대학 시각디자인 전공을 졸업한 뒤 2014.09 부터 2020.05 까지 약 6년간 편집 디자이너로 현장 경험을 쌓았습니다. 이 시기에 웹 퍼블리싱 쪽으로 접점이 옮겨지면서 '디자인을 직접 구현하는 쪽' 의 언어가 더 잘 맞는다고 느꼈어요. 그 뒤로 웹디자인기능사(2020) → SQL 개발자(2023) → 정보처리기사(2024) → 학점은행제 컴퓨터공학 학사(2024) 순으로, 취미 전환이 아니라 정식 자격과 학위로 퍼블리셔·프론트엔드 정체성을 증명하는 경로를 택했습니다.",
        },
        {
          heading: "접근",
          body: [
            "이벤트·신기능 리뷰 회의에 개발팀 프론트 대표로 참석해 구현 가능 여부와 일정 조율을 맡으며, 시안 단계에서 인터랙션 · 상태 변화 · 엣지 케이스까지 같이 정의",
            "디자인 시스템과 컴포넌트 분리 기준에 디자인 단계부터 의견을 보태, 시안이 곧바로 구현 단위(작은 → 큰 컴포넌트) 로 떨어지도록 정리",
            "GOPANG (인도네시아향 React 웹앱) — 사용자·관리자 화면 모두 1인 구현, 관리자 페이지는 UI/UX 디자인까지 자체 담당",
            "타이포그래피 · 여백 · 컬러 팔레트 기준을 Tailwind 클래스 · CSS 변수로 코드 레벨에서 바로 적용",
            "[공식 자격 · 학위]  정보처리기사(2024.12) · SQL 개발자 SQLD(2023.10) · 웹디자인기능사(2020.12) · 컴퓨터공학 학사(학점은행제, 2023.08 – 2024.10, 4.13 / 4.5)",
          ],
        },
        {
          heading: "결과",
          body: [
            "디자인 리뷰와 개발 리뷰가 분리되지 않고, 한 자리에서 함께 이뤄지는 협업 루프가 정착됨",
            "관리자 페이지 같은 '디자이너 리소스가 부족한 영역' 을 내부에서 직접 소화 — 전체 일정 단축",
            "기획·디자인 회의에서 '구현 가능한 안' 을 같이 제안할 수 있어, 뒤늦게 시안을 갈아엎는 경우가 줄어드는 흐름",
            "시각 디자인 감각 + CS 기초 자격을 함께 갖춰, 디자인 쪽이든 엔지니어링 쪽이든 어느 조직에 배치돼도 컨텍스트 스위치 비용이 낮음",
          ],
        },
        {
          heading: "회고",
          body: "'디자인도 할 줄 아는 퍼블리셔' 라는 포지션은 자칫 마크업·구현 깊이를 희생하는 것처럼 읽히기 쉬워서, 정반대 방향 — 정식 자격과 학위로 엔지니어링 베이스를 먼저 명확히 세우는 쪽 — 을 선택했습니다. 지금은 디자인 감각이 마크업 품질을 대체하는 게 아니라 강화하는 조합으로 스스로를 포지셔닝하고 있어요.",
        },
      ],
    },
    en: {
      title: "Publishing With a Designer's Eye",
      meta: "2012 – present · Design major → 6 years as editorial designer → publisher / frontend",
      summary:
        "After studying Visual Communication Design, I worked as an editorial designer for ~6 years before taking an intentional path into publishing and frontend — Craftsman Web Design, SQL Developer, Engineer Information Processing, and a Bachelor in Computer Science. Today I work as a publisher who handles design reviews, markup, interactions, and solo UI/UX ownership for admin surfaces.",
      sections: [
        {
          heading: "Context",
          body: "I graduated in Visual Communication Design from Chungcheong University in 2014 and spent ~6 years in editorial design practice (Sep 2014 – May 2020). During that time, as I moved closer to web publishing, I realized I fit better on the 'implementation' side of the design/dev seam. From there I took a formal route — Craftsman Web Design (2020) → SQL Developer (2023) → Engineer Information Processing (2024) → a BEng in Computer Science through Korea's Academic Credit Bank System (2024) — not as a hobby switch, but to formally certify a frontend engineer identity.",
        },
        {
          heading: "Approach",
          body: [
            "Attend event / new-feature review meetings as the frontend team's representative — own feasibility judgment and schedule alignment, and pull interactions, state transitions, and edge cases into the design conversation early",
            "Contribute to design systems and component boundaries from the design phase — so mocks land cleanly into implementation-ready units (smaller → larger components)",
            "GOPANG (Indonesian React web app) — built both user-facing and admin screens solo, and additionally owned the UI/UX design for the admin dashboard",
            "Typography, spacing, and palette judgments translate directly into Tailwind classes and CSS variables at the code level",
            "[Formal credentials]  Engineer Information Processing (Dec 2024) · SQLD (Oct 2023) · Craftsman Web Design (Dec 2020) · B.Eng. in Computer Science (Aug 2023 – Oct 2024, ACBS, GPA 4.13 / 4.5)",
          ],
        },
        {
          heading: "Result",
          body: [
            "Design review and engineering review happen in the same conversation rather than as separate passes",
            "'Design-resource-limited' surfaces like admin dashboards are absorbed in-house, shortening total timelines",
            "Earlier feasibility feedback at the idea stage helped avoid late-stage redesigns",
            "I fit either into a design-leaning team or an engineering-leaning team with low context-switch cost",
          ],
        },
        {
          heading: "Takeaway",
          body: "A 'designer who can code' positioning often risks sacrificing markup depth. I chose the opposite — formal credentials and a BEng to cement the engineering base first. Design sensibility doesn't replace markup quality; it reinforces it.",
        },
      ],
    },
  },

  // ─── 05. 이벤트 WebView 인터랙티브 게임 ─────────────────────────────────────
  {
    slug: "event-webview-games",
    tags: ["Publishing", "Interaction", "CSS 3D"],
    ko: {
      title: "월간 이벤트 — CSS 3D · 인터랙티브 게임",
      meta: "2023 – 2025 · Bomulsen 월간 이벤트 · EJS · jQuery · CSS 3D",
      summary:
        "앱 스토어 검수를 우회하기 위해 백엔드 저장소에 EJS 로 분리한 월간 이벤트 페이지에서, 순수 CSS 3D transform 과 jQuery 기반 게임 로직으로 다이스 보드 · RPS 토너먼트 · 슬롯 머신 등 인터랙티브 게임을 라이브러리 의존 없이 직접 구현했습니다.",
      sections: [
        {
          heading: "배경",
          body: "보물선은 React Native 기반 모바일 앱이라, 매월 바뀌는 마케팅 이벤트를 앱 안에 포함시키면 매번 앱 스토어 검수 사이클(평균 1~2일 + 거절 가능성)을 거쳐야 했습니다. 이를 우회하기 위해 사내에는 이벤트 페이지를 백엔드 저장소(EJS 템플릿)로 두고 앱이 WebView 로 띄우는 구조가 이미 갖춰져 있었고, 저는 그 구조 위에서 매월 새 이벤트 페이지를 직접 작성했습니다. 단순 정적 페이지가 아니라 다이스 보드, RPS 토너먼트, 슬롯 머신 등 사용자 참여형 인터랙티브 게임이 매월 다른 디자인으로 들어갔습니다.",
        },
        {
          heading: "문제 정의",
          body: [
            "three.js · P5.js 같은 외부 게임 라이브러리를 쓰면 번들이 커져서 WebView 초기 로딩이 느려짐",
            "iOS · Android, 노치 · 홈 인디케이터, 다양한 종횡비(세로 · 가로 · 태블릿 · 폴더블) 어디에서도 레이아웃이 깨지지 않아야 했음",
            "게임 단계별로 결과를 앱에 알려서, 사운드 · 햅틱 · 모달 닫기 같은 네이티브 기능을 트리거해야 함",
            "카운트다운과 여러 단계의 결과 공개 같은 시간 기반 게임 흐름을 한 곳에서 일관되게 관리해야 함",
            "매달 게임 종류가 달라져도 공통 패턴(EJS 변수 주입 · RN 통신 · 반응형 · 닫기 버튼) 은 재사용할 수 있어야 함",
          ],
        },
        {
          heading: "접근",
          body: [
            "순수 CSS 3D 트랜스폼 — transform-style: preserve-3d 와 rotateX/Y/Z · translateZ 만으로 정육면체 다이스, 원통형 슬롯 머신, 보드 셀 토글을 라이브러리 없이 구현. 슬롯 머신은 CodePen 의 원통 회전 패턴을 참고해 프로젝트 환경에 맞춰 다듬어 적용",
            "min(Nvw, Nvh) 패턴을 써서 가로/세로 중 짧은 쪽에 맞춰 사이징 — 어떤 종횡비에서도 화면을 벗어나거나 잘리지 않도록 이중 제약",
            "env(safe-area-inset-top/bottom) 와 @supports not (constant(...)) fallback 을 함께 써서 iOS 노치와 Android 홈 인디케이터를 양쪽 모두 대응",
            "window.ReactNativeWebView.postMessage 로 게임 단계별 이벤트(webMessage: gold_choice/confirm/result, rspEnd: win/lose 등) 를 앱에 전달 → 앱은 받은 메시지로 사운드 · 햅틱 · 모달 닫기를 트리거",
            "setInterval 카운트다운 + 음수 시간 분기로 '5초 선택 → 3초 선장 확정 → 3초 결과 공개 → 결과 팝업' 단계를 한 함수에서 오케스트레이션",
            "게임 시작 시점에 티켓 소진 API 를 먼저 호출해 서버 상태를 선점하고, 이후 결과 처리가 실패하면 안전하게 롤백되도록 흐름을 설계",
            "게임마다 EJS 파일을 따로 두되 공통 패턴(EJS 변수 주입 · RN 통신 · 닫기 버튼 · 반응형 base) 은 표준화 — 디자이너가 새 자산만 교체해도 게임 페이지를 빠르게 찍어낼 수 있음",
          ],
        },
        {
          heading: "결과",
          body: [
            "매월 이벤트 페이지를 앱 스토어 검수 없이 백엔드 배포만으로 즉시 출시할 수 있게 됨",
            "다이스 보드 게임 · RPS 토너먼트(Gold/Silver 두 모드, 주간 랭킹 포함) · 슬롯 머신 등 인터랙티브 게임 10종 이상을 누적 운영",
            "외부 게임 라이브러리 의존성이 0 이라 WebView 초기 로딩이 빠르고 번들 크기도 작음",
            "공통 패턴이 표준화되어 있어 디자이너가 시안과 자산만 전달해도 새 게임 페이지를 빠르게 만들 수 있음",
          ],
        },
        {
          heading: "회고",
          body: "'앱 스토어 검수 사이클 vs 운영 속도' 라는 모바일 앱의 구조적 제약을, 사내에 이미 마련된 백엔드 분리 + WebView + 양방향 메시지 구조 위에서 풀어본 경험이었습니다. 단순 정적 페이지가 아닌 인터랙티브 게임을 라이브러리 없이 직접 구현한 덕분에 디자인 자유도와 성능을 동시에 잡을 수 있었고, 모바일과 웹 경계의 협업 흐름 위에서 일해본 경험은 이후 어떤 프레임워크를 쓰더라도 그대로 응용할 수 있는 자산이 되었습니다.",
        },
      ],
    },
    en: {
      title: "Monthly Event — CSS 3D · Interactive Games",
      meta: "2023 – 2025 · Bomulsen monthly events · EJS · jQuery · CSS 3D",
      summary:
        "On monthly event pages separated into the backend repo as EJS templates (to bypass app-store review cycles), built interactive games — dice board, RPS tournament, slot machine — from scratch with pure CSS 3D transforms and jQuery, no game library required.",
      sections: [
        {
          heading: "Context",
          body: "Bomulsen is an RN-based mobile app, so every monthly marketing event embedded in the app would trigger an app-store review cycle (~1–2 days + possible rejection). To work around that, the in-house setup already kept event pages in the backend repo as EJS templates loaded via in-app WebView — and I wrote each new monthly event page on top of that setup. These weren't simple static pages: every month brought a different interactive game (dice board, RPS tournament, slot machine, etc.).",
        },
        {
          heading: "Problem",
          body: [
            "Adopting external game libraries (three.js, P5.js, etc.) would inflate the bundle and slow WebView initial load",
            "The layout had to survive iOS / Android, notches / home indicators, and varied aspect ratios (portrait, landscape, tablet, foldable)",
            "Stage-by-stage game outcomes had to reach the app so native effects (sound, haptics, modal close) could fire",
            "Time-based game flow (countdowns, staged result reveals) needed consistent orchestration in one place",
            "Games differed month to month, but common patterns (EJS variable injection, RN messaging, responsive base, close button) had to be reusable",
          ],
        },
        {
          heading: "Approach",
          body: [
            "Pure CSS 3D transforms — `transform-style: preserve-3d` + `rotateX/Y/Z` + `translateZ` to build the dice cube and toggling board cells; the cylindrical slot reel was adapted from a CodePen reference and tuned to the project context, all without a game library",
            "Responsive double-constraint — `min(Nvw, Nvh)` sizes to whichever axis is shorter so layouts never overflow regardless of aspect ratio",
            "Safe-area handling — `env(safe-area-inset-top/bottom)` with `@supports not (constant(...))` fallback covers iOS notches and Android home indicators",
            "Bidirectional RN messaging — `window.ReactNativeWebView.postMessage(JSON.stringify({...}))` dispatches staged events (`webMessage: gold_choice/confirm/result`, `rspEnd: win/lose`) to the app, which triggers sound, haptics, and modal close",
            "Time-driven state machine — setInterval countdown with negative-time branches orchestrates '5s pick → 3s lock-in → 3s reveal → result popup' in one place",
            "Ticket pre-deduction + rollback — call the ticket API on game start to reserve server state, then converge safely via the result flow",
            "Each game ships as its own EJS file, while common patterns (EJS variable injection, RN messaging, close button, responsive base) are standardized — so a new game ships fast just by swapping designer assets",
          ],
        },
        {
          heading: "Result",
          body: [
            "Each monthly event page ships through a backend deploy alone, with no app-store review",
            "Operated 10+ interactive games — dice board, RPS tournament (Gold / Silver modes with weekly ranking), slot machine, and more",
            "Zero external game-library dependency → fast WebView initial load and small bundle",
            "Standardized patterns let new game pages ship quickly from designer assets alone",
          ],
        },
        {
          heading: "Takeaway",
          body: "Working within the in-house architecture (backend EJS templates + WebView + bidirectional messaging) that already addresses the 'app-store review cycle vs. ops velocity' tension, I built interactive games from scratch — rather than pulling in a game library — preserving both design freedom and performance. The experience of operating across the mobile/web collaboration boundary became a transferable asset that holds up under any framework.",
        },
      ],
    },
  },
];

export const HIGHLIGHT_SLUGS = HIGHLIGHTS.map((h) => h.slug);

export function findHighlight(slug: string): Highlight | undefined {
  return HIGHLIGHTS.find((h) => h.slug === slug);
}
