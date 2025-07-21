
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ArraysPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [operation, setOperation] = useState('access');

  const operations = [
    {
      id: 'access',
      name: 'Access Element',
      description: 'Access element at specific index',
      complexity: 'O(1)',
      steps: ['Select index', 'Return array[index]']
    },
    {
      id: 'insert',
      name: 'Insert Element',
      description: 'Insert element at specific position',
      complexity: 'O(n)',
      steps: ['Shift elements right', 'Insert new element', 'Update size']
    },
    {
      id: 'delete',
      name: 'Delete Element',
      description: 'Remove element from specific position',
      complexity: 'O(n)',
      steps: ['Remove element', 'Shift elements left', 'Update size']
    },
    {
      id: 'search',
      name: 'Linear Search',
      description: 'Search for element in unsorted array',
      complexity: 'O(n)',
      steps: ['Start from index 0', 'Compare each element', 'Return index if found']
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setHighlightIndex(-1);

    switch (operation) {
      case 'access':
        await animateAccess();
        break;
      case 'insert':
        await animateInsert();
        break;
      case 'delete':
        await animateDelete();
        break;
      case 'search':
        await animateSearch();
        break;
    }

    setIsAnimating(false);
    setHighlightIndex(-1);
  };

  const animateAccess = async () => {
    const targetIndex = 3;
    for (let step = 0; step < currentOperation.steps.length; step++) {
      setCurrentStep(step);
      if (step === 1) {
        setHighlightIndex(targetIndex);
      }
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  };

  const animateInsert = async () => {
    const insertIndex = 2;
    const newValue = 99;

    for (let step = 0; step < currentOperation.steps.length; step++) {
      setCurrentStep(step);

      if (step === 0) {
        setHighlightIndex(insertIndex);
      } else if (step === 1) {
        const newArray = [...array];
        newArray.splice(insertIndex, 0, newValue);
        setArray(newArray);
        setHighlightIndex(insertIndex);
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  };

  const animateDelete = async () => {
    const deleteIndex = 1;

    for (let step = 0; step < currentOperation.steps.length; step++) {
      setCurrentStep(step);

      if (step === 0) {
        setHighlightIndex(deleteIndex);
      } else if (step === 1) {
        const newArray = [...array];
        newArray.splice(deleteIndex, 1);
        setArray(newArray);
        setHighlightIndex(-1);
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  };

  const animateSearch = async () => {
    const searchValue = 25;

    for (let i = 0; i < array.length; i++) {
      setHighlightIndex(i);
      setCurrentStep(Math.min(i, currentOperation.steps.length - 1));

      if (array[i] === searchValue) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  const resetArray = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setHighlightIndex(-1);
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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-grid-line text-2xl text-blue-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Arrays</h1>
              <p className="text-gray-600">Sequential collection of elements in contiguous memory</p>
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
                    {isAnimating ? 'Running...' : 'Run Animation'}
                  </button>
                  <button
                    onClick={resetArray}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Array Visualization */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {array.map((value, index) => (
                    <div key={`${index}-${value}`} className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-500 ${
                          highlightIndex === index
                            ? 'bg-indigo-600 text-white border-indigo-600 scale-110'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">[{index}]</div>
                    </div>
                  ))}
                </div>

                <div className="text-center text-sm text-gray-600">
                  Array Size: {array.length} | Memory Layout: Contiguous
                </div>
              </div>

              {/* Operation Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Operation</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {operations.map((op) => (
                    <button
                      key={op.id}
                      onClick={() => setOperation(op.id)}
                      className={`p-3 rounded-lg border text-left cursor-pointer whitespace-nowrap ${
                        operation === op.id
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-semibold text-sm">{op.name}</div>
                      <div className="text-xs text-gray-500">{op.complexity}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Display */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {currentOperation.name}: {currentOperation.description}
                </h3>
                <div className="space-y-2">
                  {currentOperation.steps.map((step, index) => (
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

            {/* Code Visualization */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Code Implementation</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  {operation === 'access' && `// Array Access - O(1)
function accessElement(arr, index) {
    if (index < 0 || index >= arr.length) {
        return null; // Index out of bounds
    }
    return arr[index]; // Direct memory access
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90];
let element = accessElement(numbers, 3); // Returns 12`}
                  {operation === 'insert' && `// Array Insertion - O(n)
function insertElement(arr, index, value) {
    if (index < 0 || index > arr.length) {
        return false;
    }

    // Shift elements to the right
    for (let i = arr.length; i > index; i--) {
        arr[i] = arr[i - 1];
    }

    arr[index] = value; // Insert new element
    return true;
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90];
insertElement(numbers, 2, 99); // Insert 99 at index 2`}
                  {operation === 'delete' && `// Array Deletion - O(n)
function deleteElement(arr, index) {
    if (index < 0 || index >= arr.length) {
        return false;
    }

    // Shift elements to the left
    for (let i = index; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
    }

    arr.length--; // Reduce array size
    return true;
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90];
deleteElement(numbers, 1); // Remove element at index 1`}
                  {operation === 'search' && `// Linear Search - O(n)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Element not found
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90];
let index = linearSearch(numbers, 25); // Returns 2`}
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
                      <span>Access:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insert:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delete:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Array Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Fixed size (in most languages)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Contiguous memory allocation</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Random access to elements</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Cache-friendly due to locality</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-close-line text-red-600 mr-2"></i>
                  <span>Expensive insertion/deletion</span>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Use Cases</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <span className="font-semibold">Mathematical operations</span>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <span className="font-semibold">Image processing</span>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <span className="font-semibold">Database indexing</span>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <span className="font-semibold">Sorting algorithms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
