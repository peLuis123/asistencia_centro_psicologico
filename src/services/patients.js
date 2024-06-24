import { appFirestore } from '@/services/firebaseInit';
import {
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    collection 
} from 'firebase/firestore';

export const Patients = {
    createPatient: async (newPatient) => {
        try {
            const patientRef = await addDoc(collection(appFirestore, 'patients'), newPatient);
            return patientRef.id;
        } catch (error) {
            throw new Error(error);
        }
    },

    addFechaInicio: async (patientId, fecha) => {
        try {
            const fechaDoc = { fecha: fecha };
            await addDoc(collection(appFirestore, `patients/${patientId}/fechasInicio`), fechaDoc);
        } catch (error) {
            throw new Error(error);
        }
    },

    getPatientById: async ({ patientId }) => {
        try {
            const patientDoc = await doc(appFirestore, 'patients', patientId).get();
            if (patientDoc.exists()) {
                return { id: patientDoc.id, ...patientDoc.data() };
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllPatients: async () => {
        try {
            const patientsCollection = await getDocs(collection(appFirestore, 'patients'));
            const patients = patientsCollection.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            console.log(patients)
            return patients;
        } catch (error) {
            throw new Error(error);
        }
    },

    updatePatientById: async (editedPatient) => {
        console.log(editedPatient)
        const patientId = editedPatient.id
        try {
            await updateDoc(doc(appFirestore, 'patients', patientId), editedPatient);
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },

    deletePatientById: async ({ patientId }) => {
        try {
            await deleteDoc(doc(appFirestore, 'patients', patientId));
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },
};
