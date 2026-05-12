import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Test connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

export const syncUserProfile = async (user: any, selectedCountry?: string) => {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    // New user, must have country
    if (!selectedCountry) return null;
    const profile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      country: selectedCountry,
      lastLogin: serverTimestamp(),
      createdAt: serverTimestamp(),
    };
    await setDoc(userRef, profile);
    return profile;
  } else {
    // Existing user
    const existingData = userDoc.data();
    const updateData: any = { lastLogin: serverTimestamp() };
    if (selectedCountry) updateData.country = selectedCountry;
    await setDoc(userRef, updateData, { merge: true });
    return { ...existingData, ...updateData };
  }
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
};

export const updateUserProfile = async (uid: string, data: {
  displayName?: string;
  maritalStatus?: string;
  notificationLanguage?: string;
  country?: string;
  emailNotificationsEnabled?: boolean;
}) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Update profile failed:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const saveCalculation = async (userId: string, data: {
  deceasedName?: string;
  heirs: Record<string, number>;
  assets: { land: number; money: number; gold: number; silver: number };
  country: string;
  madhhab?: string;
}) => {
  try {
    const calcRef = collection(db, 'users', userId, 'calculations');
    const docRef = await addDoc(calcRef, {
      ...data,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Save calculation failed:", error);
    throw error;
  }
};

export const getCalculations = async (userId: string) => {
  try {
    const calcRef = collection(db, 'users', userId, 'calculations');
    const q = query(calcRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: (doc.data().timestamp as Timestamp)?.toDate()
    }));
  } catch (error) {
    console.error("Fetch calculations failed:", error);
    throw error;
  }
};

export const deleteCalculation = async (userId: string, calculationId: string) => {
  try {
    const docRef = doc(db, 'users', userId, 'calculations', calculationId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Delete calculation failed:", error);
    throw error;
  }
};

export const submitFeedback = async (data: {
  uid: string;
  email?: string;
  type: 'discrepancy' | 'suggestion' | 'other';
  message: string;
}) => {
  try {
    const feedbackRef = collection(db, 'feedback');
    await addDoc(feedbackRef, {
      ...data,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Submit feedback failed:", error);
    throw error;
  }
};
