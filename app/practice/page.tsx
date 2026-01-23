'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Practice() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-indigo-600" style={{fontFamily: "Pacifico, serif"}}>
                DSA Flow
              </h1>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <Link href="/data-structures" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer text-sm lg:text-base">
                Data Structures
              </Link>
              <Link href="/algorithms" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer text-sm lg:text-base">
                Algorithms
              </Link>
              <Link href="/practice" className="text-indigo-600 font-medium text-sm lg:text-base">
                Practice
              </Link>
            </nav>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
            </button>
          </div>
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <Link 
                  href="/data-structures" 
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Data Structures
                </Link>
                <Link 
                  href="/algorithms" 
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Algorithms
                </Link>
                <Link 
                  href="/practice" 
                  className="text-indigo-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Practice
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Practice Problems</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Master data structures and algorithms with our curated problem sets
          </p>
        </div>

        {/* Practice Sections */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Easy-100 Beginner Problems */}
          <Link href="/practice/easy-100">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                  <i className="ri-seedling-line text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">Easy-100</h3>
              </div>
              <p className="text-gray-600 mb-4">
                100 beginner-friendly problems to build your foundation in data structures and algorithms
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Arrays & Strings</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Basic Data Structures</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Simple Algorithms</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Beginner</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">100 Problems</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Foundation</span>
              </div>
            </div>
          </Link>

          {/* Beginner to Advanced Problems */}
          <Link href="/practice/beginner-advanced">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                  <i className="ri-line-chart-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Beginner to Advanced</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Progressive difficulty problems taking you from basics to advanced concepts
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-blue-500 mr-2"></i>
                  <span>Progressive Difficulty</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-blue-500 mr-2"></i>
                  <span>All Data Structures</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-blue-500 mr-2"></i>
                  <span>Algorithm Patterns</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">All Levels</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">200+ Problems</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Comprehensive</span>
              </div>
            </div>
          </Link>

          {/* SWE-180 Problems */}
          <Link href="/practice/swe-180">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                  <i className="ri-briefcase-line text-2xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">SWE-180</h3>
              </div>
              <p className="text-gray-600 mb-4">
                180 problems commonly asked in software engineering interviews
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-purple-500 mr-2"></i>
                  <span>Interview Focus</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-purple-500 mr-2"></i>
                  <span>FAANG Questions</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-purple-500 mr-2"></i>
                  <span>Real Interview Scenarios</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Interview</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">180 Problems</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Job Prep</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Why Practice with DSA Flow?</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-play-circle-line text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Visual Learning</h3>
              <p className="text-gray-600 text-sm">
                Interactive visualizations help you understand complex algorithms step by step
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-code-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Feedback</h3>
              <p className="text-gray-600 text-sm">
                Get instant feedback on your solutions with detailed explanations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-trophy-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm">
                Monitor your improvement and identify areas that need more practice
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Getting Started</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Your Path</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <i className="ri-arrow-right-s-line text-indigo-600 mr-2 mt-1"></i>
                  <span><strong>Easy-100:</strong> Perfect for absolute beginners starting their DSA journey</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-arrow-right-s-line text-indigo-600 mr-2 mt-1"></i>
                  <span><strong>Beginner to Advanced:</strong> Comprehensive path covering all difficulty levels</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-arrow-right-s-line text-indigo-600 mr-2 mt-1"></i>
                  <span><strong>SWE-180:</strong> Interview-focused preparation for software engineering roles</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Practice Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Start with easier problems to build confidence</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Practice consistently rather than cramming</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Review solutions to learn different approaches</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
