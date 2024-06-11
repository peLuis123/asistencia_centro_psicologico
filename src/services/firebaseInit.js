import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA67zj5_QBiAlEUUTr7oOeavAdmEQ0j9wU",
    authDomain: "ontrack-v2-test.firebaseapp.com",
    databaseURL: "https://ontrack-v2-test-default-rtdb.firebaseio.com",
    projectId: "ontrack-v2-test",
    storageBucket: "ontrack-v2-test.appspot.com",
    messagingSenderId: "684789730077",
    appId: "1:684789730077:web:0a7a0d189cf7e988526ff4",
    measurementId: "G-YQ9BF2Y398"
};

const app = initializeApp(firebaseConfig);

const appFirestore = getFirestore(app);

const auth = getAuth(app);

export { appFirestore, auth };
