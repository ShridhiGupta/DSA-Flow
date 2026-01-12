'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CountingSort() {
  const [array, setArray] = useState([4, 2, 2, 8, 3, 3, 1, 7, 5, 6]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [countArray, setCountArray] = useState<number[]>([]);
  const [outputArray, setOutputArray] = useState<number[]>([]);

  const countingSort = async () => {
    setIsAnimating(true);
    const arr = [...array];
    const max = Math.max(...arr);
    
    setCurrentStep(`Starting Counting Sort. Maximum element: ${max}`);
    await sleep(1000);
    
    // Step 1: Create count array
    const count = new Array(max + 1).fill(0);
    setCurrentStep(`Step 1: Creating count array of size ${max + 1}`);
    setCountArray([...count]);
    await sleep(1000);
    
    // Step 2: Store count of each element
    setCurrentStep(`Step 2: Counting occurrences of each element`);
    for (let i = 0; i < arr.length; i++) {
      count[arr[i]]++;
      setCountArray([...count]);
      setHighlightedIndices([i]);
      setCurrentStep(`Counting element ${arr[i]} at index ${i}: count[${arr[i]}] = ${count[arr[i]]}`);
      await sleep(300);
    }
    setHighlightedIndices([]);
    await sleep(1000);
    
    // Step 3: Transform count array to contain actual positions
    setCurrentStep(`Step 3: Transforming count array to contain actual positions`);
    for (let i = 1; i <= max; i++) {
      count[i] += count[i - 1];
      setCountArray([...count]);
      setCurrentStep(`Updated count[${i}] = count[${i}] + count[${i - 1}] = ${count[i]}`);
      await sleep(300);
    }
    await sleep(1000);
    
    // Step 4: Build the output array
    const output = new Array(arr.length).fill(0);
    setCurrentStep(`Step 4: Building the output array`);
    for (let i = arr.length - 1; i >= 0; i--) {
      const element = arr[i];
      const position = count[element] - 1;
      output[position] = element;
      count[element]--;
      setOutputArray([...output]);
      setCountArray([...count]);
      setHighlightedIndices([i]);
      setCurrentStep(`Placing ${element} at position ${position}`);
      await sleep(500);
    }
    
    setArray(output);
    setCurrentStep('Counting Sort completed! Array is now sorted.');
    setHighlightedIndices([]);
    setCountArray([]);
    setOutputArray([]);
    setIsAnimating(false);
  };

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const resetArray = () => {
    setArray([4, 2, 2, 8, 3, 3, 1, 7, 5, 6]);
    setCurrentStep('');
    setHighlightedIndices([]);
    setCountArray([]);
    setOutputArray([]);
  };

  const generateRandomArray = () => {
    const size = 10;
    const maxVal = 9;
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * (maxVal + 1)));
    setArray(newArr);
    setCurrentStep('');
    setHighlightedIndices([]);
    setCountArray([]);
    setOutputArray([]);
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
            <Link href="/data-structures" className="text-gray-600 hover:text-indigo-600 mr-4">
              ← Back to Data Structures
            </Link>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-hashtag text-2xl text-green-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Counting Sort</h1>
              <p className="text-xl text-gray-600">Non-comparative integer sorting algorithm</p>
            </div>
          </div>
        </div>

        {/* Algorithm Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Algorithm Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How it Works</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                  <span>Counts the occurrences of each distinct element in the input array</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                  <span>Calculates the cumulative count to determine positions</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                  <span>Places elements in correct positions in output array</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                  <span>Ideal for sorting integers within a specific range</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Complexity Analysis</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span><strong>Time Complexity:</strong></span>
                  <span>O(n + k)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Space Complexity:</strong></span>
                  <span>O(k)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Where:</strong></span>
                  <span>n = array size, k = range of input</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Stable:</strong></span>
                  <span>Yes</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>In-place:</strong></span>
                  <span>No</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Visualization</h2>
          
          {/* Original Array */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Original Array</h3>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {array.map((num, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${
                    highlightedIndices.includes(index) 
                      ? 'border-green-500 shadow-lg bg-green-100' 
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="text-lg font-bold text-gray-900">{num}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Count Array */}
          {countArray.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Count Array</h3>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {countArray.map((count, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-lg flex items-center justify-center border-2 border-blue-300 bg-blue-50"
                  >
                    <div className="text-sm">
                      <div className="font-bold text-gray-900">{index}</div>
                      <div className="text-blue-600">{count}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Output Array */}
          {outputArray.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Output Array</h3>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {outputArray.map((num, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${
                      num !== 0 
                        ? 'border-purple-500 bg-purple-100' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="text-lg font-bold text-gray-900">{num || ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Step */}
          {currentStep && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium">{currentStep}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={countingSort}
              disabled={isAnimating}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isAnimating ? 'Sorting...' : 'Start Counting Sort'}
            </button>
            <button
              onClick={resetArray}
              disabled={isAnimating}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Reset Array
            </button>
            <button
              onClick={generateRandomArray}
              disabled={isAnimating}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Random Array
            </button>
          </div>
        </div>

        {/* Code Implementation */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Code Implementation</h2>
          
          <div className="mb-4">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg">JavaScript</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Python</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Java</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">C++</button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`// Counting Sort Implementation
function countingSort(arr) {
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  const output = new Array(arr.length).fill(0);
  
  // Store count of each element
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }
  
  // Store cumulative count
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  return output;
}

// Usage
const array = [4, 2, 2, 8, 3, 3, 1, 7, 5, 6];
console.log(countingSort(array)); // [1, 2, 2, 3, 3, 4, 5, 6, 7, 8]`}
            </pre>
          </div>
        </div>

        {/* Practice Problems */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Problems</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Implement Counting Sort</h3>
                  <p className="text-gray-600">Write your own implementation of counting sort from scratch</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Easy</span>
                    <span className="text-gray-500 text-sm">Time: 25 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sort Characters</h3>
                  <p className="text-gray-600">Use counting sort to sort an array of characters</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">Medium</span>
                    <span className="text-gray-500 text-sm">Time: 35 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Negative Numbers</h3>
                  <p className="text-gray-600">Adapt counting sort to handle negative numbers</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded">Hard</span>
                    <span className="text-gray-500 text-sm">Time: 50 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Algorithms */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Sorting Algorithms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/data-structures/sorting/radix-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Radix Sort</h3>
                <p className="text-gray-600 text-sm">Non-comparative sorting using counting sort as subroutine</p>
                <div className="mt-4 text-green-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/quick-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Sort</h3>
                <p className="text-gray-600 text-sm">Efficient divide-and-conquer sorting algorithm</p>
                <div className="mt-4 text-green-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/merge-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Merge Sort</h3>
                <p className="text-gray-600 text-sm">Stable divide-and-conquer sorting algorithm</p>
                <div className="mt-4 text-green-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}