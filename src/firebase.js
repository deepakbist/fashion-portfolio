import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD8tT4UntK2MJMIidvzc45DbzYRQ2G9jmw",
    authDomain: "fashion-portfolio.firebaseapp.com",
    databaseURL: "https://fashion-portfolio.firebaseio.com",
    projectId: "fashion-portfolio",
    storageBucket: "fashion-portfolio.appspot.com",
    messagingSenderId: "845004346014",
    appId: "1:845004346014:web:093378afd2bdb48987618f",
    measurementId: "G-QLHY6XT343"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();