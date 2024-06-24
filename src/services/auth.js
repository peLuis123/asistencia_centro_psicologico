import { appFirestore, auth } from "@/services/firebaseInit"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
function generateUserId() {
    const randomNumber = Math.floor(Math.random() * 100000);
    return `user_${randomNumber}`;
}
export const Auth = {
    registerUser: async (data) => {
        const name = data.name
        const email = data.email
        const password = data.password
        const usuario = generateUserId();
        console.log(data)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const uid = userCredential.user.uid
            await setDoc(doc(appFirestore, 'users', uid), {
                name: name,
                email: email,
                usuario: usuario,
                uid: uid 
            });
            return userCredential.user
        } catch (error) {
            throw new Error(error)
        }
    },

    loginUser: async (data) => {
        const email = data.email;
        const password = data.password;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem('token', token);
            return userCredential.user;
        } catch (error) {
            throw new Error(error);
        }
    },
    logoutUser: async () => {
        console.log('test')
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },
    getCurrentUser: () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe()
                resolve(user)
            }, reject)
        })
    }
}
