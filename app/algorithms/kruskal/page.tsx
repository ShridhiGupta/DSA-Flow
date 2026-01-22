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
  selected?: boolean;
  rejected?: boolean;
}

interface UnionFind {
  parent: number[];
  rank: number[];
}

export default function KruskalPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [sortedEdges, setSortedEdges] = useState<GraphEdge[]>([]);
  const [mstEdges, setMstEdges] = useState<GraphEdge[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentEdge, setCurrentEdge] = useState<GraphEdge | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [unionFind, setUnionFind] = useState<UnionFind>({ parent: [], rank: [] });
  const [totalWeight, setTotalWeight] = useState(0);

  const steps = [
    'Sort all edges by weight (ascending)',
    'Initialize Union-Find data structure',
    'Iterate through sorted edges',
    'Check if adding edge creates a cycle',
    'If no cycle, add edge to MST',
    'Update Union-Find after adding edge',
    'Continue until V-1 edges added'
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
    setSortedEdges([]);
    setMstEdges([]);
    setCurrentEdge(null);
    setCurrentStep(0);
    setCurrentOperation('');
    setUnionFind({ parent: [], rank: [] });
    setTotalWeight(0);
  };

  const find = (uf: UnionFind, x: number): number => {
    if (uf.parent[x] !== x) {
      uf.parent[x] = find(uf, uf.parent[x]); // Path compression
    }
    return uf.parent[x];
  };

  const union = (uf: UnionFind, x: number, y: number): boolean => {
    const rootX = find(uf, x);
    const rootY = find(uf, y);

    if (rootX === rootY) {
      return false; // Already in same set (creates cycle)
    }

    // Union by rank
    if (uf.rank[rootX] < uf.rank[rootY]) {
      uf.parent[rootX] = rootY;
    } else if (uf.rank[rootX] > uf.rank[rootY]) {
      uf.parent[rootY] = rootX;
    } else {
      uf.parent[rootY] = rootX;
      uf.rank[rootX]++;
    }

    return true; // Successfully merged
  };

  const kruskalAlgorithm = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setMstEdges([]);
    setCurrentEdge(null);
    setCurrentOperation('');
    setTotalWeight(0);

    // Reset edge states
    setEdges(edges.map(edge => ({ ...edge, selected: false, rejected: false })));

    // Step 1: Sort edges by weight
    setCurrentStep(1);
    const sorted = [...edges].sort((a, b) => a.weight - b.weight);
    setSortedEdges([...sorted]);
    setCurrentOperation(`Sorted ${sorted.length} edges by weight: [${sorted.map(e => e.weight).join(', ')}]`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 2: Initialize Union-Find
    setCurrentStep(2);
    const uf: UnionFind = {
      parent: nodes.map((_, i) => i),
      rank: new Array(nodes.length).fill(0)
    };
    setUnionFind({ ...uf });
    setCurrentOperation(`Initialized Union-Find: each node is its own parent`);
    await new Promise(resolve => setTimeout(resolve, 1200));

    const mst: GraphEdge[] = [];
    let edgesAdded = 0;
    const targetEdges = nodes.length - 1;

    // Step 3-7: Process edges
    for (let i = 0; i < sorted.length && edgesAdded < targetEdges; i++) {
      const edge = sorted[i];
      setCurrentStep(3);
      setCurrentEdge(edge);
      setCurrentOperation(`Processing edge (${edge.from}, ${edge.to}) with weight ${edge.weight}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if adding this edge creates a cycle
      setCurrentStep(4);
      const rootFrom = find(uf, edge.from);
      const rootTo = find(uf, edge.to);
      setCurrentOperation(
        `Checking cycle: find(${edge.from}) = ${rootFrom}, find(${edge.to}) = ${rootTo}`
      );
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (rootFrom === rootTo) {
        // Creates a cycle, reject edge
        setEdges(prevEdges => prevEdges.map(e =>
          e.from === edge.from && e.to === edge.to ? { ...e, rejected: true } : e
        ));
        setCurrentOperation(
          `Edge rejected: nodes ${edge.from} and ${edge.to} are in same set (would create cycle)`
        );
        await new Promise(resolve => setTimeout(resolve, 1200));
      } else {
        // No cycle, add to MST
        setCurrentStep(5);
        const merged = union(uf, edge.from, edge.to);
        if (merged) {
          mst.push(edge);
          edgesAdded++;
          setMstEdges([...mst]);
          setUnionFind({ ...uf });
          setTotalWeight(mst.reduce((sum, e) => sum + e.weight, 0));
          
          setEdges(prevEdges => prevEdges.map(e =>
            e.from === edge.from && e.to === edge.to ? { ...e, selected: true } : e
          ));
          
          setCurrentStep(6);
          setCurrentOperation(
            `Edge added to MST! Union-Find updated. MST edges: ${edgesAdded}/${targetEdges}`
          );
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
    }

    setCurrentStep(7);
    setCurrentEdge(null);
    setCurrentOperation(
      `Kruskal complete! MST has ${mst.length} edges with total weight ${totalWeight}`
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

            const isSelected = edge.selected || mstEdges.some(e => e.from === edge.from && e.to === edge.to);
            const isRejected = edge.rejected;
            const isCurrent = currentEdge && currentEdge.from === edge.from && currentEdge.to === edge.to;

            let strokeColor = "#9CA3AF"; // Default gray
            let strokeWidth = "2";
            if (isSelected) {
              strokeColor = "#10B981"; // Green for MST
              strokeWidth = "4";
            } else if (isRejected) {
              strokeColor = "#EF4444"; // Red for rejected
              strokeWidth = "2";
            } else if (isCurrent) {
              strokeColor = "#3B82F6"; // Blue for current
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
                  strokeDasharray={isRejected ? "5,5" : "0"}
                  className="transition-all duration-300"
                />
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 5}
                  textAnchor="middle"
                  fill={isSelected ? "#059669" : isRejected ? "#DC2626" : "#374151"}
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
            const isInMst = mstEdges.some(e => e.from === node.id || e.to === node.id);
            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill={isInMst ? "#10B981" : "#6B7280"}
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-git-merge-line text-2xl text-green-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Kruskal's Algorithm</h1>
              <p className="text-gray-600">Find Minimum Spanning Tree (MST) by sorting edges and using Union-Find to avoid cycles</p>
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
                    onClick={kruskalAlgorithm}
                    disabled={isAnimating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {isAnimating ? 'Running...' : 'Run Kruskal'}
                  </button>
                </div>
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
                    <div className="w-4 h-1 bg-red-500"></div>
                    <span>Rejected (Cycle)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-blue-500"></div>
                    <span>Current Edge</span>
                  </div>
                </div>
              </div>

              {/* Sorted Edges */}
              {sortedEdges.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sorted Edges (by weight)</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {sortedEdges.map((edge, index) => {
                        const isSelected = mstEdges.some(e => e.from === edge.from && e.to === edge.to);
                        const isRejected = edge.rejected;
                        const isCurrent = currentEdge && currentEdge.from === edge.from && currentEdge.to === edge.to;
                        
                        return (
                          <div
                            key={index}
                            className={`px-3 py-2 rounded-lg font-mono text-sm font-bold ${
                              isSelected
                                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                                : isRejected
                                ? 'bg-red-100 text-red-800 border-2 border-red-500'
                                : isCurrent
                                ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                                : 'bg-white text-gray-700 border border-gray-300'
                            }`}
                          >
                            ({edge.from},{edge.to}): {edge.weight}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Union-Find Visualization */}
              {unionFind.parent.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Union-Find Structure</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {nodes.map(node => {
                        const root = unionFind.parent.length > 0 ? find({ ...unionFind }, node.id) : node.id;
                        return (
                          <div key={node.id} className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Node {node.id}</div>
                            <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded font-mono text-sm font-bold">
                              Parent: {unionFind.parent[node.id]}
                            </div>
                            <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded font-mono text-xs mt-1">
                              Root: {root}
                            </div>
                          </div>
                        );
                      })}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Kruskal's Algorithm Steps</h3>
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
                  {selectedLanguage === 'javascript' && `// JavaScript Kruskal's Algorithm - O(E log E)
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false; // Creates cycle
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        return true;
    }
}

function kruskal(edges, n) {
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);
    
    const uf = new UnionFind(n);
    const mst = [];
    let edgesAdded = 0;
    
    for (const edge of edges) {
        if (edgesAdded === n - 1) break;
        
        if (uf.union(edge.from, edge.to)) {
            mst.push(edge);
            edgesAdded++;
        }
    }
    
    return mst;
}`}
                  {selectedLanguage === 'python' && `# Python Kruskal's Algorithm - O(E log E)
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return False  # Creates cycle
        
        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        return True

