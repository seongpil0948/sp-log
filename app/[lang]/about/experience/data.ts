export interface Experience {
  challenges: string[];
  solutions: string[];
  achieves: string[];
}

export const experiences: Experience[] = [
  {
    challenges: [
      "주고객 LG의 개발환경이 바이올렛(kubernetes) 로 이전함(초기, 불안정)에 따라 추후 프로젝트가 모두 MSA 환경을 요구 ",
      "SK 드론관제 플랫폼 고도화 프로젝트 에 SSO(Keycloak) 요구사항 추가 이에 당사는 관련 기술 및 프레임워크를 준비해야 했습니다",
    ],
    solutions: [
      "사내서버 3대를 기반 master(1), worker(2)의 인프라 환경을 구축.",
      "CNI, CSI, CRI 분석/비교 및 설계하며 바이올렛과 유사한 환경(Argo, Gateway) 를 세팅",
      "샘플 API(spring), Web(nextjs) 서버를 준비하여 팀원들이 프로젝트에 적응할 수 있도록 기여.",
      "APPI(java, python) 서버 2대를 구축, Cluster 내 여러 API 파드 에서 인증이 지속되는 SSO 앱을 팀원들에게 시연, 프로젝트에 적응할 수 있도록 기여",
    ],
    achieves: [
      "LG 바이올렛 환경은 저희팀만 기술력을 겸비, 덕분에 프로젝트를 전담하며 높은 매출을 기록.",
      "SSO 앱을 팀원들에게 시연, 기술력 향상에 이바지",
    ],
  },
  {
    challenges: [
      "주고객 LG의 개발환경이 바이올렛(kubernetes) 로 이전함(초기, 불안정)에 따라 추후 프로젝트가 모두 MSA 환경을 요구 ",
      "SK 드론관제 플랫폼 고도화 프로젝트 에 SSO(Keycloak) 요구사항 추가 이에 당사는 관련 기술 및 프레임워크를 준비해야 했습니다",
    ],
    solutions: [
      "사내서버 3대를 기반 master(1), worker(2)의 인프라 환경을 구축.",
      "CNI, CSI, CRI 분석/비교 및 설계하며 바이올렛과 유사한 환경(Argo, Gateway) 를 세팅",
      "샘플 API(spring), Web(nextjs) 서버를 준비하여 팀원들이 프로젝트에 적응할 수 있도록 기여.",
      "APPI(java, python) 서버 2대를 구축, Cluster 내 여러 API 파드 에서 인증이 지속되는 SSO 앱을 팀원들에게 시연, 프로젝트에 적응할 수 있도록 기여",
    ],
    achieves: [
      "LG 바이올렛 환경은 저희팀만 기술력을 겸비, 덕분에 프로젝트를 전담하며 높은 매출을 기록할 수 있었습니다.",
      "SSO 앱을 팀원들에게 시연, 기술력 향상에 이바지",
    ],
  },
];
