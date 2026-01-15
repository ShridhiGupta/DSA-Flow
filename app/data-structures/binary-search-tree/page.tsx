'use client';

import Link from 'next/link';
import { useState } from 'react';

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  height?: number;
}

export default function BinarySearchTreePage() {
  const [operation, setOperation] = useState('insert');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [inputValue, setInputValue] = useState(50);
  const [tree, setTree] = useState<BSTNode | null>(null);
  const [searchValue, setSearchValue] = useState(30);
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
  const [insertedNodes, setInsertedNodes] = useState<number[]>([]);
  const [rotationInfo, setRotationInfo] = useState<string>('');
  const [balanceFactors, setBalanceFactors] = useState<Map<number, number>>(new Map());

  const operations = [
    {
      id: 'insert',
      name: 'Insert',
      description: 'Insert a node maintaining BST properties',
      complexity: 'O(log n) avg, O(n) worst'
    },
    {
      id: 'search',
      name: 'Search',
      description: 'Search for a value efficiently',
      complexity: 'O(log n) avg, O(n) worst'
    },
    {
      id: 'traversal',
      name: 'Traversal',
      description: 'Traverse in different orders',
      complexity: 'O(n)'
    },
    {
      id: 'delete',
      name: 'Delete',
      description: 'Delete while maintaining structure',
      complexity: 'O(log n) avg, O(n) worst'
    },
    {
      id: 'balance',
      name: 'Balance Check',
      description: 'Check tree balance and rotations',
      complexity: 'O(n)'
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const calculateHeight = (node: BSTNode | null): number => {
    if (!node) return 0;
    return 1 + Math.max(calculateHeight(node.left), calculateHeight(node.right));
  };

  const calculateBalanceFactor = (node: BSTNode | null): number => {
    if (!node) return 0;
    return calculateHeight(node.left) - calculateHeight(node.right);
  };

  const updateBalanceFactors = (root: BSTNode | null) => {
    const factors = new Map<number, number>();
    
    const traverse = (node: BSTNode | null) => {
      if (!node) return;
      factors.set(node.value, calculateBalanceFactor(node));
      traverse(node.left);
      traverse(node.right);
    };
    
    traverse(root);
    setBalanceFactors(factors);
  };

  const insertNode = async (root: BSTNode | null, value: number): Promise<BSTNode> => {
    if (!root) {
      return { value, left: null, right: null, height: 1 };
    }

    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (value < root.value) {
      root.left = await insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = await insertNode(root.right, value);
    }

    root.height = 1 + Math.max(
      root.left?.height || 0,
      root.right?.height || 0
    );

    setHighlightedNode(null);
    return root;
  };

  const searchNode = async (root: BSTNode | null, value: number): Promise<boolean> => {
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

  const inorderTraversal = async (root: BSTNode | null): Promise<number[]> => {
    if (!root) return [];
    
    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const left = await inorderTraversal(root.left);
    const right = await inorderTraversal(root.right);
    
    return [...left, root.value, ...right];
  };

  const preorderTraversal = async (root: BSTNode | null): Promise<number[]> => {
    if (!root) return [];
    
    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const left = await preorderTraversal(root.left);
    const right = await preorderTraversal(root.right);
    
    return [root.value, ...left, ...right];
  };

  const postorderTraversal = async (root: BSTNode | null): Promise<number[]> => {
    if (!root) return [];
    
    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const left = await postorderTraversal(root.left);
    const right = await postorderTraversal(root.right);
    
    return [...left, ...right, root.value];
  };

  const findMin = (node: BSTNode): BSTNode => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  const deleteNode = async (root: BSTNode | null, value: number): Promise<BSTNode | null> => {
    if (!root) return null;
    
    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (value < root.value) {
      root.left = await deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = await deleteNode(root.right, value);
    } else {
      // Node to delete found
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      
      // Find min in right subtree
      const minRight = findMin(root.right);
      root.value = minRight.value;
      root.right = await deleteNode(root.right, minRight.value);
    }

    if (root) {
      root.height = 1 + Math.max(
        root.left?.height || 0,
        root.right?.height || 0
      );
    }

    setHighlightedNode(null);
    return root;
  };

  const checkBalance = async (root: BSTNode | null) => {
    if (!root) return;
    
    setHighlightedNode(root.value);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const balance = calculateBalanceFactor(root);
    
    if (Math.abs(balance) > 1) {
      setRotationInfo(`Node ${root.value} is unbalanced (BF: ${balance})`);
    } else {
      setRotationInfo(`Node ${root.value} is balanced (BF: ${balance})`);
    }
    
    await checkBalance(root.left);
    await checkBalance(root.right);
    setHighlightedNode(null);
  };

  const runOperation = async () => {
    setIsAnimating(true);
    setHighlightedNode(null);
    setTraversalResult([]);
    setRotationInfo('');

    switch (operation) {
      case 'insert':
        if (!insertedNodes.includes(inputValue)) {
          const newTree = await insertNode(tree, inputValue);
          setTree(newTree);
          setInsertedNodes([...insertedNodes, inputValue]);
          updateBalanceFactors(newTree);
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
        const newTree = await deleteNode(tree, inputValue);
        setTree(newTree);
        setInsertedNodes(insertedNodes.filter(n => n !== inputValue));
        updateBalanceFactors(newTree);
        break;
      case 'balance':
        await checkBalance(tree);
        updateBalanceFactors(tree);
        break;
    }

    setHighlightedNode(null);
    setIsAnimating(false);
  };

  const initializeSampleTree = () => {
    const sampleTree: BSTNode = {
      value: 50,
      left: {
        value: 30,
        left: { value: 20, left: null, right: null, height: 1 },
        right: { value: 40, left: null, right: null, height: 1 },
        height: 2
      },
      right: {
        value: 70,
        left: { value: 60, left: null, right: null, height: 1 },
        right: { value: 80, left: null, right: null, height: 1 },
        height: 2
      },
      height: 3
    };
    setTree(sampleTree);
    setInsertedNodes([50, 30, 20, 40, 70, 60, 80]);
    updateBalanceFactors(sampleTree);
  };

  const renderBSTNode = (node: BSTNode | null, x: number, y: number, level: number, parentX?: number, parentY?: number) => {
    if (!node) return null;

    const horizontalSpacing = 150 / Math.pow(1.5, level);
    const verticalSpacing = 80;
    const balanceFactor = balanceFactors.get(node.value) || 0;

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
          fill={highlightedNode === node.value ? "#3B82F6" : 
                Math.abs(balanceFactor) > 1 ? "#EF4444" : "#10B981"}
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
        
        {/* Balance factor indicator */}
        {balanceFactors.size > 0 && (
          <text
            x={x + 30}
            y={y - 20}
            textAnchor="middle"
            fill={Math.abs(balanceFactor) > 1 ? "#EF4444" : "#6B7280"}
            fontSize="12"
            fontWeight="bold"
          >
            BF: {balanceFactor}
          </text>
        )}
        
        {/* Height indicator */}
        {node.height && (
          <text
            x={x - 30}
            y={y - 20}
            textAnchor="middle"
            fill="#6B7280"
            fontSize="12"
          >
            H: {node.height}
          </text>
        )}
        
        {/* Render children */}
        {node.left && renderBSTNode(
          node.left,
          x - horizontalSpacing,
          y + verticalSpacing,
          level + 1,
          x,
          y
        )}
        
        {node.right && renderBSTNode(
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
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-git-branch-line text-2xl text-emerald-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Binary Search Tree</h1>
              <p className="text-gray-600">Ordered binary tree with efficient search, insert, and delete operations</p>
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                  {operation === 'balance' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Check Balance</label>
                    </div>
                  )}
                </div>
              </div>

              {/* BST Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">BST Structure</h3>
                <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
                  {tree ? (
                    <svg width="700" height="400" className="mx-auto">
                      {renderBSTNode(tree, 350, 50, 0)}
                    </svg>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-500 mb-4">No tree created yet</div>
                      <button
                        onClick={initializeSampleTree}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 cursor-pointer"
                      >
                        Create Sample Tree
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Balance Info */}
              {rotationInfo && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Balance Analysis</h3>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800 font-mono">{rotationInfo}</p>
                  </div>
                </div>
              )}

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
                  {operation === 'insert' && <p>Inserts while maintaining BST: left {'<'} parent {'<'} right</p>}
                  {operation === 'search' && <p>Efficient O(log n) search in balanced trees</p>}
                  {operation === 'traversal' && <p>Inorder: Left-Root-Right (sorted output)</p>}
                  {operation === 'delete' && <p>Three cases: leaf, one child, two children</p>}
                  {operation === 'balance' && <p>Balance Factor = Height(left) - Height(right)</p>}
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
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

function insert(root, value) {
  if (!root) {
    return new BSTNode(value);
  }
  
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }
  
  // Update height
  root.height = 1 + Math.max(
    root.left ? root.left.height : 0,
    root.right ? root.right.height : 0
  );
  
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
                  {operation === 'balance' && selectedLanguage === 'javascript' && `// JavaScript Balance Factor - O(n)
function getHeight(node) {
  return node ? node.height : 0;
}

function getBalanceFactor(node) {
  if (!node) return 0;
  return getHeight(node.left) - getHeight(node.right);
}

function isBalanced(node) {
  if (!node) return true;
  
  const balance = Math.abs(getBalanceFactor(node));
  if (balance > 1) return false;
  
  return isBalanced(node.left) && isBalanced(node.right);
}`}
                  {operation === 'delete' && selectedLanguage === 'javascript' && `// JavaScript BST Delete - O(log n) avg, O(n) worst
function findMin(node) {
  while (node.left) {
    node = node.left;
  }
  return node;
}

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
    const minRight = findMin(root.right);
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
            {/* BST Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">BST Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Left child {'<'} parent value</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Right child {'>'} parent value</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>No duplicate values</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Inorder traversal = sorted</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>O(log n) search when balanced</span>
                </div>
              </div>
            </div>

            {/* Balance Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Balance Analysis</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Balance Factor</h4>
                  <div className="text-sm text-gray-600">
                    <p>BF = Height(left) - Height(right)</p>
                    <p>• BF {'>'} 1: Left heavy</p>
                    <p>• BF {'<'} -1: Right heavy</p>
                    <p>• |BF| {'<='} 1: Balanced</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Node Colors</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <span>Balanced</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                      <span>Unbalanced</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                      <span>Current operation</span>
                    </div>
                  </div>
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
                      <span>Worst Case:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Average:</span>
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

            {/* BST Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">BST Applications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Database Indexing</h4>
                  <p className="text-sm text-gray-700">Fast data retrieval</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">File Systems</h4>
                  <p className="text-sm text-gray-700">Directory structure</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Autocomplete</h4>
                  <p className="text-sm text-gray-700">Prefix-based search</p>
                </div>
              </div>
            </div>

            {/* Common Operations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Operations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Insert</h4>
                  <p className="text-sm text-gray-700">Add while maintaining order</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Search</h4>
                  <p className="text-sm text-gray-700">O(log n) average case</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Delete</h4>
                  <p className="text-sm text-gray-700">Handle three cases</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Balance Check</h4>
                  <p className="text-sm text-gray-700">Monitor tree health</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}