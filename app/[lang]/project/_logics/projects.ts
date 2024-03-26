import {
  mdiVuejs,
  mdiLanguageGo,
  mdiLanguageTypescript,
  mdiGoogleCloud,
  mdiGoogleAnalytics,
  mdiFirebase,
  mdiLanguagePython,
  mdiAws,
  mdiKubernetes,
  mdiNodejs,
  mdiLanguageJava,
} from "@mdi/js";
import type { IProject } from "../types";

export const PROJECTS: IProject[] = [
  {
    title: "LG 익시 관리 도구",
    desc: "AI 모델 관리 및 서비스 제공 플랫폼",
    projType: "web",
    using: [mdiAws, mdiVuejs, mdiLanguageTypescript, mdiLanguageJava],
    to: "/project/list/ixi",
    titleImg: "/projects/ixi-admin/1.png",
    allImg: [
      "/projects/ixi-admin/1.png",
      "/projects/ixi-admin/2.png",
      "/projects/ixi-admin/3.png",
      "/projects/ixi-admin/4.png",
      "/projects/ixi-admin/5.png",
      "/projects/ixi-admin/6.png",
    ],
  },
  {
    title: "LG 데이터 산업 플랫폼",
    desc: "AI 모델 관리 및 서비스 제공 플랫폼",
    projType: "web",
    using: [mdiAws, mdiVuejs, mdiLanguageTypescript, mdiLanguageJava],
    to: "/project/list/b2b-platform",
    allImg: [],
  },
  {
    title: "Inout box",
    desc: "의류 소/도매 플랫폼",
    projType: "web",
    titleImg: "/projects/iobox/inout-login.png",
    using: [mdiVuejs, mdiLanguageGo, mdiLanguageTypescript],
    to: "/project/list/inout-box",
    allImg: [
      "/projects/iobox/inquiry.png",
      "/projects/iobox/shop-main.png",
      "/projects/iobox/uncle-main.png",
      "/projects/iobox/vendor-main.png",
    ],
  },
  {
    title: "Inout uncle",
    desc: "의류 배송 플랫폼",
    projType: "app",
    titleImg: "/projects/iobox/app-store.jpeg",
    using: ["/icon/flutter-logo.svg", mdiGoogleCloud, mdiGoogleAnalytics],
    usingPubIdx: [0],
    to: "/project/list/inout-uncle",
    allImg: [
      "/projects/iobox/uncle-app-1.png",
      "/projects/iobox/uncle-app-2.png",
      "/projects/iobox/app-store.jpeg",
    ],
  },
  {
    title: "Campi",
    desc: "캠핑 플랫폼",
    projType: "app",
    titleImg: "/projects/campi/my-page.jpg",
    using: ["/icon/flutter-logo.svg", mdiFirebase, mdiGoogleCloud],
    usingPubIdx: [0],
    whiteImg: true,
    to: "/project/list/campi",
    allImg: ["/projects/campi/feed.jpg", "/projects/campi/my-page.jpg"],
  },
  {
    title: "Virtual try on backend",
    desc: "AI 부서로 부터 제작된 모델을 바탕으로, 웹 서비스 제작(국가 과제)",
    projType: "web",
    using: [mdiAws, mdiLanguagePython],
    titleImg: "/projects/try-on.png",
    allImg: ["/projects/try-on.png"],
  },
  {
    title: "CJ 크롤러 제작",
    desc: "각종 쇼핑플랫폼에서 판매중인 CJ 제일제당 상품데이터 수집 및 ETL to cj",
    projType: "web",
    using: [mdiAws, mdiKubernetes, mdiLanguagePython],
    allImg: [],
  },
  {
    title: "LOTTE 추천 어드민 페이지",
    desc: "롯데 홈쇼핑 추천서비스 어드민 페이지 제작",
    projType: "web",
    using: [mdiAws, mdiKubernetes, mdiVuejs, mdiLanguagePython],
    titleImg: "/projects/try-on.png",
    allImg: ["/projects/try-on.png"],
  },
  {
    title: "회사 홈페이지 제작",
    desc: "PM & 개발 & 유지보수",
    projType: "web",
    titleImg: "/projects/intellisys.png",
    using: [mdiNodejs, mdiVuejs],
    allImg: ["/projects/intellisys.png"],
  },
];
const projectsHasImg = PROJECTS.filter((p) => p.allImg.length > 0);
export const getRandomProjectSingleImg = () => {
  const projIdx = Math.floor(Math.random() * projectsHasImg.length);
  const projectInfo = projectsHasImg[projIdx];
  const imgIdx = Math.floor(Math.random() * projectInfo.allImg.length);
  const imageSrc = projectInfo.allImg[imgIdx];
  return { projectInfo, imageSrc };
};

export default PROJECTS;
