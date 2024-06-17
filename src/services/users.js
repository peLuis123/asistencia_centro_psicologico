import { appFirestore } from '@/services/firebaseInit';
import {
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    collection,
    deleteDoc,
    updateDoc,
    getDocs
} from 'firebase/firestore';
export const Users = {
    createUser: async (newUser ) => {
        try {
            console.log(newUser)
            const userRef = await addDoc(collection(appFirestore, 'users'), newUser);
            return userRef.id;
        } catch (error) {
            throw new Error(error);
        }
    },

    getUserById: async ({ userId }) => {
        try {
            const userDoc = await doc(appFirestore, 'users', userId).get();
            if (userDoc.exists()) {
                return { id: userDoc.id, ...userDoc.data() };
            } else {
                return null; 
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllUsers: async () => {
        try {
            const usersCollection = await getDocs(collection(appFirestore, 'users'));
            const users = usersCollection.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },

    updateUserById: async ({ data }) => {
        const userId = data.id
        console.log(userId,data)
        try {
            
            await updateDoc(doc(appFirestore, 'users', userId), data);
            return true; 
        } catch (error) {
            throw new Error(error);
        }
    },

    deleteUserById: async ({ userId }) => {
        console.log(userId)
        try {
            await deleteDoc(doc(appFirestore, 'users', userId));
            return true; 
        } catch (error) {
            throw new Error(error);
        }
    }
};
