"use client";
import { isMobile } from "@/app/_utils/client/responsive";
import { fileNameFromPath } from "@/app/_utils/common";
import { Image } from "@nextui-org/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useRef } from "react";

// refer: https://poke-holo.simey.me/
// refer: https://www.youtube.com/watch?v=YDCCauu4lIk&t=67s
export function ImageCard({ src }: { src: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Image
        isZoomed
        onClick={onOpen}
        ref={imageRef}
        src={src}
        alt={src}
        width={300}
        loading="lazy"
      />
      <Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {fileNameFromPath(src)}
              </ModalHeader>
              <ModalBody>
                <div
                  onClick={onClose}
                  className="flex h-full flex-col items-center justify-center align-middle"
                >
                  <Image src={src} alt={src} className=" m-auto " />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
