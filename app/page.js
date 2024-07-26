"use client";

import Head from 'next/head';

// Components for common header, footer.
import Header from './_components/header';
import Footer from './_components/footer';

// Components for this home page.
import Intro from './_components/home/intro';
import FeaturedProducts from './_components/home/featured-products';
import FeaturedCategories from './_components/home/featured-categories';
import FAQ from './_components/home/faq';

const Home = () => {

  return (
    <>
      <Head>
        <title>Agora BNS - Buy and Sell Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="min-h-[calc(100vh-8rem)]">
        <Intro />
        <FeaturedProducts />
        <FeaturedCategories />
        <FAQ />
      </div>

      <Footer />
    </>
  );
}

export default Home;
