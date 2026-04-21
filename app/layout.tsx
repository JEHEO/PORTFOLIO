import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Instrument Serif — 모던 디스플레이 serif (2023+ 트렌드).
 * 인트로 히어로의 커리어 경로처럼 "엘레강트 액센트" 용도로만 사용.
 * 본문은 Geist sans 유지.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "허정은 — Frontend Developer Portfolio",
  description:
    "근성 있는 디자인 전공 프론트엔드 리더 허정은의 포트폴리오입니다.",
};

/**
 * FOUC 방지 스크립트.
 *
 * - hydration 전에 localStorage / prefers-color-scheme 을 동기적으로 읽어
 *   `<html>` 에 `.dark` 클래스와 `lang` 속성을 먼저 반영합니다.
 * - 클라이언트 uiStore 와 동일한 키(`theme`, `lang`) 를 사용하므로
 *   hydration 이후 값이 튀지 않습니다.
 */
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: UI_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
