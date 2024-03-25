import CommonNavbar from "@/components/server-only/navbar";
import Link from "next/link";
import clsx from "clsx";
import { main, title } from "@/components/server-only/primitives";
import { CmFooter } from "@/components/server-only/footers";

export default function NotFound() {
  return (
    <div>
      <CommonNavbar leftTreeOptions={{ dir: "app/[lang]" }} />
      <main className={clsx(main(), "text-center", "justify-center")}>
        <h1 className={title()}>Not Found</h1>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </main>
      <CmFooter />
    </div>
  );
}
