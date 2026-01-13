'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HashingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hashTable, setHashTable] = useState<(string | null)[]>(Array(10).fill(null));
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [operation, setOperation] = useState('insert');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [collisionIndex, setCollisionIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);

  const operations = [
    {
      id: 'insert',
      name: 'Insert Element',
      description: 'Insert a key-value pair into hash table',
      complexity: 'O(1) average',
      steps: ['Calculate hash key', 'Check for collision', 'Insert or handle collision', 'Update table']
    },
    {
      id: 'search',
      name: 'Search Element',
      description: 'Search for a key in hash table',
      complexity: 'O(1) average',
      steps: ['Calculate hash key', 'Check target position', 'Handle collisions if needed', 'Return result']
    },
    {
      id: 'delete',
      name: 'Delete Element',
      description: 'Remove a key from hash table',
      complexity: 'O(1) average',
      steps: ['Calculate hash key', 'Find element', 'Remove from table', 'Mark as deleted']
    },
    {
      id: 'collision',
      name: 'Collision Resolution',
      description: 'Demonstrate collision handling',
      complexity: 'O(1) average',
      steps: ['Show hash collision', 'Apply resolution strategy', 'Find empty slot', 'Insert element']
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 31) % 10;
    }
    return Math.abs(hash);
  };

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setCollisionIndex(-1);
    setFoundIndex(-1);

    switch (operation) {
      case 'insert':
        await animateInsert();
        break;
      case 'search':
        await animateSearch();
        break;
      case 'delete':
        await animateDelete();
        break;
      case 'collision':
        await animateCollision();
        break;
    }

    setIsAnimating(false);
  };

  const animateInsert = async () => {
    const key = 'apple';
    const value = 'red';
    const hash = hashFunction(key);
    
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentStep(1);
    if (hashTable[hash] !== null) {
      setCollisionIndex(hash);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setCurrentStep(2);
    let index = hash;
    while (hashTable[index] !== null && index < 10) {
      index = (index + 1) % 10;
    }
    
    const newTable = [...hashTable];
    newTable[index] = `${key}:${value}`;
    setHashTable(newTable);
    setFoundIndex(index);
    
    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const animateSearch = async () => {
    const key = 'banana';
    const hash = hashFunction(key);
    
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentStep(1);
    setFoundIndex(hash);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (hashTable[hash] && hashTable[hash].startsWith(key)) {
      setCurrentStep(3);
    } else {
      setCurrentStep(2);
      let index = (hash + 1) % 10;
      let found = false;
      
      while (index !== hash && index < 10) {
        setFoundIndex(index);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (hashTable[index] && hashTable[index]!.startsWith(key)) {
          found = true;
          break;
        }
        index = (index + 1) % 10;
      }
      
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const animateDelete = async () => {
    const key = 'cherry';
    const hash = hashFunction(key);
    
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentStep(1);
    let index = hash;
    let found = false;
    
    while (index < 10) {
      if (hashTable[index] && hashTable[index]!.startsWith(key)) {
        found = true;
        break;
      }
      index = (index + 1) % 10;
    }
    
    if (found) {
      setCurrentStep(2);
      setFoundIndex(index);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newTable = [...hashTable];
      newTable[index] = null;
      setHashTable(newTable);
      
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const animateCollision = async () => {
    const key1 = 'apple';
    const key2 = 'ppale'; // Same hash as apple
    
    const hash1 = hashFunction(key1);
    const hash2 = hashFunction(key2);
    
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentStep(1);
    setCollisionIndex(hash1);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentStep(2);
    let index2 = (hash2 + 1) % 10;
    while (index2 !== hash2 && hashTable[index2] !== null) {
      index2 = (index2 + 1) % 10;
    }
    setFoundIndex(index2);
    
    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const resetHashTable = () => {
    setHashTable(Array(10).fill(null));
    setCollisionIndex(-1);
    setFoundIndex(-1);
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
              <i className="ri-hashtag text-2xl text-orange-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Hashing</h1>
              <p className="text-gray-600">Efficient data structure for key-value storage and retrieval</p>
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
                    onClick={resetHashTable}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Hash Table Visualization */}
              <div className="mb-8">
                <div className="grid grid-cols-5 gap-4 mb-4">
                  {hashTable.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-xs text-gray-500 mb-1">Index {index}</div>
                      <div
                        className={`w-20 h-20 border-2 rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all duration-500 ${
                          index === collisionIndex
                            ? 'bg-red-100 border-red-500 text-red-700'
                            : index === foundIndex
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : value
                            ? 'bg-blue-50 border-blue-300 text-blue-700'
                            : 'bg-gray-50 border-gray-300 text-gray-500'
                        }`}
                      >
                        {value || 'Empty'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center text-sm text-gray-600">
                  Hash Function: Simple Modulo | Table Size: 10 | Collision Resolution: Linear Probing
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
                  {operation === 'insert' && selectedLanguage === 'javascript' && `// JavaScript Hash Table - Insert - O(1) average
class HashTable {
  constructor(size = 10) {
    this.table = new Array(size).fill(null);
    this.size = size;
  }
  
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 31) % this.size;
    }
    return Math.abs(hash);
  }
  
  insert(key, value) {
    const index = this.hash(key);
    
    // Handle collision with linear probing
    let currentIndex = index;
    while (this.table[currentIndex] !== null) {
      if (this.table[currentIndex].startsWith(key + ':')) {
        // Update existing key
        this.table[currentIndex] = key + ':' + value;
        return;
      }
      currentIndex = (currentIndex + 1) % this.size;
      if (currentIndex === index) break; // Table is full
    }
    
    this.table[currentIndex] = key + ':' + value;
  }
}

// Example usage
const ht = new HashTable();
ht.insert('apple', 'red');
ht.insert('banana', 'yellow');`}
                  {operation === 'insert' && selectedLanguage === 'python' && `# Python Hash Table - Insert - O(1) average
class HashTable:
    def __init__(self, size=10):
        self.table = [None] * size
        self.size = size
    
    def hash(self, key):
        hash_value = 0
        for char in key:
            hash_value = (hash_value + ord(char) * 31) % self.size
        return abs(hash_value)
    
    def insert(self, key, value):
        index = self.hash(key)
        
        # Handle collision with linear probing
        current_index = index
        while self.table[current_index] is not None:
            if self.table[current_index].startswith(key + ':'):
                # Update existing key
                self.table[current_index] = key + ':' + value
                return
            current_index = (current_index + 1) % self.size
            if current_index == index:
                break  # Table is full
        
        self.table[current_index] = key + ':' + value

# Example usage
ht = HashTable()
ht.insert('apple', 'red')
ht.insert('banana', 'yellow')`}
                  {operation === 'insert' && selectedLanguage === 'java' && `// Java Hash Table - Insert - O(1) average
import java.util.Arrays;

public class HashTable {
    private String[] table;
    private int size;
    
    public HashTable(int size) {
        this.table = new String[size];
        this.size = size;
    }
    
    private int hash(String key) {
        int hash = 0;
        for (int i = 0; i < key.length(); i++) {
            hash = (hash + key.charAt(i) * 31) % size;
        }
        return Math.abs(hash);
    }
    
    public void insert(String key, String value) {
        int index = hash(key);
        
        // Handle collision with linear probing
        int currentIndex = index;
        while (table[currentIndex] != null) {
            if (table[currentIndex].startsWith(key + ":")) {
                // Update existing key
                table[currentIndex] = key + ":" + value;
                return;
            }
            currentIndex = (currentIndex + 1) % size;
            if (currentIndex == index) break; // Table is full
        }
        
        table[currentIndex] = key + ":" + value;
    }
}`}
                  {operation === 'insert' && selectedLanguage === 'cpp' && `// C++ Hash Table - Insert - O(1) average
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class HashTable {
private:
    vector<string> table;
    int size;
    
    int hash(const string& key) {
        int hashValue = 0;
        for (char c : key) {
            hashValue = (hashValue + c * 31) % size;
        }
        return abs(hashValue);
    }
    
public:
    HashTable(int size = 10) : size(size), table(size) {}
    
    void insert(const string& key, const string& value) {
        int index = hash(key);
        
        // Handle collision with linear probing
        int currentIndex = index;
        while (!table[currentIndex].empty()) {
            if (table[currentIndex].find(key + ":") == 0) {
                // Update existing key
                table[currentIndex] = key + ":" + value;
                return;
            }
            currentIndex = (currentIndex + 1) % size;
            if (currentIndex == index) break; // Table is full
        }
        
        table[currentIndex] = key + ":" + value;
    }
};`}
                  {operation === 'search' && selectedLanguage === 'javascript' && `// JavaScript Hash Table - Search - O(1) average
search(key) {
    const index = this.hash(key);
    
    // Search with linear probing
    let currentIndex = index;
    while (this.table[currentIndex] !== null) {
        if (this.table[currentIndex].startsWith(key + ':')) {
            // Found the key
            const value = this.table[currentIndex].split(':')[1];
            return value;
        }
        currentIndex = (currentIndex + 1) % this.size;
        if (currentIndex === index) break; // Full cycle
    }
    
    return null; // Not found
}

// Example usage
const ht = new HashTable();
ht.insert('apple', 'red');
const color = ht.search('apple'); // Returns 'red'
const notFound = ht.search('grape'); // Returns null`}
                  {operation === 'search' && selectedLanguage === 'python' && `# Python Hash Table - Search - O(1) average
def search(self, key):
    index = self.hash(key)
    
    # Search with linear probing
    current_index = index
    while self.table[current_index] is not None:
        if self.table[current_index].startswith(key + ':'):
            # Found the key
            value = self.table[current_index].split(':')[1]
            return value
        current_index = (current_index + 1) % self.size
        if current_index == index:
            break  # Full cycle
    
    return None  # Not found

# Example usage
ht = HashTable()
ht.insert('apple', 'red')
color = ht.search('apple')  # Returns 'red'
not_found = ht.search('grape')  # Returns None`}
                  {operation === 'search' && selectedLanguage === 'java' && `// Java Hash Table - Search - O(1) average
public String search(String key) {
    int index = hash(key);
    
    // Search with linear probing
    int currentIndex = index;
    while (table[currentIndex] != null) {
        if (table[currentIndex].startsWith(key + ":")) {
            // Found the key
            String value = table[currentIndex].split(":")[1];
            return value;
        }
        currentIndex = (currentIndex + 1) % size;
        if (currentIndex == index) break; // Full cycle
    }
    
    return null; // Not found
}

// Example usage
HashTable ht = new HashTable(10);
ht.insert("apple", "red");
String color = ht.search("apple"); // Returns "red"
String notFound = ht.search("grape"); // Returns null`}
                  {operation === 'search' && selectedLanguage === 'cpp' && `// C++ Hash Table - Search - O(1) average
string search(const string& key) {
    int index = hash(key);
    
    // Search with linear probing
    int currentIndex = index;
    while (!table[currentIndex].empty()) {
        if (table[currentIndex].find(key + ":") == 0) {
            // Found the key
            size_t colonPos = table[currentIndex].find(':');
            string value = table[currentIndex].substr(colonPos + 1);
            return value;
        }
        currentIndex = (currentIndex + 1) % size;
        if (currentIndex == index) break; // Full cycle
    }
    
    return ""; // Not found
}

// Example usage
HashTable ht;
ht.insert("apple", "red");
string color = ht.search("apple"); // Returns "red"
string notFound = ht.search("grape"); // Returns ""`}
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
                      <span>Insert:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delete:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worst Case:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
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
                  <span>Fast key-value lookups</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Caching and memoization</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Duplicate detection</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Counting frequencies</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Symbol tables in compilers</span>
                </div>
              </div>
            </div>

            {/* Collision Resolution */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collision Resolution</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Linear Probing</h4>
                  <p className="text-gray-600">Check next slot sequentially</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Quadratic Probing</h4>
                  <p className="text-gray-600">Check slots at quadratic intervals</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Chaining</h4>
                  <p className="text-gray-600">Use linked lists for collisions</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Double Hashing</h4>
                  <p className="text-gray-600">Use second hash function</p>
                </div>
              </div>
            </div>

            {/* Hash Functions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hash Functions</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Properties</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Deterministic</li>
                    <li>• Uniform distribution</li>
                    <li>• Fast computation</li>
                    <li>• Avalanche effect</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Common Types</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Division method</li>
                    <li>• Multiplication method</li>
                    <li>• Universal hashing</li>
                    <li>• Cryptographic hashes</li>
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