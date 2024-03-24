// import { type AppDispatch, setMsg } from "@/app/store";
import { type FirebaseError } from "firebase/app";

const isFirebaseError = (err: any): err is FirebaseError =>
  err.code && err.message;

export function handleError(error: unknown): {
  title?: string;
  message: string;
} {
  if (isFirebaseError(error)) {
    return {
      title: error.code,
      message: error.message,
    };
  }
  if (error instanceof Error) {
    return { message: error.message };
  }
  console.error(error);
  return { message: "An unknown error occurred" };
}

// export async function handleModalError(dispatch: AppDispatch, error: unknown) {
//   const result = handleError(error);
//   // const dict = await getDictionary(lang)
//   console.error("===>", result, error);
//   dispatch(
//     setMsg({
//       title: result.title,
//       content: result.message,
//       type: "error",
//     })
//   );
// }
