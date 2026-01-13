'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BitManipulationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operation, setOperation] = useState('set');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [number, setNumber] = useState(42);
  const [result, setResult] = useState(0);
  const [bitPosition, setBitPosition] = useState(0);

  const operations = [
    {
      id: 'set',
      name: 'Set Bit',
      description: 'Set or clear specific bits in a number',
      complexity: 'O(1)',
      steps: ['Choose bit position', 'Set or clear bit', 'Return result']
    },
    {
      id: 'get',
      name: 'Get Bit',
      description: 'Check if a specific bit is set',
      complexity: 'O(1)',
      steps: ['Create mask', 'Apply AND operation', 'Check result']
    },
    {
      id: 'clear',
      name: 'Clear Bit',
      description: 'Clear a specific bit in a number',
      complexity: 'O(1)',
      steps: ['Create mask', 'Apply AND with complement', 'Return result']
    },
    {
      id: 'toggle',
      name: 'Toggle Bit',
      description: 'Flip a specific bit from 0 to 1 or 1 to 0',
      complexity: 'O(1)',
      steps: ['Choose bit position', 'XOR with 1', 'Update number']
    },
    {
      id: 'count',
      name: 'Count Set Bits',
      description: 'Count number of set bits in a number',
      complexity: 'O(1)',
      steps: ['Initialize counter', 'Check each bit', 'Increment counter']
    },
    {
      id: 'power-of-two',
      name: 'Power of Two',
      description: 'Calculate 2^n efficiently',
      complexity: 'O(log n)',
      steps: ['Initialize result = 1', 'Left shift n times', 'Multiply result by 2']
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setResult(0);
    setBitPosition(0);

    switch (operation) {
      case 'set':
        await animateSetBit();
        break;
      case 'get':
        await animateGetBit();
        break;
      case 'clear':
        await animateClearBit();
        break;
      case 'toggle':
        await animateToggleBit();
        break;
      case 'count':
        await animateCountBits();
        break;
      case 'power-of-two':
        await animatePowerOfTwo();
        break;
    }

    setIsAnimating(false);
  };

  const animateSetBit = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    const bitPos = 3;
    const mask = 1 << bitPos;
    const newNumber = number | mask;
    setResult(newNumber);
    setBitPosition(bitPos);
    
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const animateGetBit = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    const bitPos = 2;
    const mask = 1 << bitPos;
    const isSet = (number & mask) !== 0;
    setResult(isSet ? 1 : 0);
    setBitPosition(bitPos);
    
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const animateClearBit = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    const bitPos = 2;
    const mask = ~(1 << bitPos);
    const newNumber = number & mask;
    setResult(newNumber);
    setBitPosition(bitPos);
    
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const animateToggleBit = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    const bitPos = 4;
    const mask = 1 << bitPos;
    const newNumber = number ^ mask;
    setResult(newNumber);
    setBitPosition(bitPos);
    
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const animateCountBits = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    let count = 0;
    let temp = number;
    
    for (let i = 0; i < 32; i++) {
      setCurrentStep(2);
      setBitPosition(i);
      if ((temp >> i) & 1) {
        count++;
      }
      setBitPosition(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setResult(count);
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animatePowerOfTwo = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    let result = 1;
    let power = 1;
    
    for (let i = 0; i < 5; i++) {
      setCurrentStep(2);
      power *= 2;
      setBitPosition(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setResult(result);
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetAnimation = () => {
    setResult(0);
    setBitPosition(0);
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
              <i className="ri-code-s-slash-line text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Bit Manipulation</h1>
              <p className="text-gray-600">Efficient bit-level operations and tricks</p>
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

              {/* Binary Visualization */}
              <div className="mb-8">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold text-gray-700 mb-4">Binary: {number.toString(2).padStart(32, '0')}</div>
                  <div className="flex justify-center items-center space-x-1 mb-6 overflow-x-auto pb-4">
                    {[31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((bit, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <div 
                          className={`w-6 h-6 border-2 rounded flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            bitPosition === index
                              ? 'bg-purple-600 text-white border-purple-600 shadow-lg transform scale-110'
                              : 'bg-gray-100 border-gray-300 text-gray-700'
                          }`}
                        >
                          {(number >> bit) & 1}
                        </div>
                        {bit % 8 === 0 && (
                          <div className="absolute -top-5 left-1/2 text-xs text-gray-500 transform -translate-x-1/2 whitespace-nowrap">
                            {bit}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mt-4">
                    Current Bit Position: {bitPosition} | Value: {(number >> bitPosition) & 1}
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
                  {operation === 'set' && selectedLanguage === 'javascript' && `// JavaScript Set Bit - O(1)
function setBit(number, position, value) {
    const mask = 1 << position;
    return number | mask;
}

// Example usage
let num = 42; // Binary: 101010
setBit(num, 3, 1); // Sets bit 3 to 1: Binary: 101110`}
                  {operation === 'set' && selectedLanguage === 'python' && `# Python Set Bit - O(1)
def set_bit(number, position, value):
    mask = 1 << position
    return number | mask

# Example usage
num = 42  # Binary: 101010
set_bit(num, 3, 1)  # Sets bit 3 to 1: Binary: 101110`}
                  {operation === 'set' && selectedLanguage === 'java' && `// Java Set Bit - O(1)
public class BitManipulation {
    public static int setBit(int number, int position, boolean value) {
        int mask = 1 << position;
        return value ? number | mask : number & ~mask;
    }
}`}
                  {operation === 'set' && selectedLanguage === 'cpp' && `// C++ Set Bit - O(1)
int setBit(int number, int position, bool value) {
    int mask = 1 << position;
    return value ? number | mask : number & ~mask;
}`}
                  {operation === 'get' && selectedLanguage === 'javascript' && `// JavaScript Get Bit - O(1)
function getBit(number, position) {
    const mask = 1 << position;
    return (number & mask) !== 0 ? 1 : 0;
}

// Example usage
let num = 42; // Binary: 101010
console.log(getBit(num, 3)); // Returns 1 (bit 3 is set)
console.log(getBit(num, 0)); // Returns 0 (bit 0 is not set)`}
                  {operation === 'get' && selectedLanguage === 'python' && `# Python Get Bit - O(1)
def get_bit(number, position):
    mask = 1 << position
    return (number & mask) != 0

# Example usage
num = 42  # Binary: 101010
print(get_bit(num, 3))  # Returns 1
print(get_bit(num, 0))  # Returns 0`}
                  {operation === 'get' && selectedLanguage === 'java' && `// Java Get Bit - O(1)
public static boolean getBit(int number, int position) {
    int mask = 1 << position;
    return (number & mask) != 0;
}`}
                  {operation === 'get' && selectedLanguage === 'cpp' && `// C++ Get Bit - O(1)
bool getBit(int number, int position) {
    int mask = 1 << position;
    return (number & mask) != 0;
}`}
                  {operation === 'clear' && selectedLanguage === 'javascript' && `// JavaScript Clear Bit - O(1)
function clearBit(number, position) {
    const mask = ~(1 << position);
    return number & mask;
}

// Example usage
let num = 42; // Binary: 101010
clearBit(num, 3); // Clears bit 3: Binary: 101010
console.log(num); // Returns 34`}
                  {operation === 'clear' && selectedLanguage === 'python' && `# Python Clear Bit - O(1)
def clear_bit(number, position):
    mask = ~(1 << position)
    return number & mask

# Example usage
num = 42  # Binary: 101010
clear_bit(num, 3)  # Clears bit 3: Binary: 101010
print(num)  # Returns 34`}
                  {operation === 'clear' && selectedLanguage === 'java' && `// Java Clear Bit - O(1)
public static int clearBit(int number, int position) {
    int mask = ~(1 << position);
    return number & mask;
}`}
                  {operation === 'clear' && selectedLanguage === 'cpp' && `// C++ Clear Bit - O(1)
int clearBit(int number, int position) {
    int mask = ~(1 << position);
    return number & mask;
}`}
                  {operation === 'toggle' && selectedLanguage === 'javascript' && `// JavaScript Toggle Bit - O(1)
function toggleBit(number, position) {
    const mask = 1 << position;
    return number ^ mask;
}

// Example usage
let num = 42; // Binary: 101010
toggleBit(num, 4); // Toggles bit 4: Binary: 101110
console.log(num); // Returns 46`}
                  {operation === 'toggle' && selectedLanguage === 'python' && `# Python Toggle Bit - O(1)
def toggle_bit(number, position):
    mask = 1 << position
    return number ^ mask

# Example usage
num = 42  # Binary: 101010
toggle_bit(num, 4)  # Toggles bit 4: Binary: 101110
print(num)  # Returns 46`}
                  {operation === 'toggle' && selectedLanguage === 'java' && `// Java Toggle Bit - O(1)
public static int toggleBit(int number, int position) {
    int mask = 1 << position;
    return number ^ mask;
}`}
                  {operation === 'toggle' && selectedLanguage === 'cpp' && `// C++ Toggle Bit - O(1)
int toggle_bit(int number, int position) {
    int mask = 1 << position;
    return number ^ mask;
}`}
                  {operation === 'count' && selectedLanguage === 'javascript' && `// JavaScript Count Set Bits - O(1)
function countSetBits(number) {
    let count = 0;
    for (let i = 0; i < 32; i++) {
        if ((number >> i) & 1) {
            count++;
        }
    }
    return count;
}

// Example usage
console.log(countSetBits(42)); // Returns 3 (bits 0, 1, 3 are set)`}
                  {operation === 'count' && selectedLanguage === 'python' && `# Python Count Set Bits - O(1)
def count_set_bits(number):
    count = 0
    for i in range(32):
        if (number >> i) & 1:
            count += 1
    
    return count

# Example usage
print(count_set_bits(42))  # Returns 3`}
                  {operation === 'count' && selectedLanguage === 'java' && `// Java Count Set Bits - O(1)
public static int countSetBits(int number) {
    int count = 0;
    for (int i = 0; i < 32; i++) {
        if (((number >> i) & 1) != 0) {
            count++;
        }
    }
    return count;
}`}
                  {operation === 'count' && selectedLanguage === 'cpp' && `// C++ Count Set Bits - O(1)
int count_set_bits(int number) {
    int count = 0;
    for (int i = 0; i < 32; i++) {
        if (((number >> i) & 1) != 0) {
            count++;
        }
    }
    return count;
}`}
                  {operation === 'power-of-two' && selectedLanguage === 'javascript' && `// JavaScript Power of Two - O(log n)
function powerOfTwo(n) {
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= 2;
    }
    return result;
}

// Example usage
console.log(powerOfTwo(5)); // Returns 32
console.log(powerOfTwo(10)); // Returns 1024`}
                  {operation === 'power-of-two' && selectedLanguage === 'python' && `# Python Power of Two - O(log n)
def power_of_two(n):
    result = 1
    for i in range(n):
        result *= 2
    
    return result

# Example usage
print(power_of_two(5))  # Returns 32
print(power_of_two(10))  # Returns 1024`}
                  {operation === 'power-of-two' && selectedLanguage === 'java' && `// Java Power of Two - O(log n)
public static long powerOfTwo(int n) {
    long result = 1;
    for (int i = 0; i < n; i++) {
        result *= 2;
    }
    return result;
}`}
                  {operation === 'power-of-two' && selectedLanguage === 'cpp' && `// C++ Power of Two - O(log n)
long long power_of_two(int n) {
    long long result = 1;
    for (int i = 0; i < n; i++) {
        result *= 2;
    }
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
                      <span>Bit Operations:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Power of Two:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(log n)</span>
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
                  <span>Low-level programming and embedded systems</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Performance optimization</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Graphics and image processing</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Cryptography and security</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Network protocols</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Data compression</span>
                </div>
              </div>
            </div>

            {/* Common Bit Operations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Bit Operations</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Basic Operations</h4>
                  <p className="text-gray-600">AND, OR, XOR, NOT, shift operations</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Bit Tricks</h4>
                  <p className="text-gray-600">Multiply/divide by powers of 2, check if number is power of 2</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Bit Masks</h4>
                  <p className="text-600">Efficient checking of multiple bits at once</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Gray Code</h4>
                  <p className="text-gray-600">Binary, octal, and hexadecimal representations</p>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-world Applications</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">System Programming</h4>
                  <p className="text-gray-600">Flag management, permission systems</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Network Protocols</h4>
                  <p className="text-gray-600">IP address manipulation, subnet masks</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">File Systems</h4>
                  <p className="text-gray-600">File permissions, compression algorithms</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Graphics Programming</h4>
                  <p className="text-gray-600">Pixel manipulation, color channels</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Cryptography</h4>
                  <p className="text-gray-600">Encryption, hash functions, digital signatures</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Database Systems</h4>
                  <p className="text-gray-600">Indexing, compression, bitmaps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}