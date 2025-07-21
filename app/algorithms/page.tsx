
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Algorithms() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const algorithms = [
    {
      id: 'bfs',
      name: 'Breadth-First Search',
      category: 'graph',
      difficulty: 'Intermediate',
      description: 'Explore graph level by level using queue',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      icon: 'ri-share-forward-line',
      color: 'cyan',
      applications: ['Shortest path', 'Level traversal', 'Connected components']
    },
    {
      id: 'dfs',
      name: 'Depth-First Search',
      category: 'graph',
      difficulty: 'Intermediate',
      description: 'Explore graph depth-wise using stack/recursion',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      icon: 'ri-git-branch-line',
      color: 'amber',
      applications: ['Topological sort', 'Cycle detection', 'Path finding']
    },
    {
      id: 'dijkstra',
      name: 'Dijkstra\'s Algorithm',
      category: 'graph',
      difficulty: 'Advanced',
      description: 'Find shortest paths from source to all vertices',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V)',
      icon: 'ri-route-line',
      color: 'purple',
      applications: ['GPS navigation', 'Network routing', 'Social networks']
    },
    {
      id: 'floyd-warshall',
      name: 'Floyd-Warshall',
      category: 'graph',
      difficulty: 'Advanced',
      description: 'Find shortest paths between all pairs of vertices',
      timeComplexity: 'O(V³)',
      spaceComplexity: 'O(V²)',
      icon: 'ri-share-box-line',
      color: 'indigo',
      applications: ['All-pairs shortest path', 'Transitive closure', 'Graph analysis']
    },
    {
      id: 'kruskal',
      name: 'Kruskal\'s Algorithm',
      category: 'graph',
      difficulty: 'Intermediate',
      description: 'Find minimum spanning tree using union-find',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V)',
      icon: 'ri-git-merge-line',
      color: 'green',
      applications: ['Network design', 'Clustering', 'Circuit design']
    },
    {
      id: 'prims',
      name: 'Prim\'s Algorithm',
      category: 'graph',
      difficulty: 'Intermediate',
      description: 'Find minimum spanning tree using priority queue',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V)',
      icon: 'ri-node-tree',
      color: 'teal',
      applications: ['Network design', 'Approximation algorithms', 'Maze generation']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Algorithms', icon: 'ri-apps-line' },
    { id: 'graph', name: 'Graph Algorithms', icon: 'ri-share-line' }
  ];

  const filteredAlgorithms = selectedCategory === 'all' 
    ? algorithms 
    : algorithms.filter(algo => algo.category === selectedCategory);

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
    } else if (complexity.includes('O(n)') && !complexity.includes('²')) {
      return 'text-blue-700 bg-blue-100';
    } else if (complexity.includes('O(n log n)')) {
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
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-200' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' }
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
              <Link href="/data-structures" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer">
                Data Structures
              </Link>
              <Link href="/algorithms" className="text-indigo-600 font-medium">
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Algorithms</h1>
          <p className="text-xl text-gray-600">
            Master essential algorithms with interactive visualizations and step-by-step execution
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
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

        {/* Algorithms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgorithms.map((algorithm) => {
            const colorClasses = getColorClasses(algorithm.color);
            return (
              <Link key={algorithm.id} href={`/algorithms/${algorithm.id}`} className="group cursor-pointer">
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
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Applications:</h4>
                    <div className="space-y-1">
                      {algorithm.applications.slice(0, 2).map((app, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <i className="ri-check-line text-green-500 mr-1"></i>
                          {app}
                        </div>
                      ))}
                      {algorithm.applications.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{algorithm.applications.length - 2} more
                        </div>
                      )}
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
              <h3 className="font-semibold text-gray-900 mb-2">Graph Traversal</h3>
              <p className="text-sm text-gray-600">
                Start with BFS and DFS to understand graph exploration
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Shortest Path</h3>
              <p className="text-sm text-gray-600">
                Learn Dijkstra's and Floyd-Warshall for path optimization
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Spanning Trees</h3>
              <p className="text-sm text-gray-600">
                Master Kruskal's and Prim's for minimum spanning trees
              </p>
            </div>
          </div>
        </div>

        {/* Algorithm Categories */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Algorithm Categories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-share-line text-indigo-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Graph Algorithms</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Algorithms for solving problems on graph data structures
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">Traversal</span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">Shortest Path</span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">Spanning Trees</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-cpu-line text-purple-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">More Coming Soon</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Additional algorithm categories will be added in future updates
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Dynamic Programming</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Greedy</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Divide & Conquer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
