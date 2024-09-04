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

import { getAuth } from "firebase/auth";
import { useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCluqF8sRPoq-63GbJNnPrjsr8Phfg7BxA",
  authDomain: "autocatalog-9c002.firebaseapp.com",
  projectId: "autocatalog-9c002",
});

const db = getFirestore(firebaseApp);
const userCollectionRef = collection(db, "users");

// export async function createUser(
//   name: any,
//   lastName: any,
//   cpf: any,
//   phone: any,
//   mail: any,
//   password: any
// ) {
//   const user = await addDoc(userCollectionRef, {
//     name,
//     lastName,
//     cpf,
//     phone,
//     mail,
//     password,
//   });
//   //   console.log({ p1, p2 });
// }

/**
 * Função para verificar se um e-mail já existe na coleção "users".
 * @param {string} email - O e-mail a ser verificado.
 * @returns {Promise<boolean>} - Retorna uma Promise que resolve para true se o e-mail existir, ou false se não existir.
 */

export async function getNameOfStore(mail: string) {
  try {
    const q = query(userCollectionRef, where("mail", "==", mail));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data().nameOfStore;
    } else {
      console.log("Nenhum documento encontrado com o usuário logado");
    }
  } catch (error) {
    console.error("Erro ao buscar o nome da loja:", error);
  }
}

export async function checkIfAccExists(mailValue, passwordValue) {
  try {
    const q = query(
      userCollectionRef,
      where("mail", "==", mailValue),
      where("password", "==", passwordValue)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Usuário encontrado
      // console.log("Usuário encontrado:", querySnapshot.docs[0].data());
      return true;
    } else {
      // Usuário não encontrado
      // console.log("Usuário não encontrado.");
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar o valor da chave 'mail':", error);
    throw error;
  }
}

export async function createUser(fields: Record<string, any>) {
  try {
    const docRef = await addDoc(userCollectionRef, fields);
    console.log("Usuário criado! ID do documento: ", docRef.id);
  } catch (error) {
    console.error("Erro ao criar usuário: ", error);
  }
}