def kruskal(edges, n):
    # Sort edges by weight
    edges.sort(key=lambda x: x['weight'])
    
    uf = UnionFind(n)
    mst = []
    edges_added = 0
    
    for edge in edges:
        if edges_added == n - 1:
            break
        
        if uf.union(edge['from'], edge['to']):
            mst.append(edge)
            edges_added += 1
    
    return mst`}
                  {selectedLanguage === 'java' && `// Java Kruskal's Algorithm - O(E log E)
import java.util.*;

class UnionFind {
    private int[] parent;
    private int[] rank;
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }
    
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) return false; // Creates cycle
        
        // Union by rank
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        return true;
    }
}

public class Kruskal {
    public static List<int[]> kruskal(List<int[]> edges, int n) {
        // Sort edges by weight
        edges.sort((a, b) -> Integer.compare(a[2], b[2]));
        
        UnionFind uf = new UnionFind(n);
        List<int[]> mst = new ArrayList<>();
        int edgesAdded = 0;
        
        for (int[] edge : edges) {
            if (edgesAdded == n - 1) break;
            
            if (uf.union(edge[0], edge[1])) {
                mst.add(edge);
                edgesAdded++;
            }
        }
        
        return mst;
    }
}`}
                  {selectedLanguage === 'cpp' && `// C++ Kruskal's Algorithm - O(E log E)
