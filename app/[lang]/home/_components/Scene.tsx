"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { sectionCls } from "../theme";
import { FirstSection } from "./FirstSection";
import { ProjectSection } from "./ProjectSection";
import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useVelocity,
} from "framer-motion";

// on first mounted disable scroll and rotate the image
// when frame is equal to length of urls, enable scroll
export function Scene() {
  const [containerScrollable, setContainerScrollable] = useState(true);
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
  return (
    <>
      <section
        id="scene"
        ref={rootRef}
        className={clsx(
          sectionCls,
          {
            "overflow-auto": containerScrollable,
          },
          "relative snap-both snap-mandatory"
        )}
        style={{
          zIndex: 1,
        }}
      >
        <FirstSection
          containerScrollable={containerScrollable}
          handleScroll={(progress) => {
            console.log("progress : ", progress, containerScrollable);
            if (progress > 0.8 && !containerScrollable) {
              setContainerScrollable(true);
            } else if (containerScrollable && progress === 0) {
              setContainerScrollable(false);
            }
          }}
        />
        <ProjectSection scrollY={smoothVelocity} rootRef={rootRef} />
        <DocsSection />
        <AboutSection />
      </section>
    </>
  );
}

export function DocsSection() {
  return (
    <section className={clsx(sectionCls)}>
      문서를 확인해보세요. Documents 동영상 재생
      <MockText />
    </section>
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
