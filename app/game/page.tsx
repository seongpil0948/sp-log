import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default async function SSGPage() {
  return (
    <main id="content-container" className={"justify-center gap-3"}>
      hi
      <Button className="ma-4">
        <Link href="/game/world">World</Link>
      </Button>
      <Button className="ma-4">
        <Link href="/game/onemin">onemin</Link>
      </Button>
      <Button>
        <Link href="/game/domino">domino</Link>
      </Button>
    </main>
  );
}
