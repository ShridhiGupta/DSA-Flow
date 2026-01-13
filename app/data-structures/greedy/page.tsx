'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function GreedyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operation, setOperation] = useState('knapsack');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [items, setItems] = useState([
    { value: 60, weight: 10, color: '#3B82F6' },
    { value: 100, weight: 20, color: '#10B981' },
    { value: 120, weight: 30, color: '#F59E0B' }
  ]);
  const [capacity, setCapacity] = useState(50);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const operations = [
    {
      id: 'knapsack',
      name: 'Knapsack Problem',
      description: 'Maximize value within weight capacity',
      complexity: 'O(nW)',
      steps: ['Sort items by value/weight ratio', 'Pick items until capacity full', 'Track total value and weight']
    },
    {
      id: 'coin-change',
      name: 'Coin Change',
      description: 'Find minimum coins for amount',
      complexity: 'O(n)',
      steps: ['Use largest denomination possible', 'Subtract and repeat', 'Return coin count']
    },
    {
      id: 'activity-selection',
      name: 'Activity Selection',
      description: 'Maximize activities in time slots',
      complexity: 'O(n log n)',
      steps: ['Sort by end time', 'Select non-overlapping activities', 'Count maximum activities']
    },
    {
      id: 'huffman-coding',
      name: 'Huffman Coding',
      description: 'Optimal prefix codes for compression',
      complexity: 'O(n log n)',
      steps: ['Build frequency map', 'Create priority queue', 'Generate optimal codes']
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setSelectedItems([]);
    setTotalValue(0);
    setTotalWeight(0);

    switch (operation) {
      case 'knapsack':
        await animateKnapsack();
        break;
      case 'coin-change':
        await animateCoinChange();
        break;
      case 'activity-selection':
        await animateActivitySelection();
        break;
      case 'huffman-coding':
        await animateHuffmanCoding();
        break;
    }

    setIsAnimating(false);
  };

  const animateKnapsack = async () => {
    const sortedItems = [...items].sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    let currentCapacity = capacity;
    let value = 0;
    let weight = 0;
    const selected = [];

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    for (let i = 0; i < sortedItems.length; i++) {
      setCurrentStep(1);
      const item = sortedItems[i];
      
      if (weight + item.weight <= currentCapacity) {
        selected.push(i);
        value += item.value;
        weight += item.weight;
        currentCapacity -= item.weight;
      }
      
      setSelectedItems([...selected]);
      setTotalValue(value);
      setTotalWeight(weight);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateCoinChange = async () => {
    const amount = 63;
    const coins = [25, 10, 5, 1];
    let remaining = amount;
    let coinCount = 0;
    const usedCoins = [];

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    for (const coin of coins) {
      setCurrentStep(1);
      while (remaining >= coin) {
        remaining -= coin;
        coinCount++;
        usedCoins.push(coin);
      }
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateActivitySelection = async () => {
    const activities = [
      { start: 1, end: 4, name: 'A1' },
      { start: 3, end: 5, name: 'A2' },
      { start: 0, end: 6, name: 'A3' },
      { start: 5, end: 7, name: 'A4' },
      { start: 3, end: 9, name: 'A5' }
    ];
    
    const sorted = activities.sort((a, b) => a.end - b.end);
    let count = 0;
    let lastEnd = -1;

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    for (const activity of sorted) {
      setCurrentStep(1);
      if (activity.start >= lastEnd) {
        count++;
        lastEnd = activity.end;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateHuffmanCoding = async () => {
    const chars = ['A', 'B', 'C', 'D', 'E'];
    const freq = [5, 9, 12, 13, 16];

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetAnimation = () => {
    setSelectedItems([]);
    setTotalValue(0);
    setTotalWeight(0);
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-coin-line text-2xl text-green-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Greedy Algorithms</h1>
              <p className="text-gray-600">Making locally optimal choices for global optimization</p>
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
                    onClick={resetAnimation}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Visualization Display */}
              <div className="mb-8">
                {operation === 'knapsack' && (
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">Knapsack Capacity: <span className="font-bold text-indigo-600">{capacity}</span></div>
                        <div className="text-sm text-gray-600">Current: <span className="font-bold text-green-600">{totalWeight}/{capacity}</span></div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-lg p-4 mb-4">
                        <div className="text-sm text-gray-600 mb-2">Available Items (sorted by value/weight ratio):</div>
                        <div className="space-y-2">
                          {items.map((item, index) => (
                            <div 
                              key={index} 
                              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-300 ${
                                selectedItems.includes(index)
                                  ? 'bg-green-100 border-green-500 shadow-lg transform scale-105'
                                  : 'bg-white border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <div 
                                    className={`w-4 h-4 rounded-full mr-3 ${
                                      selectedItems.includes(index) ? 'bg-green-500' : 'bg-gray-400'
                                    }`}
                                  />
                                  <span className="font-medium text-sm">Item {index + 1}</span>
                                </div>
                                <div className="text-left">
                                  <div className="font-bold text-sm">Value: {item.value}</div>
                                  <div className="text-xs text-gray-500">Weight: {item.weight}</div>
                                  <div className="text-xs text-indigo-600 font-medium">Ratio: {(item.value / item.weight).toFixed(2)}</div>
                                </div>
                              </div>
                              {selectedItems.includes(index) && (
                                <div className="text-xs text-green-600 font-medium">✓ Selected</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-center bg-blue-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Selection Summary</div>
                      <div className="text-lg font-bold text-blue-700">Total Value: {totalValue}</div>
                      <div className="text-sm text-gray-600">Total Weight: {totalWeight}</div>
                      <div className="text-xs text-gray-500">Capacity Used: {((totalWeight / capacity) * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                )}

                {operation === 'coin-change' && (
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-gray-900 mb-4">Amount: <span className="text-indigo-600">63</span></div>
                      <div className="flex justify-center items-center space-x-4 mb-6">
                        <div className="relative">
                          <div className="text-4xl font-bold text-yellow-600">25</div>
                          <div className="absolute -top-2 -right-2 text-xs text-gray-500">×2 = 50</div>
                        </div>
                        <div className="relative">
                          <div className="text-4xl font-bold text-gray-600">10</div>
                          <div className="absolute -top-2 -right-2 text-xs text-gray-500">×1 = 10</div>
                        </div>
                        <div className="relative">
                          <div className="text-4xl font-bold text-gray-600">5</div>
                          <div className="absolute -top-2 -right-2 text-xs text-gray-500">×5 = 25</div>
                        </div>
                        <div className="relative">
                          <div className="text-4xl font-bold text-gray-600">1</div>
                          <div className="absolute -top-2 -right-2 text-xs text-gray-500">×8 = 8</div>
                        </div>
                        <div className="text-2xl font-bold text-green-600">=</div>
                        <div className="text-4xl font-bold text-indigo-600">63</div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Optimal Solution</div>
                      <div className="text-lg font-bold text-green-700">6 coins</div>
                      <div className="text-sm text-gray-600">25 + 10 + 5 + 5 + 5 + 5 + 5 + 3 = 63</div>
                    </div>
                  </div>
                )}

                {operation === 'activity-selection' && (
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="text-sm text-gray-600 mb-2">Timeline (sorted by end time):</div>
                      <div className="relative h-32 bg-blue-50 rounded-lg p-4">
                        {['A1', 'A2', 'A3', 'A4', 'A5'].map((activity, index) => (
                          <div key={index} className="absolute" style={{ 
                            left: `${(index * 80) + 40}px`, 
                            top: '20px' 
                          }}>
                            <div className={`w-16 h-12 bg-blue-100 border-2 border-blue-300 rounded flex items-center justify-center text-sm font-medium shadow-md ${
                              currentStep === 1 && isAnimating && index < 3 ? 'ring-2 ring-blue-400' : ''
                            }`}>
                              {activity}
                            </div>
                            <div className="text-xs text-gray-500 absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                              [{index === 0 ? '1' : index === 1 ? '3' : index === 2 ? '0' : index === 3 ? '5' : '3'}-{index === 0 ? '4' : index === 1 ? '5' : index === 2 ? '6' : index === 3 ? '7' : '9'}]
                            </div>
                          </div>
                        ))}
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                          <div className="text-sm text-gray-600">Selected Activities: <span className="font-bold text-blue-700">3</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Maximum Non-overlapping Activities</div>
                      <div className="text-lg font-bold text-green-700">A1, A2, A4</div>
                      <div className="text-sm text-gray-600">Total time utilized: 9 units</div>
                    </div>
                  </div>
                )}

                {operation === 'huffman-coding' && (
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="text-sm text-gray-600 mb-2">Character Frequencies:</div>
                      <div className="flex justify-center space-x-4 mb-4">
                        {['A:5', 'B:9', 'C:12', 'D:13', 'E:16'].map((item, index) => (
                          <div key={index} className="text-center">
                            <div className="w-20 h-20 bg-purple-100 border-2 border-purple-300 rounded-lg flex items-center justify-center text-2xl font-bold text-purple-700 shadow-md">
                              {item.split(':')[0]}
                            </div>
                            <div className="text-sm text-gray-600 mt-2">
                              {item.split(':')[1]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm text-gray-600 mb-2">Huffman Tree Construction:</div>
                      <div className="flex justify-center">
                        <div className="relative">
                          {/* Tree visualization */}
                          <div className="text-center mb-4">
                            <div className="inline-block">
                              <div className="text-2xl font-bold text-purple-700">E:16</div>
                              <div className="text-gray-400">/</div>
                              <div className="text-lg text-purple-600">A:5</div>
                            </div>
                            <div className="text-gray-400 ml-8">/</div>
                            <div className="text-lg text-purple-600">B:9</div>
                          </div>
                          <div className="text-gray-400 ml-4">/</div>
                          <div className="text-lg text-purple-600">C:12</div>
                        </div>
                        <div className="text-gray-400 ml-4">/</div>
                        <div className="text-lg text-purple-600">D:13</div>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Optimal Prefix Codes</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">A:</span>
                          <span className="font-mono bg-purple-200 text-purple-800 px-2 py-1 rounded">110</span>
                          <span className="text-xs text-gray-500">(3 bits)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">B:</span>
                          <span className="font-mono bg-purple-200 text-purple-800 px-2 py-1 rounded">10</span>
                          <span className="text-xs text-gray-500">(4 bits)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">C:</span>
                          <span className="font-mono bg-purple-200 text-purple-800 px-2 py-1 rounded">011</span>
                          <span className="text-xs text-gray-500">(3 bits)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">D:</span>
                          <span className="font-mono bg-purple-200 text-purple-800 px-2 py-1 rounded">111</span>
                          <span className="text-xs text-gray-500">(3 bits)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">E:</span>
                          <span className="font-mono bg-purple-200 text-purple-800 px-2 py-1 rounded">1111</span>
                          <span className="text-xs text-gray-500">(4 bits)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Operation Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Operation</h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
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
                  {operation === 'knapsack' && selectedLanguage === 'javascript' && `// JavaScript Knapsack - O(nW)
function knapsack(items, capacity) {
    // Sort by value/weight ratio
    const sorted = items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    
    let totalValue = 0;
    let totalWeight = 0;
    const selected = [];
    
    for (const item of sorted) {
        if (totalWeight + item.weight <= capacity) {
            selected.push(item);
            totalValue += item.value;
            totalWeight += item.weight;
        }
    }
    
    return { selected, totalValue, totalWeight };
}

// Example usage
const items = [
    { value: 60, weight: 10 },
    { value: 100, weight: 20 },
    { value: 120, weight: 30 }
];
const result = knapsack(items, 50);
console.log('Total value:', result.totalValue);`}
                  {operation === 'knapsack' && selectedLanguage === 'python' && `# Python Knapsack - O(nW)
def knapsack(items, capacity):
    # Sort by value/weight ratio
    sorted_items = sorted(items, key=lambda x: x[1]/x[0], reverse=True)
    
    total_value = 0
    total_weight = 0
    selected = []
    
    for item in sorted_items:
        if total_weight + item[0] <= capacity:
            selected.append(item)
            total_value += item[1]
            total_weight += item[0]
    
    return {'selected': selected, 'total_value': total_value, 'total_weight': total_weight}

# Example usage
items = [(60, 10), (100, 20), (120, 30)]
result = knapsack(items, 50)
print('Total value:', result['total_value'])`}
                  {operation === 'coin-change' && selectedLanguage === 'javascript' && `// JavaScript Coin Change - O(n)
function coinChange(amount, coins) {
    coins.sort((a, b) => b - a); // Sort descending
    let count = 0;
    
    for (const coin of coins) {
        while (amount >= coin) {
            amount -= coin;
            count++;
        }
    }
    
    return count;
}

// Example usage
console.log(coinChange(63, [25, 10, 5, 1])); // Returns 6`}
                  {operation === 'coin-change' && selectedLanguage === 'python' && `# Python Coin Change - O(n)
def coin_change(amount, coins):
    coins.sort(reverse=True)  # Sort descending
    count = 0
    
    for coin in coins:
        while amount >= coin:
            amount -= coin
            count += 1
    
    return count

# Example usage
print(coin_change(63, [25, 10, 5, 1]))  # Returns 6`}
                  {operation === 'activity-selection' && selectedLanguage === 'javascript' && `// JavaScript Activity Selection - O(n log n)
function activitySelection(activities) {
    // Sort by end time
    const sorted = activities.sort((a, b) => a.end - b.end);
    
    let count = 0;
    let lastEnd = -1;
    
    for (const activity of sorted) {
        if (activity.start >= lastEnd) {
            count++;
            lastEnd = activity.end;
        }
    }
    
    return count;
}

// Example usage
const activities = [
    { start: 1, end: 4, name: 'A1' },
    { start: 3, end: 5, name: 'A2' },
    { start: 0, end: 6, name: 'A3' }
];
console.log(activitySelection(activities)); // Returns 2`}
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
                      <span>Knapsack:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(nW)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coin Change:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activity Selection:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Huffman Coding:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n log n)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">O(n)</span>
                </div>
              </div>
            </div>

            {/* When to Use */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Optimization problems</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Resource allocation</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Scheduling problems</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Data compression</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Shortest path problems</span>
                </div>
              </div>
            </div>

            {/* Common Patterns */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Patterns</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Sort and Select</h4>
                  <p className="text-gray-600">Sort by ratio and pick optimal items</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Greedy Choice</h4>
                  <p className="text-gray-600">Make best local choice at each step</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Proof Strategy</h4>
                  <p className="text-gray-600">Exchange argument to prove optimality</p>
                </div>
              </div>
            </div>

            {/* Advantages & Limitations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advantages & Limitations</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Advantages</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Simple to implement</li>
                    <li>• Fast execution</li>
                    <li>• Good approximations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Limitations</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Not always optimal</li>
                    <li>• Requires proof of correctness</li>
                    <li>• May need backtracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}