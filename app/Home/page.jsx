"use client"
import React from 'react';
import Link from 'next/link';

const Testing = () => {
  const getRandomPosition = () => {
    const left = Math.floor(Math.random() * 100) + 1; // Random left position between 1 and 100
    const top = Math.floor(Math.random() * 100) + 1; // Random top position between 1 and 100
    return { left: `${left}%`, top: `${top}vh` }; // Use vh units for vertical positioning
  };

  return (
    <div>
      <header className="bg-black py-4 relative">
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          <Link legacyBehavior href="/" passHref>
            <h1 className="pl-16 text-white text-2xl font-bold">SIMPL-AI</h1>
          </Link>
          <nav className="flex space-x-4">
            <Link legacyBehavior href="/about" passHref>
              <a className="text-white pl-16 hover:text-gray-300">Instructions</a>
            </Link>
            <Link legacyBehavior href="/builder" passHref>
              <a className="text-white pl-16 hover:text-gray-300">Network Builder</a>
            </Link>
            <Link legacyBehavior href="/predictions" passHref>
              <a className="text-white pl-16 hover:text-gray-300">Predictions</a>
            </Link>
            <Link legacyBehavior href="/terminal" passHref>
              <a className="text-white pl-16 pr-16 hover:text-gray-300">Terminal</a>
            </Link>
          </nav>
        </div>
      </header>
      <main className="bg-black min-h-screen relative">
        {/* Stars scattered throughout the main section */}
        <div className="absolute w-full flex justify-center pb-128 z-0">
          {[...Array(100)].map((_, index) => (
            <span
              key={index}
              className="text-white text-sm absolute"
              style={getRandomPosition()}
            >
              &#9733;
            </span>
          ))}
        </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 w-full">
        <div className="bg-black bg-opacity-100 pb-36 p-2 text-center w-3/5">
          <h1 className="text-white text-8xl font-bold mb-6">SIMPL-AI</h1>
          <h2 className="text-white text-3xl font-bold mb-4 pb-16">A Neural Network Builder</h2>
          {/* Yellow rectangular textbox with rounded ends */}
          <div className="relative w-full mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                className="block w-full p-4 rounded-full bg-yellow-400 placeholder-gray-700 pr-16"
                placeholder="Make me an artificial neural network that..."
              />
              <Link legacyBehavior href="/builder" passHref>
              <button className="absolute right-0 mr-3 p-2 bg-blue-500 rounded-full text-white">
                Enter
              </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
      </main>
    </div>
  );
};

export default Testing;