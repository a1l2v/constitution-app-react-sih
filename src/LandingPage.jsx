import React from 'react';
import { ArrowRight } from 'lucide-react';

const LandingPage = ({ onSignIn }) => (
  <div className="flex flex-col min-h-screen bg-white text-black">
    <header className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">THEMECO</div>
        <nav>
          <ul className="flex space-x-4">
            <li>CORNERSTONE</li>
            <li>ELEMENTS</li>
            <li>FEATURES</li>
            <li>DESIGNCLOUD</li>
            <li>EXTENSIONS</li>
            <li>PRICING</li>
          </ul>
        </nav>
      </div>
    </header>
    <main className="flex-grow container mx-auto px-4 py-16 flex items-center">
      <div className="w-1/2 pr-8">
        <h2 className="text-sm uppercase text-gray-500 mb-4">SAY HELLO TO X</h2>
        <h1 className="text-6xl font-bold mb-6">THE ULTIMATE WORDPRESS THEME</h1>
        <div className="bg-yellow-400 text-sm font-semibold py-1 px-3 inline-block rounded-full mb-6">
          UPDATE: Version 10.5.6 has been released!
        </div>
        <button onClick={onSignIn} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center">
          <span>Start Learning</span>
          <ArrowRight className="ml-2" />
        </button>
      </div>
      <div className="w-1/2">
        {/* Replace this with your actual graphic */}
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          Placeholder for graphic
        </div>
      </div>
    </main>
  </div>
);

export default LandingPage;