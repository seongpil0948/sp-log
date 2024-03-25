import {
  paragraph,
  subtitle,
  title,
} from "@/components/server-only/primitives";
import styles from "./styles.module.css";
import About from "./_components/About";
import clsx from "clsx";
import { motion } from "framer-motion";
import { HeaderAbout } from "./_components/Header";
import { getOnlyFiles } from "../../_utils/server/dir-tree";
import CertSection from "./_components/Cert";

import commonConfig, { TAvailLocale } from "@/config";
import { getDictionary } from "@/app/[lang]/dictionaries";

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

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
          <p className={paragraph({ size: "md", font: "gothic" })}>
            Although I can build a service on my own from infrastructure to
            front <br />I was always with my colleagues when I created the best
            service. <br />I always struggle to be the best colleague
          </p>

          <div className="w-full flex flex-row">
            <div className="flex-1 justify-start">
              <div className={clsx(subtitle(), "text-left")}>Company</div>
            </div>
            <div className="flex-1  justify-end">
              <div className={clsx(subtitle(), "text-end")}>Skill</div>
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
          <h2>way back</h2>
        </section>
      </div>
      <About rootSelector="#about-root" />
    </div>
  );
}
