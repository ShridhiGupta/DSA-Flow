'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sorting() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const sortingAlgorithms = [
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      difficulty: 'Beginner',
      description: 'Compare adjacent elements and swap if in wrong order',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      icon: 'ri-bubble-chart-line',
      color: 'purple',
      applications: ['Educational purposes', 'Small datasets', 'Nearly sorted data'],
      stable: true,
      inPlace: true
    },
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      difficulty: 'Beginner',
      description: 'Find minimum element and place it at the beginning',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      icon: 'ri-hand-heart-line',
      color: 'orange',
      applications: ['Small datasets', 'Memory-constrained systems', 'Educational'],
      stable: false,
      inPlace: true
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      difficulty: 'Beginner',
      description: 'Build sorted array one element at a time',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      icon: 'ri-insert-row-bottom',
      color: 'teal',
      applications: ['Small datasets', 'Nearly sorted data', 'Online sorting'],
      stable: true,
      inPlace: true
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      difficulty: 'Intermediate',
      description: 'Divide array and merge sorted subarrays',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      icon: 'ri-split-cells-horizontal',
      color: 'indigo',
      applications: ['Large datasets', 'Stable sorting', 'External sorting'],
      stable: true,
      inPlace: false
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      difficulty: 'Intermediate',
      description: 'Partition around pivot and recursively sort',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      icon: 'ri-flashlight-line',
      color: 'red',
      applications: ['General purpose', 'In-place sorting', 'Fast average case'],
      stable: false,
      inPlace: true
    },
    {
      id: 'heap-sort',
      name: 'Heap Sort',
      difficulty: 'Advanced',
      description: 'Use binary heap to sort elements',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      icon: 'ri-pyramid-line',
      color: 'pink',
      applications: ['Priority queues', 'Selection algorithms', 'Guaranteed O(n log n)'],
      stable: false,
      inPlace: true
    },
    {
      id: 'counting-sort',
      name: 'Counting Sort',
      difficulty: 'Intermediate',
      description: 'Non-comparison sorting for integers with limited range',
      timeComplexity: 'O(n + k)',
      spaceComplexity: 'O(k)',
      icon: 'ri-calculator-line',
      color: 'cyan',
      applications: ['Integer sorting', 'Limited range values', 'Stable sorting'],
      stable: true,
      inPlace: false
    },
    {
      id: 'radix-sort',
      name: 'Radix Sort',
      difficulty: 'Advanced',
      description: 'Sort by processing digits from least to most significant',
      timeComplexity: 'O(d × n)',
      spaceComplexity: 'O(n + k)',
      icon: 'ri-sort-desc',
      color: 'emerald',
      applications: ['Integer sorting', 'String sorting', 'Fixed-width data'],
      stable: true,
      inPlace: false
    }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels', icon: 'ri-apps-line' },
    { id: 'Beginner', name: 'Beginner', icon: 'ri-seedling-line' },
    { id: 'Intermediate', name: 'Intermediate', icon: 'ri-plant-line' },
    { id: 'Advanced', name: 'Advanced', icon: 'ri-trophy-line' }
  ];

  const filteredAlgorithms = selectedDifficulty === 'all' 
    ? sortingAlgorithms 
    : sortingAlgorithms.filter(algo => algo.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-orange-600 bg-orange-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('O(1)') || complexity.includes('O(log n)')) {
      return 'text-green-700 bg-green-100';
    } else if (complexity.includes('O(n)') && !complexity.includes('²') && !complexity.includes('log')) {
      return 'text-blue-700 bg-blue-100';
    } else if (complexity.includes('O(n log n)')) {
      return 'text-orange-700 bg-orange-100';
    } else {
      return 'text-red-700 bg-red-100';
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, {bg: string, text: string, border: string}> = {
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-200' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' }
    };
    return colors[color] || colors.purple;
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
          <span className="text-gray-900 font-medium">Sorting Algorithms</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sorting Algorithms</h1>
          <p className="text-xl text-gray-600">
            Master sorting algorithms with interactive visualizations and step-by-step execution
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedDifficulty === difficulty.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className={`${difficulty.icon} mr-2`}></i>
                {difficulty.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting Algorithms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgorithms.map((algorithm) => {
            const colorClasses = getColorClasses(algorithm.color);
            return (
              <Link key={algorithm.id} href={`/data-structures/sorting/${algorithm.id}`} className="group cursor-pointer">
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
                    <div className="flex gap-2 text-xs">
                      <span className={`px-2 py-1 rounded ${algorithm.stable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {algorithm.stable ? 'Stable' : 'Unstable'}
                      </span>
                      <span className={`px-2 py-1 rounded ${algorithm.inPlace ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {algorithm.inPlace ? 'In-place' : 'Not in-place'}
                      </span>
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
              <h3 className="font-semibold text-gray-900 mb-2">Simple Sorts</h3>
              <p className="text-sm text-gray-600">
                Start with Bubble, Selection, and Insertion sort to understand basic concepts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Efficient Sorts</h3>
              <p className="text-sm text-gray-600">
                Master Merge Sort and Quick Sort for optimal time complexity
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Specialized Sorts</h3>
              <p className="text-sm text-gray-600">
                Explore Heap Sort, Counting Sort, and Radix Sort for specific use cases
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
                  <th className="text-left py-3 px-4">Time (Best)</th>
                  <th className="text-left py-3 px-4">Time (Average)</th>
                  <th className="text-left py-3 px-4">Time (Worst)</th>
                  <th className="text-left py-3 px-4">Space</th>
                  <th className="text-left py-3 px-4">Stable</th>
                </tr>
              </thead>
              <tbody>
                {sortingAlgorithms.slice(0, 6).map((algo, index) => (
                  <tr key={algo.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 font-medium">{algo.name}</td>
                    <td className="py-3 px-4 font-mono text-xs">{algo.timeComplexity}</td>
                    <td className="py-3 px-4 font-mono text-xs">{algo.timeComplexity}</td>
                    <td className="py-3 px-4 font-mono text-xs">{algo.timeComplexity}</td>
                    <td className="py-3 px-4 font-mono text-xs">{algo.spaceComplexity}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${algo.stable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {algo.stable ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}