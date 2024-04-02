"use client";

import { Card, CardBody, CardProps } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { IProject } from "../types";

import { ProjectTypeIcon, ProjectUsing } from "./server-only/icons";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { title, typo } from "@/components/server-only/primitives";
import { isMobile } from "@/app/_utils/client/responsive";

export default function ProjectCard(props: {
  p: IProject;
  classNames?: CardProps["classNames"];
}) {
  const { p } = props;
  const router = useRouter();
  const cardClassNames: CardProps["classNames"] = {
    ...props.classNames,
    body: clsx(props.classNames?.body, " overflow-hidden"),
    base: clsx(
      props.classNames?.base,
      "border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] min-w-[400px] md:min-w-[500px]"
    ),
  };
  let imgSrc: string | undefined = p.titleImg;
  if (!imgSrc && p.allImg && p.allImg.length > 0) {
    imgSrc = p.allImg[0];
  }
  if (!imgSrc) {
    imgSrc = "/image/try-on.png";
  }

  return (
    <Card
      isBlurred
      isPressable
      isHoverable
      onPress={() => {
        router.push("/project/" + p.id);
      }}
      classNames={cardClassNames}
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-col gap-1 md:gap-2 items-center justify-center">
          <div className="relative w-full ">
            <Image
              alt="Project Image"
              style={{
                height: "40vh",
                width: "100%",
                objectFit: "cover",
              }}
              shadow="md"
              src={imgSrc}
              width="100%"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h1
                  className={clsx(
                    title({
                      size: "sm",
                      color: "foreground",
                    }),
                    "text-ellipsis whitespace-nowrap w-full"
                  )}
                >
                  {p.title}
                </h1>
                <div className="max-h-full overflow-clip">
                  {p.description &&
                    p.description.map((desc, idx) => (
                      <p
                        key={idx}
                        className={typo({ size: "xs", color: "gray" })}
                      >
                        {desc}
                      </p>
                    ))}
                </div>
              </div>
              <ProjectTypeIcon projType={p.projType} />
            </div>

            <div className="flex justify-between mt-3 ">
              <ProjectTypeIcon projType={p.projType} />
              <ProjectUsing p={p} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
