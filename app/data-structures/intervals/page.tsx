'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function IntervalsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [operation, setOperation] = useState('merge');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [intervals, setIntervals] = useState([
    { start: 1, end: 3, color: '#3B82F6' },
    { start: 2, end: 6, color: '#10B981' },
    { start: 4, end: 8, color: '#F59E0B' }
  ]);
  const [mergedIntervals, setMergedIntervals] = useState<Array<{start: number, end: number, color: string}>>([]);
  const [currentInterval, setCurrentInterval] = useState<{start: number, end: number} | null>(null);

  const operations = [
    {
      id: 'merge',
      name: 'Merge Intervals',
      description: 'Combine overlapping intervals',
      complexity: 'O(n log n)',
      steps: ['Sort intervals by start time', 'Merge overlapping intervals', 'Build result array']
    },
    {
      id: 'insert',
      name: 'Insert Interval',
      description: 'Insert new interval into sorted list',
      complexity: 'O(n)',
      steps: ['Find correct position', 'Insert interval', 'Maintain sorted order']
    },
    {
      id: 'intersect',
      name: 'Find Intersection',
      description: 'Find common overlap between intervals',
      complexity: 'O(n)',
      steps: ['Sort intervals by start time', 'Find overlapping intervals', 'Return intersection']
    },
    {
      id: 'cover',
      name: 'Minimum Points to Cover',
      description: 'Find minimum points to cover all intervals',
      complexity: 'O(n log n)',
      steps: ['Sort intervals by end time', 'Greedy selection of points', 'Update remaining intervals']
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setMergedIntervals([]);
    setCurrentInterval(null);

    switch (operation) {
      case 'merge':
        await animateMerge();
        break;
      case 'insert':
        await animateInsert();
        break;
      case 'intersect':
        await animateIntersect();
        break;
      case 'cover':
        await animateCover();
        break;
    }

    setIsAnimating(false);
  };

  const animateMerge = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    const sorted = [...intervals].sort((a, b) => a.start - b.start);
    let merged: Array<{start: number, end: number, color: string}> = [];
    
    for (const interval of sorted) {
      if (merged.length === 0 || interval.start > merged[merged.length - 1].end) {
        merged.push(interval);
      } else {
        const last = merged[merged.length - 1];
        if (interval.start <= last.end) {
          merged[merged.length - 1] = { ...last, end: Math.max(last.end, interval.end) };
        } else {
          merged.push(interval);
        }
      }
      setMergedIntervals([...merged]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateInsert = async () => {
    const newInterval = { start: 5, end: 7, color: '#8B5CF6' };
    
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    const insertIndex = intervals.findIndex(interval => interval.start > newInterval.start);
    const newIntervals = [...intervals];
    newIntervals.splice(insertIndex, 0, newInterval);
    setIntervals(newIntervals);
    
    setCurrentInterval(newInterval);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateIntersect = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    const intersection = intervals.filter(interval => 
      interval.start <= 6 && interval.end >= 2
    );
    
    setMergedIntervals(intersection);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateCover = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(1);
    const points = [1, 4, 6, 8];
    const covered: Array<{start: number, end: number, color: string}> = [];
    
    for (const point of points) {
      let maxEnd = -1;
      let bestInterval = null;
      
      for (const interval of intervals) {
        if (interval.start <= point && point <= interval.end) {
          if (interval.end > maxEnd) {
            maxEnd = interval.end;
            bestInterval = interval;
          }
        }
      }
      
      if (bestInterval) {
        covered.push(bestInterval);
      }
    }
    
    setMergedIntervals(covered);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetAnimation = () => {
    setMergedIntervals([]);
    setCurrentInterval(null);
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
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-stack-line text-2xl text-orange-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Interval Data Structure</h1>
              <p className="text-gray-600">Managing and manipulating interval ranges efficiently</p>
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

              {/* Interval Visualization */}
              <div className="mb-8">
                <div className="space-y-4">
                  {/* Original Intervals */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Original Intervals</h3>
                    <div className="flex justify-center space-x-2">
                      {intervals.map((interval, index) => (
                        <div key={index} className="relative">
                          <div 
                            className="h-12 border-2 rounded transition-all duration-500"
                            style={{
                              left: `${interval.start * 60}px`,
                              width: `${(interval.end - interval.start) * 60}px`,
                              backgroundColor: interval.color,
                              borderColor: interval.color
                            }}
                          />
                          <div className="absolute -top-6 left-1/2 text-xs text-gray-600">
                            [{interval.start}, {interval.end}]
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Merged/Result Intervals */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {operation === 'merge' && 'Merged Intervals'}
                      {operation === 'intersect' && 'Intersection'}
                      {operation === 'cover' && 'Covered Intervals'}
                    </h3>
                    <div className="flex justify-center space-x-2">
                      {mergedIntervals.map((interval, index) => (
                        <div key={index} className="relative">
                          <div 
                            className="h-12 border-2 rounded transition-all duration-500"
                            style={{
                              left: `${interval.start * 60}px`,
                              width: `${(interval.end - interval.start) * 60}px`,
                              backgroundColor: interval.color,
                              borderColor: interval.color,
                              opacity: currentInterval && currentInterval.start === interval.start && currentInterval.end === interval.end ? 1 : 0.7
                            }}
                          />
                          <div className="absolute -top-6 left-1/2 text-xs text-white">
                            [{interval.start}, {interval.end}]
                          </div>
                        </div>
                      ))}
                    </div>
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
                  {operation === 'merge' && selectedLanguage === 'javascript' && `// JavaScript Merge Intervals - O(n log n)
function mergeIntervals(intervals) {
    if (intervals.length === 0) return [];
    
    // Sort intervals by start time
    intervals.sort((a, b) => a.start - b.start);
    
    const merged = [];
    for (const interval of intervals) {
        if (merged.length === 0 || interval.start > merged[merged.length - 1].end) {
            merged.push(interval);
        } else {
            const last = merged[merged.length - 1];
            if (interval.start <= last.end) {
                merged[merged.length - 1] = { ...last, end: Math.max(last.end, interval.end) };
            } else {
                merged.push(interval);
            }
        }
    }
    
    return merged;
}

// Example usage
const intervals = [
    { start: 1, end: 3 },
    { start: 2, end: 6 },
    { start: 4, end: 8 }
];
console.log(mergeIntervals(intervals));`}
                  {operation === 'merge' && selectedLanguage === 'python' && `# Python Merge Intervals - O(n log n)
def merge_intervals(intervals):
    if not intervals:
        return []
    
    # Sort intervals by start time
    intervals.sort(key=lambda x: x[0])
    
    merged = []
    for interval in intervals:
        if not merged or interval[0] > merged[-1][1]:
            merged.append(interval)
        else:
            last = merged[-1]
            if interval[0] <= last[1]:
                merged[-1] = {**last[0], last[1], **max(last[1], interval[1])}
            else:
                merged.append(interval)
    
    return merged`}
                  {operation === 'merge' && selectedLanguage === 'java' && `// Java Merge Intervals - O(n log n)
import java.util.*;

public class IntervalMerge {
    public static List<Interval> mergeIntervals(List<Interval> intervals) {
        if (intervals.isEmpty()) return new ArrayList<>();
        
        // Sort intervals by start time
        intervals.sort(Comparator.comparingInt(Interval::getStart));
        
        List<Interval> merged = new ArrayList<>();
        for (Interval interval : intervals) {
            if (merged.isEmpty() || interval.getStart() > merged.get(merged.size() - 1).getEnd()) {
                merged.add(interval);
            } else {
                Interval last = merged.get(merged.size() - 1);
                if (interval.getStart() <= last.getEnd()) {
                    merged.set(merged.size() - 1, new Interval(last.getStart(), Math.max(last.getEnd(), interval.getEnd())));
                } else {
                    merged.add(interval);
                }
            }
        }
        
        return merged;
    }
    
    public static class Interval {
        int start, end;
        
        public Interval(int start, int end) {
            this.start = start;
            this.end = end;
        }
        
        public int getStart() { return start; }
        public int getEnd() { return end; }
    }
}`}
                  {operation === 'merge' && selectedLanguage === 'cpp' && `// C++ Merge Intervals - O(n log n)
#include <vector>
#include <algorithm>

struct Interval {
    int start, end;
    Interval(int s, int e) : start(s), end(e) {}
};

std::vector<Interval> mergeIntervals(std::vector<Interval> intervals) {
    if (intervals.empty()) return {};
    
    // Sort intervals by start time
    std::sort(intervals.begin(), intervals.end(), 
              [](const Interval& a, const Interval& b) { return a.start < b.start; });
    
    std::vector<Interval> merged;
    for (const auto& interval : intervals) {
        if (merged.empty() || interval.start > merged.back().end) {
            merged.push_back(interval);
        } else {
            auto& last = merged.back();
            if (interval.start <= last.end) {
                merged.back() = {last.start, std::max(last.end, interval.end)};
            } else {
                merged.push_back(interval);
            }
        }
    }
    
    return merged;
}`}
                  {operation === 'insert' && selectedLanguage === 'javascript' && `// JavaScript Insert Interval - O(n)
function insertInterval(intervals, newInterval) {
    const insertIndex = intervals.findIndex(interval => interval.start > newInterval.start);
    
    if (insertIndex === -1) {
        intervals.push(newInterval);
    } else {
        intervals.splice(insertIndex, 0, newInterval);
    }
    
    return intervals;
}

// Example usage
let intervals = [
    { start: 1, end: 3 },
    { start: 4, end: 6 }
];
insertInterval(intervals, { start: 2, end: 5 });
console.log(intervals);`}
                  {operation === 'intersect' && selectedLanguage === 'python' && `# Python Find Intersection - O(n)
def find_intersection(intervals1, intervals2):
    result = []
    
    for interval1 in intervals1:
        for interval2 in intervals2:
            if not (interval1[1] > interval2[1] or interval1[0] < interval2[0]):
                if interval1 not in result:
                    result.append(interval1)
    
    return result

# Example usage
intervals1 = [{1, 3}, {2, 6}, {4, 8}]
intervals2 = [{2, 4}, {3, 6}]
print(find_intersection(intervals1, intervals2))  # [{2, 4}, {3, 6}]`}
                  {operation === 'cover' && selectedLanguage === 'javascript' && `// JavaScript Minimum Points to Cover - O(n log n)
function minPointsToCover(intervals) {
    if (intervals.length === 0) return [];
    
    intervals.sort((a, b) => a.end - b.end);
    
    const points = [];
    const covered = [];
    
    for (const point of [1, 2, 3, 4, 5, 6, 7, 8]) {
        let maxEnd = -1;
        let bestInterval = null;
        
        for (const interval of intervals) {
            if (interval.start <= point && point <= interval.end) {
                if (interval.end > maxEnd) {
                    maxEnd = interval.end;
                    bestInterval = interval;
                }
            }
        }
        
        if (bestInterval) {
            covered.push(bestInterval);
        }
    }
    
    return covered;
}

// Example usage
const intervals = [
    { start: 1, end: 4 },
    { start: 2, end: 6 },
    { start: 3, end: 8 }
];
console.log(minPointsToCover(intervals));`}
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
                      <span>Merge:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insert:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Intersection:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cover:</span>
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
                  <span>Meeting room scheduling</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Calendar management</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Resource allocation</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Database range queries</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Collision detection</span>
                </div>
              </div>
            </div>

            {/* Common Operations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Operations</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Sorting</h4>
                  <p className="text-gray-600">Sort by start or end time for processing</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Binary Search</h4>
                  <p className="text-gray-600">Find intervals containing a specific point</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Range Queries</h4>
                  <p className="text-gray-600">Count intervals in a given range</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Sweep Line</h4>
                  <p className="text-gray-600">Process events in chronological order</p>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-world Applications</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Calendar Systems</h4>
                  <p className="text-gray-600">Meeting scheduling, event planning</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Database Systems</h4>
                  <p className="text-gray-600">Time range queries, availability</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Network Routing</h4>
                  <p className="text-gray-600">Bandwidth allocation, time slots</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Resource Management</h4>
                  <p className="text-gray-600">CPU scheduling, memory allocation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}