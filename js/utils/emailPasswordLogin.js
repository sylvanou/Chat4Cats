import $ from 'jquery';
import * as firebase from 'firebase';
// import { ChatScreen, chatScreenEvents } from '../components/ChatScreen';
import { ChatScreen, chatScreenEvents, online } from '../components/ChatScreen';
import { catImg } from '../utils/cats';
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

                window.user = user;
                
                // console.log('user ', user);
                
                // Random Cat photo url
                // const catImg = rdmCat();
                $('#login_screen').fadeOut("slow", function () {
                    $('#root').html(ChatScreen(user));
                    chatScreenEvents(user, catImg);
                    online(user, catImg);
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