"use client";

import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../_utils/auth-context'; // Adjust this import path as necessary
import Head from 'next/head';
import Link from 'next/link';

function LoginPage() {
  const { user, gitHubSignIn } = useUserAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (user) {
      // Redirect to a dashboard or another page after login
      window.location.href = '/account'; // Change '/dashboard' to your target URL
    }
  }, [user]); // Depend on user

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await gitHubSignIn();
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

  return (
    <>
      <Head>
        <title>Login | Agora BNS</title>
      </Head>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-800 to-indigo-700">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-8">Login to Agora BNS</h1>
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${isLoggingIn ? 'opacity-50' : ''}`}
          >
            Login with GitHub
          </button>
          {loginError && <p className="text-red-500 mt-4">{loginError}</p>}
          <p className="text-white mt-4">
            Need an account? <Link href="https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home" className="text-blue-200 hover:text-blue-400">Register here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
