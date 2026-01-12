'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Easy100() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const problems = [
    // Arrays & Searching
    { id: 1, title: "Find the second largest element in an array", category: "Arrays & Searching", difficulty: "Easy", solved: false },
    { id: 2, title: "Remove duplicates from a sorted array in-place", category: "Arrays & Searching", difficulty: "Easy", solved: false },
    { id: 3, title: "Move all zeros to the end (stable)", category: "Arrays & Searching", difficulty: "Easy", solved: false },
    { id: 4, title: "Find missing number in range 1..n", category: "Arrays & Searching", difficulty: "Easy", solved: false },
    { id: 5, title: "Find element appearing once when others appear twice (XOR)", category: "Arrays & Searching", difficulty: "Easy", solved: false },
    { id: 6, title: "Kadane's algorithm (maximum subarray sum)", category: "Arrays & Searching", difficulty: "Easy", solved: false },
    { id: 7, title: "Two Sum – indices (hashing)", category: "Arrays & Searching", difficulty: "Easy", solved: false },
    { id: 8, title: "Binary search (first/last occurrence)", category: "Arrays & Searching", difficulty: "Easy", solved: false },
    { id: 9, title: "Search in rotated sorted array", category: "Arrays & Searching", difficulty: "Medium", solved: false },
    { id: 10, title: "Find peak element", category: "Arrays & Searching", difficulty: "Easy", solved: false },

    // Strings
    { id: 11, title: "Reverse words in a string (in-place if possible)", category: "Strings", difficulty: "Easy", solved: false },
    { id: 12, title: "Check anagram (frequency counting)", category: "Strings", difficulty: "Easy", solved: false },
    { id: 13, title: "Longest common prefix", category: "Strings", difficulty: "Easy", solved: false },
    { id: 14, title: "Valid palindrome (ignore non-alphanumerics)", category: "Strings", difficulty: "Easy", solved: false },
    { id: 15, title: "String compression (run-length)", category: "Strings", difficulty: "Easy", solved: false },
    { id: 16, title: "Find first non-repeating character", category: "Strings", difficulty: "Easy", solved: false },
    { id: 17, title: "Group anagrams", category: "Strings", difficulty: "Medium", solved: false },
    { id: 18, title: "Remove adjacent duplicates", category: "Strings", difficulty: "Easy", solved: false },
    { id: 19, title: "Implement strstr (substring search)", category: "Strings", difficulty: "Medium", solved: false },
    { id: 20, title: "Longest substring without repeating characters", category: "Strings", difficulty: "Medium", solved: false },

    // Linked Lists
    { id: 21, title: "Reverse a singly linked list", category: "Linked Lists", difficulty: "Easy", solved: false },
    { id: 22, title: "Detect cycle (Floyd's) and find cycle length", category: "Linked Lists", difficulty: "Easy", solved: false },
    { id: 23, title: "Merge two sorted linked lists", category: "Linked Lists", difficulty: "Easy", solved: false },
    { id: 24, title: "Remove nth node from end", category: "Linked Lists", difficulty: "Easy", solved: false },
    { id: 25, title: "Middle of linked list (fast/slow)", category: "Linked Lists", difficulty: "Easy", solved: false },
    { id: 26, title: "Add two numbers (linked lists)", category: "Linked Lists", difficulty: "Medium", solved: false },
    { id: 27, title: "Palindrome linked list", category: "Linked Lists", difficulty: "Easy", solved: false },
    { id: 28, title: "Intersection of two linked lists", category: "Linked Lists", difficulty: "Easy", solved: false },
    { id: 29, title: "Flatten a multilevel doubly linked list", category: "Linked Lists", difficulty: "Medium", solved: false },
    { id: 30, title: "Copy list with random pointer", category: "Linked Lists", difficulty: "Hard", solved: false },

    // Stacks & Queues
    { id: 31, title: "Valid parentheses", category: "Stacks & Queues", difficulty: "Easy", solved: false },
    { id: 32, title: "Min stack (support getMin in O(1))", category: "Stacks & Queues", difficulty: "Easy", solved: false },
    { id: 33, title: "Implement queue using stacks", category: "Stacks & Queues", difficulty: "Easy", solved: false },
    { id: 34, title: "Next greater element", category: "Stacks & Queues", difficulty: "Easy", solved: false },
    { id: 35, title: "Largest rectangle in histogram", category: "Stacks & Queues", difficulty: "Hard", solved: false },
    { id: 36, title: "Circular queue design", category: "Stacks & Queues", difficulty: "Easy", solved: false },
    { id: 37, title: "Daily Temperatures (next warmer day)", category: "Stacks & Queues", difficulty: "Medium", solved: false },
    { id: 38, title: "Simplify path (Unix path)", category: "Stacks & Queues", difficulty: "Medium", solved: false },
    { id: 39, title: "Evaluate reverse Polish notation", category: "Stacks & Queues", difficulty: "Medium", solved: false },
    { id: 40, title: "LRU cache (design)", category: "Stacks & Queues", difficulty: "Medium", solved: false },

    // Trees & BST
    { id: 41, title: "Inorder/Preorder/Postorder traversal (iterative)", category: "Trees & BST", difficulty: "Easy", solved: false },
    { id: 42, title: "Level order traversal (BFS)", category: "Trees & BST", difficulty: "Easy", solved: false },
    { id: 43, title: "Height/diameter of a binary tree", category: "Trees & BST", difficulty: "Easy", solved: false },
    { id: 44, title: "Check if two trees are identical", category: "Trees & BST", difficulty: "Easy", solved: false },
    { id: 45, title: "Balanced binary tree (height-balanced)", category: "Trees & BST", difficulty: "Easy", solved: false },
    { id: 46, title: "Lowest common ancestor (BST & BT)", category: "Trees & BST", difficulty: "Easy", solved: false },
    { id: 47, title: "Validate BST", category: "Trees & BST", difficulty: "Medium", solved: false },
    { id: 48, title: "Serialize/Deserialize binary tree", category: "Trees & BST", difficulty: "Hard", solved: false },
    { id: 49, title: "Kth smallest in BST", category: "Trees & BST", difficulty: "Easy", solved: false },
    { id: 50, title: "Path sum (root-to-leaf) variants", category: "Trees & BST", difficulty: "Easy", solved: false },

    // Heaps & Priority Queues
    { id: 51, title: "K largest elements (max/min-heap)", category: "Heaps & Priority Queues", difficulty: "Easy", solved: false },
    { id: 52, title: "Kth largest element", category: "Heaps & Priority Queues", difficulty: "Easy", solved: false },
    { id: 53, title: "Top K frequent elements", category: "Heaps & Priority Queues", difficulty: "Medium", solved: false },
    { id: 54, title: "Merge K sorted arrays/lists", category: "Heaps & Priority Queues", difficulty: "Hard", solved: false },
    { id: 55, title: "Find median from data stream", category: "Heaps & Priority Queues", difficulty: "Hard", solved: false },
    { id: 56, title: "Sort a nearly-sorted array (k-sorted)", category: "Heaps & Priority Queues", difficulty: "Medium", solved: false },
    { id: 57, title: "Reorganize string (no adjacent equal)", category: "Heaps & Priority Queues", difficulty: "Medium", solved: false },
    { id: 58, title: "Task scheduler (cooldown)", category: "Heaps & Priority Queues", difficulty: "Medium", solved: false },
    { id: 59, title: "Minimum cost to connect ropes", category: "Heaps & Priority Queues", difficulty: "Easy", solved: false },
    { id: 60, title: "Sliding window median", category: "Heaps & Priority Queues", difficulty: "Hard", solved: false },

    // Hashing & Sets
    { id: 61, title: "Two sum with hash map", category: "Hashing & Sets", difficulty: "Easy", solved: false },
    { id: 62, title: "Subarray with zero sum", category: "Hashing & Sets", difficulty: "Easy", solved: false },
    { id: 63, title: "Count distinct elements in window", category: "Hashing & Sets", difficulty: "Medium", solved: false },
    { id: 64, title: "Longest consecutive sequence", category: "Hashing & Sets", difficulty: "Medium", solved: false },
    { id: 65, title: "Check duplicates within K distance", category: "Hashing & Sets", difficulty: "Easy", solved: false },
    { id: 66, title: "Find first repeated character", category: "Hashing & Sets", difficulty: "Easy", solved: false },
    { id: 67, title: "Word frequency counter", category: "Hashing & Sets", difficulty: "Easy", solved: false },
    { id: 68, title: "Detect duplicates using set", category: "Hashing & Sets", difficulty: "Easy", solved: false },
    { id: 69, title: "Ransom note (construct from magazine)", category: "Hashing & Sets", difficulty: "Easy", solved: false },
    { id: 70, title: "Isomorphic strings", category: "Hashing & Sets", difficulty: "Easy", solved: false },

    // Recursion & Backtracking
    { id: 71, title: "Generate all subsets (power set)", category: "Recursion & Backtracking", difficulty: "Medium", solved: false },
    { id: 72, title: "Permutations of a string/array", category: "Recursion & Backtracking", difficulty: "Medium", solved: false },
    { id: 73, title: "Combination sum (no/with repetition)", category: "Recursion & Backtracking", difficulty: "Medium", solved: false },
    { id: 74, title: "N-Queens", category: "Recursion & Backtracking", difficulty: "Hard", solved: false },
    { id: 75, title: "Rat in a maze / Grid path backtracking", category: "Recursion & Backtracking", difficulty: "Medium", solved: false },
    { id: 76, title: "Sudoku solver", category: "Recursion & Backtracking", difficulty: "Hard", solved: false },
    { id: 77, title: "Letter combinations of a phone number", category: "Recursion & Backtracking", difficulty: "Medium", solved: false },
    { id: 78, title: "Word search in grid", category: "Recursion & Backtracking", difficulty: "Medium", solved: false },
    { id: 79, title: "Restore IP addresses", category: "Recursion & Backtracking", difficulty: "Medium", solved: false },
    { id: 80, title: "Subset sum / Partition into k subsets", category: "Recursion & Backtracking", difficulty: "Medium", solved: false },

    // Greedy
    { id: 81, title: "Activity selection (max non-overlapping intervals)", category: "Greedy", difficulty: "Easy", solved: false },
    { id: 82, title: "Minimum platforms (train schedule)", category: "Greedy", difficulty: "Easy", solved: false },
    { id: 83, title: "Fractional knapsack", category: "Greedy", difficulty: "Easy", solved: false },
    { id: 84, title: "Jump game (can reach end)", category: "Greedy", difficulty: "Medium", solved: false },
    { id: 85, title: "Gas station (circuit)", category: "Greedy", difficulty: "Medium", solved: false },
    { id: 86, title: "Split array into consecutive subsequences", category: "Greedy", difficulty: "Medium", solved: false },
    { id: 87, title: "Assign cookies", category: "Greedy", difficulty: "Easy", solved: false },
    { id: 88, title: "Candies distribution", category: "Greedy", difficulty: "Hard", solved: false },
    { id: 89, title: "Min arrows to burst balloons", category: "Greedy", difficulty: "Medium", solved: false },
    { id: 90, title: "Meeting rooms (min rooms required)", category: "Greedy", difficulty: "Easy", solved: false },

    // Graph Algorithms
    { id: 91, title: "DFS & BFS of graph", category: "Graph Algorithms", difficulty: "Easy", solved: false },
    { id: 92, title: "Detect cycle in undirected graph", category: "Graph Algorithms", difficulty: "Medium", solved: false },
    { id: 93, title: "Detect cycle in directed graph (Kahn/DFS)", category: "Graph Algorithms", difficulty: "Medium", solved: false },
    { id: 94, title: "Topological sort", category: "Graph Algorithms", difficulty: "Medium", solved: false },
    { id: 95, title: "Shortest path in unweighted graph", category: "Graph Algorithms", difficulty: "Easy", solved: false },
    { id: 96, title: "Dijkstra's algorithm", category: "Graph Algorithms", difficulty: "Medium", solved: false },
    { id: 97, title: "Bellman-Ford (negative weights)", category: "Graph Algorithms", difficulty: "Medium", solved: false },
    { id: 98, title: "Union-Find (Disjoint Set Union)", category: "Graph Algorithms", difficulty: "Medium", solved: false },
    { id: 99, title: "Number of islands", category: "Graph Algorithms", difficulty: "Medium", solved: false },
    { id: 100, title: "Clone graph", category: "Graph Algorithms", difficulty: "Medium", solved: false }
  ];

  const categories = [
    'all',
    'Arrays & Searching',
    'Strings',
    'Linked Lists',
    'Stacks & Queues',
    'Trees & BST',
    'Heaps & Priority Queues',
    'Hashing & Sets',
    'Recursion & Backtracking',
    'Greedy',
    'Graph Algorithms'
  ];

  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = problems.filter(problem => {
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.id.toString().includes(searchTerm);
    return matchesCategory && matchesSearch;
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
          <div className="flex items-center mb-4">
            <Link href="/practice" className="text-gray-600 hover:text-indigo-600 mr-4">
              ← Back to Practice
            </Link>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-seedling-line text-2xl text-green-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Easy-100</h1>
              <p className="text-xl text-gray-600">100 beginner-friendly problems to build your foundation</p>
            </div>
          </div>
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
              <div className="text-2xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-600 text-sm">Streak Days</div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mt-2">
                <i className="ri-trophy-line text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Problems</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by problem title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>
                        <i className="ri-folder-line mr-1"></i>
                        {problem.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
                      {problem.solved ? 'Review' : 'Start'}
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
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Easy-100 Learning Path</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Order</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <i className="ri-number-1 text-green-600 mr-2 mt-1"></i>
                  <span><strong>Arrays & Searching:</strong> Start with basic array operations and searching algorithms</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-number-2 text-green-600 mr-2 mt-1"></i>
                  <span><strong>Strings:</strong> Master string manipulation and pattern matching</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-number-3 text-green-600 mr-2 mt-1"></i>
                  <span><strong>Linked Lists:</strong> Learn pointer manipulation and memory management</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-number-4 text-green-600 mr-2 mt-1"></i>
                  <span><strong>Stacks & Queues:</strong> Understand LIFO and FIFO data structures</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-number-5 text-green-600 mr-2 mt-1"></i>
                  <span><strong>Trees & Heaps:</strong> Explore hierarchical data structures</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Success Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Focus on understanding the concept before jumping to coding</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Write clean, readable code with proper variable names</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Analyze time and space complexity for each solution</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Practice consistently - aim for 2-3 problems daily</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Review and optimize your solutions after completion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}