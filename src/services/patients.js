import { appFirestore } from '@/services/firebaseInit';
import {
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    collection, Timestamp, query, where
} from 'firebase/firestore';

export const Patients = {

    async createPatient(newPatient) {
        try {
            const patientRef = await addDoc(collection(appFirestore, 'patients'), {
                nombres: newPatient.nombres,
                apellidos: newPatient.apellidos,
                dni: newPatient.dni,
                fechaInicio: newPatient.fechaInicio,
                paquete: newPatient.paquete,
            });
            const patientId = patientRef.id
            await Promise.all(
                newPatient.fechas.map(async (fecha) => {
                    await addDoc(collection(patientRef, 'sessiones'), {
                        nombres: newPatient.nombres,
                        apellidos: newPatient.apellidos,
                        dni: newPatient.dni,
                        fechaInicio: newPatient.fechaInicio,
                        paquete: newPatient.paquete,
                        fecha: fecha,
                    });
                })
            );
            return patientId;
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
                const patientData = doc.data();

                if (patientData.fechaInicio instanceof Timestamp) {
                    patientData.fechaInicio = patientData.fechaInicio.toDate();
                }

                return { id: doc.id, ...patientData };
            });
            console.log(patients);
            return patients;
        } catch (error) {
            throw new Error(error);
        }
    },
    async getSessionsForToday() {
        try {
            const patientsCollection = await getDocs(collection(appFirestore, 'patients'));
            const sessionsForToday = [];

            for (const doc of patientsCollection.docs) {
                const patientId = doc.id;
                const sessionsQuery = query(
                    collection(appFirestore, `patients/${patientId}/sessiones`),
                    where('fecha', '>=', new Date(new Date().setHours(0, 0, 0, 0))),
                    where('fecha', '<', new Date(new Date().setHours(24, 0, 0, 0)))
                );

                const sessionsSnapshot = await getDocs(sessionsQuery);

                sessionsSnapshot.forEach((sessionDoc) => {
                    const sessionData = sessionDoc.data();
                    // Convertir Timestamps a objetos Date si existen
                    if (sessionData.entrada instanceof Timestamp) {
                        sessionData.entrada = sessionData.entrada.toDate();
                    }
                    if (sessionData.salida instanceof Timestamp) {
                        sessionData.salida = sessionData.salida.toDate();
                    }
                    sessionsForToday.push({ patientId, sessionId: sessionDoc.id, ...sessionData });
                });
            }

            console.log('Sesiones para hoy:', sessionsForToday);
            return sessionsForToday;
        } catch (error) {
            console.error('Error al obtener sesiones para hoy:', error);
            throw new Error(error);
        }
    },

    saveEntry: async (item) => {
        try {
            const { patientId, sessionId } = item;
            const timestamp = Timestamp.now();
            const data = {
                patientId,
                sessionId,
                entrada: timestamp, 
            };
            const patientRef = doc(appFirestore, 'patients', patientId);
            const sessionRef = doc(patientRef, 'sessiones', sessionId);
            console.log('Session Reference:', sessionRef.path);
            await updateDoc(sessionRef, data);
            console.log('Asistencia registrada correctamente.');
        } catch (error) {
            console.error('Error al registrar asistencia:', error);
            throw new Error(error);
        }
    },
    saveExit: async (item) => {
        try {
            const { patientId, sessionId } = item;
            const timestamp = Timestamp.now();
            const data = {
                patientId,
                sessionId,
                salida: timestamp, 
            };
            const patientRef = doc(appFirestore, 'patients', patientId);
            const sessionRef = doc(patientRef, 'sessiones', sessionId);
            console.log('Session Reference:', sessionRef.path);
            await updateDoc(sessionRef, data);
            console.log('Asistencia registrada correctamente.');
        } catch (error) {
            console.error('Error al registrar asistencia:', error);
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
