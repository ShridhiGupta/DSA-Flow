'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface GraphNode {
  id: number;
  x: number;
  y: number;
}

interface GraphEdge {
  from: number;
  to: number;
  weight: number;
}

export default function FloydWarshallPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [distanceMatrix, setDistanceMatrix] = useState<number[][]>([]);
  const [nextMatrix, setNextMatrix] = useState<number[][]>([]);
  const [currentK, setCurrentK] = useState<number | null>(null);
  const [currentI, setCurrentI] = useState<number | null>(null);
  const [currentJ, setCurrentJ] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [selectedPath, setSelectedPath] = useState<{ from: number; to: number } | null>(null);
  const [path, setPath] = useState<number[]>([]);

  const steps = [
    'Initialize distance matrix with direct edges',
    'Initialize next matrix for path reconstruction',
    'For each intermediate node k (0 to n-1)',
    'For each pair (i, j), check if path through k is shorter',
    'Update distance[i][j] = min(distance[i][j], distance[i][k] + distance[k][j])',
    'Update next matrix if shorter path found',
    'Continue until all pairs processed'
  ];

  useEffect(() => {
    initializeSampleGraph();
  }, []);

  const initializeSampleGraph = () => {
    const sampleNodes: GraphNode[] = [
      { id: 0, x: 200, y: 100 },
      { id: 1, x: 400, y: 50 },
      { id: 2, x: 400, y: 150 },
      { id: 3, x: 200, y: 250 }
    ];

    const sampleEdges: GraphEdge[] = [
      { from: 0, to: 1, weight: 3 },
      { from: 0, to: 2, weight: 8 },
      { from: 0, to: 3, weight: 7 },
      { from: 1, to: 2, weight: 1 },
      { from: 2, to: 3, weight: 2 },
      { from: 3, to: 1, weight: 4 }
    ];

    setNodes(sampleNodes);
    setEdges(sampleEdges);
    setDistanceMatrix([]);
    setNextMatrix([]);
    setCurrentK(null);
    setCurrentI(null);
    setCurrentJ(null);
    setCurrentStep(0);
    setCurrentOperation('');
    setSelectedPath(null);
    setPath([]);
  };

  const floydWarshallAlgorithm = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setDistanceMatrix([]);
    setNextMatrix([]);
    setCurrentK(null);
    setCurrentI(null);
    setCurrentJ(null);
    setCurrentOperation('');
    setPath([]);

    const n = nodes.length;
    const dist: number[][] = [];
    const next: number[][] = [];
    const INF = Number.MAX_SAFE_INTEGER;

    // Initialize distance matrix
    setCurrentStep(1);
    for (let i = 0; i < n; i++) {
      dist[i] = [];
      next[i] = [];
      for (let j = 0; j < n; j++) {
        if (i === j) {
          dist[i][j] = 0;
          next[i][j] = j;
        } else {
          dist[i][j] = INF;
          next[i][j] = -1;
        }
      }
    }

    // Add direct edges
    edges.forEach(edge => {
      dist[edge.from][edge.to] = edge.weight;
      next[edge.from][edge.to] = edge.to;
    });

    setDistanceMatrix(dist.map(row => [...row]));
    setNextMatrix(next.map(row => [...row]));
    setCurrentOperation('Initialized distance matrix with direct edges');
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep(2);
    setCurrentOperation('Initialized next matrix for path reconstruction');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
      setCurrentStep(3);
      setCurrentK(k);
      setCurrentOperation(`Processing intermediate node k = ${k}`);
      await new Promise(resolve => setTimeout(resolve, 1200));

      for (let i = 0; i < n; i++) {
        setCurrentI(i);
        for (let j = 0; j < n; j++) {
          setCurrentJ(j);
          setCurrentStep(4);
          
          if (i === k || j === k || i === j) {
            continue;
          }

          const distIK = dist[i][k];
          const distKJ = dist[k][j];
          const distIJ = dist[i][j];

          if (distIK !== INF && distKJ !== INF) {
            setCurrentStep(5);
            const newDist = distIK + distKJ;
            setCurrentOperation(
              `Checking: dist[${i}][${j}] = ${distIJ === INF ? '∞' : distIJ}, ` +
              `dist[${i}][${k}] + dist[${k}][${j}] = ${distIK} + ${distKJ} = ${newDist}`
            );
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (newDist < distIJ) {
              setCurrentStep(6);
              dist[i][j] = newDist;
              next[i][j] = next[i][k];
              setDistanceMatrix(dist.map(row => [...row]));
              setNextMatrix(next.map(row => [...row]));
              setCurrentOperation(
                `Updated: dist[${i}][${j}] = ${newDist} (via node ${k})`
              );
              await new Promise(resolve => setTimeout(resolve, 1200));
            } else {
              setCurrentOperation(
                `No update: ${distIJ === INF ? '∞' : distIJ} ≤ ${newDist}`
              );
              await new Promise(resolve => setTimeout(resolve, 600));
            }
          }
        }
      }
    }

    setCurrentStep(7);
    setCurrentK(null);
    setCurrentI(null);
    setCurrentJ(null);
    setCurrentOperation('Floyd-Warshall complete! All shortest paths calculated');
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsAnimating(false);
  };

  const getPathBetween = (from: number, to: number): number[] => {
    if (nextMatrix.length === 0) return [];
    if (nextMatrix[from][to] === -1) return [];

    const path: number[] = [];
    let current = from;
    
    while (current !== to) {
      path.push(current);
      if (nextMatrix[current][to] === -1) return [];
      current = nextMatrix[current][to];
    }
    path.push(to);
    
    return path;
  };

  const handlePathSelection = (from: number, to: number) => {
    setSelectedPath({ from, to });
    const pathNodes = getPathBetween(from, to);
    setPath(pathNodes);
    if (pathNodes.length > 0) {
      setCurrentOperation(`Path from ${from} to ${to}: [${pathNodes.join(' → ')}] (Distance: ${distanceMatrix[from][to] === Number.MAX_SAFE_INTEGER ? '∞' : distanceMatrix[from][to]})`);
    } else {
      setCurrentOperation(`No path from ${from} to ${to}`);
    }
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
                path[i] === edge.from && path[i + 1] === edge.to
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
                  markerEnd="url(#arrowhead)"
                  className="transition-all duration-300"
                />
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 5}
                  textAnchor="middle"
                  fill={isInPath ? "#059669" : "#374151"}
                  fontSize="14"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Arrow marker */}
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

          {/* Render nodes */}
          {nodes.map(node => {
            const isK = currentK === node.id;
            const isI = currentI === node.id;
            const isJ = currentJ === node.id;
            const isInPath = path.includes(node.id);

            let fillColor = "#6B7280"; // Default gray
            if (isK) fillColor = "#3B82F6"; // Blue for intermediate
            else if (isI) fillColor = "#8B5CF6"; // Purple for source
            else if (isJ) fillColor = "#EC4899"; // Pink for destination
            else if (isInPath) fillColor = "#10B981"; // Green for path
            else fillColor = "#9CA3AF"; // Light gray

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill={fillColor}
                  stroke="#1F2937"
                  strokeWidth="3"
                  className="transition-all duration-300"
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
                {isK && (
                  <text
                    x={node.x}
                    y={node.y - 40}
                    textAnchor="middle"
                    fill="#3B82F6"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    k={node.id}
                  </text>
                )}
                {isI && !isK && (
                  <text
                    x={node.x}
                    y={node.y - 40}
                    textAnchor="middle"
                    fill="#8B5CF6"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    i={node.id}
                  </text>
                )}
                {isJ && !isK && (
                  <text
                    x={node.x}
                    y={node.y - 40}
                    textAnchor="middle"
                    fill="#EC4899"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    j={node.id}
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
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-share-box-line text-2xl text-indigo-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Floyd-Warshall Algorithm</h1>
              <p className="text-gray-600">Find shortest paths between all pairs of vertices in a weighted graph using dynamic programming</p>
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
                    onClick={floydWarshallAlgorithm}
                    disabled={isAnimating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isAnimating ? 'Running...' : 'Run Floyd-Warshall'}
                  </button>
                </div>
              </div>

              {/* Graph Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Weighted Directed Graph</h3>
                {renderGraph()}
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Blue = intermediate (k), Purple = source (i), Pink = destination (j)
                </p>
              </div>

              {/* Distance Matrix */}
              {distanceMatrix.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Distance Matrix</h3>
                  <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 px-2 py-1 bg-gray-200 font-semibold"></th>
                          {nodes.map(node => (
                            <th key={node.id} className="border border-gray-300 px-2 py-1 bg-gray-200 font-semibold">
                              {node.id}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {distanceMatrix.map((row, i) => (
                          <tr key={i}>
                            <td className="border border-gray-300 px-2 py-1 bg-gray-200 font-semibold">
                              {i}
                            </td>
                            {row.map((dist, j) => {
                              const isHighlighted = currentI === i && currentJ === j;
                              const isInf = dist === Number.MAX_SAFE_INTEGER;
                              return (
                                <td
                                  key={j}
                                  className={`border border-gray-300 px-2 py-1 text-center font-mono text-sm ${
                                    isHighlighted
                                      ? 'bg-yellow-200 font-bold'
                                      : i === j
                                      ? 'bg-gray-100'
                                      : 'bg-white'
                                  }`}
                                  onClick={() => handlePathSelection(i, j)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {isInf ? '∞' : dist}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs text-gray-500 mt-2">Click any cell to see the shortest path</p>
                  </div>
                </div>
              )}

              {/* Path Display */}
              {path.length > 0 && selectedPath && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Shortest Path</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-600">From {selectedPath.from} to {selectedPath.to}:</span>
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
                        (Distance: {distanceMatrix[selectedPath.from][selectedPath.to] === Number.MAX_SAFE_INTEGER ? '∞' : distanceMatrix[selectedPath.from][selectedPath.to]})
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Floyd-Warshall Algorithm Steps</h3>
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
                  {selectedLanguage === 'javascript' && `// JavaScript Floyd-Warshall - O(V³)
function floydWarshall(graph, n) {
    const dist = [];
    const next = [];
    const INF = Number.MAX_SAFE_INTEGER;
    
    // Initialize distance matrix
    for (let i = 0; i < n; i++) {
        dist[i] = [];
        next[i] = [];
        for (let j = 0; j < n; j++) {
            if (i === j) {
                dist[i][j] = 0;
                next[i][j] = j;
            } else {
                dist[i][j] = INF;
                next[i][j] = -1;
            }
        }
    }
    
    // Add direct edges
    for (const edge of graph) {
        dist[edge.from][edge.to] = edge.weight;
        next[edge.from][edge.to] = edge.to;
    }
    
    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] !== INF && dist[k][j] !== INF) {
                    const newDist = dist[i][k] + dist[k][j];
                    if (newDist < dist[i][j]) {
                        dist[i][j] = newDist;
                        next[i][j] = next[i][k];
                    }
                }
            }
        }
    }
    
    return { dist, next };
}

// Reconstruct path
function getPath(next, from, to) {
    if (next[from][to] === -1) return [];
    
    const path = [];
    let current = from;
    while (current !== to) {
        path.push(current);
        current = next[current][to];
    }
    path.push(to);
    return path;
}`}
                  {selectedLanguage === 'python' && `# Python Floyd-Warshall - O(V³)
def floyd_warshall(graph, n):
    INF = float('inf')
    dist = [[INF] * n for _ in range(n)]
    next_node = [[-1] * n for _ in range(n)]
    
    # Initialize distance matrix
    for i in range(n):
        dist[i][i] = 0
        next_node[i][i] = i
    
    # Add direct edges
    for edge in graph:
        dist[edge['from']][edge['to']] = edge['weight']
        next_node[edge['from']][edge['to']] = edge['to']
    
    # Floyd-Warshall algorithm
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] != INF and dist[k][j] != INF:
                    new_dist = dist[i][k] + dist[k][j]
                    if new_dist < dist[i][j]:
                        dist[i][j] = new_dist
                        next_node[i][j] = next_node[i][k]
    
    return dist, next_node

# Reconstruct path
def get_path(next_node, from_node, to_node):
    if next_node[from_node][to_node] == -1:
        return []
    
    path = []
    current = from_node
    while current != to_node:
        path.append(current)
        current = next_node[current][to_node]
    path.append(to_node)
    return path`}
                  {selectedLanguage === 'java' && `// Java Floyd-Warshall - O(V³)
public class FloydWarshall {
    public static int[][] floydWarshall(int[][] graph, int n) {
        int[][] dist = new int[n][n];
        int[][] next = new int[n][n];
        int INF = Integer.MAX_VALUE;
        
        // Initialize distance matrix
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    dist[i][j] = 0;
                    next[i][j] = j;
                } else {
                    dist[i][j] = INF;
                    next[i][j] = -1;
                }
            }
        }
        
        // Add direct edges
        for (int[] edge : graph) {
            dist[edge[0]][edge[1]] = edge[2];
            next[edge[0]][edge[1]] = edge[1];
        }
        
        // Floyd-Warshall algorithm
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] != INF && dist[k][j] != INF) {
                        long newDist = (long) dist[i][k] + dist[k][j];
                        if (newDist < dist[i][j]) {
                            dist[i][j] = (int) newDist;
                            next[i][j] = next[i][k];
                        }
                    }
                }
            }
        }
        
        return dist;
    }
    
    // Reconstruct path
    public static List<Integer> getPath(int[][] next, int from, int to) {
        if (next[from][to] == -1) return new ArrayList<>();
        
        List<Integer> path = new ArrayList<>();
        int current = from;
        while (current != to) {
            path.add(current);
            current = next[current][to];
        }
        path.add(to);
        return path;
    }
}`}
                  {selectedLanguage === 'cpp' && `// C++ Floyd-Warshall - O(V³)
#include <vector>
#include <climits>
using namespace std;

vector<vector<int>> floydWarshall(vector<vector<int>>& graph, int n) {
    vector<vector<int>> dist(n, vector<int>(n, INT_MAX));
    vector<vector<int>> next(n, vector<int>(n, -1));
    
    // Initialize distance matrix
    for (int i = 0; i < n; i++) {
        dist[i][i] = 0;
        next[i][i] = i;
    }
    
    // Add direct edges
    for (auto& edge : graph) {
        dist[edge[0]][edge[1]] = edge[2];
        next[edge[0]][edge[1]] = edge[1];
    }
    
    // Floyd-Warshall algorithm
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX) {
                    int newDist = dist[i][k] + dist[k][j];
                    if (newDist < dist[i][j]) {
                        dist[i][j] = newDist;
                        next[i][j] = next[i][k];
                    }
                }
            }
        }
    }
    
    return dist;
}

// Reconstruct path
vector<int> getPath(vector<vector<int>>& next, int from, int to) {
    if (next[from][to] == -1) return {};
    
    vector<int> path;
    int current = from;
    while (current != to) {
        path.push_back(current);
        current = next[current][to];
    }
    path.push_back(to);
    return path;
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
                      <span>Floyd-Warshall:</span>
                      <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">O(V³)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Space:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(V²)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Distance Matrix:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(V²)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Matrix:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(V²)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floyd-Warshall Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Floyd-Warshall Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Finds all-pairs shortest paths</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Works with negative edge weights</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Can detect negative cycles</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Uses dynamic programming approach</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Simple implementation (3 nested loops)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-close-line text-red-600 mr-2"></i>
                  <span>Not optimal for sparse graphs</span>
                </div>
              </div>
            </div>

            {/* When to Use Floyd-Warshall */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use Floyd-Warshall</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">All-Pairs Shortest Path</h4>
                  <p className="text-sm text-gray-700">When you need shortest paths between all vertex pairs</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Negative Weights</h4>
                  <p className="text-sm text-gray-700">Graphs with negative edge weights (no negative cycles)</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Dense Graphs</h4>
                  <p className="text-sm text-gray-700">When graph has many edges (dense graphs)</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Transitive Closure</h4>
                  <p className="text-sm text-gray-700">Finding reachability between all pairs</p>
                </div>
              </div>
            </div>

            {/* Algorithm Comparison */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Algorithm Comparison</h3>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Floyd-Warshall vs Dijkstra</div>
                  <div className="text-gray-600">FW: All pairs O(V³) | Dijkstra: Single source O((V+E)log V)</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Floyd-Warshall vs Bellman-Ford</div>
                  <div className="text-gray-600">FW: All pairs | Bellman-Ford: Single source, handles negative cycles</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">When to Choose</div>
                  <div className="text-gray-600">FW: Need all pairs, dense graph | Dijkstra: Single source, sparse graph</div>
                </div>
              </div>
            </div>

            {/* Dynamic Programming Concept */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dynamic Programming</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
{`Key Idea:
dist[i][j] = shortest path from i to j
using only nodes 0..k-1 as intermediates

Recurrence:
dist[i][j] = min(
    dist[i][j],           // Don't use k
    dist[i][k] + dist[k][j]  // Use k as intermediate
)

Base Case:
dist[i][j] = weight(i,j) if edge exists
           = ∞ otherwise`}
                </pre>
              </div>
            </div>

            {/* Common Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Applications</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">Network routing protocols</div>
                <div className="p-2 bg-gray-50 rounded">Social network analysis</div>
                <div className="p-2 bg-gray-50 rounded">Transitive closure computation</div>
                <div className="p-2 bg-gray-50 rounded">Graph similarity measures</div>
                <div className="p-2 bg-gray-50 rounded">Distance matrix computation</div>
                <div className="p-2 bg-gray-50 rounded">Negative cycle detection</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
