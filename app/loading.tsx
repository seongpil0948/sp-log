import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="min-h-screen justify-center min-w-screen px-4 pt-15 mx-auto py-4 w-full h-full  xl:w-4xl xl:py-20">
      <Spinner />
    </div>
  );
}
