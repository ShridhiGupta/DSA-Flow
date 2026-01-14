'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RecursionPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operation, setOperation] = useState('factorial');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [factorialInput, setFactorialInput] = useState(5);
  const [fibonacciInput, setFibonacciInput] = useState(6);
  const [recursionTree, setRecursionTree] = useState<any[]>([]);
  const [currentNode, setCurrentNode] = useState<string>('');
  const [stack, setStack] = useState<any[]>([]);
  const [towers, setTowers] = useState<{ [key: string]: number[] }>({ A: [], B: [], C: [] });
  const [currentMove, setCurrentMove] = useState<string>('');
  const [diskColors] = useState<string[]>(['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500']);

  const operations = [
    {
      id: 'factorial',
      name: 'Factorial',
      description: 'Calculate factorial using recursion',
      complexity: 'O(n)',
      steps: ['Base case: n <= 1', 'Recursive case: n * factorial(n-1)', 'Return result']
    },
    {
      id: 'fibonacci',
      name: 'Fibonacci',
      description: 'Calculate Fibonacci sequence using recursion',
      complexity: 'O(2^n)',
      steps: ['Base case: n <= 1', 'Recursive case: fib(n-1) + fib(n-2)', 'Return sum']
    },
    {
      id: 'tower',
      name: 'Tower of Hanoi',
      description: 'Solve Tower of Hanoi puzzle',
      complexity: 'O(2^n)',
      steps: ['Base case: n = 1', 'Move n-1 disks to auxiliary', 'Move largest disk to target', 'Move n-1 disks to target']
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setRecursionTree([]);
    setCurrentNode('');
    setStack([]);

    switch (operation) {
      case 'factorial':
        await animateFactorial();
        break;
      case 'fibonacci':
        await animateFibonacci();
        break;
      case 'tower':
        await animateTower();
        break;
    }

    setIsAnimating(false);
  };

  const animateFactorial = async () => {
    const n = factorialInput;
    const callStack: any[] = [];
    
    const buildTree = (num: number, depth: number = 0): any => {
      if (num <= 1) {
        return { value: `fact(${num}) = 1`, depth, isBase: true };
      }
      return {
        value: `fact(${num})`,
        depth,
        children: [buildTree(num - 1, depth + 1)]
      };
    };

    const factorialTree = buildTree(n);
    setRecursionTree([factorialTree]);

    for (let step = 0; step < currentOperation.steps.length; step++) {
      setCurrentStep(step);
      
      if (step === 0) {
        setCurrentNode(`fact(${n})`);
        callStack.push({ call: `fact(${n})`, result: null });
        setStack([...callStack]);
      } else if (step === 1) {
        for (let i = n; i > 1; i--) {
          setCurrentNode(`fact(${i})`);
          await new Promise(resolve => setTimeout(resolve, 800));
          callStack.push({ call: `fact(${i})`, result: i * (i - 1) });
          setStack([...callStack]);
        }
      } else if (step === 2) {
        let result = 1;
        for (let i = 2; i <= n; i++) {
          result *= i;
        }
        setCurrentNode(`Result: ${result}`);
        callStack[callStack.length - 1].result = result;
        setStack([...callStack]);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  };

  const animateFibonacci = async () => {
    const n = fibonacciInput;
    
    const buildFibTree = (num: number, depth: number = 0): any => {
      if (num <= 1) {
        return { value: `fib(${num}) = ${num}`, depth, isBase: true };
      }
      return {
        value: `fib(${num})`,
        depth,
        children: [buildFibTree(num - 1, depth + 1), buildFibTree(num - 2, depth + 1)]
      };
    };

    const fibTree = buildFibTree(Math.min(n, 4)); // Limit tree depth for visualization
    setRecursionTree([fibTree]);

    for (let step = 0; step < currentOperation.steps.length; step++) {
      setCurrentStep(step);
      
      if (step === 0) {
        setCurrentNode(`fib(${n})`);
      } else if (step === 1) {
        setCurrentNode(`fib(${n}) = fib(${n-1}) + fib(${n-2})`);
      } else if (step === 2) {
        const fib = (num: number): number => {
          if (num <= 1) return num;
          return fib(num - 1) + fib(num - 2);
        };
        const result = fib(n);
        setCurrentNode(`fib(${n}) = ${result}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  };

  const animateTower = async () => {
    const n = 3; // Use 3 disks for visualization
    const moves: { disk: number; source: string; target: string }[] = [];
    
    // Initialize towers
    const initialTowers = { 
      A: [...Array(n).keys()].map(i => n - i), 
      B: [], 
      C: [] 
    };
    setTowers(initialTowers);
    
    const hanoi = (disks: number, source: string, target: string, auxiliary: string) => {
      if (disks === 1) {
        moves.push({ disk: 1, source, target });
        return;
      }
      hanoi(disks - 1, source, auxiliary, target);
      moves.push({ disk: disks, source, target });
      hanoi(disks - 1, auxiliary, target, source);
    };

    hanoi(n, 'A', 'C', 'B');

    for (let step = 0; step < currentOperation.steps.length; step++) {
      setCurrentStep(step);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Animate each move
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      setCurrentMove(`Move disk ${move.disk} from ${move.source} to ${move.target}`);
      setCurrentNode(`Move disk ${move.disk} from ${move.source} to ${move.target}`);
      
      // Perform the move
      setTowers(prev => {
        const newTowers = { ...prev };
        const disk = newTowers[move.source].pop();
        if (disk !== undefined) {
          newTowers[move.target].push(disk);
        }
        return newTowers;
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setCurrentMove('Puzzle Solved!');
    setCurrentNode('Tower of Hanoi completed!');
  };

  const renderTree = (node: any, index: number = 0) => {
    if (!node) return null;
    
    return (
      <div key={index} className="flex flex-col items-center">
        <div
          className={`px-3 py-2 rounded-lg border-2 text-sm font-medium ${
            node.isBase
              ? 'bg-green-100 border-green-300 text-green-800'
              : currentNode.includes(node.value)
              ? 'bg-blue-100 border-blue-300 text-blue-800'
              : 'bg-gray-100 border-gray-300 text-gray-700'
          }`}
        >
          {node.value}
        </div>
        {node.children && (
          <div className="flex gap-4 mt-2">
            {node.children.map((child: any, childIndex: number) => (
              <div key={childIndex} className="relative">
                <div className="absolute top-0 left-1/2 w-px h-2 bg-gray-400 -translate-x-1/2 -translate-y-full"></div>
                {renderTree(child, childIndex)}
              </div>
            ))}
          </div>
        )}
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
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-repeat-line text-2xl text-teal-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Recursion</h1>
              <p className="text-gray-600">Function calling itself to solve problems by breaking them into smaller subproblems</p>
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
                  {operation === 'factorial' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">n =</label>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        value={factorialInput}
                        onChange={(e) => setFactorialInput(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                      />
                    </div>
                  )}
                  {operation === 'fibonacci' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">n =</label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={fibonacciInput}
                        onChange={(e) => setFibonacciInput(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                      />
                    </div>
                  )}
                  {operation === 'tower' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Disks: 3</label>
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

              {/* Recursion Tree Visualization */}
              {recursionTree.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Recursion Tree</h3>
                  <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                    <div className="flex justify-center min-w-max">
                      {recursionTree.map((node, index) => renderTree(node, index))}
                    </div>
                  </div>
                </div>
              )}

              {/* Call Stack Visualization */}
              {stack.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Call Stack</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {stack.slice().reverse().map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-white rounded border border-gray-200"
                        >
                          <span className="font-mono text-sm">{item.call}</span>
                          {item.result && (
                            <span className="text-sm text-green-600">→ {item.result}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Current Operation Display */}
              {currentNode && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Operation</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-mono">{currentNode}</p>
                  </div>
                </div>
              )}

              {/* Tower of Hanoi Visualization */}
              {operation === 'tower' && (towers.A.length > 0 || isAnimating) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tower of Hanoi</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-center items-end space-x-8" style={{ minHeight: '200px' }}>
                      {(['A', 'B', 'C'] as const).map((tower) => (
                        <div key={tower} className="flex flex-col items-center">
                          <div className="relative" style={{ width: '120px', height: '160px' }}>
                            {/* Tower Pole */}
                            <div className="absolute bottom-0 left-1/2 w-2 h-full bg-gray-600 transform -translate-x-1/2"></div>
                            {/* Tower Base */}
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-700"></div>
                            
                            {/* Disks */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col-reverse items-center">
                              {towers[tower].map((disk, index) => (
                                <div
                                  key={index}
                                  className={`${diskColors[disk - 1]} rounded border-2 border-gray-800 flex items-center justify-center text-white font-bold text-sm transition-all duration-500`}
                                  style={{
                                    width: `${30 + disk * 20}px`,
                                    height: '24px',
                                    marginBottom: index === 0 ? '0' : '2px'
                                  }}
                                >
                                  {disk}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Tower Label */}
                          <div className="mt-4 text-lg font-bold text-gray-700 bg-white px-3 py-1 rounded border border-gray-300">
                            {tower}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Current Move Display */}
                    {currentMove && (
                      <div className="mt-6 text-center">
                        <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg font-medium">
                          {currentMove}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

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
                  {operation === 'factorial' && selectedLanguage === 'javascript' && `// JavaScript Factorial - O(n)
function factorial(n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

// Example usage
let result = factorial(5); // Returns 120
console.log(result);`}
                  {operation === 'factorial' && selectedLanguage === 'python' && `# Python Factorial - O(n)
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

# Example usage
result = factorial(5)  # Returns 120
print(result)`}
                  {operation === 'factorial' && selectedLanguage === 'java' && `// Java Factorial - O(n)
public class Factorial {
    public static long factorial(int n) {
        // Base case
        if (n <= 1) {
            return 1;
        }
        // Recursive case
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        long result = factorial(5); // Returns 120
        System.out.println(result);
    }
}`}
                  {operation === 'factorial' && selectedLanguage === 'cpp' && `// C++ Factorial - O(n)
#include <iostream>
using namespace std;

long factorial(int n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

int main() {
    long result = factorial(5); // Returns 120
    cout << result << endl;
    return 0;
}`}
                  {operation === 'fibonacci' && selectedLanguage === 'javascript' && `// JavaScript Fibonacci - O(2^n)
function fibonacci(n) {
    // Base case
    if (n <= 1) {
        return n;
    }
    // Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
let result = fibonacci(6); // Returns 8
console.log(result);`}
                  {operation === 'fibonacci' && selectedLanguage === 'python' && `# Python Fibonacci - O(2^n)
def fibonacci(n):
    # Base case
    if n <= 1:
        return n
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)

# Example usage
result = fibonacci(6)  # Returns 8
print(result)`}
                  {operation === 'fibonacci' && selectedLanguage === 'java' && `// Java Fibonacci - O(2^n)
public class Fibonacci {
    public static int fibonacci(int n) {
        // Base case
        if (n <= 1) {
            return n;
        }
        // Recursive case
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        int result = fibonacci(6); // Returns 8
        System.out.println(result);
    }
}`}
                  {operation === 'fibonacci' && selectedLanguage === 'cpp' && `// C++ Fibonacci - O(2^n)
#include <iostream>
using namespace std;

int fibonacci(int n) {
    // Base case
    if (n <= 1) {
        return n;
    }
    // Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int result = fibonacci(6); // Returns 8
    cout << result << endl;
    return 0;
}`}
                  {operation === 'tower' && selectedLanguage === 'javascript' && `// JavaScript Tower of Hanoi - O(2^n)
function towerOfHanoi(n, source, target, auxiliary) {
    // Base case
    if (n === 1) {
        console.log(\`Move disk 1 from \${source} to \${target}\`);
        return;
    }
    // Recursive cases
    towerOfHanoi(n - 1, source, auxiliary, target);
    console.log(\`Move disk \${n} from \${source} to \${target}\`);
    towerOfHanoi(n - 1, auxiliary, target, source);
}

// Example usage
towerOfHanoi(3, 'A', 'C', 'B');`}
                  {operation === 'tower' && selectedLanguage === 'python' && `# Python Tower of Hanoi - O(2^n)
def tower_of_hanoi(n, source, target, auxiliary):
    # Base case
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    # Recursive cases
    tower_of_hanoi(n - 1, source, auxiliary, target)
    print(f"Move disk {n} from {source} to {target}")
    tower_of_hanoi(n - 1, auxiliary, target, source)

# Example usage
tower_of_hanoi(3, 'A', 'C', 'B')`}
                  {operation === 'tower' && selectedLanguage === 'java' && `// Java Tower of Hanoi - O(2^n)
public class TowerOfHanoi {
    public static void towerOfHanoi(int n, char source, char target, char auxiliary) {
        // Base case
        if (n == 1) {
            System.out.println("Move disk 1 from " + source + " to " + target);
            return;
        }
        // Recursive cases
        towerOfHanoi(n - 1, source, auxiliary, target);
        System.out.println("Move disk " + n + " from " + source + " to " + target);
        towerOfHanoi(n - 1, auxiliary, target, source);
    }
    
    public static void main(String[] args) {
        towerOfHanoi(3, 'A', 'C', 'B');
    }
}`}
                  {operation === 'tower' && selectedLanguage === 'cpp' && `// C++ Tower of Hanoi - O(2^n)
#include <iostream>
using namespace std;

void towerOfHanoi(int n, char source, char target, char auxiliary) {
    // Base case
    if (n == 1) {
        cout << "Move disk 1 from " << source << " to " << target << endl;
        return;
    }
    // Recursive cases
    towerOfHanoi(n - 1, source, auxiliary, target);
    cout << "Move disk " << n << " from " << source << " to " << target << endl;
    towerOfHanoi(n - 1, auxiliary, target, source);
}

int main() {
    towerOfHanoi(3, 'A', 'C', 'B');
    return 0;
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
                      <span>Factorial:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fibonacci:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(2^n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tower of Hanoi:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(2^n)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Call Stack:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fibonacci Tree:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recursion Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recursion Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Base case to terminate recursion</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Progress toward base case</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Function calls itself</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Uses call stack for execution</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-close-line text-red-600 mr-2"></i>
                  <span>Can cause stack overflow</span>
                </div>
              </div>
            </div>

            {/* When to Use Recursion */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use Recursion</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Tree Traversal</h4>
                  <p className="text-sm text-gray-700">Natural fit for hierarchical data structures</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Divide & Conquer</h4>
                  <p className="text-sm text-gray-700">Problems that can be broken into similar subproblems</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Backtracking</h4>
                  <p className="text-sm text-gray-700">Exploring all possible solutions</p>
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Pitfalls</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Missing Base Case</h4>
                  <p className="text-sm text-gray-700">Leads to infinite recursion and stack overflow</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">No Progress</h4>
                  <p className="text-sm text-gray-700">Recursive calls don't move toward base case</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Overhead</h4>
                  <p className="text-sm text-gray-700">Function call overhead can be expensive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}