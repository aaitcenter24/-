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

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const syncUserProfile = async (user: any, selectedCountry?: string) => {
  const userPath = `users/${user.uid}`;
  try {
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
        plan: 'free',
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
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userPath);
  }
};

export const getUserProfile = async (uid: string) => {
  const path = `users/${uid}`;
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
};

export const updateUserProfile = async (uid: string, data: {
  displayName?: string;
  maritalStatus?: string;
  notificationLanguage?: string;
  country?: string;
  emailNotificationsEnabled?: boolean;
  plan?: 'free' | 'pro';
}) => {
  const path = `users/${uid}`;
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
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
  heirNames?: Record<string, string[]>;
  assets: { land: number; money: number; gold: number; silver: number };
  country: string;
  madhhab?: string;
}) => {
  const path = `users/${userId}/calculations`;
  try {
    const calcRef = collection(db, 'users', userId, 'calculations');
    const docRef = await addDoc(calcRef, {
      ...data,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const getCalculations = async (userId: string) => {
  const path = `users/${userId}/calculations`;
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
    handleFirestoreError(error, OperationType.LIST, path);
  }
};

export const deleteCalculation = async (userId: string, calculationId: string) => {
  const path = `users/${userId}/calculations/${calculationId}`;
  try {
    const docRef = doc(db, 'users', userId, 'calculations', calculationId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const submitFeedback = async (data: {
  uid: string;
  email?: string;
  type: 'discrepancy' | 'suggestion' | 'other';
  message: string;
}) => {
  const path = 'feedback';
  try {
    const feedbackRef = collection(db, 'feedback');
    await addDoc(feedbackRef, {
      ...data,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};
