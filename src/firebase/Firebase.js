import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCsKO0IUNrHxKAfnzw1JsXp4HuyxPA1N4Q",
    authDomain: "crypto-tom.firebaseapp.com",
    databaseURL: "https://horsley.europe-west1.firebasedatabase.app/",
    projectId: "crypto-tom",
    storageBucket: "crypto-tom.appspot.com",
    messagingSenderId: "688369231954",
    appId: "1:688369231954:web:bcfa0fcba891ca46c1578b",
    measurementId: "G-7CDC3QZFKY"
};
export const fire = firebase.initializeApp(config);
