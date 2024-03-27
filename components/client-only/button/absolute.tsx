import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export function GoHomeBtnAbsolute() {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="ghost"
      color="secondary"
      className=" absolute top-2 left-2"
      onClick={() => {
        router.push("/home");
      }}
    >
      To 🏠
    </Button>
  );
}

export default GoHomeBtnAbsolute;
