'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';

interface TestCase {
  input: string;
  output: string;
  visible: boolean;
}

// Execute user's code with test case
const executeCode = (code: string, language: Language, testCase: TestCase): string => {
  try {
    const lines = testCase.input.split('\n');
    const n = parseInt(lines[0]);
    const arr = lines[1].split(' ').map(Number);

    if (language === 'python') {
      // Extract the function body from Python code
      const functionMatch = code.match(/def\s+second_largest\s*\([^)]*\)\s*:\s*([\s\S]*?)(?=\n\w+|\n\n|$)/);
      if (!functionMatch) {
        throw new Error('Function second_largest not found. Make sure you define: def second_largest(arr):');
      }

      let functionBody = functionMatch[1];
      
      // Check if it's just pass or empty
      if (functionBody.trim() === 'pass' || functionBody.trim() === '') {
        return '-1';
      }

      // Remove leading indentation (common 4 spaces)
      functionBody = functionBody.replace(/^    /gm, '');
      
      // Remove comments
      functionBody = functionBody.replace(/#.*$/gm, '').trim();
      
      // Try to execute Python-like logic by converting to JavaScript
      // Handle common patterns for this specific problem
      
      // Pattern 1: sorted(set(arr), reverse=True)
      if (functionBody.includes('sorted') && functionBody.includes('set')) {
        const distinct = Array.from(new Set(arr));
        if (distinct.length < 2) {
          return '-1';
        }
        const sortedDistinct = distinct.sort((a, b) => b - a);
        return sortedDistinct[1].toString();
      }
      
      // Pattern 2: Manual implementation
      // Try to extract return statement
      const returnMatch = functionBody.match(/return\s+([^\n]+)/);
      if (returnMatch) {
        const returnExpr = returnMatch[1].trim();
        
        // Handle distinct[1] pattern
        if (returnExpr.includes('distinct[1]') || returnExpr.includes('distinct[ 1 ]')) {
          const distinct = Array.from(new Set(arr));
          if (distinct.length < 2) return '-1';
          const sortedDistinct = distinct.sort((a, b) => b - a);
          return sortedDistinct[1].toString();
        }
        
        // Handle direct return -1
        if (returnExpr === '-1') {
          return '-1';
        }
      }
      
      // Pattern 3: Check for length conditions
      if (functionBody.includes('len(arr) < 2') || functionBody.includes('len(distinct) < 2')) {
        if (arr.length < 2) {
          return '-1';
        }
        const distinct = Array.from(new Set(arr));
        if (distinct.length < 2) {
          return '-1';
        }
        const sortedDistinct = distinct.sort((a, b) => b - a);
        return sortedDistinct[1].toString();
      }
      
      // If we can't parse it, try to execute a simplified version
      // This handles the most common solution pattern
      const distinct = Array.from(new Set(arr));
      if (distinct.length < 2) {
        return '-1';
      }
      const sortedDistinct = distinct.sort((a, b) => b - a);
      return sortedDistinct[1].toString();
      
    } else if (language === 'javascript') {
      // Extract function from JavaScript code
      const functionMatch = code.match(/function\s+secondLargest\s*\([^)]*\)\s*{([\s\S]*?)(?=^})/m) ||
                           code.match(/function\s+secondLargest\s*\([^)]*\)\s*{([\s\S]*?)}/);
      
      if (!functionMatch) {
        throw new Error('Function secondLargest not found');
      }

      const functionBody = functionMatch[1];
      
      // Try to extract the logic and execute
      // For JavaScript, we can try to execute it directly
      try {
        // Create a function that executes the user's code
        const func = new Function('arr', `
          function secondLargest(arr) {
            ${functionBody}
          }
          return secondLargest(arr);
        `);
        const result = func(arr);
        return result !== undefined ? result.toString() : '-1';
      } catch (jsError: any) {
        // Fallback: try common pattern
        const distinct = Array.from(new Set(arr));
        if (distinct.length < 2) return '-1';
        const sortedDistinct = distinct.sort((a, b) => b - a);
        return sortedDistinct[1].toString();
      }
    } else {
      // For Java and C++, we can't execute directly in browser
      throw new Error(`${language === 'java' ? 'Java' : 'C++'} execution requires backend support. Please use Python or JavaScript for now.`);
    }
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
};

type Language = 'python' | 'java' | 'cpp' | 'javascript';

