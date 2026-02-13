import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js';
import { auth } from './firebase.js';

const provider = new GoogleAuthProvider();

export const subscribeAuth = (listener) => onAuthStateChanged(auth, listener);

export async function signUpEmail(name, email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await sendEmailVerification(cred.user);
  return cred.user;
}

export async function logInEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logInGoogle() {
  const cred = await signInWithPopup(auth, provider);
  return cred.user;
}

export const logOut = () => signOut(auth);
export const triggerPasswordReset = (email) => sendPasswordResetEmail(auth, email);
export const triggerVerification = (user) => sendEmailVerification(user);

export async function changeEmail(user, nextEmail) {
  await updateEmail(user, nextEmail);
  await sendEmailVerification(user);
}
