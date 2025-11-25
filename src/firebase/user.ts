import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export async function getUserProfileByUid(uid: string) {
    if (!uid) return null;
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            return userDoc.data();
        }
        return null;
    } catch (err) {
        return null;
    }
}

export async function saveUserRegistration({ uid, name, email, phone, invitedByUid }: {
    uid: string;
    name: string;
    email: string;
    phone: string;
    invitedByUid?: string;
}) {
    const userData = {
        name,
        email,
        phone,
        invitedByUid,
        createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, "users", uid), userData);
    return true;
}