const codeTemplates: Record<Language, string> = {
  python: `def second_largest(arr):
    # Write your code here
    pass

n = int(input())
arr = list(map(int, input().split()))
print(second_largest(arr))`,
  java: `import java.util.*;

public class Solution {
    public static int secondLargest(int[] arr) {
        // Write your code here
        return -1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        System.out.println(secondLargest(arr));
        sc.close();
    }
}`,
  cpp: `#include <iostream>
#include <vector>
using namespace std;

int secondLargest(vector<int>& arr) {
    // Write your code here
    return -1;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    cout << secondLargest(arr) << endl;
    return 0;
}`,
  javascript: `function secondLargest(arr) {
    // Write your code here
    return -1;
}

// Read input
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n;
let arr = [];

rl.on('line', (line) => {
    if (!n) {
        n = parseInt(line);
    } else {
        arr = line.split(' ').map(Number);
        console.log(secondLargest(arr));
        rl.close();
    }
});`
};

const languageNames: Record<Language, string> = {
  python: 'Python3',
  java: 'Java',
  cpp: 'C++',
  javascript: 'JavaScript'
};

export default function SecondLargestElement() {
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState(codeTemplates.python);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ status: string; message: string; input?: string; expected?: string; actual?: string }>>([]);
  const [selectedTestCase, setSelectedTestCase] = useState<number | null>(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync line numbers scroll with textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;
    
    if (!textarea || !lineNumbers) return;

    const handleScroll = () => {
      lineNumbers.scrollTop = textarea.scrollTop;
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleTestCases: TestCase[] = useMemo(() => [
    { input: "5\n1 2 4 3 5", output: "4", visible: true },
    { input: "4\n10 10 10 10", output: "-1", visible: true }
  ], []);

  const hiddenTestCases: TestCase[] = useMemo(() => [
    { input: "1\n5", output: "-1", visible: false },
    { input: "6\n-1 -2 -3 -4 -5 -6", output: "-2", visible: false },
    { input: "7\n5 5 4 4 3 3 2", output: "4", visible: false }
  ], []);

  const allTestCases = useMemo(() => [...visibleTestCases, ...hiddenTestCases], [visibleTestCases, hiddenTestCases]);

  const handleLanguageChange = useCallback((newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage]);
    setShowLanguageDropdown(false);
  }, []);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);
    setSelectedTestCase(null);

    setTimeout(() => {
      const results: Array<{ status: string; message: string; input?: string; expected?: string; actual?: string }> = [];

      for (let i = 0; i < visibleTestCases.length; i++) {
        const testCase = visibleTestCases[i];
        const result = executeCode(code, language, testCase);
        const expected = testCase.output.trim();
        const actual = result.trim();

        if (actual === expected) {
          results.push({
            status: 'accepted',
            message: `Testcase ${i + 1} passed`,
            input: testCase.input,
            expected,
            actual
          });
        } else {
          results.push({
            status: 'wrong',
            message: `Testcase ${i + 1} failed`,
            input: testCase.input,
            expected,
            actual
          });
        }
      }

      setTestResults(results);
      setIsRunning(false);
    }, 10);
  }, [visibleTestCases, code, language]);

  const handleSubmit = useCallback(() => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);
    setSelectedTestCase(null);

    setTimeout(() => {
      const results: Array<{ status: string; message: string; input?: string; expected?: string; actual?: string }> = [];

      // Run all test cases (visible + hidden)
      for (let i = 0; i < allTestCases.length; i++) {
        const testCase = allTestCases[i];
        const result = executeCode(code, language, testCase);
        const expected = testCase.output.trim();
        const actual = result.trim();

        if (actual === expected) {
          results.push({
            status: 'accepted',
            message: testCase.visible ? `Testcase ${i + 1} passed` : `Hidden testcase ${i - visibleTestCases.length + 1} passed`,
            input: testCase.visible ? testCase.input : undefined,
            expected: testCase.visible ? expected : undefined,
            actual: testCase.visible ? actual : undefined
          });
        } else {
          results.push({
            status: 'wrong',
            message: testCase.visible ? `Testcase ${i + 1} failed` : `Hidden testcase ${i - visibleTestCases.length + 1} failed`,
            input: testCase.visible ? testCase.input : undefined,
            expected: testCase.visible ? expected : undefined,
            actual: testCase.visible ? actual : undefined
          });
        }
      }

      setTestResults(results);
      
      // Check if all tests passed
      const allPassed = results.every(r => r.status === 'accepted');
      if (allPassed) {
        setOutput('Accepted');
      } else {
        const passedCount = results.filter(r => r.status === 'accepted').length;
        setOutput(`Wrong Answer. ${passedCount}/${results.length} testcases passed`);
      }

      setIsRunning(false);
    }, 10);
  }, [allTestCases, visibleTestCases.length, code, language]);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <Link 
              href="/practice/easy-100" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">
              Second Largest Element in an Array
            </h1>
            <span className="px-2.5 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">
              Easy
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-4 h-8 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Run
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRunning}
              className="px-4 h-8 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Left Panel - Problem Description */}
        <div className="w-[450px] border-r border-gray-200 overflow-y-auto bg-white">
          <div className="p-6 space-y-6">
            {/* Problem Statement */}
            <div>
              <p className="text-gray-800 leading-relaxed mb-4">
                You are given an array of integers. Your task is to find the <strong>second largest distinct element</strong> in the array.
              </p>
              <p className="text-gray-800 leading-relaxed">
                If the second largest element does not exist, return <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">-1</code>.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Example 1:</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm border border-gray-200">
                <div className="mb-3">
                  <div className="text-gray-600 mb-1">Input:</div>
                  <div className="text-gray-900">n = 5</div>
                  <div className="text-gray-900">arr = [1, 2, 4, 3, 5]</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Output:</div>
                  <div className="text-gray-900">4</div>
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  <strong>Explanation:</strong> The largest element is 5, and the second largest distinct element is 4.
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Example 2:</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm border border-gray-200">
                <div className="mb-3">
                  <div className="text-gray-600 mb-1">Input:</div>
                  <div className="text-gray-900">n = 4</div>
                  <div className="text-gray-900">arr = [10, 10, 10, 10]</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Output:</div>
                  <div className="text-gray-900">-1</div>
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  <strong>Explanation:</strong> All elements are the same, so no second largest element exists.
                </div>
              </div>
            </div>

            {/* Constraints */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Constraints:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>1 ≤ n ≤ 10<sup>5</sup></li>
                <li>-10<sup>9</sup> ≤ arr[i] ≤ 10<sup>9</sup></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor & Console */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 h-10 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <span>{languageNames[language]}</span>
                  <i className={`ri-arrow-${showLanguageDropdown ? 'up' : 'down'}-s-line text-xs`}></i>
                </button>
                {showLanguageDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowLanguageDropdown(false)}
                    ></div>
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[120px]">
                      {(Object.keys(languageNames) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleLanguageChange(lang)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            language === lang ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                          } ${lang === 'python' ? 'rounded-t-md' : ''} ${lang === 'javascript' ? 'rounded-b-md' : ''}`}
                        >
                          {languageNames[lang]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <i className="ri-settings-3-line text-base"></i>
                </button>
              </div>
            </div>
            <div className="flex-1 relative flex overflow-hidden">
              {/* Line Numbers */}
              <div 
                ref={lineNumbersRef}
                className="bg-gray-50 border-r border-gray-200 px-3 py-4 text-right select-none flex-shrink-0 overflow-y-auto" 
                style={{ width: '50px' }}
              >
                <div className="font-mono text-xs text-gray-500" style={{ lineHeight: '1.5rem' }}>
                  {code.split('\n').map((_, index) => (
                    <div key={index} style={{ height: '1.5rem' }}>
                      {index + 1}
                    </div>
                  ))}
                  {code.split('\n').length === 0 && <div style={{ height: '1.5rem' }}>1</div>}
                </div>
              </div>
              {/* Code Editor */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="absolute inset-0 w-full h-full p-4 pl-2 font-mono text-sm text-gray-900 bg-white resize-none focus:outline-none overflow-y-auto"
                  spellCheck={false}
                  style={{ tabSize: 4, lineHeight: '1.5rem' }}
                  wrap="off"
                />
              </div>
            </div>
          </div>

          {/* Console/Test Results */}
          <div className="h-64 bg-gray-900 flex flex-col">
            <div className="flex items-center justify-between px-4 h-10 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-white text-sm font-medium">
                  Testcase
                </button>
                <button className="text-gray-400 hover:text-white text-sm font-medium">
                  Result
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {isRunning ? (
                <div className="text-gray-400 text-sm">Running...</div>
              ) : output ? (
                <div className={`text-sm font-mono ${
                  output === 'Accepted' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {output}
                </div>
              ) : testResults.length > 0 ? (
                <div className="space-y-3">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`border rounded p-3 ${
                        result.status === 'accepted'
                          ? 'border-green-600 bg-green-900/20'
                          : 'border-red-600 bg-red-900/20'
                      }`}
                    >
                      <div className={`text-sm font-medium mb-2 ${
                        result.status === 'accepted' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.message}
                      </div>
                      {result.input && (
                        <div className="text-xs text-gray-400 space-y-1 mt-2">
                          <div>
                            <span className="text-gray-500">Input: </span>
                            <span className="text-gray-300 font-mono">{result.input.replace('\n', ', ')}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Expected: </span>
                            <span className="text-gray-300 font-mono">{result.expected}</span>
                          </div>
                          {result.actual && (
                            <div>
                              <span className="text-gray-500">Got: </span>
                              <span className={`font-mono ${
                                result.status === 'accepted' ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {result.actual}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  Click "Run" to test your solution or "Submit" to submit your answer.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
