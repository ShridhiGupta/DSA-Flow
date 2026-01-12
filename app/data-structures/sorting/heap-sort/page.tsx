'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HeapSort() {
  const [array, setArray] = useState([12, 11, 13, 5, 6, 7, 2, 9, 4, 10]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [heapSize, setHeapSize] = useState(0);
  const [heapType, setHeapType] = useState<'max' | 'min'>('max');

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    setHighlightedIndices([i, left, right]);

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
      setCurrentStep(`Left child ${arr[left]} > parent ${arr[i]}, updating largest to ${left}`);
    } else {
      setCurrentStep(`Left child ${arr[left]} <= parent ${arr[i]}, largest remains ${i}`);
    }
    await sleep(800);

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
      setCurrentStep(`Right child ${arr[right]} > current largest ${arr[largest === i ? i : left]}, updating largest to ${right}`);
    } else {
      setCurrentStep(`Right child ${arr[right]} <= current largest ${arr[largest]}, largest remains ${largest}`);
    }
    await sleep(800);

    if (largest !== i) {
      setCurrentStep(`Swapping ${arr[i]} and ${arr[largest]}`);
      await sleep(500);
      
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      
      await sleep(500);
      setCurrentStep(`Recursively heapifying at index ${largest}`);
      await heapify(arr, n, largest);
    } else {
      setCurrentStep(`Heap property satisfied at index ${i}`);
    }
  };

  const buildHeap = async (arr: number[]) => {
    const n = arr.length;
    setCurrentStep(`Building max heap from array of size ${n}`);
    await sleep(1000);

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      setCurrentStep(`Heapifying node at index ${i} (value: ${arr[i]})`);
      await heapify(arr, n, i);
      setHighlightedIndices([]);
      await sleep(500);
    }

    setCurrentStep('Max heap built successfully!');
    await sleep(1000);
  };

  const heapSort = async () => {
    setIsAnimating(true);
    const arr = [...array];
    const n = arr.length;
    setHeapSize(n);

    // Build max heap
    await buildHeap(arr);

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      setCurrentStep(`Swapping root ${arr[0]} with last element ${arr[i]}`);
      setHighlightedIndices([0, i]);
      await sleep(800);

      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      setHeapSize(i);

      await sleep(500);
      setCurrentStep(`Heapifying root for reduced heap size ${i}`);
      await heapify(arr, i, 0);
      setHighlightedIndices([]);
      await sleep(500);
    }

    setArray(arr);
    setCurrentStep('Heap Sort completed! Array is now sorted.');
    setHeapSize(0);
    setIsAnimating(false);
  };

  const resetArray = () => {
    setArray([12, 11, 13, 5, 6, 7, 2, 9, 4, 10]);
    setCurrentStep('');
    setHighlightedIndices([]);
    setHeapSize(0);
  };

  const generateRandomArray = () => {
    const size = 10;
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 20) + 1);
    setArray(newArr);
    setCurrentStep('');
    setHighlightedIndices([]);
    setHeapSize(0);
  };

  const getHeapColor = (index: number) => {
    if (highlightedIndices.includes(index)) {
      return 'border-orange-500 bg-orange-100 shadow-lg';
    }
    if (index < heapSize) {
      return 'border-blue-300 bg-blue-50';
    }
    return 'border-gray-300 bg-gray-50';
  };

  const getHeapLevel = (index: number) => {
    return Math.floor(Math.log2(index + 1));
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
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-stack-line text-2xl text-orange-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Heap Sort</h1>
              <p className="text-xl text-gray-600">Comparison-based sorting using binary heap</p>
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
                  <i className="ri-checkbox-circle-fill text-orange-600 mr-2 mt-1"></i>
                  <span>Build a max heap from the input array</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-orange-600 mr-2 mt-1"></i>
                  <span>Repeatedly extract the maximum element from heap</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-orange-600 mr-2 mt-1"></i>
                  <span>Place extracted element at the end of array</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-orange-600 mr-2 mt-1"></i>
                  <span>Reduce heap size and heapify the root</span>
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
                  <span>O(1)</span>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Array {heapSize > 0 ? `(Heap Size: ${heapSize})` : ''}
            </h3>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {array.map((num, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${getHeapColor(index)}`}
                >
                  <div className="text-lg font-bold text-gray-900">{num}</div>
                </div>
              ))}
            </div>
            
            {heapSize > 0 && (
              <div className="text-center text-sm text-gray-600 mb-4">
                <div className="mb-2">Heap Structure:</div>
                <div className="inline-block bg-gray-100 rounded p-3">
                  {array.slice(0, heapSize).map((num, index) => {
                    const level = getHeapLevel(index);
                    const indent = '  '.repeat(level);
                    return (
                      <div key={index} className="text-xs font-mono">
                        {indent}Index {index}: {num}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Current Step */}
          {currentStep && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-orange-800 font-medium">{currentStep}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={heapSort}
              disabled={isAnimating}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isAnimating ? 'Sorting...' : 'Start Heap Sort'}
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
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg">JavaScript</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Python</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Java</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">C++</button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`// Heap Sort Implementation
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Call heapify on the reduced heap
    heapify(arr, i, 0);
  }

  return arr;
}

// Usage
const array = [12, 11, 13, 5, 6, 7, 2, 9, 4, 10];
console.log(heapSort(array)); // [2, 4, 5, 6, 7, 9, 10, 11, 12, 13]`}
            </pre>
          </div>
        </div>

        {/* Practice Problems */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Problems</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Implement Heap Sort</h3>
                  <p className="text-gray-600">Write your own implementation of heap sort from scratch</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Easy</span>
                    <span className="text-gray-500 text-sm">Time: 30 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Min Heap Sort</h3>
                  <p className="text-gray-600">Implement heap sort using a min heap instead of max heap</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">Medium</span>
                    <span className="text-gray-500 text-sm">Time: 40 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">K-way Merge</h3>
                  <p className="text-gray-600">Use heap data structure to merge K sorted arrays</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded">Hard</span>
                    <span className="text-gray-500 text-sm">Time: 60 min</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Algorithms */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Sorting Algorithms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/data-structures/sorting/quick-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Sort</h3>
                <p className="text-gray-600 text-sm">Efficient divide-and-conquer sorting algorithm</p>
                <div className="mt-4 text-orange-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/merge-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Merge Sort</h3>
                <p className="text-gray-600 text-sm">Stable divide-and-conquer sorting algorithm</p>
                <div className="mt-4 text-orange-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
            
            <Link href="/data-structures/sorting/insertion-sort" className="block">
              <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Insertion Sort</h3>
                <p className="text-gray-600 text-sm">Simple comparison-based sorting algorithm</p>
                <div className="mt-4 text-orange-600 font-medium text-sm">Learn More →</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}