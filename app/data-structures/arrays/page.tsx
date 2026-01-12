
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ArraysPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [operation, setOperation] = useState('access');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

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
    },
    {
      id: 'reverse',
      name: 'Reverse Array',
      description: 'Reverse the order of elements in array',
      complexity: 'O(n)',
      steps: ['Set left = 0, right = n-1', 'Swap arr[left] and arr[right]', 'Move pointers inward', 'Continue until left >= right']
    },
    {
      id: 'rotate',
      name: 'Rotate Array',
      description: 'Rotate array by k positions to the right',
      complexity: 'O(n)',
      steps: ['Calculate k = k % n', 'Reverse entire array', 'Reverse first k elements', 'Reverse remaining n-k elements']
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
      case 'reverse':
        await animateReverse();
        break;
      case 'rotate':
        await animateRotate();
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

  const animateReverse = async () => {
    const arr = [...array];
    let left = 0;
    let right = arr.length - 1;

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    while (left < right) {
      setCurrentStep(1);
      setHighlightIndex(left);
      
      // Swap elements
      [arr[left], arr[right]] = [arr[right], arr[left]];
      setArray([...arr]);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      left++;
      right--;
      
      if (left >= right) {
        setCurrentStep(2);
      }
    }
    
    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateRotate = async () => {
    const arr = [...array];
    const k = 2; // Rotate by 2 positions
    const n = arr.length;
    
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Step 1: Reverse entire array
    setCurrentStep(1);
    for (let i = 0; i < n / 2; i++) {
      [arr[i], arr[n - 1 - i]] = [arr[n - 1 - i], arr[i]];
      setArray([...arr]);
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Step 2: Reverse first k elements
    setCurrentStep(2);
    for (let i = 0; i < k / 2; i++) {
      [arr[i], arr[k - 1 - i]] = [arr[k - 1 - i], arr[i]];
      setArray([...arr]);
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    // Step 3: Reverse remaining n-k elements
    setCurrentStep(3);
    for (let i = k; i < k + (n - k) / 2; i++) {
      const endIndex = n - 1 - (i - k);
      [arr[i], arr[endIndex]] = [arr[endIndex], arr[i]];
      setArray([...arr]);
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    setCurrentStep(4);
    await new Promise(resolve => setTimeout(resolve, 1000));
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
                  {operation === 'access' && selectedLanguage === 'javascript' && `// JavaScript Array Access - O(1)
function accessElement(arr, index) {
    if (index < 0 || index >= arr.length) {
        return null; // Index out of bounds
    }
    return arr[index]; // Direct memory access
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90];
let element = accessElement(numbers, 3); // Returns 12`}
                  {operation === 'access' && selectedLanguage === 'python' && `# Python Array Access - O(1)
def access_element(arr, index):
    if index < 0 or index >= len(arr):
        return None  # Index out of bounds
    return arr[index]  # Direct memory access

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
element = access_element(numbers, 3)  # Returns 12`}
                  {operation === 'access' && selectedLanguage === 'java' && `// Java Array Access - O(1)
public class ArrayAccess {
    public static Integer accessElement(int[] arr, int index) {
        if (index < 0 || index >= arr.length) {
            return null; // Index out of bounds
        }
        return arr[index]; // Direct memory access
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        Integer element = accessElement(numbers, 3); // Returns 12
    }
}`}
                  {operation === 'access' && selectedLanguage === 'cpp' && `// C++ Array Access - O(1)
#include <iostream>
#include <vector>
using namespace std;

int accessElement(const vector<int>& arr, int index) {
    if (index < 0 || index >= arr.size()) {
        return -1; // Index out of bounds
    }
    return arr[index]; // Direct memory access
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    int element = accessElement(numbers, 3); // Returns 12
    return 0;
}`}
                  {operation === 'insert' && selectedLanguage === 'javascript' && `// JavaScript Array Insertion - O(n)
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
                  {operation === 'insert' && selectedLanguage === 'python' && `# Python Array Insertion - O(n)
def insert_element(arr, index, value):
    if index < 0 or index > len(arr):
        return False
    
    # Shift elements to the right
    arr.append(None)  # Increase array size
    for i in range(len(arr) - 1, index, -1):
        arr[i] = arr[i - 1]
    
    arr[index] = value  # Insert new element
    return True

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
insert_element(numbers, 2, 99)  # Insert 99 at index 2`}
                  {operation === 'insert' && selectedLanguage === 'java' && `// Java Array Insertion - O(n)
import java.util.Arrays;

public class ArrayInsertion {
    public static boolean insertElement(int[] arr, int index, int value) {
        if (index < 0 || index > arr.length) {
            return false;
        }
        
        // Create new array with increased size
        int[] newArr = new int[arr.length + 1];
        
        // Copy elements before insertion point
        for (int i = 0; i < index; i++) {
            newArr[i] = arr[i];
        }
        
        // Insert new element
        newArr[index] = value;
        
        // Copy remaining elements
        for (int i = index; i < arr.length; i++) {
            newArr[i + 1] = arr[i];
        }
        
        // Copy back to original array (if needed)
        System.arraycopy(newArr, 0, arr, 0, newArr.length);
        return true;
    }
}`}
                  {operation === 'insert' && selectedLanguage === 'cpp' && `// C++ Array Insertion - O(n)
#include <iostream>
#include <vector>
using namespace std;

bool insertElement(vector<int>& arr, int index, int value) {
    if (index < 0 || index > arr.size()) {
        return false;
    }
    
    // Insert element at specified position
    arr.insert(arr.begin() + index, value);
    return true;
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    insertElement(numbers, 2, 99); // Insert 99 at index 2
    return 0;
}`}
                  {operation === 'delete' && selectedLanguage === 'javascript' && `// JavaScript Array Deletion - O(n)
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
                  {operation === 'delete' && selectedLanguage === 'python' && `# Python Array Deletion - O(n)
def delete_element(arr, index):
    if index < 0 or index >= len(arr):
        return False
    
    # Shift elements to the left
    for i in range(index, len(arr) - 1):
        arr[i] = arr[i + 1]
    
    # Remove last element
    arr.pop()
    return True

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
delete_element(numbers, 1)  # Remove element at index 1`}
                  {operation === 'delete' && selectedLanguage === 'java' && `// Java Array Deletion - O(n)
public class ArrayDeletion {
    public static boolean deleteElement(int[] arr, int index) {
        if (index < 0 || index >= arr.length) {
            return false;
        }

        // Shift elements to the left
        for (int i = index; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }

        // Note: In Java, arrays have fixed size
        // You would typically use ArrayList for dynamic operations
        return true;
    }
}`}
                  {operation === 'delete' && selectedLanguage === 'cpp' && `// C++ Array Deletion - O(n)
#include <iostream>
#include <vector>
using namespace std;

bool deleteElement(vector<int>& arr, int index) {
    if (index < 0 || index >= arr.size()) {
        return false;
    }
    
    // Remove element at specified position
    arr.erase(arr.begin() + index);
    return true;
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    deleteElement(numbers, 1); // Remove element at index 1
    return 0;
}`}
                  {operation === 'search' && selectedLanguage === 'javascript' && `// JavaScript Linear Search - O(n)
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
                  {operation === 'search' && selectedLanguage === 'python' && `# Python Linear Search - O(n)
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return index if found
    return -1  # Element not found

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
index = linear_search(numbers, 25)  # Returns 2`}
                  {operation === 'search' && selectedLanguage === 'java' && `// Java Linear Search - O(n)
public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Return index if found
            }
        }
        return -1; // Element not found
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        int index = linearSearch(numbers, 25); // Returns 2
    }
}`}
                  {operation === 'search' && selectedLanguage === 'cpp' && `// C++ Linear Search - O(n)
#include <iostream>
#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Return index if found
        }
    }
    return -1; // Element not found
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    int index = linearSearch(numbers, 25); // Returns 2
    return 0;
}`}
                  {operation === 'reverse' && selectedLanguage === 'javascript' && `// JavaScript Array Reversal - O(n)
function reverseArray(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Swap elements
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90];
reverseArray(numbers); // [90, 11, 22, 12, 25, 34, 64]`}
                  {operation === 'reverse' && selectedLanguage === 'python' && `# Python Array Reversal - O(n)
def reverse_array(arr):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        # Swap elements
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
reverse_array(numbers)  # [90, 11, 22, 12, 25, 34, 64]`}
                  {operation === 'reverse' && selectedLanguage === 'java' && `// Java Array Reversal - O(n)
public class ArrayReversal {
    public static void reverseArray(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            // Swap elements
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        reverseArray(numbers);
        // Result: [90, 11, 22, 12, 25, 34, 64]
    }
}`}
                  {operation === 'reverse' && selectedLanguage === 'cpp' && `// C++ Array Reversal - O(n)
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void reverseArray(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        // Swap elements
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    reverseArray(numbers);
    // Result: [90, 11, 22, 12, 25, 34, 64]
    return 0;
}`}
                  {operation === 'rotate' && selectedLanguage === 'javascript' && `// JavaScript Array Rotation - O(n)
function rotateArray(arr, k) {
    const n = arr.length;
    k = k % n; // Handle k > n
    
    // Reverse entire array
    reverse(arr, 0, n - 1);
    // Reverse first k elements
    reverse(arr, 0, k - 1);
    // Reverse remaining elements
    reverse(arr, k, n - 1);
    
    return arr;
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90];
rotateArray(numbers, 2); // [11, 90, 64, 34, 25, 12, 22]`}
                  {operation === 'rotate' && selectedLanguage === 'python' && `# Python Array Rotation - O(n)
def rotate_array(arr, k):
    n = len(arr)
    k = k % n  # Handle k > n
    
    # Reverse entire array
    reverse(arr, 0, n - 1)
    # Reverse first k elements
    reverse(arr, 0, k - 1)
    # Reverse remaining elements
    reverse(arr, k, n - 1)
    
    return arr

def reverse(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
rotate_array(numbers, 2)  # [11, 90, 64, 34, 25, 12, 22]`}
                  {operation === 'rotate' && selectedLanguage === 'java' && `// Java Array Rotation - O(n)
public class ArrayRotation {
    public static void rotateArray(int[] arr, int k) {
        int n = arr.length;
        k = k % n; // Handle k > n
        
        // Reverse entire array
        reverse(arr, 0, n - 1);
        // Reverse first k elements
        reverse(arr, 0, k - 1);
        // Reverse remaining elements
        reverse(arr, k, n - 1);
    }
    
    private static void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        rotateArray(numbers, 2);
        // Result: [11, 90, 64, 34, 25, 12, 22]
    }
}`}
                  {operation === 'rotate' && selectedLanguage === 'cpp' && `// C++ Array Rotation - O(n)
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void rotateArray(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n; // Handle k > n
    
    // Reverse entire array
    reverse(arr.begin(), arr.end());
    // Reverse first k elements
    reverse(arr.begin(), arr.begin() + k);
    // Reverse remaining elements
    reverse(arr.begin() + k, arr.end());
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    rotateArray(numbers, 2);
    // Result: [11, 90, 64, 34, 25, 12, 22]
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
                    <div className="flex justify-between">
                      <span>Reverse:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rotate:</span>
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
