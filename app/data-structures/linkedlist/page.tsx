'use client';

import Link from 'next/link';

export default function LinkedListPage() {
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
            <nav className="flex items-center space-x-4">
              <Link href="/data-structures" className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                ← Back to Data Structures
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-links-line text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Linked List</h1>
              <p className="text-gray-600">Linear data structure where elements are stored in nodes with pointers</p>
            </div>
          </div>
        </div>

        {/* Linked List Types Blocks */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Singly Linked List Block */}
          <Link href="/data-structures/linkedlist/singly-linkedlist">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                  <i className="ri-arrow-right-line text-2xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Singly Linked List</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Each node points to the next node in sequence. Simple and memory efficient.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Unidirectional traversal</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Memory efficient</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Simple implementation</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Insertion</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Deletion</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Search</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Traversal</span>
              </div>
            </div>
          </Link>

          {/* Doubly Linked List Block */}
          <Link href="/data-structures/linkedlist/doubly-linkedlist">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                  <i className="ri-arrow-left-right-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Doubly Linked List</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Each node has pointers to both next and previous nodes. Bidirectional traversal.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Bidirectional traversal</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Efficient deletion</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Reverse navigation</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Bidirectional</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Reverse Traversal</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Efficient Deletion</span>
              </div>
            </div>
          </Link>

          {/* Circular Linked List Block */}
          <Link href="/data-structures/linkedlist/circular-linkedlist">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                  <i className="ri-refresh-line text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">Circular Linked List</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Last node points back to first node. Forms a circular structure.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Circular traversal</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>No null termination</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  <span>Round robin scheduling</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Circular</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Infinite Traversal</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Round Robin</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-purple-900">Singly</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Doubly</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-green-900">Circular</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Memory Usage</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">Low</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">Medium</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">Low</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Traversal Direction</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">Forward only</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">Both directions</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">Forward only</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium">Deletion Complexity</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">O(n)</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">O(1) with node</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">O(n)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Use Cases</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">Stacks, Queues</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">Browser history</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">Round Robin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* When to Use Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Use Linked Lists</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <i className="ri-check-double-line text-green-600 mr-2"></i>
                Ideal Scenarios
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Dynamic Memory Allocation</h4>
                  <p className="text-sm text-gray-700">When you need frequent insertions/deletions and don't know the exact size beforehand</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Sequential Access</h4>
                  <p className="text-sm text-gray-700">When you primarily traverse data sequentially rather than random access</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Memory Efficiency</h4>
                  <p className="text-sm text-gray-700">When memory overhead is acceptable and you need flexible sizing</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <i className="ri-close-circle-line text-red-600 mr-2"></i>
                Avoid When
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Random Access Required</h4>
                  <p className="text-sm text-gray-700">When you need frequent O(1) access to elements by index (use arrays instead)</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Memory Constraints</h4>
                  <p className="text-sm text-gray-700">When memory is tight due to pointer overhead (use arrays instead)</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Cache Performance Critical</h4>
                  <p className="text-sm text-gray-700">When cache locality is important (arrays have better cache performance)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}