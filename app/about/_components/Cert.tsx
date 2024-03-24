"use client";

import { ImageCard } from "@/components/client-only/card/dynamic";
import { useMemo } from "react";

export default function CertSection(props: {
  certData: string[];
  scrollContainer: string;
}) {
  const { certData } = props;
  const cards = useMemo(() => {
    return certData.map((c, i) => {
      const defaultComp = (
        <div>
          <ImageCard key={i + c} src={c} />
        </div>
      );
      // if (i % 3 === 0) {
      //   return (
      //     <div key={i + c + "wrapper"} className="grid gap-4">
      //       {defaultComp}
      //     </div>
      //   );
      // }
      return defaultComp;
    });
  }, [certData]);

  return (
    <div className="grid gap-4 max-h-full overflow-y-hidden max-w-3/4 grid-flow-col grid-rows-3 md:grid-rows-4 pr-3  border border-gray-200 rounded-lg shadow dark:border-gray-700">
      {cards}
    </div>
  );
}
