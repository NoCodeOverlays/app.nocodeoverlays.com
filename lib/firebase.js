import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

async function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }
}

const apiFunctions = {
  getUser: () => {
    return firebase.auth().currentUser;
  },
  signIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signOut: async () => {
    return firebase.auth().signOut();
  },
  getOverlayData: async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      return;
    }

    return firebase
      .database()
      .ref(`/overlays/${currentUser.uid}`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        const { widgets = [] } = data;

        data.widgets = Object.entries(widgets)
          .map(([id, value]) => ({ ...value, id }))
          .sort((a, b) => (a.position < b.position ? -1 : 1));

        return data;
      });
  },
  updateOverlayWidth: async (width) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      return;
    }

    return firebase
      .database()
      .ref(`/overlays/${currentUser.uid}`)
      .update({ width });
  },
  updateOverlayHeight: async (height) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      return;
    }

    return firebase
      .database()
      .ref(`/overlays/${currentUser.uid}`)
      .update({ height });
  },
  deleteWidget: async (widget) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      return;
    }

    return firebase
      .database()
      .ref(`/overlays/${currentUser.uid}/widgets/${widget.id}`)
      .remove();
  },
  createOverlayWidget: async (attributes) => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      return;
    }

    const newWidgetKey = firebase
      .database()
      .ref(`/overlays/${currentUser.uid}/widgets`)
      .push({ ...attributes }).key;

    return { ...attributes, id: newWidgetKey };
  },
  onAuthStateChanged: (callback) => {
    return firebase.auth().onAuthStateChanged(callback);
  },
};

export function firebaseAPI(functionName, ...functionArgs) {
  initFirebase();

  return apiFunctions[functionName](...functionArgs);
}
