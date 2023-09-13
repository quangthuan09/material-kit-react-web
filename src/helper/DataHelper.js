import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore/lite';

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
const db = getFirestore(app);

const auth = getAuth(app);

export const DataHelper = {
  getTopics: async () => {
    const resultCol = collection(db, 'topics');
    const resultSnapshot = await getDocs(resultCol);
    const resultList = resultSnapshot.docs.map((doc) => {
      const itemConvert = {
        id: doc.id,
        ...doc.data(),
      };
      return itemConvert;
    });
    return resultList;
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