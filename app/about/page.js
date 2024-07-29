"use client";

import React from "react";
import Head from 'next/head';
import Image from 'next/image';

import Header from '../_components/header';
import Footer from '../_components/footer';

import ReliabilityImage from '../_assets/images/reliability.jpg';
import TrustImage from '../_assets/images/newtrust.jpg';
import HonestyImage from '../_assets/images/honesty1.png';

import DaveImage from '../_assets/images/Dave.jpg';
import HongleiImage from '../_assets/images/HongLei.jpeg';
import JairoImage from '../_assets/images/Jairo.jpg';
import JustinImage from '../_assets/images/Justin.jpg';
import ParthImage from '../_assets/images/Parth.png';


function About() {
  return (
    <>
      <Head>
        <title>About Us | Agora BNS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="bg-white">
        <div className="max-w-6xl min-h-[calc(100vh-8rem)] mx-auto text-center py-24">

          {/* About */}
          <h1 className="text-4xl font-bold">About Agora BNS</h1>
          <p className="mt-4 text-lg leading-6">
            Agora BNS is a leading marketplace dedicated to providing the best products across a diverse range of categories.
            Our mission is to empower sellers and provide customers with an exceptional shopping experience. Providing ease to people and reliability is our mission.
          </p>

          {/* Icons */}
          <div className="mt-8 grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="p-4">
                <Image
                  src={ReliabilityImage}
                  alt="Reliability"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <p className="mt-4 text-lg font-medium">Reliability</p>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="p-4">
                <Image
                  src={TrustImage}
                  alt="Trust"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <p className="mt-4 text-lg font-medium">Trust</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-lg p-3">
                <div className="pt-2">
                  <Image
                    src={HonestyImage}
                    alt="Honesty"
                    width={180}
                    height={180}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <p className="mt-4 text-lg font-medium">Honesty</p>
            </div>
          </div>

          {/* Philosophy */}
          <section className="mt-16">
            <h2 className="text-4xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-lg leading-6 text-gray-700 mb-16">
              At Agora BNS, we believe in fostering a community where quality and trust are paramount. We strive to create a seamless and enjoyable shopping experience for our customers while empowering our sellers to reach their full potential. Our core values are integrity, innovation, and customer satisfaction.
            </p>
          </section>

          {/* Team */}
          <section className="mt-16">
            <h2 className="text-4xl font-bold mb-8">Meet Our Team</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {[
                { name: "Jairo De Guzman", image: JairoImage },
                { name: "Dave Luna", image: DaveImage },
                { name: "HongLei Cui", image: HongleiImage },
                { name: "Parth Arora", image: ParthImage },
                { name: "Justin James Marquez", image: JustinImage },
              ].map((member, index) => (
                <div key={index} className="pt-6 hover:scale-105">
                  <div className="flow-root bg-blue-950 rounded-lg px-6 pb-8 mx-auto max-w-xs">
                    <div className="w-28 h-28 rounded-full p-2 inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg mt-4">
                      <Image
                        className="rounded-full w-full h-full object-cover"
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
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
      </div>

      <Footer />
    </>
  );
}

export default About;
