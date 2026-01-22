'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface GraphNode {
  id: number;
  x: number;
  y: number;
  distance?: number;
  parent?: number;
  visited?: boolean;
  isCurrent?: boolean;
}

interface GraphEdge {
  from: number;
  to: number;
  weight: number;
}

interface PriorityQueueItem {
  nodeId: number;
  distance: number;
}

export default function DijkstraPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [startNode, setStartNode] = useState(0);
  const [targetNode, setTargetNode] = useState<number | null>(5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [priorityQueue, setPriorityQueue] = useState<PriorityQueueItem[]>([]);
  const [path, setPath] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [distances, setDistances] = useState<Map<number, number>>(new Map());

  const steps = [
    'Initialize distances: start = 0, all others = ∞',
    'Add start node to priority queue',
    'Extract node with minimum distance',
    'Mark node as visited',
    'Relax edges to unvisited neighbors',
    'Update distances if shorter path found',
    'Continue until target reached or queue empty'
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
      { id: 5, x: 450, y: 250 }
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
    setPath([]);
    setPriorityQueue([]);
    setCurrentNode(null);
    setCurrentStep(0);
    setCurrentOperation('');
    setDistances(new Map());
  };

  const dijkstraAlgorithm = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setPath([]);
    setPriorityQueue([]);
    setCurrentNode(null);
    setCurrentOperation('');

    // Reset node states
    setNodes(nodes.map(node => ({ 
      ...node, 
      visited: false, 
      distance: undefined, 
      parent: undefined,
      isCurrent: false
    })));

    const dist = new Map<number, number>();
    const prev = new Map<number, number>();
    const visited = new Set<number>();
    const pq: PriorityQueueItem[] = [];

    // Initialize distances
    setCurrentStep(1);
    nodes.forEach(node => {
      dist.set(node.id, node.id === startNode ? 0 : Infinity);
      prev.set(node.id, -1);
    });
    setDistances(new Map(dist));
    setNodes(prevNodes => prevNodes.map(node => ({
      ...node,
      distance: node.id === startNode ? 0 : Infinity
    })));
    setCurrentOperation(`Initialized distances: node ${startNode} = 0, all others = ∞`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add start node to priority queue
    setCurrentStep(2);
    pq.push({ nodeId: startNode, distance: 0 });
    pq.sort((a, b) => a.distance - b.distance);
    setPriorityQueue([...pq]);
    setCurrentOperation(`Added start node ${startNode} to priority queue`);
    await new Promise(resolve => setTimeout(resolve, 1200));

    while (pq.length > 0) {
      // Extract node with minimum distance
      setCurrentStep(3);
      const current = pq.shift()!;
      setCurrentNode(current.nodeId);
      setPriorityQueue([...pq]);
      setCurrentOperation(`Extracted node ${current.nodeId} with distance ${current.distance}`);
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (visited.has(current.nodeId)) {
        continue;
      }

      // Mark as visited
      setCurrentStep(4);
      visited.add(current.nodeId);
      setNodes(prevNodes => prevNodes.map(node => 
        node.id === current.nodeId 
          ? { ...node, visited: true, isCurrent: true }
          : { ...node, isCurrent: false }
      ));
      setCurrentOperation(`Marked node ${current.nodeId} as visited`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if target reached
      if (targetNode !== null && current.nodeId === targetNode) {
        const pathNodes: number[] = [];
        let node = targetNode;
        while (node !== -1) {
          pathNodes.unshift(node);
          node = prev.get(node) || -1;
        }
        setPath(pathNodes);
        setCurrentStep(7);
        setCurrentOperation(`Shortest path found! Distance: ${dist.get(targetNode)}. Path: [${pathNodes.join(' → ')}]`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsAnimating(false);
        return;
      }

      // Relax edges to neighbors
      setCurrentStep(5);
      const neighbors: { nodeId: number; weight: number }[] = [];
      edges.forEach(edge => {
        if (edge.from === current.nodeId && !visited.has(edge.to)) {
          neighbors.push({ nodeId: edge.to, weight: edge.weight });
        } else if (edge.to === current.nodeId && !visited.has(edge.from)) {
          neighbors.push({ nodeId: edge.from, weight: edge.weight });
        }
      });

      if (neighbors.length > 0) {
        setCurrentOperation(`Relaxing edges to ${neighbors.length} unvisited neighbor(s)`);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setCurrentStep(6);
        neighbors.forEach(neighbor => {
          const alt = (dist.get(current.nodeId) || 0) + neighbor.weight;
          const currentDist = dist.get(neighbor.nodeId) || Infinity;

          if (alt < currentDist) {
            dist.set(neighbor.nodeId, alt);
            prev.set(neighbor.nodeId, current.nodeId);
            setDistances(new Map(dist));
            setNodes(prevNodes => prevNodes.map(node => 
              node.id === neighbor.nodeId 
                ? { ...node, distance: alt, parent: current.nodeId }
                : node
            ));
            setCurrentOperation(`Updated distance to node ${neighbor.nodeId}: ${alt} (via ${current.nodeId})`);
            
            // Add to priority queue
            const existingIndex = pq.findIndex(item => item.nodeId === neighbor.nodeId);
            if (existingIndex !== -1) {
              pq[existingIndex].distance = alt;
            } else {
              pq.push({ nodeId: neighbor.nodeId, distance: alt });
            }
            pq.sort((a, b) => a.distance - b.distance);
            setPriorityQueue([...pq]);
          }
        });
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        setCurrentOperation(`No unvisited neighbors for node ${current.nodeId}`);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    // Reconstruct path if target was specified
    if (targetNode !== null && prev.has(targetNode)) {
      const pathNodes: number[] = [];
      let node = targetNode;
      while (node !== -1) {
        pathNodes.unshift(node);
        node = prev.get(node) || -1;
      }
      setPath(pathNodes);
      setCurrentOperation(`Shortest path: [${pathNodes.join(' → ')}] with distance ${dist.get(targetNode)}`);
    } else if (targetNode !== null) {
      setCurrentOperation(`No path found from ${startNode} to ${targetNode}`);
    } else {
      setCurrentOperation(`Dijkstra complete! All shortest distances calculated from node ${startNode}`);
    }

    setCurrentNode(null);
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

          {/* Render nodes */}
          {nodes.map(node => {
            const isVisited = node.visited;
            const isCurrent = node.isCurrent || currentNode === node.id;
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
                    {node.distance === Infinity ? '∞' : `d:${node.distance}`}
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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-route-line text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Dijkstra's Algorithm</h1>
              <p className="text-gray-600">Find shortest paths from a source vertex to all other vertices in a weighted graph</p>
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
                    onClick={dijkstraAlgorithm}
                    disabled={isAnimating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isAnimating ? 'Running...' : 'Run Dijkstra'}
                  </button>
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
                      <option value="">All Nodes</option>
                      {nodes.map(node => (
                        <option key={node.id} value={node.id}>{node.id}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Click on nodes to set as start (green) or target (red). Edge weights are shown on edges.</p>
              </div>

              {/* Graph Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Weighted Graph</h3>
                {renderGraph()}
              </div>

              {/* Priority Queue Visualization */}
              {priorityQueue.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Priority Queue (Min-Heap)</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {priorityQueue.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center bg-purple-500 text-white rounded-lg p-2 min-w-[60px]"
                        >
                          <div className="text-lg font-bold">{item.nodeId}</div>
                          <div className="text-xs opacity-90">d:{item.distance}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Sorted by distance (minimum first)</p>
                  </div>
                </div>
              )}

              {/* Distance Table */}
              {distances.size > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Distance Table</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {nodes.map(node => {
                        const dist = distances.get(node.id);
                        return (
                          <div key={node.id} className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Node {node.id}</div>
                            <div className={`text-sm font-bold px-2 py-1 rounded ${
                              dist === Infinity 
                                ? 'bg-gray-200 text-gray-600' 
                                : dist === 0 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {dist === Infinity ? '∞' : dist}
                            </div>
                          </div>
                        );
                      })}
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
                      {targetNode !== null && distances.has(targetNode) && (
                        <span className="ml-4 text-sm text-gray-600">
                          (Distance: {distances.get(targetNode)})
                        </span>
                      )}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Dijkstra's Algorithm Steps</h3>
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
                  {selectedLanguage === 'javascript' && `// JavaScript Dijkstra's Algorithm - O((V + E) log V)
function dijkstra(graph, start) {
    const distances = {};
    const previous = {};
    const unvisited = new Set();
    const pq = []; // Priority queue
    
    // Initialize distances
    for (const node in graph) {
        distances[node] = node === start ? 0 : Infinity;
        previous[node] = null;
        unvisited.add(node);
        pq.push({ node, distance: distances[node] });
    }
    
    // Sort priority queue
    pq.sort((a, b) => a.distance - b.distance);
    
    while (pq.length > 0) {
        // Extract minimum
        const { node: current } = pq.shift();
        
        if (!unvisited.has(current)) continue;
        unvisited.delete(current);
        
        // Relax edges
        for (const neighbor in graph[current]) {
            if (!unvisited.has(neighbor)) continue;
            
            const weight = graph[current][neighbor];
            const alt = distances[current] + weight;
            
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;
                
                // Update priority queue
                const index = pq.findIndex(item => item.node === neighbor);
                if (index !== -1) {
                    pq[index].distance = alt;
                    pq.sort((a, b) => a.distance - b.distance);
                }
            }
        }
    }
    
    return { distances, previous };
}

// Reconstruct shortest path
function getPath(previous, target) {
    const path = [];
    let current = target;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }
    return path;
}`}
                  {selectedLanguage === 'python' && `# Python Dijkstra's Algorithm - O((V + E) log V)
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    previous = {node: None for node in graph}
    unvisited = set(graph.keys())
    pq = [(0, start)]  # (distance, node)
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current not in unvisited:
            continue
        
        unvisited.remove(current)
        
        # Relax edges
        for neighbor, weight in graph[current].items():
            if neighbor not in unvisited:
                continue
            
            alt = current_dist + weight
            
            if alt < distances[neighbor]:
                distances[neighbor] = alt
                previous[neighbor] = current
                heapq.heappush(pq, (alt, neighbor))
    
    return distances, previous

# Reconstruct shortest path
def get_path(previous, target):
    path = []
    current = target
    while current is not None:
        path.insert(0, current)
        current = previous[current]
    return path`}
                  {selectedLanguage === 'java' && `// Java Dijkstra's Algorithm - O((V + E) log V)
import java.util.*;

public class Dijkstra {
    public static Map<Integer, Integer> dijkstra(
            Map<Integer, Map<Integer, Integer>> graph, 
            int start) {
        Map<Integer, Integer> distances = new HashMap<>();
        Map<Integer, Integer> previous = new HashMap<>();
        Set<Integer> unvisited = new HashSet<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(a[1], b[1])
        );
        
        // Initialize distances
        for (int node : graph.keySet()) {
            distances.put(node, node == start ? 0 : Integer.MAX_VALUE);
            previous.put(node, null);
            unvisited.add(node);
            pq.offer(new int[]{node, distances.get(node)});
        }
        
        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int node = current[0];
            
            if (!unvisited.contains(node)) continue;
            unvisited.remove(node);
            
            // Relax edges
            for (Map.Entry<Integer, Integer> neighbor : 
                 graph.get(node).entrySet()) {
                if (!unvisited.contains(neighbor.getKey())) continue;
                
                int weight = neighbor.getValue();
                int alt = distances.get(node) + weight;
                
                if (alt < distances.get(neighbor.getKey())) {
                    distances.put(neighbor.getKey(), alt);
                    previous.put(neighbor.getKey(), node);
                    pq.offer(new int[]{neighbor.getKey(), alt});
                }
            }
        }
        
        return distances;
    }
    
    // Reconstruct shortest path
    public static List<Integer> getPath(
            Map<Integer, Integer> previous, 
            int target) {
        List<Integer> path = new ArrayList<>();
        Integer current = target;
        while (current != null) {
            path.add(0, current);
            current = previous.get(current);
        }
        return path;
    }
}`}
                  {selectedLanguage === 'cpp' && `// C++ Dijkstra's Algorithm - O((V + E) log V)
#include <vector>
#include <queue>
#include <unordered_map>
#include <climits>
using namespace std;

pair<unordered_map<int, int>, unordered_map<int, int>> 
dijkstra(unordered_map<int, unordered_map<int, int>>& graph, int start) {
    unordered_map<int, int> distances;
    unordered_map<int, int> previous;
    unordered_set<int> unvisited;
    priority_queue<pair<int, int>, vector<pair<int, int>>, 
                   greater<pair<int, int>>> pq;
    
    // Initialize distances
    for (auto& node : graph) {
        distances[node.first] = (node.first == start) ? 0 : INT_MAX;
        previous[node.first] = -1;
        unvisited.insert(node.first);
        pq.push({distances[node.first], node.first});
    }
    
    while (!pq.empty()) {
        int current = pq.top().second;
        pq.pop();
        
        if (unvisited.find(current) == unvisited.end()) continue;
        unvisited.erase(current);
        
        // Relax edges
        for (auto& neighbor : graph[current]) {
            if (unvisited.find(neighbor.first) == unvisited.end()) 
                continue;
            
            int weight = neighbor.second;
            int alt = distances[current] + weight;
            
            if (alt < distances[neighbor.first]) {
                distances[neighbor.first] = alt;
                previous[neighbor.first] = current;
                pq.push({alt, neighbor.first});
            }
        }
    }
    
    return {distances, previous};
}

// Reconstruct shortest path
vector<int> getPath(unordered_map<int, int>& previous, int target) {
    vector<int> path;
    int current = target;
    while (current != -1) {
        path.insert(path.begin(), current);
        current = previous[current];
    }
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
                      <span>With Binary Heap:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O((V + E) log V)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>With Array:</span>
                      <span className="font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">O(V²)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>With Fibonacci Heap:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(E + V log V)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Distance Array:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(V)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Priority Queue:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(V)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dijkstra Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dijkstra's Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Greedy algorithm</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Works with non-negative edge weights</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Finds shortest paths from single source</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Uses priority queue (min-heap)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Optimal for dense graphs</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-close-line text-red-600 mr-2"></i>
                  <span>Does not work with negative weights</span>
                </div>
              </div>
            </div>

            {/* When to Use Dijkstra */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use Dijkstra</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">GPS Navigation</h4>
                  <p className="text-sm text-gray-700">Finding shortest routes in road networks</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Network Routing</h4>
                  <p className="text-sm text-gray-700">Optimal packet routing in computer networks</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Social Networks</h4>
                  <p className="text-sm text-gray-700">Finding degrees of separation</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Resource Allocation</h4>
                  <p className="text-sm text-gray-700">Optimizing resource distribution paths</p>
                </div>
              </div>
            </div>

            {/* Algorithm Comparison */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Algorithm Comparison</h3>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Dijkstra vs BFS</div>
                  <div className="text-gray-600">Dijkstra: weighted graphs | BFS: unweighted graphs</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Dijkstra vs Bellman-Ford</div>
                  <div className="text-gray-600">Dijkstra: no negative weights | Bellman-Ford: handles negative weights</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Dijkstra vs Floyd-Warshall</div>
                  <div className="text-gray-600">Dijkstra: single source | Floyd-Warshall: all pairs</div>
                </div>
              </div>
            </div>

            {/* Common Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Applications</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">GPS and map applications</div>
                <div className="p-2 bg-gray-50 rounded">Network routing protocols</div>
                <div className="p-2 bg-gray-50 rounded">Social network analysis</div>
                <div className="p-2 bg-gray-50 rounded">Game pathfinding (A* uses Dijkstra)</div>
                <div className="p-2 bg-gray-50 rounded">Telecommunications networks</div>
                <div className="p-2 bg-gray-50 rounded">Resource allocation systems</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
