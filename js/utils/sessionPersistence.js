import * as firebase from 'firebase';

export function sessionPersistence(callback) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {

            return callback();
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}