'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface GraphNode {
  id: number;
  x: number;
  y: number;
  visited?: boolean;
  distance?: number;
  parent?: number;
  level?: number;
}

interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
}

export default function BFSPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [startNode, setStartNode] = useState(0);
  const [targetNode, setTargetNode] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visitedOrder, setVisitedOrder] = useState<number[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [queue, setQueue] = useState<number[]>([]);
  const [path, setPath] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [graphType, setGraphType] = useState<'directed' | 'undirected'>('undirected');

  const steps = [
    'Initialize queue with start node',
    'Mark start node as visited',
    'Dequeue node and process neighbors',
    'Add unvisited neighbors to queue',
    'Mark neighbors as visited',
    'Continue until queue is empty'
  ];

  useEffect(() => {
    initializeSampleGraph();
  }, []);

  const initializeSampleGraph = () => {
    const sampleNodes: GraphNode[] = [
      { id: 0, x: 150, y: 100 },
      { id: 1, x: 300, y: 50 },
      { id: 2, x: 450, y: 100 },
      { id: 3, x: 300, y: 150 },
      { id: 4, x: 150, y: 250 },
      { id: 5, x: 450, y: 250 },
      { id: 6, x: 300, y: 300 }
    ];

    const sampleEdges: GraphEdge[] = [
      { from: 0, to: 1 },
      { from: 0, to: 3 },
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 5 },
      { from: 3, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 6 },
      { from: 5, to: 6 }
    ];

    setNodes(sampleNodes);
    setEdges(sampleEdges);
    setVisitedOrder([]);
    setPath([]);
    setQueue([]);
    setCurrentNode(null);
    setCurrentStep(0);
    setCurrentOperation('');
  };

  const bfsTraversal = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setVisitedOrder([]);
    setPath([]);
    setQueue([]);
    setCurrentNode(null);
    setCurrentOperation('');

    // Reset node states
    setNodes(nodes.map(node => ({ ...node, visited: false, distance: undefined, parent: undefined, level: undefined })));

    const visited = new Set<number>();
    const bfsQueue: number[] = [startNode];
    const order: number[] = [];
    const distances = new Map<number, number>();
    const parents = new Map<number, number>();

    distances.set(startNode, 0);
    parents.set(startNode, -1);

    setCurrentStep(1);
    setCurrentOperation(`Initializing BFS with start node ${startNode}`);
    setQueue([...bfsQueue]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setCurrentStep(2);
    visited.add(startNode);
    order.push(startNode);
    setVisitedOrder([...order]);
    setCurrentNode(startNode);
    setNodes(prevNodes => prevNodes.map(node => 
      node.id === startNode ? { ...node, visited: true, distance: 0, level: 0 } : node
    ));
    setCurrentOperation(`Marked node ${startNode} as visited (Level 0)`);
    await new Promise(resolve => setTimeout(resolve, 1200));

    while (bfsQueue.length > 0) {
      setCurrentStep(3);
      const current = bfsQueue.shift()!;
      setCurrentNode(current);
      setQueue([...bfsQueue]);
      const currentDistance = distances.get(current) || 0;
      setCurrentOperation(`Processing node ${current} (Level ${currentDistance})`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find neighbors
      const neighbors: number[] = [];
      edges.forEach(edge => {
        if (graphType === 'undirected') {
          if (edge.from === current && !visited.has(edge.to)) {
            neighbors.push(edge.to);
          } else if (edge.to === current && !visited.has(edge.from)) {
            neighbors.push(edge.from);
          }
        } else {
          if (edge.from === current && !visited.has(edge.to)) {
            neighbors.push(edge.to);
          }
        }
      });

      if (neighbors.length > 0) {
        setCurrentStep(4);
        setCurrentOperation(`Found ${neighbors.length} unvisited neighbor(s): [${neighbors.join(', ')}]`);
        await new Promise(resolve => setTimeout(resolve, 800));

        setCurrentStep(5);
        neighbors.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            order.push(neighbor);
            bfsQueue.push(neighbor);
            distances.set(neighbor, currentDistance + 1);
            parents.set(neighbor, current);
          }
        });

        setVisitedOrder([...order]);
        setQueue([...bfsQueue]);
        setNodes(prevNodes => prevNodes.map(node => {
          if (neighbors.includes(node.id)) {
            return { 
              ...node, 
              visited: true, 
              distance: currentDistance + 1,
              level: currentDistance + 1,
              parent: current
            };
          }
          return node;
        }));
        setCurrentOperation(`Added neighbors to queue. Queue: [${bfsQueue.join(', ')}]`);
        await new Promise(resolve => setTimeout(resolve, 1200));
      } else {
        setCurrentOperation(`No unvisited neighbors for node ${current}`);
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    }

    setCurrentStep(6);
    setCurrentNode(null);
    setQueue([]);
    setCurrentOperation(`BFS complete! Visited ${order.length} nodes in order: [${order.join(', ')}]`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find path if target is specified
    if (targetNode !== null && parents.has(targetNode)) {
      const pathNodes: number[] = [];
      let current = targetNode;
      while (current !== -1) {
        pathNodes.unshift(current);
        current = parents.get(current) || -1;
      }
      setPath(pathNodes);
      setCurrentOperation(`Path from ${startNode} to ${targetNode}: [${pathNodes.join(' → ')}]`);
    }

    setIsAnimating(false);
  };

  const bfsShortestPath = async () => {
    if (targetNode === null) {
      setCurrentOperation('Please select a target node');
      return;
    }

    setIsAnimating(true);
    setCurrentStep(0);
    setVisitedOrder([]);
    setPath([]);
    setQueue([]);
    setCurrentNode(null);
    setCurrentOperation('');

    setNodes(nodes.map(node => ({ ...node, visited: false, distance: undefined, parent: undefined, level: undefined })));

    const visited = new Set<number>();
    const bfsQueue: number[] = [startNode];
    const distances = new Map<number, number>();
    const parents = new Map<number, number>();

    distances.set(startNode, 0);
    parents.set(startNode, -1);

    setCurrentOperation(`Finding shortest path from ${startNode} to ${targetNode}`);
    setQueue([...bfsQueue]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    visited.add(startNode);
    setVisitedOrder([startNode]);
    setCurrentNode(startNode);
    setNodes(prevNodes => prevNodes.map(node => 
      node.id === startNode ? { ...node, visited: true, distance: 0 } : node
    ));

    while (bfsQueue.length > 0) {
      const current = bfsQueue.shift()!;
      setCurrentNode(current);
      setQueue([...bfsQueue]);

      if (current === targetNode) {
        const pathNodes: number[] = [];
        let node = targetNode;
        while (node !== -1) {
          pathNodes.unshift(node);
          node = parents.get(node) || -1;
        }
        setPath(pathNodes);
        setCurrentOperation(`Shortest path found! Distance: ${distances.get(targetNode)}. Path: [${pathNodes.join(' → ')}]`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsAnimating(false);
        return;
      }

      const currentDistance = distances.get(current) || 0;
      const neighbors: number[] = [];
      edges.forEach(edge => {
        if (graphType === 'undirected') {
          if (edge.from === current && !visited.has(edge.to)) {
            neighbors.push(edge.to);
          } else if (edge.to === current && !visited.has(edge.from)) {
            neighbors.push(edge.from);
          }
        } else {
          if (edge.from === current && !visited.has(edge.to)) {
            neighbors.push(edge.to);
          }
        }
      });

      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          bfsQueue.push(neighbor);
          distances.set(neighbor, currentDistance + 1);
          parents.set(neighbor, current);
        }
      });

      setVisitedOrder([...Array.from(visited)]);
      setQueue([...bfsQueue]);
      setNodes(prevNodes => prevNodes.map(node => {
        if (neighbors.includes(node.id)) {
          return { 
            ...node, 
            visited: true, 
            distance: currentDistance + 1,
            parent: current
          };
        }
        return node;
      }));

      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setCurrentOperation(`No path found from ${startNode} to ${targetNode}`);
    setIsAnimating(false);
  };

  const renderGraph = () => {
    return (
      <div className="bg-gray-50 rounded-lg p-6 overflow-auto">
        <svg width="600" height="400" className="mx-auto">
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
                  strokeWidth={isInPath ? "4" : "2"}
                  markerEnd={graphType === 'directed' ? "url(#arrowhead)" : undefined}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {/* Arrow marker for directed graphs */}
          {graphType === 'directed' && (
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#9CA3AF" />
              </marker>
            </defs>
          )}

          {/* Render nodes */}
          {nodes.map(node => {
            const isVisited = visitedOrder.includes(node.id);
            const isCurrent = currentNode === node.id;
            const isInPath = path.includes(node.id);
            const isStart = node.id === startNode;
            const isTarget = node.id === targetNode;

            let fillColor = "#6B7280"; // Default gray
            if (isCurrent) fillColor = "#3B82F6"; // Blue for current
            else if (isInPath) fillColor = "#10B981"; // Green for path
            else if (isVisited) fillColor = "#059669"; // Darker green for visited
            else fillColor = "#9CA3AF"; // Light gray for unvisited

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill={fillColor}
                  stroke="#1F2937"
                  strokeWidth="3"
                  className="transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (!isAnimating) {
                      if (isStart) {
                        setStartNode(node.id);
                      } else if (targetNode === null || targetNode !== node.id) {
                        setTargetNode(node.id);
                      } else {
                        setTargetNode(null);
                      }
                    }
                  }}
                />
                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                >
                  {node.id}
                </text>
                {isStart && (
                  <text
                    x={node.x}
                    y={node.y - 40}
                    textAnchor="middle"
                    fill="#059669"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    START
                  </text>
                )}
                {isTarget && (
                  <text
                    x={node.x}
                    y={node.y - 40}
                    textAnchor="middle"
                    fill="#DC2626"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    TARGET
                  </text>
                )}
                {node.distance !== undefined && (
                  <text
                    x={node.x + 30}
                    y={node.y - 10}
                    fill="#374151"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    d:{node.distance}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
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
              <Link href="/algorithms" className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                ← Back to Algorithms
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
              <i className="ri-node-tree text-2xl text-blue-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Breadth-First Search (BFS)</h1>
              <p className="text-gray-600">Graph traversal algorithm that explores all nodes at the present depth level before moving to nodes at the next depth level</p>
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
                    disabled={isAnimating}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    Reset Graph
                  </button>
                  <button
                    onClick={bfsTraversal}
                    disabled={isAnimating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isAnimating ? 'Running...' : 'Run BFS'}
                  </button>
                  {targetNode !== null && (
                    <button
                      onClick={bfsShortestPath}
                      disabled={isAnimating}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                    >
                      Find Path
                    </button>
                  )}
                </div>
              </div>

              {/* Graph Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Graph Settings</h3>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Start Node:</label>
                    <select
                      value={startNode}
                      onChange={(e) => setStartNode(parseInt(e.target.value))}
                      disabled={isAnimating}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {nodes.map(node => (
                        <option key={node.id} value={node.id}>{node.id}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Target Node:</label>
                    <select
                      value={targetNode === null ? '' : targetNode}
                      onChange={(e) => setTargetNode(e.target.value === '' ? null : parseInt(e.target.value))}
                      disabled={isAnimating}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">None</option>
                      {nodes.map(node => (
                        <option key={node.id} value={node.id}>{node.id}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Graph Type:</label>
                    <select
                      value={graphType}
                      onChange={(e) => setGraphType(e.target.value as 'directed' | 'undirected')}
                      disabled={isAnimating}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="undirected">Undirected</option>
                      <option value="directed">Directed</option>
                    </select>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Click on nodes to set as start (green) or target (red)</p>
              </div>

              {/* Graph Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Graph</h3>
                {renderGraph()}
              </div>

              {/* Queue Visualization */}
              {queue.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Queue</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Front →</span>
                      {queue.map((nodeId, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-lg"
                        >
                          {nodeId}
                        </div>
                      ))}
                      <span className="text-sm font-medium text-gray-700">← Back</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Visited Order */}
              {visitedOrder.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Visited Order</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {visitedOrder.map((nodeId, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded font-mono text-sm font-bold">
                            {nodeId}
                          </span>
                          {index < visitedOrder.length - 1 && (
                            <span className="text-gray-400">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Path Display */}
              {path.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Shortest Path</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {path.map((nodeId, index) => (
                        <div key={index} className="flex items-center">
                          <span className="px-4 py-2 bg-green-600 text-white rounded-lg font-mono text-lg font-bold">
                            {nodeId}
                          </span>
                          {index < path.length - 1 && (
                            <span className="mx-2 text-green-600 text-xl font-bold">→</span>
                          )}
                        </div>
                      ))}
                      <span className="ml-4 text-sm text-gray-600">
                        (Distance: {path.length - 1})
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Operation Display */}
              {currentOperation && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Operation</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-mono">{currentOperation}</p>
                  </div>
                </div>
              )}

              {/* Step-by-Step Display */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">BFS Algorithm Steps</h3>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 rounded-lg ${
                        currentStep === index + 1 && isAnimating
                          ? 'bg-indigo-100 text-indigo-800'
                          : currentStep > index + 1 && isAnimating
                          ? 'bg-green-100 text-green-800'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          currentStep === index + 1 && isAnimating
                            ? 'bg-indigo-600 text-white'
                            : currentStep > index + 1 && isAnimating
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
                  {selectedLanguage === 'javascript' && `// JavaScript BFS - O(V + E)
function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        // Visit all neighbors
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

// BFS with shortest path
function bfsShortestPath(graph, start, target) {
    const visited = new Set();
    const queue = [[start, [start]]]; // [node, path]
    
    visited.add(start);
    
    while (queue.length > 0) {
        const [node, path] = queue.shift();
        
        if (node === target) {
            return path;
        }
        
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, [...path, neighbor]]);
            }
        }
    }
    
    return null; // No path found
}`}
                  {selectedLanguage === 'python' && `# Python BFS - O(V + E)
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    result = []
    
    visited.add(start)
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        # Visit all neighbors
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

# BFS with shortest path
def bfs_shortest_path(graph, start, target):
    visited = set()
    queue = deque([(start, [start])])  # (node, path)
    
    visited.add(start)
    
    while queue:
        node, path = queue.popleft()
        
        if node == target:
            return path
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None  # No path found`}
                  {selectedLanguage === 'java' && `// Java BFS - O(V + E)
import java.util.*;

public class BFS {
    public static List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        List<Integer> result = new ArrayList<>();
        
        queue.offer(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            result.add(node);
            
            // Visit all neighbors
            for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        
        return result;
    }
    
    // BFS with shortest path
    public static List<Integer> bfsShortestPath(
            Map<Integer, List<Integer>> graph, 
            int start, 
            int target) {
        Set<Integer> visited = new HashSet<>();
        Queue<int[]> queue = new LinkedList<>();
        
        queue.offer(new int[]{start, start});
        visited.add(start);
        
        Map<Integer, Integer> parent = new HashMap<>();
        parent.put(start, -1);
        
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int node = current[0];
            
            if (node == target) {
                // Reconstruct path
                List<Integer> path = new ArrayList<>();
                int curr = target;
                while (curr != -1) {
                    path.add(0, curr);
                    curr = parent.get(curr);
                }
                return path;
            }
            
            for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    parent.put(neighbor, node);
                    queue.offer(new int[]{neighbor, node});
                }
            }
        }
        
        return null; // No path found
    }
}`}
                  {selectedLanguage === 'cpp' && `// C++ BFS - O(V + E)
#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>
using namespace std;

vector<int> bfs(unordered_map<int, vector<int>>& graph, int start) {
    unordered_set<int> visited;
    queue<int> q;
    vector<int> result;
    
    q.push(start);
    visited.insert(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);
        
        // Visit all neighbors
        for (int neighbor : graph[node]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
    
    return result;
}

// BFS with shortest path
vector<int> bfsShortestPath(
    unordered_map<int, vector<int>>& graph, 
    int start, 
    int target) {
    unordered_set<int> visited;
    queue<int> q;
    unordered_map<int, int> parent;
    
    q.push(start);
    visited.insert(start);
    parent[start] = -1;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        if (node == target) {
            // Reconstruct path
            vector<int> path;
            int curr = target;
            while (curr != -1) {
                path.insert(path.begin(), curr);
                curr = parent[curr];
            }
            return path;
        }
        
        for (int neighbor : graph[node]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                parent[neighbor] = node;
                q.push(neighbor);
            }
        }
    }
    
    return {}; // No path found
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
                      <span>BFS Traversal:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(V + E)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shortest Path:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(V + E)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Queue Storage:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(V)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visited Set:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(V)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BFS Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">BFS Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Level-order traversal</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Uses queue data structure</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Finds shortest path in unweighted graphs</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Visits all nodes at level k before level k+1</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Guaranteed to find shortest path</span>
                </div>
              </div>
            </div>

            {/* When to Use BFS */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use BFS</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Shortest Path</h4>
                  <p className="text-sm text-gray-700">Finding shortest path in unweighted graphs</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Level Order</h4>
                  <p className="text-sm text-gray-700">Tree/Graph level-order traversal</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Connected Components</h4>
                  <p className="text-sm text-gray-700">Finding all nodes in a connected component</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Social Networks</h4>
                  <p className="text-sm text-gray-700">Finding degrees of separation</p>
                </div>
              </div>
            </div>

            {/* BFS vs DFS */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">BFS vs DFS</h3>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Data Structure</div>
                  <div className="text-gray-600">BFS: Queue | DFS: Stack</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Path Finding</div>
                  <div className="text-gray-600">BFS: Shortest path | DFS: Any path</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Memory</div>
                  <div className="text-gray-600">BFS: O(V) | DFS: O(h) where h is height</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Use Case</div>
                  <div className="text-gray-600">BFS: Level-order, shortest path | DFS: Backtracking, deep search</div>
                </div>
              </div>
            </div>

            {/* Common Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Applications</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">Shortest path in unweighted graphs</div>
                <div className="p-2 bg-gray-50 rounded">Social network analysis</div>
                <div className="p-2 bg-gray-50 rounded">Web crawlers</div>
                <div className="p-2 bg-gray-50 rounded">GPS navigation systems</div>
                <div className="p-2 bg-gray-50 rounded">Puzzle solving (e.g., Rubik's cube)</div>
                <div className="p-2 bg-gray-50 rounded">Broadcasting in networks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
