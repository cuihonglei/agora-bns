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

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const microsoftSignIn = () => {
    return signInWithPopup(auth,  new OAuthProvider('microsoft.com'));
  }

  const githubSignIn = () => {
    return signInWithPopup(auth, new GithubAuthProvider());
  };

  const facebookSignIn = () => {
    return signInWithPopup(auth, new FacebookAuthProvider());
  }

  const twitterSignIn = () => {
    return signInWithPopup(auth, new TwitterAuthProvider());
  }

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // TODO Unlike other providers supported by Firebase Auth, 
      // Microsoft does not provide a photo URL and instead, 
      // the binary data for a profile photo has to be requested via Microsoft Graph API.
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []); // Remove user from dependency array

  return (
    <AuthContext.Provider value={{ user, googleSignIn, microsoftSignIn, githubSignIn, twitterSignIn, facebookSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []); // Dependency array is empty to run effect only once on mount

  return user;
};


