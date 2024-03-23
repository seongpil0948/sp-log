import { title } from "@/components/primitives";
import "./main.css";
import About from "./_components/About";

export default function AboutPage() {
  return (
    <div id="about-root">
      <About />
      <div className="sections">
        <section className="section">
          <h2>01</h2>
        </section>
        <section className="section">
          <h2>02</h2>
        </section>
        <section className="section">
          <h2>03</h2>
        </section>
        <section className="section">
          <h2>04</h2>
        </section>
        <section className="section">
          <h2>05</h2>
        </section>
      </div>
    </div>
  );
}
