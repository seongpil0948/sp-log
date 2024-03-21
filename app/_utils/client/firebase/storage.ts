import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  FirebaseStorage,
  type StorageReference,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export type STORAGE_SVC = "post" | "user";
export const STORAGE_SVC: { [key in STORAGE_SVC]: STORAGE_SVC } = Object.freeze(
  {
    post: "post",
    user: "user",
  }
);

export function getUrlRef(storage: FirebaseStorage, url: string) {
  // https://firebase.google.com/docs/storage/web/download-files?hl=ko#create_a_reference
  const refer = ref(storage, url);
  console.log("refer:", refer);
  return refer;
}
function getUserPath(userId: string) {
  return `${STORAGE_SVC.user}/${userId}`;
}
export const getPostStoragePath = (uid: string, postId: string) =>
  `${STORAGE_SVC.user}/${uid}/${STORAGE_SVC.post}/${postId}`;

export const getStoragePath = ({
  svc,
  userId,
  postId,
}: {
  svc: STORAGE_SVC;
  userId: string;
  postId?: string;
}) => {
  return svc === STORAGE_SVC.user
    ? getUserPath(userId)
    : getPostStoragePath(userId, postId!);
};

export function getParentRef(p: {
  storage: FirebaseStorage;
  svc: STORAGE_SVC;
  userId: string;
  parentId?: string;
}) {
  if (p.svc === "user") {
    return ref(p.storage, getUserPath(p.userId));
  } else if (p.svc === "post") {
    if (!p.parentId) throw new Error("parentId is required in getParentRef");
    // parentId: vendorProdId
    return ref(p.storage, getPostStoragePath(p.userId, p.parentId));
  } else {
    throw new Error("not matched in getParentRef");
  }
}

function completeRef(
  filename: string,
  parent: StorageReference
): StorageReference {
  return ref(parent, filename);
}

export async function uploadFile(
  parent: StorageReference,
  fs: FileList | File[]
): Promise<string[]> {
  const refers: Array<StorageReference> = [];
  for (let i = 0; i < fs.length; i++) {
    refers.push(completeRef(uuidv4(), parent));
  }
  if (refers.length !== fs.length)
    throw Error("반드시 참조와 파일 목록은 길이가 같아야합니다.");
  const urls: string[] = [];
  for (let j = 0; j < fs.length; j++) {
    const result = await uploadBytes(refers[j], fs[j]);
    urls.push(await getDownloadURL(result.ref));
  }
  console.log(urls);
  return urls;
}

export function deleteCdnObj(refers: StorageReference[]) {
  return Promise.all(refers.map((refer) => deleteObject(refer)));
}
