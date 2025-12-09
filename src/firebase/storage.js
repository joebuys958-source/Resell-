import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Upload one image
export async function uploadImage(uid, file) {
  const imageRef = ref(storage, `users/${uid}/images/${Date.now()}-${file.name}`);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
}

// Delete image
export async function deleteImage(url) {
  const imageRef = ref(storage, url);
  return deleteObject(imageRef);
}
