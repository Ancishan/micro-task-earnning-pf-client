import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import axios from 'axios';
import { app } from '../firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send verification email after account creation
    await verifyEmail();
    return userCredential;
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    // Check if the email is verified
    if (!user.emailVerified) {
      await signOut(auth); // Sign out if email is not verified
      throw new Error('Your email is not verified. Please verify your email to log in.');
    }
    return result;
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = email => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setLoading(true);
    await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      withCredentials: true,
    });
    return signOut(auth);
  };

  const updateUserProfile = async (name, photoURL) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      setUser(auth.currentUser); // Update the user state with new info
    }
  };

  const getToken = async email => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    return data;
  };

  // Function to send email verification
  const verifyEmail = () => {
    if (auth.currentUser) {
      return sendEmailVerification(auth.currentUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        getToken(currentUser.email);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser, // Ensure setUser is included in the context
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    verifyEmail, // Expose verifyEmail function
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
