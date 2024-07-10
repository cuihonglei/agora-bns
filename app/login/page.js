"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '../_utils/auth-context';

// Components for common header, footer.
import Header from '../_components/header';
import Footer from '../_components/footer';

// Login Image.
import loginImage from '../_assets/images/login-image.png';

// Sign In Icons.
import googleIcon from '../_assets/icons/signin-google.png';
import microsoftIcon from '../_assets/icons/signin-microsoft.png';
import githubIcon from '../_assets/icons/signin-github.png';
import facebookIcon from '../_assets/icons/signin-facebook.png';
import twitterIcon from '../_assets/icons/signin-twitter.png';


// Sign In Button
function SignInButton({ icon, text, onClick, isLoggingIn }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoggingIn}
      className="min-w-72 bg-white hover:bg-[#FF8811] text-black p-4 rounded-lg flex justify-center items-center"
    >
      <Image src={icon} alt="" width={24} height={24} className="mr-4" /> {text}
    </button>
  )
}

// Sign In Page
function LoginPage() {

  const router = useRouter();

  const { user, googleSignIn, microsoftSignIn, githubSignIn, facebookSignIn, twitterSignIn } = useUserAuth();

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
        case 'microsoft':
          await microsoftSignIn();
          break;
        case 'github':
          await githubSignIn();
          break;
        case 'facebook':
          await facebookSignIn();
          break;
        case 'twitter':
          await twitterSignIn();
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

  useEffect(() => {
    if (user) {
      // Redirect to the home page.
      router.push('/');
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Login | Agora BNS</title>
      </Head>

      <Header />

      <div className="flex flex-col justify-center items-center bg-[#392F5A] text-white py-36">
        {/* Title */}
        <p className="text-5xl font-extrabold leading-tight">Sign In to Agora BNS</p>
        <p className="text-lg font-semibold leading-6 mt-4">Explore the best products from various categories all in one place.</p>

        {loginError && <p className="text-red-500 mt-4">{loginError}</p>}

        <div className="flex flex-row items-center my-24 gap-44">

          {/* Left Image */}
          <Image src={loginImage} alt="Sign In Image" width={320} height={320} />

          {/* Right Buttons */}
          <div className="flex flex-col justify-center gap-4">
            <SignInButton icon={googleIcon} text="Sign in with Google" onClick={() => handleLogin('google')} isLoggingIn={isLoggingIn} />
            <SignInButton icon={microsoftIcon} text="Sign in with Microsoft" onClick={() => handleLogin('microsoft')} isLoggingIn={isLoggingIn} />
            <SignInButton icon={githubIcon} text="Sign in with Github" onClick={() => handleLogin('github')} isLoggingIn={isLoggingIn} />
            <SignInButton icon={facebookIcon} text="Sign in with Facebook" onClick={() => handleLogin('facebook')} isLoggingIn={isLoggingIn} />
            <SignInButton icon={twitterIcon} text="Sign in with Twitter" onClick={() => handleLogin('twitter')} isLoggingIn={isLoggingIn} />
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default LoginPage;
