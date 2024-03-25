import { CmFooter } from "@/components/server-only/footers";
import CommonNavbar from "@/components/server-only/navbar";
import { main } from "@/components/server-only/primitives";

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
        leftTreeOptions={{ dir: "app/[lang]/doc" }}
      />
      <main id="content-container" className={main()}>
        {children}
      </main>
      <CmFooter />
    </>
  );
}
