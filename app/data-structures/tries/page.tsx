'use client';

import Link from 'next/link';
import { useState } from 'react';

interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  value?: string;
}

export default function TriesPage() {
  const [operation, setOperation] = useState('insert');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [inputWord, setInputWord] = useState('hello');
  const [searchValue, setSearchValue] = useState('hello');
  const [prefix, setPrefix] = useState('he');
  const [trie, setTrie] = useState<TrieNode>({ children: new Map(), isEndOfWord: false });
  const [insertedWords, setInsertedWords] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentNode, setCurrentNode] = useState<TrieNode | null>(null);
  const [searchPath, setSearchPath] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const operations = [
    {
      id: 'insert',
      name: 'Insert',
      description: 'Insert a word into the trie',
      complexity: 'O(L)'
    },
    {
      id: 'search',
      name: 'Search',
      description: 'Search for a word in the trie',
      complexity: 'O(L)'
    },
    {
      id: 'prefix',
      name: 'Prefix Search',
      description: 'Find all words with given prefix',
      complexity: 'O(P + R)'
    },
    {
      id: 'delete',
      name: 'Delete',
      description: 'Delete a word from the trie',
      complexity: 'O(L)'
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const initializeSampleTrie = () => {
    const root: TrieNode = { children: new Map(), isEndOfWord: false };
    
    const words = ['cat', 'car', 'dog', 'deer', 'deal'];
    words.forEach(word => {
      let current = root;
      for (const char of word) {
        if (!current.children.has(char)) {
          current.children.set(char, { children: new Map(), isEndOfWord: false, value: char });
        }
        current = current.children.get(char)!;
      }
      current.isEndOfWord = true;
    });
    
    setTrie(root);
    setInsertedWords(words);
  };

  const insertWord = async (word: string) => {
    let current = trie;
    const path: string[] = [];
    
    for (const char of word) {
      path.push(char);
      setCurrentNode(current);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!current.children.has(char)) {
        current.children.set(char, { children: new Map(), isEndOfWord: false, value: char });
      }
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
    setCurrentNode(current);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTrie({ ...trie });
    setCurrentNode(null);
  };

  const searchForWord = async (word: string) => {
    let current = trie;
    const path: string[] = [];
    
    for (const char of word) {
      path.push(char);
      setCurrentNode(current);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!current.children.has(char)) {
        setCurrentNode(null);
        return false;
      }
      current = current.children.get(char)!;
    }
    
    setCurrentNode(current);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const found = current.isEndOfWord;
    setCurrentNode(null);
    return found;
  };

  const findWordsWithPrefix = async (prefix: string) => {
    let current = trie;
    const path: string[] = [];
    
    // Navigate to prefix
    for (const char of prefix) {
      path.push(char);
      setCurrentNode(current);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!current.children.has(char)) {
        setCurrentNode(null);
        setFoundWords([]);
        return;
      }
      current = current.children.get(char)!;
    }
    
    // Find all words from this node
    const words: string[] = [];
    
    const dfs = async (node: TrieNode, currentWord: string) => {
      if (node.isEndOfWord) {
        words.push(currentWord);
      }
      
      for (const [char, child] of node.children) {
        setCurrentNode(child);
        await new Promise(resolve => setTimeout(resolve, 300));
        await dfs(child, currentWord + char);
      }
    };
    
    await dfs(current, prefix);
    setFoundWords(words);
    setCurrentNode(null);
  };

  const deleteWord = async (word: string) => {
    const deleteHelper = async (node: TrieNode, word: string, depth: number): Promise<boolean> => {
      if (depth === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        return node.children.size === 0;
      }
      
      const char = word[depth];
      if (!node.children.has(char)) return false;
      
      setCurrentNode(node);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const childNode = node.children.get(char)!;
      const shouldDeleteChild = await deleteHelper(childNode, word, depth + 1);
      
      if (shouldDeleteChild) {
        node.children.delete(char);
        return node.children.size === 0 && !node.isEndOfWord;
      }
      
      return false;
    };
    
    await deleteHelper(trie, word, 0);
    setTrie({ ...trie });
    setCurrentNode(null);
  };

  const runOperation = async () => {
    setIsAnimating(true);
    setCurrentNode(null);
    setSearchPath([]);
    setFoundWords([]);

    switch (operation) {
      case 'insert':
        if (!insertedWords.includes(inputWord.toLowerCase())) {
          await insertWord(inputWord.toLowerCase());
          setInsertedWords([...insertedWords, inputWord.toLowerCase()]);
        }
        break;
      case 'search':
        await searchForWord(searchValue.toLowerCase());
        break;
      case 'prefix':
        await findWordsWithPrefix(prefix.toLowerCase());
        break;
      case 'delete':
        if (insertedWords.includes(inputWord.toLowerCase())) {
          await deleteWord(inputWord.toLowerCase());
          setInsertedWords(insertedWords.filter(w => w !== inputWord.toLowerCase()));
        }
        break;
    }

    setIsAnimating(false);
  };

  const renderTrieNode = (node: TrieNode, x: number, y: number, level: number, parentX?: number, parentY?: number, char?: string) => {
    const horizontalSpacing = 80;
    const verticalSpacing = 60;
    const childNodes = Array.from(node.children.entries());
    
    return (
      <g>
        {/* Connection to parent */}
        {parentX !== undefined && parentY !== undefined && char && (
          <line
            x1={parentX}
            y1={parentY}
            x2={x}
            y2={y}
            stroke="#9CA3AF"
            strokeWidth="2"
          />
        )}
        
        {/* Node */}
        <g>
          <circle
            cx={x}
            cy={y}
            r="20"
            fill={
              currentNode === node ? "#3B82F6" :
              node.isEndOfWord ? "#10B981" :
              "#6B7280"
            }
            stroke="#1F2937"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          
          {/* Character */}
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
          >
            {char || '∅'}
          </text>
          
          {/* End of word indicator */}
          {node.isEndOfWord && (
            <circle
              cx={x + 15}
              cy={y - 15}
              r="5"
              fill="#EF4444"
            />
          )}
        </g>
        
        {/* Render children */}
        {childNodes.map(([char, child], index) => {
          const childX = x + (index - childNodes.length / 2) * horizontalSpacing;
          const childY = y + verticalSpacing;
          return renderTrieNode(child, childX, childY, level + 1, x, y, char);
        })}
      </g>
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
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-share-line text-2xl text-indigo-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Tries</h1>
              <p className="text-gray-600">Tree-like data structure for efficient string operations and prefix searches</p>
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
                    onClick={initializeSampleTrie}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    Sample Trie
                  </button>
                  <button
                    onClick={runOperation}
                    disabled={isAnimating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isAnimating ? 'Running...' : 'Run Operation'}
                  </button>
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

              {/* Input Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Input Parameters</h3>
                <div className="flex items-center space-x-4">
                  {(operation === 'insert' || operation === 'delete') && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Word:</label>
                      <input
                        type="text"
                        value={inputWord}
                        onChange={(e) => setInputWord(e.target.value.toLowerCase())}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                        placeholder="Enter word"
                      />
                    </div>
                  )}
                  {operation === 'search' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Search:</label>
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                        placeholder="Enter word"
                      />
                    </div>
                  )}
                  {operation === 'prefix' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Prefix:</label>
                      <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value.toLowerCase())}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                        placeholder="Enter prefix"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Trie Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Trie Structure</h3>
                <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
                  {trie.children.size > 0 ? (
                    <svg width="600" height="300" className="mx-auto">
                      {renderTrieNode(trie, 300, 50, 0)}
                    </svg>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-500 mb-4">No trie created yet</div>
                      <button
                        onClick={initializeSampleTrie}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
                      >
                        Create Sample Trie
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Node Colors</h3>
                <div className="flex space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span>Current Operation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <span>End of Word</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-500 rounded-full mr-2"></div>
                    <span>Intermediate Node</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <span>Word Marker</span>
                  </div>
                </div>
              </div>

              {/* Search Results */}
              {foundWords.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Words with Prefix "{prefix}"</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-mono">
                      {foundWords.join(', ')}
                    </p>
                  </div>
                </div>
              )}

              {/* Inserted Words */}
              {insertedWords.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Inserted Words</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-mono">
                      {insertedWords.join(', ')}
                    </p>
                  </div>
                </div>
              )}

              {/* Operation Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {currentOperation.name}: {currentOperation.description}
                </h3>
                <div className="text-sm text-gray-600">
                  <p>Complexity: {currentOperation.complexity} (L = word length, P = prefix length, R = results)</p>
                  {operation === 'insert' && <p>Inserts word character by character, creating new nodes as needed</p>}
                  {operation === 'search' && <p>Traverses character by character, checks end-of-word marker</p>}
                  {operation === 'prefix' && <p>Finds all words starting with given prefix</p>}
                  {operation === 'delete' && <p>Removes word and cleans up unused nodes</p>}
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
                  {operation === 'insert' && selectedLanguage === 'javascript' && `// JavaScript Trie Insert - O(L)
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
    }
    
    current.isEndOfWord = true;
  }
}`}
                  {operation === 'search' && selectedLanguage === 'javascript' && `// JavaScript Trie Search - O(L)
search(word) {
  let current = this.root;
  
  for (const char of word) {
    if (!current.children.has(char)) {
      return false;
    }
    current = current.children.get(char);
  }
  
  return current.isEndOfWord;
}`}
                  {operation === 'prefix' && selectedLanguage === 'javascript' && `// JavaScript Prefix Search - O(P + R)
startsWith(prefix) {
  let current = this.root;
  
  for (const char of prefix) {
    if (!current.children.has(char)) {
      return [];
    }
    current = current.children.get(char);
  }
  
  const words = [];
  this.dfs(current, prefix, words);
  return words;
}

dfs(node, prefix, result) {
  if (node.isEndOfWord) {
    result.push(prefix);
  }
  
  for (const [char, child] of node.children) {
    this.dfs(child, prefix + char, result);
  }
}`}
                  {operation === 'delete' && selectedLanguage === 'javascript' && `// JavaScript Trie Delete - O(L)
delete(word) {
  return this.deleteHelper(this.root, word, 0);
}

deleteHelper(node, word, depth) {
  if (depth === word.length) {
    if (!node.isEndOfWord) return false;
    node.isEndOfWord = false;
    return node.children.size === 0;
  }
  
  const char = word[depth];
  if (!node.children.has(char)) return false;
  
  const childNode = node.children.get(char);
  const shouldDeleteChild = this.deleteHelper(childNode, word, depth + 1);
  
  if (shouldDeleteChild) {
    node.children.delete(char);
    return node.children.size === 0 && !node.isEndOfWord;
  }
  
  return false;
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Trie Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trie Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Each node represents a character</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Path from root represents word</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>End-of-word markers</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Efficient prefix searches</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>No collisions</span>
                </div>
              </div>
            </div>

            {/* Complexity Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complexity Analysis</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Time Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Insert:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(L)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(L)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delete:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(L)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prefix:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(P + R)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Storage:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(N·L)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worst Case:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(Σ)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trie Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trie Applications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Autocomplete</h4>
                  <p className="text-sm text-gray-700">Predictive text input</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Spell Check</h4>
                  <p className="text-sm text-gray-700">Word validation</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">IP Routing</h4>
                  <p className="text-sm text-gray-700">Longest prefix matching</p>
                </div>
              </div>
            </div>

            {/* Advantages */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advantages</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Fast Search</h4>
                  <p className="text-sm text-gray-700">O(L) time complexity</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Prefix Operations</h4>
                  <p className="text-sm text-gray-700">Efficient prefix searches</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">No Collisions</h4>
                  <p className="text-sm text-gray-700">Unlike hash tables</p>
                </div>
              </div>
            </div>

            {/* Disadvantages */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Disadvantages</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Space Usage</h4>
                  <p className="text-sm text-gray-700">High memory consumption</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Complex Implementation</h4>
                  <p className="text-sm text-gray-700">More complex than arrays</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Limited to Strings</h4>
                  <p className="text-sm text-gray-700">Mainly for string data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}