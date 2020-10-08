import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
}

export async function getUser() {
  initFirebase();

  return firebase.auth().currentUser;
}

export async function signIn(email, password) {
  initFirebase();

  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    });
}

export async function signOut() {
  initFirebase();

  return firebase.auth().signOut();
}

export async function getOverlayData() {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return;
  }

  return firebase
    .database()
    .ref(`/overlays/${currentUser.uid}`)
    .once("value")
    .then((snapshot) => {
      return snapshot.val();
    });
}

export async function updateOverlayData(data) {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return;
  }

  return firebase.database().ref(`/overlays/${currentUser.uid}`).update(data);
}
