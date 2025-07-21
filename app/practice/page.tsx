'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Practice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      topic: 'Array',
      description: 'Given an array of integers, return indices of two numbers that add up to target.',
      tags: ['Array', 'Hash Table', 'Two Pointer'],
      solved: true,
      attempts: 3,
      bestTime: '12 min'
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      topic: 'Linked List',
      description: 'Reverse a singly linked list iteratively and recursively.',
      tags: ['Linked List', 'Recursion', 'Iterative'],
      solved: true,
      attempts: 2,
      bestTime: '8 min'
    },
    {
      id: 3,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      topic: 'Stack',
      description: 'Determine if string of brackets is valid using stack data structure.',
      tags: ['Stack', 'String', 'Parsing'],
      solved: false,
      attempts: 1,
      bestTime: null
    },
    {
      id: 4,
      title: 'Binary Search',
      difficulty: 'Easy',
      topic: 'Search',
      description: 'Search for target value in sorted array using binary search algorithm.',
      tags: ['Binary Search', 'Array', 'Divide and Conquer'],
      solved: true,
      attempts: 1,
      bestTime: '5 min'
    },
    {
      id: 5,
      title: 'Merge Two Sorted Lists',
      difficulty: 'Easy',
      topic: 'Linked List',
      description: 'Merge two sorted linked lists into one sorted linked list.',
      tags: ['Linked List', 'Recursion', 'Two Pointer'],
      solved: false,
      attempts: 0,
      bestTime: null
    },
    {
      id: 6,
      title: 'Maximum Subarray',
      difficulty: 'Medium',
      topic: 'Array',
      description: 'Find contiguous subarray with largest sum using Kadane\'s algorithm.',
      tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
      solved: true,
      attempts: 4,
      bestTime: '18 min'
    },
    {
      id: 7,
      title: 'Group Anagrams',
      difficulty: 'Medium',
      topic: 'String',
      description: 'Group strings that are anagrams of each other together.',
      tags: ['String', 'Hash Table', 'Sorting'],
      solved: false,
      attempts: 2,
      bestTime: null
    },
    {
      id: 8,
      title: 'Binary Tree Level Order',
      difficulty: 'Medium',
      topic: 'Tree',
      description: 'Return level order traversal of binary tree using BFS.',
      tags: ['Tree', 'BFS', 'Queue'],
      solved: false,
      attempts: 1,
      bestTime: null
    },
    {
      id: 9,
      title: 'Course Schedule',
      difficulty: 'Medium',
      topic: 'Graph',
      description: 'Determine if possible to finish all courses given prerequisites.',
      tags: ['Graph', 'DFS', 'Topological Sort'],
      solved: false,
      attempts: 0,
      bestTime: null
    },
    {
      id: 10,
      title: 'Merge k Sorted Lists',
      difficulty: 'Hard',
      topic: 'Linked List',
      description: 'Merge k sorted linked lists and return as one sorted list.',
      tags: ['Linked List', 'Divide and Conquer', 'Heap'],
      solved: false,
      attempts: 1,
      bestTime: null
    }
  ];

  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
  const topics = ['all', 'Array', 'String', 'Linked List', 'Stack', 'Tree', 'Graph', 'Search'];

  const filteredProblems = problems.filter(problem => {
    return (selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty) &&
           (selectedTopic === 'all' || problem.topic === selectedTopic);
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressStats = () => {
    const total = problems.length;
    const solved = problems.filter(p => p.solved).length;
    const easy = problems.filter(p => p.difficulty === 'Easy' && p.solved).length;
    const medium = problems.filter(p => p.difficulty === 'Medium' && p.solved).length;
    const hard = problems.filter(p => p.difficulty === 'Hard' && p.solved).length;
    
    return { total, solved, easy, medium, hard };
  };

  const stats = getProgressStats();

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
              <Link href="/algorithms" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer">
                Algorithms
              </Link>
              <Link href="/practice" className="text-indigo-600 font-medium">
                Practice
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Practice Problems</h1>
          <p className="text-xl text-gray-600">
            Solve coding challenges and reinforce your understanding of data structures and algorithms
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{stats.solved}/{stats.total}</div>
              <div className="text-gray-600 text-sm">Total Solved</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.solved / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{stats.easy}</div>
              <div className="text-gray-600 text-sm">Easy</div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mt-2">
                <i className="ri-check-line text-green-600"></i>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{stats.medium}</div>
              <div className="text-gray-600 text-sm">Medium</div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mt-2">
                <i className="ri-star-line text-orange-600"></i>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{stats.hard}</div>
              <div className="text-gray-600 text-sm">Hard</div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mt-2">
                <i className="ri-fire-line text-red-600"></i>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-gray-600 text-sm">Streak Days</div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mt-2">
                <i className="ri-trophy-line text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Problems</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedDifficulty === difficulty
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty === 'all' ? 'All Difficulties' : difficulty}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedTopic === topic
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {topic === 'all' ? 'All Topics' : topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Problems ({filteredProblems.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredProblems.map((problem) => (
              <div key={problem.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-4">
                        {problem.solved ? (
                          <i className="ri-check-circle-fill text-green-600 mr-2"></i>
                        ) : problem.attempts > 0 ? (
                          <i className="ri-time-line text-orange-600 mr-2"></i>
                        ) : (
                          <i className="ri-circle-line text-gray-400 mr-2"></i>
                        )}
                        <h4 className="text-lg font-semibold text-gray-900">
                          {problem.id}. {problem.title}
                        </h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{problem.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {problem.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>
                        <i className="ri-refresh-line mr-1"></i>
                        {problem.attempts} attempts
                      </span>
                      {problem.bestTime && (
                        <span>
                          <i className="ri-timer-line mr-1"></i>
                          Best: {problem.bestTime}
                        </span>
                      )}
                      <span>
                        <i className="ri-bookmark-line mr-1"></i>
                        {problem.topic}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
                      {problem.solved ? 'Review' : problem.attempts > 0 ? 'Continue' : 'Start'}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                      <i className="ri-bookmark-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-lightbulb-line text-blue-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Start with Easy Problems</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Build confidence and understand basic patterns before moving to medium and hard problems.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-time-line text-green-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Practice Regularly</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Consistent daily practice is more effective than long, infrequent sessions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-group-line text-purple-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Learn from Others</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Review different solutions and approaches to understand various problem-solving techniques.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-refresh-line text-orange-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Review and Repeat</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Revisit solved problems after a few days to reinforce the patterns and techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
