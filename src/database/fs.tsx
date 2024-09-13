import { initializeApp } from "firebase/app";
import {
  addDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCluqF8sRPoq-63GbJNnPrjsr8Phfg7BxA",
  authDomain: "autocatalog-9c002.firebaseapp.com",
  projectId: "autocatalog-9c002",
});

const db = getFirestore(firebaseApp);

const userCollectionRef = collection(db, "users");

export const auth = getAuth(firebaseApp);

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

export async function updateUser(userId: Object, cards) {
  const q = query(userCollectionRef, where("id", "==", userId));

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (documento) => {
        const docRef = doc(db, "users", documento.id);
        await updateDoc(docRef, cards);

        console.log(
          `Novos valores adicionados com sucesso no documento ${documento.id}!`
        );
      });
    } else {
      console.log("Nenhum documento encontrado com o campo ID = 444");
    }
  } catch (error) {
    console.error("Erro ao adicionar novos valores: ", error);
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    console.log("Usuário autenticado:", user);

    return user;
  } catch (err) {
    console.error("Erro ao fazer login:", err);

    return false;
  }
}

export async function getInfoUser(userId: Object) {
  let userData = null;

  if (userId) {
    const q = query(userCollectionRef, where("id", "==", userId));
    //Run the query
    const querySnapShot = await getDocs(q);
    //Check if there is documents
    querySnapShot.forEach((doc) => {
      userData = doc.data();
    });
  } else {
    console.log("Nenhum usuário logado.");
  }

  if (userData) {
    return userData;
  }
}
