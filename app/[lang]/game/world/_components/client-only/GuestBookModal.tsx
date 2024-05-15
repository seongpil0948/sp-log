import ViewGuestBook from '@/app/[lang]/game/_guestbook/components/ViewGuestBook'
import {forwardRef, useImperativeHandle, useState} from 'react'
import type {ElementRef} from 'react'

import {Modal, ModalContent, useDisclosure} from '@nextui-org/modal'

const BridgeEnterModal = forwardRef<
  ElementRef<typeof Modal>,
  // Omit<ModalProps, 'children'>,
  any
>(({placement = 'left', classNames, ...props}, ref) => {
  const [openAble, setOpenAble] = useState(true)
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure({
    onClose() {
      setOpenAble(false)
      setTimeout(() => {
        setOpenAble(true)
      }, 1000)
    },
  })

  useImperativeHandle(
    ref,
    () =>
      ({
        open() {
          open()
        },
        isOpen() {
          return isOpen
        },
      }) as any,
  )

  const open = () => {
    if (!isOpen && openAble) onOpen()
  }
  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
      <ModalContent>
        <ViewGuestBook />
      </ModalContent>
    </Modal>
  )
})

BridgeEnterModal.displayName = 'BridgeEnterModal'

export default BridgeEnterModal
