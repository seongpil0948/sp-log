import { Spinner } from '@nextui-org/spinner'

export default function LoadingSpinner() {
  // Or a custom loading skeleton component
  return (
    <div className="min-h-screen min-w-screen w-full h-full px-4 pt-15 mx-auto py-4   xl:w-4xl xl:py-20 justify-center align-middle text-center flex">
      <Spinner className="m-auto" labelColor="secondary" color="primary">
        Loading...
      </Spinner>
    </div>
  )
}
