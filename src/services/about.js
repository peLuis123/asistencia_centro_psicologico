import { appFirestore } from '@/services/firebaseInit';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';

export const About = {
    async saveAbout(aboutData) {
        try {
            console.log(aboutData)
            const docRef = await addDoc(collection(appFirestore, 'about'), aboutData);
            return docRef.id;
        } catch (error) {
            throw new Error('Error al guardar los datos about:', error);
        }
    },



    getAboutById: async (userId) => {
        console.log(userId); // Asegúrate de que userId sea el ID correcto del usuario
        try {
            const aboutDoc = await  getDoc(doc(appFirestore, 'about', userId))
            
            if (aboutDoc.exists()) {
                return { id: aboutDoc.id, ...aboutDoc.data() };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    },
    

    updateAboutById: async (data, userId) => {
        try {
            await updateDoc(doc(appFirestore, 'about', userId), data);
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },
};
