"use client";

import Head from 'next/head';
import Header from './components/header';
import Footer from './components/footer';

// Components for this landing page.
import Intro from './components/landing/intro';
import Featured from './components/landing/featured';
import Testimonials from './components/landing/testimonials';
import FAQ from './components/landing/faq';

const Home = () => {
  // Sign in to Firebase with authentication
  const handleSignIn = () => {
    // Redirect to the login page.
    window.location.href = '/login';
  };
  return (
    <>
      <Head>
        <title>Agora BNS - Buy and Sell Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Intro />
      <Featured />
      <Testimonials />
      <FAQ />
      <Footer />


      {/* <main>
        <div className="bg-gradient-to-r from-purple-800 to-indigo-700 flex flex-col justify-center items-center text-center py-16 lg:py-32">
          <div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Discover Amazing Products
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-xl text-indigo-200">
              Sign In Required to view products in the Agora-BNS Marketplace.
            </p>
            <div className="mt-10">
              <button
                onClick={handleSignIn}
                className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg text-base font-medium hover:bg-indigo-700"
              >
                Sign In to View Products
              </button>
            </div>
          </div>
        </div>
      </main> */}
      
    </>
  );
}

export default Home;