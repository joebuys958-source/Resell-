import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut 
} from "firebase/auth";
import { auth } from "./firebase";

export async function signup(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

export async function logout() {
  return await signOut(auth);
}
