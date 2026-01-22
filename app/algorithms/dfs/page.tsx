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
  discoveryTime?: number;
  finishTime?: number;
}

interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
}

export default function DFSPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [startNode, setStartNode] = useState(0);
  const [targetNode, setTargetNode] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visitedOrder, setVisitedOrder] = useState<number[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [stack, setStack] = useState<number[]>([]);
  const [path, setPath] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [graphType, setGraphType] = useState<'directed' | 'undirected'>('undirected');
  const [dfsType, setDfsType] = useState<'recursive' | 'iterative'>('recursive');
  const [timeCounter, setTimeCounter] = useState(0);

  const steps = [
    'Mark current node as visited',
    'Process current node',
    'Explore unvisited neighbors',
    'Recursively visit first unvisited neighbor',
    'Backtrack when no unvisited neighbors',
    'Continue until all nodes visited'
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
    setStack([]);
    setCurrentNode(null);
    setCurrentStep(0);
    setCurrentOperation('');
    setTimeCounter(0);
  };

  const dfsTraversalRecursive = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setVisitedOrder([]);
    setPath([]);
    setStack([]);
    setCurrentNode(null);
    setCurrentOperation('');
    setTimeCounter(0);

    // Reset node states
    setNodes(nodes.map(node => ({ 
      ...node, 
      visited: false, 
      distance: undefined, 
      parent: undefined,
      discoveryTime: undefined,
      finishTime: undefined
    })));

    const visited = new Set<number>();
    const order: number[] = [];
    const parents = new Map<number, number>();
    let time = 0;

    const dfs = async (nodeId: number, parentId: number = -1) => {
      if (visited.has(nodeId)) return;

      setCurrentStep(1);
      visited.add(nodeId);
      order.push(nodeId);
      time++;
      setTimeCounter(time);
      
      setCurrentNode(nodeId);
      setVisitedOrder([...order]);
      parents.set(nodeId, parentId);
      
      setNodes(prevNodes => prevNodes.map(node => 
        node.id === nodeId 
          ? { ...node, visited: true, parent: parentId, discoveryTime: time }
          : node
      ));
      
      setCurrentOperation(`Visiting node ${nodeId} (Discovery time: ${time})`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find neighbors
      const neighbors: number[] = [];
      edges.forEach(edge => {
        if (graphType === 'undirected') {
          if (edge.from === nodeId && !visited.has(edge.to)) {
            neighbors.push(edge.to);
          } else if (edge.to === nodeId && !visited.has(edge.from)) {
            neighbors.push(edge.from);
          }
        } else {
          if (edge.from === nodeId && !visited.has(edge.to)) {
            neighbors.push(edge.to);
          }
        }
      });

      if (neighbors.length > 0) {
        setCurrentStep(3);
        setCurrentOperation(`Found ${neighbors.length} unvisited neighbor(s): [${neighbors.join(', ')}]`);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Visit first unvisited neighbor (DFS goes deep)
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            setCurrentStep(4);
            setCurrentOperation(`Recursively visiting neighbor ${neighbor} from node ${nodeId}`);
            await new Promise(resolve => setTimeout(resolve, 800));
            await dfs(neighbor, nodeId);
          }
        }
      } else {
        setCurrentStep(5);
        time++;
        setTimeCounter(time);
        setNodes(prevNodes => prevNodes.map(node => 
          node.id === nodeId 
            ? { ...node, finishTime: time }
            : node
        ));
        setCurrentOperation(`No unvisited neighbors for node ${nodeId}. Backtracking (Finish time: ${time})`);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    };

    setCurrentStep(0);
    setCurrentOperation(`Starting DFS from node ${startNode}`);
    await new Promise(resolve => setTimeout(resolve, 800));

    await dfs(startNode);
    
    setCurrentStep(6);
    setCurrentNode(null);
    setCurrentOperation(`DFS complete! Visited ${order.length} nodes in order: [${order.join(', ')}]`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsAnimating(false);
  };

  const dfsTraversalIterative = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setVisitedOrder([]);
    setPath([]);
    setStack([]);
    setCurrentNode(null);
    setCurrentOperation('');
    setTimeCounter(0);

    // Reset node states
    setNodes(nodes.map(node => ({ 
      ...node, 
      visited: false, 
      distance: undefined, 
      parent: undefined,
      discoveryTime: undefined,
      finishTime: undefined
    })));

    const visited = new Set<number>();
    const dfsStack: number[] = [startNode];
    const order: number[] = [];
    const parents = new Map<number, number>();
    let time = 0;

    setCurrentStep(0);
    setCurrentOperation(`Starting iterative DFS from node ${startNode}`);
    setStack([...dfsStack]);
    await new Promise(resolve => setTimeout(resolve, 800));

    while (dfsStack.length > 0) {
      setCurrentStep(1);
      const current = dfsStack.pop()!;
      
      if (visited.has(current)) {
        setStack([...dfsStack]);
        continue;
      }

      visited.add(current);
      order.push(current);
      time++;
      setTimeCounter(time);
      
      setCurrentNode(current);
      setVisitedOrder([...order]);
      setStack([...dfsStack]);
      
      setNodes(prevNodes => prevNodes.map(node => 
        node.id === current 
          ? { ...node, visited: true, discoveryTime: time }
          : node
      ));
      
      setCurrentOperation(`Popped node ${current} from stack (Discovery time: ${time})`);
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
        setCurrentStep(3);
        setCurrentOperation(`Pushing ${neighbors.length} unvisited neighbor(s) to stack: [${neighbors.reverse().join(', ')}]`);
        
        // Push neighbors in reverse order to maintain left-to-right traversal
        neighbors.reverse().forEach(neighbor => {
          if (!visited.has(neighbor)) {
            dfsStack.push(neighbor);
            parents.set(neighbor, current);
          }
        });
        
        setStack([...dfsStack]);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        setCurrentStep(5);
        time++;
        setTimeCounter(time);
        setNodes(prevNodes => prevNodes.map(node => 
          node.id === current 
            ? { ...node, finishTime: time }
            : node
        ));
        setCurrentOperation(`No unvisited neighbors for node ${current}. Stack: [${dfsStack.join(', ')}]`);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    setCurrentStep(6);
    setCurrentNode(null);
    setStack([]);
    setCurrentOperation(`DFS complete! Visited ${order.length} nodes in order: [${order.join(', ')}]`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsAnimating(false);
  };

  const dfsPathFinding = async () => {
    if (targetNode === null) {
      setCurrentOperation('Please select a target node');
      return;
    }

    setIsAnimating(true);
    setCurrentStep(0);
    setVisitedOrder([]);
    setPath([]);
    setStack([]);
    setCurrentNode(null);
    setCurrentOperation('');

    setNodes(nodes.map(node => ({ 
      ...node, 
      visited: false, 
      distance: undefined, 
      parent: undefined 
    })));

    const visited = new Set<number>();
    const dfsStack: number[] = [startNode];
    const parents = new Map<number, number>();

    setCurrentOperation(`Finding path from ${startNode} to ${targetNode} using DFS`);
    setStack([...dfsStack]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    visited.add(startNode);
    setVisitedOrder([startNode]);
    setCurrentNode(startNode);
    parents.set(startNode, -1);

    while (dfsStack.length > 0) {
      const current = dfsStack.pop()!;
      setCurrentNode(current);
      setStack([...dfsStack]);

      if (current === targetNode) {
        const pathNodes: number[] = [];
        let node = targetNode;
        while (node !== -1) {
          pathNodes.unshift(node);
          node = parents.get(node) || -1;
        }
        setPath(pathNodes);
        setCurrentOperation(`Path found! Path: [${pathNodes.join(' → ')}]`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsAnimating(false);
        return;
      }

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

      neighbors.reverse().forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          dfsStack.push(neighbor);
          parents.set(neighbor, current);
        }
      });

      setVisitedOrder([...Array.from(visited)]);
      setStack([...dfsStack]);
      setNodes(prevNodes => prevNodes.map(node => {
        if (neighbors.includes(node.id)) {
          return { 
            ...node, 
            visited: true, 
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
                {node.discoveryTime !== undefined && (
                  <text
                    x={node.x + 30}
                    y={node.y - 10}
                    fill="#374151"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    d:{node.discoveryTime}
                  </text>
                )}
                {node.finishTime !== undefined && (
                  <text
                    x={node.x + 30}
                    y={node.y + 5}
                    fill="#374151"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    f:{node.finishTime}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const runDFS = () => {
    if (dfsType === 'recursive') {
      dfsTraversalRecursive();
    } else {
      dfsTraversalIterative();
    }
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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-node-tree text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Depth-First Search (DFS)</h1>
              <p className="text-gray-600">Graph traversal algorithm that explores as far as possible along each branch before backtracking</p>
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
                    onClick={runDFS}
                    disabled={isAnimating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isAnimating ? 'Running...' : 'Run DFS'}
                  </button>
                  {targetNode !== null && (
                    <button
                      onClick={dfsPathFinding}
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
                <div className="flex items-center space-x-6 flex-wrap gap-3">
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
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">DFS Type:</label>
                    <select
                      value={dfsType}
                      onChange={(e) => setDfsType(e.target.value as 'recursive' | 'iterative')}
                      disabled={isAnimating}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="recursive">Recursive</option>
                      <option value="iterative">Iterative</option>
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

              {/* Stack Visualization */}
              {stack.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Stack</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-sm font-medium text-gray-700">Top →</span>
                      {stack.slice().reverse().map((nodeId, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center font-bold text-lg"
                        >
                          {nodeId}
                        </div>
                      ))}
                      <span className="text-sm font-medium text-gray-700">← Bottom</span>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Path Found</h3>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">DFS Algorithm Steps</h3>
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
                  {selectedLanguage === 'javascript' && `// JavaScript DFS - O(V + E)
// Recursive Implementation
function dfsRecursive(graph, start) {
    const visited = new Set();
    const result = [];
    
    const dfs = (node) => {
        if (visited.has(node)) return;
        
        visited.add(node);
        result.push(node);
        
        // Visit all neighbors
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    };
    
    dfs(start);
    return result;
}

// Iterative Implementation
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (visited.has(node)) continue;
        
        visited.add(node);
        result.push(node);
        
        // Push neighbors in reverse order
        for (let i = graph[node].length - 1; i >= 0; i--) {
            const neighbor = graph[node][i];
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }
    
    return result;
}

// DFS with Path Finding
function dfsPath(graph, start, target) {
    const visited = new Set();
    const stack = [[start, [start]]]; // [node, path]
    
    while (stack.length > 0) {
        const [node, path] = stack.pop();
        
        if (node === target) {
            return path;
        }
        
        if (visited.has(node)) continue;
        
        visited.add(node);
        
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                stack.push([neighbor, [...path, neighbor]]);
            }
        }
    }
    
    return null; // No path found
}`}
                  {selectedLanguage === 'python' && `# Python DFS - O(V + E)
# Recursive Implementation
def dfs_recursive(graph, start):
    visited = set()
    result = []
    
    def dfs(node):
        if node in visited:
            return
        
        visited.add(node)
        result.append(node)
        
        # Visit all neighbors
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)
    
    dfs(start)
    return result

# Iterative Implementation
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        node = stack.pop()
        
        if node in visited:
            continue
        
        visited.add(node)
        result.append(node)
        
        # Push neighbors in reverse order
        for neighbor in reversed(graph[node]):
            if neighbor not in visited:
                stack.append(neighbor)
    
    return result

# DFS with Path Finding
def dfs_path(graph, start, target):
    visited = set()
    stack = [(start, [start])]  # (node, path)
    
    while stack:
        node, path = stack.pop()
        
        if node == target:
            return path
        
        if node in visited:
            continue
        
        visited.add(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append((neighbor, path + [neighbor]))
    
    return None  # No path found`}
                  {selectedLanguage === 'java' && `// Java DFS - O(V + E)
import java.util.*;

// Recursive Implementation
public class DFS {
    public static List<Integer> dfsRecursive(
            Map<Integer, List<Integer>> graph, 
            int start) {
        Set<Integer> visited = new HashSet<>();
        List<Integer> result = new ArrayList<>();
        
        dfsHelper(graph, start, visited, result);
        return result;
    }
    
    private static void dfsHelper(
            Map<Integer, List<Integer>> graph,
            int node,
            Set<Integer> visited,
            List<Integer> result) {
        if (visited.contains(node)) return;
        
        visited.add(node);
        result.add(node);
        
        // Visit all neighbors
        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                dfsHelper(graph, neighbor, visited, result);
            }
        }
    }
    
    // Iterative Implementation
    public static List<Integer> dfsIterative(
            Map<Integer, List<Integer>> graph, 
            int start) {
        Set<Integer> visited = new HashSet<>();
        Stack<Integer> stack = new Stack<>();
        List<Integer> result = new ArrayList<>();
        
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int node = stack.pop();
            
            if (visited.contains(node)) continue;
            
            visited.add(node);
            result.add(node);
            
            // Push neighbors in reverse order
            List<Integer> neighbors = graph.getOrDefault(node, new ArrayList<>());
            for (int i = neighbors.size() - 1; i >= 0; i--) {
                int neighbor = neighbors.get(i);
                if (!visited.contains(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
        
        return result;
    }
    
    // DFS with Path Finding
    public static List<Integer> dfsPath(
            Map<Integer, List<Integer>> graph,
            int start,
            int target) {
        Set<Integer> visited = new HashSet<>();
        Stack<int[]> stack = new Stack<>();
        
        stack.push(new int[]{start, start});
        
        Map<Integer, Integer> parent = new HashMap<>();
        parent.put(start, -1);
        
        while (!stack.isEmpty()) {
            int[] current = stack.pop();
            int node = current[0];
            
            if (visited.contains(node)) continue;
            
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
            
            visited.add(node);
            
            for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    parent.put(neighbor, node);
                    stack.push(new int[]{neighbor, node});
                }
            }
        }
        
        return null; // No path found
    }
}`}
                  {selectedLanguage === 'cpp' && `// C++ DFS - O(V + E)
#include <vector>
#include <stack>
#include <unordered_set>
#include <unordered_map>
using namespace std;

// Recursive Implementation
void dfsHelper(
    unordered_map<int, vector<int>>& graph,
    int node,
    unordered_set<int>& visited,
    vector<int>& result) {
    if (visited.find(node) != visited.end()) return;
    
    visited.insert(node);
    result.push_back(node);
    
    // Visit all neighbors
    for (int neighbor : graph[node]) {
        if (visited.find(neighbor) == visited.end()) {
            dfsHelper(graph, neighbor, visited, result);
        }
    }
}

vector<int> dfsRecursive(
    unordered_map<int, vector<int>>& graph, 
    int start) {
    unordered_set<int> visited;
    vector<int> result;
    
    dfsHelper(graph, start, visited, result);
    return result;
}

// Iterative Implementation
vector<int> dfsIterative(
    unordered_map<int, vector<int>>& graph, 
    int start) {
    unordered_set<int> visited;
    stack<int> st;
    vector<int> result;
    
    st.push(start);
    
    while (!st.empty()) {
        int node = st.top();
        st.pop();
        
        if (visited.find(node) != visited.end()) continue;
        
        visited.insert(node);
        result.push_back(node);
        
        // Push neighbors in reverse order
        for (int i = graph[node].size() - 1; i >= 0; i--) {
            int neighbor = graph[node][i];
            if (visited.find(neighbor) == visited.end()) {
                st.push(neighbor);
            }
        }
    }
    
    return result;
}

// DFS with Path Finding
vector<int> dfsPath(
    unordered_map<int, vector<int>>& graph,
    int start,
    int target) {
    unordered_set<int> visited;
    stack<int> st;
    unordered_map<int, int> parent;
    
    st.push(start);
    parent[start] = -1;
    
    while (!st.empty()) {
        int node = st.top();
        st.pop();
        
        if (visited.find(node) != visited.end()) continue;
        
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
        
        visited.insert(node);
        
        for (int neighbor : graph[node]) {
            if (visited.find(neighbor) == visited.end()) {
                parent[neighbor] = node;
                st.push(neighbor);
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
                      <span>DFS Traversal:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(V + E)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Path Finding:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(V + E)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Recursive:</span>
                      <span className="font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">O(h)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Iterative:</span>
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

            {/* DFS Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">DFS Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Depth-first exploration</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Uses stack (recursive or explicit)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Backtracks when no unvisited neighbors</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Can find cycles in graphs</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Memory efficient for deep graphs</span>
                </div>
              </div>
            </div>

            {/* When to Use DFS */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use DFS</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Backtracking</h4>
                  <p className="text-sm text-gray-700">Maze solving, puzzle games</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Cycle Detection</h4>
                  <p className="text-sm text-gray-700">Detecting cycles in graphs</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Topological Sort</h4>
                  <p className="text-sm text-gray-700">Ordering nodes in DAGs</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Tree Traversal</h4>
                  <p className="text-sm text-gray-700">Pre-order, in-order, post-order</p>
                </div>
              </div>
            </div>

            {/* Recursive vs Iterative */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recursive vs Iterative</h3>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Recursive DFS</div>
                  <div className="text-gray-600">Uses call stack, simpler code, may cause stack overflow for deep graphs</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Iterative DFS</div>
                  <div className="text-gray-600">Uses explicit stack, more control, better for very deep graphs</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Memory</div>
                  <div className="text-gray-600">Recursive: O(h) | Iterative: O(V)</div>
                </div>
              </div>
            </div>

            {/* Common Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Applications</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">Maze solving and pathfinding</div>
                <div className="p-2 bg-gray-50 rounded">Cycle detection in graphs</div>
                <div className="p-2 bg-gray-50 rounded">Topological sorting</div>
                <div className="p-2 bg-gray-50 rounded">Strongly connected components</div>
                <div className="p-2 bg-gray-50 rounded">Tree traversals</div>
                <div className="p-2 bg-gray-50 rounded">Backtracking algorithms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
