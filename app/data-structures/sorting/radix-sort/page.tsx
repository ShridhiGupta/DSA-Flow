'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RadixSort() {
  const [array, setArray] = useState([170, 45, 75, 90, 802, 24, 2, 66]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [currentDigit, setCurrentDigit] = useState(0);

  const getMax = (arr: number[]) => {
    return Math.max(...arr);
  };

  const countingSort = (arr: number[], exp: number) => {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);
    
    // Store count of occurrences
    for (let i = 0; i < arr.length; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }
    
    // Change count[i] so that count[i] contains actual position
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
    
    return output;
  };

  const radixSort = async () => {
    setIsAnimating(true);
    const arr = [...array];
    const max = getMax(arr);
    
    setCurrentStep(`Starting Radix Sort. Maximum element: ${max}`);
    await sleep(1000);
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      setCurrentDigit(exp);
      setCurrentStep(`Sorting by digit place ${exp} (10^${Math.log10(exp)})`);
      setHighlightedIndices([]);
      
      await sleep(1000);
      
      const newArr = countingSort(arr, exp);
      setArray([...newArr]);
      
      setCurrentStep(`Array after sorting by digit place ${exp}: [${newArr.join(', ')}]`);
      await sleep(1500);
    }
    
    setCurrentStep('Radix Sort completed! Array is now sorted.');
    setCurrentDigit(0);
    setHighlightedIndices([]);
    setIsAnimating(false);
  };

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const resetArray = () => {
    setArray([170, 45, 75, 90, 802, 24, 2, 66]);
    setCurrentStep('');
    setHighlightedIndices([]);
    setCurrentDigit(0);
  };

  const generateRandomArray = () => {
    const size = 8;
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
    setArray(newArr);
    setCurrentStep('');
    setHighlightedIndices([]);
    setCurrentDigit(0);
  };

  const getDigitColor = (num: number, digitPlace: number) => {
    if (digitPlace === 0) return 'bg-blue-100';
    const digit = Math.floor(num / digitPlace) % 10;
    const colors = [
      'bg-red-100', 'bg-orange-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100',
      'bg-indigo-100', 'bg-purple-100', 'bg-pink-100', 'bg-gray-100', 'bg-teal-100'
    ];
    return colors[digit];
  };

  const getDigit = (num: number, digitPlace: number) => {
    return Math.floor(num / digitPlace) % 10;
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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-sort-number-asc text-2xl text-blue-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Radix Sort</h1>
              <p className="text-xl text-gray-600">Non-comparative sorting algorithm</p>
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
                  <i className="ri-checkbox-circle-fill text-blue-600 mr-2 mt-1"></i>
                  <span>Sorts numbers digit by digit from least significant to most significant</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-blue-600 mr-2 mt-1"></i>
                  <span>Uses counting sort as a subroutine to sort each digit position</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-blue-600 mr-2 mt-1"></i>
                  <span>Processes each digit place (ones, tens, hundreds, etc.)</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-blue-600 mr-2 mt-1"></i>
                  <span>Stable sorting maintains relative order of equal elements</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Complexity Analysis</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span><strong>Time Complexity:</strong></span>
                  <span>O(d × (n + k))</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Space Complexity:</strong></span>
                  <span>O(n + k)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Where:</strong></span>
                  <span>d = number of digits, n = array size, k = range (0-9)</span>
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
          
          {/* Array Display */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {array.map((num, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center border-2 ${
                    highlightedIndices.includes(index) 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-gray-300'
                  } ${currentDigit > 0 ? getDigitColor(num, currentDigit) : 'bg-gray-50'}`}
                >
                  <div className="text-lg font-bold text-gray-900">{num}</div>
                  {currentDigit > 0 && (
                    <div className="text-xs text-gray-600">
                      {getDigit(num, currentDigit)}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {currentDigit > 0 && (
              <div className="text-center text-sm text-gray-600 mb-4">
                Current digit place: {currentDigit} (10^{Math.log10(currentDigit)})
              </div>
            )}
          </div>

          {/* Current Step */}
          {currentStep && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">{currentStep}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={radixSort}
              disabled={isAnimating}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isAnimating ? 'Sorting...' : 'Start Radix Sort'}
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
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">JavaScript</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Python</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Java</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">C++</button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`// Radix Sort Implementation
function getMax(arr) {
  return Math.max(...arr);
}

function countingSort(arr, exp) {
  const output = new Array(arr.length).fill(0);
  const count = new Array(10).fill(0);
  
  // Store count of occurrences
  for (let i = 0; i < arr.length; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  // Change count[i] so that count[i] contains actual position
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  return output;
}

function radixSort(arr) {
  const max = getMax(arr);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    arr = countingSort(arr, exp);
  }
  
  return arr;
}

// Usage
const array = [170, 45, 75, 90, 802, 24, 2, 66];
console.log(radixSort(array)); // [2, 24, 45, 66, 75, 90, 170, 802]`}
            </pre>
          </div>
        </div>

        {/* Practice Problems */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Problems</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Implement Radix Sort</h3>
                  <p className="text-gray-600">Write your own implementation of radix sort from scratch</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Easy</span>
                    <span className="text-gray-500 text-sm">Time: 30 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sort Large Numbers</h3>
                  <p className="text-gray-600">Apply radix sort to sort an array of large numbers efficiently</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">Medium</span>
                    <span className="text-gray-500 text-sm">Time: 45 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">String Radix Sort</h3>
                  <p className="text-gray-600">Adapt radix sort to sort strings of varying lengths</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded">Hard</span>
                    <span className="text-gray-500 text-sm">Time: 60 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Algorithms */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Sorting Algorithms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/data-structures/sorting/counting-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Counting Sort</h3>
                <p className="text-gray-600 text-sm">Non-comparative sorting algorithm for small range integers</p>
                <div className="mt-4 text-blue-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/quick-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Sort</h3>
                <p className="text-gray-600 text-sm">Efficient divide-and-conquer sorting algorithm</p>
                <div className="mt-4 text-blue-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/merge-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Merge Sort</h3>
                <p className="text-gray-600 text-sm">Stable divide-and-conquer sorting algorithm</p>
                <div className="mt-4 text-blue-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}