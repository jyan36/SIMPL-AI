import React from 'react'
import Link from 'next/link';

const Testing = () => {

  return (
    <div>
       <header className="bg-black py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link legacyBehavior href="/" passHref>
        <h1 className="pl-16 text-white text-2xl font-bold">NEW-AI</h1>
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
      <main className="bg-black min-h-screen">
        <h1></h1>
      </main>
    </div>
  )
}

export default Testing