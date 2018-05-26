import * as firebase from 'firebase';
import firebaseAPIKey from '../secrets/APISecrets'

const config = {
    apiKey: firebaseAPIKey,
    authDomain: "final-pick-up84.firebaseapp.com",
    databaseURL: "https://final-pick-up84.firebaseio.com",
    projectId: "final-pick-up84",
    storageBucket: "final-pick-up84.appspot.com",
    messagingSenderId: "566831377066"}

firebase.initializeApp(config)
const database = firebase.database();

export { firebase, database as default };
