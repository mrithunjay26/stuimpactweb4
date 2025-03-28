import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAufZ5KMynX-Qa-7DMre-7X5fVFxj44I2M",
    authDomain: "essayprompts-91953.firebaseapp.com",
    projectId: "essayprompts-91953",
    storageBucket: "essayprompts-91953.appspot.com",
    messagingSenderId: "265491871139",
    appId: "1:265491871139:web:349a2f5ba1fa44ef451616",
    measurementId: "G-D6SJM0724C"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);