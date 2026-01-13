'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TwoPointerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [leftPointer, setLeftPointer] = useState(0);
  const [rightPointer, setRightPointer] = useState(9);
  const [target, setTarget] = useState(12);
  const [foundPair, setFoundPair] = useState<number[] | null>(null);
  const [operation, setOperation] = useState('pair-sum');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const operations = [
    {
      id: 'pair-sum',
      name: 'Pair Sum',
      description: 'Find two numbers that sum to target',
      complexity: 'O(n)',
      steps: ['Initialize left=0, right=n-1', 'Calculate current sum', 'Move pointers based on sum', 'Return pair if found']
    },
    {
      id: 'reverse',
      name: 'Reverse Array',
      description: 'Reverse array using two pointers',
      complexity: 'O(n)',
      steps: ['Initialize left=0, right=n-1', 'Swap elements', 'Move pointers inward', 'Continue until left >= right']
    },
    {
      id: 'palindrome',
      name: 'Check Palindrome',
      description: 'Check if array is palindrome',
      complexity: 'O(n)',
      steps: ['Initialize left=0, right=n-1', 'Compare elements', 'Move pointers inward', 'Return result']
    },
    {
      id: 'merge-sorted',
      name: 'Merge Sorted Arrays',
      description: 'Merge two sorted arrays',
      complexity: 'O(n+m)',
      steps: ['Initialize pointers for both arrays', 'Compare and merge', 'Handle remaining elements', 'Return merged array']
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setLeftPointer(0);
    setRightPointer(array.length - 1);
    setFoundPair(null);

    switch (operation) {
      case 'pair-sum':
        await animatePairSum();
        break;
      case 'reverse':
        await animateReverse();
        break;
      case 'palindrome':
        await animatePalindrome();
        break;
      case 'merge-sorted':
        await animateMergeSorted();
        break;
    }

    setIsAnimating(false);
  };

  const animatePairSum = async () => {
    const arr = [...array];
    let left = 0;
    let right = arr.length - 1;

    for (let step = 0; step < currentOperation.steps.length; step++) {
      setCurrentStep(step);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    while (left < right) {
      setLeftPointer(left);
      setRightPointer(right);
      setCurrentStep(1);
      
      const sum = arr[left] + arr[right];
      
      if (sum === target) {
        setFoundPair([arr[left], arr[right]]);
        setCurrentStep(3);
        await new Promise(resolve => setTimeout(resolve, 2000));
        break;
      } else if (sum < target) {
        setCurrentStep(2);
        left++;
      } else {
        setCurrentStep(2);
        right--;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const animateReverse = async () => {
    const arr = [...array];
    let left = 0;
    let right = arr.length - 1;

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    while (left < right) {
      setLeftPointer(left);
      setRightPointer(right);
      setCurrentStep(1);
      
      // Swap elements
      [arr[left], arr[right]] = [arr[right], arr[left]];
      setArray([...arr]);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      left++;
      right--;
      
      if (left >= right) {
        setCurrentStep(3);
      }
    }
    
    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animatePalindrome = async () => {
    const arr = [1, 2, 3, 2, 1]; // Palindrome array
    setArray(arr);
    let left = 0;
    let right = arr.length - 1;

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    while (left < right) {
      setLeftPointer(left);
      setRightPointer(right);
      setCurrentStep(1);
      
      if (arr[left] !== arr[right]) {
        setCurrentStep(3);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return;
      }
      
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      left++;
      right--;
    }
    
    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateMergeSorted = async () => {
    const arr1 = [1, 3, 5, 7];
    const arr2 = [2, 4, 6, 8];
    let i = 0, j = 0;
    const merged = [];

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    while (i < arr1.length && j < arr2.length) {
      setCurrentStep(1);
      setLeftPointer(i);
      setRightPointer(j);
      
      if (arr1[i] <= arr2[j]) {
        merged.push(arr1[i]);
        i++;
      } else {
        merged.push(arr2[j]);
        j++;
      }
      
      setArray(merged);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setCurrentStep(2);
    while (i < arr1.length) {
      merged.push(arr1[i]);
      i++;
      setArray([...merged]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    while (j < arr2.length) {
      merged.push(arr2[j]);
      j++;
      setArray([...merged]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetArray = () => {
    setArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    setLeftPointer(0);
    setRightPointer(9);
    setFoundPair(null);
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
              <i className="ri-arrow-left-right-line text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Two Pointer Technique</h1>
              <p className="text-gray-600">Efficient algorithm pattern using two pointers to solve problems</p>
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
                          index === leftPointer
                            ? 'bg-green-500 text-white border-green-500 scale-110'
                            : index === rightPointer
                            ? 'bg-red-500 text-white border-red-500 scale-110'
                            : foundPair && foundPair.includes(value)
                            ? 'bg-yellow-500 text-white border-yellow-500'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">[{index}]</div>
                      {index === leftPointer && (
                        <div className="text-xs text-green-600 font-semibold mt-1">L</div>
                      )}
                      {index === rightPointer && (
                        <div className="text-xs text-red-600 font-semibold mt-1">R</div>
                      )}
                    </div>
                  ))}
                </div>

                {operation === 'pair-sum' && (
                  <div className="text-center text-sm text-gray-600">
                    Target Sum: {target} | Current Pair: {leftPointer < array.length && rightPointer < array.length ? 
                      `${array[leftPointer]} + ${array[rightPointer]} = ${array[leftPointer] + array[rightPointer]}` : 
                      'N/A'}
                  </div>
                )}

                {foundPair && (
                  <div className="text-center text-sm text-green-600 font-semibold mt-2">
                    Found Pair: {foundPair[0]} + {foundPair[1]} = {target}
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
                  {operation === 'pair-sum' && selectedLanguage === 'javascript' && `// JavaScript Two Pointer - Pair Sum - O(n)
function findPairWithSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        
        if (sum === target) {
            return [arr[left], arr[right]];
        } else if (sum < target) {
            left++; // Move left pointer right
        } else {
            right--; // Move right pointer left
        }
    }
    
    return null; // No pair found
}

// Example usage
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let pair = findPairWithSum(numbers, 12); // Returns [5, 7]`}
                  {operation === 'pair-sum' && selectedLanguage === 'python' && `# Python Two Pointer - Pair Sum - O(n)
def find_pair_with_sum(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [arr[left], arr[right]]
        elif current_sum < target:
            left += 1  # Move left pointer right
        else:
            right -= 1  # Move right pointer left
    
    return None  # No pair found

# Example usage
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
pair = find_pair_with_sum(numbers, 12)  # Returns [5, 7]`}
                  {operation === 'pair-sum' && selectedLanguage === 'java' && `// Java Two Pointer - Pair Sum - O(n)
import java.util.*;

public class PairSum {
    public static int[] findPairWithSum(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            int sum = arr[left] + arr[right];
            
            if (sum == target) {
                return new int[]{arr[left], arr[right]};
            } else if (sum < target) {
                left++; // Move left pointer right
            } else {
                right--; // Move right pointer left
            }
        }
        
        return null; // No pair found
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int[] pair = findPairWithSum(numbers, 12); // Returns [5, 7]
    }
}`}
                  {operation === 'pair-sum' && selectedLanguage === 'cpp' && `// C++ Two Pointer - Pair Sum - O(n)
#include <iostream>
#include <vector>
using namespace std;

pair<int, int> findPairWithSum(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        
        if (sum == target) {
            return {arr[left], arr[right]};
        } else if (sum < target) {
            left++; // Move left pointer right
        } else {
            right--; // Move right pointer left
        }
    }
    
    return {-1, -1}; // No pair found
}

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    auto pair = findPairWithSum(numbers, 12); // Returns {5, 7}
    return 0;
}`}
                  {operation === 'reverse' && selectedLanguage === 'javascript' && `// JavaScript Two Pointer - Reverse Array - O(n)
function reverseArray(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Swap elements
        [arr[left], arr[right]] = [arr[right], arr[left]];
        
        // Move pointers inward
        left++;
        right--;
    }
    
    return arr;
}

// Example usage
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
reverseArray(numbers); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]`}
                  {operation === 'reverse' && selectedLanguage === 'python' && `# Python Two Pointer - Reverse Array - O(n)
def reverse_array(arr):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        # Swap elements
        arr[left], arr[right] = arr[right], arr[left]
        
        # Move pointers inward
        left += 1
        right -= 1
    
    return arr

# Example usage
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
reverse_array(numbers)  # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]`}
                  {operation === 'reverse' && selectedLanguage === 'java' && `// Java Two Pointer - Reverse Array - O(n)
public class ArrayReversal {
    public static void reverseArray(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            // Swap elements
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            
            // Move pointers inward
            left++;
            right--;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        reverseArray(numbers);
        // Result: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    }
}`}
                  {operation === 'reverse' && selectedLanguage === 'cpp' && `// C++ Two Pointer - Reverse Array - O(n)
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
        
        // Move pointers inward
        left++;
        right--;
    }
}

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    reverseArray(numbers);
    // Result: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    return 0;
}`}
                  {operation === 'palindrome' && selectedLanguage === 'javascript' && `// JavaScript Two Pointer - Check Palindrome - O(n)
function isPalindrome(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        if (arr[left] !== arr[right]) {
            return false; // Not a palindrome
        }
        
        // Move pointers inward
        left++;
        right--;
    }
    
    return true; // Is a palindrome
}

// Example usage
let arr1 = [1, 2, 3, 2, 1];
let arr2 = [1, 2, 3, 4, 5];
console.log(isPalindrome(arr1)); // true
console.log(isPalindrome(arr2)); // false`}
                  {operation === 'palindrome' && selectedLanguage === 'python' && `# Python Two Pointer - Check Palindrome - O(n)
def is_palindrome(arr):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        if arr[left] != arr[right]:
            return False  # Not a palindrome
        
        # Move pointers inward
        left += 1
        right -= 1
    
    return True  # Is a palindrome

# Example usage
arr1 = [1, 2, 3, 2, 1]
arr2 = [1, 2, 3, 4, 5]
print(is_palindrome(arr1))  # True
print(is_palindrome(arr2))  # False`}
                  {operation === 'palindrome' && selectedLanguage === 'java' && `// Java Two Pointer - Check Palindrome - O(n)
public class PalindromeCheck {
    public static boolean isPalindrome(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            if (arr[left] != arr[right]) {
                return false; // Not a palindrome
            }
            
            // Move pointers inward
            left++;
            right--;
        }
        
        return true; // Is a palindrome
    }
    
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3, 2, 1};
        int[] arr2 = {1, 2, 3, 4, 5};
        System.out.println(isPalindrome(arr1)); // true
        System.out.println(isPalindrome(arr2)); // false
    }
}`}
                  {operation === 'palindrome' && selectedLanguage === 'cpp' && `// C++ Two Pointer - Check Palindrome - O(n)
#include <iostream>
#include <vector>
using namespace std;

bool isPalindrome(const vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        if (arr[left] != arr[right]) {
            return false; // Not a palindrome
        }
        
        // Move pointers inward
        left++;
        right--;
    }
    
    return true; // Is a palindrome
}

int main() {
    vector<int> arr1 = {1, 2, 3, 2, 1};
    vector<int> arr2 = {1, 2, 3, 4, 5};
    cout << isPalindrome(arr1) << endl; // 1 (true)
    cout << isPalindrome(arr2) << endl; // 0 (false)
    return 0;
}`}
                  {operation === 'merge-sorted' && selectedLanguage === 'javascript' && `// JavaScript Two Pointer - Merge Sorted Arrays - O(n+m)
function mergeSortedArrays(arr1, arr2) {
    const merged = [];
    let i = 0; // Pointer for arr1
    let j = 0; // Pointer for arr2
    
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[j]);
            j++;
        }
    }
    
    // Add remaining elements from arr1
    while (i < arr1.length) {
        merged.push(arr1[i]);
        i++;
    }
    
    // Add remaining elements from arr2
    while (j < arr2.length) {
        merged.push(arr2[j]);
        j++;
    }
    
    return merged;
}

// Example usage
let arr1 = [1, 3, 5, 7];
let arr2 = [2, 4, 6, 8];
let merged = mergeSortedArrays(arr1, arr2); // [1, 2, 3, 4, 5, 6, 7, 8]`}
                  {operation === 'merge-sorted' && selectedLanguage === 'python' && `# Python Two Pointer - Merge Sorted Arrays - O(n+m)
def merge_sorted_arrays(arr1, arr2):
    merged = []
    i = 0  # Pointer for arr1
    j = 0  # Pointer for arr2
    
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            merged.append(arr1[i])
            i += 1
        else:
            merged.append(arr2[j])
            j += 1
    
    # Add remaining elements from arr1
    while i < len(arr1):
        merged.append(arr1[i])
        i += 1
    
    # Add remaining elements from arr2
    while j < len(arr2):
        merged.append(arr2[j])
        j += 1
    
    return merged

# Example usage
arr1 = [1, 3, 5, 7]
arr2 = [2, 4, 6, 8]
merged = merge_sorted_arrays(arr1, arr2)  # [1, 2, 3, 4, 5, 6, 7, 8]`}
                  {operation === 'merge-sorted' && selectedLanguage === 'java' && `// Java Two Pointer - Merge Sorted Arrays - O(n+m)
import java.util.*;

public class MergeSorted {
    public static int[] mergeSortedArrays(int[] arr1, int[] arr2) {
        int[] merged = new int[arr1.length + arr2.length];
        int i = 0; // Pointer for arr1
        int j = 0; // Pointer for arr2
        int k = 0; // Pointer for merged
        
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] <= arr2[j]) {
                merged[k++] = arr1[i++];
            } else {
                merged[k++] = arr2[j++];
            }
        }
        
        // Add remaining elements from arr1
        while (i < arr1.length) {
            merged[k++] = arr1[i++];
        }
        
        // Add remaining elements from arr2
        while (j < arr2.length) {
            merged[k++] = arr2[j++];
        }
        
        return merged;
    }
    
    public static void main(String[] args) {
        int[] arr1 = {1, 3, 5, 7};
        int[] arr2 = {2, 4, 6, 8};
        int[] merged = mergeSortedArrays(arr1, arr2);
        // Result: [1, 2, 3, 4, 5, 6, 7, 8]
    }
}`}
                  {operation === 'merge-sorted' && selectedLanguage === 'cpp' && `// C++ Two Pointer - Merge Sorted Arrays - O(n+m)
#include <iostream>
#include <vector>
using namespace std;

vector<int> mergeSortedArrays(const vector<int>& arr1, const vector<int>& arr2) {
    vector<int> merged;
    int i = 0; // Pointer for arr1
    int j = 0; // Pointer for arr2
    
    while (i < arr1.size() && j < arr2.size()) {
        if (arr1[i] <= arr2[j]) {
            merged.push_back(arr1[i]);
            i++;
        } else {
            merged.push_back(arr2[j]);
            j++;
        }
    }
    
    // Add remaining elements from arr1
    while (i < arr1.size()) {
        merged.push_back(arr1[i]);
        i++;
    }
    
    // Add remaining elements from arr2
    while (j < arr2.size()) {
        merged.push_back(arr2[j]);
        j++;
    }
    
    return merged;
}

int main() {
    vector<int> arr1 = {1, 3, 5, 7};
    vector<int> arr2 = {2, 4, 6, 8};
    auto merged = mergeSortedArrays(arr1, arr2);
    // Result: [1, 2, 3, 4, 5, 6, 7, 8]
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
                      <span>Pair Sum:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reverse:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Palindrome:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Merge Sorted:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n+m)</span>
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
                  <span>Sorted arrays for finding pairs with target sum</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Reversing arrays in-place</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Checking for palindromes</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Merging two sorted arrays</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Finding subarrays with specific properties</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Removing duplicates from sorted arrays</span>
                </div>
              </div>
            </div>

            {/* Common Patterns */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Patterns</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Opposite Direction</h4>
                  <p className="text-gray-600">One pointer starts at beginning, other at end, move towards each other</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Same Direction</h4>
                  <p className="text-gray-600">Both pointers move in same direction, often with different speeds</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Fast & Slow</h4>
                  <p className="text-gray-600">One pointer moves faster than other (2x speed) for cycle detection</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Sliding Window</h4>
                  <p className="text-gray-600">Window defined by two pointers for subarray problems</p>
                </div>
              </div>
            </div>

            {/* Advantages */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advantages</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Space efficient (O(1) extra space)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Time efficient (single pass)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Simple to implement</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Works well with sorted data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}