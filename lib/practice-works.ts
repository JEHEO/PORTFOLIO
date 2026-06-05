/**
 * Practice Works — 학원 시기 1인 디자인+퍼블 작업물.
 *
 * - 2020.06 ~ 2020.11 그린컴퓨터아트학원 시기에 디자인 시안부터 마크업까지
 *   혼자 완성한 5개 사이트 리뉴얼 작업입니다.
 * - 홈에서는 카드 그리드로 노출하고, 카드를 클릭하면 `/practice/[slug]` 상세
 *   페이지로 이동합니다.
 * - 메인 이미지·아이콘 등 에셋은 기존 PORTFOLIO_2020 레포의 절대 URL 을 그대로
 *   참조해, 새 사이트로 이미지 자산을 옮기지 않아도 동작하게 했습니다.
 */

const OLD_PORTFOLIO_BASE = "https://jeheo.github.io/PORTFOLIO_2020";

export interface PracticeWork {
  /** URL 슬러그 — `/practice/[slug]` */
  slug: string;
  /** 카드 / 상세 페이지 타이틀 */
  title: string;
  /** 클라이언트 (가상) */
  client: string;
  /** 작업 시기 — 예: "2020.08" */
  period: string;
  /** 카드 노출용 한 줄 설명 */
  tagline: string;
  /** Renewal Point 라벨 (보통 2~3 개) */
  points: string[];
  /** Overview — 본문 1~2 문단 */
  overview: string;
  /** 타이포 시스템 — 제목/본문 폰트와 의도 */
  font: {
    heading: string;
    body: string;
    note: string;
  };
  /** 컬러 팔레트 — HEX 배열 + 의도 한 줄 */
  colors: {
    palette: string[];
    note: string;
  };
  /** 카드 / 상세 페이지 메인 이미지 */
  mainImage: string;
  /** 상세 페이지 보조 이미지 (선택) */
  detailImages?: { src: string; alt: string }[];
  /** 라이브 데모 URL */
  demoUrl: string;
}

