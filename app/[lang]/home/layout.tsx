import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar locale="en" />
      <main>{children}</main>
      {/* <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">NextUI</p>
              </Link>
            </footer> */}
    </div>
  );
}
