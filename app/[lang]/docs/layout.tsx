import { CmFooter } from "@/components/server-only/footers";
import CommonNavbar from "@/components/server-only/navbar";
import { main } from "@/components/server-only/primitives";
import clsx from "clsx";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonNavbar
        drawerProps={{
          title: "Documentation",
        }}
        leftTreeOptions={{ dir: "app/[lang]/docs" }}
      />
      <main
        id="content-container"
        className={clsx(
          main(),
          "overflow-auto max-h-screen pb-12 mx-6 md:mx-48 lg:mx-96"
        )}
      >
        {children}
      </main>
      <CmFooter />
    </>
  );
}
