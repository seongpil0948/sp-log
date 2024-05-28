'use client'
import {getFBClientStore} from '@/config/firebase/clientApp'
import {useState} from 'react'

import {mdiCheckBold} from '@mdi/js'
import Icon from '@mdi/react'
import {Button} from '@nextui-org/button'
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card'
import {Input, Textarea} from '@nextui-org/input'
import {v4} from 'uuid'

import {GUEST_DB} from '../db'

import type {TGuestBook} from '../types'

interface Props {
  onCreate?: (data: TGuestBook) => void
}
function FormGuestBook(p: Props) {
  const [message, setMessage] = useState('')
  const [nameAlias, setNameAlias] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const onSubmit = () => {
    setIsLoading(true)
    try {
      const firestore = getFBClientStore()
      const date = new Date()
      const book: TGuestBook = {
        id: v4(),
        uid: '-1',
        nameAlias,
        message,
        createdAt: date,
        updatedAt: date,
      }
      GUEST_DB.create(firestore, book).then(() => {
        p.onCreate && p.onCreate(book)
        setMessage('')
        setNameAlias('')
        setIsChecked(true)
        setTimeout(() => {
          setIsChecked(false)
        }, 2000)
      })
    } catch (e) {
      console.error('Error::GuestBook::', e)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Card>
      <CardHeader>
        <Input
          label="별칭"
          size="sm"
          variant="bordered"
          placeholder="당신을 누구로 소개 하고싶나요?"
          value={nameAlias}
          onValueChange={setNameAlias}
        />
      </CardHeader>
      <CardBody>
        <Textarea
          isRequired
          variant="underlined"
          label={'전달하고 싶은 이야기가 있나요?'}
          labelPlacement="inside"
          placeholder={'당신의 이야기를 들려주세요.'}
          value={message}
          onValueChange={setMessage}
          minRows={7}
        />
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button
          color="primary"
          isLoading={isLoading}
          onClick={onSubmit}
          startContent={isChecked && <Icon path={mdiCheckBold} size={1} />}
        >
          남기기
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FormGuestBook
