import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDjr8QK5vhDkbfvVEBDVOq4OpgFnuJEllU",
  authDomain: "crwn-db-741e8.firebaseapp.com",
  databaseURL: "https://crwn-db-741e8.firebaseio.com",
  projectId: "crwn-db-741e8",
  storageBucket: "",
  messagingSenderId: "789302972701",
  appId: "1:789302972701:web:5506d22bb68ed990"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(e) {
      console.log('error creating user', e);
    }

  }

  return userRef;

}

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
