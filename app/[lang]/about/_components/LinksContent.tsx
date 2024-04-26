import {
  ButtonGithub,
  ButtonLinkedIn,
  ButtonHome,
} from "@/components/client-only/button/links";
import { HeaderAbout } from "./Header";
import clsx from "clsx";
import { ExperienceDownButton } from "../experience/_components/DownloadButton";

export function LinksContent(props: { isText?: boolean }) {
  return (
    <>
      <HeaderAbout title="Links" />
      <div
        className={clsx("flex flex-col justify-center  gap-2  h-full ", {
          "items-center": !props.isText,
        })}
      >
        <ButtonGithub isText={props.isText} />
        <ButtonLinkedIn isText={props.isText} />
        <ButtonHome isText={props.isText} />
        <ExperienceDownButton />
      </div>
    </>
  );
}

export default LinksContent;
