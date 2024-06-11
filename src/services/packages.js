import { appFirestore } from '@/services/firebaseInit';
import {
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    collection
} from 'firebase/firestore';

export const Packages = {
    createPackage: async (newPackage) => {
        try {
            const packageRef = await addDoc(collection(appFirestore, 'packages'), newPackage);
            return packageRef.id;
        } catch (error) {
            throw new Error(error);
        }
    },

    getPackageById: async ({ packageId }) => {
        try {
            const packageDoc = await doc(appFirestore, 'packages', packageId).get();
            if (packageDoc.exists()) {
                return { id: packageDoc.id, ...packageDoc.data() };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllPackages: async () => {
        try {
            const packagesCollection = await getDocs(collection(appFirestore, 'packages'));
            const packages = packagesCollection.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            return packages;
        } catch (error) {
            throw new Error(error);
        }
    },

    updatePackageById: async (editedCharge ) => {
        const packageId = editedCharge.id
        console.log(packageId, editedCharge)
        try {
            await updateDoc(doc(appFirestore, 'packages', packageId), editedCharge);
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },

    deletePackageById: async ({ packageId }) => {
        try {
            await deleteDoc(doc(appFirestore, 'packages', packageId));
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },
};
