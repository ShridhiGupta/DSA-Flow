'use client';

import Link from 'next/link';
import { useState } from 'react';

interface GraphNode {
  id: number;
  x: number;
  y: number;
  visited?: boolean;
  distance?: number;
  parent?: number;
}

interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
}

export default function GraphsPage() {
  const [operation, setOperation] = useState('bfs');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visitedOrder, setVisitedOrder] = useState<number[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [path, setPath] = useState<number[]>([]);
  const [isWeighted, setIsWeighted] = useState(false);

  const operations = [
    {
      id: 'bfs',
      name: 'BFS',
      description: 'Breadth-First Search traversal',
      complexity: 'O(V + E)'
    },
    {
      id: 'dfs',
      name: 'DFS',
      description: 'Depth-First Search traversal',
      complexity: 'O(V + E)'
    },
    {
      id: 'dijkstra',
      name: 'Dijkstra',
      description: 'Shortest path algorithm',
      complexity: 'O((V + E) log V)'
    },
    {
      id: 'mst',
      name: 'MST',
      description: 'Minimum Spanning Tree',
      complexity: 'O(E log V)'
    }
  ];

  const currentOperation = operations.find(op => op.id === operation) || operations[0];

  const initializeSampleGraph = () => {
    const sampleNodes: GraphNode[] = [
      { id: 0, x: 100, y: 100 },
      { id: 1, x: 250, y: 50 },
      { id: 2, x: 400, y: 100 },
      { id: 3, x: 250, y: 200 },
      { id: 4, x: 100, y: 300 },
      { id: 5, x: 400, y: 300 }
    ];

    const sampleEdges: GraphEdge[] = [
      { from: 0, to: 1, weight: 4 },
      { from: 0, to: 3, weight: 2 },
      { from: 1, to: 2, weight: 3 },
      { from: 1, to: 3, weight: 1 },
      { from: 2, to: 5, weight: 5 },
      { from: 3, to: 4, weight: 8 },
      { from: 3, to: 5, weight: 7 },
      { from: 4, to: 5, weight: 6 }
    ];

    setNodes(sampleNodes);
    setEdges(sampleEdges);
    setVisitedOrder([]);
    setPath([]);
  };

  const bfsTraversal = async () => {
    const visited = new Set<number>();
    const queue: number[] = [startNode];
    const order: number[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;

      visited.add(current);
      order.push(current);
      setCurrentNode(current);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Find neighbors
      edges.forEach(edge => {
        if (edge.from === current && !visited.has(edge.to)) {
          queue.push(edge.to);
        } else if (edge.to === current && !visited.has(edge.from)) {
          queue.push(edge.from);
        }
      });
    }

    setVisitedOrder(order);
    setCurrentNode(null);
  };

  const dfsTraversal = async () => {
    const visited = new Set<number>();
    const order: number[] = [];

    const dfs = async (nodeId: number) => {
      if (visited.has(nodeId)) return;

      visited.add(nodeId);
      order.push(nodeId);
      setCurrentNode(nodeId);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Find neighbors
      edges.forEach(edge => {
        if (edge.from === nodeId && !visited.has(edge.to)) {
          dfs(edge.to);
        } else if (edge.to === nodeId && !visited.has(edge.from)) {
          dfs(edge.from);
        }
      });
    };

    await dfs(startNode);
    setVisitedOrder(order);
    setCurrentNode(null);
  };

  const dijkstraAlgorithm = async () => {
    const distances = new Map<number, number>();
    const previous = new Map<number, number>();
    const unvisited = new Set<number>();

    // Initialize distances
    nodes.forEach(node => {
      distances.set(node.id, node.id === startNode ? 0 : Infinity);
      previous.set(node.id, -1);
      unvisited.add(node.id);
    });

    while (unvisited.size > 0) {
      // Find node with minimum distance
      let minNode = -1;
      let minDistance = Infinity;
      unvisited.forEach(nodeId => {
        const dist = distances.get(nodeId) || Infinity;
        if (dist < minDistance) {
          minDistance = dist;
          minNode = nodeId;
        }
      });

      if (minNode === -1) break;

      setCurrentNode(minNode);
      await new Promise(resolve => setTimeout(resolve, 800));

      unvisited.delete(minNode);

      // Update distances to neighbors
      edges.forEach(edge => {
        let neighbor = -1;
        if (edge.from === minNode) neighbor = edge.to;
        else if (edge.to === minNode) neighbor = edge.from;

        if (neighbor !== -1 && unvisited.has(neighbor)) {
          const weight = edge.weight || 1;
          const altDistance = (distances.get(minNode) || 0) + weight;
          if (altDistance < (distances.get(neighbor) || Infinity)) {
            distances.set(neighbor, altDistance);
            previous.set(neighbor, minNode);
          }
        }
      });
    }

    // Reconstruct path
    const pathNodes: number[] = [];
    let current = endNode;
    while (current !== -1) {
      pathNodes.unshift(current);
      current = previous.get(current) || -1;
    }

    setPath(pathNodes);
    setCurrentNode(null);
  };

  const runOperation = async () => {
    setIsAnimating(true);
    setVisitedOrder([]);
    setPath([]);
    setCurrentNode(null);

    // Reset node states
    setNodes(nodes.map(node => ({ ...node, visited: false, distance: undefined, parent: undefined })));

    switch (operation) {
      case 'bfs':
        await bfsTraversal();
        break;
      case 'dfs':
        await dfsTraversal();
        break;
      case 'dijkstra':
        await dijkstraAlgorithm();
        break;
      case 'mst':
        // Simplified MST visualization
        await bfsTraversal(); // Placeholder for MST algorithm
        break;
    }

    setIsAnimating(false);
  };

  const renderGraph = () => {
    return (
      <svg width="500" height="400" className="mx-auto">
        {/* Render edges */}
        {edges.map((edge, index) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const isInPath = path.length > 1 && 
            path.some((nodeId, i) => 
              i < path.length - 1 && 
              ((path[i] === edge.from && path[i + 1] === edge.to) ||
               (path[i] === edge.to && path[i + 1] === edge.from))
            );

          return (
            <g key={index}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isInPath ? "#10B981" : "#9CA3AF"}
                strokeWidth={isInPath ? "3" : "2"}
              />
              {isWeighted && edge.weight && (
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2}
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}

        {/* Render nodes */}
        {nodes.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={
                currentNode === node.id ? "#3B82F6" :
                visitedOrder.includes(node.id) ? "#10B981" :
                path.includes(node.id) ? "#10B981" :
                "#6B7280"
              }
              stroke="#1F2937"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
            >
              {node.id}
            </text>
            {node.id === startNode && (
              <text
                x={node.x}
                y={node.y - 30}
                textAnchor="middle"
                fill="#059669"
                fontSize="12"
                fontWeight="bold"
              >
                START
              </text>
            )}
            {node.id === endNode && operation === 'dijkstra' && (
              <text
                x={node.x}
                y={node.y - 30}
                textAnchor="middle"
                fill="#DC2626"
                fontSize="12"
                fontWeight="bold"
              >
                END
              </text>
            )}
          </g>
        ))}
      </svg>
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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-global-line text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Graphs</h1>
              <p className="text-gray-600">Non-linear data structure with vertices and edges for representing relationships</p>
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
                    onClick={initializeSampleGraph}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    Sample Graph
                  </button>
                  <button
                    onClick={runOperation}
                    disabled={isAnimating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isAnimating ? 'Running...' : 'Run Algorithm'}
                  </button>
                </div>
              </div>

              {/* Operation Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Algorithm</h3>
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
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Start Node:</label>
                    <select
                      value={startNode}
                      onChange={(e) => setStartNode(parseInt(e.target.value))}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={isAnimating}
                    >
                      {nodes.map(node => (
                        <option key={node.id} value={node.id}>Node {node.id}</option>
                      ))}
                    </select>
                  </div>
                  {operation === 'dijkstra' && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">End Node:</label>
                      <select
                        value={endNode}
                        onChange={(e) => setEndNode(parseInt(e.target.value))}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isAnimating}
                      >
                        {nodes.map(node => (
                          <option key={node.id} value={node.id}>Node {node.id}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="weighted"
                      checked={isWeighted}
                      onChange={(e) => setIsWeighted(e.target.checked)}
                      disabled={isAnimating}
                    />
                    <label htmlFor="weighted" className="text-sm font-medium text-gray-700">
                      Show Weights
                    </label>
                  </div>
                </div>
              </div>

              {/* Graph Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Graph Structure</h3>
                <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
                  {nodes.length > 0 ? (
                    renderGraph()
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-500 mb-4">No graph created yet</div>
                      <button
                        onClick={initializeSampleGraph}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
                      >
                        Create Sample Graph
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Algorithm Results */}
              {visitedOrder.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {operation === 'bfs' ? 'BFS Traversal Order' : 
                     operation === 'dfs' ? 'DFS Traversal Order' : 'Visited Nodes'}
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-mono">
                      {visitedOrder.join(' → ')}
                    </p>
                  </div>
                </div>
              )}

              {path.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Shortest Path</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-mono">
                      {path.join(' → ')}
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
                  {operation === 'bfs' && <p>Explores graph level by level using queue</p>}
                  {operation === 'dfs' && <p>Explores graph depth-first using recursion/stack</p>}
                  {operation === 'dijkstra' && <p>Finds shortest path using priority queue</p>}
                  {operation === 'mst' && <p>Finds minimum spanning tree using greedy approach</p>}
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
                  {operation === 'bfs' && selectedLanguage === 'javascript' && `// JavaScript BFS - O(V + E)
function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  const order = [];

  while (queue.length > 0) {
    const current = queue.shift();
    
    if (visited.has(current)) continue;
    
    visited.add(current);
    order.push(current);
    
    // Add neighbors to queue
    graph[current].forEach(neighbor => {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    });
  }
  
  return order;
}`}
                  {operation === 'dfs' && selectedLanguage === 'javascript' && `// JavaScript DFS - O(V + E)
function dfs(graph, startNode) {
  const visited = new Set();
  const order = [];

  function traverse(node) {
    if (visited.has(node)) return;
    
    visited.add(node);
    order.push(node);
    
    // Visit neighbors
    graph[node].forEach(neighbor => {
      traverse(neighbor);
    });
  }
  
  traverse(startNode);
  return order;
}`}
                  {operation === 'dijkstra' && selectedLanguage === 'javascript' && `// JavaScript Dijkstra - O((V + E) log V)
function dijkstra(graph, startNode, endNode) {
  const distances = new Map();
  const previous = new Map();
  const unvisited = new Set();
  
  // Initialize
  Object.keys(graph).forEach(node => {
    distances.set(node, node === startNode ? 0 : Infinity);
    previous.set(node, null);
    unvisited.add(node);
  });
  
  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let current = null;
    let minDistance = Infinity;
    
    unvisited.forEach(node => {
      if (distances.get(node) < minDistance) {
        minDistance = distances.get(node);
        current = node;
      }
    });
    
    if (current === null) break;
    unvisited.delete(current);
    
    // Update distances to neighbors
    graph[current].forEach(({node, weight}) => {
      if (unvisited.has(node)) {
        const altDistance = distances.get(current) + weight;
        if (altDistance < distances.get(node)) {
          distances.set(node, altDistance);
          previous.set(node, current);
        }
      }
    });
  }
  
  // Reconstruct path
  const path = [];
  let current = endNode;
  while (current !== null) {
    path.unshift(current);
    current = previous.get(current);
  }
  
  return path;
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Graph Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Graph Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Vertices (nodes) and edges</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Can be directed or undirected</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Can be weighted or unweighted</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Represents relationships</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Non-linear structure</span>
                </div>
              </div>
            </div>

            {/* Graph Types */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Graph Types</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Undirected</h4>
                  <p className="text-sm text-gray-700">Edges have no direction</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Directed</h4>
                  <p className="text-sm text-gray-700">Edges have direction</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Weighted</h4>
                  <p className="text-sm text-gray-700">Edges have weights/costs</p>
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
                      <span>BFS/DFS:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(V + E)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dijkstra:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O((V + E) log V)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MST:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(E log V)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Adjacency List:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(V + E)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adjacency Matrix:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(V²)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Graph Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Graph Applications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Social Networks</h4>
                  <p className="text-sm text-gray-700">Friend connections</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">GPS Navigation</h4>
                  <p className="text-sm text-gray-700">Shortest path routing</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Network Topology</h4>
                  <p className="text-sm text-gray-700">Computer networks</p>
                </div>
              </div>
            </div>

            {/* Common Algorithms */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Algorithms</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-1">BFS</h4>
                  <p className="text-sm text-gray-700">Level-order traversal</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">DFS</h4>
                  <p className="text-sm text-gray-700">Depth-first traversal</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Dijkstra</h4>
                  <p className="text-sm text-gray-700">Shortest path</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">MST</h4>
                  <p className="text-sm text-gray-700">Minimum spanning tree</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}