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
  mdiRabbit,
  mdiVuetify,
  mdiReact,
  mdiWebpack,
} from '@mdi/js'

import type {IProject} from '../types'

export const PROJECTS: IProject[] = [
  {
    id: 'rp-mgmt',
    title: 'LG 물류 로봇 관제 플랫폼',
    projType: 'webApp',
    using: [mdiAws, mdiVuejs, mdiLanguageTypescript, mdiLanguageJava],
    usingDetail: [
      "web server: 'nginx(AWS EC2)'",
      "api server: 'Java Spring Boot(AWS EC2)'",
      "db: 'Aura RDS'",
      "ui tools: 'konva.js', 'element-ui'",
      "message queue: 'RabbitMQ'",
    ],
    description: [
      `유진로봇 Gateway 연동규격을 기반으로 플랫폼과 상호 운영을 통해 로봇의 상태, 위치, 배터리, 이동경로등의 데이터를 실시간으로 제어/통계 기능 제공.`,
      'progressive web app(PWA), 반응형 웹 디자인(RWD)을 적용하여 모바일/데스크탑에서 사용가능한 서비스 제공',
      '대시보드, 로봇 모델, 고객사, 알림 이력, AS 접수 이력, 관리자 계정, AS 대리점, 파츠, 아이콘, 이용약관, 개인정보 처리 방침 등의 관리 화면을 제공',
      '층 별 로봇등 리소스의 상태와 위치를 표시하는 실시간 UI를 개발하는 과정에서 건물/층 별 지도의 크기에 따라 위치를 표시하는 방법이 필요했습니다.',
      '서버측 인력이 부족하여 메세지큐 구축이 필요했습니다.',
    ],
    titleImg: '/projects/robot-platform/1.png',
    allImg: [
      '/projects/robot-platform/1.png',
      '/projects/robot-platform/2.png',
      '/projects/robot-platform/3.png',
      '/projects/robot-platform/4.png',
    ],
    myRole: 'Frontend Project Leader',
    roleDetail: [
      '직접 사내서버에 RabbitMQ, API서버를 준비하고, 클라이언트와 연동하여 실시간 UI 서비스를 세팅했습니다.',
      '레퍼런스 사이트에 번들링된 JS 코드를 참고한 결과 층 별 지도데이터에 scale 값 확인 후, 위치를 표시하는 방법을 찾아내었습니다(M2PX).',
    ],
    earned: [
      '로봇 상태 데이터를 AWS IoT Core를 통해 MQTTS-WebSocket으로 연동하여 개발하여 보안이 향상된 서비스를 제공 경험',
      '직접 MQTT 서버를 구축하고 브라우저와 연결하여, 실시간 데이터 제공',
      '정확한 사전 준비는 매끄럽게 프로젝트를 진행할 수 있도록 도와주었습니다.',
      '데이터에 대한 설명 없이 레퍼런스 사이트의 코드를 참고한 결과는 큰 병목 해결로 도출',
    ],
  },
  {
    id: 'ixi-studio',
    title: 'LG 익시 솔루션',
    projType: 'web',
    using: [mdiAws, mdiVuejs, mdiLanguageTypescript, mdiLanguageJava],
    titleImg: '/projects/ixi-studio/0.png',
    allImg: [
      '/projects/ixi-studio/0.png',
      '/projects/ixi-studio/1.png',
      '/projects/ixi-studio/2.png',
      '/projects/ixi-studio/3.png',
      '/projects/ixi-studio/4.png',
    ],
    description: [
      'LG 생성형 AI 솔루션, 기업용 SaaS(서비스용 소프트웨어) GPT 서비스',
      '기업 특성에 맞춤 내부에서 사용할 수 있는 AI 모델을 생성하고, 관리할 수 있는 플랫폼',
    ],
    myRole: 'Frontend Project Leader',
    roleDetail: [],
    earned: [
      '기존 사용에 익숙한 MQTT/AMQP, Websocket, REST API, GRPC 경험이 있었지만 새로운 protocol인 SSE(Server Side Event)를 경험하게 해준 고마운 프로젝트입니다.',
      `외부 서비스로 기획 초기 디자인등 수정사항이 많아 개발일정이 빠듯하여 걱정이 많았지만, PL로서 프로젝트에 대한 이해도를 높이고 병목점이 높을 것으로 판단되는 기능(Chat, Code Editor, SSE)의 POC 품질 향상에 시간을 투자하여, 개발 일정을 맞출 수 있었습니다.`,
      `사내 프레임워크(SSG) 사용으로 인해 vite prerender build time 에 CodeMirror 라이브러리의 브라우저 참조 이슈가 있었습니다. 이에 해당 라이브러리를 프로젝트에 clone -> vue 코드에 맞게 오픈소스를 수정하여 해결하였습니다.`,
    ],
    usingDetail: [
      "web server: 'Vue.js & nginx'",
      "ui tools: 'konva.js, element-ui, apache echarts'",
      'SSE',
      "api server: 'Java Spring Boot'",
      "db: 'Aura RDS'",
      "infra: 'kubernetes with istio'",
    ],
  },
  {
    id: 'nextjs-framework',
    title: 'Next.js 사내 프레임워크 제작',
    description: [
      'Vue.js 가 주력이었던 자사에 Next.js 개발을 요구하는 프로젝트가 발생',
      '주 목적은 각 프로젝트 테마 빠르게 적용 할 수 있는 style configuraion을 통해 모든 공통 컴포넌트에 일관된 디자인을 적용, 빠른 생산성을 위한 품질 높은 공용 컴포넌트 제작(with storybook, frontend workshop for building UI components) 이 목적입니다.',
      'SSR, SSG, SPA 렌더링 지원, CORS 환경, proxy 설정이 가능한 가이드라인 또한 제공하였습니다.',
    ],
    myRole: 'Frontend Lead, Next.js 프레임워크를 제작하고 빠른 생산성을 위한 전략을 수립',
    roleDetail: ['퍼블리싱 팀과 협업하여, 빠른 생산성을 위한 품질 높은 공용 컴포넌트 제작'],
    earned: [
      '13버전 이후, 대폭 변경된 AppRouter 기반 프로젝트를 진행할 수 있었던 좋은 기회였습니다.',
      'tailwind-variants 를 통해 css, class as config 를 적용하여, css-in-js 를 사용하지 않고도 빠르게 스타일을 적용할 수 있었습니다.',
    ],
    using: [mdiReact],
    usingDetail: ['Next.js', 'Tailwind CSS', 'Storybook', 'react aria', 'react spectrum'],
    allImg: [],
    projType: 'web',
  },
  {
    id: 'ixi-admin',
    title: 'LG 익시 관리 도구',
    projType: 'web',
    using: [mdiAws, mdiVuejs, mdiLanguageTypescript, mdiLanguageJava],
    titleImg: '/projects/ixi-admin/1.png',
    allImg: [
      '/projects/ixi-admin/1.png',
      '/projects/ixi-admin/2.png',
      '/projects/ixi-admin/3.png',
      '/projects/ixi-admin/4.png',
      '/projects/ixi-admin/5.png',
      '/projects/ixi-admin/6.png',
    ],
    description: [
      'LG의 AI 서비스 TTS, NLP 모델 관리 플랫폼',
      '금칙어, 로그, 가중치등 설정 및 모니터링',
      `
      2024년 LG 에서는 내부 개발 플랫폼(violet(바이올렛, kubernetes,kubeflow 프레임워크))을 사용하여 서비스를 개발하기 시작합니다.
      각 서비스 별 vscode 컨테이너 환경은 초기 단계여서 개발환경 구축에 어려움(웹서비스 개발은 우리팀이 처음)이 있었습니다.
      gateway(apache), container 환경(network, resource) 수동관리, 환경변수 수동 주입, 
      컨테이너 실행 리소스(프로세스 권한, 파일 관리) 등 상세한 부분은 직접 관리해야 했습니다.      
      `,
    ],
    myRole: 'Frontend',
    roleDetail: ['S3 관련 작업', 'Project Leader'],
    earned: [
      `
      하지만 다양한 리소스들을 직접 관리하면서, kubernetes 환경에서 개발하는 것이 재밌었습니다. "horizontal pod autoscaler", 
      "Notebook resource", "Argo", 리소스 라벨 관리등 row level 단계에서 "kubectl" 명령어를 직접 사용할 기회(EKS 진짜 비쌈..)가 
      흔치 않은데 LG 개발팀과 티키타카하며 문제를 해결하면서 흥미로웠습니다.        
      `,
      'CVT 테스트를 통해 쿠버네티스, istio 환경에서의 네트워킹 이슈 해결 경험',
      'WAF를 사용하여, 보안 이슈를 해결하는 방법',
      `
      매 Notebook Instance 종료시 "ECR"의 이미지 크기가 증분되며 10GB 이상이 되는경우, 작성된 버전이 저장되지 않는경우 등   
      "ECR" 에 서비스별 이미지를 관리하는 것이 아직 안정화되지 않아보였습니다.  
      이에 인프라 담당자와 취득한 쿠버네티스 자격증을 기반으로 원활하게 소통하며, 수동 관리 스크립트를 제공받아 해결하였습니다.      
      `,
    ],
    usingDetail: [
      "web server: 'Vue.js & nginx'",
      "api server: 'Java Spring Boot'",
      "db: 'Aura RDS'",
      "infra: 'kubernetes with istio'",
    ],
  },
  {
    id: 'drone',
    title: 'SK 드론 관제 플랫폼',
    projType: 'web',
    using: [mdiAws, mdiVuejs, mdiLanguageTypescript, mdiLanguageJava],
    to: 'a-stro.sktelecom.com',
    titleImg: '/projects/drone/1.jpeg',
    allImg: ['/projects/drone/1.jpeg', '/projects/drone/2.jpeg', '/projects/drone/3.png', '/projects/drone/4.png'],
    description: ['AI 모델 관리 및 서비스 제공 플랫폼'],
    myRole: 'Frontend',
    roleDetail: ['S3 관련 작업', 'Project Leader'],
    earned: [
      '500MB 이상 3D 데이터를 효율적으로 저장할 수 있는 방안',
      '사진의 메타정보로 부터 고도, 위도, 경도를 추출하여 지도에 표시하는 방법',
      'SK T Map API를 사용하여, 위치를 실시간으로 표시하는 방법',
      'AWS Cloud front를 사용하며, PWA의 캐시와 꼬이는 이슈를 해결',
    ],
    usingDetail: ['AWS Cloud front', 'SK T Map API', 'AWS'],
  },
  {
    id: 'b2b-platform',
    title: 'LG 데이터 산업 플랫폼',
    projType: 'web',
    using: [mdiAws, mdiVuejs, mdiLanguageTypescript, mdiLanguageJava],
    description: [
      'AI 모델 관리 및 서비스 제공 플랫폼',
      'AWS 사용량, 서버 모니터링를 API로 연동하여, 사용자가 사용량을 확인할 수 있도록 구현',
      'aws에서 제공하는 template를 사용하여 , 세팅을 최소화하고, 빠르게 서비스를 구축',
      '사내 페이지에서 데이터를 업로드, 연동하여 Glue를 통해 데이터를 가공하고, S3에 저장, Sagemaker를 통해 모델을 훈련하고, 배포',
    ],
    myRole: 'Frontend',
    roleDetail: ['S3 관련 작업', '인증 및 토큰을 관리, Glue/Sagemaker Juptyer notebook 연동'],
    earned: [
      'python code를 배치하기위해 CodeMirror 를 사용했습니다.',
      'vite 빌드도구로 ssg 렌더링용 프레임워크로 작성되었는데 에디터 라이브러리 toast-ui-editor를 사용하면서, vite의 빌드 이슈가 있었습니다. 이에 jsdom 으로 빌드환경에서 가상 dom 을 넣어줌으로서 해결하였습니다.',
      'AWS 특히 S3를 클라이언트에서 사용할 때, CORS, 인증, 버킷 설정등의 이슈를 해결하며, AWS의 서비스들을 사용하는 방법에 대한 경험',
      'AWS 에서의 Organization 구조를 확인하고 사용자별로 어디까지 어떤 기능이 제공될 수 있는지 실제로 확인할 수 있었습니다',
    ],
    usingDetail: [
      'aws',
      'typescript',
      'vue-js',
      'java spring',
      'AI 모델 작성 (Jupyter notebook)',
      '모델 훈련 (AWS Glue, S3, Sagemaker)',
      '모델 배포 (AWS Sagemaker)',
      '라벨링 툴 (AWS SageMaker Ground Truth)',
      '데이터 레이크 연동 (AWS Glue, S3)',
      'API 서버 (AWS API Gateway, Lambda)',
      '웹 서비스 (Vue-js)',
      '데이터베이스 (AWS Aurora, RDS)',
      'AWS 사용량, 서버 모니터링 (AWS CloudWatch)',
      '로그 중앙화 (AWS CloudWatch, EC2)',
      '파이프라인 (AWS CodePipeline, CodeBuild, CodeDeploy)',
    ],
  },

  {
    id: 'lotte-admin',
    title: 'LOTTE 추천 어드민 페이지',
    projType: 'web',
    using: [mdiAws, mdiKubernetes, mdiVuejs, mdiLanguagePython, mdiWebpack],
    description: [
      'Fashion SNS APP에 사용되는 추천 서비스 관리도구 제작',
      '각종 가중치를 조정하고, 대시보드를 통해 데이터 시각화 및 관리',
    ],
    myRole: 'Frontend',
    roleDetail: [
      'Vue.js를 사용하여 Server에서 받아온 데이터를 가공하여 사용자에게 보여주는 역할',
      'amchart를 사용하여 데이터 시각화',
    ],
    earned: [
      '모든 데이터가 가공되기에 제한이 있어, 10만건의 object를 js로 가공하여 사용자에게 보여주는 경험',
      '낮은 사양에서 제대로 동작할 수 있도록 불필요한 반응성, 이벤트을 최소화하고 최적화를 적용한 경험',
    ],
    usingDetail: ['웹 서비스: "Vue.js"', '데이터 시각화: "amchart"', '배포: "Kubernetes, ArgoCD"'],
  },
  {
    id: 'inout-box',
    title: 'Inout box',
    projType: 'web',
    titleImg: '/projects/iobox/inout-login.png',
    using: [mdiVuejs, mdiLanguageGo, mdiLanguageTypescript, mdiGoogleCloud],
    usingDetail: [
      'api server: "Golang (Gin)"',
      'web server: "(Vue.js) firebase hosting"',
      'db: "firestore"',
      'search engine: "elasticsearch"',
      'Payment Gateway: "toss payment"',
    ],
    allImg: [
      '/projects/iobox/inquiry.png',
      '/projects/iobox/shop-main.png',
      '/projects/iobox/uncle-main.png',
      '/projects/iobox/vendor-main.png',
    ],
    description: [
      '의류 소/도매 플랫폼, 산업(동대문 특화) 플랫폼 구축이 목적인 프로젝트.',
      '각 역할(소매/도매/사입)별 필요 기능들을 구축하여, 하나의 플랫폼에서 전자 상거래가 이루어 지는 것이 목표.',
      '소매의 경우 재고관리, 판매관리, 주문관리, 배송관리 등의 기능을 제공하며, 도매의 경우 상품등록, 주문관리, 배송관리, POS, 외상관리 등의 기능을 제공.',
      '사입의 경우, 도매와 계약된 사업자로 빠른 배송을 위한 기능을 제공(Mobile App).',
    ],
    myRole: '1인 개발',
    roleDetail: ['의류 종사자인 친구들의 기획과 요구사항을 바탕으로 혼자 개발.'],
    earned: [
      `
      웹 서비스 도매 POS 기능으로부터 판매 정보에 대한 영수증 정보를 각 기기에서 출력 할 수 있어야 했습니다. 
      사업 성격상 영수증기기에서 바로 출력이 가능해야 했으나 브라우저의 프린트 서비스는 기기/브라우저별 해상도, 기타 미지원 기능, 스타일로 인해 깨지는 현상이 발생 하였습니다. 
      이에, 자주 사용되는 기기별 맞춤 dom 생성 및 css 적용을 통해 해결하였습니다.
      `,
      'App, Web(log, analytics), Server의 로그 중앙화(using GCP logging) 기능 구현 및 모니터링',
      '참여 동기였던 전체 서비스 A to Z 개발 경험을 통해, 개발자로서의 역량 향상.',
      `
      Admin, Web-app, Flutter-app, Api-server, 기타 컨테이너 로 분리된 서비스에서 기록되는 로그를 한 화면에서
      확인할 수 있어야 하며, 특정 로그레벨 이상(Emergency)인 경우 알림을 받을 수 있어야 했습니다. 
      이에 Cloud-logging(like Log4j, GCP Saas)를 선정, 각 언어별로 제공되는 
      Google-cloud-sdk(미지원일경우 api-server 중계) 를 통해 
      통일된 entries 형태로 로그를 저장 할 수 있었습니다. 또한 제공되는 View 로 중앙 관리가 가능하였고, 
      Cloud-Monitoring 을 통해 일정 로그레벨 이상일경우 Slack 을 통해 팀대화방에 알림, 
      휴대폰으로도 지속 추적관리가 가능하게끔 해결 할 수 있었습니다.      
      `,
    ],
  },
  {
    id: 'inout-uncle',
    title: 'Inout uncle',
    projType: 'app',
    titleImg: '/projects/iobox/app-store.jpeg',
    using: ['/icon/flutter-logo.svg', mdiGoogleCloud, mdiGoogleAnalytics],
    usingPubIdx: [0],
    allImg: ['/projects/iobox/uncle-app-1.png', '/projects/iobox/uncle-app-2.png', '/projects/iobox/app-store.jpeg'],
    description: [
      '의류 배송 플랫폼',
      '`in out box` 프로젝트의 사입 직원들의 사입/배송/픽업 사용을 목적으로 제작된 프로젝트',
    ],
    myRole: '1인 개발',
    roleDetail: ['의류 종사자인 친구들의 기획과 요구사항을 바탕으로 혼자 개발.'],
    earned: ['사입자 출/퇴근 관리(APP)', '배송 추적, 상태 관리', '사입자의 주문 관리'],
    usingDetail: ['Push messaging(FCM)'],
  },
  {
    id: 'campi',
    title: 'Campi캠피',
    projType: 'app',
    titleImg: '/projects/campi/my-page.jpg',
    using: ['/icon/flutter-logo.svg', mdiFirebase, mdiGoogleCloud],
    usingPubIdx: [0],
    whiteImg: true,
    allImg: ['/projects/campi/feed.jpg', '/projects/campi/my-page.jpg'],
    description: [
      '캠핑 SNS 플랫폼 (캠핑장 예약, 리뷰 및 사진 공유, 정보 제공)',
      `사용자/인플루언서들은 캠핑 관련된 컨텐츠를 게시, 도매처의 캠핑상품 판매 서비스 제공.`,
      '하이브리드(Flutter) 앱 개발 도중 이미지 편집 기능 추가 요구, 비교적 초기 단계였던 Flutter 개발 환경에서 모든 조건을 충족하는 이미지 편집 라이브러리는 없었습니다.',
    ],
    myRole: '1인 개발 및 서버 구축, 유지보수',
    roleDetail: [
      'Dart 언어를 이용하여 이미지 편집 라이브러리를 직접 제작, 필수 기능이었던 제스처(scale, pan, drag) 에 맞게 aspect ratio, clip, rotate, flip 등의 기능을 추가',
    ],
    earned: [`라이브러리를 제작하면서 Dart 언어에 대한 이해도 증가`],
    usingDetail: ['Flutter', 'Firebase', 'Google Cloud', 'Push messaging(FCM)'],
  },
  {
    id: 'try-on',
    title: 'Virtual try on backend & frontend',
    projType: 'web',
    using: [mdiAws, mdiLanguagePython, mdiVuejs, mdiVuetify],
    titleImg: '/projects/try-on.png',
    allImg: ['/projects/try-on.png'],
    description: [
      'AI 부서로 부터 제작된 모델을 바탕으로, 웹 서비스 제작(국가 과제)',
      `가상 피팅룸 서비스를 제공하는 프로젝트`,
      `모델을 선택후, Intelligent Personalization Solution 을 적용하여 실제 옷을 입은듯한 느낌을 제공`,
    ],
    myRole: 'backend & frontend',
    roleDetail: ['1인 개발 및 타 AI 부서와의 협업'],
    earned: ['상/하의, 신발에 대한 3개 모델 별 서버가 모두 다르게 구성되어 있어'],
    usingDetail: ['api server: "Python (Django)"', 'web server: "(Vue.js) "'],
  },
  {
    id: 'cj-crawler',
    title: 'CJ 크롤러 제작',
    projType: 'web',
    using: [mdiAws, mdiKubernetes, mdiLanguagePython],
    description: [
      '각종 쇼핑플랫폼에서 판매중인 CJ 제일제당 상품데이터 수집 및 ETL to cj',
      'Argo Workflows를 사용하여 ETL 작업을 자동화',
    ],
    myRole: '전체 크롤러 제작',
    roleDetail: [
      'CJ The Market의 상품 데이터가 출시된 쿠팡, 컬리, 이마트 등 대형 쇼핑몰로 부터 상품 데이터, 리뷰 데이터, 가격 데이터 등을 수집하여, ETL 작업을 통해 CJ The Market에 데이터를 적재하는 작업을 진행',
    ],
    earned: [
      '컬리의 경우에는 API 키를 HTML 에 받아둔 덕분에 리소스 소비 없이 API 호출로 데이터를 수집해왔던 재미있는기억이 있습니다.',
    ],
    usingDetail: ['크롤링: "BeautifulSoup, Selenium"', 'Job Scheduler: "Argo Workflows"'],
  },
  {
    id: 'intellisys-app',
    title: '쇼핑물 상품 추천 앱 제작',
    projType: 'app',
    using: [mdiLanguagePython, mdiVuejs, mdiWebpack],
    usingDetail: ['webpack'],
    description: [
      'AI Fashion 추천 서비스를 제공하는 회사의 사업확장을 목적으로 하는 카페24 앱 제작 프로젝트, http://intellisys.co.kr/page/product/restory_i 의 초기 POC 단계 작업 진행',
      'Personal AI Stylist, Catalog Management 적용',
    ],
    myRole: 'Frontend, POC',
    roleDetail: [
      '상품 전시 소스 제작/배포, 카페 24앱 등록, API 연동을 통해 상품 상세 페이지 자동제작 및 상품 추천 서비스 제공',
    ],
    earned: [
      `
      POC 진행시 적용된 기술이 아직 완성되지 않은 상태라 자체적으로 mock 추천 시스템을 만들어 테스트를 진행하였습니다. 
      이때 n2(https://github.com/kakao/n2) 알고리즘을 이용하여 상품간 유사도를 계산하고, 
      기타 다른 추천 알고리즘들을 적용한 경험이 재미있었습니다.
      `,
    ],
  },
  {
    id: 'intellisys-admin',
    title: '사내 AI 모델 관리 시스템 개선 및 유지보수',
    projType: 'app',
    using: [mdiRabbit, mdiVuejs, mdiLanguageTypescript, mdiAws, mdiKubernetes, mdiLanguagePython],
    usingDetail: ['api server: "Python (Django)"', 'web server: "(Vue.js) Jenkins, "', 'db: "PostgreSQL"'],
    description: [
      '40여 쇼핑몰에 대한 데이터 수집 및 정제(누끼, 스케일링, 검수)작업을 통해 유의미한 상품 데이터 관리',
      '수집 데이터를 QA 페이지를 통해 검수, AI 모델 데이터 증분 및 파이프라인 자동화(Dramatiq, Rabbitmq, Kubernetes)',
    ],
    myRole: '유지보수 및 개선',
    roleDetail: ['서비스 장애 대응 및 개선, 데이터 수집 및 정제, QA 페이지 개발, AI 모델 파이프라인 자동화'],
    earned: [
      '사내 kubeadmin 으로 구축된 kubernetes 환경에서의 rabbitmq, web server, api server, db 등의 서비스를 관리하며, "컨테이너화된 서비스들의 관리"에 대한 경험',
      'Django ORM을 통해 데이터베이스를 관리하고, 데이터를 처리하는 방법에 대한 경험',
      'AI 부서에 가공된 데이터를 제공하고, AI 모델을 통해 추천 서비스를 제공하는 과정에 대한 경험',
      '크롤링, 이미지 처리, 데이터베이스 관리, 서버 관리, 모니터링, 로깅, CI/CD, 테스트 등의 경험',
    ],
  },
  {
    id: 'intellisys-magazine',
    title: '데이터 수집 및 NLP',
    projType: 'web',
    using: [mdiLanguagePython, mdiVuejs, mdiVuetify],
    description: [
      'Fashion Magazine 데이터 수집 및 키워드 추출 (TF-IDF 등)',
      '국내/국외 패션 매거진 사이트들의 데이터를 수집하여 키워드를 추출하여 트렌드를 분석, 웹 시각화, 태깅 기능 제공',
      '일자, 카테고리 별 분류하여 elastic search를 통해 검색 기능 제공',
    ],
    myRole: '개발자 1인, 파트너사 디자인 팀과 진행했던 프로젝트.',
    roleDetail: [
      '크롤링, 데이터 정제, 키워드 추출, 웹 서비스 제작, 데이터 시각화, 기 구현된 elastic search 서버 유지보수 및 개선',
    ],
    earned: [
      `
      TF-IDF (Term Frequency-Inverse Document Frequency) 평소에 눈으로만 보던 위키피디아의 알고리즘을 직접 구현해보며, 자연어 처리에 대한 이해도뿐만 아니라. 
      같은 기법 다양한 variation을 통해, 데이터의 카테고리에 알맞는 키워드 추출을 위한 알고리즘을 구현한 경험이 재밌었습니다.
      `,
    ],
    usingDetail: [
      '크롤링: "BeautifulSoup, Selenium"',
      '데이터 정제: "Pandas"',
      '키워드 추출: "TF-IDF"',
      '웹 서비스: "Vue.js, Django"',
      '데이터 시각화: "Chart.js"',
      '검색: "Elastic Search"',
    ],
  },

  {
    id: 'intellisys',
    title: '회사 홈페이지 제작',
    projType: 'web',
    titleImg: '/projects/intellisys.png',
    to: 'http://intellisys.co.kr',
    using: [mdiNodejs],
    allImg: ['/projects/intellisys.png'],
    description: ['PM & 개발 & 유지보수'],
    myRole: 'PM ->SM',
    roleDetail: [
      '외주사 선정부터 프로젝트 진행, 외주 개발자와의 협업, 유지보수까지 전반적인 프로젝트 관리',
      'WBS, 요구사항 정의, 개발 진행, 유지보수등 산출물 및 프로젝트 관리',
    ],
    earned: [
      '웹 에이전시의 UI/UX 디자인 및 개발 역량을 파악하고, 효율적인 협업 방법을 찾아내는 경험',
      'js 템플릿 엔진(ejs) 경험을 통해 스펙트럼 확장',
    ],
    usingDetail: ['ejs', 'nodejs', 'express', 'mysql'],
  },
  {
    id: 'peachhub',
    title: '개인 포트폴리오 사이트',
    projType: 'web',
    titleImg: '/projects/blog/1.png',
    to: 'https://peachhub.love/home',
    using: [mdiNodejs, mdiReact, mdiFirebase, mdiLanguageTypescript],
    allImg: ['/projects/blog/3.png', '/projects/blog/2.png', '/projects/blog/1.png'],
    description: [
      '블로그, 기술 연구, 프로젝트 기재',
      '실무에서 사용할 일이 많이 않은 애니메이션, 3D, 최신 CSS 문법 테스트 등 UI를 적용한 프로젝트',
      '개발관련 지식들을 정리하고, 공유하기 위한 블로그',
    ],
    myRole: '1인 개발',
    earned: [
      '실무에서 필요한 경우 제시하고 즉시 적용가능',
      '내 업무에 맞는 명령어들과 소스들을 정리하여, 빠르게 찾아볼 수 있음',
    ],
    usingDetail: ['Next.js', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'MDX', 'Vercel', 'Firebase'],
  },
]
const projectsHasImg = PROJECTS.filter(p => p.allImg && p.allImg.length > 0)
export const getRandomProjectSingleImg = () => {
  const projIdx = Math.floor(Math.random() * projectsHasImg.length)
  const projectInfo = projectsHasImg[projIdx]
  const imgIdx = Math.floor(Math.random() * projectInfo.allImg!.length)
  const imageSrc = projectInfo.allImg![imgIdx]
  return {projectInfo, imageSrc}
}

export default PROJECTS
