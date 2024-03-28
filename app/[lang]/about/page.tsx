import {
  paragraph,
  subtitle,
  title,
  typo,
} from "@/components/server-only/primitives";
import styles from "./styles.module.css";
import About from "./_components/About";
import clsx from "clsx";
import { HeaderAbout } from "./_components/Header";
import { getOnlyFiles } from "../../_utils/server/dir-tree";
import CertSection from "./_components/Cert";
import commonConfig, { TAvailLocale } from "@/config";
import { getDictionary } from "@/app/[lang]/dictionaries";
import {
  ButtonGithub,
  ButtonHome,
  ButtonLinkedIn,
} from "@/components/client-only/button/links";
import { ChipList } from "@/components/client-only/ChipList";

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

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
    skills: ["python(Django)", "node(Express)", "java(Spring)", "golang(Gin)"],
  },
  {
    ctgr: "Etc",
    skills: ["Git", "Jira", "Confluence", "Typescript"],
  },
];

interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang);
  const certificates = getOnlyFiles("public/cert", { extensions: /\.png$/ });
  const certData = [...certificates];
  return (
    <div id="about-root" className={clsx(styles.about, paragraph())}>
      <div className={styles.sections}>
        <section className={styles.section}>
          <HeaderAbout title="About a Developer" />
          <h3 className={title({ size: "md", fullWidth: true })}>
            I am SeongPilChoi.
          </h3>
          <p className={paragraph({ size: "lg", font: "script" })}>
            cusp of developing has always fascinated me and <br />i have never
            been afraid to just jump to in and give it a go whether it is
          </p>
          <ol className={paragraph({ size: "md", font: "gothic" })}>
            <li>Cloud knowledge such as GCP</li>
            <li>Server such as (Django, Nextjs, Linux)</li>
            <li>Frontend such as NextJs, Vue or Nuxtjs, Flutter(Mobile)</li>
          </ol>
          <p className={paragraph({ size: "md", font: "gothic" })}>
            I enjoy making miscellaneous product in my free time <br></br>
            When I lacked server knowledge, I studied Linux and obtained related
            certificates. <br></br>
            When I lacked Mobile knowledge, I studied Flutter and
            publish(camping/wear-vendor app). <br></br>
            When I was working on the <i>익시 도우미 관리도구</i> Tool project
            with <i>LG</i>, I studied Kubernetes and obtained related
            certificates.
          </p>
          <p className={paragraph({ size: "md", font: "gothic" })}>
            I recently started to have interest in WebGL and{" "}
            <b>3D(Three.js and Blender)</b>
            <b>Udemy</b>, <b>Inflearn</b> and Youtube are my best friends.
          </p>
        </section>
        <section className={styles.section}>
          <HeaderAbout title="Experience" />
          <p className={paragraph({ size: "sm", font: "gothic" })}>
            Although I can build a service on my own from infrastructure to
            front <br />
            I was always with my colleagues when I created the best service.
            therefore <br />I always struggle to be the best colleague
          </p>

          <div className="w-full flex  flex-row justify-between">
            <div className="flex flex-3 flex-col justify-start items-start max-w-[50vw]">
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
                            content: clsx(typo({ size: "sm" })),
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
        <section className={styles.section}>
          <HeaderAbout title="Projects" />
          <p>
            Fast forward to 2024, I have been working as a developer for 5 years
            and have worked on a variety of projects. Everything I have done,
            small or big, has been a vital stepping stone for where I am today.
          </p>
        </section>
        <section className={styles.section}>
          <HeaderAbout title="Links" />
          <div className="flex flex-col justify-center align-middle gap-2 items-center  ">
            <ButtonGithub />
            <ButtonLinkedIn />
            <ButtonHome />
          </div>
        </section>
      </div>
      <About rootSelector="#about-root" />
    </div>
  );
}
