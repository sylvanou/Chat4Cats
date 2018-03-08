import firebase from "firebase";
// Initialize Firebase
export var config = {
    apiKey: "AIzaSyAzWqDf9xB4ihIXgq-0AUz-HZUMAsGJoU4",
    authDomain: "fir-chat-f2bc5.firebaseapp.com",
    databaseURL: "https://fir-chat-f2bc5.firebaseio.com",
    projectId: "fir-chat-f2bc5",
    storageBucket: "fir-chat-f2bc5.appspot.com",
    messagingSenderId: "248820194533"
};
export const firebaseInit = () => firebase.initializeApp(config);
// export const db = firebase.database();
// export const messages = db.ref('message/');

