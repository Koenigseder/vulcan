import firebase from "firebase";

const firebaseConfig = {
  // replace with real config
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app === firebase.app();
}

const auth = firebase.auth();

export { auth };

export const database = firebase.firestore();
