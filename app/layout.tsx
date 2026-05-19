import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import localFont from "next/font/local";

import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Instrument Serif 는 인트로의 커리어 경로처럼 살짝 우아하게 강조하고 싶을 때만.
// 본문은 NanumSquare 가 잡고, 라틴 폴백으로 Geist 가 따라붙는다.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

// NanumSquare OTF AC — 본문 한글 폰트. 4단 weight 자체 호스팅.
// "ac" 는 OpenType CID 확장(특수 한자·기호까지 커버) 버전. 일반 NanumSquare 보다
// 글리프 커버리지가 넓어서 안전한 선택.
// font-display: swap 으로 폰트 로드 전에는 시스템 폰트로 먼저 그리고, 도착하면 교체.
const nanumSquare = localFont({
  src: [
    { path: "./fonts/NanumSquareOTF_acL.woff2", weight: "300", style: "normal" },
    { path: "./fonts/NanumSquareOTF_acR.woff2", weight: "400", style: "normal" },
    { path: "./fonts/NanumSquareOTF_acB.woff2", weight: "700", style: "normal" },
    { path: "./fonts/NanumSquareOTF_acEB.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-nanum-square",
  display: "swap",
});

// D2Coding (Naver) — 코드 블록 / 모노스페이스용. Ligature 버전 사용.
// 한글 + 영문 + 숫자가 정확히 1:2 monospace 로 맞아 코드 정렬이 깨지지 않고,
// "->", "=>", "==" 같은 연산자가 한 글자처럼 합쳐져 코드 가독성이 좋아진다.
// (ligature 동작은 globals.css 의 font-feature-settings: "calt" 가 켜져 있어야 함)
const d2Coding = localFont({
  src: [
    { path: "./fonts/D2Coding-Ligature.ttf", weight: "400", style: "normal" },
    { path: "./fonts/D2Coding-Ligature-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-d2coding",
  display: "swap",
});

// 사이트 공통 메타데이터. title/description 은 검색·OG·트위터 카드에서 공통으로 씀.
// metadataBase 에 basePath(/PORTFOLIO_2026) 를 같이 적으면 OG 이미지 URL 에
// /PORTFOLIO_2026 가 두 번 붙어버려서, 여기는 도메인까지만. basePath 는
// next.config.ts 쪽에서만 한 번 붙도록 분리해놨음.
// 파비콘/OG 이미지는 app/icon.* 와 app/opengraph-image.* 규약 파일이 자동으로 잡아줌.
const SITE_TITLE = "허정은 — UX Engineer Portfolio";
const SITE_DESC =
  "디자이너 출신 6년차 UX Engineer. 디자인 의도와 코드 구조를 동시에 이해하는 — 허정은의 포트폴리오.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jeheo.github.io"),
  title: SITE_TITLE,
  description: SITE_DESC,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    locale: "ko_KR",
    siteName: "허정은 Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
};

// hydration 전에 localStorage / prefers-color-scheme 를 읽어서 <html> 에 .dark 와
// lang 을 미리 박아둠. 클라이언트 uiStore 와 키(theme, lang) 가 같아서 hydration
// 이후에도 값이 튀지 않음. 이 한 줄짜리 인라인 스크립트가 FOUC 를 막아줌.
const UI_INIT_SCRIPT = `
(function () {
  try {
    var ls = window.localStorage;
    var theme = ls.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = theme === 'dark' || (!theme && prefersDark);
    if (isDark) document.documentElement.classList.add('dark');
    var lang = ls.getItem('lang');
    document.documentElement.lang = lang === 'en' ? 'en' : 'ko';
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${nanumSquare.variable} ${d2Coding.variable} ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: UI_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
