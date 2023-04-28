import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore, WriteBatch, collection, writeBatch, query, getDocs } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDhloqvNJ2XkS3o6ce-MqNxw3wLtwrJ1fw",
  authDomain: "crwn-db-d51c3.firebaseapp.com",
  projectId: "crwn-db-d51c3",
  storageBucket: "crwn-db-d51c3.appspot.com",
  messagingSenderId: "433265900788",
  appId: "1:433265900788:web:ca867a86180add88a932a1",
};

const firebaseApp = initializeApp(config);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = async () => signInWithPopup(auth, provider);

const db = getFirestore();


export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach( object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done');
}


export const getCategoriesAndDocuments = async() => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnaphshot = await getDocs(q);
  const categoryMap = querySnaphshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}

export const createUserDocumentWithAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const { displayName, email, uid } = userAuth;
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: new Date(),
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Problem creating user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthuserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callBack) =>
  onAuthStateChanged(auth, callBack);
