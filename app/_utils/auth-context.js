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
import { checkAndUpdateUserNamePhoto } from "../_services/user-service"; // updates the user photo in Firestore

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());
  const microsoftSignIn = () => signInWithPopup(auth, new OAuthProvider('microsoft.com'));
  const githubSignIn = () => signInWithPopup(auth, new GithubAuthProvider());
  const facebookSignIn = () => signInWithPopup(auth, new FacebookAuthProvider());
  const twitterSignIn = () => signInWithPopup(auth, new TwitterAuthProvider());

  const firebaseSignOut = () => signOut(auth);

  useEffect(() => {

    function getFirstAndLastName(fullName) {
      // Split the full name by spaces
      const nameParts = fullName.trim().split(' ');
    
      // If there is only one part, consider it as the first name and leave the last name empty
      if (nameParts.length === 1) {
        return { firstName: nameParts[0], lastName: '' };
      }
    
      // Extract the first name and last name
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' '); // Join the remaining parts as the last name
    
      return { firstName, lastName };
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      // Check and update the user's name and photoURL.
      if (currentUser) {
        const { firstName, lastName } = getFirstAndLastName(currentUser.displayName); 
        checkAndUpdateUserNamePhoto(currentUser.uid, firstName, lastName, currentUser.photoURL || "");
      }

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

export const useUserAuth = () => {
  return useContext(AuthContext);
};
