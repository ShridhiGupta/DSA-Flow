'use client';

import { link } from 'fs';
import Link from 'next/link';
import { useState } from 'react';

export default function SWE180() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const problems = [
    // Arrays - Basic
    { id: 1, title: "Set Matrix Zeros", category: "Arrays - Basic", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/set-matrix-zeroes/" },
    { id: 2, title: "Pascal's Triangle", category: "Arrays - Basic", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/pascals-triangle/" },
    { id: 3, title: "Next Permutation", category: "Arrays - Basic", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/next-permutation/" },
    { id: 4, title: "Kadane's Algorithm", category: "Arrays - Basic", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/maximum-subarray/" },
    { id: 5, title: "Sort an array of 0's, 1's and 2's", category: "Arrays - Basic", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/sort-colors/" },
    { id: 6, title: "Stock Buy and Sell", category: "Arrays - Basic", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },

    // Arrays - Part-II
    { id: 7, title: "Rotate Matrix", category: "Arrays - Part-II", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/rotate-image/" },
    { id: 8, title: "Merge Overlapping Subintervals", category: "Arrays - Part-II", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/merge-intervals/" },
    { id: 9, title: "Merge two sorted arrays without extra space", category: "Arrays - Part-II", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/merge-sorted-array/" },
    { id: 10, title: "Find duplicate in an array of N+1 integers", category: "Arrays - Part-II", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/find-the-duplicate-number/" },
    { id: 11, title: "Repeat and Missing Number", category: "Arrays - Part-II", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/find-the-duplicate-number/" },
    { id: 12, title: "Inversion of Array (Pre-req: Merge Sort)", category: "Arrays - Part-II", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/reverse-pairs/" },

    // Arrays - Part-III
    { id: 13, title: "Search in a 2D Matrix", category: "Arrays - Part-III", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/search-a-2d-matrix/" },
    { id: 14, title: "Pow(x, n)", category: "Arrays - Part-III", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/powx-n/" },
    { id: 15, title: "Majority Element (>n/2 times)", category: "Arrays - Part-III", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/majority-element/" },
    { id: 16, title: "Majority Element (n/3 times)", category: "Arrays - Part-III", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/majority-element-ii/" },
    { id: 17, title: "Grid Unique Paths", category: "Arrays - Part-III", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/unique-paths/" },
    { id: 18, title: "Reverse Pairs (Leetcode)", category: "Arrays - Part-III", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/reverse-pairs/" },

    // Arrays - Part-IV
    { id: 19, title: "2Sum Problem", category: "Arrays - Part-IV", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/two-sum/" },
    { id: 20, title: "4-Sum Problem", category: "Arrays - Part-IV", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/4sum/" },
    { id: 21, title: "Longest Consecutive Sequence", category: "Arrays - Part-IV", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/longest-consecutive-sequence/" },
    { id: 22, title: "Largest Subarray with K Sum", category: "Arrays - Part-IV", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/subarray-sum-equals-k/" },
    { id: 23, title: "Count Number of Subarrays with Given XOR K", category: "Arrays - Part-IV", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/subarray-sum-equals-k/" },
    { id: 24, title: "Longest Substring Without Repeat", category: "Arrays - Part-IV", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },

    // Linked List
    { id: 25, title: "Reverse a Linked List", category: "Linked List", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/reverse-linked-list/" },
    { id: 26, title: "Find Middle of Linked List", category: "Linked List", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/middle-of-the-linked-list/" },
    { id: 27, title: "Merge Two Sorted Linked Lists (Merge Sort Method)", category: "Linked List", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { id: 28, title: "Remove N-th Node from Back of Linked List", category: "Linked List", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
    { id: 29, title: "Add Two Numbers as Linked List", category: "Linked List", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/add-two-numbers/" },
    { id: 30, title: "Delete a Given Node in O(1) Time", category: "Linked List", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/delete-node-in-a-linked-list/" },

    // Linked List - Part-II
    { id: 31, title: "Find Intersection Point of Y Linked List", category: "Linked List - Part-II", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
    { id: 32, title: "Detect a Cycle in Linked List", category: "Linked List - Part-II", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/linked-list-cycle/" },
    { id: 33, title: "Reverse a Linked List in Groups of Size K", category: "Linked List - Part-II", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
    { id: 34, title: "Check if a Linked List Is Palindrome", category: "Linked List - Part-II", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/palindrome-linked-list/" },
    { id: 35, title: "Find Starting Point of Loop in Linked List", category: "Linked List - Part-II", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/linked-list-cycle-ii/" },
    { id: 36, title: "Flattening of a Linked List", category: "Linked List - Part-II", difficulty: "Hard", solved: false, link: "https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1" },

    // Linked List & Arrays
    { id: 37, title: "Rotate a Linked List", category: "Linked List & Arrays", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/rotate-list/" },
    { id: 38, title: "Clone a Linked List with Random and Next Pointer", category: "Linked List & Arrays", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
    { id: 39, title: "3 Sum", category: "Linked List & Arrays", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/3sum/" },
    { id: 40, title: "Trapping Rainwater", category: "Linked List & Arrays", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/trapping-rain-water/" },
    { id: 41, title: "Remove Duplicate from Sorted Array", category: "Linked List & Arrays", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
    { id: 42, title: "Max Consecutive Ones", category: "Linked List & Arrays", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/max-consecutive-ones/" },

    // Greedy Algorithm
    { id: 43, title: "N Meetings in One Room", category: "Greedy Algorithm", difficulty: "Easy", solved: false, link: "https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1" },
    { id: 44, title: "Minimum Number of Platforms Required for a Railway", category: "Greedy Algorithm", difficulty: "Easy", solved: false, link: "https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1" },
    { id: 45, title: "Job Sequencing Problem", category: "Greedy Algorithm", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1" },
    { id: 46, title: "Fractional Knapsack Problem", category: "Greedy Algorithm", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1" },
    { id: 47, title: "Greedy Algorithm to Find Minimum Number of Coins", category: "Greedy Algorithm", difficulty: "Easy", solved: false, link: "https://practice.geeksforgeeks.org/problems/number-of-coins-1587115620/1" },
    { id: 48, title: "Assign Cookies", category: "Greedy Algorithm", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/assign-cookies/" },

    // Recursion
    { id: 49, title: "Subset Sums", category: "Recursion", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/subset-sums-1664434322/1" },
    { id: 50, title: "Subset II", category: "Recursion", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/subsets-ii/" },
    { id: 51, title: "Combination Sum I", category: "Recursion", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/combination-sum/" },
    { id: 52, title: "Combination Sum II", category: "Recursion", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/combination-sum-ii/" },
    { id: 53, title: "Palindrome Partitioning", category: "Recursion", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/palindrome-partitioning/" },
    { id: 54, title: "K-th Permutation Sequence", category: "Recursion", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/permutation-sequence/" },

    // Recursion & Backtracking
    { id: 55, title: "Print All Permutations of a String/Array", category: "Recursion & Backtracking", difficulty: "Medium", solved: false , link: "https://leetcode.com/problems/permutations/" },
    { id: 56, title: "N-Queens Problem", category: "Recursion & Backtracking", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/n-queens/" },
    { id: 57, title: "Sudoku Solver", category: "Recursion & Backtracking", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/sudoku-solver/" },
    { id: 58, title: "M-Coloring Problem", category: "Recursion & Backtracking", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1" },
    { id: 59, title: "Rat in a Maze", category: "Recursion & Backtracking", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/rat-in-a-maze-problem/1" },
    { id: 60, title: "Word Break (Print All Ways)", category: "Recursion & Backtracking", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/word-break-ii/" },

    // Binary Search
    { id: 61, title: "The N-th Root of an Integer", category: "Binary Search", difficulty: "Easy", solved: false, link: "https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1" },
    { id: 62, title: "Matrix Median", category: "Binary Search", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/dsa/find-median-row-wise-sorted-matrix/" },
    { id: 63, title: "Find Element That Appears Once in a Sorted Array", category: "Binary Search", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/single-element-in-a-sorted-array/" },
    { id: 64, title: "Search Element in a Sorted and Rotated Array", category: "Binary Search", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { id: 65, title: "Median of Two Sorted Arrays", category: "Binary Search", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
    { id: 66, title: "K-th Element of Two Sorted Arrays", category: "Binary Search", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/" },
    { id: 67, title: "Allocate Minimum Number of Pages", category: "Binary Search", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/allocate-minimum-number-of-pages/" },
    { id: 68, title: "Aggressive Cows", category: "Binary Search", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/maximum-number-of-achievable-x/" },

    // Heaps
    { id: 69, title: "Max Heap and Min Heap Implementation (Interview Only)", category: "Heaps", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/heap-data-structure/" },
    { id: 70, title: "Kth Largest Element", category: "Heaps", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
    { id: 71, title: "Maximum Sum Combination", category: "Heaps", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/maximum-sum-combination/" },
    { id: 72, title: "Find Median from Data Stream", category: "Heaps", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/find-median-from-data-stream/" },
    { id: 73, title: "Merge K Sorted Arrays", category: "Heaps", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/merge-k-sorted-arrays/" },
    { id: 74, title: "K Most Frequent Elements", category: "Heaps", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/top-k-frequent-elements/" },

    // Stack & Queue
    { id: 75, title: "Implement Stack Using Arrays", category: "Stack & Queue", difficulty: "Easy", solved: false, link: "https://www.geeksforgeeks.org/problems/implement-stack-using-array/1" },
    { id: 76, title: "Implement Queue Using Arrays", category: "Stack & Queue", difficulty: "Easy", solved: false, link: "https://www.geeksforgeeks.org/problems/implement-queue-using-array/1" },
    { id: 77, title: "Implement Stack Using Queue (Single Queue)", category: "Stack & Queue", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/problems/stack-using-two-queues/1" },
    { id: 78, title: "Implement Queue Using Stack (O(1) Amortized)", category: "Stack & Queue", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1" },
    { id: 79, title: "Check for Balanced Parentheses", category: "Stack & Queue", difficulty: "Easy", solved: false, link: "https://www.geeksforgeeks.org/problems/parenthesis-checker/1" },
    { id: 80, title: "Next Greater Element", category: "Stack & Queue", difficulty: "Easy", solved: false, link: "https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1" },
    { id: 81, title: "Sort a Stack", category: "Stack & Queue", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/problems/sort-a-stack/1" },

    // Stack & Queue - Part-II
    { id: 82, title: "Next Smaller Element", category: "Stack & Queue - Part-II", difficulty: "Easy", solved: false, link: "https://www.geeksforgeeks.org/problems/next-smaller-element-1587115620/1" },
    { id: 83, title: "LRU Cache", category: "Stack & Queue - Part-II", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/problems/lru-cache/1" },
    { id: 84, title: "LFU Cache", category: "Stack & Queue - Part-II", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/problems/lfu-cache/1" },
    { id: 85, title: "Largest Rectangle in a Histogram", category: "Stack & Queue - Part-II", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/problems/largest-rectangle-in-histogram/1" },
    { id: 86, title: "Sliding Window Maximum", category: "Stack & Queue - Part-II", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1" },
    { id: 87, title: "Implement Min Stack", category: "Stack & Queue - Part-II", difficulty: "Easy", solved: false, link: "https://www.geeksforgeeks.org/problems/minimum-element-in-stack/1" },
    { id: 88, title: "Rotten Oranges (Using BFS)", category: "Stack & Queue - Part-II", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/problems/rotten-oranges/1" },
    { id: 89, title: "Stock Span Problem", category: "Stack & Queue - Part-II", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1" },
    { id: 90, title: "Find the Maximum of Minimums of Every Window Size", category: "Stack & Queue - Part-II", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/problems/maximum-of-minimum-for-every-window-size3453/1" },
    { id: 91, title: "The Celebrity Problem", category: "Stack & Queue - Part-II", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/problems/the-celebrity-problem/1" },

    // String
    { id: 92, title: "Reverse Words in a String", category: "String", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/reverse-words-in-a-string/" },
    { id: 93, title: "Longest Palindromic Substring", category: "String", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { id: 94, title: "Roman Number to Integer and Vice Versa", category: "String", difficulty: "Easy", solved: false, link: "https://www.geeksforgeeks.org/problems/roman-number-to-integer/1" },
    { id: 95, title: "Implement ATOI / STRSTR", category: "String", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/problems/implement-atoi/1" },
    { id: 96, title: "Longest Common Prefix", category: "String", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/longest-common-prefix/" },
    { id: 97, title: "Rabin–Karp Algorithm", category: "String", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/" },

    // String - Part-II
    { id: 98, title: "Z-Function", category: "String - Part-II", difficulty: "Hard", solved: false, link: "https://cp-algorithms.com/string/z-function.html" },
    { id: 99, title: "KMP Algorithm / LPS (Pi) Array", category: "String - Part-II", difficulty: "Hard", solved: false, link: "https://cp-algorithms.com/string/prefix-function.html" },
    { id: 100, title: "Minimum Characters Needed to Be Inserted at the Beginning to Make a String Palindromic", category: "String - Part-II", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/minimum-characters-to-be-added-at-front-to-make-string-palindrome/" },
    { id: 101, title: "Check for Anagrams", category: "String - Part-II", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/valid-anagram/" },
    { id: 102, title: "Count and Say", category: "String - Part-II", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/count-and-say/" },
    { id: 103, title: "Compare Version Numbers", category: "String - Part-II", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/compare-version-numbers/" },

    // Binary Tree
    { id: 104, title: "Inorder Traversal", category: "Binary Tree", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
    { id: 105, title: "Preorder Traversal", category: "Binary Tree", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/binary-tree-preorder-traversal/" },
    { id: 106, title: "Postorder Traversal", category: "Binary Tree", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/binary-tree-postorder-traversal/" },
    { id: 107, title: "Morris Inorder Traversal", category: "Binary Tree", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/morris-traversal-for-preorder/" },
    { id: 108, title: "Morris Preorder Traversal", category: "Binary Tree", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/morris-traversal-for-preorder/" },
    { id: 109, title: "Left View of Binary Tree", category: "Binary Tree", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/left-view-of-binary-tree/1" },
    { id: 110, title: "Bottom View of Binary Tree", category: "Binary Tree", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1" },
    { id: 111, title: "Top View of Binary Tree", category: "Binary Tree", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/top-view-of-binary-tree/1" },
    { id: 112, title: "Preorder, Inorder, Postorder in a Single Traversal", category: "Binary Tree", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/iterative-postorder-traversal-using-stack/" },
    { id: 113, title: "Vertical Order Traversal", category: "Binary Tree", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/" },
    { id: 114, title: "Root to Node Path in Binary Tree", category: "Binary Tree", difficulty: "Medium", solved: false, link: "https://www.geeksforgeeks.org/root-to-leaf-path-sum-equal-to-a-given-number/" },
    { id: 115, title: "Max Width of a Binary Tree", category: "Binary Tree", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/maximum-width-of-tree/1" },

    // Binary Tree - Part-II
    { id: 116, title: "Level Order Traversal / Level Order Traversal in Spiral Form", category: "Binary Tree - Part-II", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/level-order-traversal/1" },
    { id: 117, title: "Height of a Binary Tree", category: "Binary Tree - Part-II", difficulty: "Easy", solved: false, link: "https://practice.geeksforgeeks.org/problems/height-of-binary-tree/1" },
    { id: 118, title: "Diameter of Binary Tree", category: "Binary Tree - Part-II", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/diameter-of-binary-tree/1" },
    { id: 119, title: "Check if the Binary Tree is Height-Balanced", category: "Binary Tree - Part-II", difficulty: "Easy", solved: false, link: "https://practice.geeksforgeeks.org/problems/check-for-balanced-tree/1" },
    { id: 120, title: "LCA in Binary Tree", category: "Binary Tree - Part-II", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-binary-tree/1" },
    { id: 121, title: "Check if Two Trees Are Identical", category: "Binary Tree - Part-II", difficulty: "Easy", solved: false, link: "https://practice.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1" },
    { id: 122, title: "Zig Zag Traversal of Binary Tree", category: "Binary Tree - Part-II", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/zigzag-tree-traversal/1" },
    { id: 123, title: "Boundary Traversal of Binary Tree", category: "Binary Tree - Part-II", difficulty: "Hard", solved: false, link: "https://practice.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1" },

    // Binary Tree - Part-III
    { id: 124, title: "Maximum Path Sum", category: "Binary Tree - Part-III", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    { id: 125, title: "Construct Binary Tree from Inorder and Preorder", category: "Binary Tree - Part-III", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
    { id: 126, title: "Construct Binary Tree from Inorder and Postorder", category: "Binary Tree - Part-III", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/" },
    { id: 127, title: "Symmetric Binary Tree", category: "Binary Tree - Part-III", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/symmetric-tree/" },
    { id: 128, title: "Flatten Binary Tree to Linked List", category: "Binary Tree - Part-III", difficulty: "Hard", solved: false, link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/" },
    { id: 129, title: "Check if Binary Tree is the Mirror of Itself", category: "Binary Tree - Part-III", difficulty: "Easy", solved: false},
    { id: 130, title: "Check for Children Sum Property", category: "Binary Tree - Part-III", difficulty: "Easy", solved: false },

    // Binary Search Tree (BST)
    { id: 131, title: "Populate Next Right Pointers of Tree", category: "Binary Search Tree (BST)", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/"},
    { id: 132, title: "Search Given Key in BST", category: "Binary Search Tree (BST)", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
    { id: 133, title: "Construct BST from Given Keys", category: "Binary Search Tree (BST)", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/" },
    { id: 134, title: "Construct a BST from a Preorder Traversal", category: "Binary Search Tree (BST)", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/" },
    { id: 135, title: "Check if a Binary Tree is BST", category: "Binary Search Tree (BST)", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/validate-binary-search-tree/" },
    { id: 136, title: "Find LCA of Two Nodes in BST", category: "Binary Search Tree (BST)", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
    { id: 137, title: "Find Inorder Predecessor/Successor of a Given Key in BST", category: "Binary Search Tree (BST)", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/inorder-successor-in-bst/" },

    // BST - Part-II
    { id: 138, title: "Floor in a BST", category: "BST - Part-II", difficulty: "Medium", solved: false , link: "https://www.geeksforgeeks.org/problems/floor-in-bst/1"},
    { id: 139, title: "Ceil in a BST", category: "BST - Part-II", difficulty: "Medium", solved: false , link: "https://www.geeksforgeeks.org/problems/ceil-in-bst/1"},
    { id: 140, title: "Find K-th Smallest Element in BST", category: "BST - Part-II", difficulty: "Easy", solved: false , link: "https://www.geeksforgeeks.org/problems/find-k-th-smallest-element-in-bst/1"},
    { id: 141, title: "Find K-th Largest Element in BST", category: "BST - Part-II", difficulty: "Easy", solved: false , link: "https://www.geeksforgeeks.org/problems/find-k-th-largest-element-in-bst/1"},
    { id: 142, title: "Find a Pair with a Given Sum in BST", category: "BST - Part-II", difficulty: "Medium", solved: false , link: "https://www.geeksforgeeks.org/problems/find-pair-given-sum-bst/1"},
    { id: 143, title: "BST Iterator", category: "BST - Part-II", difficulty: "Medium", solved: false , link: "https://www.geeksforgeeks.org/problems/bst-iterator/1"},
    { id: 144, title: "Size of the Largest BST in a Binary Tree", category: "BST - Part-II", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/problems/size-of-largest-bst-subtree/1" },
    { id: 145, title: "Serialize and Deserialize Binary Tree", category: "BST - Part-II", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1" },

    // Binary Tree Miscellaneous
    { id: 146, title: "Binary Tree to Doubly Linked List", category: "Binary Tree Miscellaneous", difficulty: "Hard", solved: false , link: "https://practice.geeksforgeeks.org/problems/binary-tree-to-dll/1"},
    { id: 147, title: "Find Median in a Stream of Running Integers", category: "Binary Tree Miscellaneous", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1" },
    { id: 148, title: "K-th Largest Element in a Stream", category: "Binary Tree Miscellaneous", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/problems/kth-largest-element-in-a-stream-1587115620/1" },
    { id: 149, title: "Distinct Numbers in Window", category: "Binary Tree Miscellaneous", difficulty: "Hard", solved: false, link: "https://www.geeksforgeeks.org/problems/distinct-numbers-in-window/1" },
    { id: 150, title: "K-th Largest Element in an Unsorted Array", category: "Binary Tree Miscellaneous", difficulty: "Easy", solved: false, link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
    { id: 151, title: "Flood-Fill Algorithm", category: "Binary Tree Miscellaneous", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/flood-fill/" },

    // Graph
    { id: 152, title: "Clone a Graph", category: "Graph", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/clone-graph/" },
    { id: 153, title: "DFS", category: "Graph", difficulty: "Easy", solved: false, link: "https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1" },
    { id: 154, title: "BFS", category: "Graph", difficulty: "Easy", solved: false, link: "https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/1" },
    { id: 155, title: "Detect a Cycle in Undirected Graph using BFS", category: "Graph", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1" },
    { id: 156, title: "Detect a Cycle in Undirected Graph using DFS", category: "Graph", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1" },
    { id: 157, title: "Detect a Cycle in Directed Graph using DFS", category: "Graph", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1" },
    { id: 158, title: "Detect a Cycle in Directed Graph using BFS", category: "Graph", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1" },
    { id: 159, title: "Topological Sort BFS", category: "Graph", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/topological-sort/1" },
    { id: 160, title: "Topological Sort DFS", category: "Graph", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/topological-sort/1" },
    { id: 161, title: "Number of Islands (Grid & Graph)", category: "Graph", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/number-of-islands/" },
    { id: 162, title: "Bipartite Check using BFS", category: "Graph", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/bipartite-graph/1" },
    { id: 163, title: "Bipartite Check using DFS", category: "Graph", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/bipartite-graph/1" },

    // Graph - Part-II
    { id: 164, title: "Strongly Connected Components (Kosaraju's Algorithm)", category: "Graph - Part-II", difficulty: "Hard", solved: false, link: "https://practice.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1" },
    { id: 165, title: "Dijkstra's Algorithm", category: "Graph - Part-II", difficulty: "Hard", solved: false, link: "https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1" },
    { id: 166, title: "Bellman-Ford Algorithm", category: "Graph - Part-II", difficulty: "Hard", solved: false, link: "https://practice.geeksforgeeks.org/problems/negative-weight-cycle3504/1" },
    { id: 167, title: "Floyd–Warshall Algorithm", category: "Graph - Part-II", difficulty: "Hard", solved: false, link: "https://practice.geeksforgeeks.org/problems/implementing-floyd-warshall/0" },
    { id: 168, title: "MST using Prim's Algorithm", category: "Graph - Part-II", difficulty: "Hard", solved: false, link: "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
    { id: 169, title: "MST using Kruskal's Algorithm", category: "Graph - Part-II", difficulty: "Hard", solved: false, link: "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1" },

    // Dynamic Programming (DP)
    { id: 170, title: "Max Product Subarray", category: "Dynamic Programming (DP)", difficulty: "Medium", solved: false , link: "https://leetcode.com/problems/maximum-product-subarray/" },
    { id: 171, title: "Longest Increasing Subsequence", category: "Dynamic Programming (DP)", difficulty: "Medium", solved: false , link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
    { id: 172, title: "Longest Common Subsequence", category: "Dynamic Programming (DP)", difficulty: "Medium", solved: false , link: "https://leetcode.com/problems/longest-common-subsequence/" },
    { id: 173, title: "0-1 Knapsack", category: "Dynamic Programming (DP)", difficulty: "Medium", solved: false , link: "https://leetcode.com/problems/coin-change-2/" },
    { id: 174, title: "Edit Distance", category: "Dynamic Programming (DP)", difficulty: "Hard", solved: false , link: "https://leetcode.com/problems/edit-distance/" },
    { id: 175, title: "Maximum Sum Increasing Subsequence", category: "Dynamic Programming (DP)", difficulty: "Medium", solved: false , link: "https://practice.geeksforgeeks.org/problems/maximum-sum-increasing-subsequence4749/1" },
    { id: 176, title: "Matrix Chain Multiplication", category: "Dynamic Programming (DP)", difficulty: "Hard", solved: false, link: "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1" },

    // Dynamic Programming - Part-II
    { id: 177, title: "Minimum Sum Path in a Matrix (including path count & backtracking)", category: "Dynamic Programming - Part-II", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/minimum-path-sum/" },
    { id: 178, title: "Coin Change", category: "Dynamic Programming - Part-II", difficulty: "Medium", solved: false, link: "https://leetcode.com/problems/coin-change/" },
    { id: 179, title: "Subset Sum", category: "Dynamic Programming - Part-II", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/subset-sum-problem2014/1" },
    { id: 180, title: "Rod Cutting", category: "Dynamic Programming - Part-II", difficulty: "Medium", solved: false, link: "https://practice.geeksforgeeks.org/problems/rod-cutting0840/1" }
  ];

  const categories = [
    'all',
    'Arrays - Basic',
    'Arrays - Part-II',
    'Arrays - Part-III',
    'Arrays - Part-IV',
    'Linked List',
    'Linked List - Part-II',
    'Linked List & Arrays',
    'Greedy Algorithm',
    'Recursion',
    'Recursion & Backtracking',
    'Binary Search',
    'Heaps',
    'Stack & Queue',
    'Stack & Queue - Part-II',
    'String',
    'String - Part-II',
    'Binary Tree',
    'Binary Tree - Part-II',
    'Binary Tree - Part-III',
    'Binary Search Tree (BST)',
    'BST - Part-II',
    'Binary Tree Miscellaneous',
    'Graph',
    'Graph - Part-II',
    'Dynamic Programming (DP)',
    'Dynamic Programming - Part-II',
    'Trie'
  ];

  const filteredProblems = problems.filter(problem => {
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.id.toString().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressStats = () => {
    const total = problems.length;
    const solved = problems.filter(p => p.solved).length;
    const easy = problems.filter(p => p.difficulty === 'Easy' && p.solved).length;
    const medium = problems.filter(p => p.difficulty === 'Medium' && p.solved).length;
    const hard = problems.filter(p => p.difficulty === 'Hard' && p.solved).length;
    
    return { total, solved, easy, medium, hard };
  };

  const stats = getProgressStats();

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
            <nav className="flex space-x-8">
              <Link href="/data-structures" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer">
                Data Structures
              </Link>
              <Link href="/algorithms" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer">
                Algorithms
              </Link>
              <Link href="/practice" className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer">
                Practice
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/practice" className="text-gray-600 hover:text-indigo-600 mr-4">
              ← Back to Practice
            </Link>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-code-s-slash-line text-2xl text-purple-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">SWE-180</h1>
              <p className="text-xl text-gray-600">180 software engineering interview problems</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{stats.solved}/{stats.total}</div>
              <div className="text-gray-600 text-sm">Total Solved</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.solved / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{stats.easy}</div>
              <div className="text-gray-600 text-sm">Easy</div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mt-2">
                <i className="ri-check-line text-green-600"></i>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{stats.medium}</div>
              <div className="text-gray-600 text-sm">Medium</div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mt-2">
                <i className="ri-star-line text-orange-600"></i>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{stats.hard}</div>
              <div className="text-gray-600 text-sm">Hard</div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mt-2">
                <i className="ri-fire-line text-red-600"></i>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-600 text-sm">Days Active</div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mt-2">
                <i className="ri-calendar-line text-purple-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Problems</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by problem number or title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Problems ({filteredProblems.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredProblems.map((problem) => (
              <div key={problem.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-4">
                        {problem.solved ? (
                          <i className="ri-check-circle-fill text-green-600 mr-2"></i>
                        ) : (
                          <i className="ri-circle-line text-gray-400 mr-2"></i>
                        )}
                        <h4 className="text-lg font-semibold text-gray-900">
                          {problem.id}. {problem.title}
                        </h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>
                        <i className="ri-folder-line mr-1"></i>
                        {problem.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-6">
                    {problem.link && (
                      <a 
                        href={problem.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-external-link-line mr-2"></i>
                        Practice
                      </a>
                    )}
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
                      {problem.solved ? 'Review' : 'Start'}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                      <i className="ri-bookmark-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">SWE-180 Learning Path</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Order</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-start">
                  <i className="ri-number-1 text-purple-600 mr-2 mt-1"></i>
                  <span><strong>Arrays - Basic:</strong> Start with fundamental array operations and matrix problems</span>
                </p>
                <p className="flex items-start">
                  <i className="ri-number-2 text-purple-600 mr-2 mt-1"></i>
                  <span><strong>Arrays - Part-II:</strong> Advanced array manipulation and merging techniques</span>
                </p>
                <p className="flex items-start">
                  <i className="ri-number-3 text-purple-600 mr-2 mt-1"></i>
                  <span><strong>Linked List:</strong> Master pointer manipulation and node operations</span>
                </p>
                <p className="flex items-start">
                  <i className="ri-number-4 text-purple-600 mr-2 mt-1"></i>
                  <span><strong>Greedy & DP:</strong> Learn optimization strategies and dynamic programming</span>
                </p>
                <p className="flex items-start">
                  <i className="ri-number-5 text-purple-600 mr-2 mt-1"></i>
                  <span><strong>Trees & Graphs:</strong> Understand hierarchical data structures and algorithms</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Success Tips</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Focus on understanding the problem before coding</span>
                </p>
                <p className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Write clean, readable code with proper variable names</span>
                </p>
                <p className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Analyze time and space complexity for each solution</span>
                </p>
                <p className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Practice consistently - aim for 2-3 problems daily</span>
                </p>
                <p className="flex items-start">
                  <i className="ri-lightbulb-line text-yellow-600 mr-2 mt-1"></i>
                  <span>Review and optimize your solutions after completion</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}