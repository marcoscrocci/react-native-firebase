/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import firebase from 'firebase';

AppRegistry.registerComponent(appName, () => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyDbfpMqLlhUF0sRXR2Io8lAY1TVRD14jGs",
        authDomain: "reactnativefirebase-2c742.firebaseapp.com",
        projectId: "reactnativefirebase-2c742",
        storageBucket: "reactnativefirebase-2c742.appspot.com",
        messagingSenderId: "900236298764",
        appId: "1:900236298764:web:ed27142fa66c4460e77c29",
        measurementId: "G-CGW0ZFJ8K9"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();

    return App
});
