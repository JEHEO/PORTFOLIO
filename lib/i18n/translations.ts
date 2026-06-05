/**
 * 포트폴리오 전역 번역본 (`ko` / `en`).
 *
 * - 홈 페이지와 상세 페이지 모두 이 모듈을 단일 소스로 사용합니다.
 * - 신규 번역 키는 반드시 `Translation` 타입(`lib/types/portfolio.ts`)에 먼저 선언한 뒤 추가하세요.
 * - `highlights[i].slug` 는 `lib/highlights.ts` 의 HIGHLIGHTS 배열 slug 와 반드시 일치해야 합니다.
 *
 * 고유 데이터(학력·자격증·수상 등)는 본인의 실제 정보로 교체해야 하는 자리입니다.
 * 각 자리에 `TODO:` 주석으로 명시해 두었습니다.
 */

import type { Lang } from "@/lib/stores/uiStore";
import type { Translation } from "@/lib/types/portfolio";

export const T: Record<Lang, Translation> = {
  ko: {
    role: "Publisher",
    roleSub: "Designer → Publisher",
    title: "시안의 의도를\n1px 단위로 옮기는 퍼블리셔",
    availability: "새로운 기회 탐색 중",
    nav: [
      { label: "소개", href: "#about" },
      { label: "경력", href: "#experience" },
      { label: "작업물", href: "#practice" },
      { label: "역량", href: "#highlights" },
      { label: "학력", href: "#education" },
      { label: "기술", href: "#skills" },
      { label: "문의", href: "#contact" },
    ],
    aboutLabel: "About",
    about: {
      heading: "디자인과 마크업 사이에서",
      paragraphs: [
        [
          {
            text: "시각디자인 전공 후 ",
          },
          {
            text: "편집 디자이너로 약 6년간 현장 경험(2014 – 2020)",
            emphasis: true,
          },
          {
            text: "을 쌓은 뒤, 웹디자인기능사 → SQL 개발자 → 정보처리기사 → 학점은행제 컴퓨터공학 학사까지 ",
          },
          {
            text: "디자인에서 퍼블리싱·프론트엔드로의 전환 경로",
            emphasis: true,
          },
          {
            text: "를 밟아왔습니다. 2021년부터 (주)에이치투비즈에서 퍼블리셔 겸 프론트엔드로 성장하며 모바일 앱·웹 서비스의 ",
          },
          {
            text: "시안을 마크업으로 옮기고 인터랙션을 직접 구현",
            emphasis: true,
          },
          {
            text: "하는 일을 6년간 이어오고 있습니다.",
          },
        ],
        [
          {
            text: "디자이너의 언어를 이해하는 퍼블리셔로서, 시안을 코드로 옮기는 일을 단순 변환이 아니라 ",
          },
          {
            text: "1px·미세 인터랙션·반응형 디테일까지 챙기는 작업",
            emphasis: true,
          },
          {
            text: "으로 봅니다. 시안 리뷰 단계부터 디자이너·기획자와 함께 의도와 화면 변수를 정리하고, ",
          },
          {
            text: "공통 컴포넌트와 디자인 토큰을 시스템화",
            emphasis: true,
          },
          {
            text: "해 매번 새 화면을 빠르고 일관되게 만들 수 있도록 운영하고 있습니다.",
          },
        ],
      ],
    },
    impactLabel: "Impact at a Glance",
    impactMetrics: [
      {
        value: "137K",
        label: "라이브 UI 운영 · 유지보수",
        hint: "보물선 누적 회원 · 7,700% 회원 증가 기간 동안 마크업·UI 담당",
      },
      {
        value: "6년",
        label: "디자인 → 퍼블리싱 실무",
        hint: "편집 디자이너 6년 + 퍼블리셔·프론트 6년 = 시각/마크업 양쪽 합계 12년",
      },
      {
        value: "70+ 페이지",
        label: "단독 마크업 · 6개월",
        hint: "GOPANG · 사용자 40+ · 관리자 30+ 페이지 시안→마크업 변환",
      },
      {
        value: "10+ 종",
        label: "인터랙티브 이벤트 화면",
        hint: "보물선 월간 이벤트 · 순수 CSS 3D 로 인터랙션 직접 마크업",
      },
    ],
    highlightsLabel: "Expertise & Leadership",
    viewMore: "자세히 보기",
    experienceLabel: "Experience",
    educationLabel: "Education",
    education: [
      {
        school: "학점은행제",
        degree: "학사",
        major: "컴퓨터공학과",
        period: "2023.08 — 2024.10 졸업",
        notes: ["학점 4.13 / 4.5"],
      },
      {
        school: "충청대학",
        degree: "전문학사",
        major: "시각디자인",
        period: "2012.03 — 2014.02 졸업",
        notes: ["학점 4.06 / 4.5"],
      },
      {
        school: "충북여자고등학교",
        degree: "고등학교 졸업",
        major: "이과계열",
        period: "2012 졸업",
      },
    ],
    certificationsLabel: "Certifications",
    certifications: [
      {
        name: "정보처리기사",
        issuer: "한국산업인력공단",
        date: "2024.12",
      },
      {
        name: "SQL 개발자 (SQLD)",
        issuer: "한국데이터산업진흥원",
        date: "2023.10",
      },
      {
        name: "웹디자인기능사",
        issuer: "한국산업인력공단",
        date: "2020.12",
      },
    ],
    awardsLabel: "Awards & Recognition",
    // 의도적으로 비워둠 — 섹션이 자동 숨김됩니다.
    awards: [],
    skillsLabel: "Technical Skills",
    practiceLabel: "Practice Works",
    practiceDesc:
      "그린컴퓨터아트학원 2020.06 – 2020.11 시기, 디자인 시안부터 마크업까지 1인 작업한 사이트 리뉴얼 5건입니다. 각 카드에서 컬러 팔레트와 시기를 미리 보고, 클릭하면 작업 의도·폰트·컬러 시스템 상세를 볼 수 있습니다.",
    contactLabel: "Contact",
    contact: {
      links: [
        {
          label: "Email",
          href: "mailto:heo940122@gmail.com",
          description: "heo940122@gmail.com",
        },
        {
          label: "Phone",
          href: "tel:+821056831315",
          description: "010-5683-1315",
        },
      ],
    },
    colophon:
      "이 포트폴리오는 Next.js 16 · React 19 · Tailwind 4 로 직접 마크업하고 GitHub Actions 로 자동 배포됩니다.",
    experience: {
      company: "(주)에이치투비즈",
      position: "개발팀 책임연구원",
      companyDesc:
        "기획 · 디자인 · 개발 · 운영 · 마케팅을 자체 수행하는 인하우스 플랫폼 기업. 보물선 (랜덤박스 앱) · GOPANG (해외향 웹 플랫폼) · 이사로 (이사 서비스 앱) 운영.",
      period: "2021.03 — 재직 중",
      priorCareer: {
        role: "편집 디자이너",
        period: "2014.09 — 2020.05",
        note: "출판·편집 디자인 실무",
      },
      description:
        "리뉴얼 및 유지보수 담당, 신규 프로젝트의 시안 마크업·인터랙션·반응형 구현. 후임이 합류한 시기에는 시니어 퍼블리셔/프론트로서 코드 리뷰와 마크업 컨벤션 정리를 함께 진행했습니다.",
      projects: [
        {
          title: "Next.js 기반 신규 프로젝트",
          tag: "리드 개발자 · 진행 중",
          sub: "차세대 웹 서비스 구축",
          period: "2026.01 — 진행 중",
          details: [
            "Atomic Design 5계층(Atoms / Molecules / Organisms / Templates / Pages) + Storybook 도입 — 컴포넌트 분리 기준을 정리해 재사용 가능한 마크업 구조 구축",
            "Bitbucket Pipelines → Vercel 자동 배포 (lint · type check · build)",
          ],
          screenshots: [
            {
              label: "신규 웹 서비스 주요 화면",
              orientation: "landscape",
              items: [
                { src: "/experience/nextjs/01.png", alt: "Next.js 화면 01" },
                { src: "/experience/nextjs/02.png", alt: "Next.js 화면 02" },
                { src: "/experience/nextjs/03.png", alt: "Next.js 화면 03" },
                { src: "/experience/nextjs/04.png", alt: "Next.js 화면 04" },
                { src: "/experience/nextjs/05.png", alt: "Next.js 화면 05" },
              ],
            },
            {
              label: "Atomic Design · 아키텍처 · CI/CD 파이프라인",
              layout: "scroll",
              itemWidth: 150,
              items: [
                {
                  src: "/experience/nextjs/Architecture_01.png",
                  alt: "아키텍처 다이어그램 01",
                },
                {
                  src: "/experience/nextjs/Architecture_02.png",
                  alt: "아키텍처 다이어그램 02",
                },
                {
                  src: "/experience/nextjs/Architecture_03.png",
                  alt: "아키텍처 다이어그램 03",
                },
                {
                  src: "/experience/nextjs/Architecture_04.png",
                  alt: "아키텍처 다이어그램 04",
                },
                {
                  src: "/experience/nextjs/Architecture_05.png",
                  alt: "아키텍처 다이어그램 05",
                },
                {
                  src: "/experience/nextjs/Architecture_06.png",
                  alt: "아키텍처 다이어그램 06",
                },
                {
                  src: "/experience/nextjs/Architecture_07.png",
                  alt: "아키텍처 다이어그램 07",
                },
              ],
            },
          ],
        },
        {
          title: "보물선 — 리뉴얼 및 유지보수",
          tag: "프론트 메인 담당",
          sub: "국내 랜덤박스 플랫폼",
          period: "2021.03 — 진행 중 (2023.11 전면 리뉴얼 · 이후 유지보수 지속)",
          details: [
            "누적 회원 1,700 → 14만 명 성장 기간 동안 라이브 UI 의 마크업·인터랙션·반응형 6년 유지보수 (jQuery → React Native 전면 리뉴얼 포함)",
            "iOS·Android 양 OS 의 폰트·Safe Area·키보드·모달 차이를 분기 처리해 시각적 일관성 확보",
            "보물함 화면 — 탭·검색·필터·정렬·잠금이 결합된 복합 리스트와 4개 액션 버튼·6종 모달을 시안 의도대로 일관 마크업",
            "월간 이벤트 페이지 — EJS + WebView 구조 위에서 매달 새 시안을 반응형 UI 로 즉시 배포, 앱스토어 검수 없이 운영",
            "순수 CSS 3D Transform 만으로 다이스 보드·RPS·슬롯 머신 인터랙티브 콘텐츠를 직접 마크업하고 RN ↔ WebView 메시징으로 네이티브 효과 연결",
          ],
          screenshots: [
            {
              label: "보물선 앱 주요 화면",
              items: [
                {
                  src: "/experience/bomulsen/01.png",
                  alt: "보물선 앱 화면 01",
                },
                {
                  src: "/experience/bomulsen/02.png",
                  alt: "보물선 앱 화면 02",
                },
                {
                  src: "/experience/bomulsen/03.png",
                  alt: "보물선 앱 화면 03",
                },
                {
                  src: "/experience/bomulsen/04.png",
                  alt: "보물선 앱 화면 04",
                },
                {
                  src: "/experience/bomulsen/05.png",
                  alt: "보물선 앱 화면 05",
                },
                {
                  src: "/experience/bomulsen/06.png",
                  alt: "보물선 앱 화면 06",
                },
                {
                  src: "/experience/bomulsen/07.png",
                  alt: "보물선 앱 화면 07",
                },
                {
                  src: "/experience/bomulsen/08.png",
                  alt: "보물선 앱 화면 08",
                },
                {
                  src: "/experience/bomulsen/09.png",
                  alt: "보물선 앱 화면 09",
                },
                {
                  src: "/experience/bomulsen/10.png",
                  alt: "보물선 앱 화면 10",
                },
              ],
            },
            {
              label: "관리자 페이지",
              layout: "scroll",
              orientation: "landscape",
              items: [
                {
                  src: "/experience/bomulsen/admin_01.png",
                  alt: "보물선 관리자 페이지 01",
                },
                {
                  src: "/experience/bomulsen/admin_02.png",
                  alt: "보물선 관리자 페이지 02",
                },
                {
                  src: "/experience/bomulsen/admin_03.png",
                  alt: "보물선 관리자 페이지 03",
                },
              ],
            },
            {
              label: "월간 이벤트 WebView (EJS · 반응형)",
              layout: "scroll",
              items: [
                {
                  src: "/experience/bomulsen/event_01.mp4",
                  alt: "월간 이벤트 WebView 인터랙션 영상 01",
                  video: true,
                  poster: "/experience/bomulsen/event_01.png",
                },
                {
                  src: "/experience/bomulsen/event_02.png",
                  alt: "월간 이벤트 화면 02",
                },
                {
                  src: "/experience/bomulsen/event_03.png",
                  alt: "월간 이벤트 화면 03",
                },
                {
                  src: "/experience/bomulsen/event_04.mp4",
                  alt: "월간 이벤트 WebView 인터랙션 영상 02",
                  video: true,
                },
                {
                  src: "/experience/bomulsen/event_05.png",
                  alt: "월간 이벤트 화면 05",
                },
                {
                  src: "/experience/bomulsen/event_06.png",
                  alt: "월간 이벤트 화면 06",
                },
                {
                  src: "/experience/bomulsen/event_07.mp4",
                  alt: "월간 이벤트 WebView 인터랙션 영상 03",
                  video: true,
                },
              ],
            },
          ],
        },
        {
          title: "GOPANG — 신규 제작",
          tag: "단독 퍼블리셔",
          sub: "인도네시아향 랜덤박스 웹 플랫폼",
          period:
            "2024.06 — 2025.10 (6개월 내 퍼블리싱 완료 → 2025.02 출시, 이후 유지보수)",
          details: [
            "사용자 40+ · 관리자 30+ 총 70+ 페이지를 6개월 안에 단독 마크업 — 시안 픽셀 퍼펙트 변환부터 컴포넌트 분리·반응형·인터랙션까지 1인 전담",
            "관리자 페이지는 UI/UX 디자인 → 마크업 → 인터랙션까지 시안부터 엔드투엔드 단독 진행",
            "인도네시아 현지 단말 환경(저속 모바일 위주)을 고려한 이미지·로딩 최적화 + 다양한 해상도 반응형",
            "2025.02 정식 출시 이후 마크업·UI 유지보수 지속",
          ],
          screenshots: [
            {
              label: "GOPANG 앱 주요 화면",
              items: [
                { src: "/experience/gopang/01.png", alt: "GOPANG 화면 01" },
                { src: "/experience/gopang/02.png", alt: "GOPANG 화면 02" },
                { src: "/experience/gopang/03.png", alt: "GOPANG 화면 03" },
                { src: "/experience/gopang/04.png", alt: "GOPANG 화면 04" },
                { src: "/experience/gopang/05.png", alt: "GOPANG 화면 05" },
                { src: "/experience/gopang/06.png", alt: "GOPANG 화면 06" },
                { src: "/experience/gopang/07.png", alt: "GOPANG 화면 07" },
                { src: "/experience/gopang/08.png", alt: "GOPANG 화면 08" },
                { src: "/experience/gopang/09.png", alt: "GOPANG 화면 09" },
                { src: "/experience/gopang/10.png", alt: "GOPANG 화면 10" },
              ],
            },
            {
              label: "관리자 페이지",
              layout: "scroll",
              orientation: "landscape",
              items: [
                {
                  src: "/experience/gopang/admin_01.png",
                  alt: "GOPANG 관리자 페이지 01",
                },
                {
                  src: "/experience/gopang/admin_02.png",
                  alt: "GOPANG 관리자 페이지 02",
                },
                {
                  src: "/experience/gopang/admin_03.png",
                  alt: "GOPANG 관리자 페이지 03",
                },
              ],
            },
          ],
        },
      ],
    },
    highlights: [
      {
        slug: "design-engineering-crosskill",
        title: "디자인 베이스의 퍼블리싱",
        description:
          "디자이너 커리어 베이스가 퍼블리싱 작업에 어떻게 녹아드는지 — 시안의 의도 해석, 1px 디테일, 인터랙션 협의, 관리자 페이지 UI/UX 1인 담당 경험을 중심으로 정리했습니다.",
        tags: ["Design", "Publishing", "Collaboration"],
      },
      {
        slug: "team-process-automation",
        title: "마크업 컨벤션 & 디자인 시스템 정착",
        description:
          "Atomic Design 5계층과 디자인 토큰 기반 공통 컴포넌트 체계를 팀에 정착시키고, PR 템플릿에 반응형·접근성·시각 일관성 체크리스트를 더해 마크업 품질을 표준화했습니다.",
        tags: ["Publishing", "Design System", "Process"],
      },
      {
        slug: "bomulsen-treasure-box",
        title: "보물함 화면 — 복합 상태 UI 마크업",
        description:
          "탭·검색·필터·정렬·잠금 토글이 동시 작동하는 단일 화면에서, 11종 상태코드 × 타입 × 잠금 조합에 따라 4개 액션 버튼과 6종 모달이 시안 의도대로 일관 동작하도록 마크업·인터랙션을 설계했습니다.",
        tags: ["Publishing", "Interaction", "UX"],
      },
      {
        slug: "event-webview-games",
        title: "월간 이벤트 — CSS 3D 인터랙티브 마크업",
        description:
          "백엔드 EJS + WebView 구조 위에서 매월 새 디자인의 사용자 참여형 이벤트 화면을 마크업. 외부 게임 라이브러리 없이 순수 CSS 3D Transform 만으로 다이스 보드·RPS 토너먼트·슬롯 머신 같은 인터랙티브 콘텐츠를 직접 구현했습니다.",
        tags: ["Publishing", "Interaction", "CSS 3D"],
      },
    ],
  },
  en: {
    role: "Publisher",
    roleSub: "Designer → Publisher",
    title: "Translating Design Intent\nDown to the Pixel",
    availability: "Open to new roles",
    nav: [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Works", href: "#practice" },
      { label: "Expertise", href: "#highlights" },
      { label: "Education", href: "#education" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" },
    ],
    aboutLabel: "About",
    about: {
      heading: "Working at the seam of design and markup",
      paragraphs: [
        [
          {
            text: "I studied Visual Communication Design and ",
          },
          {
            text: "worked as an editorial designer for ~6 years (2014 – 2020)",
            emphasis: true,
          },
          {
            text: " before taking ",
          },
          {
            text: "the path from designer into publishing and frontend",
            emphasis: true,
          },
          {
            text: " — Craftsman Web Design, SQL Developer, Engineer Information Processing, and a Bachelor in Computer Science through Korea's Academic Credit Bank System. Since 2021 at H2Biz, I've been doing ",
          },
          {
            text: "markup, interactions, and responsive UI for mobile apps and web services",
            emphasis: true,
          },
          {
            text: " — translating designs into shipped UI for six years.",
          },
        ],
        [
          {
            text: "I speak the language of designers — to me, going from mocks to code isn't a simple conversion but ",
          },
          {
            text: "honoring 1px details, micro-interactions, and responsive nuance",
            emphasis: true,
          },
          {
            text: ". I sit with designers and PMs from the review stage to align intent and screen variables, and ",
          },
          {
            text: "systemize shared components and design tokens",
            emphasis: true,
          },
          {
            text: " so new screens can ship fast and stay visually consistent.",
          },
        ],
      ],
    },
    impactLabel: "Impact at a Glance",
    impactMetrics: [
      {
        value: "137K",
        label: "Live UI ops & maintenance",
        hint: "Bomulsen registered members · markup & UI through 7,700% member growth",
      },
      {
        value: "6 yrs",
        label: "Design → publishing",
        hint: "Editorial designer 6 yrs + publisher / frontend 6 yrs = 12 yrs of visual & markup craft",
      },
      {
        value: "70+ pages",
        label: "Solo markup · 6 months",
        hint: "GOPANG · 40+ user + 30+ admin pages translated from mocks",
      },
      {
        value: "10+ events",
        label: "Interactive event screens",
        hint: "Bomulsen monthly events · pure CSS 3D — interactions hand-crafted from scratch",
      },
    ],
    highlightsLabel: "Publishing Highlights",
    viewMore: "View details",
    experienceLabel: "Experience",
    educationLabel: "Education",
    education: [
      {
        school: "Academic Credit Bank System (Republic of Korea)",
        degree: "Bachelor of Engineering",
        major: "Computer Science & Engineering",
        period: "Aug 2023 — Oct 2024",
        notes: ["GPA 4.13 / 4.5"],
      },
      {
        school: "Chungcheong University",
        degree: "Associate Degree",
        major: "Visual Communication Design",
        period: "Mar 2012 — Feb 2014",
        notes: ["GPA 4.06 / 4.5"],
      },
      {
        school: "Chungbuk Girls' High School",
        degree: "High School Diploma",
        major: "Science Track",
        period: "Graduated 2012",
      },
    ],
    certificationsLabel: "Certifications",
    certifications: [
      {
        name: "Engineer Information Processing",
        issuer: "HRD Korea (Human Resources Development Service of Korea)",
        date: "Dec 2024",
      },
      {
        name: "SQL Developer (SQLD)",
        issuer: "Korea Data Agency",
        date: "Oct 2023",
      },
      {
        name: "Craftsman Web Design",
        issuer: "HRD Korea (Human Resources Development Service of Korea)",
        date: "Dec 2020",
      },
    ],
    awardsLabel: "Awards & Recognition",
    // Intentionally empty — the subsection auto-hides.
    awards: [],
    skillsLabel: "Technical Skills",
    practiceLabel: "Practice Works",
    practiceDesc:
      "Five site-renewal works I designed and marked up solo at Green Computer Art Academy (Jun 2020 – Nov 2020). Each card previews the color palette and period; click in for the brief, typography, and color system.",
    contactLabel: "Contact",
    contact: {
      links: [
        {
          label: "Email",
          href: "mailto:heo940122@gmail.com",
          description: "heo940122@gmail.com",
        },
        {
          label: "Phone",
          href: "tel:+821056831315",
          description: "+82 10-5683-1315",
        },
      ],
    },
    colophon:
      "This portfolio is hand-marked-up with Next.js 16 · React 19 · Tailwind 4, and auto-deployed via GitHub Actions.",
    experience: {
      company: "H2Biz Co., Ltd.",
      position: "Senior Research Engineer, Dev Team",
      companyDesc:
        "In-house platform company covering planning, design, development, operations, and marketing end-to-end. Operates Bomulsen (random-box app), GOPANG (overseas web platform), and Isaro (moving-services app).",
      period: "Mar 2021 — Present",
      priorCareer: {
        role: "Editorial Designer",
        period: "Sep 2014 — May 2020",
        note: "Publishing / editorial design practice",
      },
      description:
        "Owns renewal & maintenance and the markup, interactions, and responsive UI for new projects. When juniors join the team, acts as the senior publisher/frontend and runs code reviews plus markup-convention upkeep.",
      projects: [
        {
          title: "Next.js-based New Project",
          tag: "Lead Developer · In Progress",
          sub: "Next-generation web service",
          period: "Jan 2026 — Present",
          details: [
            "Introduced Atomic Design 5 layers (Atoms / Molecules / Organisms / Templates / Pages) and Storybook — established clear component boundaries and a reusable markup structure",
            "Bitbucket Pipelines → Vercel auto-deploy (lint · type check · build)",
          ],
          screenshots: [
            {
              label: "New web service — key screens",
              orientation: "landscape",
              items: [
                { src: "/experience/nextjs/01.png", alt: "Next.js screen 01" },
                { src: "/experience/nextjs/02.png", alt: "Next.js screen 02" },
                { src: "/experience/nextjs/03.png", alt: "Next.js screen 03" },
                { src: "/experience/nextjs/04.png", alt: "Next.js screen 04" },
                { src: "/experience/nextjs/05.png", alt: "Next.js screen 05" },
              ],
            },
            {
              label: "Atomic Design · architecture · CI/CD pipeline",
              layout: "scroll",
              itemWidth: 150,
              items: [
                {
                  src: "/experience/nextjs/Architecture_01.png",
                  alt: "Architecture diagram 01",
                },
                {
                  src: "/experience/nextjs/Architecture_02.png",
                  alt: "Architecture diagram 02",
                },
                {
                  src: "/experience/nextjs/Architecture_03.png",
                  alt: "Architecture diagram 03",
                },
                {
                  src: "/experience/nextjs/Architecture_04.png",
                  alt: "Architecture diagram 04",
                },
                {
                  src: "/experience/nextjs/Architecture_05.png",
                  alt: "Architecture diagram 05",
                },
                {
                  src: "/experience/nextjs/Architecture_06.png",
                  alt: "Architecture diagram 06",
                },
                {
                  src: "/experience/nextjs/Architecture_07.png",
                  alt: "Architecture diagram 07",
                },
              ],
            },
          ],
        },
        {
          title: "Bomulsen — Renewal & Maintenance",
          tag: "Lead Publisher",
          sub: "Domestic random-box platform",
          period: "Mar 2021 — Present (Nov 2023 full rebuild · ongoing maintenance)",
          details: [
            "Maintained markup · interaction · responsive UI of a live service for 6 years as it grew from 1,700 → ~140K members (including the full jQuery → React Native migration)",
            "Reconciled iOS/Android differences (font, safe-area, keyboard, modal-dismiss) so the visual experience stays consistent across OSes",
            "Treasure Box screen — markup for a complex list (tab · search · filter · sort · lock) with 4 action buttons and 6 modals, all consistent with the design intent",
            "Monthly event pages — shipped fresh responsive markup on top of the existing EJS + WebView setup without app-store reviews",
            "Built interactive content (dice board, RPS tournament, slot machine) in pure CSS 3D transforms — no game library — and wired RN ↔ WebView messaging for native-side effects",
          ],
          screenshots: [
            {
              label: "Bomulsen — key app screens",
              items: [
                {
                  src: "/experience/bomulsen/01.png",
                  alt: "Bomulsen screen 01",
                },
                {
                  src: "/experience/bomulsen/02.png",
                  alt: "Bomulsen screen 02",
                },
                {
                  src: "/experience/bomulsen/03.png",
                  alt: "Bomulsen screen 03",
                },
                {
                  src: "/experience/bomulsen/04.png",
                  alt: "Bomulsen screen 04",
                },
                {
                  src: "/experience/bomulsen/05.png",
                  alt: "Bomulsen screen 05",
                },
                {
                  src: "/experience/bomulsen/06.png",
                  alt: "Bomulsen screen 06",
                },
                {
                  src: "/experience/bomulsen/07.png",
                  alt: "Bomulsen screen 07",
                },
                {
                  src: "/experience/bomulsen/08.png",
                  alt: "Bomulsen screen 08",
                },
                {
                  src: "/experience/bomulsen/09.png",
                  alt: "Bomulsen screen 09",
                },
                {
                  src: "/experience/bomulsen/10.png",
                  alt: "Bomulsen screen 10",
                },
              ],
            },
            {
              label: "Admin dashboard",
              layout: "scroll",
              orientation: "landscape",
              items: [
                {
                  src: "/experience/bomulsen/admin_01.png",
                  alt: "Bomulsen admin dashboard 01",
                },
                {
                  src: "/experience/bomulsen/admin_02.png",
                  alt: "Bomulsen admin dashboard 02",
                },
                {
                  src: "/experience/bomulsen/admin_03.png",
                  alt: "Bomulsen admin dashboard 03",
                },
              ],
            },
            {
              label: "Monthly event WebView (EJS · responsive)",
              layout: "scroll",
              items: [
                {
                  src: "/experience/bomulsen/event_01.mp4",
                  alt: "Monthly event WebView interaction 01",
                  video: true,
                  poster: "/experience/bomulsen/event_01.png",
                },
                {
                  src: "/experience/bomulsen/event_02.png",
                  alt: "Monthly event screen 02",
                },
                {
                  src: "/experience/bomulsen/event_03.png",
                  alt: "Monthly event screen 03",
                },
                {
                  src: "/experience/bomulsen/event_04.mp4",
                  alt: "Monthly event WebView interaction 02",
                  video: true,
                },
                {
                  src: "/experience/bomulsen/event_05.png",
                  alt: "Monthly event screen 05",
                },
                {
                  src: "/experience/bomulsen/event_06.png",
                  alt: "Monthly event screen 06",
                },
                {
                  src: "/experience/bomulsen/event_07.mp4",
                  alt: "Monthly event WebView interaction 03",
                  video: true,
                },
              ],
            },
          ],
        },
        {
          title: "GOPANG — New Build",
          tag: "Solo Publisher",
          sub: "Indonesian random-box web platform",
          period:
            "Jun 2024 — Oct 2025 (6-month publishing build → launched Feb 2025, ongoing maintenance)",
          details: [
            "Delivered 70+ pages (40+ user · 30+ admin) end-to-end in 6 months — pixel-perfect markup from mocks, component splitting, responsive, and interaction all single-handed",
            "Admin UI/UX owned end-to-end from design → markup → interaction, solo",
            "Image + loading optimizations tuned to Indonesia's mobile-heavy, low-bandwidth context, with responsive markup across device resolutions",
            "Ongoing markup / UI maintenance since the Feb 2025 launch",
          ],
          screenshots: [
            {
              label: "GOPANG — key app screens",
              items: [
                { src: "/experience/gopang/01.png", alt: "GOPANG screen 01" },
                { src: "/experience/gopang/02.png", alt: "GOPANG screen 02" },
                { src: "/experience/gopang/03.png", alt: "GOPANG screen 03" },
                { src: "/experience/gopang/04.png", alt: "GOPANG screen 04" },
                { src: "/experience/gopang/05.png", alt: "GOPANG screen 05" },
                { src: "/experience/gopang/06.png", alt: "GOPANG screen 06" },
                { src: "/experience/gopang/07.png", alt: "GOPANG screen 07" },
                { src: "/experience/gopang/08.png", alt: "GOPANG screen 08" },
                { src: "/experience/gopang/09.png", alt: "GOPANG screen 09" },
                { src: "/experience/gopang/10.png", alt: "GOPANG screen 10" },
              ],
            },
            {
              label: "Admin dashboard",
              layout: "scroll",
              orientation: "landscape",
              items: [
                {
                  src: "/experience/gopang/admin_01.png",
                  alt: "GOPANG admin dashboard 01",
                },
                {
                  src: "/experience/gopang/admin_02.png",
                  alt: "GOPANG admin dashboard 02",
                },
                {
                  src: "/experience/gopang/admin_03.png",
                  alt: "GOPANG admin dashboard 03",
                },
              ],
            },
          ],
        },
      ],
    },
    highlights: [
      {
        slug: "design-engineering-crosskill",
        title: "Publishing With a Designer's Eye",
        description:
          "How a designer's career carries into publishing work — reading design intent, owning 1px details, negotiating interaction nuances, and running admin UI/UX solo.",
        tags: ["Design", "Publishing", "Collaboration"],
      },
      {
        slug: "team-process-automation",
        title: "Markup Conventions & Design System",
        description:
          "Established a 5-layer Atomic Design system and design-token-based shared components, and added responsive · a11y · visual-consistency checklists to the PR template to standardize markup quality.",
        tags: ["Publishing", "Design System", "Process"],
      },
      {
        slug: "bomulsen-treasure-box",
        title: "Treasure Box — Complex-State UI Markup",
        description:
          "On a single screen where tab, search, filter, sort, and lock toggle all act at once, designed markup and interactions so 4 action buttons and 6 modals behave consistently across 11 status codes × type × lock combinations — faithful to the design intent.",
        tags: ["Publishing", "Interaction", "UX"],
      },
      {
        slug: "event-webview-games",
        title: "Monthly Events — CSS 3D Interactive Markup",
        description:
          "Built each new monthly event screen on the backend EJS + WebView setup. Implemented interactive content like dice boards, RPS tournaments, and slot machines using pure CSS 3D transforms — no external game library.",
        tags: ["Publishing", "Interaction", "CSS 3D"],
      },
    ],
  },
};
