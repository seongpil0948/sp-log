"use client";

import { useEffect, useState } from "react";

export type ScreenSize = "S" | "M" | "L";
export const ScreenSize: { [k: string]: ScreenSize } = {
  S: "S",
  M: "M",
  L: "L",
};
export function getScreenSize(): ScreenSize {
  const w = window.innerWidth;
  if (w < 700) return "S";
  else return "L";
}

export function isMobile() {
  if (typeof window === "undefined") return false;
  const agent = navigator.userAgent;
  if (
    agent.match(
      /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
    ) != null ||
    agent.match(/LG|SAMSUNG|Samsung/) != null
  ) {
    return true;
  } else {
    return false;
  }
}

export function useResponsive() {
  return { getScreenSize, isMobile };
}

export function useWindowSize() {
  // 초기 state 값은 with undefined width/height로 세팅한다.
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // window resize를 위한 핸들러
    function handleResize() {
      // 윈도우의 넓이/높이(width/height)를 set을 해준다
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 이벤트 리스너 부착
    window.addEventListener("resize", handleResize);

    // 핸들러를 바로 불러서 state가 초기 window size로 업데이트 될 수 있도록한다
    handleResize();

    //이벤트리스너 제거 그리고 청소
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
