import Village from "./_components/client-only/Village";

export default async function SSGPage() {
  return (
    <div
      style={{
        overflow: "hidden",
        margin: "0",
      }}
    >
      <Village />
    </div>
  );
}
