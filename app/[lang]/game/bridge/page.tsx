import Bridge from "./_components/client-only/Bridge";

export default async function SSGPage() {
  return (
    <div
      style={{
        overflow: "hidden",
        margin: "0",
      }}
    >
      <Bridge />
    </div>
  );
}
