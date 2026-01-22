'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DoublyLinkedListPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedOperation, setSelectedOperation] = useState('insertion-beginning');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [linkedList, setLinkedList] = useState([
    { value: 10, next: 1, prev: -1 },
    { value: 20, next: 2, prev: 0 },
    { value: 30, next: -1, prev: 1 }
  ]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [newValue, setNewValue] = useState(25);
  const [searchValue, setSearchValue] = useState(20);
  const [foundNodeIndex, setFoundNodeIndex] = useState(-1);

  const operations = [
    { id: 'insertion-beginning', name: 'Insertion (Beginning)', icon: 'ri-add-circle-line' },
    { id: 'insertion-end', name: 'Insertion (End)', icon: 'ri-add-line' },
    { id: 'insertion-position', name: 'Insertion (Position)', icon: 'ri-drag-move-2-line' },
    { id: 'deletion-beginning', name: 'Deletion (Beginning)', icon: 'ri-delete-bin-line' },
    { id: 'deletion-end', name: 'Deletion (End)', icon: 'ri-delete-back-2-line' },
    { id: 'deletion-key', name: 'Deletion (Key)', icon: 'ri-delete-bin-line' },
    { id: 'search-key', name: 'Search (Key)', icon: 'ri-search-line' },
    { id: 'traversal-forward', name: 'Traversal (Forward)', icon: 'ri-arrow-right-line' },
    { id: 'traversal-backward', name: 'Traversal (Backward)', icon: 'ri-arrow-left-line' }
  ];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setHighlightIndex(-1);
    setFoundNodeIndex(-1);

    switch (selectedOperation) {
      case 'insertion-beginning':
        await animateInsertionBeginning();
        break;
      case 'insertion-end':
        await animateInsertionEnd();
        break;
      case 'insertion-position':
        await animateInsertionPosition();
        break;
      case 'deletion-beginning':
        await animateDeletionBeginning();
        break;
      case 'deletion-end':
        await animateDeletionEnd();
        break;
      case 'deletion-key':
        await animateDeletionKey();
        break;
      case 'search-key':
        await animateSearchKey();
        break;
      case 'traversal-forward':
        await animateTraversalForward();
        break;
      case 'traversal-backward':
        await animateTraversalBackward();
        break;
    }

    setIsAnimating(false);
  };

  const animateInsertionBeginning = async () => {
    // Step 1: Create new node
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Set new node's next to current head
    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newNode = { value: newValue, next: 0, prev: -1 };
    const newList = [newNode, ...linkedList.map(node => ({ ...node, next: node.next + 1, prev: node.prev + 1 }))];
    setLinkedList(newList);
    setHighlightIndex(0);
    
    // Step 3: Update head's prev pointer
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateInsertionEnd = async () => {
    // Step 1: Create new node
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Traverse to end
    setCurrentStep(1);
    for (let i = 0; i < linkedList.length; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Step 3: Insert at end
    setCurrentStep(2);
    const newNode = { value: newValue, next: -1, prev: linkedList.length - 1 };
    const newList = [...linkedList];
    if (newList.length > 0) {
      newList[newList.length - 1].next = newList.length;
    }
    newList.push(newNode);
    setLinkedList(newList);
    setHighlightIndex(newList.length - 1);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateInsertionPosition = async () => {
    const position = 1; // Insert at position 1
    
    // Step 1: Create new node
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Traverse to position
    setCurrentStep(1);
    for (let i = 0; i <= position && i < linkedList.length; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Step 3: Insert at position
    setCurrentStep(2);
    const newNode = { value: newValue, next: position + 1, prev: position };
    const newList = [...linkedList];
    newList.splice(position, 0, newNode);
    for (let i = 0; i < newList.length; i++) {
      newList[i].next = i < newList.length - 1 ? i + 1 : -1;
      newList[i].prev = i > 0 ? i - 1 : -1;
    }
    setLinkedList(newList);
    setHighlightIndex(position);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateDeletionBeginning = async () => {
    if (linkedList.length === 0) {
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    // Step 1: Check if list is empty
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Remove head node
    setCurrentStep(1);
    setHighlightIndex(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newList = linkedList.slice(1);
    setLinkedList(newList.map((node, idx) => ({ ...node, next: idx < newList.length - 1 ? idx + 1 : -1, prev: idx > 0 ? idx - 1 : -1 })));
    
    // Step 3: Update new head's prev pointer
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateDeletionEnd = async () => {
    // Step 1: Traverse to end
    setCurrentStep(0);
    for (let i = 0; i < linkedList.length; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Step 2: Remove last node
    setCurrentStep(1);
    if (linkedList.length > 0) {
      const newList = linkedList.slice(0, -1);
      if (newList.length > 0) {
        newList[newList.length - 1].next = -1;
      }
      setLinkedList(newList);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 3: Update pointers
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateDeletionKey = async () => {
    // Step 1: Search for node
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Find and delete node
    setCurrentStep(1);
    let foundIndex = -1;
    for (let i = 0; i < linkedList.length; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (linkedList[i].value === searchValue) {
        foundIndex = i;
        break;
      }
    }
    
    if (foundIndex !== -1) {
      const newList = linkedList.filter((_, index) => index !== foundIndex);
      for (let i = 0; i < newList.length; i++) {
        newList[i].next = i < newList.length - 1 ? i + 1 : -1;
        newList[i].prev = i > 0 ? i - 1 : -1;
      }
      setLinkedList(newList);
    }
    
    // Step 3: Return result
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateSearchKey = async () => {
    // Step 1: Start from head
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Traverse comparing values
    setCurrentStep(1);
    for (let i = 0; i < linkedList.length; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (linkedList[i].value === searchValue) {
        setFoundNodeIndex(i);
        break;
      }
    }
    
    // Step 3: Return result
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateTraversalForward = async () => {
    // Step 1: Start from head
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Traverse forward using next pointers
    setCurrentStep(1);
    for (let i = 0; i < linkedList.length; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Step 3: End of traversal
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateTraversalBackward = async () => {
    // Step 1: Start from tail
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Traverse backward using prev pointers
    setCurrentStep(1);
    for (let i = linkedList.length - 1; i >= 0; i--) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Step 3: End of traversal
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setHighlightIndex(-1);
    setFoundNodeIndex(-1);
    setLinkedList([
      { value: 10, next: 1, prev: -1 },
      { value: 20, next: 2, prev: 0 },
      { value: 30, next: -1, prev: 1 }
    ]);
  };

  const codeSnippets = {
    javascript: {
      'insertion-beginning': `// JavaScript Doubly Linked List - Insertion at Beginning
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertAtBeginning(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    display() {
        let current = this.head;
        let result = "";
        while (current) {
            result += current.data + " <-> ";
            current = current.next;
        }
        console.log(result + "null");
    }
}`,

      'insertion-end': `// JavaScript Doubly Linked List - Insertion at End
class DoublyLinkedList {
    // ... previous methods

    insertAtEnd(data) {
        const newNode = new Node(data);
        
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
}`,

      'deletion-key': `// JavaScript Doubly Linked List - Delete by Key
class DoublyLinkedList {
    // ... previous methods

    deleteByKey(key) {
        let current = this.head;
        
        while (current && current.data !== key) {
            current = current.next;
        }
        
        if (!current) {
            return false; // Not found
        }
        
        if (current.prev) {
            current.prev.next = current.next;
        } else {
            this.head = current.next; // Deleting head
        }
        
        if (current.next) {
            current.next.prev = current.prev;
        } else {
            this.tail = current.prev; // Deleting tail
        }
        
        this.size--;
        return true;
    }
}`,

      'search-key': `// JavaScript Doubly Linked List - Search by Key
class DoublyLinkedList {
    // ... previous methods

    searchByKey(key) {
        let current = this.head;
        let index = 0;
        
        while (current) {
            if (current.data === key) {
                return index; // Found at this index
            }
            current = current.next;
            index++;
        }
        
        return -1; // Not found
    }
}`,

      'traversal-forward': `// JavaScript Doubly Linked List - Forward Traversal
class DoublyLinkedList {
    // ... previous methods

    traverseForward() {
        let current = this.head;
        let result = [];
        
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        
        return result;
    }
}`,

      'traversal-backward': `// JavaScript Doubly Linked List - Backward Traversal
class DoublyLinkedList {
    // ... previous methods

    traverseBackward() {
        let current = this.tail;
        let result = [];
        
        while (current) {
            result.push(current.data);
            current = current.prev;
        }
        
        return result;
    }
}`
    },

    python: {
      'insertion-beginning': `# Python Doubly Linked List - Insertion at Beginning
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def insert_at_beginning(self, data):
        new_node = Node(data)
        
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self.size += 1

    def display(self):
        current = self.head
        result = []
        while current:
            result.append(str(current.data))
            current = current.next
        print(" <-> ".join(result) + " -> None")`,

      'deletion-key': `# Python Doubly Linked List - Delete by Key
class DoublyLinkedList:
    # ... previous methods

    def delete_by_key(self, key):
        current = self.head
        
        while current and current.data != key:
            current = current.next
        
        if not current:
            return False  # Not found
        
        if current.prev:
            current.prev.next = current.next
        else:
            self.head = current.next  # Deleting head
        
        if current.next:
            current.next.prev = current.prev
        else:
            self.tail = current.prev  # Deleting tail
        
        self.size -= 1
        return True`,

      'search-key': `# Python Doubly Linked List - Search by Key
class DoublyLinkedList:
    # ... previous methods

    def search_by_key(self, key):
        current = self.head
        index = 0
        
        while current:
            if current.data == key:
                return index  # Found at this index
            current = current.next
            index += 1
        
        return -1  # Not found`,

      'traversal-forward': `# Python Doubly Linked List - Forward Traversal
class DoublyLinkedList:
    # ... previous methods

    def traverse_forward(self):
        current = self.head
        result = []
        
        while current:
            result.append(current.data)
            current = current.next
        
        return result`,

      'traversal-backward': `# Python Doubly Linked List - Backward Traversal
class DoublyLinkedList:
    # ... previous methods

    def traverse_backward(self):
        current = self.tail
        result = []
        
        while current:
            result.append(current.data)
            current = current.prev
        
        return result`
    },

    java: {
      'insertion-beginning': `// Java Doubly Linked List - Insertion at Beginning
class Node {
    int data;
    Node next;
    Node prev;
    
    public Node(int data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    Node head;
    Node tail;
    int size;
    
    public DoublyLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    public void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
        }
        size++;
    }
}`,

      'deletion-key': `// Java Doubly Linked List - Delete by Key
class DoublyLinkedList {
    // ... previous methods
    
    public boolean deleteByKey(int key) {
        Node current = head;
        
        while (current != null && current.data != key) {
            current = current.next;
        }
        
        if (current == null) {
            return false; // Not found
        }
        
        if (current.prev != null) {
            current.prev.next = current.next;
        } else {
            head = current.next; // Deleting head
        }
        
        if (current.next != null) {
            current.next.prev = current.prev;
        } else {
            tail = current.prev; // Deleting tail
        }
        
        size--;
        return true;
    }
}`,

      'search-key': `// Java Doubly Linked List - Search by Key
class DoublyLinkedList {
    // ... previous methods
    
    public int searchByKey(int key) {
        Node current = head;
        int index = 0;
        
        while (current != null) {
            if (current.data == key) {
                return index; // Found at this index
            }
            current = current.next;
            index++;
        }
        
        return -1; // Not found
    }
}`,

      'traversal-forward': `// Java Doubly Linked List - Forward Traversal
class DoublyLinkedList {
    // ... previous methods
    
    public ArrayList<Integer> traverseForward() {
        ArrayList<Integer> result = new ArrayList<>();
        Node current = head;
        
        while (current != null) {
            result.add(current.data);
            current = current.next;
        }
        
        return result;
    }
}`,

      'traversal-backward': `// Java Doubly Linked List - Backward Traversal
class DoublyLinkedList {
    // ... previous methods
    
    public ArrayList<Integer> traverseBackward() {
        ArrayList<Integer> result = new ArrayList<>();
        Node current = tail;
        
        while (current != null) {
            result.add(current.data);
            current = current.prev;
        }
        
        return result;
    }
}`
    },

    cpp: {
      'insertion-beginning': `// C++ Doubly Linked List - Insertion at Beginning
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node* prev;
    
    Node(int data) : data(data), next(nullptr), prev(nullptr) {}
};

class DoublyLinkedList {
private:
    Node* head;
    Node* tail;
    int size;
    
public:
    DoublyLinkedList() : head(nullptr), tail(nullptr), size(0) {}
    
    void insertAtBeginning(int data) {
        Node* newNode = new Node(data);
        
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
        size++;
    }
};`,

      'deletion-key': `// C++ Doubly Linked List - Delete by Key
class DoublyLinkedList {
    // ... previous methods
    
public:
    bool deleteByKey(int key) {
        Node* current = head;
        
        while (current != nullptr && current->data != key) {
            current = current->next;
        }
        
        if (current == nullptr) {
            return false; // Not found
        }
        
        if (current->prev != nullptr) {
            current->prev->next = current->next;
        } else {
            head = current->next; // Deleting head
        }
        
        if (current->next != nullptr) {
            current->next->prev = current->prev;
        } else {
            tail = current->prev; // Deleting tail
        }
        
        delete current;
        size--;
        return true;
    }
};`,

      'search-key': `// C++ Doubly Linked List - Search by Key
class DoublyLinkedList {
    // ... previous methods
    
public:
    int searchByKey(int key) {
        Node* current = head;
        int index = 0;
        
        while (current != nullptr) {
            if (current->data == key) {
                return index; // Found at this index
            }
            current = current->next;
            index++;
        }
        
        return -1; // Not found
    }
};`,

      'traversal-forward': `// C++ Doubly Linked List - Forward Traversal
class DoublyLinkedList {
    // ... previous methods
    
public:
    vector<int> traverseForward() {
        vector<int> result;
        Node* current = head;
        
        while (current != nullptr) {
            result.push_back(current->data);
            current = current->next;
        }
        
        return result;
    }
};`,

      'traversal-backward': `// C++ Doubly Linked List - Backward Traversal
class DoublyLinkedList {
    // ... previous methods
    
public:
    vector<int> traverseBackward() {
        vector<int> result;
        Node* current = tail;
        
        while (current != nullptr) {
            result.push_back(current->data);
            current = current->prev;
        }
        
        return result;
    }
};`
    }
  };

  const getAlgorithmSteps = () => {
    switch (selectedOperation) {
      case 'insertion-beginning':
        return [
          'Create new node with given value',
          'Set new node\'s next to current head',
          'Update head\'s prev pointer to new node'
        ];
      case 'insertion-end':
        return [
          'Create new node with given value',
          'Traverse to end of list',
          'Update tail\'s next pointer to new node'
        ];
      case 'deletion-key':
        return [
          'Search for node with given key',
          'Update prev and next pointers',
          'Free memory and update size'
        ];
      case 'search-key':
        return [
          'Start from head node',
          'Traverse comparing values',
          'Return index if found'
        ];
      case 'traversal-forward':
        return [
          'Start from head node',
          'Traverse using next pointers',
          'Visit each node sequentially'
        ];
      case 'traversal-backward':
        return [
          'Start from tail node',
          'Traverse using prev pointers',
          'Visit each node in reverse'
        ];
      default:
        return ['Select an operation to see steps'];
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
              <Link href="/data-structures/linkedlist" className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                ← Back to Linked Lists
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
              <i className="ri-arrow-left-right-line text-2xl text-blue-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Doubly Linked List</h1>
              <p className="text-gray-600">Each node has pointers to both next and previous nodes</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Operation Selector */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Operations</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {operations.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setSelectedOperation(op.id)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      selectedOperation === op.id
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${op.icon} mr-2`}></i>
                      <span className="font-medium text-sm">{op.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Input Controls */}
              <div className="mb-6 space-y-4">
                {(selectedOperation.includes('insertion') || selectedOperation.includes('deletion')) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {selectedOperation.includes('insertion') ? 'New Value:' : 'Value to Delete/Search:'}
                    </label>
                    <input
                      type="number"
                      value={selectedOperation.includes('insertion') ? newValue : searchValue}
                      onChange={(e) => selectedOperation.includes('insertion') 
                        ? setNewValue(Number(e.target.value)) 
                        : setSearchValue(Number(e.target.value))}
                      disabled={isAnimating}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Animation Controls */}
              <div className="flex space-x-3 mb-6">
                <button
                  onClick={runAnimation}
                  disabled={isAnimating}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {isAnimating ? 'Animating...' : 'Start Animation'}
                </button>
                <button
                  onClick={resetAnimation}
                  disabled={isAnimating}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Linked List Visualization */}
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {linkedList.map((node, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-300 ${
                            highlightIndex === index
                              ? 'bg-yellow-500 text-white border-yellow-500 scale-110'
                              : foundNodeIndex === index
                              ? 'bg-green-500 text-white border-green-500'
                              : 'bg-white text-gray-700 border-gray-300'
                          }`}
                        >
                          {node.value}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="mr-2">prev: {node.prev === -1 ? 'null' : node.prev}</span>
                          <span>next: {node.next === -1 ? 'null' : node.next}</span>
                        </div>
                      </div>
                      {node.next !== -1 && (
                        <div className="w-8 h-0.5 bg-gray-400"></div>
                      )}
                    </div>
                  ))}
                  {linkedList.length > 0 && (
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                  )}
                  <div className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-sm">NULL</div>
                </div>

                {foundNodeIndex !== -1 && (
                  <div className="text-center">
                    <div className="text-sm text-green-600 mb-2">
                      Found {searchValue} at node {foundNodeIndex}
                    </div>
                  </div>
                )}
              </div>

              {/* Step Display */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Algorithm Steps</h3>
                <div className="space-y-2">
                  {getAlgorithmSteps().map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 rounded-lg ${
                        currentStep === index && isAnimating
                          ? 'bg-blue-100 text-blue-800'
                          : currentStep > index && isAnimating
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          currentStep === index && isAnimating
                            ? 'bg-blue-600 text-white'
                            : currentStep > index && isAnimating
                            ? 'bg-blue-600 text-white'
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

              {/* Language Selector */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Language</h3>
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

              {/* Code Display */}
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  {(codeSnippets[selectedLanguage as keyof typeof codeSnippets] as Record<string, string>)?.[selectedOperation] || '// Select an operation and language'}
                </pre>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Bidirectional traversal</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Efficient deletion</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Reverse navigation</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-close-line text-red-600 mr-2"></i>
                  <span>Extra memory overhead</span>
                </div>
              </div>
            </div>

            {/* Complexity */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complexity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Insert (beginning):</span>
                  <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                </div>
                <div className="flex justify-between">
                  <span>Insert (end):</span>
                  <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                </div>
                <div className="flex justify-between">
                  <span>Delete (with node):</span>
                  <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                </div>
                <div className="flex justify-between">
                  <span>Search:</span>
                  <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Browser history</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Text editors</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Music players</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}