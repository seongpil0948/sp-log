export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        maxHeight: "100vh",
        overflow: "auto",
      }}
    >
      {children}
    </section>
  );
}
