"use client";

import Head from 'next/head';

// Components for common header, footer.
import Header from './components/header';
import Footer from './components/footer';

// Components for this home page.
import Intro from './components/home/intro';
import FeaturedProducts from './components/home/featured-products';
import FeaturedCategories from './components/home/featured-categories';
import FAQ from './components/home/faq';

const Home = () => {

  return (
    <>
      <Head>
        <title>Agora BNS - Buy and Sell Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Intro />
      <FeaturedProducts />
      <FeaturedCategories />
      <FAQ />

      <Footer />
    </>
  );
}

export default Home;
