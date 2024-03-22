import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { ElementRef, forwardRef, useImperativeHandle, useState } from "react";
import FormGuestBook from "@/app/game/_guestbook/components/FormGuestBook";

const BridgeEnterModal = forwardRef<
  ElementRef<typeof Modal>,
  // Omit<ModalProps, 'children'>,
  any
>(({ placement = "left", classNames, ...props }, ref) => {
  const [openAble, setOpenAble] = useState(true);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
    onClose() {
      setOpenAble(false);
      setTimeout(() => {
        setOpenAble(true);
      }, 1000);
    },
  });

  useImperativeHandle(
    ref,
    () =>
      ({
        open() {
          open();
        },
      } as any)
  );

  const open = () => {
    if (!isOpen && openAble) onOpen();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
      <ModalContent>
        <FormGuestBook />
      </ModalContent>
    </Modal>
  );
});

BridgeEnterModal.displayName = "BridgeEnterModal";

export default BridgeEnterModal;
