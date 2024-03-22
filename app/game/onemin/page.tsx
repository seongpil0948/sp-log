import { Suspense } from "react";
import OneMin from "../_components/client-only/OneMin";
import Loading from "@/app/";

export default async function SSGPage() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <OneMin />
        {/* <>hi</> */}
      </Suspense>
    </div>
  );
}
