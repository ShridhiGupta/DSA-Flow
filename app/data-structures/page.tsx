
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DataStructures() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dataStructures = [
    {
      id: 'arrays',
      name: 'Arrays',
      category: 'linear',
      difficulty: 'Beginner',
      description: 'Sequential collection of elements stored in contiguous memory locations',
      operations: ['Access', 'Insert', 'Delete', 'Search'],
      timeComplexity: 'O(1) access, O(n) search',
      icon: 'ri-grid-line',
      color: 'blue'
    },
    {
      id: 'strings',
      name: 'Strings',
      category: 'linear',
      difficulty: 'Beginner',
      description: 'Sequence of characters with specialized string manipulation operations',
      operations: ['Concatenation', 'Substring', 'Search', 'Replace'],
      timeComplexity: 'O(n) most operations',
      icon: 'ri-double-quotes-l',
      color: 'green'
    },
    {
      id: 'linkedlist',
      name: 'Linked List',
      category: 'linear',
      difficulty: 'Intermediate',
      description: 'Linear data structure where elements are stored in nodes with pointers',
      operations: ['Insert', 'Delete', 'Search', 'Traverse'],
      timeComplexity: 'O(1) insert, O(n) search',
      icon: 'ri-links-line',
      color: 'purple'
    },
    {
      id: 'stacks',
      name: 'Stacks',
      category: 'linear',
      difficulty: 'Beginner',
      description: 'LIFO (Last In First Out) data structure with push and pop operations',
      operations: ['Push', 'Pop', 'Peek', 'IsEmpty'],
      timeComplexity: 'O(1) all operations',
      icon: 'ri-stack-line',
      color: 'orange'
    },
    {
      id: 'queues',
      name: 'Queues',
      category: 'linear',
      difficulty: 'Beginner',
      description: 'FIFO (First In First Out) data structure with enqueue and dequeue operations',
      operations: ['Enqueue', 'Dequeue', 'Front', 'IsEmpty'],
      timeComplexity: 'O(1) all operations',
      icon: 'ri-order-play-line',
      color: 'teal'
    },
    {
      id: 'binary-tree',
      name: 'Binary Tree',
      category: 'tree',
      difficulty: 'Intermediate',
      description: 'Hierarchical data structure where each node has at most two children',
      operations: ['Insert', 'Delete', 'Traverse', 'Search'],
      timeComplexity: 'O(log n) balanced, O(n) worst',
      icon: 'ri-git-branch-line',
      color: 'indigo'
    },
    {
      id: 'binary-search-tree',
      name: 'Binary Search Tree',
      category: 'tree',
      difficulty: 'Intermediate',
      description: 'Binary tree with ordered properties for efficient searching',
      operations: ['Insert', 'Delete', 'Search', 'Traverse'],
      timeComplexity: 'O(log n) average, O(n) worst',
      icon: 'ri-node-tree',
      color: 'red'
    },
    {
      id: 'graphs',
      name: 'Graphs',
      category: 'graph',
      difficulty: 'Advanced',
      description: 'Collection of vertices connected by edges, representing relationships',
      operations: ['Add Vertex', 'Add Edge', 'DFS', 'BFS'],
      timeComplexity: 'Varies by representation',
      icon: 'ri-share-line',
      color: 'pink'
    },
    {
      id: 'sorting',
      name: 'Sorting Algorithms',
      category: 'algorithms',
      difficulty: 'Intermediate',
      description: 'Collection of algorithms to arrange elements in a particular order',
      operations: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort'],
      timeComplexity: 'O(n log n) optimal',
      icon: 'ri-sort-asc',
      color: 'violet'
    },
    {
      id: 'searching',
      name: 'Searching Algorithms',
      category: 'algorithms',
      difficulty: 'Beginner',
      description: 'Algorithms to find specific elements within data structures',
      operations: ['Linear Search', 'Binary Search', 'Interpolation', 'Exponential'],
      timeComplexity: 'O(log n) optimal',
      icon: 'ri-search-2-line',
      color: 'cyan'
    },
    {
      id: 'two-pointer',
      name: 'Two Pointer',
      category: 'technique',
      difficulty: 'Intermediate',
      description: 'Technique using two pointers to traverse data structures efficiently',
      operations: ['Left-Right', 'Fast-Slow', 'Same Direction', 'Opposite Direction'],
      timeComplexity: 'O(n) typically',
      icon: 'ri-arrow-left-right-line',
      color: 'emerald'
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window',
      category: 'technique',
      difficulty: 'Intermediate',
      description: 'Technique for finding optimal solutions in subarrays or substrings',
      operations: ['Fixed Window', 'Variable Window', 'Expand', 'Contract'],
      timeComplexity: 'O(n) linear time',
      icon: 'ri-window-line',
      color: 'yellow'
    },
    {
      id: 'hashing',
      name: 'Hashing',
      category: 'technique',
      difficulty: 'Beginner',
      description: 'Technique using hash tables for fast data retrieval and storage',
      operations: ['Insert', 'Search', 'Delete', 'Hash Function'],
      timeComplexity: 'O(1) average case',
      icon: 'ri-hashtag',
      color: 'lime'
    },
    {
      id: 'maths-geometry',
      name: 'Maths & Geometry',
      category: 'technique',
      difficulty: 'Intermediate',
      description: 'Mathematical concepts and geometric algorithms for problem solving',
      operations: ['GCD', 'LCM', 'Prime Numbers', 'Coordinate Geometry'],
      timeComplexity: 'Varies by operation',
      icon: 'ri-compass-3-line',
      color: 'amber'
    },
    {
      id: 'recursion',
      name: 'Recursion',
      category: 'technique',
      difficulty: 'Intermediate',
      description: 'Problem-solving technique where functions call themselves',
      operations: ['Base Case', 'Recursive Case', 'Stack Frames', 'Memoization'],
      timeComplexity: 'Varies widely',
      icon: 'ri-repeat-line',
      color: 'rose'
    },
    {
      id: 'backtracking',
      name: 'Backtracking',
      category: 'technique',
      difficulty: 'Advanced',
      description: 'Algorithmic approach for finding solutions by exploring possibilities',
      operations: ['Choose', 'Explore', 'Unchoose', 'Prune'],
      timeComplexity: 'Exponential typically',
      icon: 'ri-arrow-go-back-line',
      color: 'sky'
    },
    {
      id: 'priority-queues-heaps',
      name: 'Priority Queues & Heaps',
      category: 'advanced',
      difficulty: 'Intermediate',
      description: 'Data structures for maintaining elements with priority ordering',
      operations: ['Insert', 'Extract-Max', 'Heapify', 'Build-Heap'],
      timeComplexity: 'O(log n) operations',
      icon: 'ri-pyramid-line',
      color: 'fuchsia'
    },
    {
      id: 'tries',
      name: 'Tries',
      category: 'advanced',
      difficulty: 'Advanced',
      description: 'Tree-like data structure for efficient string operations',
      operations: ['Insert', 'Search', 'Prefix Search', 'Delete'],
      timeComplexity: 'O(m) where m is key length',
      icon: 'ri-git-repository-line',
      color: 'stone'
    },
    {
      id: 'dynamic-programming',
      name: 'Dynamic Programming',
      category: 'technique',
      difficulty: 'Advanced',
      description: 'Optimization technique breaking problems into overlapping subproblems',
      operations: ['Memoization', 'Tabulation', 'State Transition', 'Optimal Substructure'],
      timeComplexity: 'O(n²) to O(n³) typically',
      icon: 'ri-flow-chart',
      color: 'neutral'
    },
    {
      id: 'greedy',
      name: 'Greedy',
      category: 'technique',
      difficulty: 'Intermediate',
      description: 'Algorithmic paradigm making locally optimal choices',
      operations: ['Local Optimum', 'Global Solution', 'Choice Property', 'Optimal Substructure'],
      timeComplexity: 'O(n log n) typically',
      icon: 'ri-money-dollar-circle-line',
      color: 'teal'
    },
    {
      id: 'intervals',
      name: 'Intervals',
      category: 'technique',
      difficulty: 'Intermediate',
      description: 'Techniques for working with ranges and interval-based problems',
      operations: ['Merge', 'Overlap', 'Insert', 'Intersection'],
      timeComplexity: 'O(n log n) sorting based',
      icon: 'ri-drag-move-2-line',
      color: 'orange'
    },
    {
      id: 'bit-manipulation',
      name: 'Bit Manipulation',
      category: 'technique',
      difficulty: 'Advanced',
      description: 'Techniques using bitwise operations for efficient computation',
      operations: ['AND', 'OR', 'XOR', 'Bit Shifts'],
      timeComplexity: 'O(1) bitwise operations',
      icon: 'ri-code-s-slash-line',
      color: 'slate'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'ri-apps-line' },
    { id: 'linear', name: 'Linear', icon: 'ri-bar-chart-horizontal-line' },
    { id: 'tree', name: 'Trees', icon: 'ri-git-branch-line' },
    { id: 'graph', name: 'Graphs', icon: 'ri-share-line' },
    { id: 'algorithms', name: 'Algorithms', icon: 'ri-cpu-line' },
    { id: 'technique', name: 'Techniques', icon: 'ri-tools-line' },
    { id: 'advanced', name: 'Advanced', icon: 'ri-medal-line' }
  ];

  const filteredStructures = selectedCategory === 'all' 
    ? dataStructures 
    : dataStructures.filter(ds => ds.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-orange-600 bg-orange-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, {bg: string, text: string, border: string}> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-200' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
      lime: { bg: 'bg-lime-100', text: 'text-lime-600', border: 'border-lime-200' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
      rose: { bg: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-200' },
      violet: { bg: 'bg-violet-100', text: 'text-violet-600', border: 'border-violet-200' },
      sky: { bg: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-200' },
      fuchsia: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-600', border: 'border-fuchsia-200' },
      stone: { bg: 'bg-stone-100', text: 'text-stone-600', border: 'border-stone-200' },
      neutral: { bg: 'bg-neutral-100', text: 'text-neutral-600', border: 'border-neutral-200' },
      slate: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' }
    };
    return colors[color] || colors.blue;
  };

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
              <Link href="/data-structures" className="text-indigo-600 font-medium text-sm lg:text-base">
                Data Structures
              </Link>
              <Link href="/algorithms" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer text-sm lg:text-base">
                Algorithms
              </Link>
              <Link href="/practice" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer text-sm lg:text-base">
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
                  className="text-indigo-600 font-medium py-2"
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
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Data Structures</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Master fundamental data structures and advanced problem-solving techniques with interactive visualizations
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Data Structures Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredStructures.map((structure) => {
            const colorClasses = getColorClasses(structure.color);
            return (
              <Link key={structure.id} href={`/data-structures/${structure.id}`} className="group cursor-pointer">
                <div className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border ${colorClasses.border}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                      <i className={`${structure.icon} text-2xl ${colorClasses.text}`}></i>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(structure.difficulty)}`}>
                      {structure.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {structure.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {structure.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Operations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {structure.operations.map((op) => (
                        <span key={op} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {op}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">Time Complexity</span>
                      <div className="text-sm font-mono text-gray-700">{structure.timeComplexity}</div>
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

        {/* Progress Section */}
        <div className="mt-8 sm:mt-12 bg-white rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Your Learning Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-check-line text-2xl text-green-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">5 Completed</h3>
              <p className="text-sm text-gray-600">Topics mastered</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-play-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">3 In Progress</h3>
              <p className="text-sm text-gray-600">Currently learning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-cpu-line text-2xl text-orange-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">2 Algorithm Sets</h3>
              <p className="text-sm text-gray-600">Sorting & Searching</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-tools-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">10 Techniques</h3>
              <p className="text-sm text-gray-600">Problem-solving methods</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
