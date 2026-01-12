'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function QuickSort() {
  const [array, setArray] = useState([10, 7, 8, 9, 1, 5, 3, 6, 2, 4]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number>(-1);
  const [partitionInfo, setPartitionInfo] = useState<{left: number, right: number} | null>(null);

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    setPivotIndex(high);
    setCurrentStep(`Partitioning with pivot ${pivot} at index ${high}`);
    await sleep(1000);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      setHighlightedIndices([j, high]);
      setCurrentStep(`Comparing ${arr[j]} with pivot ${pivot}`);
      await sleep(500);

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          setCurrentStep(`Swapping ${arr[i]} and ${arr[j]} (${arr[j]} < ${pivot})`);
          await sleep(500);
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          await sleep(500);
        }
      } else {
        setCurrentStep(`${arr[j]} >= ${pivot}, no swap needed`);
        await sleep(300);
      }
    }

    // Place pivot in correct position
    const finalPivotPos = i + 1;
    if (finalPivotPos !== high) {
      setCurrentStep(`Placing pivot ${pivot} at position ${finalPivotPos}`);
      await sleep(500);
      [arr[finalPivotPos], arr[high]] = [arr[high], arr[finalPivotPos]];
      setArray([...arr]);
      await sleep(500);
    }

    setHighlightedIndices([finalPivotPos]);
    setCurrentStep(`Pivot ${pivot} is now in its correct position at index ${finalPivotPos}`);
    await sleep(1000);

    return finalPivotPos;
  };

  const quickSortHelper = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      setPartitionInfo({ left: low, right: high });
      setCurrentStep(`Quick sorting subarray from index ${low} to ${high}`);
      await sleep(800);

      const pi = await partition(arr, low, high);
      
      setHighlightedIndices([]);
      setPivotIndex(-1);
      await sleep(500);

      // Recursively sort elements before and after partition
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const quickSort = async () => {
    setIsAnimating(true);
    const arr = [...array];
    
    setCurrentStep('Starting Quick Sort algorithm');
    await sleep(1000);
    
    await quickSortHelper(arr, 0, arr.length - 1);
    
    setArray(arr);
    setCurrentStep('Quick Sort completed! Array is now sorted.');
    setHighlightedIndices([]);
    setPivotIndex(-1);
    setPartitionInfo(null);
    setIsAnimating(false);
  };

  const resetArray = () => {
    setArray([10, 7, 8, 9, 1, 5, 3, 6, 2, 4]);
    setCurrentStep('');
    setHighlightedIndices([]);
    setPivotIndex(-1);
    setPartitionInfo(null);
  };

  const generateRandomArray = () => {
    const size = 10;
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 20) + 1);
    setArray(newArr);
    setCurrentStep('');
    setHighlightedIndices([]);
    setPivotIndex(-1);
    setPartitionInfo(null);
  };

  const getElementColor = (index: number) => {
    if (index === pivotIndex) {
      return 'border-red-500 bg-red-100 shadow-lg';
    }
    if (highlightedIndices.includes(index)) {
      return 'border-yellow-500 bg-yellow-100 shadow-lg';
    }
    if (partitionInfo && index >= partitionInfo.left && index <= partitionInfo.right) {
      return 'border-blue-300 bg-blue-50';
    }
    return 'border-gray-300 bg-gray-50';
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
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-flashlight-line text-2xl text-red-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Quick Sort</h1>
              <p className="text-xl text-gray-600">Efficient divide-and-conquer sorting algorithm</p>
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
                  <i className="ri-checkbox-circle-fill text-red-600 mr-2 mt-1"></i>
                  <span>Choose an element as pivot (usually last element)</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-red-600 mr-2 mt-1"></i>
                  <span>Partition array around pivot (smaller to left, larger to right)</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-red-600 mr-2 mt-1"></i>
                  <span>Recursively apply quick sort to subarrays</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-red-600 mr-2 mt-1"></i>
                  <span>Base case: subarray with one element is already sorted</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Complexity Analysis</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span><strong>Best Case:</strong></span>
                  <span>O(n log n)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Average Case:</strong></span>
                  <span>O(n log n)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Worst Case:</strong></span>
                  <span>O(n²)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Space Complexity:</strong></span>
                  <span>O(log n)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>In-place:</strong></span>
                  <span>Yes</span>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Array</h3>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {array.map((num, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${getElementColor(index)}`}
                >
                  <div className="text-lg font-bold text-gray-900">{num}</div>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-red-500 bg-red-100 rounded mr-2"></div>
                <span>Pivot</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-yellow-500 bg-yellow-100 rounded mr-2"></div>
                <span>Comparing</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-blue-300 bg-blue-50 rounded mr-2"></div>
                <span>Current Partition</span>
              </div>
            </div>
          </div>

          {/* Current Step */}
          {currentStep && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-medium">{currentStep}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={quickSort}
              disabled={isAnimating}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isAnimating ? 'Sorting...' : 'Start Quick Sort'}
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
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg">JavaScript</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Python</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Java</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">C++</button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`// Quick Sort Implementation
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quickSort(arr, low, high) {
  if (low < high) {
    // pi is partitioning index, arr[pi] is now at right place
    const pi = partition(arr, low, high);

    // Separately sort elements before and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }

  return arr;
}

// Usage
const array = [10, 7, 8, 9, 1, 5, 3, 6, 2, 4];
console.log(quickSort(array, 0, array.length - 1)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`}
            </pre>
          </div>
        </div>

        {/* Practice Problems */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Problems</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Implement Quick Sort</h3>
                  <p className="text-gray-600">Write your own implementation of quick sort from scratch</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Easy</span>
                    <span className="text-gray-500 text-sm">Time: 30 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Randomized Quick Sort</h3>
                  <p className="text-gray-600">Implement quick sort with random pivot selection to avoid worst case</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">Medium</span>
                    <span className="text-gray-500 text-sm">Time: 40 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quick Select Algorithm</h3>
                  <p className="text-gray-600">Use quick sort partitioning to find k-th smallest element</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded">Hard</span>
                    <span className="text-gray-500 text-sm">Time: 60 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Algorithms */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Sorting Algorithms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/data-structures/sorting/merge-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Merge Sort</h3>
                <p className="text-gray-600 text-sm">Stable divide-and-conquer sorting algorithm</p>
                <div className="mt-4 text-red-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/heap-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Heap Sort</h3>
                <p className="text-gray-600 text-sm">Comparison-based sorting using binary heap</p>
                <div className="mt-4 text-red-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/insertion-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Insertion Sort</h3>
                <p className="text-gray-600 text-sm">Simple comparison-based sorting algorithm</p>
                <div className="mt-4 text-red-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}