import $ from 'jquery';
import * as firebase from 'firebase';
import { googleLogin } from '../utils/googleLogin';
import { facebookLogin } from '../utils/facebookLogin';
import { LoginScreen, LoginScreenEvents } from './LoginScreen';
import { validatePassword, validateEmail } from '../utils/validation';


export const SignUpScreen = () => {
    let container = document.createElement('div');

    $(container).html(`
    
    <div id="signup_screen" class="signup-container">
    
    <div>
        <span id="back_to_login" class="ion-arrow-left-c back-icon"></span>
    </div>


        <div class="icon-container">
            <span class="ion-ios-compose icon"></span>
            <h1 class="title">Sign Up!</h1>
    </div>

    <div class="inputs-container">
        <div class="input-container">
            <div class="input-title">Email:</div>
            <div class="input-wrapper">
                <input id="email" class="input" type="text">
            </div>
        </div>

        <div class="input-container">
            <div class="input-title">Password:</div>
            <div class="input-wrapper"></div>
            <input id="password" class="input" type="password">
        </div>
    </div>

    <div class="btn-container">
        <div id="create_btn" class="btn signUp">Create</div>
    </div>
</div>
    `);

    return container;
};

export const signUpScreenEvents = () => {

    $('#root').on('click', '#back_to_login', function(){
      $('#signup_screen').fadeOut("slow", function () {
        $('#root').html(LoginScreen());
      });
    });
  
    $('#root').on('click', '#create_btn', function(){
      let email = $('#email').val();
      let password = $('#password').val();
  
      if (validateEmail(email) && validatePassword(password)){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (result) {
          $('#signup_screen').fadeOut("slow", function () {
            $('#root').html(LoginScreen());
          });
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
  
          console.log('error message', errorMessage);
        });
      }
      else {
        alert('Please insert valid email and password');
      }
    });
  }