import $ from 'jquery';
import * as firebase from 'firebase';
import { ChatScreen, chatScreenEvents } from '../components/ChatScreen';
import { rdmCat } from '../utils/cats';
import { validatePassword, validateEmail } from '../utils/validation';


export const emailPasswordLogin = () => {
    let email = $('#email').val();
    let password = $('#password').val();

    if (validateEmail(email) && validatePassword(password)) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result;

                // localStorage.setItem("session", JSON.stringify({
                //   token: token,
                //   method: 'google'
                // }));

                // console.log('user ', user);

                // Random Cat photo url
                const catImg = rdmCat();
                $('#login_screen').fadeOut("slow", function () {
                    $('#root').html(ChatScreen(user));
                    chatScreenEvents(user, catImg);
                });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log('error message ', errorMessage);

                alert('no user found with those credentials');
            });
    }
    else {
        alert('Please insert valid email and password');
    }
};

export var googleProvider = new firebase.auth.GoogleAuthProvider();

export const googleLogin = () => {
    firebase.auth().signInWithPopup(googleProvider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        // console.log('user', user);

        // Local Storage only saves strings so use JSON.stringify()
        // localStorage.setItem("session", JSON.stringify({
        //     token: token,
        //     method: 'google'
        // }));

        // Random Cat photo url
        const catImg = rdmCat();
        $('#login_screen').fadeOut("slow", function () {
            $('#root').html(ChatScreen(user));
            chatScreenEvents(user, catImg);            
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
    });
};

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

        // Random Cat photo url
        const catImg = rdmCat();
        $('#login_screen').fadeOut("slow", function () {
            $('#root').html(ChatScreen(user));
            chatScreenEvents(user, catImg);
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

        // console.log('error', errorMessage);
        alert(errorMessage);
    });
};