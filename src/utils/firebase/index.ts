import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAIMmlrlt_CMZicjhBoSwvnzranTS02Ci8",
  authDomain: "media2017-7361b.firebaseapp.com",
  databaseURL: "https://media2017-7361b.firebaseio.com",
  projectId: "media2017-7361b",
  storageBucket: "media2017-7361b.appspot.com",
  messagingSenderId: "230550399594",
  appId: "1:230550399594:web:fe7221c5bd878c4ec43813"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth: firebase.User, additionalData: any) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName: name, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        name,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log(err)
    }
  }
  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;