'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CircularLinkedListPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedOperation, setSelectedOperation] = useState('insertion-beginning');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [linkedList, setLinkedList] = useState([
    { value: 10, next: 1 },
    { value: 20, next: 2 },
    { value: 30, next: 0 }
  ]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [newValue, setNewValue] = useState(25);
  const [searchValue, setSearchValue] = useState(20);
  const [foundNodeIndex, setFoundNodeIndex] = useState(-1);

  const operations = [
    { id: 'insertion-beginning', name: 'Insertion (Beginning)', icon: 'ri-add-circle-line' },
    { id: 'insertion-end', name: 'Insertion (End)', icon: 'ri-add-line' },
    { id: 'deletion-key', name: 'Deletion (Key)', icon: 'ri-delete-bin-line' },
    { id: 'search-key', name: 'Search (Key)', icon: 'ri-search-line' },
    { id: 'traversal', name: 'Circular Traversal', icon: 'ri-refresh-line' }
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
      case 'deletion-key':
        await animateDeletionKey();
        break;
      case 'search-key':
        await animateSearchKey();
        break;
      case 'traversal':
        await animateTraversal();
        break;
    }

    setIsAnimating(false);
  };

  const animateInsertionBeginning = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newNode = { value: newValue, next: linkedList.length > 0 ? 0 : 0 };
    const newList = [newNode, ...linkedList.map(node => ({ ...node, next: node.next + 1 }))];
    if (newList.length > 1) {
      newList[newList.length - 1].next = 0;
    }
    setLinkedList(newList);
    setHighlightIndex(0);
    
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateInsertionEnd = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep(1);
    for (let i = 0; i < linkedList.length; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setCurrentStep(2);
    const newNode = { value: newValue, next: 0 };
    const newList = [...linkedList];
    if (newList.length > 0) {
      newList[newList.length - 1].next = newList.length;
    }
    newList.push(newNode);
    setLinkedList(newList);
    setHighlightIndex(newList.length - 1);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateDeletionKey = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
        newList[i].next = i < newList.length - 1 ? i + 1 : 0;
      }
      setLinkedList(newList);
    }
    
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateSearchKey = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep(1);
    for (let i = 0; i < linkedList.length; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (linkedList[i].value === searchValue) {
        setFoundNodeIndex(i);
        break;
      }
    }
    
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateTraversal = async () => {
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep(1);
    for (let i = 0; i < linkedList.length * 2; i++) {
      setHighlightIndex(i % linkedList.length);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setHighlightIndex(-1);
    setFoundNodeIndex(-1);
    setLinkedList([
      { value: 10, next: 1 },
      { value: 20, next: 2 },
      { value: 30, next: 0 }
    ]);
  };

  const codeSnippets = {
    javascript: {
      'insertion-beginning': `// JavaScript Circular Linked List - Insertion at Beginning
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertAtBeginning(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            newNode.next = newNode;
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            newNode.next = this.head;
            current.next = newNode;
            this.head = newNode;
        }
        this.size++;
    }
}`,

      'insertion-end': `// JavaScript Circular Linked List - Insertion at End
class CircularLinkedList {
    // ... previous methods

    insertAtEnd(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            newNode.next = newNode;
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }
        this.size++;
    }
}`,

      'deletion-key': `// JavaScript Circular Linked List - Delete by Key
class CircularLinkedList {
    // ... previous methods

    deleteByKey(key) {
        if (!this.head) {
            return false;
        }
        
        let current = this.head;
        let prev = null;
        
        do {
            if (current.data === key) {
                if (prev) {
                    prev.next = current.next;
                } else {
                    // Deleting head
                    let temp = this.head;
                    while (temp.next !== this.head) {
                        temp = temp.next;
                    }
                    temp.next = current.next;
                    this.head = current.next;
                }
                this.size--;
                return true;
            }
            prev = current;
            current = current.next;
        } while (current !== this.head);
        
        return false; // Not found
    }
}`,

      'search-key': `// JavaScript Circular Linked List - Search by Key
class CircularLinkedList {
    // ... previous methods

    searchByKey(key) {
        if (!this.head) {
            return -1;
        }
        
        let current = this.head;
        let index = 0;
        
        do {
            if (current.data === key) {
                return index; // Found at this index
            }
            current = current.next;
            index++;
        } while (current !== this.head);
        
        return -1; // Not found
    }
}`,

      'traversal': `// JavaScript Circular Linked List - Traversal
class CircularLinkedList {
    // ... previous methods

    display() {
        if (!this.head) {
            console.log("List is empty");
            return;
        }
        
        let current = this.head;
        let result = "";
        
        do {
            result += current.data + " -> ";
            current = current.next;
        } while (current !== this.head);
        
        console.log(result + "(back to head)");
    }
}`
  },

  python: {
    'insertion-beginning': `# Python Circular Linked List - Insertion at Beginning
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class CircularLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def insert_at_beginning(self, data):
        new_node = Node(data)
        
        if not self.head:
            new_node.next = new_node
            self.head = new_node
        else:
            current = self.head
            while current.next != self.head:
                current = current.next
            new_node.next = self.head
            current.next = new_node
            self.head = new_node
        self.size += 1`,

    'insertion-end': `# Python Circular Linked List - Insertion at End
class CircularLinkedList:
    # ... previous methods

    def insert_at_end(self, data):
        new_node = Node(data)
        
        if not self.head:
            new_node.next = new_node
            self.head = new_node
        else:
            current = self.head
            while current.next != self.head:
                current = current.next
            current.next = new_node
            new_node.next = self.head
        self.size += 1`,

    'deletion-key': `# Python Circular Linked List - Delete by Key
class CircularLinkedList:
    # ... previous methods

    def delete_by_key(self, key):
        if not self.head:
            return False
        
        current = self.head
        prev = None
        
        while True:
            if current.data == key:
                if prev:
                    prev.next = current.next
                else:
                    # Deleting head
                    temp = self.head
                    while temp.next != self.head:
                        temp = temp.next
                    temp.next = current.next
                    self.head = current.next
                self.size -= 1
                return True
            prev = current
            current = current.next
            if current == self.head:
                break
        
        return False  # Not found`,

    'search-key': `# Python Circular Linked List - Search by Key
class CircularLinkedList:
    # ... previous methods

    def search_by_key(self, key):
        if not self.head:
            return -1
        
        current = self.head
        index = 0
        
        while True:
            if current.data == key:
                return index  # Found at this index
            current = current.next
            index += 1
            if current == self.head:
                break
        
        return -1  # Not found`,

    'traversal': `# Python Circular Linked List - Traversal
class CircularLinkedList:
    # ... previous methods

    def display(self):
        if not self.head:
            print("List is empty")
            return
        
        current = self.head
        result = []
        
        while True:
            result.append(str(current.data))
            current = current.next
            if current == self.head:
                break
        
        print(" -> ".join(result) + " -> (back to head)")`
  },

  java: {
    'insertion-beginning': `// Java Circular Linked List - Insertion at Beginning
class Node {
    int data;
    Node next;
    
    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class CircularLinkedList {
    Node head;
    int size;
    
    public void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        
        if (head == null) {
            newNode.next = newNode;
            head = newNode;
        } else {
            Node current = head;
            while (current.next != head) {
                current = current.next;
            }
            newNode.next = head;
            current.next = newNode;
            head = newNode;
        }
        size++;
    }
}`,

    'insertion-end': `// Java Circular Linked List - Insertion at End
class CircularLinkedList {
    // ... previous methods

    public void insertAtEnd(int data) {
        Node newNode = new Node(data);
        
        if (head == null) {
            newNode.next = newNode;
            head = newNode;
        } else {
            Node current = head;
            while (current.next != head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = head;
        }
        size++;
    }
}`,

    'deletion-key': `// Java Circular Linked List - Delete by Key
class CircularLinkedList {
    // ... previous methods

    public boolean deleteByKey(int key) {
        if (head == null) {
            return false;
        }
        
        Node current = head;
        Node prev = null;
        
        do {
            if (current.data == key) {
                if (prev != null) {
                    prev.next = current.next;
                } else {
                    // Deleting head
                    Node temp = head;
                    while (temp.next != head) {
                        temp = temp.next;
                    }
                    temp.next = current.next;
                    head = current.next;
                }
                size--;
                return true;
            }
            prev = current;
            current = current.next;
        } while (current != head);
        
        return false; // Not found
    }
}`,

    'search-key': `// Java Circular Linked List - Search by Key
class CircularLinkedList {
    // ... previous methods

    public int searchByKey(int key) {
        if (head == null) {
            return -1;
        }
        
        Node current = head;
        int index = 0;
        
        do {
            if (current.data == key) {
                return index; // Found at this index
            }
            current = current.next;
            index++;
        } while (current != head);
        
        return -1; // Not found
    }
}`,

    'traversal': `// Java Circular Linked List - Traversal
class CircularLinkedList {
    // ... previous methods

    public void display() {
        if (head == null) {
            System.out.println("List is empty");
            return;
        }
        
        Node current = head;
        StringBuilder result = new StringBuilder();
        
        do {
            result.append(current.data).append(" -> ");
            current = current.next;
        } while (current != head);
        
        System.out.println(result.toString() + "(back to head)");
    }
}`
    },

    cpp: {
    'insertion-beginning': `// C++ Circular Linked List - Insertion at Beginning
struct Node {
    int data;
    Node* next;
    
    Node(int data) : data(data), next(nullptr) {}
};

class CircularLinkedList {
private:
    Node* head;
    int size;
    
public:
    CircularLinkedList() : head(nullptr), size(0) {}
    
    void insertAtBeginning(int data) {
        Node* newNode = new Node(data);
        
        if (head == nullptr) {
            newNode->next = newNode;
            head = newNode;
        } else {
            Node* current = head;
            while (current->next != head) {
                current = current->next;
            }
            newNode->next = head;
            current->next = newNode;
            head = newNode;
        }
        size++;
    }
}`,

    'insertion-end': `// C++ Circular Linked List - Insertion at End
class CircularLinkedList {
    // ... previous methods

    void insertAtEnd(int data) {
        Node* newNode = new Node(data);
        
        if (head == nullptr) {
            newNode->next = newNode;
            head = newNode;
        } else {
            Node* current = head;
            while (current->next != head) {
                current = current->next;
            }
            current->next = newNode;
            newNode->next = head;
        }
        size++;
    }
}`,

    'deletion-key': `// C++ Circular Linked List - Delete by Key
class CircularLinkedList {
    // ... previous methods

    bool deleteByKey(int key) {
        if (head == nullptr) {
            return false;
        }
        
        Node* current = head;
        Node* prev = nullptr;
        
        do {
            if (current->data == key) {
                if (prev != nullptr) {
                    prev->next = current->next;
                } else {
                    // Deleting head
                    Node* temp = head;
                    while (temp->next != head) {
                        temp = temp->next;
                    }
                    temp->next = current->next;
                    head = current->next;
                }
                delete current;
                size--;
                return true;
            }
            prev = current;
            current = current->next;
        } while (current != head);
        
        return false; // Not found
    }
}`,

    'search-key': `// C++ Circular Linked List - Search by Key
class CircularLinkedList {
    // ... previous methods

    int searchByKey(int key) {
        if (head == nullptr) {
            return -1;
        }
        
        Node* current = head;
        int index = 0;
        
        do {
            if (current->data == key) {
                return index; // Found at this index
            }
            current = current->next;
            index++;
        } while (current != head);
        
        return -1; // Not found
    }
}`,

    'traversal': `// C++ Circular Linked List - Traversal
class CircularLinkedList {
    // ... previous methods

    void display() {
        if (head == nullptr) {
            cout << "List is empty" << endl;
            return;
        }
        
        Node* current = head;
        
        do {
            cout << current->data << " -> ";
            current = current->next;
        } while (current != head);
        cout << "(back to head)" << endl;
    }
};`
    }
  };

  const getCodeSnippet = () => {
    if (selectedLanguage === 'javascript') {
      const snippet = codeSnippets.javascript[selectedOperation as keyof typeof codeSnippets.javascript];
      return snippet || '// Select an operation and language';
    } else if (selectedLanguage === 'python') {
      const snippet = codeSnippets.python[selectedOperation as keyof typeof codeSnippets.python];
      return snippet || '// Select an operation and language';
    } else if (selectedLanguage === 'java') {
      const snippet = codeSnippets.java[selectedOperation as keyof typeof codeSnippets.java];
      return snippet || '// Select an operation and language';
    } else if (selectedLanguage === 'cpp') {
      const snippet = codeSnippets.cpp[selectedOperation as keyof typeof codeSnippets.cpp];
      return snippet || '// Select an operation and language';
    }
    return '// Select an operation and language';
  };

  const getAlgorithmSteps = () => {
    switch (selectedOperation) {
      case 'insertion-beginning':
        return [
          'Create new node with given value',
          'Find last node in circular list',
          'Update pointers to insert at beginning'
        ];
      case 'insertion-end':
        return [
          'Create new node with given value',
          'Traverse to end of list',
          'Update last node to point to new node'
        ];
      case 'deletion-key':
        return [
          'Search for node with given key',
          'Update circular pointers',
          'Handle head deletion if needed'
        ];
      case 'search-key':
        return [
          'Start from head node',
          'Traverse circularly comparing values',
          'Return index if found or -1 if not'
        ];
      case 'traversal':
        return [
          'Start from head node',
          'Traverse until reaching head again',
          'Visit each node exactly once'
        ];
      default:
        return ['Select an operation to see steps'];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-refresh-line text-2xl text-green-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Circular Linked List</h1>
              <p className="text-gray-600">Last node points back to first node, forming a circular structure</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Operations</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {operations.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setSelectedOperation(op.id)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      selectedOperation === op.id
                        ? 'bg-green-50 border-green-300 text-green-700'
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}
              </div>

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

              <div className="mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {linkedList.map((node, index) => (
                    <div key={index} className="flex items-center">
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
                      <div className="w-8 h-0.5 bg-gray-400"></div>
                    </div>
                  ))}
                  {linkedList.length > 0 && (
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                  )}
                  <div className="px-3 py-1 bg-green-200 text-green-700 rounded text-sm">HEAD</div>
                </div>

                {foundNodeIndex !== -1 && (
                  <div className="text-center">
                    <div className="text-sm text-green-600 mb-2">
                      Found {searchValue} at node {foundNodeIndex}
                    </div>
                  </div>
                )}
              </div>

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

              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  {getCodeSnippet()}
                </pre>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Circular traversal</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>No null termination</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  <span>Round robin scheduling</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-close-line text-red-600 mr-2"></i>
                  <span>Infinite loop risk</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complexity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Insert (beginning):</span>
                  <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                </div>
                <div className="flex justify-between">
                  <span>Insert (end):</span>
                  <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                </div>
                <div className="flex justify-between">
                  <span>Delete:</span>
                  <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                </div>
                <div className="flex justify-between">
                  <span>Search:</span>
                  <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Round Robin scheduling</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Music playlists</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Turn-based games</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}