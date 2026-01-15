'use client';

import Link from 'next/link';
import { useState } from 'react';

interface DPState {
  table: number[][];
  currentCell: { row: number; col: number } | null;
  path: { row: number; col: number }[];
  result: number;
  steps: string[];
}

export default function DynamicProgrammingPage() {
  const [operation, setOperation] = useState('fibonacci');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [n, setN] = useState(5);
  const [capacity, setCapacity] = useState(50);
  const [weights, setWeights] = useState<number[]>([10, 20, 30]);
  const [values, setValues] = useState<number[]>([60, 100, 120]);
  const [grid, setGrid] = useState<number[][]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dpState, setDpState] = useState<DPState>({
    table: [],
    currentCell: null,
    path: [],
    result: 0,
    steps: []
  });

  const operations = [
    {
      id: 'fibonacci',
      name: 'Fibonacci',
      description: 'Calculate nth Fibonacci number',
      complexity: 'O(n)'
    },
    {
      id: 'knapsack',
      name: 'Knapsack',
      description: '0/1 Knapsack problem',
      complexity: 'O(nW)'
    },
    {
      id: 'lcs',
      name: 'LCS',
      description: 'Longest Common Subsequence',
      complexity: 'O(mn)'
    },
    {
      id: 'coinchange',
      name: 'Coin Change',
      description: 'Minimum coins to make amount',
      complexity: 'O(nm)'
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const fibonacciDP = async () => {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;
    
    const steps: string[] = [];
    const table: number[][] = [];
    
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
      steps.push(`F(${i}) = F(${i-1}) + F(${i-2}) = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`);
      
      // Update table for visualization
      const currentRow = [...dp];
      table.push([...currentRow]);
      setDpState(prev => ({
        ...prev,
        table: [...table],
        currentCell: { row: table.length - 1, col: i },
        result: dp[i],
        steps: [...steps]
      }));
      
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setDpState(prev => ({ ...prev, currentCell: null }));
  };

  const knapsackDP = async () => {
    const dp = Array(weights.length + 1).fill(null).map(() => Array(capacity + 1).fill(0));
    const path: { row: number; col: number }[] = [];
    const steps: string[] = [];
    
    for (let i = 1; i <= weights.length; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (weights[i - 1] <= w) {
          const include = values[i - 1] + dp[i - 1][w - weights[i - 1]];
          const exclude = dp[i - 1][w];
          dp[i][w] = Math.max(include, exclude);
          
          if (include > exclude) {
            path.push({ row: i, col: w });
          }
        } else {
          dp[i][w] = dp[i - 1][w];
        }
        
        setDpState(prev => ({
          ...prev,
          table: dp.map(row => [...row]),
          currentCell: { row: i, col: w },
          result: dp[weights.length][capacity],
          steps: [`Item ${i}, Capacity ${w}: Max(${dp[i][w]})`]
        }));
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    setDpState(prev => ({ ...prev, currentCell: null }));
  };

  const lcsDP = async () => {
    const str1 = "ABCBDAB";
    const str2 = "BDCABA";
    const m = str1.length;
    const n = str2.length;
    
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    const steps: string[] = [];
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          steps.push(`Match: ${str1[i - 1]} at (${i},${j})`);
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
        
        setDpState(prev => ({
          ...prev,
          table: dp.map(row => [...row]),
          currentCell: { row: i, col: j },
          result: dp[m][n],
          steps: [...steps]
        }));
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    setDpState(prev => ({ ...prev, currentCell: null }));
  };

  const coinChangeDP = async () => {
    const coins = [1, 3, 4];
    const amount = 6;
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    const steps: string[] = [];
    
    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        if (i >= coin) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
      }
      
      steps.push(`Amount ${i}: Min coins = ${dp[i]}`);
      
      setDpState(prev => ({
        ...prev,
        table: [dp],
        currentCell: { row: 0, col: i },
        result: dp[amount],
        steps: [...steps]
      }));
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setDpState(prev => ({ ...prev, currentCell: null }));
  };

  const runAnimation = async () => {
    setIsAnimating(true);
    setDpState({
      table: [],
      currentCell: null,
      path: [],
      result: 0,
      steps: []
    });

    switch (operation) {
      case 'fibonacci':
        await fibonacciDP();
        break;
      case 'knapsack':
        await knapsackDP();
        break;
      case 'lcs':
        await lcsDP();
        break;
      case 'coinchange':
        await coinChangeDP();
        break;
    }

    setIsAnimating(false);
  };

  const renderTable = () => {
    if (dpState.table.length === 0) return null;

    return (
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr>
              {operation === 'fibonacci' && (
                <>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-50">n</th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-50">F(n)</th>
                </>
              )}
              {operation === 'knapsack' && (
                <>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-50">Item</th>
                  {Array.from({ length: capacity + 1 }, (_, i) => (
                    <th key={i} className="border border-gray-300 px-4 py-2 bg-gray-50">{i}</th>
                  ))}
                </>
              )}
              {operation === 'lcs' && (
                <>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-50">""</th>
                  {"BDCABA".split('').map((char, i) => (
                    <th key={i} className="border border-gray-300 px-4 py-2 bg-gray-50">{char}</th>
                  ))}
                </>
              )}
              {operation === 'coinchange' && (
                <>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-50">Amount</th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-50">Min Coins</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {dpState.table.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {operation === 'fibonacci' && (
                  <>
                    <td className="border border-gray-300 px-4 py-2">{rowIndex}</td>
                    <td className="border border-gray-300 px-4 py-2">{rowIndex > 0 ? row[rowIndex] : 0}</td>
                  </>
                )}
                {operation === 'knapsack' && (
                  <>
                    <td className="border border-gray-300 px-4 py-2">
                      {rowIndex === 0 ? '0' : `Item ${rowIndex}`}
                    </td>
                    {row.map((cell, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border border-gray-300 px-4 py-2 text-center ${
                          dpState.currentCell?.row === rowIndex && dpState.currentCell?.col === colIndex
                            ? 'bg-blue-100 font-bold'
                            : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </>
                )}
                {operation === 'lcs' && (
                  <>
                    <td className="border border-gray-300 px-4 py-2">
                      {rowIndex === 0 ? '""' : "ABCBDAB"[rowIndex - 1]}
                    </td>
                    {row.map((cell, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border border-gray-300 px-4 py-2 text-center ${
                          dpState.currentCell?.row === rowIndex && dpState.currentCell?.col === colIndex
                            ? 'bg-blue-100 font-bold'
                            : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </>
                )}
                {operation === 'coinchange' && (
                  <>
                    <td className="border border-gray-300 px-4 py-2">{rowIndex}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {rowIndex === 0 ? 0 : (row[rowIndex] === Infinity ? '∞' : row[rowIndex])}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
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
              <i className="ri-calculator-line text-2xl text-orange-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Dynamic Programming</h1>
              <p className="text-gray-600">Optimization technique breaking complex problems into simpler subproblems</p>
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

              {/* Operation Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Problem</h3>
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

              {/* Input Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Input Parameters</h3>
                <div className="flex items-center space-x-4">
                  {operation === 'fibonacci' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">n:</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={n}
                        onChange={(e) => setN(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                      />
                    </div>
                  )}
                  {operation === 'knapsack' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700">Capacity:</label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={capacity}
                          onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
                          className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          disabled={isAnimating}
                        />
                      </div>
                      <div className="text-sm text-gray-600">
                        Weights: [{weights.join(', ')}] Values: [{values.join(', ')}]
                      </div>
                    </>
                  )}
                  {operation === 'lcs' && (
                    <div className="text-sm text-gray-600">
                      Strings: "ABCBDAB" and "BDCABA"
                    </div>
                  )}
                  {operation === 'coinchange' && (
                    <div className="text-sm text-gray-600">
                      Coins: [1, 3, 4] Target: 6
                    </div>
                  )}
                </div>
              </div>

              {/* DP Table Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">DP Table</h3>
                <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                  {renderTable()}
                </div>
              </div>

              {/* Result Display */}
              {dpState.result > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Result</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-mono text-lg">
                      {operation === 'fibonacci' && `F(${n}) = ${dpState.result}`}
                      {operation === 'knapsack' && `Maximum Value: ${dpState.result}`}
                      {operation === 'lcs' && `LCS Length: ${dpState.result}`}
                      {operation === 'coinchange' && `Min Coins: ${dpState.result}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Steps Display */}
              {dpState.steps.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Steps</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-h-40 overflow-y-auto">
                    {dpState.steps.map((step, index) => (
                      <div key={index} className="text-blue-800 text-sm mb-1">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Operation Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {currentOperation.name}: {currentOperation.description}
                </h3>
                <div className="text-sm text-gray-600">
                  <p>Complexity: {currentOperation.complexity}</p>
                  {operation === 'fibonacci' && <p>F(n) = F(n-1) + F(n-2) with memoization</p>}
                  {operation === 'knapsack' && <p>Maximize value without exceeding capacity</p>}
                  {operation === 'lcs' && <p>Find longest common subsequence between strings</p>}
                  {operation === 'coinchange' && <p>Minimum coins to make target amount</p>}
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
                  {operation === 'fibonacci' && selectedLanguage === 'javascript' && `// JavaScript Fibonacci DP - O(n)
function fibonacci(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}`}
                  {operation === 'knapsack' && selectedLanguage === 'javascript' && `// JavaScript Knapsack DP - O(nW)
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        const include = values[i - 1] + dp[i - 1][w - weights[i - 1]];
        const exclude = dp[i - 1][w];
        dp[i][w] = Math.max(include, exclude);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  return dp[n][capacity];
}`}
                  {operation === 'lcs' && selectedLanguage === 'javascript' && `// JavaScript LCS DP - O(mn)
function lcs(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}`}
                  {operation === 'coinchange' && selectedLanguage === 'javascript' && `// JavaScript Coin Change DP - O(nm)
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount];
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* DP Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">DP Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Optimal substructure</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Overlapping subproblems</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Tabulation (bottom-up)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Memoization (top-down)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Space-time tradeoff</span>
                </div>
              </div>
            </div>

            {/* DP Approaches */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">DP Approaches</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Top-Down</h4>
                  <p className="text-sm text-gray-700">Recursion with memoization</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Bottom-Up</h4>
                  <p className="text-sm text-gray-700">Iterative tabulation</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Space Optimized</h4>
                  <p className="text-sm text-gray-700">Reduce space complexity</p>
                </div>
              </div>
            </div>

            {/* Complexity Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complexity Analysis</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Time Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Fibonacci:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Knapsack:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(nW)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LCS:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(mn)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coin Change:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(nm)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Standard:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(n²)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Optimized:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DP Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">DP Applications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Sequence Alignment</h4>
                  <p className="text-sm text-gray-700">Bioinformatics</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Resource Allocation</h4>
                  <p className="text-sm text-gray-700">Operations research</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Path Finding</h4>
                  <p className="text-sm text-gray-700">Shortest path algorithms</p>
                </div>
              </div>
            </div>

            {/* Common DP Problems */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Problems</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Fibonacci</h4>
                  <p className="text-sm text-gray-700">Classic sequence problem</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Knapsack</h4>
                  <p className="text-sm text-gray-700">Resource optimization</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-1">LCS</h4>
                  <p className="text-sm text-gray-700">String similarity</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Coin Change</h4>
                  <p className="text-sm text-gray-700">Currency exchange</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}