import { title } from "@/components/primitives";
import styles from "./styles.module.css";
import About from "./_components/About";
export default function AboutPage() {
  return (
    <div id="about-root" className={styles.about}>
      <div className={styles.sections}>
        <section className={styles.section}>
          <h2 className={styles.h2}>About</h2>
          <h3 className={title({ size: "md" })}>I am Seongpil. A Developer</h3>
          <p>
            cusp of developing has always fascinated me and i have never been
            afraid to just jump to in and give it a go whether it is
          </p>
          <ol>
            <li>Cloud knowledge such as GCP</li>
            <li>Server such as (Django, Nextjs, Linux)</li>
            <li>Frontend such as NextJs, Vue or Nuxtjs, Flutter(Mobile)</li>
          </ol>
          <p>
            I enjoy making miscellaneous product in my free time When I lacked
            server knowledge, I studied Linux and obtained related certificates.
            When I was working on the <i>익시 도우미 관리도구</i> Tool project
            with <i>LG</i>, I studied Kubernetes and obtained related
            certificates. I recently started to have interest in WebGL and
            3D(Three.js and Blender)
            <b>Udemy</b>, <b>Inflearn</b> and Youtube are my best friends.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Experience</h2>
        </section>
        <section className={styles.section}>
          <h2>Certificates</h2>
        </section>
        <section className={styles.section}>
          <h2>projects</h2>
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
