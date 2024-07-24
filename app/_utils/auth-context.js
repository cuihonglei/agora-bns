"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";
import { updateUserPhoto } from "../_services/user-service"; // updates the user photo in Firestore

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleSignIn = async (signInFunction) => {
    const result = await signInFunction();
    const user = result.user;
    if (user && user.photoURL) {
      await updateUserPhoto(user.uid, user.photoURL);
    }
    setUser(user); // Update user state after setting the photo
  };

  const googleSignIn = () => handleSignIn(() => signInWithPopup(auth, new GoogleAuthProvider()));
  const microsoftSignIn = () => handleSignIn(() => signInWithPopup(auth, new OAuthProvider('microsoft.com')));
  const githubSignIn = () => handleSignIn(() => signInWithPopup(auth, new GithubAuthProvider()));
  const facebookSignIn = () => handleSignIn(() => signInWithPopup(auth, new FacebookAuthProvider()));
  const twitterSignIn = () => handleSignIn(() => signInWithPopup(auth, new TwitterAuthProvider()));

  const firebaseSignOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, microsoftSignIn, githubSignIn, twitterSignIn, facebookSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