#include <vector>
#include <algorithm>
using namespace std;

class UnionFind {
private:
    vector<int> parent;
    vector<int> rank;
    
public:
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    bool unionSet(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) return false; // Creates cycle
        
        // Union by rank
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        return true;
    }
};

vector<vector<int>> kruskal(vector<vector<int>>& edges, int n) {
    // Sort edges by weight
    sort(edges.begin(), edges.end(), 
         [](const vector<int>& a, const vector<int>& b) {
             return a[2] < b[2];
         });
    
    UnionFind uf(n);
    vector<vector<int>> mst;
    int edgesAdded = 0;
    
    for (const auto& edge : edges) {
        if (edgesAdded == n - 1) break;
        
        if (uf.unionSet(edge[0], edge[1])) {
            mst.push_back(edge);
            edgesAdded++;
        }
    }
    
    return mst;
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
                      <span>Sorting edges:</span>
                      <span className="font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded">O(E log E)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Union-Find operations:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(E α(V))</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(E log E)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Space Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Union-Find:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(V)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MST storage:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(V)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kruskal Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kruskal's Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Greedy algorithm</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Works with any graph (connected)</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Uses Union-Find to detect cycles</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Optimal for sparse graphs</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Always finds minimum spanning tree</span>
                </div>
              </div>
            </div>

            {/* When to Use Kruskal */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use Kruskal</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Sparse Graphs</h4>
                  <p className="text-sm text-gray-700">When graph has few edges (E ≈ V)</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Network Design</h4>
                  <p className="text-sm text-gray-700">Designing minimum cost networks</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Clustering</h4>
                  <p className="text-sm text-gray-700">Finding clusters in data</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-1">Circuit Design</h4>
                  <p className="text-sm text-gray-700">Minimum wire length in circuits</p>
                </div>
              </div>
            </div>

            {/* Kruskal vs Prim */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kruskal vs Prim</h3>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Kruskal</div>
                  <div className="text-gray-600">Edge-based, sorts all edges, better for sparse graphs</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Prim</div>
                  <div className="text-gray-600">Vertex-based, uses priority queue, better for dense graphs</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Time Complexity</div>
                  <div className="text-gray-600">Both: O(E log E) or O(E log V)</div>
                </div>
              </div>
            </div>

            {/* Union-Find Explanation */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Union-Find (Disjoint Set)</h3>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Find Operation</div>
                  <div className="text-gray-600">Finds root of a node with path compression</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Union Operation</div>
                  <div className="text-gray-600">Merges two sets using union by rank</div>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="font-semibold mb-1">Cycle Detection</div>
                  <div className="text-gray-600">If find(u) == find(v), adding edge creates cycle</div>
                </div>
              </div>
            </div>

            {/* Common Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Applications</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">Network design and optimization</div>
                <div className="p-2 bg-gray-50 rounded">Clustering algorithms</div>
                <div className="p-2 bg-gray-50 rounded">Circuit board design</div>
                <div className="p-2 bg-gray-50 rounded">Image segmentation</div>
                <div className="p-2 bg-gray-50 rounded">Approximation algorithms</div>
                <div className="p-2 bg-gray-50 rounded">Minimum cost spanning trees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
