import $ from "jquery";
import * as firebase from 'firebase';
import { config , firebaseInit } from './utils/firebase';
import { ChatScreen, chatScreenEvents } from './components/ChatScreen';
// import { googleLogin } from './utils/googleLogin';
import { createLocal } from './utils/createLocalStorage';
import { SignUpScreen, signUpScreenEvents } from './components/SignUpScreen';
import { LoginScreen, loginScreenEvents } from './components/LoginScreen';
// import { rdmCat} from '../js/utils/cats';

firebaseInit(config);
export const db = firebase.database();
export const messages = db.ref('message/');

firebase.auth().onAuthStateChanged(function(user) {
    window.user = user;

    if (user) {
        $('#root').html(ChatScreen(user));
            chatScreenEvents(user); 
    }
    else {
        $('#root').append(LoginScreen());
            loginScreenEvents();
    }
})