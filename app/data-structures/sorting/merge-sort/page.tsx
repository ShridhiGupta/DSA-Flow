'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MergeSort() {
  const [array, setArray] = useState([38, 27, 43, 3, 9, 82, 10, 19, 5, 12]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [mergeIndices, setMergeIndices] = useState<{left: number[], right: number[]} | null>(null);
  const [tempArray, setTempArray] = useState<number[]>([]);

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    setCurrentStep(`Merging [${leftArr.join(', ')}] and [${rightArr.join(', ')}]`);
    setMergeIndices({ left: leftArr.map((_, i) => left + i), right: rightArr.map((_, i) => mid + 1 + i) });
    await sleep(1000);

    let i = 0, j = 0, k = left;
    const merged: number[] = [];

    while (i < leftArr.length && j < rightArr.length) {
      setHighlightedIndices([left + i, mid + 1 + j]);
      
      if (leftArr[i] <= rightArr[j]) {
        setCurrentStep(`Comparing ${leftArr[i]} and ${rightArr[j]}: ${leftArr[i]} <= ${rightArr[j]}, taking ${leftArr[i]}`);
        merged.push(leftArr[i]);
        arr[k] = leftArr[i];
        i++;
      } else {
        setCurrentStep(`Comparing ${leftArr[i]} and ${rightArr[j]}: ${leftArr[i]} > ${rightArr[j]}, taking ${rightArr[j]}`);
        merged.push(rightArr[j]);
        arr[k] = rightArr[j];
        j++;
      }
      
      setArray([...arr]);
      setTempArray([...merged]);
      await sleep(800);
      k++;
    }

    // Copy remaining elements
    while (i < leftArr.length) {
      setCurrentStep(`Copying remaining ${leftArr[i]} from left array`);
      setHighlightedIndices([left + i]);
      merged.push(leftArr[i]);
      arr[k] = leftArr[i];
      setArray([...arr]);
      setTempArray([...merged]);
      await sleep(500);
      i++;
      k++;
    }

    while (j < rightArr.length) {
      setCurrentStep(`Copying remaining ${rightArr[j]} from right array`);
      setHighlightedIndices([mid + 1 + j]);
      merged.push(rightArr[j]);
      arr[k] = rightArr[j];
      setArray([...arr]);
      setTempArray([...merged]);
      await sleep(500);
      j++;
      k++;
    }

    setCurrentStep(`Merge completed: [${merged.join(', ')}]`);
    setHighlightedIndices(Array.from({ length: right - left + 1 }, (_, i) => left + i));
    await sleep(1000);
    setMergeIndices(null);
  };

  const mergeSortHelper = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      setCurrentStep(`Dividing array from index ${left} to ${right}, mid = ${mid}`);
      setHighlightedIndices(Array.from({ length: right - left + 1 }, (_, i) => left + i));
      await sleep(1000);

      // Recursively sort left and right halves
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);

      // Merge the sorted halves
      await merge(arr, left, mid, right);
      setHighlightedIndices([]);
    }
  };

  const mergeSort = async () => {
    setIsAnimating(true);
    const arr = [...array];
    
    setCurrentStep('Starting Merge Sort algorithm');
    await sleep(1000);
    
    await mergeSortHelper(arr, 0, arr.length - 1);
    
    setArray(arr);
    setCurrentStep('Merge Sort completed! Array is now sorted.');
    setHighlightedIndices([]);
    setMergeIndices(null);
    setTempArray([]);
    setIsAnimating(false);
  };

  const resetArray = () => {
    setArray([38, 27, 43, 3, 9, 82, 10, 19, 5, 12]);
    setCurrentStep('');
    setHighlightedIndices([]);
    setMergeIndices(null);
    setTempArray([]);
  };

  const generateRandomArray = () => {
    const size = 10;
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArr);
    setCurrentStep('');
    setHighlightedIndices([]);
    setMergeIndices(null);
    setTempArray([]);
  };

  const getElementColor = (index: number) => {
    if (mergeIndices?.left.includes(index)) {
      return 'border-blue-500 bg-blue-100 shadow-lg';
    }
    if (mergeIndices?.right.includes(index)) {
      return 'border-green-500 bg-green-100 shadow-lg';
    }
    if (highlightedIndices.includes(index)) {
      return 'border-purple-500 bg-purple-100 shadow-lg';
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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-git-merge-line text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Merge Sort</h1>
              <p className="text-xl text-gray-600">Stable divide-and-conquer sorting algorithm</p>
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
                  <i className="ri-checkbox-circle-fill text-purple-600 mr-2 mt-1"></i>
                  <span>Divide the array into two halves recursively</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-purple-600 mr-2 mt-1"></i>
                  <span>Continue dividing until each subarray has one element</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-purple-600 mr-2 mt-1"></i>
                  <span>Merge sorted subarrays back together in order</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-purple-600 mr-2 mt-1"></i>
                  <span>Base case: array with one element is already sorted</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Complexity Analysis</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span><strong>Time Complexity:</strong></span>
                  <span>O(n log n)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Space Complexity:</strong></span>
                  <span>O(n)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Best Case:</strong></span>
                  <span>O(n log n)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Worst Case:</strong></span>
                  <span>O(n log n)</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Stable:</strong></span>
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
                <div className="w-4 h-4 border-2 border-blue-500 bg-blue-100 rounded mr-2"></div>
                <span>Left Subarray</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-green-500 bg-green-100 rounded mr-2"></div>
                <span>Right Subarray</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-purple-500 bg-purple-100 rounded mr-2"></div>
                <span>Comparing</span>
              </div>
            </div>
          </div>

          {/* Temp Array Display */}
          {tempArray.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Merged Result</h3>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {tempArray.map((num, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-lg flex items-center justify-center border-2 border-purple-300 bg-purple-50"
                  >
                    <div className="text-lg font-bold text-gray-900">{num}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Step */}
          {currentStep && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <p className="text-purple-800 font-medium">{currentStep}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={mergeSort}
              disabled={isAnimating}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isAnimating ? 'Sorting...' : 'Start Merge Sort'}
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
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">JavaScript</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Python</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Java</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">C++</button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`// Merge Sort Implementation
function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;

  // Merge the two arrays back into arr[left..right]
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  // Copy remaining elements of leftArr if any
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  // Copy remaining elements of rightArr if any
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}

function mergeSort(arr, left, right) {
  if (left < right) {
    // Same as (left+right)/2, but avoids overflow
    const mid = Math.floor((left + right) / 2);

    // Sort first and second halves
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);

    // Merge the sorted halves
    merge(arr, left, mid, right);
  }

  return arr;
}

// Usage
const array = [38, 27, 43, 3, 9, 82, 10, 19, 5, 12];
console.log(mergeSort(array, 0, array.length - 1)); // [3, 5, 9, 10, 12, 19, 27, 38, 43, 82]`}
            </pre>
          </div>
        </div>

        {/* Practice Problems */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Problems</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Implement Merge Sort</h3>
                  <p className="text-gray-600">Write your own implementation of merge sort from scratch</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Easy</span>
                    <span className="text-gray-500 text-sm">Time: 30 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">In-place Merge Sort</h3>
                  <p className="text-gray-600">Implement merge sort without using extra space</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">Medium</span>
                    <span className="text-gray-500 text-sm">Time: 45 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Count Inversions</h3>
                  <p className="text-gray-600">Use merge sort to count inversions in an array</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded">Hard</span>
                    <span className="text-gray-500 text-sm">Time: 60 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Algorithms */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Sorting Algorithms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/data-structures/sorting/quick-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Sort</h3>
                <p className="text-gray-600 text-sm">Efficient divide-and-conquer sorting algorithm</p>
                <div className="mt-4 text-purple-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/heap-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Heap Sort</h3>
                <p className="text-gray-600 text-sm">Comparison-based sorting using binary heap</p>
                <div className="mt-4 text-purple-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/insertion-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Insertion Sort</h3>
                <p className="text-gray-600 text-sm">Simple comparison-based sorting algorithm</p>
                <div className="mt-4 text-purple-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}