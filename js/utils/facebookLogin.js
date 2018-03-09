import $ from 'jquery';
import * as firebase from 'firebase';
// import { ChatScreen, chatScreenEvents } from '../components/ChatScreen';
import { ChatScreen, chatScreenEvents, online } from '../components/ChatScreen';
import { catImg } from '../utils/cats';

export var facebookProvider = new firebase.auth.FacebookAuthProvider();

export const facebookLogin = () => {
    firebase.auth().signInWithPopup(facebookProvider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        // console.log('user', user);

        // Local Storage only saves strings so use JSON.stringify()
        // localStorage.setItem("session", JSON.stringify({
        //     token: token,
        //     method: 'facebook'
        // }));
        window.user = user;
        
        
        $('#login_screen').fadeOut("slow", function () {
            $('#root').html(ChatScreen(user));
            chatScreenEvents(user, catImg);
            online(user, catImg);
        });
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

        console.log('error', errorMessage);
        alert(errorMessage);
    });
};