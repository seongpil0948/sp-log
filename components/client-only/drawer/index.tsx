"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetProps,
} from "./sheet";
import Icon from "@mdi/react";
import { useDisclosure } from "@nextui-org/modal";
import { mdiMenuClose, mdiMenuOpen } from "@mdi/js";
import { Button } from "@nextui-org/button";
import type { ReactNode } from "react";

export interface CommonDrawerProps {
  children: ReactNode;
  title?: string;
  sheetProps?: Partial<SheetProps>;
}
export default function CommonDrawer(props: CommonDrawerProps) {
  const { children, sheetProps, title } = props;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
    defaultOpen: sheetProps?.defaultOpen ?? false,
  });

  const handleClick = () => {
    isOpen ? onClose() : onOpen();
  };
  return (
    <>
      <Button isIconOnly onPress={handleClick}>
        <Icon path={isOpen ? mdiMenuClose : mdiMenuOpen} size={1} />
      </Button>

      <Sheet
        classNames={{
          body: "overflow-auto",
          wrapper: "h-full rounded-l-none rounded-r-xl shadow-xl",
        }}
        isOpen={isOpen}
        defaultOpen={sheetProps?.defaultOpen ?? false}
        onOpenChange={onOpenChange}
        {...sheetProps}
      >
        <SheetContent>
          {(onClose) => (
            <>
              {title && <SheetHeader>{title}</SheetHeader>}
              <SheetBody>{children}</SheetBody>
              <SheetFooter>© 2023 ACF</SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
/*
 - https://github.com/nextui-org/nextui/blob/main/packages/components/modal/src/use-modal.ts 
 - {<AnimatePresence>{state.isOpen ? overlay : null} </AnimatePresence>}
 
 */
