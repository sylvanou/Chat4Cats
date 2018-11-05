import $ from "jquery";
import * as firebase from 'firebase';
import { config , firebaseInit } from './utils/firebase';
import { ChatScreen, chatScreenEvents, online } from './components/ChatScreen';
import { LoginScreen, loginScreenEvents } from './components/LoginScreen';
import { catImg } from '../js/utils/cats';

firebaseInit(config);
export let db = firebase.database();
export let messages = db.ref('message/');
export let users = db.ref('users');

firebase.auth().onAuthStateChanged(function(user) {
    window.user = user;
    // const catImg = rdmCat();
    
    if (user) {
        $('#root').html(ChatScreen(user));
        chatScreenEvents(user, catImg); 
        online(user, catImg);
    }
    else {
        $('#root').append(LoginScreen());
            loginScreenEvents();
    }
})