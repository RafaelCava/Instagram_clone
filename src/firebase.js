/* *
 * Arquivo: firebase.js
 * Descrição: Arquivos do firebase
 * Author: Rafael Cavalcante
 * Data de criação: 14/08/2021
 */
import firebase from 'firebase';

const firebaseApp = {
  apiKey: 'AIzaSyA6ERIlBmURraDMt7rL4MIQ2ZjwPP0VCg8',
  authDomain: 'instagram-clone-17c8f.firebaseapp.com',
  projectId: 'instagram-clone-17c8f',
  storageBucket: 'instagram-clone-17c8f.appspot.com',
  messagingSenderId: '740810410776',
  appId: '1:740810410776:web:11557e28e5dd794a446c6d',
  measurementId: 'G-21YHG8HTRG',
};

firebase.initializeApp(firebaseApp);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export {
  db, auth, storage, functions,
};
