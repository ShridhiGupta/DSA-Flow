'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeapNode {
  value: number;
  index: number;
  highlighted?: boolean;
  swapping?: boolean;
}

export default function PriorityQueueHeapsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operation, setOperation] = useState('min-heap-insert');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [heapType, setHeapType] = useState<'min' | 'max'>('min');
  const [heap, setHeap] = useState<number[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [insertValue, setInsertValue] = useState(15);
  const [extractedValue, setExtractedValue] = useState<number | null>(null);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [heapSortArray, setHeapSortArray] = useState<number[]>([]);
  const [heapSortResult, setHeapSortResult] = useState<number[]>([]);

  const operations = [
    {
      id: 'min-heap-insert',
      name: 'Min Heap Insert',
      description: 'Insert element into min heap maintaining heap property',
      complexity: 'O(log n)',
      steps: ['Add element at end', 'Bubble up comparing with parent', 'Swap if parent is larger', 'Continue until heap property satisfied']
    },
    {
      id: 'max-heap-insert',
      name: 'Max Heap Insert',
      description: 'Insert element into max heap maintaining heap property',
      complexity: 'O(log n)',
      steps: ['Add element at end', 'Bubble up comparing with parent', 'Swap if parent is smaller', 'Continue until heap property satisfied']
    },
    {
      id: 'extract-min',
      name: 'Extract Min',
      description: 'Remove and return minimum element from min heap',
      complexity: 'O(log n)',
      steps: ['Store root value', 'Move last element to root', 'Bubble down comparing with children', 'Swap with smaller child until heap property satisfied']
    },
    {
      id: 'extract-max',
      name: 'Extract Max',
      description: 'Remove and return maximum element from max heap',
      complexity: 'O(log n)',
      steps: ['Store root value', 'Move last element to root', 'Bubble down comparing with children', 'Swap with larger child until heap property satisfied']
    },
    {
      id: 'heapify',
      name: 'Heapify',
      description: 'Convert array into heap structure',
      complexity: 'O(n)',
      steps: ['Start from last non-leaf node', 'Heapify each node bottom-up', 'Compare with children and swap if needed', 'Continue until root is processed']
    },
    {
      id: 'heap-sort',
      name: 'Heap Sort',
      description: 'Sort array using heap data structure',
      complexity: 'O(n log n)',
      steps: ['Build max heap from array', 'Extract max repeatedly', 'Place extracted element at end', 'Continue until array sorted']
    }
  ];

  const currentOp = operations.find(op => op.id === operation) || operations[0];

  const getParentIndex = (index: number) => Math.floor((index - 1) / 2);
  const getLeftChildIndex = (index: number) => 2 * index + 1;
  const getRightChildIndex = (index: number) => 2 * index + 2;

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setHighlightedIndex(-1);
    setSwappingIndices([]);
    setExtractedValue(null);
    setCurrentOperation('');
    setHeapSortResult([]);

    switch (operation) {
      case 'min-heap-insert':
        await animateMinHeapInsert();
        break;
      case 'max-heap-insert':
        await animateMaxHeapInsert();
        break;
      case 'extract-min':
        await animateExtractMin();
        break;
      case 'extract-max':
        await animateExtractMax();
        break;
      case 'heapify':
        await animateHeapify();
        break;
      case 'heap-sort':
        await animateHeapSort();
        break;
    }

    setIsAnimating(false);
  };

  const animateMinHeapInsert = async () => {
    const newHeap = [...heap];
    const value = insertValue;
    
    // Add element at end
    setCurrentStep(1);
    newHeap.push(value);
    setHeap([...newHeap]);
    setHighlightedIndex(newHeap.length - 1);
    setCurrentOperation(`Added ${value} at the end of heap`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Bubble up
    let currentIndex = newHeap.length - 1;
    while (currentIndex > 0) {
      setCurrentStep(2);
      const parentIndex = getParentIndex(currentIndex);
      setHighlightedIndex(currentIndex);
      setSwappingIndices([currentIndex, parentIndex]);
      setCurrentOperation(`Comparing ${newHeap[currentIndex]} with parent ${newHeap[parentIndex]}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (newHeap[currentIndex] < newHeap[parentIndex]) {
        setCurrentStep(3);
        [newHeap[currentIndex], newHeap[parentIndex]] = [newHeap[parentIndex], newHeap[currentIndex]];
        setHeap([...newHeap]);
        setCurrentOperation(`Swapped ${newHeap[parentIndex]} with ${newHeap[currentIndex]}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        currentIndex = parentIndex;
      } else {
        break;
      }
    }

    setCurrentStep(4);
    setHighlightedIndex(-1);
    setSwappingIndices([]);
    setCurrentOperation(`Insertion complete! ${value} is now in correct position`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateMaxHeapInsert = async () => {
    const newHeap = [...heap];
    const value = insertValue;
    
    setCurrentStep(1);
    newHeap.push(value);
    setHeap([...newHeap]);
    setHighlightedIndex(newHeap.length - 1);
    setCurrentOperation(`Added ${value} at the end of heap`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    let currentIndex = newHeap.length - 1;
    while (currentIndex > 0) {
      setCurrentStep(2);
      const parentIndex = getParentIndex(currentIndex);
      setHighlightedIndex(currentIndex);
      setSwappingIndices([currentIndex, parentIndex]);
      setCurrentOperation(`Comparing ${newHeap[currentIndex]} with parent ${newHeap[parentIndex]}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (newHeap[currentIndex] > newHeap[parentIndex]) {
        setCurrentStep(3);
        [newHeap[currentIndex], newHeap[parentIndex]] = [newHeap[parentIndex], newHeap[currentIndex]];
        setHeap([...newHeap]);
        setCurrentOperation(`Swapped ${newHeap[parentIndex]} with ${newHeap[currentIndex]}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        currentIndex = parentIndex;
      } else {
        break;
      }
    }

    setCurrentStep(4);
    setHighlightedIndex(-1);
    setSwappingIndices([]);
    setCurrentOperation(`Insertion complete! ${value} is now in correct position`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateExtractMin = async () => {
    if (heap.length === 0) {
      setCurrentOperation('Heap is empty!');
      return;
    }

    const newHeap = [...heap];
    
    // Store root value
    setCurrentStep(1);
    const minValue = newHeap[0];
    setExtractedValue(minValue);
    setCurrentOperation(`Extracting minimum value: ${minValue}`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Move last element to root
    setCurrentStep(2);
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    setHeap([...newHeap]);
    setHighlightedIndex(0);
    setCurrentOperation(`Moved last element ${newHeap[0]} to root`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Bubble down
    let currentIndex = 0;
    while (true) {
      setCurrentStep(3);
      const leftChild = getLeftChildIndex(currentIndex);
      const rightChild = getRightChildIndex(currentIndex);
      let smallest = currentIndex;

      if (leftChild < newHeap.length && newHeap[leftChild] < newHeap[smallest]) {
        smallest = leftChild;
      }
      if (rightChild < newHeap.length && newHeap[rightChild] < newHeap[smallest]) {
        smallest = rightChild;
      }

      if (smallest !== currentIndex) {
        setSwappingIndices([currentIndex, smallest]);
        setCurrentOperation(`Comparing with children, swapping with smaller child`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        [newHeap[currentIndex], newHeap[smallest]] = [newHeap[smallest], newHeap[currentIndex]];
        setHeap([...newHeap]);
        setCurrentOperation(`Swapped ${newHeap[smallest]} with ${newHeap[currentIndex]}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        currentIndex = smallest;
      } else {
        break;
      }
    }

    setCurrentStep(4);
    setHighlightedIndex(-1);
    setSwappingIndices([]);
    setCurrentOperation(`Extraction complete! Minimum value ${minValue} extracted`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateExtractMax = async () => {
    if (heap.length === 0) {
      setCurrentOperation('Heap is empty!');
      return;
    }

    const newHeap = [...heap];
    
    setCurrentStep(1);
    const maxValue = newHeap[0];
    setExtractedValue(maxValue);
    setCurrentOperation(`Extracting maximum value: ${maxValue}`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setCurrentStep(2);
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    setHeap([...newHeap]);
    setHighlightedIndex(0);
    setCurrentOperation(`Moved last element ${newHeap[0]} to root`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    let currentIndex = 0;
    while (true) {
      setCurrentStep(3);
      const leftChild = getLeftChildIndex(currentIndex);
      const rightChild = getRightChildIndex(currentIndex);
      let largest = currentIndex;

      if (leftChild < newHeap.length && newHeap[leftChild] > newHeap[largest]) {
        largest = leftChild;
      }
      if (rightChild < newHeap.length && newHeap[rightChild] > newHeap[largest]) {
        largest = rightChild;
      }

      if (largest !== currentIndex) {
        setSwappingIndices([currentIndex, largest]);
        setCurrentOperation(`Comparing with children, swapping with larger child`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        [newHeap[currentIndex], newHeap[largest]] = [newHeap[largest], newHeap[currentIndex]];
        setHeap([...newHeap]);
        setCurrentOperation(`Swapped ${newHeap[largest]} with ${newHeap[currentIndex]}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        currentIndex = largest;
      } else {
        break;
      }
    }

    setCurrentStep(4);
    setHighlightedIndex(-1);
    setSwappingIndices([]);
    setCurrentOperation(`Extraction complete! Maximum value ${maxValue} extracted`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateHeapify = async () => {
    const array = [4, 10, 3, 5, 1, 8, 7, 2];
    setHeap([...array]);
    setCurrentOperation('Starting heapify operation');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newHeap = [...array];
    const n = newHeap.length;

    // Start from last non-leaf node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      setCurrentStep(1);
      setHighlightedIndex(i);
      setCurrentOperation(`Heapifying node at index ${i} (value: ${newHeap[i]})`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      let currentIndex = i;
      while (true) {
        setCurrentStep(2);
        const leftChild = getLeftChildIndex(currentIndex);
        const rightChild = getRightChildIndex(currentIndex);
        let smallest = currentIndex;

        if (leftChild < n && newHeap[leftChild] < newHeap[smallest]) {
          smallest = leftChild;
        }
        if (rightChild < n && newHeap[rightChild] < newHeap[smallest]) {
          smallest = rightChild;
        }

        if (smallest !== currentIndex) {
          setCurrentStep(3);
          setSwappingIndices([currentIndex, smallest]);
          setCurrentOperation(`Swapping ${newHeap[currentIndex]} with ${newHeap[smallest]}`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          [newHeap[currentIndex], newHeap[smallest]] = [newHeap[smallest], newHeap[currentIndex]];
          setHeap([...newHeap]);
          await new Promise(resolve => setTimeout(resolve, 800));
          currentIndex = smallest;
        } else {
          break;
        }
      }
    }

    setCurrentStep(4);
    setHighlightedIndex(-1);
    setSwappingIndices([]);
    setCurrentOperation('Heapify complete! Array is now a valid min heap');
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateHeapSort = async () => {
    const array = [12, 11, 13, 5, 6, 7];
    setHeapSortArray([...array]);
    setHeap([...array]);
    setCurrentOperation('Starting heap sort');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newArray = [...array];
    const n = newArray.length;
    const sorted: number[] = [];

    // Build max heap
    setCurrentStep(1);
    setCurrentOperation('Building max heap');
    await new Promise(resolve => setTimeout(resolve, 1000));

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      let currentIndex = i;
      while (true) {
        const leftChild = getLeftChildIndex(currentIndex);
        const rightChild = getRightChildIndex(currentIndex);
        let largest = currentIndex;

        if (leftChild < n && newArray[leftChild] > newArray[largest]) {
          largest = leftChild;
        }
        if (rightChild < n && newArray[rightChild] > newArray[largest]) {
          largest = rightChild;
        }

        if (largest !== currentIndex) {
          [newArray[currentIndex], newArray[largest]] = [newArray[largest], newArray[currentIndex]];
          setHeap([...newArray]);
          await new Promise(resolve => setTimeout(resolve, 500));
          currentIndex = largest;
        } else {
          break;
        }
      }
    }

    // Extract max repeatedly
    for (let i = n - 1; i > 0; i--) {
      setCurrentStep(2);
      setCurrentOperation(`Extracting max: ${newArray[0]}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      [newArray[0], newArray[i]] = [newArray[i], newArray[0]];
      sorted.unshift(newArray[i]);
      setHeapSortResult([...sorted]);
      setHeap([...newArray.slice(0, i)]);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCurrentStep(3);
      let currentIndex = 0;
      while (true) {
        const leftChild = getLeftChildIndex(currentIndex);
        const rightChild = getRightChildIndex(currentIndex);
        let largest = currentIndex;

        if (leftChild < i && newArray[leftChild] > newArray[largest]) {
          largest = leftChild;
        }
        if (rightChild < i && newArray[rightChild] > newArray[largest]) {
          largest = rightChild;
        }

        if (largest !== currentIndex) {
          [newArray[currentIndex], newArray[largest]] = [newArray[largest], newArray[currentIndex]];
          setHeap([...newArray.slice(0, i)]);
          await new Promise(resolve => setTimeout(resolve, 500));
          currentIndex = largest;
        } else {
          break;
        }
      }
    }

    sorted.unshift(newArray[0]);
    setHeapSortResult([...sorted]);
    setCurrentStep(4);
    setCurrentOperation('Heap sort complete!');
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const renderHeap = () => {
    if (heap.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          Heap is empty. Use operations to build a heap.
        </div>
      );
    }

    const levels: number[][] = [];
    let level = 0;
    let index = 0;

    while (index < heap.length) {
      const levelSize = Math.pow(2, level);
      const levelNodes: number[] = [];
      for (let i = 0; i < levelSize && index < heap.length; i++) {
        levelNodes.push(index);
        index++;
      }
      levels.push(levelNodes);
      level++;
    }

    return (
      <div className="flex flex-col items-center space-y-4">
        {levels.map((levelNodes, levelIndex) => (
          <div key={levelIndex} className="flex items-center justify-center space-x-4">
            {levelNodes.map((nodeIndex) => {
              const isHighlighted = highlightedIndex === nodeIndex;
              const isSwapping = swappingIndices.includes(nodeIndex);
              const leftChild = getLeftChildIndex(nodeIndex);
              const rightChild = getRightChildIndex(nodeIndex);
              const hasLeftChild = leftChild < heap.length;
              const hasRightChild = rightChild < heap.length;

              return (
                <div key={nodeIndex} className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 font-bold text-lg transition-all ${
                      isSwapping
                        ? 'bg-yellow-400 border-yellow-600 text-yellow-900 scale-110'
                        : isHighlighted
                        ? 'bg-blue-400 border-blue-600 text-blue-900'
                        : 'bg-white border-gray-400 text-gray-800'
                    }`}
                  >
                    {heap[nodeIndex]}
                  </div>
                  {(hasLeftChild || hasRightChild) && (
                    <div className="flex space-x-8 mt-2">
                      {hasLeftChild && (
                        <div className="w-px h-4 bg-gray-400"></div>
                      )}
                      {hasRightChild && (
                        <div className="w-px h-4 bg-gray-400"></div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
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
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-stack-line text-2xl text-orange-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Priority Queue & Heaps</h1>
              <p className="text-gray-600">Complete binary tree data structure that maintains heap property for efficient priority-based operations</p>
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
                </div>
              </div>

              {/* Input Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Input Parameters</h3>
                <div className="flex items-center space-x-4">
                  {(operation === 'min-heap-insert' || operation === 'max-heap-insert') && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Value:</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={insertValue}
                        onChange={(e) => setInsertValue(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                      />
                    </div>
                  )}
                  {(operation === 'min-heap-insert' || operation === 'max-heap-insert' || operation === 'extract-min' || operation === 'extract-max') && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Heap:</label>
                      <input
                        type="text"
                        value={heap.join(', ')}
                        onChange={(e) => {
                          const arr = e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                          setHeap(arr);
                        }}
                        className="w-40 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                        placeholder="10, 20, 30"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Operation Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Operation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

              {/* Heap Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Heap Visualization</h3>
                <div className="bg-gray-50 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                  {renderHeap()}
                </div>
              </div>

              {/* Extracted Value Display */}
              {extractedValue !== null && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Extracted Value</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-mono text-xl font-bold">{extractedValue}</p>
                  </div>
                </div>
              )}

              {/* Heap Sort Result */}
              {operation === 'heap-sort' && heapSortResult.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sorted Array</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {heapSortResult.map((val, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded font-mono text-sm font-bold">
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Current Operation Display */}
              {currentOperation && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Operation</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-mono">{currentOperation}</p>
                  </div>
                </div>
              )}

              {/* Step-by-Step Display */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {currentOp.name}: {currentOp.description}
                </h3>
                <div className="space-y-2">
                  {currentOp.steps.map((step, index) => (
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
                  {operation === 'min-heap-insert' && selectedLanguage === 'javascript' && `// JavaScript Min Heap Insert - O(log n)
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] < this.heap[parentIndex]) {
                [this.heap[index], this.heap[parentIndex]] = 
                [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }
}`}
                  {operation === 'min-heap-insert' && selectedLanguage === 'python' && `# Python Min Heap Insert - O(log n)
import heapq

class MinHeap:
    def __init__(self):
        self.heap = []
    
    def insert(self, value):
        heapq.heappush(self.heap, value)
    
    # Manual implementation
    def insert_manual(self, value):
        self.heap.append(value)
        self._bubble_up(len(self.heap) - 1)
    
    def _bubble_up(self, index):
        while index > 0:
            parent = (index - 1) // 2
            if self.heap[index] < self.heap[parent]:
                self.heap[index], self.heap[parent] = \\
                    self.heap[parent], self.heap[index]
                index = parent
            else:
                break`}
                  {operation === 'min-heap-insert' && selectedLanguage === 'java' && `// Java Min Heap Insert - O(log n)
import java.util.*;

public class MinHeap {
    private List<Integer> heap;
    
    public MinHeap() {
        heap = new ArrayList<>();
    }
    
    public void insert(int value) {
        heap.add(value);
        bubbleUp(heap.size() - 1);
    }
    
    private void bubbleUp(int index) {
        while (index > 0) {
            int parentIndex = (index - 1) / 2;
            if (heap.get(index) < heap.get(parentIndex)) {
                Collections.swap(heap, index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }
}`}
                  {operation === 'min-heap-insert' && selectedLanguage === 'cpp' && `// C++ Min Heap Insert - O(log n)
#include <vector>
#include <algorithm>
using namespace std;

class MinHeap {
private:
    vector<int> heap;
    
public:
    void insert(int value) {
        heap.push_back(value);
        bubbleUp(heap.size() - 1);
    }
    
private:
    void bubbleUp(int index) {
        while (index > 0) {
            int parentIndex = (index - 1) / 2;
            if (heap[index] < heap[parentIndex]) {
                swap(heap[index], heap[parentIndex]);
                index = parentIndex;
            } else {
                break;
            }
        }
    }
};`}
                  {operation === 'extract-min' && selectedLanguage === 'javascript' && `// JavaScript Extract Min - O(log n)
extractMin() {
    if (this.heap.length === 0) return null;
    
    const min = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    
    if (this.heap.length > 0) {
        this.bubbleDown(0);
    }
    
    return min;
}

bubbleDown(index) {
    while (true) {
        let smallest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        
        if (left < this.heap.length && 
            this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        
        if (right < this.heap.length && 
            this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }
        
        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = 
            [this.heap[smallest], this.heap[index]];
            index = smallest;
        } else {
            break;
        }
    }
}`}
                  {operation === 'extract-min' && selectedLanguage === 'python' && `# Python Extract Min - O(log n)
def extract_min(self):
    if not self.heap:
        return None
    
    min_val = self.heap[0]
    self.heap[0] = self.heap[-1]
    self.heap.pop()
    
    if self.heap:
        self._bubble_down(0)
    
    return min_val

def _bubble_down(self, index):
    while True:
        smallest = index
        left = 2 * index + 1
        right = 2 * index + 2
        
        if left < len(self.heap) and \\
           self.heap[left] < self.heap[smallest]:
            smallest = left
        
        if right < len(self.heap) and \\
           self.heap[right] < self.heap[smallest]:
            smallest = right
        
        if smallest != index:
            self.heap[index], self.heap[smallest] = \\
                self.heap[smallest], self.heap[index]
            index = smallest
        else:
            break`}
                  {operation === 'extract-min' && selectedLanguage === 'java' && `// Java Extract Min - O(log n)
public int extractMin() {
    if (heap.isEmpty()) return -1;
    
    int min = heap.get(0);
    heap.set(0, heap.get(heap.size() - 1));
    heap.remove(heap.size() - 1);
    
    if (!heap.isEmpty()) {
        bubbleDown(0);
    }
    
    return min;
}

private void bubbleDown(int index) {
    while (true) {
        int smallest = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        
        if (left < heap.size() && 
            heap.get(left) < heap.get(smallest)) {
            smallest = left;
        }
        
        if (right < heap.size() && 
            heap.get(right) < heap.get(smallest)) {
            smallest = right;
        }
        
        if (smallest != index) {
            Collections.swap(heap, index, smallest);
            index = smallest;
        } else {
            break;
        }
    }
}`}
                  {operation === 'extract-min' && selectedLanguage === 'cpp' && `// C++ Extract Min - O(log n)
int extractMin() {
    if (heap.empty()) return -1;
    
    int min = heap[0];
    heap[0] = heap[heap.size() - 1];
    heap.pop_back();
    
    if (!heap.empty()) {
        bubbleDown(0);
    }
    
    return min;
}

void bubbleDown(int index) {
    while (true) {
        int smallest = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        
        if (left < heap.size() && 
            heap[left] < heap[smallest]) {
            smallest = left;
        }
        
        if (right < heap.size() && 
            heap[right] < heap[smallest]) {
            smallest = right;
        }
        
        if (smallest != index) {
            swap(heap[index], heap[smallest]);
            index = smallest;
        } else {
            break;
        }
    }
}`}
                  {operation === 'heapify' && selectedLanguage === 'javascript' && `// JavaScript Heapify - O(n)
function heapify(arr) {
    const n = arr.length;
    
    // Start from last non-leaf node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyDown(arr, i, n);
    }
}

function heapifyDown(arr, index, n) {
    while (true) {
        let smallest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        
        if (left < n && arr[left] < arr[smallest]) {
            smallest = left;
        }
        
        if (right < n && arr[right] < arr[smallest]) {
            smallest = right;
        }
        
        if (smallest !== index) {
            [arr[index], arr[smallest]] = 
            [arr[smallest], arr[index]];
            index = smallest;
        } else {
            break;
        }
    }
}`}
                  {operation === 'heapify' && selectedLanguage === 'python' && `# Python Heapify - O(n)
def heapify(arr):
    n = len(arr)
    
    # Start from last non-leaf node
    for i in range(n // 2 - 1, -1, -1):
        heapify_down(arr, i, n)

def heapify_down(arr, index, n):
    while True:
        smallest = index
        left = 2 * index + 1
        right = 2 * index + 2
        
        if left < n and arr[left] < arr[smallest]:
            smallest = left
        
        if right < n and arr[right] < arr[smallest]:
            smallest = right
        
        if smallest != index:
            arr[index], arr[smallest] = \\
                arr[smallest], arr[index]
            index = smallest
        else:
            break`}
                  {operation === 'heapify' && selectedLanguage === 'java' && `// Java Heapify - O(n)
public static void heapify(int[] arr) {
    int n = arr.length;
    
    // Start from last non-leaf node
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapifyDown(arr, i, n);
    }
}

private static void heapifyDown(int[] arr, int index, int n) {
    while (true) {
        int smallest = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        
        if (left < n && arr[left] < arr[smallest]) {
            smallest = left;
        }
        
        if (right < n && arr[right] < arr[smallest]) {
            smallest = right;
        }
        
        if (smallest != index) {
            int temp = arr[index];
            arr[index] = arr[smallest];
            arr[smallest] = temp;
            index = smallest;
        } else {
            break;
        }
    }
}`}
                  {operation === 'heapify' && selectedLanguage === 'cpp' && `// C++ Heapify - O(n)
#include <vector>
#include <algorithm>
using namespace std;

void heapify(vector<int>& arr) {
    int n = arr.size();
    
    // Start from last non-leaf node
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapifyDown(arr, i, n);
    }
}

void heapifyDown(vector<int>& arr, int index, int n) {
    while (true) {
        int smallest = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        
        if (left < n && arr[left] < arr[smallest]) {
            smallest = left;
        }
        
        if (right < n && arr[right] < arr[smallest]) {
            smallest = right;
        }
        
        if (smallest != index) {
            swap(arr[index], arr[smallest]);
            index = smallest;
        } else {
            break;
        }
    }
}`}
                  {operation === 'heap-sort' && selectedLanguage === 'javascript' && `// JavaScript Heap Sort - O(n log n)
function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, i, n);
    }
    
    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, 0, i);
    }
}

function heapify(arr, index, n) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== index) {
        [arr[index], arr[largest]] = [arr[largest], arr[index]];
        heapify(arr, largest, n);
    }
}`}
                  {operation === 'heap-sort' && selectedLanguage === 'python' && `# Python Heap Sort - O(n log n)
def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, i, n)
    
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, 0, i)

def heapify(arr, index, n):
    largest = index
    left = 2 * index + 1
    right = 2 * index + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != index:
        arr[index], arr[largest] = arr[largest], arr[index]
        heapify(arr, largest, n)`}
                  {operation === 'heap-sort' && selectedLanguage === 'java' && `// Java Heap Sort - O(n log n)
public static void heapSort(int[] arr) {
    int n = arr.length;
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, i, n);
    }
    
    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, 0, i);
    }
}

private static void heapify(int[] arr, int index, int n) {
    int largest = index;
    int left = 2 * index + 1;
    int right = 2 * index + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest != index) {
        int temp = arr[index];
        arr[index] = arr[largest];
        arr[largest] = temp;
        heapify(arr, largest, n);
    }
}`}
                  {operation === 'heap-sort' && selectedLanguage === 'cpp' && `// C++ Heap Sort - O(n log n)
#include <vector>
#include <algorithm>
using namespace std;

void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, i, n);
    }
    
    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, 0, i);
    }
}

void heapify(vector<int>& arr, int index, int n) {
    int largest = index;
    int left = 2 * index + 1;
    int right = 2 * index + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest != index) {
        swap(arr[index], arr[largest]);
        heapify(arr, largest, n);
    }
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
                      <span>Insert:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Extract Min/Max:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heapify:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heap Sort:</span>
                      <span className="font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">O(n log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peek:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Storage:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heapify:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Heap Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Heap Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Complete binary tree structure</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Min Heap: Parent ≤ Children</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Max Heap: Parent ≥ Children</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Stored as array (level-order)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Efficient priority queue operations</span>
                </div>
              </div>
            </div>

            {/* When to Use Heaps */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use Heaps</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Priority Queues</h4>
                  <p className="text-sm text-gray-700">Task scheduling, event simulation</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Top K Elements</h4>
                  <p className="text-sm text-gray-700">Finding K largest/smallest elements</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Heap Sort</h4>
                  <p className="text-sm text-gray-700">In-place sorting algorithm</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Dijkstra's Algorithm</h4>
                  <p className="text-sm text-gray-700">Shortest path finding</p>
                </div>
              </div>
            </div>

            {/* Array Representation */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Array Representation</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
{`For node at index i:
- Parent: (i-1)/2
- Left Child: 2*i + 1
- Right Child: 2*i + 2

Example: [10, 20, 30, 40, 50]
        10 (0)
       /    \\
    20(1)  30(2)
   /    \\
40(3)  50(4)`}
                </pre>
              </div>
            </div>

            {/* Common Operations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Operations</h3>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold">Insert</div>
                  <div className="text-gray-600">Add element and bubble up</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold">Extract Min/Max</div>
                  <div className="text-gray-600">Remove root and bubble down</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold">Peek</div>
                  <div className="text-gray-600">Get root without removing</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold">Heapify</div>
                  <div className="text-gray-600">Convert array to heap</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

