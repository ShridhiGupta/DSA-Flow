'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function BacktrackingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operation, setOperation] = useState('n-queens');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [nQueensSize, setNQueensSize] = useState(4);
  const [queensBoard, setQueensBoard] = useState<number[][]>([]);
  const [sudokuGrid, setSudokuGrid] = useState<number[][]>([]);
  const [parenthesesCount, setParenthesesCount] = useState(3);
  const [parenthesesResult, setParenthesesResult] = useState<string[]>([]);
  const [subsetArray, setSubsetArray] = useState([1, 2, 3]);
  const [subsetResult, setSubsetResult] = useState<number[][]>([]);
  const [permutationArray, setPermutationArray] = useState([1, 2, 3]);
  const [permutationResult, setPermutationResult] = useState<number[][]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>('');

  const operations = [
    {
      id: 'n-queens',
      name: 'N-Queens',
      description: 'Place N queens on an N×N board so no two queens attack each other',
      complexity: 'O(N!)',
      steps: ['Try placing queen in each row', 'Check if position is safe', 'Backtrack if no valid position', 'Continue until all queens placed']
    },
    {
      id: 'sudoku',
      name: 'Sudoku Solver',
      description: 'Solve a 9×9 Sudoku puzzle using backtracking',
      complexity: 'O(9^m)',
      steps: ['Find empty cell', 'Try numbers 1-9', 'Check if valid placement', 'Backtrack if no solution']
    },
    {
      id: 'parentheses',
      name: 'Generate Parentheses',
      description: 'Generate all valid combinations of n pairs of parentheses',
      complexity: 'O(4^n/√n)',
      steps: ['Add opening parenthesis if count < n', 'Add closing parenthesis if count > open', 'Backtrack when string complete']
    },
    {
      id: 'subsets',
      name: 'Subset Generation',
      description: 'Generate all possible subsets of an array',
      complexity: 'O(2^n)',
      steps: ['Include current element', 'Exclude current element', 'Recurse for remaining elements', 'Add to result when done']
    },
    {
      id: 'permutations',
      name: 'Permutations',
      description: 'Generate all permutations of an array',
      complexity: 'O(n!)',
      steps: ['Swap current element with each remaining', 'Recurse for remaining positions', 'Backtrack by swapping back', 'Add permutation when complete']
    }
  ];

  const currentOp = operations.find(op => op.id === operation) || operations[0];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setQueensBoard([]);
    setSudokuGrid([]);
    setParenthesesResult([]);
    setSubsetResult([]);
    setPermutationResult([]);
    setCurrentOperation('');

    switch (operation) {
      case 'n-queens':
        await animateNQueens();
        break;
      case 'sudoku':
        await animateSudoku();
        break;
      case 'parentheses':
        await animateParentheses();
        break;
      case 'subsets':
        await animateSubsets();
        break;
      case 'permutations':
        await animatePermutations();
        break;
    }

    setIsAnimating(false);
  };

  const animateNQueens = async () => {
    const board: number[][] = Array(nQueensSize).fill(null).map(() => Array(nQueensSize).fill(0));
    const solutions: number[][][] = [];
    
    // Initialize empty board
    const initialBoard = board.map(r => [...r]);
    setQueensBoard(initialBoard);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const isSafe = (board: number[][], row: number, col: number): boolean => {
      // Check column
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
      }
      // Check diagonal
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
      }
      // Check anti-diagonal
      for (let i = row, j = col; i >= 0 && j < nQueensSize; i--, j++) {
        if (board[i][j] === 1) return false;
      }
      return true;
    };

    const solve = async (row: number): Promise<boolean> => {
      if (row === nQueensSize) {
        const solution = board.map(r => [...r]);
        solutions.push(solution);
        // Ensure we create a new array reference for React
        setQueensBoard(solution.map(r => [...r]));
        setCurrentOperation(`Solution found! All ${nQueensSize} queens placed.`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return true;
      }

      for (let col = 0; col < nQueensSize; col++) {
        setCurrentStep(1);
        setCurrentOperation(`Trying to place queen at row ${row}, col ${col}`);
        await new Promise(resolve => setTimeout(resolve, 800));

        if (isSafe(board, row, col)) {
          setCurrentStep(2);
          board[row][col] = 1;
          // Create a deep copy to ensure React detects the change
          setQueensBoard(board.map(r => [...r]));
          setCurrentOperation(`Queen placed at (${row}, ${col}) - Safe position`);
          await new Promise(resolve => setTimeout(resolve, 1000));

          if (await solve(row + 1)) {
            return true;
          }

          setCurrentStep(3);
          board[row][col] = 0;
          // Create a deep copy to ensure React detects the change
          setQueensBoard(board.map(r => [...r]));
          setCurrentOperation(`Backtracking from (${row}, ${col}) - No solution found`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          setCurrentOperation(`Position (${row}, ${col}) is not safe - Queen would be attacked`);
          await new Promise(resolve => setTimeout(resolve, 600));
        }
      }

      return false;
    };

    await solve(0);
    setCurrentStep(4);
  };

  const animateSudoku = async () => {
    const grid = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    setSudokuGrid(grid.map(r => [...r]));

    const isValid = (grid: number[][], row: number, col: number, num: number): boolean => {
      // Check row
      for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
      }
      // Check column
      for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
      }
      // Check box
      const startRow = row - row % 3;
      const startCol = col - col % 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i + startRow][j + startCol] === num) return false;
        }
      }
      return true;
    };

    const solve = async (): Promise<boolean> => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            setCurrentStep(1);
            setCurrentOperation(`Found empty cell at (${row}, ${col})`);
            await new Promise(resolve => setTimeout(resolve, 500));

            for (let num = 1; num <= 9; num++) {
              setCurrentStep(2);
              setCurrentOperation(`Trying number ${num} at (${row}, ${col})`);
              await new Promise(resolve => setTimeout(resolve, 300));

              if (isValid(grid, row, col, num)) {
                setCurrentStep(3);
                grid[row][col] = num;
                setSudokuGrid(grid.map(r => [...r]));
                setCurrentOperation(`Placed ${num} at (${row}, ${col}) - Valid`);
                await new Promise(resolve => setTimeout(resolve, 500));

                if (await solve()) {
                  return true;
                }

                setCurrentStep(4);
                grid[row][col] = 0;
                setSudokuGrid(grid.map(r => [...r]));
                setCurrentOperation(`Backtracking from (${row}, ${col}) - No solution`);
                await new Promise(resolve => setTimeout(resolve, 500));
              }
            }
            return false;
          }
        }
      }
      setCurrentOperation('Sudoku solved!');
      return true;
    };

    await solve();
  };

  const animateParentheses = async () => {
    const result: string[] = [];
    
    const generate = async (current: string, open: number, close: number) => {
      if (current.length === parenthesesCount * 2) {
        result.push(current);
        setParenthesesResult([...result]);
        setCurrentOperation(`Generated: ${current}`);
        await new Promise(resolve => setTimeout(resolve, 800));
        return;
      }

      if (open < parenthesesCount) {
        setCurrentStep(1);
        setCurrentOperation(`Adding opening parenthesis: ${current}(`);
        await new Promise(resolve => setTimeout(resolve, 600));
        await generate(current + '(', open + 1, close);
      }

      if (close < open) {
        setCurrentStep(2);
        setCurrentOperation(`Adding closing parenthesis: ${current})`);
        await new Promise(resolve => setTimeout(resolve, 600));
        await generate(current + ')', open, close + 1);
      }
    };

    await generate('', 0, 0);
    setCurrentStep(3);
    setCurrentOperation(`Generated ${result.length} valid combinations`);
  };

  const animateSubsets = async () => {
    const result: number[][] = [];
    const current: number[] = [];

    const generate = async (index: number) => {
      if (index === subsetArray.length) {
        result.push([...current]);
        setSubsetResult([...result]);
        setCurrentOperation(`Subset: [${current.join(', ')}]`);
        await new Promise(resolve => setTimeout(resolve, 600));
        return;
      }

      // Include current element
      setCurrentStep(1);
      current.push(subsetArray[index]);
      setCurrentOperation(`Including ${subsetArray[index]}: [${current.join(', ')}]`);
      await new Promise(resolve => setTimeout(resolve, 600));
      await generate(index + 1);

      // Exclude current element (backtrack)
      setCurrentStep(2);
      current.pop();
      setCurrentOperation(`Excluding ${subsetArray[index]}: [${current.join(', ')}]`);
      await new Promise(resolve => setTimeout(resolve, 600));
      await generate(index + 1);
    };

    await generate(0);
    setCurrentStep(3);
    setCurrentOperation(`Generated ${result.length} subsets`);
  };

  const animatePermutations = async () => {
    const result: number[][] = [];
    const arr = [...permutationArray];

    const generate = async (index: number) => {
      if (index === arr.length) {
        result.push([...arr]);
        setPermutationResult([...result]);
        setCurrentOperation(`Permutation: [${arr.join(', ')}]`);
        await new Promise(resolve => setTimeout(resolve, 600));
        return;
      }

      for (let i = index; i < arr.length; i++) {
        setCurrentStep(1);
        [arr[index], arr[i]] = [arr[i], arr[index]];
        setCurrentOperation(`Swapping positions ${index} and ${i}: [${arr.join(', ')}]`);
        await new Promise(resolve => setTimeout(resolve, 600));

        setCurrentStep(2);
        await generate(index + 1);

        setCurrentStep(3);
        [arr[index], arr[i]] = [arr[i], arr[index]];
        setCurrentOperation(`Backtracking: [${arr.join(', ')}]`);
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    };

    await generate(0);
    setCurrentStep(4);
    setCurrentOperation(`Generated ${result.length} permutations`);
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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-arrow-go-back-line text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Backtracking</h1>
              <p className="text-gray-600">Systematic method to explore all possible solutions by building candidates incrementally and abandoning partial solutions that cannot lead to a valid solution</p>
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
                  {operation === 'n-queens' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">N =</label>
                      <input
                        type="number"
                        min="4"
                        max="6"
                        value={nQueensSize}
                        onChange={(e) => setNQueensSize(parseInt(e.target.value) || 4)}
                        className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                      />
                    </div>
                  )}
                  {operation === 'parentheses' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">n =</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={parenthesesCount}
                        onChange={(e) => setParenthesesCount(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                      />
                    </div>
                  )}
                  {operation === 'subsets' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Array:</label>
                      <input
                        type="text"
                        value={subsetArray.join(', ')}
                        onChange={(e) => {
                          const arr = e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                          if (arr.length > 0) setSubsetArray(arr);
                        }}
                        className="w-40 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                        placeholder="1, 2, 3"
                      />
                    </div>
                  )}
                  {operation === 'permutations' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Array:</label>
                      <input
                        type="text"
                        value={permutationArray.join(', ')}
                        onChange={(e) => {
                          const arr = e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                          if (arr.length > 0) setPermutationArray(arr);
                        }}
                        className="w-40 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                        placeholder="1, 2, 3"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Operation Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Problem</h3>
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

              {/* N-Queens Visualization */}
              {operation === 'n-queens' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">N-Queens Board</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-center">
                      {queensBoard.length > 0 ? (
                        <div className="grid gap-0 border-2 border-gray-800" style={{ gridTemplateColumns: `repeat(${nQueensSize}, 1fr)` }}>
                          {queensBoard.map((row, i) =>
                            row.map((cell, j) => (
                              <div
                                key={`${i}-${j}`}
                                className={`w-12 h-12 flex items-center justify-center border border-gray-300 ${
                                  (i + j) % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                                }`}
                              >
                                {cell === 1 && (
                                  <i className="ri-queen-fill text-2xl text-red-600"></i>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      ) : (
                        <div className="grid gap-0 border-2 border-gray-800" style={{ gridTemplateColumns: `repeat(${nQueensSize}, 1fr)` }}>
                          {Array(nQueensSize).fill(null).map((_, i) =>
                            Array(nQueensSize).fill(null).map((_, j) => (
                              <div
                                key={`${i}-${j}`}
                                className={`w-12 h-12 flex items-center justify-center border border-gray-300 ${
                                  (i + j) % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                                }`}
                              >
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Sudoku Visualization */}
              {operation === 'sudoku' && (sudokuGrid.length > 0 || isAnimating) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sudoku Grid</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-center">
                      <div className="grid gap-0 border-2 border-gray-800" style={{ gridTemplateColumns: 'repeat(9, 1fr)' }}>
                        {sudokuGrid.map((row, i) =>
                          row.map((cell, j) => (
                            <div
                              key={`${i}-${j}`}
                              className={`w-8 h-8 flex items-center justify-center border border-gray-300 text-sm font-semibold ${
                                (Math.floor(i / 3) + Math.floor(j / 3)) % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                              } ${cell === 0 ? 'text-gray-400' : 'text-gray-900'}`}
                            >
                              {cell !== 0 ? cell : ''}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Parentheses Result */}
              {operation === 'parentheses' && parenthesesResult.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated Parentheses</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {parenthesesResult.map((p, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded font-mono text-sm">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Subsets Result */}
              {operation === 'subsets' && subsetResult.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated Subsets</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {subsetResult.map((subset, i) => (
                        <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded font-mono text-sm">
                          [{subset.join(', ')}]
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Permutations Result */}
              {operation === 'permutations' && permutationResult.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated Permutations</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {permutationResult.map((perm, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded font-mono text-sm">
                          [{perm.join(', ')}]
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
                  {operation === 'n-queens' && selectedLanguage === 'javascript' && `// JavaScript N-Queens - O(N!)
function solveNQueens(n) {
    const board = Array(n).fill(null).map(() => Array(n).fill(0));
    const solutions = [];
    
    function isSafe(board, row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 1) return false;
        }
        // Check diagonals
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 1) return false;
        }
        for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 1) return false;
        }
        return true;
    }
    
    function solve(row) {
        if (row === n) {
            solutions.push(board.map(r => [...r]));
            return true;
        }
        
        for (let col = 0; col < n; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = 1;
                if (solve(row + 1)) return true;
                board[row][col] = 0; // Backtrack
            }
        }
        return false;
    }
    
    solve(0);
    return solutions;
}`}
                  {operation === 'n-queens' && selectedLanguage === 'python' && `# Python N-Queens - O(N!)
def solve_n_queens(n):
    board = [[0] * n for _ in range(n)]
    solutions = []
    
    def is_safe(board, row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 1:
                return False
        # Check diagonals
        i, j = row, col
        while i >= 0 and j >= 0:
            if board[i][j] == 1:
                return False
            i -= 1
            j -= 1
        i, j = row, col
        while i >= 0 and j < n:
            if board[i][j] == 1:
                return False
            i -= 1
            j += 1
        return True
    
    def solve(row):
        if row == n:
            solutions.append([row[:] for row in board])
            return True
        
        for col in range(n):
            if is_safe(board, row, col):
                board[row][col] = 1
                if solve(row + 1):
                    return True
                board[row][col] = 0  # Backtrack
        return False
    
    solve(0)
    return solutions`}
                  {operation === 'n-queens' && selectedLanguage === 'java' && `// Java N-Queens - O(N!)
public class NQueens {
    public static List<int[][]> solveNQueens(int n) {
        int[][] board = new int[n][n];
        List<int[][]> solutions = new ArrayList<>();
        
        if (solve(board, 0, n, solutions)) {
            return solutions;
        }
        return solutions;
    }
    
    private static boolean isSafe(int[][] board, int row, int col, int n) {
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 1) return false;
        }
        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 1) return false;
        }
        for (int i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (board[i][j] == 1) return false;
        }
        return true;
    }
    
    private static boolean solve(int[][] board, int row, int n, List<int[][]> solutions) {
        if (row == n) {
            solutions.add(copyBoard(board));
            return true;
        }
        
        for (int col = 0; col < n; col++) {
            if (isSafe(board, row, col, n)) {
                board[row][col] = 1;
                if (solve(board, row + 1, n, solutions)) {
                    return true;
                }
                board[row][col] = 0; // Backtrack
            }
        }
        return false;
    }
}`}
                  {operation === 'n-queens' && selectedLanguage === 'cpp' && `// C++ N-Queens - O(N!)
#include <vector>
using namespace std;

bool isSafe(vector<vector<int>>& board, int row, int col, int n) {
    for (int i = 0; i < row; i++) {
        if (board[i][col] == 1) return false;
    }
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 1) return false;
    }
    for (int i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j] == 1) return false;
    }
    return true;
}

bool solve(vector<vector<int>>& board, int row, int n) {
    if (row == n) {
        return true;
    }
    
    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 1;
            if (solve(board, row + 1, n)) {
                return true;
            }
            board[row][col] = 0; // Backtrack
        }
    }
    return false;
}`}
                  {operation === 'sudoku' && selectedLanguage === 'javascript' && `// JavaScript Sudoku Solver - O(9^m)
function solveSudoku(grid) {
    function isValid(grid, row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num) return false;
        }
        // Check column
        for (let x = 0; x < 9; x++) {
            if (grid[x][col] === num) return false;
        }
        // Check box
        const startRow = row - row % 3;
        const startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num) return false;
            }
        }
        return true;
    }
    
    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (solve()) return true;
                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    return solve();
}`}
                  {operation === 'sudoku' && selectedLanguage === 'python' && `# Python Sudoku Solver - O(9^m)
def solve_sudoku(grid):
    def is_valid(grid, row, col, num):
        # Check row
        for x in range(9):
            if grid[row][x] == num:
                return False
        # Check column
        for x in range(9):
            if grid[x][col] == num:
                return False
        # Check box
        start_row = row - row % 3
        start_col = col - col % 3
        for i in range(3):
            for j in range(3):
                if grid[i + start_row][j + start_col] == num:
                    return False
        return True
    
    def solve():
        for row in range(9):
            for col in range(9):
                if grid[row][col] == 0:
                    for num in range(1, 10):
                        if is_valid(grid, row, col, num):
                            grid[row][col] = num
                            if solve():
                                return True
                            grid[row][col] = 0  # Backtrack
                    return False
        return True
    
    return solve()`}
                  {operation === 'sudoku' && selectedLanguage === 'java' && `// Java Sudoku Solver - O(9^m)
public class SudokuSolver {
    public static boolean solveSudoku(int[][] grid) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (grid[row][col] == 0) {
                    for (int num = 1; num <= 9; num++) {
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (solveSudoku(grid)) {
                                return true;
                            }
                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    private static boolean isValid(int[][] grid, int row, int col, int num) {
        for (int x = 0; x < 9; x++) {
            if (grid[row][x] == num || grid[x][col] == num) {
                return false;
            }
        }
        int startRow = row - row % 3;
        int startCol = col - col % 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] == num) {
                    return false;
                }
            }
        }
        return true;
    }
}`}
                  {operation === 'sudoku' && selectedLanguage === 'cpp' && `// C++ Sudoku Solver - O(9^m)
#include <vector>
using namespace std;

bool isValid(vector<vector<int>>& grid, int row, int col, int num) {
    for (int x = 0; x < 9; x++) {
        if (grid[row][x] == num || grid[x][col] == num) {
            return false;
        }
    }
    int startRow = row - row % 3;
    int startCol = col - col % 3;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }
    return true;
}

bool solveSudoku(vector<vector<int>>& grid) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (grid[row][col] == 0) {
                for (int num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solveSudoku(grid)) {
                            return true;
                        }
                        grid[row][col] = 0; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}`}
                  {operation === 'parentheses' && selectedLanguage === 'javascript' && `// JavaScript Generate Parentheses - O(4^n/√n)
function generateParenthesis(n) {
    const result = [];
    
    function generate(current, open, close) {
        if (current.length === n * 2) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            generate(current + '(', open + 1, close);
        }
        
        if (close < open) {
            generate(current + ')', open, close + 1);
        }
    }
    
    generate('', 0, 0);
    return result;
}`}
                  {operation === 'parentheses' && selectedLanguage === 'python' && `# Python Generate Parentheses - O(4^n/√n)
def generate_parenthesis(n):
    result = []
    
    def generate(current, open_count, close_count):
        if len(current) == n * 2:
            result.append(current)
            return
        
        if open_count < n:
            generate(current + '(', open_count + 1, close_count)
        
        if close_count < open_count:
            generate(current + ')', open_count, close_count + 1)
    
    generate('', 0, 0)
    return result`}
                  {operation === 'parentheses' && selectedLanguage === 'java' && `// Java Generate Parentheses - O(4^n/√n)
import java.util.*;

public class GenerateParentheses {
    public static List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        generate(result, "", 0, 0, n);
        return result;
    }
    
    private static void generate(List<String> result, String current, 
                                 int open, int close, int n) {
        if (current.length() == n * 2) {
            result.add(current);
            return;
        }
        
        if (open < n) {
            generate(result, current + "(", open + 1, close, n);
        }
        
        if (close < open) {
            generate(result, current + ")", open, close + 1, n);
        }
    }
}`}
                  {operation === 'parentheses' && selectedLanguage === 'cpp' && `// C++ Generate Parentheses - O(4^n/√n)
#include <vector>
#include <string>
using namespace std;

void generate(vector<string>& result, string current, 
              int open, int close, int n) {
    if (current.length() == n * 2) {
        result.push_back(current);
        return;
    }
    
    if (open < n) {
        generate(result, current + "(", open + 1, close, n);
    }
    
    if (close < open) {
        generate(result, current + ")", open, close + 1, n);
    }
}

vector<string> generateParenthesis(int n) {
    vector<string> result;
    generate(result, "", 0, 0, n);
    return result;
}`}
                  {operation === 'subsets' && selectedLanguage === 'javascript' && `// JavaScript Subset Generation - O(2^n)
function subsets(nums) {
    const result = [];
    const current = [];
    
    function generate(index) {
        if (index === nums.length) {
            result.push([...current]);
            return;
        }
        
        // Include current element
        current.push(nums[index]);
        generate(index + 1);
        
        // Exclude current element (backtrack)
        current.pop();
        generate(index + 1);
    }
    
    generate(0);
    return result;
}`}
                  {operation === 'subsets' && selectedLanguage === 'python' && `# Python Subset Generation - O(2^n)
def subsets(nums):
    result = []
    current = []
    
    def generate(index):
        if index == len(nums):
            result.append(current[:])
            return
        
        # Include current element
        current.append(nums[index])
        generate(index + 1)
        
        # Exclude current element (backtrack)
        current.pop()
        generate(index + 1)
    
    generate(0)
    return result`}
                  {operation === 'subsets' && selectedLanguage === 'java' && `// Java Subset Generation - O(2^n)
import java.util.*;

public class Subsets {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        generate(nums, 0, current, result);
        return result;
    }
    
    private static void generate(int[] nums, int index, 
                                 List<Integer> current, 
                                 List<List<Integer>> result) {
        if (index == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        // Include current element
        current.add(nums[index]);
        generate(nums, index + 1, current, result);
        
        // Exclude current element (backtrack)
        current.remove(current.size() - 1);
        generate(nums, index + 1, current, result);
    }
}`}
                  {operation === 'subsets' && selectedLanguage === 'cpp' && `// C++ Subset Generation - O(2^n)
#include <vector>
using namespace std;

void generate(vector<int>& nums, int index, 
              vector<int>& current, 
              vector<vector<int>>& result) {
    if (index == nums.size()) {
        result.push_back(current);
        return;
    }
    
    // Include current element
    current.push_back(nums[index]);
    generate(nums, index + 1, current, result);
    
    // Exclude current element (backtrack)
    current.pop_back();
    generate(nums, index + 1, current, result);
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    generate(nums, 0, current, result);
    return result;
}`}
                  {operation === 'permutations' && selectedLanguage === 'javascript' && `// JavaScript Permutations - O(n!)
function permute(nums) {
    const result = [];
    
    function generate(index) {
        if (index === nums.length) {
            result.push([...nums]);
            return;
        }
        
        for (let i = index; i < nums.length; i++) {
            [nums[index], nums[i]] = [nums[i], nums[index]];
            generate(index + 1);
            [nums[index], nums[i]] = [nums[i], nums[index]]; // Backtrack
        }
    }
    
    generate(0);
    return result;
}`}
                  {operation === 'permutations' && selectedLanguage === 'python' && `# Python Permutations - O(n!)
def permute(nums):
    result = []
    
    def generate(index):
        if index == len(nums):
            result.append(nums[:])
            return
        
        for i in range(index, len(nums)):
            nums[index], nums[i] = nums[i], nums[index]
            generate(index + 1)
            nums[index], nums[i] = nums[i], nums[index]  # Backtrack
    
    generate(0)
    return result`}
                  {operation === 'permutations' && selectedLanguage === 'java' && `// Java Permutations - O(n!)
import java.util.*;

public class Permutations {
    public static List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        generate(nums, 0, result);
        return result;
    }
    
    private static void generate(int[] nums, int index, 
                                List<List<Integer>> result) {
        if (index == nums.length) {
            List<Integer> perm = new ArrayList<>();
            for (int num : nums) {
                perm.add(num);
            }
            result.add(perm);
            return;
        }
        
        for (int i = index; i < nums.length; i++) {
            swap(nums, index, i);
            generate(nums, index + 1, result);
            swap(nums, index, i); // Backtrack
        }
    }
    
    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`}
                  {operation === 'permutations' && selectedLanguage === 'cpp' && `// C++ Permutations - O(n!)
#include <vector>
#include <algorithm>
using namespace std;

void generate(vector<int>& nums, int index, 
              vector<vector<int>>& result) {
    if (index == nums.size()) {
        result.push_back(nums);
        return;
    }
    
    for (int i = index; i < nums.size(); i++) {
        swap(nums[index], nums[i]);
        generate(nums, index + 1, result);
        swap(nums[index], nums[i]); // Backtrack
    }
}

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    generate(nums, 0, result);
    return result;
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
                      <span>N-Queens:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(N!)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sudoku:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(9^m)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parentheses:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(4^n/√n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subsets:</span>
                      <span className="font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">O(2^n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Permutations:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(n!)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Recursion Stack:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Result Storage:</span>
                      <span className="font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">O(2^n)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backtracking Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backtracking Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Systematic exploration of solution space</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Builds candidates incrementally</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Abandons invalid partial solutions</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Uses recursion for state space tree</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Backtracks when constraint violated</span>
                </div>
              </div>
            </div>

            {/* When to Use Backtracking */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use Backtracking</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Constraint Satisfaction</h4>
                  <p className="text-sm text-gray-700">Problems with constraints like N-Queens, Sudoku</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Combinatorial Problems</h4>
                  <p className="text-sm text-gray-700">Generating all combinations, permutations, subsets</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Decision Problems</h4>
                  <p className="text-sm text-gray-700">Finding if a solution exists or finding all solutions</p>
                </div>
              </div>
            </div>

            {/* Backtracking Template */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backtracking Template</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
{`function backtrack(candidate) {
    if (isSolution(candidate)) {
        addToResults(candidate);
        return;
    }
    
    for (nextCandidate in generateCandidates(candidate)) {
        if (isValid(nextCandidate)) {
            makeMove(nextCandidate);
            backtrack(nextCandidate);
            undoMove(nextCandidate); // Backtrack
        }
    }
}`}
                </pre>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Pitfalls</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Forgetting to Backtrack</h4>
                  <p className="text-sm text-gray-700">Must undo changes when backtracking</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Inefficient Pruning</h4>
                  <p className="text-sm text-gray-700">Not pruning early enough leads to exponential time</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-1">State Management</h4>
                  <p className="text-sm text-gray-700">Properly managing state during recursion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

