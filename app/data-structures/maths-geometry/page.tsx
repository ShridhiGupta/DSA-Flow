'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MathsGeometryPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operation, setOperation] = useState('gcd');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [input1, setInput1] = useState(48);
  const [input2, setInput2] = useState(18);
  const [result, setResult] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const operations = [
    {
      id: 'gcd',
      name: 'GCD (Euclidean)',
      description: 'Find greatest common divisor using Euclidean algorithm',
      complexity: 'O(log(min(a,b)))',
      steps: ['Check if b = 0', 'If not, replace (a,b) with (b,a mod b)', 'Repeat until b = 0', 'Return a as GCD']
    },
    {
      id: 'lcm',
      name: 'LCM',
      description: 'Find least common multiple using GCD',
      complexity: 'O(log(min(a,b)))',
      steps: ['Calculate GCD of a and b', 'Use formula: LCM = (a × b) / GCD', 'Return result']
    },
    {
      id: 'prime-check',
      name: 'Prime Check',
      description: 'Check if a number is prime',
      complexity: 'O(√n)',
      steps: ['Handle edge cases (n ≤ 1)', 'Check divisibility from 2 to √n', 'Return true if no divisors found']
    },
    {
      id: 'power',
      name: 'Fast Power',
      description: 'Calculate a^b using binary exponentiation',
      complexity: 'O(log b)',
      steps: ['Initialize result = 1', 'While b > 0: if b is odd, multiply result by a', 'Square a and halve b', 'Return result']
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setResult(0);
    setHighlightIndex(-1);

    switch (operation) {
      case 'gcd':
        await animateGCD();
        break;
      case 'lcm':
        await animateLCM();
        break;
      case 'prime-check':
        await animatePrimeCheck();
        break;
      case 'power':
        await animatePower();
        break;
    }

    setIsAnimating(false);
  };

  const animateGCD = async () => {
    let a = input1;
    let b = input2;
    let step = 0;

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    while (b !== 0) {
      setCurrentStep(1);
      setHighlightIndex(step);
      
      const temp = b;
      b = a % b;
      a = temp;
      
      setResult(a);
      await new Promise(resolve => setTimeout(resolve, 2000));
      step++;
    }

    setCurrentStep(2);
    setResult(a);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateLCM = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Calculate GCD first
    let a = input1;
    let b = input2;
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    const gcd = a;

    setCurrentStep(1);
    setResult((input1 * input2) / gcd);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animatePrimeCheck = async () => {
    const n = input1;
    
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (n <= 1) {
      setResult(0);
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    setCurrentStep(1);
    for (let i = 2; i * i <= n; i++) {
      setHighlightIndex(i);
      if (n % i === 0) {
        setResult(0); // Not prime
        setCurrentStep(2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setResult(1); // Prime
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animatePower = async () => {
    let base = 2;
    let exponent = 10;
    let result = 1;
    
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    let step = 0;
    while (exponent > 0) {
      setCurrentStep(1);
      setHighlightIndex(step);
      
      if (exponent % 2 === 1) {
        result *= base;
      }
      
      base *= base;
      exponent = Math.floor(exponent / 2);
      setResult(result);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      step++;
    }

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetAnimation = () => {
    setResult(0);
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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-calculator-line text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Math & Geometry Algorithms</h1>
              <p className="text-gray-600">Essential mathematical algorithms for problem solving</p>
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

              {/* Input Display */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-8 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-2">Input 1</div>
                    <div className="w-24 h-24 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center text-2xl font-bold text-blue-700">
                      {input1}
                    </div>
                  </div>
                  {operation !== 'prime-check' && operation !== 'power' && (
                    <>
                      <div className="text-2xl text-gray-400">×</div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-2">Input 2</div>
                        <div className="w-24 h-24 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center text-2xl font-bold text-green-700">
                          {input2}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Result</div>
                  <div className="w-32 h-32 bg-purple-100 border-2 border-purple-300 rounded-lg flex items-center justify-center text-3xl font-bold text-purple-700 mx-auto">
                    {result}
                  </div>
                </div>
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
                  {operation === 'gcd' && selectedLanguage === 'javascript' && `// JavaScript GCD - Euclidean Algorithm - O(log(min(a,b)))
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Recursive version
function gcdRecursive(a, b) {
    if (b === 0) return a;
    return gcdRecursive(b, a % b);
}

// Example usage
console.log(gcd(48, 18)); // Returns 6
console.log(gcdRecursive(48, 18)); // Returns 6`}
                  {operation === 'gcd' && selectedLanguage === 'python' && `# Python GCD - Euclidean Algorithm - O(log(min(a,b)))
def gcd(a, b):
    while b != 0:
        temp = b
        b = a % b
        a = temp
    return a

# Recursive version
def gcd_recursive(a, b):
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

# Example usage
print(gcd(48, 18))  # Returns 6
print(gcd_recursive(48, 18))  # Returns 6`}
                  {operation === 'gcd' && selectedLanguage === 'java' && `// Java GCD - Euclidean Algorithm - O(log(min(a,b)))
public class GCD {
    public static int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    // Recursive version
    public static int gcdRecursive(int a, int b) {
        if (b == 0) return a;
        return gcdRecursive(b, a % b);
    }
    
    public static void main(String[] args) {
        System.out.println(gcd(48, 18)); // Returns 6
        System.out.println(gcdRecursive(48, 18)); // Returns 6
    }
}`}
                  {operation === 'gcd' && selectedLanguage === 'cpp' && `// C++ GCD - Euclidean Algorithm - O(log(min(a,b)))
#include <iostream>
using namespace std;

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Recursive version
int gcdRecursive(int a, int b) {
    if (b == 0) return a;
    return gcdRecursive(b, a % b);
}

int main() {
    cout << gcd(48, 18) << endl; // Returns 6
    cout << gcdRecursive(48, 18) << endl; // Returns 6
    return 0;
}`}
                  {operation === 'lcm' && selectedLanguage === 'javascript' && `// JavaScript LCM using GCD - O(log(min(a,b)))
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a * b) / gcd(a, b));
}

// Example usage
console.log(lcm(12, 18)); // Returns 36
console.log(lcm(5, 7));  // Returns 35`}
                  {operation === 'lcm' && selectedLanguage === 'python' && `# Python LCM using GCD - O(log(min(a,b)))
def gcd(a, b):
    while b != 0:
        temp = b
        b = a % b
        a = temp
    return a

def lcm(a, b):
    if a == 0 or b == 0:
        return 0
    return abs((a * b) // gcd(a, b))

# Example usage
print(lcm(12, 18))  # Returns 36
print(lcm(5, 7))   # Returns 35`}
                  {operation === 'lcm' && selectedLanguage === 'java' && `// Java LCM using GCD - O(log(min(a,b)))
public class LCM {
    private static int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    public static long lcm(int a, int b) {
        if (a == 0 || b == 0) return 0;
        return Math.abs((long) a * b / gcd(a, b));
    }
    
    public static void main(String[] args) {
        System.out.println(lcm(12, 18)); // Returns 36
        System.out.println(lcm(5, 7));  // Returns 35
    }
}`}
                  {operation === 'lcm' && selectedLanguage === 'cpp' && `// C++ LCM using GCD - O(log(min(a,b)))
#include <iostream>
#include <cstdlib>
using namespace std;

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

long long lcm(int a, int b) {
    if (a == 0 || b == 0) return 0;
    return llabs((long long)a * b / gcd(a, b));
}

int main() {
    cout << lcm(12, 18) << endl; // Returns 36
    cout << lcm(5, 7) << endl;   // Returns 35
    return 0;
}`}
                  {operation === 'prime-check' && selectedLanguage === 'javascript' && `// JavaScript Prime Check - O(√n)
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

// Simple version
function isPrimeSimple(n) {
    if (n <= 1) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Example usage
console.log(isPrime(17));  // true
console.log(isPrime(15));  // false
console.log(isPrime(2));   // true`}
                  {operation === 'prime-check' && selectedLanguage === 'python' && `# Python Prime Check - O(√n)
def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# Simple version
def is_prime_simple(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# Example usage
print(is_prime(17))  # True
print(is_prime(15))  # False
print(is_prime(2))   # True`}
                  {operation === 'prime-check' && selectedLanguage === 'java' && `// Java Prime Check - O(√n)
public class PrimeCheck {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }
    
    // Simple version
    public static boolean isPrimeSimple(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println(isPrime(17));  // true
        System.out.println(isPrime(15));  // false
        System.out.println(isPrime(2));   // true
    }
}`}
                  {operation === 'prime-check' && selectedLanguage === 'cpp' && `// C++ Prime Check - O(√n)
#include <iostream>
#include <cmath>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}

// Simple version
bool isPrimeSimple(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    cout << boolalpha;
    cout << isPrime(17) << endl;  // true
    cout << isPrime(15) << endl;  // false
    cout << isPrime(2) << endl;   // true
    return 0;
}`}
                  {operation === 'power' && selectedLanguage === 'javascript' && `// JavaScript Fast Power (Binary Exponentiation) - O(log b)
function fastPower(base, exponent) {
    let result = 1;
    let currentBase = base;
    let currentExponent = exponent;
    
    while (currentExponent > 0) {
        // If current bit is 1, multiply result
        if (currentExponent % 2 === 1) {
            result *= currentBase;
        }
        
        // Square base and halve exponent
        currentBase *= currentBase;
        currentExponent = Math.floor(currentExponent / 2);
    }
    
    return result;
}

// Recursive version
function fastPowerRecursive(base, exponent) {
    if (exponent === 0) return 1;
    if (exponent === 1) return base;
    
    const half = fastPowerRecursive(base, Math.floor(exponent / 2));
    
    if (exponent % 2 === 0) {
        return half * half;
    } else {
        return half * half * base;
    }
}

// Example usage
console.log(fastPower(2, 10));     // Returns 1024
console.log(fastPower(3, 5));      // Returns 243
console.log(fastPowerRecursive(2, 10)); // Returns 1024`}
                  {operation === 'power' && selectedLanguage === 'python' && `# Python Fast Power (Binary Exponentiation) - O(log b)
def fast_power(base, exponent):
    result = 1
    current_base = base
    current_exponent = exponent
    
    while current_exponent > 0:
        # If current bit is 1, multiply result
        if current_exponent % 2 == 1:
            result *= current_base
        
        # Square base and halve exponent
        current_base *= current_base
        current_exponent //= 2
    
    return result

# Recursive version
def fast_power_recursive(base, exponent):
    if exponent == 0:
        return 1
    if exponent == 1:
        return base
    
    half = fast_power_recursive(base, exponent // 2)
    
    if exponent % 2 == 0:
        return half * half
    else:
        return half * half * base

# Example usage
print(fast_power(2, 10))     # Returns 1024
print(fast_power(3, 5))      # Returns 243
print(fast_power_recursive(2, 10)) # Returns 1024`}
                  {operation === 'power' && selectedLanguage === 'java' && `// Java Fast Power (Binary Exponentiation) - O(log b)
public class FastPower {
    public static long fastPower(long base, long exponent) {
        long result = 1;
        long currentBase = base;
        long currentExponent = exponent;
        
        while (currentExponent > 0) {
            // If current bit is 1, multiply result
            if (currentExponent % 2 == 1) {
                result *= currentBase;
            }
            
            // Square base and halve exponent
            currentBase *= currentBase;
            currentExponent /= 2;
        }
        
        return result;
    }
    
    // Recursive version
    public static long fastPowerRecursive(long base, long exponent) {
        if (exponent == 0) return 1;
        if (exponent == 1) return base;
        
        long half = fastPowerRecursive(base, exponent / 2);
        
        if (exponent % 2 == 0) {
            return half * half;
        } else {
            return half * half * base;
        }
    }
    
    public static void main(String[] args) {
        System.out.println(fastPower(2, 10));     // Returns 1024
        System.out.println(fastPower(3, 5));      // Returns 243
        System.out.println(fastPowerRecursive(2, 10)); // Returns 1024
    }
}`}
                  {operation === 'power' && selectedLanguage === 'cpp' && `// C++ Fast Power (Binary Exponentiation) - O(log b)
#include <iostream>
using namespace std;

long long fastPower(long long base, long long exponent) {
    long long result = 1;
    long long currentBase = base;
    long long currentExponent = exponent;
    
    while (currentExponent > 0) {
        // If current bit is 1, multiply result
        if (currentExponent % 2 == 1) {
            result *= currentBase;
        }
        
        // Square base and halve exponent
        currentBase *= currentBase;
        currentExponent /= 2;
    }
    
    return result;
}

// Recursive version
long long fastPowerRecursive(long long base, long long exponent) {
    if (exponent == 0) return 1;
    if (exponent == 1) return base;
    
    long long half = fastPowerRecursive(base, exponent / 2);
    
    if (exponent % 2 == 0) {
        return half * half;
    } else {
        return half * half * base;
    }
}

int main() {
    cout << fastPower(2, 10) << endl;     // Returns 1024
    cout << fastPower(3, 5) << endl;      // Returns 243
    cout << fastPowerRecursive(2, 10) << endl; // Returns 1024
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
                      <span>GCD:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(log(min(a,b)))</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LCM:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(log(min(a,b)))</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prime Check:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(√n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fast Power:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(log b)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">O(1)</span>
                </div>
              </div>
            </div>

            {/* When to Use */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Number theory problems</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Cryptography applications</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Optimization problems</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Competitive programming</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Algorithm design</span>
                </div>
              </div>
            </div>

            {/* Common Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Applications</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">GCD/LCM</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Fraction simplification</li>
                    <li>• Period finding</li>
                    <li>• Synchronization problems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Prime Numbers</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Cryptography (RSA)</li>
                    <li>• Hash functions</li>
                    <li>• Random number generation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Fast Power</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Modular exponentiation</li>
                    <li>• Matrix exponentiation</li>
                    <li>• Polynomial evaluation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Important Formulas */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Formulas</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Number Theory</h4>
                  <ul className="text-gray-600 space-y-1 font-mono">
                    <li>• LCM(a,b) = (a × b) / GCD(a,b)</li>
                    <li>• a^b mod m = Fast Power</li>
                    <li>• Fermat's Little Theorem</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Geometry</h4>
                  <ul className="text-gray-600 space-y-1 font-mono">
                    <li>• Distance: √((x₂-x₁)² + (y₂-y₁)²)</li>
                    <li>• Area of triangle: ½|base × height|</li>
                    <li>• Circle area: πr²</li>
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