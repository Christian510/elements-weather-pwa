import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import axios from '../api/client';

const AuthContext = createContext(null);

export async function linkSession(firebaseUser) {
  try {
    const idToken = await firebaseUser.getIdToken();
    await axios.post('/auth/link-session', { idToken });
  } catch (err) {
    console.error('Failed to link session:', err);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await linkSession(firebaseUser);
      }
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) { setProfile(null); return; }
    getDoc(doc(db, 'users', user.uid))
      .then((snap) => setProfile(snap.exists() ? snap.data() : {}))
      .catch((err) => console.error('Failed to load profile:', err));
  }, [user]);

  const saveProfile = async (data) => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), data, { merge: true });
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const signOut = async () => {
    await axios.post('/auth/logout').catch(() => {});
    return firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signInWithGoogle, signOut, saveProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
