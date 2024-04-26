"use client";

import { useRef } from "react";
import clsx from "clsx";
import { sectionCls } from "../theme";
import { FirstSection } from "./FirstSection";
import { ProjectSection } from "./ProjectSection";
import { useScroll, useSpring, useVelocity } from "framer-motion";
import BlackBall from "./BlackBall";
import SingletonHome from "../_utils/singleton";
import DocsSection from "./DocSection";

// on first mounted disable scroll and rotate the image
// when frame is equal to length of urls, enable scroll
export function Scene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: rootRef,
    layoutEffect: true,
  });

  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const inst = SingletonHome.getInstance();
  inst.setData(smoothVelocity);

  return (
    <>
      {/* TODO: to context or redux */}
      <section
        id="scene"
        ref={rootRef}
        className={clsx(
          sectionCls,
          // "relative snap-both snap-mandatory overflow-auto"
          "relative overflow-auto max-h-screen"
        )}
        style={{
          zIndex: 1,
        }}
      >
        <FirstSection />
        <ProjectSection />
        <DocsSection />
        <AboutSection />
      </section>
      <BlackBall />
    </>
  );
}

export function AboutSection() {
  return (
    <section className={clsx(sectionCls)}>
      사이트 개발자에대해 궁금한가요?
      <MockText />
    </section>
  );
}

function MockText() {
  return (
    <>
      <h2>Sub-header</h2>
      <p>
        In eget sodales arcu, consectetur efficitur metus. Duis efficitur
        tincidunt odio, sit amet laoreet massa fringilla eu.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
        rhoncus quam.
      </p>
      <p>
        Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
        imperdiet sagittis justo. In viverra fermentum ex ac vestibulum. Aliquam
        eleifend nunc a luctus porta. Mauris laoreet augue ut felis blandit, at
        iaculis odio ultrices. Nulla facilisi. Vestibulum cursus ipsum tellus,
        eu tincidunt neque tincidunt a.
      </p>
      <h2>Sub-header</h2>
      <p>
        In eget sodales arcu, consectetur efficitur metus. Duis efficitur
        tincidunt odio, sit amet laoreet massa fringilla eu.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
        rhoncus quam.
      </p>
      <p>
        Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
        imperdiet sagittis justo. In viverra fermentum ex ac vestibulum. Aliquam
        eleifend nunc a luctus porta. Mauris laoreet augue ut felis blandit, at
        iaculis odio ultrices. Nulla facilisi. Vestibulum cursus ipsum tellus,
        eu tincidunt neque tincidunt a.
      </p>
      <h2>Sub-header</h2>
      <p>
        In eget sodales arcu, consectetur efficitur metus. Duis efficitur
        tincidunt odio, sit amet laoreet massa fringilla eu.
      </p>
    </>
  );
}
