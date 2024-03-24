import { title } from "@/components/server-only/primitives";
import ViewGuestBook from "../game/_guestbook/components/ViewGuestBook";
import clsx from "clsx";

export default function PricingPage() {
  return (
    <div>
      <h1 className={clsx(title(), "block")}>Pricing</h1>
      <ViewGuestBook />
    </div>
  );
}
