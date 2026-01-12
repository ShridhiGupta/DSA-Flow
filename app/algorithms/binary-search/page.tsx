'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function BinarySearchAlgorithm() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

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
              <Link href="/algorithms" className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                ← Back to Algorithms
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-focus-line text-2xl text-green-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Binary Search Algorithm</h1>
              <p className="text-gray-600">Divide and conquer search in sorted arrays</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Algorithm Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Algorithm Overview</h2>
              <div className="prose text-gray-600">
                <p className="mb-4">
                  Binary Search is an efficient searching algorithm that works on sorted arrays. It repeatedly divides the search interval in half to find the target value.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How it works:</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Initialize left = 0 and right = n-1</li>
                  <li>Calculate mid = left + (right - left) / 2</li>
                  <li>Compare arr[mid] with the target</li>
                  <li>If arr[mid] == target, return mid</li>
                  <li>If arr[mid] {'<'} target, search right half (left = mid + 1)</li>
                  <li>If arr[mid] {'>'} target, search left half (right = mid - 1)</li>
                  <li>Repeat until left {'>'} right</li>
                </ol>
              </div>
            </div>

            {/* Code Implementation */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Code Implementation</h3>
                <div className="flex space-x-2">
                  {['javascript', 'python', 'java', 'cpp'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        selectedLanguage === lang
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {lang === 'javascript' ? 'JavaScript' : lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  {selectedLanguage === 'javascript' && `// JavaScript Binary Search - O(log n)
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // Prevent overflow and calculate mid
        let mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found the target
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Target not found
}

// Example usage
let numbers = [11, 22, 25, 34, 50, 64, 76, 88, 90];
let index = binarySearch(numbers, 64); // Returns 5
console.log(\`Found at index: \${index}\`);`}
                  {selectedLanguage === 'python' && `# Python Binary Search - O(log n)
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        # Calculate mid point
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid  # Found the target
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Target not found

# Example usage
numbers = [11, 22, 25, 34, 50, 64, 76, 88, 90]
index = binary_search(numbers, 64)  # Returns 5
print(f"Found at index: {index}")`}
                  {selectedLanguage === 'java' && `// Java Binary Search - O(log n)
public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            // Prevent overflow and calculate mid
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid; // Found the target
            } else if (arr[mid] < target) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }
        return -1; // Target not found
    }
    
    public static void main(String[] args) {
        int[] numbers = {11, 22, 25, 34, 50, 64, 76, 88, 90};
        int index = binarySearch(numbers, 64); // Returns 5
        System.out.println("Found at index: " + index);
    }
}`}
                  {selectedLanguage === 'cpp' && `// C++ Binary Search - O(log n)
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        // Prevent overflow and calculate mid
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Found the target
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Target not found
}

int main() {
    vector<int> numbers = {11, 22, 25, 34, 50, 64, 76, 88, 90};
    int index = binarySearch(numbers, 64); // Returns 5
    cout << "Found at index: " << index << endl;
    return 0;
}`}
                </pre>
              </div>
            </div>

            {/* Interactive Demo Link */}
            <div className="bg-green-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Try Interactive Demo</h3>
                  <p className="text-gray-600">Experience Binary Search with step-by-step visualization</p>
                </div>
                <Link 
                  href="/data-structures/searching/binary-search"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Launch Demo
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Complexity Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complexity Analysis</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Time Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Best Case:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Case:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worst Case:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(log n)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">O(1)</span>
                </div>
              </div>
            </div>

            {/* Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Algorithm Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Requires sorted data</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Very efficient for large datasets</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>No extra space required</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-close-line text-red-600 mr-2"></i>
                  <span>Only works on sorted arrays</span>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Use Cases</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <span className="font-semibold">Large sorted datasets</span>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <span className="font-semibold">Database queries</span>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <span className="font-semibold">Binary search trees</span>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <span className="font-semibold">Range searches</span>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-700 mb-1">For n = 1,000,000:</div>
                  <div className="text-gray-600">Linear: ~500,000 comparisons</div>
                  <div className="text-gray-600">Binary: ~20 comparisons</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-700 mb-1">Efficiency Gain:</div>
                  <div className="text-gray-600">25,000x faster!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
