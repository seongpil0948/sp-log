export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" px-5 lg:px12 py-3 lg:py-5 h-screen overflow-y-auto overflow-x-hidden">
      {children}
    </section>
  );
}
