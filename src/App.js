import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useEffect } from 'react';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
// ----------------------------------------------------------------------
export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyC9960MgBMZrL7sil8DKQnXfxCs3FPteQA",
    authDomain: "rideexam.firebaseapp.com",
    projectId: "rideexam",
    storageBucket: "rideexam.appspot.com",
    messagingSenderId: "144918114618",
    appId: "1:144918114618:web:524e1289312ff4f1bfa003",
    measurementId: "G-MKFK8FB8CD"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(()=>{
     const  getCities = async()=> {
      const citiesCol = collection(db, 'topics');
      const citySnapshot = await getDocs(citiesCol);
      const cityList = citySnapshot.docs.map(doc => doc.data());
      console.log('cityList',cityList)
      return cityList;
    }
    getCities()
  },[db])
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