export const PRACTICE_WORKS: PracticeWork[] = [
  {
    slug: "goodagi",
    title: "굳아기 사이트 리뉴얼",
    client: "굳아기",
    period: "2020.08",
    tagline:
      "유아용품 쇼핑몰의 카테고리 정리 + 사용층을 고려한 부드러운 컬러 톤",
    points: [
      "명확한 카테고리 구분",
      "효율성 높은 레이아웃",
      "주사용층을 고려한 색상",
    ],
    overview:
      "명확히 분류되어 있지 않은 카테고리를 정리하고 이해를 도울 수 있는 아이콘을 활용해 네비게이션을 심플하게 정리했습니다. 귀엽고 포근한 이미지에 어울리도록 배너를 제작하고 보라색과 분홍색을 메인 컬러로 사용했습니다.",
    font: {
      heading: "유토이미지고딕",
      body: "유토이미지고딕",
      note: "동글동글한 고딕 서체를 전체에 동일하게 적용해, 귀여우면서도 신뢰감을 주는 사이트로 제작했습니다.",
    },
    colors: {
      palette: ["#a0a0ff", "#ffa0a0", "#eaeaea", "#444444"],
      note: "연한 회색과 파스텔 톤의 색상을 사용해 부드럽고 포근한 이미지를 나타냈습니다.",
    },
    mainImage: `${OLD_PORTFOLIO_BASE}/img/main-web2.png`,
    detailImages: [
      { src: `${OLD_PORTFOLIO_BASE}/img/goodagi-banner1.jpg`, alt: "굳아기 배너 1" },
      { src: `${OLD_PORTFOLIO_BASE}/img/goodagi-banner2.jpg`, alt: "굳아기 배너 2" },
      { src: `${OLD_PORTFOLIO_BASE}/img/goodagi-banner3.jpg`, alt: "굳아기 배너 3" },
      { src: `${OLD_PORTFOLIO_BASE}/img/goodagi-banner4.jpg`, alt: "굳아기 배너 4" },
    ],
    demoUrl: `${OLD_PORTFOLIO_BASE}/portfolio/goodagi/index.html`,
  },

  {
    slug: "carrier",
    title: "캐리어에어컨 사이트 리뉴얼",
    client: "캐리어",
    period: "2020.08",
    tagline:
      "에어컨의 시원한 톤 + 좌우 슬라이드 인터랙션으로 동적인 화면 구성",
    points: ["효율성 높은 레이아웃", "흥미 유발하는 동적인 화면"],
    overview:
      "사이트를 이용하는 사람들에게 흥미로운 화면을 제공하려는 데에 목적을 두고 keyframes 와 JS 를 활용해 다양한 움직임을 구현했습니다. 스크롤 시 일반적으로 많이 사용되는 상하 움직임이 아닌, 좌우로 움직이는 화면을 만들어 신선하면서도 전문적인 이미지를 나타냈습니다.",
    font: {
      heading: "넥슨 Lv.2 고딕 Bold",
      body: "넥슨 Lv.2 고딕",
      note: "각지고 쭉 뻗은 서체를 사용해 에어컨의 시원한 느낌을 그대로 담아냈습니다.",
    },
    colors: {
      palette: ["#193264", "#ff7800", "#888888", "#444444"],
      note: "시원한 느낌을 주는 파란색을 주조색으로 사용하고, 대비되는 주황색으로 강조를 표현했습니다.",
    },
    mainImage: `${OLD_PORTFOLIO_BASE}/img/main-web3.png`,
    detailImages: [
      { src: `${OLD_PORTFOLIO_BASE}/img/carrier-slide.png`, alt: "캐리어 좌우 슬라이드" },
    ],
    demoUrl: `${OLD_PORTFOLIO_BASE}/portfolio/carrier/index.html`,
  },

  {
    slug: "pasteur",
    title: "파스퇴르 사이트 리뉴얼",
    client: "파스퇴르",
    period: "2020.09",
    tagline:
      "신선한 우유 톤 + 두 개의 원형이 스크롤에 따라 움직이는 인터랙션",
    points: [
      "명확한 카테고리 구분",
      "흥미 유발하는 동적인 화면",
      "통일감 있는 레이블링",
    ],
    overview:
      "파스퇴르만의 장점을 첫 화면에 강조하고, 생산 제품 정보·신제품·이벤트 공지를 인덱스 페이지에 추가해 사용자가 원하는 정보를 빠르게 얻을 수 있도록 했습니다. 젖소의 무늬 혹은 우유 방울을 떠오르게 하는 두 개의 원형을 화면 이동에 따라 위치 이동시켜 재미있는 화면을 구현했습니다.",
    font: {
      heading: "롯데마트행복체",
      body: "나눔스퀘어",
      note: "모음 'ㅡ' 를 곡선으로 만들어 포인트를 준 서체를 사용해 귀여우면서도 신뢰감을 주는 사이트로 제작했습니다.",
    },
    colors: {
      palette: ["#0f89ca", "#ffc800", "#00ad52", "#ec1b28"],
      note: "채도를 낮춘 파스퇴르 로고 색상으로 브랜드 이미지를 나타내고, 그 중 우유의 신선함을 나타내는 파란색을 주조색으로 사용했습니다.",
    },
    mainImage: `${OLD_PORTFOLIO_BASE}/img/main-web4.png`,
    detailImages: [
      { src: `${OLD_PORTFOLIO_BASE}/img/pasteur1.png`, alt: "파스퇴르 메인 1" },
      { src: `${OLD_PORTFOLIO_BASE}/img/pasteur2.png`, alt: "파스퇴르 메인 2" },
      { src: `${OLD_PORTFOLIO_BASE}/img/pasteur3.png`, alt: "파스퇴르 메인 3" },
    ],
    demoUrl: `${OLD_PORTFOLIO_BASE}/portfolio/pasteur/index.html`,
  },

  {
    slug: "atelier7",
    title: "아뜰리에7 사이트 리뉴얼",
    client: "아뜰리에7",
    period: "2020.09",
    tagline:
      "콘텐츠 최소화 + 세리프 타이포로 우아하게 정리한 미니멀 인덱스",
    points: [
      "명확한 카테고리 구분",
      "효율성 높은 레이아웃",
      "통일감 있는 레이블링",
    ],
    overview:
      "세련된 이미지로 사이트를 완성시키기 위해 콘텐츠를 최소화하고 감각적인 인덱스 페이지를 구현했습니다. 각 서브 페이지는 통일감을 느낄 수 있는 형태로 제작하고, 공간 효율성을 높인 레이아웃으로 디자인했습니다.",
    font: {
      heading: "아리따부리",
      body: "넷마블체L",
      note: "세리프가 있는 서체를 사용해 우아하게 표현하고, 좁고 긴 서체를 본문에 사용해 세련된 이미지로 마무리했습니다.",
    },
    colors: {
      palette: ["#888888", "#f06e00", "#444444"],
      note: "회색을 주조색으로 사용해 고급스럽고 심플하게 디자인하고, 로고에서 사용된 주황색으로 포인트를 주었습니다.",
    },
    mainImage: `${OLD_PORTFOLIO_BASE}/img/main-web5.png`,
    demoUrl: `${OLD_PORTFOLIO_BASE}/portfolio/atelier7/index.html`,
  },

  {
    slug: "bakery",
    title: "김상엽제과제빵학원 사이트 리뉴얼",
    client: "김상엽제과제빵학원",
    period: "2020.11",
    tagline:
      "반응형 + 식품 톤 컬러 + 강점을 메인에 배치한 학원 사이트",
    points: [
      "명확한 카테고리 구분",
      "효율성 높은 레이아웃",
      "흥미 유발하는 동적인 화면",
    ],
    overview:
      "반응형 디자인으로 제작해 다양한 디바이스에서 활용 가능한 사이트를 구현했습니다. 중복되는 내용과 많이 찾지 않는 항목을 정리하고, 학원의 강점을 나타낼 수 있는 콘텐츠를 메인에 배치해 경쟁력 있는 사이트로 제작했습니다.",
    font: {
      heading: "지마켓산스M",
      body: "지마켓산스L",
      note: "깔끔하게 정돈된 느낌의 서체를 전체에 일괄 적용해 전문적인 학원의 이미지를 나타냈습니다.",
    },
    colors: {
      palette: ["#ff5a32", "#64b4c8", "#c8c8c8", "#888888"],
      note: "식품 관련 색상에 많이 사용되는 주황색을 메인으로 사용하고, 그와 대비되는 하늘색을 사용해 조화롭게 표현했습니다.",
    },
    mainImage: `${OLD_PORTFOLIO_BASE}/img/main-web7.png`,
    detailImages: [
      { src: `${OLD_PORTFOLIO_BASE}/img/bakery-icon.png`, alt: "김상엽제과제빵학원 아이콘" },
      { src: `${OLD_PORTFOLIO_BASE}/img/bakery-main.jpg`, alt: "김상엽제과제빵학원 메인 페이지" },
    ],
    demoUrl: `${OLD_PORTFOLIO_BASE}/portfolio/bakery/index.html`,
  },
];

export function findPracticeWork(slug: string): PracticeWork | undefined {
  return PRACTICE_WORKS.find((w) => w.slug === slug);
}
