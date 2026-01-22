'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BinarySearchPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [array, setArray] = useState([11, 22, 25, 34, 50, 64, 76, 88, 90]);
  const [target, setTarget] = useState(64);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(8);
  const [mid, setMid] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const steps = [
    'Initialize left = 0, right = n-1',
    'Calculate mid = left + (right - left) / 2',
    'Compare arr[mid] with target',
    'If arr[mid] == target, return mid',
    'If arr[mid] < target, search right half',
    'If arr[mid] > target, search left half',
    'Repeat until left > right'
  ];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setLeft(0);
    setRight(array.length - 1);
    setMid(-1);
    setFoundIndex(-1);

    let l = 0;
    let r = array.length - 1;
    let stepCount = 0;

    while (l <= r) {
      setCurrentStep(1);
      const m = Math.floor(l + (r - l) / 2);
      setMid(m);
      setLeft(l);
      setRight(r);
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (array[m] === target) {
        setCurrentStep(3);
        setFoundIndex(m);
        await new Promise(resolve => setTimeout(resolve, 2000));
        break;
      } else if (array[m] < target) {
        setCurrentStep(4);
        await new Promise(resolve => setTimeout(resolve, 1000));
        l = m + 1;
      } else {
        setCurrentStep(5);
        await new Promise(resolve => setTimeout(resolve, 1000));
        r = m - 1;
      }

      stepCount++;
      if (stepCount > 10) break; // Prevent infinite loop
    }

    if (foundIndex === -1) {
      setCurrentStep(6);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsAnimating(false);
  };

  const resetArray = () => {
    setArray([11, 22, 25, 34, 50, 64, 76, 88, 90]);
    setTarget(64);
    setLeft(0);
    setRight(8);
    setMid(-1);
    setFoundIndex(-1);
    setCurrentStep(0);
  };

  const getHighlightColor = (index: number): string => {
    if (foundIndex === index) return 'bg-green-600 text-white border-green-600';
    if (mid === index) return 'bg-yellow-500 text-white border-yellow-500';
    if (index >= left && index <= right) return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-gray-100 text-gray-500 border-gray-200';
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-focus-line text-2xl text-green-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Binary Search</h1>
              <p className="text-gray-600">Divide and conquer search in sorted arrays</p>
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
                  min="11"
                  max="90"
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
                        className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-500 ${getHighlightColor(index)}`}
                      >
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">[{index}]</div>
                    </div>
                  ))}
                </div>

                {/* Range Indicators */}
                {(left !== 0 || right !== array.length - 1) && (
                  <div className="mt-4 text-center text-sm text-gray-600">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        Search Range: [{left}] to [{right}]
                      </span>
                    </div>
                    {mid !== -1 && (
                      <div>
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                          Mid Index: [{mid}] = {array[mid]}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {foundIndex !== -1 && (
                  <div className="text-center text-green-600 font-semibold mt-4">
                    Found {target} at index {foundIndex}!
                  </div>
                )}

                {foundIndex === -1 && !isAnimating && currentStep === 6 && (
                  <div className="text-center text-red-600 font-semibold mt-4">
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

            {/* Comparison */}
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
