import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyC9960MgBMZrL7sil8DKQnXfxCs3FPteQA',
  authDomain: 'rideexam.firebaseapp.com',
  projectId: 'rideexam',
  storageBucket: 'rideexam.appspot.com',
  messagingSenderId: '144918114618',
  appId: '1:144918114618:web:524e1289312ff4f1bfa003',
  measurementId: 'G-MKFK8FB8CD',
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth(app);
let lastVisible = [];

export const DataHelper = {
  getTopics: async (limitItem, page = 0) => {
    const initData = await getDocs(query(collection(db, 'topics'), orderBy('name'), limit(limitItem)));
    if (!lastVisible) lastVisible = initData.docs[initData.docs.length - 1];
    const nextPage =
      lastVisible && page !== 0
        ? await getDocs(query(collection(db, 'topics'), orderBy('name'), startAfter(lastVisible), limit(limitItem)))
        : await getDocs(query(collection(db, 'topics'), orderBy('name'), limit(5)));
    lastVisible = nextPage.docs[nextPage.docs.length - 1];
    const resultList = nextPage.docs.map((doc) => {
      const itemConvert = {
        id: doc.id,
        ...doc.data(),
      };
      return itemConvert;
    });
    const collectionRef = collection(db, 'topics');
    const resultSnapshot = await getDocs(collectionRef);
    const countData = resultSnapshot.docs.length;
    return { data: resultList, total: countData };
  },
  addTopics: async (data) => {
    try {
      const docRef = await addDoc(collection(db, 'topics'), {
        name: data.name,
        description: data.description,
        type: data.type,
      });

      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  },
  updateTopics: async (data) => {
    const washingtonRef = doc(db, 'topics', data.id);
    await updateDoc(washingtonRef, {
      name: data.name,
      description: data.description,
      type: data.type,
    });
  },
  deleteTopics: async (id) => {
    await deleteDoc(doc(db, 'topics', id));
  },
  login: async (email, password) => {
    const user = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
    return user;
  },
};
