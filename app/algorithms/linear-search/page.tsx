'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LinearSearchPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 76, 50]);
  const [target, setTarget] = useState(22);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const steps = [
    'Start from the first element (index 0)',
    'Compare current element with target',
    'If match found, return index',
    'If no match, move to next element',
    'Continue until end of array'
  ];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setHighlightIndex(-1);
    setFoundIndex(-1);

    for (let i = 0; i < array.length; i++) {
      setHighlightIndex(i);
      setCurrentStep(Math.min(i + 1, steps.length - 1));

      if (array[i] === target) {
        setFoundIndex(i);
        setCurrentStep(2);
        await new Promise(resolve => setTimeout(resolve, 2000));
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 800));
    }

    if (foundIndex === -1) {
      setCurrentStep(4);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsAnimating(false);
  };

  const resetArray = () => {
    setArray([64, 34, 25, 12, 22, 11, 90, 88, 76, 50]);
    setTarget(22);
    setHighlightIndex(-1);
    setFoundIndex(-1);
    setCurrentStep(0);
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
            <nav className="flex items-center space-x-4">
              <Link href="/data-structures/searching" className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                ← Back to Searching
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
              <h1 className="text-4xl font-bold text-gray-900">Linear Search</h1>
              <p className="text-gray-600">Sequential search through elements until target is found</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Visualization Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Interactive Visualization</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={runAnimation}
                    disabled={isAnimating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isAnimating ? 'Searching...' : 'Start Search'}
                  </button>
                  <button
                    onClick={resetArray}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Target Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Value: {target}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  disabled={isAnimating}
                  className="w-full"
                />
              </div>

              {/* Array Visualization */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4 flex-wrap">
                  {array.map((value, index) => (
                    <div key={`${index}-${value}`} className="flex flex-col items-center mb-2">
                      <div
                        className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-500 ${
                          foundIndex === index
                            ? 'bg-green-600 text-white border-green-600 scale-110'
                            : highlightIndex === index
                            ? 'bg-yellow-500 text-white border-yellow-500 scale-110'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">[{index}]</div>
                    </div>
                  ))}
                </div>

                {foundIndex !== -1 && (
                  <div className="text-center text-green-600 font-semibold">
                    Found {target} at index {foundIndex}!
                  </div>
                )}

                {foundIndex === -1 && !isAnimating && currentStep === 4 && (
                  <div className="text-center text-red-600 font-semibold">
                    {target} not found in the array
                  </div>
                )}
              </div>

              {/* Step-by-Step Display */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Algorithm Steps</h3>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 rounded-lg ${
                        currentStep === index && isAnimating
                          ? 'bg-indigo-100 text-indigo-800'
                          : currentStep > index && isAnimating
                          ? 'bg-green-100 text-green-800'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          currentStep === index && isAnimating
                            ? 'bg-indigo-600 text-white'
                            : currentStep > index && isAnimating
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
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
          </div>

          {/* Info Panel */}
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

            {/* Comparison */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">vs Binary Search</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-700 mb-1">Linear Search</div>
                  <div className="text-gray-600">✓ Unsorted data</div>
                  <div className="text-gray-600">✗ O(n) time complexity</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-700 mb-1">Binary Search</div>
                  <div className="text-gray-600">✗ Requires sorted data</div>
                  <div className="text-gray-600">✓ O(log n) time complexity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
