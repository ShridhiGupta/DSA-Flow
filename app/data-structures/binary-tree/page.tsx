'use client';

import Link from 'next/link';
import { useState } from 'react';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function BinaryTreePage() {
  const [operation, setOperation] = useState('insert');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [inputValue, setInputValue] = useState(50);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [searchValue, setSearchValue] = useState(30);
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
  const [insertedNodes, setInsertedNodes] = useState<number[]>([]);

  const operations = [
    {
      id: 'insert',
      name: 'Insert',
      description: 'Insert a node into the binary tree',
      complexity: 'O(log n) avg, O(n) worst'
    },
    {
      id: 'search',
      name: 'Search',
      description: 'Search for a value in the tree',
      complexity: 'O(log n) avg, O(n) worst'
    },
    {
      id: 'traversal',
      name: 'Traversal',
      description: 'Traverse the tree in different orders',
      complexity: 'O(n)'
    },
    {
      id: 'delete',
      name: 'Delete',
      description: 'Delete a node from the tree',
      complexity: 'O(log n) avg, O(n) worst'
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const insertNode = async (root: TreeNode | null, value: number): Promise<TreeNode> => {
    if (!root) {
      return { value, left: null, right: null };
    }

    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (value < root.value) {
      root.left = await insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = await insertNode(root.right, value);
    }

    setHighlightedNode(null);
    return root;
  };

  const searchNode = async (root: TreeNode | null, value: number): Promise<boolean> => {
    if (!root) {
      return false;
    }

    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (root.value === value) {
      return true;
    }

    if (value < root.value) {
      return await searchNode(root.left, value);
    } else {
      return await searchNode(root.right, value);
    }
  };

  const inorderTraversal = async (root: TreeNode | null): Promise<number[]> => {
    if (!root) return [];
    
    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const left = await inorderTraversal(root.left);
    const right = await inorderTraversal(root.right);
    
    return [...left, root.value, ...right];
  };

  const preorderTraversal = async (root: TreeNode | null): Promise<number[]> => {
    if (!root) return [];
    
    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const left = await preorderTraversal(root.left);
    const right = await preorderTraversal(root.right);
    
    return [root.value, ...left, ...right];
  };

  const postorderTraversal = async (root: TreeNode | null): Promise<number[]> => {
    if (!root) return [];
    
    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const left = await postorderTraversal(root.left);
    const right = await postorderTraversal(root.right);
    
    return [...left, ...right, root.value];
  };

  const runOperation = async () => {
    setIsAnimating(true);
    setHighlightedNode(null);
    setTraversalResult([]);

    switch (operation) {
      case 'insert':
        if (!insertedNodes.includes(inputValue)) {
          const newTree = await insertNode(tree, inputValue);
          setTree(newTree);
          setInsertedNodes([...insertedNodes, inputValue]);
        }
        break;
      case 'search':
        await searchNode(tree, searchValue);
        break;
      case 'traversal':
        const inorder = await inorderTraversal(tree);
        setTraversalResult(inorder);
        break;
      case 'delete':
        // Simplified delete - just rebuild tree without the value
        const newTree = await rebuildTreeWithoutValue(tree, inputValue);
        setTree(newTree);
        setInsertedNodes(insertedNodes.filter(n => n !== inputValue));
        break;
    }

    setHighlightedNode(null);
    setIsAnimating(false);
  };

  const rebuildTreeWithoutValue = async (root: TreeNode | null, value: number): Promise<TreeNode | null> => {
    if (!root) return null;
    
    if (root.value === value) {
      // Find replacement
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      
      // Find min in right subtree
      let minRight = root.right;
      while (minRight.left) {
        minRight = minRight.left;
      }
      
      root.value = minRight.value;
      root.right = await rebuildTreeWithoutValue(root.right, minRight.value);
    } else if (value < root.value) {
      root.left = await rebuildTreeWithoutValue(root.left, value);
    } else {
      root.right = await rebuildTreeWithoutValue(root.right, value);
    }
    
    return root;
  };

  const initializeSampleTree = () => {
    const sampleTree: TreeNode = {
      value: 50,
      left: {
        value: 30,
        left: { value: 20, left: null, right: null },
        right: { value: 40, left: null, right: null }
      },
      right: {
        value: 70,
        left: { value: 60, left: null, right: null },
        right: { value: 80, left: null, right: null }
      }
    };
    setTree(sampleTree);
    setInsertedNodes([50, 30, 20, 40, 70, 60, 80]);
  };

  const renderTreeNode = (node: TreeNode | null, x: number, y: number, level: number, parentX?: number, parentY?: number) => {
    if (!node) return null;

    const horizontalSpacing = 150 / Math.pow(1.5, level);
    const verticalSpacing = 80;

    return (
      <g key={node.value}>
        {/* Draw connection to parent */}
        {parentX !== undefined && parentY !== undefined && (
          <line
            x1={parentX}
            y1={parentY}
            x2={x}
            y2={y}
            stroke="#9CA3AF"
            strokeWidth="2"
          />
        )}
        
        {/* Draw node */}
        <circle
          cx={x}
          cy={y}
          r="25"
          fill={highlightedNode === node.value ? "#3B82F6" : "#10B981"}
          stroke="#1F2937"
          strokeWidth="2"
          className="transition-all duration-300"
        />
        
        {/* Node value */}
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          {node.value}
        </text>
        
        {/* Render children */}
        {node.left && renderTreeNode(
          node.left,
          x - horizontalSpacing,
          y + verticalSpacing,
          level + 1,
          x,
          y
        )}
        
        {node.right && renderTreeNode(
          node.right,
          x + horizontalSpacing,
          y + verticalSpacing,
          level + 1,
          x,
          y
        )}
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-node-tree text-2xl text-green-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Binary Tree</h1>
              <p className="text-gray-600">Hierarchical data structure with at most two children per node</p>
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
                    onClick={initializeSampleTree}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    Sample Tree
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
                      <label className="text-sm font-medium text-gray-700">Value:</label>
                      <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                      />
                    </div>
                  )}
                  {operation === 'search' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Search:</label>
                      <input
                        type="number"
                        value={searchValue}
                        onChange={(e) => setSearchValue(parseInt(e.target.value) || 0)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                      />
                    </div>
                  )}
                  {operation === 'traversal' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Type: Inorder</label>
                    </div>
                  )}
                </div>
              </div>

              {/* Tree Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Binary Tree Structure</h3>
                <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
                  {tree ? (
                    <svg width="600" height="400" className="mx-auto">
                      {renderTreeNode(tree, 300, 50, 0)}
                    </svg>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-500 mb-4">No tree created yet</div>
                      <button
                        onClick={initializeSampleTree}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
                      >
                        Create Sample Tree
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Traversal Result */}
              {traversalResult.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Traversal Result</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-mono">
                      [{traversalResult.join(', ')}]
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
                  <p>Complexity: {currentOperation.complexity}</p>
                  {operation === 'insert' && <p>Inserts a new node while maintaining BST properties</p>}
                  {operation === 'search' && <p>Searches for a value by traversing the tree</p>}
                  {operation === 'traversal' && <p>Visits all nodes in a specific order</p>}
                  {operation === 'delete' && <p>Removes a node while maintaining tree structure</p>}
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
                  {operation === 'insert' && selectedLanguage === 'javascript' && `// JavaScript BST Insert - O(log n) avg, O(n) worst
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insert(root, value) {
  if (!root) {
    return new TreeNode(value);
  }
  
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }
  
  return root;
}`}
                  {operation === 'search' && selectedLanguage === 'javascript' && `// JavaScript BST Search - O(log n) avg, O(n) worst
function search(root, value) {
  if (!root) {
    return false;
  }
  
  if (root.value === value) {
    return true;
  }
  
  if (value < root.value) {
    return search(root.left, value);
  } else {
    return search(root.right, value);
  }
}`}
                  {operation === 'traversal' && selectedLanguage === 'javascript' && `// JavaScript Tree Traversal - O(n)
function inorder(root) {
  if (!root) return [];
  return [...inorder(root.left), root.value, ...inorder(root.right)];
}

function preorder(root) {
  if (!root) return [];
  return [root.value, ...preorder(root.left), ...preorder(root.right)];
}

function postorder(root) {
  if (!root) return [];
  return [...postorder(root.left), ...postorder(root.right), root.value];
}`}
                  {operation === 'delete' && selectedLanguage === 'javascript' && `// JavaScript BST Delete - O(log n) avg, O(n) worst
function deleteNode(root, value) {
  if (!root) return null;
  
  if (value < root.value) {
    root.left = deleteNode(root.left, value);
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value);
  } else {
    // Node to delete found
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    
    // Find min in right subtree
    let minRight = root.right;
    while (minRight.left) {
      minRight = minRight.left;
    }
    
    root.value = minRight.value;
    root.right = deleteNode(root.right, minRight.value);
  }
  
  return root;
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Tree Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Binary Tree Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Each node has at most 2 children</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Left child {'<'} parent value (BST)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Right child {'>'} parent value (BST)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>No duplicate values allowed</span>
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
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delete:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Traversal:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Average Case:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worst Case:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree Types */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tree Types</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Binary Search Tree</h4>
                  <p className="text-sm text-gray-700">Ordered tree with search optimization</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">AVL Tree</h4>
                  <p className="text-sm text-gray-700">Self-balancing BST</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Red-Black Tree</h4>
                  <p className="text-sm text-gray-700">Balanced tree with color properties</p>
                </div>
              </div>
            </div>

            {/* Common Operations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Operations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Insert</h4>
                  <p className="text-sm text-gray-700">Add new node maintaining BST property</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Search</h4>
                  <p className="text-sm text-gray-700">Find if value exists in tree</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Delete</h4>
                  <p className="text-sm text-gray-700">Remove node while preserving structure</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Traversal</h4>
                  <p className="text-sm text-gray-700">Visit all nodes in specific order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}