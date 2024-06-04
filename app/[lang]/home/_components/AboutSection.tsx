import { subtitle } from "@/config/variants/primitives";

import clsx from "clsx";

export function AboutSection(props: { children: React.ReactNode; sectionCls: string }) {
  const { sectionCls, children } = props;
  return (
    <section className={clsx(sectionCls, 'pl-4')}>
      <div className={subtitle({color: 'gray'})}>사이트 개발자에대해 궁금한가요?</div>
      <div className=" w-1/2 mr-auto !text-start mb-6  ">
        {children}
      </div>
    </section>
  )
}
