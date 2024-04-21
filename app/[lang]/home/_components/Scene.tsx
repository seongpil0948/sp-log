"use client";

import { useState } from "react";
import clsx from "clsx";
import { sectionCls } from "../theme";
import { FirstSection } from "./FirstSection";
import { ProjectSection } from "./ProjectSection";

// on first mounted disable scroll and rotate the image
// when frame is equal to length of urls, enable scroll
export function Scene() {
  const [containerScrollable, setContainerScrollable] = useState(false);

  return (
    <>
      <section
        id="scene"
        className={clsx(sectionCls, {
          "overflow-auto": containerScrollable,
        })}
        style={{
          zIndex: 1,
        }}
      >
        <FirstSection
          containerScrollable={containerScrollable}
          handleScroll={(progress) => {
            if (progress > 0.8 && !containerScrollable) {
              setContainerScrollable(true);
            } else if (progress < 0.01 && containerScrollable) {
              setContainerScrollable(false);
            }
          }}
        />
        <ProjectSection />
        <DocsSection />
        <AboutSection />
      </section>
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

export function DocsSection() {
  return (
    <section className={clsx(sectionCls)}>
      문서를 확인해보세요.
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
