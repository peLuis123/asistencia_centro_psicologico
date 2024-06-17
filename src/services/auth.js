import { appFirestore, auth } from "@/services/firebaseInit"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"

export const Auth = {
    registerUser: async (data) => {
        const email = data.email
        const password = data.password
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            return userCredential.user
        } catch (error) {
            throw new Error(error)
        }
    },

    loginUser: async (data) => {
        const email = data.email
        const password = data.password
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return userCredential.user
        } catch (error) {
            throw new Error(error)
        }
    },
    logoutUser: async () => {
        try {
            await signOut(auth)
            return true
        } catch (error) {
            throw new Error(error)
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
