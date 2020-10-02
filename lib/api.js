import firebase from "firebase/app";
import "firebase/auth";

function initFirebase() {
  if (!firebase.apps.length) {
    console.log("process.env", process.env);
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

  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function signOut() {
  initFirebase();

  return firebase.auth().signOut();
}
