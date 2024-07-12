"use client";
import React, { useState, useEffect } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../_utils/firebase";
import Head from 'next/head';
import Image from 'next/image';
import Header from 'app/_components/header';
import Footer from 'app/_components/footer';

function About() {
  return (
    <>
      <Head>
        <title>About Us | Agora BNS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="mt-24 bg-white">
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center text-blue-950">
          <h1 className="text-4xl font-bold sm:text-5xl transition-all duration-300 hover:text-orange-500">
            About Agora BNS
          </h1>
          <p className="mt-4 text-lg leading-6 text-gray-700">
            Agora BNS is a leading marketplace dedicated to providing the best products across a diverse range of categories.
            Our mission is to empower sellers and provide customers with an exceptional shopping experience. Providing ease to people and reliability is our mission.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="p-4">
                <Image
                  src="/image/reliability.jpg"
                  alt="Reliability"
                  width={200}
                  height={200}
                  quality={100}
                  className="rounded-lg"
                />
              </div>
              <p className="mt-4 text-lg font-medium text-gray-800">Reliability</p>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="p-4">
                <Image
                  src="/image/newtrust.jpg"
                  alt="Trust"
                  width={200}
                  height={200}
                  quality={100}
                  className="rounded-lg"
                />
              </div>
              <p className="mt-4 text-lg font-medium text-gray-800">Trust</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-lg p-3">
                <div className="pt-2">
                  <Image
                    src="/image/honesty1.png"
                    alt="Honesty"
                    width={180}
                    height={180}
                    quality={100}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <p className="mt-4 text-lg font-medium text-gray-800">Honesty</p>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 hover:text-orange-500">Our Philosophy</h2>
            <p className="text-lg leading-6 text-gray-700 mb-16">
              At Agora BNS, we believe in fostering a community where quality and trust are paramount. We strive to create a seamless and enjoyable shopping experience for our customers while empowering our sellers to reach their full potential. Our core values are integrity, innovation, and customer satisfaction.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 hover:text-orange-500">Meet Our Team</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {[
                { name: "Jairo De Guzman", image: "/image/Jairo.jpg" },
                { name: "Dave Luna", image: "/image/Dave.jpg" },
                { name: "HongLei Cui", image: "/image/HongLei.jpeg" },
                { name: "Parth Arora", image: "/image/Parth.png" },
                { name: "Justin James Marquez", image: "/image/Justin.jpg" },
              ].map((member, index) => (
                <div key={index} className="pt-6 transition-transform duration-300 transform hover:scale-105">
                  <div className="flow-root bg-blue-950 rounded-lg px-6 pb-8 mx-auto max-w-xs">
                    <div className="rounded-full p-2 inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg mt-4" style={{ width: '96px', height: '96px' }}>
                      <Image
                        className="rounded-full object-cover"
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        quality={100}
                      />
                    </div>
                    <h3 className="mt-6 text-xl font-medium text-white">{member.name}</h3>
                    <p className="mt-2 text-base text-white">Full-Stack Developer</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;






