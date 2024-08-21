import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCluqF8sRPoq-63GbJNnPrjsr8Phfg7BxA",
  authDomain: "autocatalog-9c002.firebaseapp.com",
  projectId: "autocatalog-9c002",
});

const db = getFirestore(firebaseApp);
export const userCollectionRef = collection(db, "users");

export async function createUser(
  name: any,
  lastName: any,
  cpf: any,
  phone: any,
  mail: any,
  password: any
) {
  const user = await addDoc(userCollectionRef, {
    name,
    lastName,
    cpf,
    phone,
    mail,
    password,
  });
  //   console.log({ p1, p2 });
}
