'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Searching() {
  const [selectedType, setSelectedType] = useState('all');

  const searchingAlgorithms = [
    {
      id: 'linear-search',
      name: 'Linear Search',
      type: 'sequential',
      difficulty: 'Beginner',
      description: 'Sequential search through elements until target is found',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      icon: 'ri-search-line',
      color: 'blue',
      applications: ['Unsorted arrays', 'Small datasets', 'Simple searching'],
      prerequisites: 'None',
      bestCase: 'O(1)',
      worstCase: 'O(n)',
      dataStructure: 'Array, List'
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      type: 'divide-conquer',
      difficulty: 'Intermediate',
      description: 'Divide and conquer search in sorted arrays',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      icon: 'ri-focus-line',
      color: 'green',
      applications: ['Sorted arrays', 'Database queries', 'Range searches'],
      prerequisites: 'Sorted data',
      bestCase: 'O(1)',
      worstCase: 'O(log n)',
      dataStructure: 'Sorted Array'
    }
  ];

  const searchTypes = [
    { id: 'all', name: 'All Searches', icon: 'ri-apps-line' },
    { id: 'sequential', name: 'Sequential', icon: 'ri-list-ordered' },
    { id: 'divide-conquer', name: 'Divide & Conquer', icon: 'ri-split-cells-horizontal' }
  ];

  const filteredAlgorithms = selectedType === 'all' 
    ? searchingAlgorithms 
    : searchingAlgorithms.filter(algo => algo.type === selectedType);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-orange-600 bg-orange-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('O(1)')) {
      return 'text-green-700 bg-green-100';
    } else if (complexity.includes('O(log log n)')) {
      return 'text-emerald-700 bg-emerald-100';
    } else if (complexity.includes('O(log n)')) {
      return 'text-blue-700 bg-blue-100';
    } else if (complexity.includes('O(√n)')) {
      return 'text-orange-700 bg-orange-100';
    } else {
      return 'text-red-700 bg-red-100';
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, {bg: string, text: string, border: string}> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600" style={{fontFamily: "Pacifico, serif"}}>
                DSA Flow
              </h1>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/data-structures" className="text-indigo-600 font-medium cursor-pointer">
                Data Structures
              </Link>
              <Link href="/algorithms" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer">
                Algorithms
              </Link>
              <Link href="/practice" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer">
                Practice
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/data-structures" className="hover:text-indigo-600 cursor-pointer">Data Structures</Link>
          <i className="ri-arrow-right-s-line mx-2"></i>
          <span className="text-gray-900 font-medium">Searching Algorithms</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Searching Algorithms</h1>
          <p className="text-xl text-gray-600">
            Master searching algorithms with interactive visualizations and step-by-step execution
          </p>
        </div>

        {/* Type Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {searchTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedType === type.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className={`${type.icon} mr-2`}></i>
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Searching Algorithms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgorithms.map((algorithm) => {
            const colorClasses = getColorClasses(algorithm.color);
            return (
              <Link key={algorithm.id} href={`/data-structures/searching/${algorithm.id}`} className="group cursor-pointer">
                <div className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border ${colorClasses.border}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                      <i className={`${algorithm.icon} text-2xl ${colorClasses.text}`}></i>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(algorithm.difficulty)}`}>
                      {algorithm.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {algorithm.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {algorithm.description}
                  </p>

                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs text-gray-500">Time</span>
                        <div className={`text-xs font-mono px-2 py-1 rounded ${getComplexityColor(algorithm.timeComplexity)}`}>
                          {algorithm.timeComplexity}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Space</span>
                        <div className={`text-xs font-mono px-2 py-1 rounded ${getComplexityColor(algorithm.spaceComplexity)}`}>
                          {algorithm.spaceComplexity}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-2">
                      <span className="font-semibold">Best:</span> {algorithm.bestCase} | 
                      <span className="font-semibold"> Worst:</span> {algorithm.worstCase}
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="font-semibold">Data:</span> {algorithm.dataStructure}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Applications:</h4>
                    <div className="space-y-1">
                      {algorithm.applications.slice(0, 2).map((app, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <i className="ri-check-line text-green-500 mr-1"></i>
                          {app}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="ri-play-circle-line mr-1"></i>
                      Interactive Demo
                    </div>
                    <span className={`${colorClasses.text} font-semibold group-hover:translate-x-1 transition-transform`}>
                      Learn →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Learning Path Section */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Learning Path</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Linear Search</h3>
              <p className="text-sm text-gray-600">
                Start with basic sequential search to understand fundamentals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Binary Search</h3>
              <p className="text-sm text-gray-600">
                Master the most important searching algorithm for sorted data
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Advanced Searches</h3>
              <p className="text-sm text-gray-600">
                Explore specialized algorithms for specific use cases and optimizations
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Algorithm Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Algorithm</th>
                  <th className="text-left py-3 px-4">Time Complexity</th>
                  <th className="text-left py-3 px-4">Space</th>
                  <th className="text-left py-3 px-4">Prerequisites</th>
                  <th className="text-left py-3 px-4">Best Use Case</th>
                </tr>
              </thead>
              <tbody>
                {searchingAlgorithms.map((algo, index) => (
                  <tr key={algo.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 font-medium">{algo.name}</td>
                    <td className="py-3 px-4 font-mono text-xs">{algo.timeComplexity}</td>
                    <td className="py-3 px-4 font-mono text-xs">{algo.spaceComplexity}</td>
                    <td className="py-3 px-4 text-xs">{algo.prerequisites}</td>
                    <td className="py-3 px-4 text-xs">{algo.applications[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to Use Guide */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Use Each Algorithm</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-search-line text-blue-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Linear Search</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Unsorted data or small datasets</li>
                <li>• When simplicity is preferred</li>
                <li>• One-time searches without preprocessing</li>
                <li>• Linked lists or non-indexed structures</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-focus-line text-green-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Binary Search</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Large sorted datasets</li>
                <li>• Frequent searches on same data</li>
                <li>• Need guaranteed O(log n) performance</li>
                <li>• Arrays with random access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}