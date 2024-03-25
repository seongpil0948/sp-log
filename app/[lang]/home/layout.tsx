import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative flex flex-col h-screen">{children}</div>;
}
