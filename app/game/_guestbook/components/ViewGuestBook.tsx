"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import FormGuestBook from "./FormGuestBook";
import BookTable from "./TableGuestBook";
import { Card, CardBody } from "@nextui-org/card";

export default function ViewGuestBook() {
  return (
    <Card className="max-w-full">
      <CardBody className="overflow-hidden">
        <Tabs aria-label="Options" fullWidth variant="bordered">
          <Tab key="photos" title="Photos">
            <BookTable />
          </Tab>
          <Tab key="music" title="Music">
            <FormGuestBook />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
