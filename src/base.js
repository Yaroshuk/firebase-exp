import firebase from "firebase";
import config from './firebaseConfig';

const app = firebase.initializeApp(config);

export default app;