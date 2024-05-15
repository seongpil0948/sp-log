import {forwardRef, useImperativeHandle} from 'react'
import type {ElementRef} from 'react'

import {Button} from '@nextui-org/button'
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps, useDisclosure} from '@nextui-org/modal'

const BridgeEnterModal = forwardRef<
  ElementRef<typeof Modal>,
  // Omit<ModalProps, 'children'>,
  any
>(({placement = 'left', classNames, ...props}, ref) => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  useImperativeHandle(
    ref,
    () =>
      ({
        open() {
          open()
        },
      }) as any,
  )
  const open = () => {
    if (!isOpen) onOpen()
  }
  const handleEnterBridge = () => {
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">안내문</ModalHeader>
          <ModalBody>사다리맵으로 이동하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleEnterBridge}>
              입장하기
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
})

BridgeEnterModal.displayName = 'BridgeEnterModal'

export default BridgeEnterModal
