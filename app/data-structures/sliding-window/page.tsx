'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SlidingWindowPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [array, setArray] = useState([2, 1, 5, 1, 3, 2]);
  const [stringArray, setStringArray] = useState<string[]>([]);
  const [windowStart, setWindowStart] = useState(0);
  const [windowEnd, setWindowEnd] = useState(2);
  const [windowSize, setWindowSize] = useState(3);
  const [currentSum, setCurrentSum] = useState(0);
  const [maxSum, setMaxSum] = useState(0);
  const [target, setTarget] = useState(7);
  const [foundWindow, setFoundWindow] = useState<number[] | null>(null);
  const [operation, setOperation] = useState('max-sum');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const operations = [
    {
      id: 'max-sum',
      name: 'Maximum Sum Subarray',
      description: 'Find maximum sum of subarray of size k',
      complexity: 'O(n)',
      steps: ['Calculate sum of first window', 'Slide window by one element', 'Update sum by subtracting left, adding right', 'Track maximum sum']
    },
    {
      id: 'target-sum',
      name: 'Target Sum Subarray',
      description: 'Find subarray with sum equal to target',
      complexity: 'O(n)',
      steps: ['Initialize window start and current sum', 'Expand window by moving end pointer', 'Shrink window if sum > target', 'Return window if sum equals target']
    },
    {
      id: 'longest-unique',
      name: 'Longest Substring Unique',
      description: 'Find longest substring with unique characters',
      complexity: 'O(n)',
      steps: ['Initialize window and character set', 'Expand window with new character', 'Shrink window if character repeats', 'Track maximum window size']
    },
    {
      id: 'count-anagrams',
      name: 'Count Anagrams',
      description: 'Count anagrams of pattern in string',
      complexity: 'O(n)',
      steps: ['Create frequency map of pattern', 'Initialize window of pattern length', 'Compare frequency maps', 'Slide window and update counts']
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setFoundWindow(null);

    switch (operation) {
      case 'max-sum':
        await animateMaxSum();
        break;
      case 'target-sum':
        await animateTargetSum();
        break;
      case 'longest-unique':
        await animateLongestUnique();
        break;
      case 'count-anagrams':
        await animateCountAnagrams();
        break;
    }

    setIsAnimating(false);
  };

  const animateMaxSum = async () => {
    const arr = [...array];
    const k = windowSize;
    let maxSumValue = 0;
    let windowSum = 0;

    // Calculate initial window sum
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
    }
    maxSumValue = windowSum;
    setCurrentSum(windowSum);
    setMaxSum(windowSum);
    setWindowStart(0);
    setWindowEnd(k - 1);

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Slide window
    for (let i = k; i < arr.length; i++) {
      setCurrentStep(2);
      
      // Remove leftmost element and add new element
      windowSum = windowSum - arr[i - k] + arr[i];
      setCurrentSum(windowSum);
      
      setWindowStart(i - k + 1);
      setWindowEnd(i);
      
      if (windowSum > maxSumValue) {
        maxSumValue = windowSum;
        setMaxSum(maxSumValue);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateTargetSum = async () => {
    const arr = [...array];
    const targetSum = target;
    let start = 0;
    let currentSumValue = 0;

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    for (let end = 0; end < arr.length; end++) {
      setCurrentStep(1);
      currentSumValue += arr[end];
      setCurrentSum(currentSumValue);
      setWindowEnd(end);

      // Shrink window if sum > target
      while (currentSumValue > targetSum && start <= end) {
        setCurrentStep(2);
        currentSumValue -= arr[start];
        setCurrentSum(currentSumValue);
        start++;
        setWindowStart(start);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Check if we found target
      if (currentSumValue === targetSum) {
        setFoundWindow(arr.slice(start, end + 1));
        setCurrentStep(3);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateLongestUnique = async () => {
    const str = "abcabcbb";
    const arr = str.split('');
    setStringArray(arr);
    const charSet = new Set();
    let start = 0;
    let maxLength = 0;

    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    for (let end = 0; end < arr.length; end++) {
      setCurrentStep(1);
      const char = arr[end];

      // If character repeats, shrink window
      while (charSet.has(char)) {
        setCurrentStep(2);
        charSet.delete(arr[start]);
        start++;
        setWindowStart(start);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      charSet.add(char);
      setWindowEnd(end);
      
      if (end - start + 1 > maxLength) {
        maxLength = end - start + 1;
        setMaxSum(maxLength);
      }

      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateCountAnagrams = async () => {
    const str = "cbaebabacd";
    const pattern = "abc";
    const arr = str.split('');
    setStringArray(arr);
    
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // This is a simplified visualization
    for (let i = 0; i <= arr.length - pattern.length; i++) {
      setCurrentStep(1);
      setWindowStart(i);
      setWindowEnd(i + pattern.length - 1);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetArray = () => {
    setArray([2, 1, 5, 1, 3, 2]);
    setWindowStart(0);
    setWindowEnd(2);
    setCurrentSum(0);
    setMaxSum(0);
    setFoundWindow(null);
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
              <i className="ri-drag-move-2-line text-2xl text-blue-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Sliding Window Technique</h1>
              <p className="text-gray-600">Efficient algorithm pattern for subarray problems using a sliding window</p>
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
                          index >= windowStart && index <= windowEnd
                            ? 'bg-indigo-600 text-white border-indigo-600 scale-110'
                            : foundWindow && foundWindow.includes(value as any)
                            ? 'bg-green-500 text-white border-green-500'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">[{index}]</div>
                      {index === windowStart && (
                        <div className="text-xs text-indigo-600 font-semibold mt-1">Start</div>
                      )}
                      {index === windowEnd && (
                        <div className="text-xs text-indigo-600 font-semibold mt-1">End</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center text-sm text-gray-600">
                  Window Size: {windowEnd - windowStart + 1} | 
                  Current Sum: {currentSum} | 
                  {operation === 'max-sum' && ` Max Sum: ${maxSum}`}
                  {operation === 'longest-unique' && ` Max Length: ${maxSum}`}
                  {operation === 'target-sum' && ` Target: ${target}`}
                </div>

                {foundWindow && (
                  <div className="text-center text-sm text-green-600 font-semibold mt-2">
                    Found Window: [{foundWindow.join(', ')}] = {target}
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
                  {operation === 'max-sum' && selectedLanguage === 'javascript' && `// JavaScript Sliding Window - Maximum Sum Subarray - O(n)
function maxSumSubarray(arr, k) {
    let maxSum = 0;
    let windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window through array
    for (let i = k; i < arr.length; i++) {
        // Remove leftmost element and add new element
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Example usage
let numbers = [2, 1, 5, 1, 3, 2];
let result = maxSumSubarray(numbers, 3); // Returns 9`}
                  {operation === 'max-sum' && selectedLanguage === 'python' && `# Python Sliding Window - Maximum Sum Subarray - O(n)
def max_sum_subarray(arr, k):
    max_sum = 0
    window_sum = 0
    
    # Calculate sum of first window
    for i in range(k):
        window_sum += arr[i]
    max_sum = window_sum
    
    # Slide window through array
    for i in range(k, len(arr)):
        # Remove leftmost element and add new element
        window_sum = window_sum - arr[i - k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example usage
numbers = [2, 1, 5, 1, 3, 2]
result = max_sum_subarray(numbers, 3)  # Returns 9`}
                  {operation === 'max-sum' && selectedLanguage === 'java' && `// Java Sliding Window - Maximum Sum Subarray - O(n)
public class MaxSumSubarray {
    public static int maxSumSubarray(int[] arr, int k) {
        int maxSum = 0;
        int windowSum = 0;
        
        // Calculate sum of first window
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        maxSum = windowSum;
        
        // Slide window through array
        for (int i = k; i < arr.length; i++) {
            // Remove leftmost element and add new element
            windowSum = windowSum - arr[i - k] + arr[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }
    
    public static void main(String[] args) {
        int[] numbers = {2, 1, 5, 1, 3, 2};
        int result = maxSumSubarray(numbers, 3); // Returns 9
    }
}`}
                  {operation === 'max-sum' && selectedLanguage === 'cpp' && `// C++ Sliding Window - Maximum Sum Subarray - O(n)
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSumSubarray(const vector<int>& arr, int k) {
    int maxSum = 0;
    int windowSum = 0;
    
    // Calculate sum of first window
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window through array
    for (int i = k; i < arr.size(); i++) {
        // Remove leftmost element and add new element
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}

int main() {
    vector<int> numbers = {2, 1, 5, 1, 3, 2};
    int result = maxSumSubarray(numbers, 3); // Returns 9
    return 0;
}`}
                  {operation === 'target-sum' && selectedLanguage === 'javascript' && `// JavaScript Sliding Window - Target Sum Subarray - O(n)
function subarrayWithSum(arr, target) {
    let start = 0;
    let currentSum = 0;
    
    for (let end = 0; end < arr.length; end++) {
        currentSum += arr[end];
        
        // Shrink window if sum > target
        while (currentSum > target && start <= end) {
            currentSum -= arr[start];
            start++;
        }
        
        // Check if we found target
        if (currentSum === target) {
            return arr.slice(start, end + 1);
        }
    }
    
    return null; // No subarray found
}

// Example usage
let numbers = [2, 1, 5, 1, 3, 2];
let result = subarrayWithSum(numbers, 7); // Returns [2, 5]`}
                  {operation === 'target-sum' && selectedLanguage === 'python' && `# Python Sliding Window - Target Sum Subarray - O(n)
def subarray_with_sum(arr, target):
    start = 0
    current_sum = 0
    
    for end in range(len(arr)):
        current_sum += arr[end]
        
        # Shrink window if sum > target
        while current_sum > target and start <= end:
            current_sum -= arr[start]
            start += 1
        
        # Check if we found target
        if current_sum == target:
            return arr[start:end + 1]
    
    return None  # No subarray found

# Example usage
numbers = [2, 1, 5, 1, 3, 2]
result = subarray_with_sum(numbers, 7)  # Returns [2, 5]`}
                  {operation === 'target-sum' && selectedLanguage === 'java' && `// Java Sliding Window - Target Sum Subarray - O(n)
import java.util.*;

public class TargetSumSubarray {
    public static List<Integer> subarrayWithSum(int[] arr, int target) {
        int start = 0;
        int currentSum = 0;
        
        for (int end = 0; end < arr.length; end++) {
            currentSum += arr[end];
            
            // Shrink window if sum > target
            while (currentSum > target && start <= end) {
                currentSum -= arr[start];
                start++;
            }
            
            // Check if we found target
            if (currentSum == target) {
                List<Integer> result = new ArrayList<>();
                for (int i = start; i <= end; i++) {
                    result.add(arr[i]);
                }
                return result;
            }
        }
        
        return null; // No subarray found
    }
    
    public static void main(String[] args) {
        int[] numbers = {2, 1, 5, 1, 3, 2};
        List<Integer> result = subarrayWithSum(numbers, 7); // Returns [2, 5]
    }
}`}
                  {operation === 'target-sum' && selectedLanguage === 'cpp' && `// C++ Sliding Window - Target Sum Subarray - O(n)
#include <iostream>
#include <vector>
using namespace std;

vector<int> subarrayWithSum(const vector<int>& arr, int target) {
    int start = 0;
    int currentSum = 0;
    
    for (int end = 0; end < arr.size(); end++) {
        currentSum += arr[end];
        
        // Shrink window if sum > target
        while (currentSum > target && start <= end) {
            currentSum -= arr[start];
            start++;
        }
        
        // Check if we found target
        if (currentSum == target) {
            vector<int> result(arr.begin() + start, arr.begin() + end + 1);
            return result;
        }
    }
    
    return {}; // No subarray found
}

int main() {
    vector<int> numbers = {2, 1, 5, 1, 3, 2};
    auto result = subarrayWithSum(numbers, 7); // Returns {2, 5}
    return 0;
}`}
                  {operation === 'longest-unique' && selectedLanguage === 'javascript' && `// JavaScript Sliding Window - Longest Substring Unique - O(n)
function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let start = 0;
    let maxLength = 0;
    
    for (let end = 0; end < s.length; end++) {
        const char = s[end];
        
        // If character repeats, shrink window
        while (charSet.has(char)) {
            charSet.delete(s[start]);
            start++;
        }
        
        charSet.add(char);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}

// Example usage
let str = "abcabcbb";
let result = lengthOfLongestSubstring(str); // Returns 3`}
                  {operation === 'longest-unique' && selectedLanguage === 'python' && `# Python Sliding Window - Longest Substring Unique - O(n)
def length_of_longest_substring(s):
    char_set = set()
    start = 0
    max_length = 0
    
    for end in range(len(s)):
        char = s[end]
        
        # If character repeats, shrink window
        while char in char_set:
            char_set.remove(s[start])
            start += 1
        
        char_set.add(char)
        max_length = max(max_length, end - start + 1)
    
    return max_length

# Example usage
s = "abcabcbb"
result = length_of_longest_substring(s)  # Returns 3`}
                  {operation === 'longest-unique' && selectedLanguage === 'java' && `// Java Sliding Window - Longest Substring Unique - O(n)
import java.util.*;

public class LongestUniqueSubstring {
    public static int lengthOfLongestSubstring(String s) {
        Set<Character> charSet = new HashSet<>();
        int start = 0;
        int maxLength = 0;
        
        for (int end = 0; end < s.length(); end++) {
            char c = s.charAt(end);
            
            // If character repeats, shrink window
            while (charSet.contains(c)) {
                charSet.remove(s.charAt(start));
                start++;
            }
            
            charSet.add(c);
            maxLength = Math.max(maxLength, end - start + 1);
        }
        
        return maxLength;
    }
    
    public static void main(String[] args) {
        String str = "abcabcbb";
        int result = lengthOfLongestSubstring(str); // Returns 3
    }
}`}
                  {operation === 'longest-unique' && selectedLanguage === 'cpp' && `// C++ Sliding Window - Longest Substring Unique - O(n)
#include <iostream>
#include <unordered_set>
#include <string>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(const string& s) {
    unordered_set<char> charSet;
    int start = 0;
    int maxLength = 0;
    
    for (int end = 0; end < s.length(); end++) {
        char c = s[end];
        
        // If character repeats, shrink window
        while (charSet.find(c) != charSet.end()) {
            charSet.erase(s[start]);
            start++;
        }
        
        charSet.insert(c);
        maxLength = max(maxLength, end - start + 1);
    }
    
    return maxLength;
}

int main() {
    string str = "abcabcbb";
    int result = lengthOfLongestSubstring(str); // Returns 3
    return 0;
}`}
                  {operation === 'count-anagrams' && selectedLanguage === 'javascript' && `// JavaScript Sliding Window - Count Anagrams - O(n)
function countAnagrams(s, p) {
    const result = [];
    const pCount = new Array(26).fill(0);
    const sCount = new Array(26).fill(0);
    
    // Build frequency map for pattern
    for (let char of p) {
        pCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    
    let i = 0;
    for (let j = 0; j < s.length; j++) {
        sCount[s.charCodeAt(j) - 'a'.charCodeAt(0)]++;
        
        // Maintain window size
        if (j - i + 1 > p.length) {
            sCount[s.charCodeAt(i) - 'a'.charCodeAt(0)]--;
            i++;
        }
        
        // Check if anagram
        if (j - i + 1 === p.length && arraysEqual(pCount, sCount)) {
            result.push(i);
        }
    }
    
    return result.length;
}

function arraysEqual(a, b) {
    return a.every((val, index) => val === b[index]);
}

// Example usage
let s = "cbaebabacd";
let p = "abc";
let result = countAnagrams(s, p); // Returns 2`}
                  {operation === 'count-anagrams' && selectedLanguage === 'python' && `# Python Sliding Window - Count Anagrams - O(n)
from collections import Counter

def count_anagrams(s, p):
    result = 0
    p_count = Counter(p)
    s_count = Counter()
    
    i = 0
    for j in range(len(s)):
        s_count[s[j]] += 1
        
        # Maintain window size
        if j - i + 1 > len(p):
            s_count[s[i]] -= 1
            if s_count[s[i]] == 0:
                del s_count[s[i]]
            i += 1
        
        # Check if anagram
        if j - i + 1 == len(p) and p_count == s_count:
            result += 1
    
    return result

# Example usage
s = "cbaebabacd"
p = "abc"
result = count_anagrams(s, p)  # Returns 2`}
                  {operation === 'count-anagrams' && selectedLanguage === 'java' && `// Java Sliding Window - Count Anagrams - O(n)
import java.util.*;

public class CountAnagrams {
    public static int countAnagrams(String s, String p) {
        int result = 0;
        int[] pCount = new int[26];
        int[] sCount = new int[26];
        
        // Build frequency map for pattern
        for (char c : p.toCharArray()) {
            pCount[c - 'a']++;
        }
        
        int i = 0;
        for (int j = 0; j < s.length(); j++) {
            sCount[s.charAt(j) - 'a']++;
            
            // Maintain window size
            if (j - i + 1 > p.length()) {
                sCount[s.charAt(i) - 'a']--;
                i++;
            }
            
            // Check if anagram
            if (j - i + 1 == p.length() && Arrays.equals(pCount, sCount)) {
                result++;
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        String s = "cbaebabacd";
        String p = "abc";
        int result = countAnagrams(s, p); // Returns 2
    }
}`}
                  {operation === 'count-anagrams' && selectedLanguage === 'cpp' && `// C++ Sliding Window - Count Anagrams - O(n)
#include <iostream>
#include <string>
#include <vector>
#include <array>
using namespace std;

int countAnagrams(const string& s, const string& p) {
    int result = 0;
    array<int, 26> pCount = {0};
    array<int, 26> sCount = {0};
    
    // Build frequency map for pattern
    for (char c : p) {
        pCount[c - 'a']++;
    }
    
    int i = 0;
    for (int j = 0; j < s.length(); j++) {
        sCount[s[j] - 'a']++;
        
        // Maintain window size
        if (j - i + 1 > p.length()) {
            sCount[s[i] - 'a']--;
            i++;
        }
        
        // Check if anagram
        if (j - i + 1 == p.length() && pCount == sCount) {
            result++;
        }
    }
    
    return result;
}

int main() {
    string s = "cbaebabacd";
    string p = "abc";
    int result = countAnagrams(s, p); // Returns 2
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
                      <span>Fixed Window:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variable Window:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>With Hashing:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">O(1) or O(k)</span>
                </div>
              </div>
            </div>

            {/* When to Use */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Subarray/substring problems with fixed size</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Maximum/minimum subarray problems</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Counting subarrays with specific properties</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Longest substring with unique characters</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Anagram and pattern matching problems</span>
                </div>
              </div>
            </div>

            {/* Window Types */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Window Types</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Fixed Size</h4>
                  <p className="text-gray-600">Window size remains constant throughout the iteration</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Variable Size</h4>
                  <p className="text-gray-600">Window size expands and contracts based on conditions</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Dynamic</h4>
                  <p className="text-gray-600">Window moves based on complex conditions or multiple pointers</p>
                </div>
              </div>
            </div>

            {/* Common Patterns */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Patterns</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Sum-based Problems</h4>
                  <p className="text-gray-600">Track current sum and adjust window based on target</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Frequency-based Problems</h4>
                  <p className="text-gray-600">Use hash maps to track element frequencies in window</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Counting Problems</h4>
                  <p className="text-gray-600">Count subarrays satisfying specific conditions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}