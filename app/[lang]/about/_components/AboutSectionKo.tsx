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
import PROJECTS from "../../project/_logics/projects";
import ProjectCard from "../../project/_components/ProjectCard";

export default function AboutSectionsKo(props: { certData: string[] }) {
  const { certData } = props;
  const expCompany = [
    {
      name: "intellisys",
      period: "2020.01 ~ 2022.06",
      position: "Developer Manager, Fullstack Developer",
      describe:
        "데이터 수집 (crawler), 사내 파이프라인 관리 (rabbitmq, k8s argo), 인프라부터 프론트(app, web)까지 안정적인 서비스 관리",
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
      skills: ["React", "Vue", "Flutter(Mobile)"],
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
      skills: ["python", "nodejs", "java", "golang"],
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
          구현할 설레는 날입니다. <br />
          서버 관련지식이 부족하다 느꼈을때, 리눅스 관련 자격증(LFCS)을
          취득했습니다. <br />
          모바일 앱을 만들고 싶어서 Flutter를 공부하고, 캠핑/의류 업체용 앱을
          출시했습니다. <br />
          회사에서 쿠버네티스 환경에 배포하는 프로젝트를 맡았을 때, 쿠버네티스
          자격증(CKA)을 취득했습니다.
        </p>
        <p className={paragraph({ size: "md", font: "gothic" })}>
          최근에는 WebGL과 3D(Three.js and Blender) 분야에 관심을 가지고
          있습니다. <br />전 항상 Udemy, Inflearn , Youtube와 친하게
          지내고있습니다.
        </p>
      </section>
      <section className={styles.section}>
        <HeaderAbout title="Experience" />
        <div className="w-full flex flex-col">
          <div className="flex flex-col  justify-start items-start">
            <div className={clsx(subtitle({ weight: "bold" }), "text-left")}>
              Company
            </div>
            <ul>
              {expCompany.map((exp, idx) => (
                <li
                  key={idx}
                  className=" flex flex-col text-start my-1 md:my-2 "
                >
                  <div
                    className={clsx(
                      typo({
                        size: "sm",
                        font: "gothic",
                        weight: "bold",
                      }),
                      "!m-0 !p-0"
                    )}
                  >
                    {exp.name} / {exp.period} / {exp.position}
                  </div>
                  {/* add bottom line */}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-start items-start text-right max-h-[60vh] overflow-auto border border-gray-200 rounded-lg px-3 w-[90vw]">
            <div className={clsx(subtitle({ weight: "bold" }))}>Skill</div>
            <ul className="ml-auto">
              {expSkill.map((exp, idx) => (
                <li
                  key={idx}
                  className=" flex flex-col sm:my-2 md:my-4 text-end"
                >
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
                  <ChipList
                    tags={exp.skills}
                    className="justify-end whitespace-nowrap inline-flex flex-wrap max-w-[80vw]"
                    chipProps={{
                      color: "warning",
                      variant: "bordered",
                      classNames: {
                        base: "min-w-30 p-2 md:p-5 mx-1 sm:mx-2 min-w-fit",
                        content: clsx(typo({ size: "sm" })),
                      },
                    }}
                  />
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
      <section className={styles.section}>
        <HeaderAbout title="Projects" />
        <p
          className={clsx(
            paragraph({ size: "sm", font: "gothic" }),
            "hidden md:block"
          )}
        >
          개발 5년차에 접어든 지금까지 다양한 프로젝트를 경험했습니다. 비록 혼자
          인프라에서 프론트엔드까지 서비스를 만들 수 있지만 <br />
          가장 좋은 서비스를 만들 때는 언제나 동료와 함께했습니다. 그래서 언제나
          최고의 동료가 되기 위해 노력합니다.
        </p>
        <div className=" flex overflow-auto gap-3 h-full">
          {PROJECTS.map((proj, idx) => {
            return <ProjectCard key={idx} p={proj} />;
          })}
        </div>
      </section>
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
