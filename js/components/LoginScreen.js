import $ from 'jquery';
import { facebookLogin } from '../utils/facebookLogin';
import { googleLogin } from '../utils/googleLogin';
import { emailPasswordLogin} from '../utils/emailPasswordLogin';
import { sessionPersistence } from '../utils/sessionPersistence';
import { SignUpScreen, signUpScreenEvents } from './SignUpScreen';

export const LoginScreen = () => {
    let container = document.createElement('div');

    $(container).html(`
    <div id="login_screen" class="login-container">
        <div class="icon-container">
            <span class="ion-social-octocat"></span>
            <h1 class="title">Chat 4 Cats</h1>
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
                <div class="input-wrapper">
                    <input id="password" class="input" type="password">
                </div>
            </div>
        </div>

        <div class="icons-container" id="icons_container">
            <div id="google_icon" class="icon_hover"></div>
            <div id="facebook_icon" class="icon_hover"></div>
        </div>

        <div class="btn-container">
            <div id="signin_btn" class="btn signIn">SIGN-IN</div>
            <div id="signup_btn" class="btn signUp">SIGN-UP</div>
        </div>
    </div>
        `);

    return container;
};

export const loginScreenEvents = () => {
    $('#root').on('click', '#google_icon', () => sessionPersistence(googleLogin));
    $('#root').on('click', '#facebook_icon', () => sessionPersistence(facebookLogin));
    $('#root').on('click', '#signin_btn', () => sessionPersistence(emailPasswordLogin));

    $('#root').on('click', '#signup_btn', function () {
        $('#login_screen').fadeOut("slow", function () {
            $('#root').html(SignUpScreen());
            signUpScreenEvents();
        });
    });

}