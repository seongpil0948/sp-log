import type {FirestoreError} from 'firebase/firestore'

export async function onFirestoreErr(name: string, err: FirestoreError) {
  console.log('>>> firestore error >>> ', name)
  console.log('code: ', err.code)
  console.log('cause: ', err.cause)
  console.log('name: ', err.name)
  console.log('message: ', err.message)
  console.log('<<< firestore error <<<')

  // if (
  //   err.code === "permission-denied" &&
  //   router.currentRoute.value.name !== "Login"
  // ) {
  //   router.replace({ name: "Login" });
  // }
  // logger.error(null, name + "error", err);
}
export function onFirestoreCompletion(name: string) {
  console.log(`snapshot ${name} completion `)
}
