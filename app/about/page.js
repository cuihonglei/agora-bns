"use client";

import Head from 'next/head';
import Image from 'next/image';
import Header from 'app/components/header';
import Footer from 'app/components/footer';

function About() {

  return (
    <>
      <Head>
        <title>About Us | Agora BNS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="mt-24 bg-white">
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About Agora BNS
          </h1>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Agora BNS is a leading marketplace dedicated to providing the best products across a diverse range of categories.
            Our mission is to empower sellers and provide customers with an exceptional shopping experience.
          </p>

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-100 rounded-lg px-6 pb-8">
                  <div className="rounded-full p-2 inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg">
                    <Image
                      className="rounded-full"
                      src="/image/Jairo.jpg"
                      alt="Jairo De Guzman"
                      width={96}
                      height={96}
                      quality={100}
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">Jairo De Guzman</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Full-Stack Developer
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-100 rounded-lg px-6 pb-8">
                  <div className="rounded-full p-2 inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg">
                    <Image
                      className="rounded-full"
                      src="/image/Dave.jpg"
                      alt="Dave Luna"
                      width={96}
                      height={96}
                      quality={100}
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">Dave Luna</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Full-Stack Developer
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-100 rounded-lg px-6 pb-8">
                  <div className="rounded-full p-2 inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg">
                    <Image
                      className="rounded-full"
                      src="/image/Justin.jpg"
                      alt="Justin James Marquez"
                      width={96}
                      height={96}
                      quality={100}
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">Justin James Marquez</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Full-Stack Developer
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;