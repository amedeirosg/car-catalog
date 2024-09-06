import { initializeApp } from "firebase/app";
import {
  addDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCluqF8sRPoq-63GbJNnPrjsr8Phfg7BxA",
  authDomain: "autocatalog-9c002.firebaseapp.com",
  projectId: "autocatalog-9c002",
});

const db = getFirestore(firebaseApp);
const userCollectionRef = collection(db, "users");

const auth = getAuth(firebaseApp);

export const createAcc = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro [${errorCode}]: ${errorMessage}`);
    });

export async function createUser(fields: Record<string, any>) {
  try {
    const docRef = await addDoc(userCollectionRef, fields);
    console.log("Usuário criado! ID do documento: ", docRef.id);
  } catch (error) {
    console.error("Erro ao criar usuário: ", error);
  }
}
