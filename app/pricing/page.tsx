import { title } from "@/components/primitives";
import { Textarea } from "@nextui-org/input";
import FormGuestBook from "../game/_guestbook/components/FormGuestBook";

export default function PricingPage() {
  return (
    <div>
      <h1 className={title()}>Pricing</h1>
      <FormGuestBook />
    </div>
  );
}
