"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { useUserAuth } from '../_utils/auth-context';

function LoginPage() {
  const { user, googleSignIn, githubSignIn, emailPasswordSignIn, emailPasswordSignUp } = useUserAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (provider) => {
    if (isLoggingIn) {
      return;
    }
    setIsLoggingIn(true);
    
    try {
      switch (provider) {
        case 'google':
          await googleSignIn();
          break;
        case 'github':
          await githubSignIn();
          break;
        default:
          throw new Error('Unsupported provider');
      }
      // No need to handle setting user here as the redirection will happen in useEffect
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setLoginError('Login canceled: You closed the login window.');
      } else {
        setLoginError('Login failed, please try again.');
      }
      setIsLoggingIn(false);
    }
  };

  const handleEmailPasswordLogin = async (email, password) => {
    if (isLoggingIn) {
      return;
    }
    setIsLoggingIn(true);
    
    try {
      // Try to sign up the user
      await emailPasswordSignUp(email, password);
      // No need to handle setting user here as the redirection will happen in useEffect
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // If email is already in use, try to sign in the user
        try {
          await emailPasswordSignIn(email, password);
          // No need to handle setting user here as the redirection will happen in useEffect
        } catch (signInError) {
          console.error('Sign in error:', signInError);
          setLoginError(`Login failed: ${signInError.code}`);
        }
      } else {
        console.error('Sign up error:', error);
        setLoginError(`Login failed: ${error.code}`);
      }
      setIsLoggingIn(false);
    }
  };
  

  useEffect(() => {
    if (user) {
      // Redirect to a dashboard or another page after login
      window.location.href = '/account'; // Change '/dashboard' to your target URL
    }
  }, [user]); // Depend on user

  return (
    <>
      <Head>
        <title>Login | Agora BNS</title>
      </Head>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-800 to-indigo-700">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-8">Login to Agora BNS</h1>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleLogin('google')}
              disabled={isLoggingIn}
              className={`bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer ${isLoggingIn ? 'opacity-50' : ''}`}
            >
              Login with Google
            </button>

            <button
              onClick={() => handleLogin('github')}
              disabled={isLoggingIn}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${isLoggingIn ? 'opacity-50' : ''}`}
            >
              Login with GitHub
            </button>

            <form onSubmit={(e) => {
              e.preventDefault();
              const { email, password } = e.target.elements;
              handleEmailPasswordLogin(email.value, password.value);
            }} className="flex flex-col gap-2">
              <input type="email" name="email" placeholder="Email" className="p-2" required />
              <input type="password" name="password" placeholder="Password" className="p-2" required />
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Log in or create account
              </button>
            </form>
          </div>

          {loginError && <p className="text-red-500 mt-4">{loginError}</p>}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
