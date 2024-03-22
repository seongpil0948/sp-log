import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="min-h-screen justify-center min-w-screen">
      <Spinner />
    </div>
  );
}
