'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface GraphNode {
  id: number;
  x: number;
  y: number;
  inMst?: boolean;
  key?: number;
  parent?: number;
}

interface GraphEdge {
  from: number;
  to: number;
  weight: number;
  selected?: boolean;
  candidate?: boolean;
}

interface PriorityQueueItem {
  nodeId: number;
  key: number;
  parent?: number;
}

export default function PrimsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [startNode, setStartNode] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [priorityQueue, setPriorityQueue] = useState<PriorityQueueItem[]>([]);
  const [mstEdges, setMstEdges] = useState<GraphEdge[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [totalWeight, setTotalWeight] = useState(0);

  const steps = [
    'Initialize: start node key = 0, all others = ∞',
    'Add start node to priority queue',
    'Extract node with minimum key from queue',
    'Add node to MST',
    'Update keys of adjacent nodes not in MST',
    'Add/update adjacent nodes in priority queue',
    'Continue until all nodes in MST'
  ];

  useEffect(() => {
    initializeSampleGraph();
  }, []);

  const initializeSampleGraph = () => {
    const sampleNodes: GraphNode[] = [
      { id: 0, x: 200, y: 100 },
      { id: 1, x: 400, y: 50 },
      { id: 2, x: 400, y: 150 },
      { id: 3, x: 200, y: 250 },
      { id: 4, x: 100, y: 150 }
    ];

    const sampleEdges: GraphEdge[] = [
      { from: 0, to: 1, weight: 4 },
      { from: 0, to: 2, weight: 2 },
      { from: 0, to: 4, weight: 5 },
      { from: 1, to: 2, weight: 1 },
      { from: 1, to: 3, weight: 3 },
      { from: 2, to: 3, weight: 6 },
      { from: 2, to: 4, weight: 3 },
      { from: 3, to: 4, weight: 4 }
    ];

    setNodes(sampleNodes);
    setEdges(sampleEdges);
    setMstEdges([]);
    setPriorityQueue([]);
    setCurrentNode(null);
    setCurrentStep(0);
    setCurrentOperation('');
    setTotalWeight(0);
  };

  const primsAlgorithm = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setMstEdges([]);
    setPriorityQueue([]);
    setCurrentNode(null);
    setCurrentOperation('');
    setTotalWeight(0);

    // Reset node and edge states
    setNodes(nodes.map(node => ({ 
      ...node, 
      inMst: false, 
      key: undefined, 
      parent: undefined 
    })));
    setEdges(edges.map(edge => ({ ...edge, selected: false, candidate: false })));

    const keys = new Map<number, number>();
    const parents = new Map<number, number>();
    const inMst = new Set<number>();
    const pq: PriorityQueueItem[] = [];
    const INF = Number.MAX_SAFE_INTEGER;

    // Initialize keys
    setCurrentStep(1);
    nodes.forEach(node => {
      keys.set(node.id, node.id === startNode ? 0 : INF);
      parents.set(node.id, -1);
    });
    setNodes(prevNodes => prevNodes.map(node => ({
      ...node,
      key: node.id === startNode ? 0 : INF,
      parent: -1
    })));
    setCurrentOperation(`Initialized keys: node ${startNode} = 0, all others = ∞`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add start node to priority queue
    setCurrentStep(2);
    pq.push({ nodeId: startNode, key: 0 });
    pq.sort((a, b) => a.key - b.key);
    setPriorityQueue([...pq]);
    setCurrentOperation(`Added start node ${startNode} to priority queue`);
    await new Promise(resolve => setTimeout(resolve, 1200));

    while (pq.length > 0) {
      // Extract node with minimum key
      setCurrentStep(3);
      const current = pq.shift()!;
      setCurrentNode(current.nodeId);
      setPriorityQueue([...pq]);
      setCurrentOperation(`Extracted node ${current.nodeId} with key ${current.key}`);
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (inMst.has(current.nodeId)) {
        continue;
      }

      // Add to MST
      setCurrentStep(4);
      inMst.add(current.nodeId);
      setNodes(prevNodes => prevNodes.map(node => 
        node.id === current.nodeId 
          ? { ...node, inMst: true, key: current.key, parent: current.parent }
          : node
      ));

      // Add edge to MST if it has a parent
      if (current.parent !== undefined && current.parent !== -1) {
        const edge = edges.find(e => 
          (e.from === current.parent && e.to === current.nodeId) ||
          (e.from === current.nodeId && e.to === current.parent)
        );
        if (edge) {
          mstEdges.push(edge);
          setMstEdges([...mstEdges]);
          setTotalWeight(mstEdges.reduce((sum, e) => sum + e.weight, 0) + edge.weight);
          setEdges(prevEdges => prevEdges.map(e =>
            (e.from === edge.from && e.to === edge.to) || (e.from === edge.to && e.to === edge.from)
              ? { ...e, selected: true }
              : e
          ));
        }
      }

      setCurrentOperation(`Added node ${current.nodeId} to MST. MST nodes: ${inMst.size}/${nodes.length}`);
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (inMst.size === nodes.length) {
        break;
      }

      // Update keys of adjacent nodes
      setCurrentStep(5);
      const neighbors: { nodeId: number; weight: number }[] = [];
      edges.forEach(edge => {
        if (edge.from === current.nodeId && !inMst.has(edge.to)) {
          neighbors.push({ nodeId: edge.to, weight: edge.weight });
        } else if (edge.to === current.nodeId && !inMst.has(edge.from)) {
          neighbors.push({ nodeId: edge.from, weight: edge.weight });
        }
      });

      if (neighbors.length > 0) {
        setCurrentOperation(`Updating keys for ${neighbors.length} adjacent node(s) not in MST`);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setCurrentStep(6);
        neighbors.forEach(neighbor => {
          const currentKey = keys.get(neighbor.nodeId) || INF;
          if (neighbor.weight < currentKey) {
            keys.set(neighbor.nodeId, neighbor.weight);
            parents.set(neighbor.nodeId, current.nodeId);
            setNodes(prevNodes => prevNodes.map(node =>
              node.id === neighbor.nodeId
                ? { ...node, key: neighbor.weight, parent: current.nodeId }
                : node
            ));
            setCurrentOperation(
              `Updated key for node ${neighbor.nodeId}: ${currentKey === INF ? '∞' : currentKey} → ${neighbor.weight}`
            );

            // Update or add to priority queue
            const existingIndex = pq.findIndex(item => item.nodeId === neighbor.nodeId);
            if (existingIndex !== -1) {
              pq[existingIndex].key = neighbor.weight;
              pq[existingIndex].parent = current.nodeId;
            } else {
              pq.push({ nodeId: neighbor.nodeId, key: neighbor.weight, parent: current.nodeId });
            }
            pq.sort((a, b) => a.key - b.key);
            setPriorityQueue([...pq]);
          }
        });
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        setCurrentOperation(`No adjacent nodes to update for node ${current.nodeId}`);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    setCurrentStep(7);
    setCurrentNode(null);
    setPriorityQueue([]);
    setCurrentOperation(
      `Prim's complete! MST has ${mstEdges.length} edges with total weight ${totalWeight}`
    );
    await new Promise(resolve => setTimeout(resolve, 2000));

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

            const isSelected = edge.selected || mstEdges.some(e => 
              (e.from === edge.from && e.to === edge.to) || 
              (e.from === edge.to && e.to === edge.from)
            );
            const isCandidate = edge.candidate;
            const isCurrent = currentNode !== null && 
              ((edge.from === currentNode && nodes.find(n => n.id === edge.to)?.inMst === false) ||
               (edge.to === currentNode && nodes.find(n => n.id === edge.from)?.inMst === false));

            let strokeColor = "#9CA3AF"; // Default gray
            let strokeWidth = "2";
            if (isSelected) {
              strokeColor = "#10B981"; // Green for MST
              strokeWidth = "4";
            } else if (isCandidate) {
              strokeColor = "#3B82F6"; // Blue for candidate
              strokeWidth = "3";
            } else if (isCurrent) {
              strokeColor = "#F59E0B"; // Orange for current
              strokeWidth = "3";
            }

            return (
              <g key={index}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className="transition-all duration-300"
                />
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 5}
                  textAnchor="middle"
                  fill={isSelected ? "#059669" : "#374151"}
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
            const isInMst = node.inMst;
            const isCurrent = currentNode === node.id;

            let fillColor = "#6B7280"; // Default gray
            if (isCurrent) fillColor = "#3B82F6"; // Blue for current
            else if (isInMst) fillColor = "#10B981"; // Green for MST
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
                {node.key !== undefined && (
                  <text
                    x={node.x + 30}
                    y={node.y - 10}
                    fill="#374151"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {node.key === Number.MAX_SAFE_INTEGER ? '∞' : `k:${node.key}`}
                  </text>
                )}
                {node.id === startNode && (
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
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-node-tree text-2xl text-teal-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Prim's Algorithm</h1>
              <p className="text-gray-600">Find Minimum Spanning Tree (MST) by growing from a start vertex using priority queue</p>
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
                    onClick={primsAlgorithm}
                    disabled={isAnimating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isAnimating ? 'Running...' : 'Run Prim\'s'}
                  </button>
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
                </div>
                <p className="text-sm text-gray-500 mt-2">Edge weights are shown on edges. Key values (k) show minimum edge weight to reach each node.</p>
              </div>

              {/* Graph Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Weighted Graph</h3>
                {renderGraph()}
                <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-green-500"></div>
                    <span>MST Edge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-blue-500"></div>
                    <span>In MST</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-gray-400"></div>
                    <span>Not in MST</span>
                  </div>
                </div>
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
                          className="flex flex-col items-center bg-teal-500 text-white rounded-lg p-2 min-w-[60px]"
                        >
                          <div className="text-lg font-bold">{item.nodeId}</div>
                          <div className="text-xs opacity-90">k:{item.key === Number.MAX_SAFE_INTEGER ? '∞' : item.key}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Sorted by key (minimum first)</p>
                  </div>
                </div>
              )}

              {/* Key Values */}
              {nodes.some(n => n.key !== undefined) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Values</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {nodes.map(node => (
                        <div key={node.id} className="text-center">
                          <div className="text-xs text-gray-500 mb-1">Node {node.id}</div>
                          <div className={`text-sm font-bold px-3 py-2 rounded ${
                            node.inMst
                              ? 'bg-green-100 text-green-800'
                              : node.key === Number.MAX_SAFE_INTEGER
                              ? 'bg-gray-200 text-gray-600'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {node.key === undefined ? '-' : node.key === Number.MAX_SAFE_INTEGER ? '∞' : node.key}
                          </div>
                          {node.parent !== undefined && node.parent !== -1 && (
                            <div className="text-xs text-gray-500 mt-1">p:{node.parent}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MST Summary */}
              {mstEdges.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Minimum Spanning Tree</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {mstEdges.map((edge, index) => (
                          <span key={index} className="px-3 py-1 bg-green-600 text-white rounded font-mono text-sm font-bold">
                            ({edge.from},{edge.to}): {edge.weight}
                          </span>
                        ))}
                      </div>
                      <div className="text-lg font-bold text-green-800 mt-3">
                        Total Weight: {totalWeight}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        MST has {mstEdges.length} edges (V-1 = {nodes.length - 1})
                      </div>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Prim's Algorithm Steps</h3>
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
                  {selectedLanguage === 'javascript' && `// JavaScript Prim's Algorithm - O(E log V)
function prims(graph, start, n) {
    const keys = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    const parent = new Array(n).fill(-1);
    const inMst = new Array(n).fill(false);
    const pq = []; // Priority queue
    
    keys[start] = 0;
    pq.push({ node: start, key: 0 });
    pq.sort((a, b) => a.key - b.key);
    
    while (pq.length > 0) {
        const { node: u } = pq.shift();
        
        if (inMst[u]) continue;
        inMst[u] = true;
        
        // Update keys of adjacent vertices
        for (const neighbor in graph[u]) {
            const v = parseInt(neighbor);
            const weight = graph[u][v];
            
            if (!inMst[v] && weight < keys[v]) {
                keys[v] = weight;
                parent[v] = u;
                
                // Update priority queue
                const index = pq.findIndex(item => item.node === v);
                if (index !== -1) {
                    pq[index].key = weight;
                } else {
                    pq.push({ node: v, key: weight });
                }
                pq.sort((a, b) => a.key - b.key);
            }
        }
    }
    
    return { keys, parent };
}`}
                  {selectedLanguage === 'python' && `# Python Prim's Algorithm - O(E log V)
import heapq

def prims(graph, start, n):
    keys = [float('inf')] * n
    parent = [-1] * n
    in_mst = [False] * n
    pq = []  # Priority queue
    
    keys[start] = 0
    heapq.heappush(pq, (0, start))
    
    while pq:
        key, u = heapq.heappop(pq)
        
        if in_mst[u]:
            continue
        
        in_mst[u] = True
        
        # Update keys of adjacent vertices
        for v, weight in graph[u].items():
            if not in_mst[v] and weight < keys[v]:
                keys[v] = weight
                parent[v] = u
                heapq.heappush(pq, (weight, v))
    
    return keys, parent`}
                  {selectedLanguage === 'java' && `// Java Prim's Algorithm - O(E log V)
import java.util.*;

public class Prims {
    public static int[] prims(int[][] graph, int start, int n) {
        int[] keys = new int[n];
        int[] parent = new int[n];
        boolean[] inMst = new boolean[n];
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(a[1], b[1])
        );
        
        Arrays.fill(keys, Integer.MAX_VALUE);
        Arrays.fill(parent, -1);
        keys[start] = 0;
        pq.offer(new int[]{start, 0});
        
        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int u = current[0];
            
            if (inMst[u]) continue;
            inMst[u] = true;
            
            // Update keys of adjacent vertices
            for (int v = 0; v < n; v++) {
                if (graph[u][v] != 0 && !inMst[v] && 
                    graph[u][v] < keys[v]) {
                    keys[v] = graph[u][v];
                    parent[v] = u;
                    pq.offer(new int[]{v, keys[v]});
                }
            }
        }
        
        return parent;
    }
}`}
                  {selectedLanguage === 'cpp' && `// C++ Prim's Algorithm - O(E log V)
#include <vector>
#include <queue>
#include <climits>
using namespace std;

vector<int> prims(vector<vector<int>>& graph, int start, int n) {
    vector<int> keys(n, INT_MAX);
    vector<int> parent(n, -1);
    vector<bool> inMst(n, false);
    priority_queue<pair<int, int>, vector<pair<int, int>>, 
                   greater<pair<int, int>>> pq;
    
    keys[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        if (inMst[u]) continue;
        inMst[u] = true;
        
        // Update keys of adjacent vertices
        for (int v = 0; v < n; v++) {
            if (graph[u][v] != 0 && !inMst[v] && 
                graph[u][v] < keys[v]) {
                keys[v] = graph[u][v];
                parent[v] = u;
                pq.push({keys[v], v});
            }
        }
    }
    
    return parent;
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
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(E log V)</span>
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
                      <span>Key Array:</span>
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

            {/* Prim's Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prim's Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Greedy algorithm</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Vertex-based approach</span>
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
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Always finds minimum spanning tree</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Similar to Dijkstra's algorithm</span>
                </div>
              </div>
            </div>

            {/* When to Use Prim */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use Prim</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Dense Graphs</h4>
                  <p className="text-sm text-gray-700">When graph has many edges (E ≈ V²)</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Network Design</h4>
                  <p className="text-sm text-gray-700">Designing minimum cost networks</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Connected Components</h4>
                  <p className="text-sm text-gray-700">Finding MST of connected graph</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Clustering</h4>
                  <p className="text-sm text-gray-700">Hierarchical clustering algorithms</p>
                </div>
              </div>
            </div>

            {/* Prim vs Kruskal */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prim vs Kruskal</h3>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Prim</div>
                  <div className="text-gray-600">Vertex-based, grows MST from start, better for dense graphs</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Kruskal</div>
                  <div className="text-gray-600">Edge-based, sorts all edges, better for sparse graphs</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Time Complexity</div>
                  <div className="text-gray-600">Both: O(E log V) with binary heap</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Data Structure</div>
                  <div className="text-gray-600">Prim: Priority Queue | Kruskal: Union-Find</div>
                </div>
              </div>
            </div>

            {/* Key Concept */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Concept</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
{`Key Idea:
- Maintain a key for each vertex
- Key = minimum weight edge connecting
  vertex to MST
- Always add vertex with minimum key
- Update keys of adjacent vertices

Greedy Choice:
At each step, add the vertex with
minimum key value to MST`}
                </pre>
              </div>
            </div>

            {/* Common Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Applications</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">Network design and optimization</div>
                <div className="p-2 bg-gray-50 rounded">Clustering and data analysis</div>
                <div className="p-2 bg-gray-50 rounded">Circuit board design</div>
                <div className="p-2 bg-gray-50 rounded">Approximation algorithms</div>
                <div className="p-2 bg-gray-50 rounded">Image segmentation</div>
                <div className="p-2 bg-gray-50 rounded">Minimum cost spanning trees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
