import {
  ButtonGithub,
  ButtonHome,
  ButtonLinkedIn,
} from "@/components/client-only/button/links";
import { ChipList } from "@/components/client-only/ChipList";
import { HeaderAbout } from "./Header";
import {
  paragraph,
  subtitle,
  title,
  typo,
} from "@/components/server-only/primitives";
import clsx from "clsx";
import CertSection from "./Cert";
import styles from "../styles.module.css";

export default function AboutSectionsKo(props: { certData: string[] }) {
  const { certData } = props;
  const expCompany = [
    {
      name: "intellisys",
      period: "2020.01 ~ 2022.06",
      position: "Developer Manager, Fullstack Developer",
      describe:
        "data collect using (crawler), manage pipeline using (rabbitmq, k8s argo), provide reliable service from infrastructure to front",
    },
    {
      name: "inout box",
      period: "2022.06 ~ 2023.03",
      position: "Fullstack Developer",
      describe: `
      My passion for software development stems from a deep fascination with the entire process, from the initial spark of an idea to its final realization as a fully-fledged product.  
      that's led me to start my own business, As a result, I created camping mobile app, clothing wholesale platform web, app, and gained various experiences.
      `,
    },
    {
      name: "Abacus",
      period: "2023.03 ~ Present",
      position: "Frontend Developer",
      describe: `Abacus is a SI company that provides services. major partner is LG.`,
    },
  ];

  const expSkill = [
    {
      ctgr: "Frontend",
      skills: ["React or NextJs", "Vue or Nuxtjs", "Flutter(Mobile)"],
    },
    {
      ctgr: "Infra",
      skills: [
        "GCP",
        "AWS",
        "Firebase",
        "Kubernetes",
        "Docker",
        "Linux",
        "Nginx",
        "RabbitMQ",
      ],
    },
    {
      ctgr: "Backend",
      skills: [
        "python(Django)",
        "node(Express)",
        "java(Spring)",
        "golang(Gin)",
      ],
    },
    {
      ctgr: "Etc",
      skills: ["Git", "Jira", "Confluence", "Typescript"],
    },
  ];

  return (
    <div className={styles.sections}>
      <section className={styles.section}>
        <HeaderAbout title="About a Developer" />
        <h3 className={title({ size: "md", fullWidth: true })}>
          I am SeongPilChoi.
        </h3>
        <p className={paragraph({ size: "lg", font: "script" })}>
          첫 업무, 크롤링을 통해 사내 AI 엔진에 사용될 데이터를 관리하고
          파이프라인을 자동화 하는 작업은 매력적이었습니다. <br />
          Fullstack 엔지니어로서 문제를 해결해 나가는 과정에서 저는 주저하지
          않고 도전했고, 이를 통해 다양한 경험을 쌓을 수 있었습니다. <br />
          아래는 제가 가지고 있는 기술 스택의 개요입니다.
        </p>
        <ol className={paragraph({ size: "md", font: "gothic" })}>
          <li>- Cloud knowledge such as GCP</li>
          <li>- Server such as (Django, Nextjs, Linux)</li>
          <li>- Frontend such as NextJs, Vue or Nuxtjs, Flutter(Mobile)</li>
        </ol>
        <p className={paragraph({ size: "md", font: "gothic" })}>
          저는 여가시간에도 자기개발을 즐깁니다 특히 주말은, 제 아이디어를
          구현할 설레이는 날입니다. <br />
          서버 관련지식이 부족하다 느꼈을때, 리눅스 관련 자격증(LFCS)을
          취득했습니다. <br />
          모바일 앱을 만들고 싶어서 Flutter를 공부하고, 캠핑/의류 업체용 앱을
          출시했습니다. <br />
          회사에서 쿠버네티스 환경에 배포하는 프로젝트를 맡았을 때, 쿠버네티스
          자격증(CKA)을 취득했습니다.
        </p>
        <p className={paragraph({ size: "md", font: "gothic" })}>
          최근에는 WebGL과 3D(Three.js and Blender) 분야에 관심을 가지고
          있습니다. <br />
          <b>Udemy</b>, <b>Inflearn</b> , Youtube 는 저의 친구입니다.
        </p>
      </section>
      <section className={styles.section}>
        <HeaderAbout title="Experience" />
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col justify-start items-start max-w-[45vw]">
            <div className={clsx(subtitle({ weight: "bold" }), "text-left")}>
              Company
            </div>
            <ul>
              {expCompany.map((exp, idx) => (
                <li
                  key={idx}
                  className=" flex flex-col text-start my-2 border-b border-gray-30"
                >
                  <div
                    className={clsx(
                      typo({
                        size: "sm",
                        font: "gothic",
                        color: "gray",
                        weight: "bold",
                      }),
                      "!m-0 !p-0"
                    )}
                  >
                    {exp.name} / {exp.period} / {exp.position}
                  </div>
                  <div
                    className={clsx(
                      typo({
                        size: "sm",
                        font: "roboto",
                        color: "tertiary",
                        weight: "bold",
                      })
                    )}
                  >
                    {exp.describe}
                  </div>
                  {/* add bottom line */}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-2 flex flex-col justify-start items-start text-right">
            <div className={clsx(subtitle({ weight: "bold" }))}>Skill</div>
            <ul>
              {expSkill.map((exp, idx) => (
                <li key={idx} className=" flex flex-col my-4 text-end">
                  <div
                    className={clsx(
                      typo({
                        size: "sm",
                        font: "gothic",
                        color: "gray",
                        weight: "bold",
                      })
                    )}
                  >
                    {exp.ctgr}
                  </div>
                  <div className="flex justify-end">
                    <ChipList
                      tags={exp.skills}
                      className="justify-end"
                      chipProps={{
                        color: "warning",
                        variant: "bordered",
                        classNames: {
                          base: "min-w-30 h-5 p-2 md:p-5 mx-2 overflow-hidden",
                          content: clsx(typo({ size: "xs" })),
                        },
                      }}
                    ></ChipList>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        {/* when larger then md max width is 50% */}
        <HeaderAbout title="Certifications" />
        <CertSection certData={certData} scrollContainer="#about-root" />
      </section>
      {/* <section className={styles.section}>
    <HeaderAbout title="Projects" />
    <p>
      Fast forward to 2024, I have been working as a developer for 5 years
      and have worked on a variety of projects. Everything I have done,
      small or big, has been a vital stepping stone for where I am today.
    </p>
    <p className={paragraph({ size: "sm", font: "gothic" })}>
      Although I can build a service on my own from infrastructure to
      front <br />
      I was always with my colleagues when I created the best service.
      therefore <br />I always struggle to be the best colleague
    </p>
  </section> */}
      <section className={styles.section}>
        <HeaderAbout title="Links" />
        <div className="flex flex-col justify-center align-middle gap-2 items-center h-full ">
          <ButtonGithub />
          <ButtonLinkedIn />
          <ButtonHome />
        </div>
      </section>
    </div>
  );
}
