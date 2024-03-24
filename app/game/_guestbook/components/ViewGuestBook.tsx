"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import FormGuestBook from "./FormGuestBook";
import BookTable from "./TableGuestBook";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { HeaderAbout } from "@/app/about/_components/Header";
import clsx from "clsx";
import { title } from "@/components/server-only/primitives";

export default function ViewGuestBook() {
  return (
    <Card className="max-w-full p-5">
      <CardHeader>
        <h2
          className={clsx(
            title({
              size: "sm",
              fullWidth: true,
              font: "gothic",
            })
          )}
        >
          방명록
        </h2>
      </CardHeader>
      <CardBody className="overflow-hidden p-3">
        <Tabs aria-label="Options" fullWidth variant="bordered">
          <Tab key="list" title="목록">
            <BookTable />
          </Tab>
          <Tab key="write" title="작성">
            <FormGuestBook />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
