'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LinearSearchAlgorithm() {
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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-search-line text-2xl text-blue-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Linear Search Algorithm</h1>
              <p className="text-gray-600">Sequential search through elements until target is found</p>
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
                  Linear Search is the simplest searching algorithm that sequentially checks each element in a list until a match is found or the whole list has been searched.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How it works:</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Start from the first element of the array</li>
                  <li>Compare each element with the target value</li>
                  <li>If a match is found, return the index</li>
                  <li>If no match is found after checking all elements, return -1</li>
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
                  {selectedLanguage === 'javascript' && `// JavaScript Linear Search - O(n)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Element not found
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50];
let index = linearSearch(numbers, 22); // Returns 4
console.log(\`Found at index: \${index}\`);`}
                  {selectedLanguage === 'python' && `# Python Linear Search - O(n)
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return index if found
    return -1  # Element not found

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50]
index = linear_search(numbers, 22)  # Returns 4
print(f"Found at index: {index}")`}
                  {selectedLanguage === 'java' && `// Java Linear Search - O(n)
public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Return index if found
            }
        }
        return -1; // Element not found
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50};
        int index = linearSearch(numbers, 22); // Returns 4
        System.out.println("Found at index: " + index);
    }
}`}
                  {selectedLanguage === 'cpp' && `// C++ Linear Search - O(n)
#include <iostream>
#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Return index if found
        }
    }
    return -1; // Element not found
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50};
    int index = linearSearch(numbers, 22); // Returns 4
    cout << "Found at index: " << index << endl;
    return 0;
}`}
                </pre>
              </div>
            </div>

            {/* Interactive Demo Link */}
            <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Try Interactive Demo</h3>
                  <p className="text-gray-600">Experience Linear Search with step-by-step visualization</p>
                </div>
                <Link 
                  href="/data-structures/searching/linear-search"
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
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worst Case:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(n)</span>
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
                  <span>Works on unsorted data</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Simple to implement</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>No extra space required</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-close-line text-red-600 mr-2"></i>
                  <span>Slow for large datasets</span>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Use Cases</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <span className="font-semibold">Small datasets</span>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <span className="font-semibold">Unsorted arrays</span>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <span className="font-semibold">One-time searches</span>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <span className="font-semibold">Linked lists</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
