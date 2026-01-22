'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function StacksPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedOperation, setSelectedOperation] = useState('push');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stack, setStack] = useState([10, 20, 30]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [newValue, setNewValue] = useState(25);
  const [poppedValue, setPoppedValue] = useState<number | null>(null);
  const [peekValue, setPeekValue] = useState<number | null>(null);

  const operations = [
    { id: 'push', name: 'Push', icon: 'ri-add-line' },
    { id: 'pop', name: 'Pop', icon: 'ri-subtract-line' },
    { id: 'peek', name: 'Peek', icon: 'ri-eye-line' },
    { id: 'isempty', name: 'Is Empty', icon: 'ri-checkbox-blank-circle-line' },
    { id: 'size', name: 'Size', icon: 'ri-ruler-line' }
  ];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setHighlightIndex(-1);
    setPoppedValue(null);
    setPeekValue(null);

    switch (selectedOperation) {
      case 'push':
        await animatePush();
        break;
      case 'pop':
        await animatePop();
        break;
      case 'peek':
        await animatePeek();
        break;
      case 'isempty':
        await animateIsEmpty();
        break;
      case 'size':
        await animateSize();
        break;
    }

    setIsAnimating(false);
  };

  const animatePush = async () => {
    // Step 1: Check if stack is full
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Add new element to top
    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStack = [newValue, ...stack];
    setStack(newStack);
    setHighlightIndex(0);
    
    // Step 3: Increment top pointer
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animatePop = async () => {
    if (stack.length === 0) {
      // Step 1: Check if stack is empty
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Show empty message
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    // Step 1: Check if stack is empty
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Remove element from top
    setCurrentStep(1);
    setHighlightIndex(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const popped = stack[0];
    setPoppedValue(popped as any);
    const newStack = stack.slice(1);
    setStack(newStack);
    
    // Step 3: Decrement top pointer
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animatePeek = async () => {
    if (stack.length === 0) {
      // Step 1: Check if stack is empty
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Show empty message
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    // Step 1: Check if stack is empty
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Get top element
    setCurrentStep(1);
    setHighlightIndex(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPeekValue(stack[0]);
    
    // Step 3: Return top element
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateIsEmpty = async () => {
    // Step 1: Check stack size
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Return result
    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateSize = async () => {
    // Step 1: Count elements
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Return size
    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setHighlightIndex(-1);
    setPoppedValue(null);
    setPeekValue(null);
    setStack([10, 20, 30]);
  };

  const codeSnippets: Record<string, Record<string, string>> = {
    javascript: {
      push: `// JavaScript Stack Implementation - Push Operation
class Stack {
    constructor() {
        this.items = [];
        this.top = -1;
    }

    // Push element to top of stack
    push(element) {
        this.top++;
        this.items[this.top] = element;
        console.log(\`Pushed \${element} to stack\`);
    }

    // Alternative using array methods
    pushAlt(element) {
        this.items.push(element);
        this.top = this.items.length - 1;
    }
}

// Usage
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.items); // [10, 20, 30]`,

      pop: `// JavaScript Stack Implementation - Pop Operation
class Stack {
    constructor() {
        this.items = [];
        this.top = -1;
    }

    // Pop element from top of stack
    pop() {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return null;
        }

        const poppedElement = this.items[this.top];
        this.top--;
        console.log(\`Popped \${poppedElement} from stack\`);
        return poppedElement;
    }

    // Alternative using array methods
    popAlt() {
        if (this.isEmpty()) {
            return null;
        }
        this.top = this.items.length - 2;
        return this.items.pop();
    }

    isEmpty() {
        return this.top === -1;
    }
}

// Usage
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

const popped = stack.pop(); // 30
console.log(popped);
console.log(stack.items); // [10, 20]`,

      peek: `// JavaScript Stack Implementation - Peek Operation
class Stack {
    constructor() {
        this.items = [];
        this.top = -1;
    }

    // Peek at top element without removing
    peek() {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return null;
        }

        const topElement = this.items[this.top];
        console.log(\`Top element: \${topElement}\`);
        return topElement;
    }

    // Alternative using array methods
    peekAlt() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.top === -1;
    }
}

// Usage
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

const topElement = stack.peek(); // 30
console.log(topElement);
console.log(stack.items); // [10, 20, 30] (unchanged)`,

      isempty: `// JavaScript Stack Implementation - Is Empty Operation
class Stack {
    constructor() {
        this.items = [];
        this.top = -1;
    }

    // Check if stack is empty
    isEmpty() {
        const empty = this.top === -1;
        console.log(\`Stack is empty: \${empty}\`);
        return empty;
    }

    // Alternative using array length
    isEmptyAlt() {
        return this.items.length === 0;
    }
}

// Usage
const stack = new Stack();
console.log(stack.isEmpty()); // true

stack.push(10);
console.log(stack.isEmpty()); // false

stack.pop();
console.log(stack.isEmpty()); // true`,

      size: `// JavaScript Stack Implementation - Size Operation
class Stack {
    constructor() {
        this.items = [];
        this.top = -1;
    }

    // Get current size of stack
    size() {
        const currentSize = this.top + 1;
        console.log(\`Stack size: \${currentSize}\`);
        return currentSize;
    }

    // Alternative using array length
    sizeAlt() {
        return this.items.length;
    }

    push(element) {
        this.top++;
        this.items[this.top] = element;
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        const popped = this.items[this.top];
        this.top--;
        return popped;
    }

    isEmpty() {
        return this.top === -1;
    }
}

// Usage
const stack = new Stack();
console.log(stack.size()); // 0

stack.push(10);
stack.push(20);
console.log(stack.size()); // 2

stack.pop();
console.log(stack.size()); // 1`
    },

    python: {
      push: `# Python Stack Implementation - Push Operation
class Stack:
    def __init__(self):
        self.items = []
        self.top = -1

    def push(self, element):
        self.top += 1
        self.items.append(element)
        print(f"Pushed {element} to stack")

    # Alternative using list methods
    def push_alt(self, element):
        self.items.append(element)
        self.top = len(self.items) - 1

# Usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
print(stack.items)  # [10, 20, 30]`,

      pop: `# Python Stack Implementation - Pop Operation
class Stack:
    def __init__(self):
        self.items = []
        self.top = -1

    def pop(self):
        if self.is_empty():
            print("Stack is empty")
            return None
        
        self.top -= 1
        popped = self.items.pop()
        print(f"Popped {popped} from stack")
        return popped

    def is_empty(self):
        return self.top == -1

# Usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)

popped = stack.pop()  # 30
print(popped)
print(stack.items)  # [10, 20]`,

      peek: `# Python Stack Implementation - Peek Operation
class Stack:
    def __init__(self):
        self.items = []
        self.top = -1

    def peek(self):
        if self.is_empty():
            print("Stack is empty")
            return None
        
        top_element = self.items[self.top]
        print(f"Top element: {top_element}")
        return top_element

    def is_empty(self):
        return self.top == -1

# Usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)

top_element = stack.peek()  # 30
print(top_element)
print(stack.items)  # [10, 20, 30] (unchanged)`,

      isempty: `# Python Stack Implementation - Is Empty Operation
class Stack:
    def __init__(self):
        self.items = []
        self.top = -1

    def is_empty(self):
        empty = self.top == -1
        print(f"Stack is empty: {empty}")
        return empty

    # Alternative using list length
    def is_empty_alt(self):
        return len(self.items) == 0

# Usage
stack = Stack()
print(stack.is_empty())  # True

stack.push(10)
print(stack.is_empty())  # False

stack.pop()
print(stack.is_empty())  # True`,

      size: `# Python Stack Implementation - Size Operation
class Stack:
    def __init__(self):
        self.items = []
        self.top = -1

    def size(self):
        current_size = self.top + 1
        print(f"Stack size: {current_size}")
        return current_size

    # Alternative using list length
    def size_alt(self):
        return len(self.items)

    def push(self, element):
        self.top += 1
        self.items.append(element)

    def pop(self):
        if self.is_empty():
            return None
        self.top -= 1
        return self.items.pop()

    def is_empty(self):
        return self.top == -1

# Usage
stack = Stack()
print(stack.size())  # 0

stack.push(10)
stack.push(20)
print(stack.size())  # 2

stack.pop()
print(stack.size())  # 1`
    },

    java: {
      push: `// Java Stack Implementation - Push Operation
import java.util.ArrayList;
import java.util.List;

class Stack {
    private List<Integer> items;
    private int top;

    public Stack() {
        this.items = new ArrayList<>();
        this.top = -1;
    }

    // Push element to top of stack
    public void push(int element) {
        top++;
        items.add(element);
        System.out.println("Pushed " + element + " to stack");
    }

    // Alternative using array
    public void pushArray(int element, int[] stackArray) {
        if (top < stackArray.length - 1) {
            top++;
            stackArray[top] = element;
        }
    }
}

// Usage
Stack stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
System.out.println(stack.items); // [10, 20, 30]`,

      pop: `// Java Stack Implementation - Pop Operation
class Stack {
    private List<Integer> items;
    private int top;

    public Stack() {
        this.items = new ArrayList<>();
        this.top = -1;
    }

    // Pop element from top of stack
    public Integer pop() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return null;
        }

        int poppedElement = items.remove(top);
        top--;
        System.out.println("Popped " + poppedElement + " from stack");
        return poppedElement;
    }

    public boolean isEmpty() {
        return top == -1;
    }
}

// Usage
Stack stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

Integer popped = stack.pop(); // 30
System.out.println(popped);
System.out.println(stack.items); // [10, 20]`,

      peek: `// Java Stack Implementation - Peek Operation
class Stack {
    private List<Integer> items;
    private int top;

    public Stack() {
        this.items = new ArrayList<>();
        this.top = -1;
    }

    // Peek at top element without removing
    public Integer peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return null;
        }

        int topElement = items.get(top);
        System.out.println("Top element: " + topElement);
        return topElement;
    }

    public boolean isEmpty() {
        return top == -1;
    }
}

// Usage
Stack stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

Integer topElement = stack.peek(); // 30
System.out.println(topElement);
System.out.println(stack.items); // [10, 20, 30] (unchanged)`,

      isempty: `// Java Stack Implementation - Is Empty Operation
class Stack {
    private List<Integer> items;
    private int top;

    public Stack() {
        this.items = new ArrayList<>();
        this.top = -1;
    }

    // Check if stack is empty
    public boolean isEmpty() {
        boolean empty = top == -1;
        System.out.println("Stack is empty: " + empty);
        return empty;
    }

    // Alternative using list size
    public boolean isEmptyAlt() {
        return items.isEmpty();
    }
}

// Usage
Stack stack = new Stack();
System.out.println(stack.isEmpty()); // true

stack.push(10);
System.out.println(stack.isEmpty()); // false

stack.pop();
System.out.println(stack.isEmpty()); // true`,

      size: `// Java Stack Implementation - Size Operation
class Stack {
    private List<Integer> items;
    private int top;

    public Stack() {
        this.items = new ArrayList<>();
        this.top = -1;
    }

    // Get current size of stack
    public int size() {
        int currentSize = top + 1;
        System.out.println("Stack size: " + currentSize);
        return currentSize;
    }

    // Alternative using list size
    public int sizeAlt() {
        return items.size();
    }

    public void push(int element) {
        top++;
        items.add(element);
    }

    public Integer pop() {
        if (isEmpty()) {
            return null;
        }
        int popped = items.remove(top);
        top--;
        return popped;
    }

    public boolean isEmpty() {
        return top == -1;
    }
}

// Usage
Stack stack = new Stack();
System.out.println(stack.size()); // 0

stack.push(10);
stack.push(20);
System.out.println(stack.size()); // 2

stack.pop();
System.out.println(stack.size()); // 1`
    },

    cpp: {
      push: `// C++ Stack Implementation - Push Operation
#include <iostream>
#include <vector>
using namespace std;

class Stack {
private:
    vector<int> items;
    int top;

public:
    Stack() {
        top = -1;
    }

    // Push element to top of stack
    void push(int element) {
        top++;
        items.push_back(element);
        cout << "Pushed " << element << " to stack" << endl;
    }

    // Alternative using array
    void pushArray(int element, int stackArray[], int capacity) {
        if (top < capacity - 1) {
            top++;
            stackArray[top] = element;
        }
    }
};

// Usage
int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    stack.push(30);
    
    return 0;
}`,

      pop: `// C++ Stack Implementation - Pop Operation
class Stack {
private:
    vector<int> items;
    int top;

public:
    Stack() {
        top = -1;
    }

    // Pop element from top of stack
    int pop() {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return -1; // Return error value
        }

        int poppedElement = items[top];
        items.pop_back();
        top--;
        cout << "Popped " << poppedElement << " from stack" << endl;
        return poppedElement;
    }

    bool isEmpty() {
        return top == -1;
    }
};

// Usage
int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    stack.push(30);

    int popped = stack.pop(); // 30
    cout << popped << endl;
    
    return 0;
}`,

      peek: `// C++ Stack Implementation - Peek Operation
class Stack {
private:
    vector<int> items;
    int top;

public:
    Stack() {
        top = -1;
    }

    // Peek at top element without removing
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return -1; // Return error value
        }

        int topElement = items[top];
        cout << "Top element: " << topElement << endl;
        return topElement;
    }

    bool isEmpty() {
        return top == -1;
    }
};

// Usage
int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    stack.push(30);

    int topElement = stack.peek(); // 30
    cout << topElement << endl;
    
    return 0;
}`,

      isempty: `// C++ Stack Implementation - Is Empty Operation
class Stack {
private:
    vector<int> items;
    int top;

public:
    Stack() {
        top = -1;
    }

    // Check if stack is empty
    bool isEmpty() {
        bool empty = top == -1;
        cout << "Stack is empty: " << (empty ? "true" : "false") << endl;
        return empty;
    }

    // Alternative using vector size
    bool isEmptyAlt() {
        return items.empty();
    }
};

// Usage
int main() {
    Stack stack;
    stack.isEmpty(); // true

    stack.push(10);
    stack.isEmpty(); // false

    stack.pop();
    stack.isEmpty(); // true
    
    return 0;
}`,

      size: `// C++ Stack Implementation - Size Operation
class Stack {
private:
    vector<int> items;
    int top;

public:
    Stack() {
        top = -1;
    }

    // Get current size of stack
    int size() {
        int currentSize = top + 1;
        cout << "Stack size: " << currentSize << endl;
        return currentSize;
    }

    // Alternative using vector size
    int sizeAlt() {
        return items.size();
    }

    void push(int element) {
        top++;
        items.push_back(element);
    }

    int pop() {
        if (isEmpty()) {
            return -1;
        }
        int popped = items[top];
        items.pop_back();
        top--;
        return popped;
    }

    bool isEmpty() {
        return top == -1;
    }
};

// Usage
int main() {
    Stack stack;
    stack.size(); // 0

    stack.push(10);
    stack.push(20);
    stack.size(); // 2

    stack.pop();
    stack.size(); // 1
    
    return 0;
}`
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
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-stack-line text-2xl text-orange-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Stacks</h1>
              <p className="text-gray-600">LIFO (Last In First Out) data structure with push and pop operations</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Operation Selector */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Stack Operations</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {operations.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setSelectedOperation(op.id)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      selectedOperation === op.id
                        ? 'bg-orange-50 border-orange-300 text-orange-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${op.icon} mr-2`}></i>
                      <span className="font-medium">{op.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Input Controls */}
              <div className="mb-6 space-y-4">
                {(selectedOperation === 'push') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Push Value:</label>
                    <input
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(Number(e.target.value))}
                      disabled={isAnimating}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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

              {/* Stack Visualization */}
              <div className="mb-6">
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Stack Container */}
                    <div className="flex flex-col items-center">
                      {/* Stack Base */}
                      <div className="w-64 h-2 bg-gray-800 rounded-t-lg"></div>
                      
                      {/* Stack Elements */}
                      {stack.length === 0 ? (
                        <div className="w-64 h-48 border-4 border-t-0 border-l-4 border-r-4 border-b-4 border-gray-800 bg-gray-100 flex items-center justify-center text-gray-500">
                          <div className="text-center">
                            <i className="ri-stack-line text-4xl mb-2"></i>
                            <div className="text-lg font-semibold">Empty Stack</div>
                            <div className="text-sm">Push elements to start</div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          {[...stack].reverse().map((value, index) => (
                            <div key={index} className="relative">
                              {/* Stack Element */}
                              <div
                                className={`w-64 h-16 border-4 border-t-0 border-l-4 border-r-4 border-b-4 flex items-center justify-between px-4 font-bold text-lg transition-all duration-300 ${
                                  highlightIndex === index
                                    ? 'bg-yellow-500 text-white border-yellow-500 scale-105 shadow-lg'
                                    : 'bg-white text-gray-700 border-gray-300 hover:shadow-md'
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>Value: {value}</span>
                                  <span className="text-sm opacity-75">Index: {stack.length - 1 - index}</span>
                                </div>
                              </div>
                              
                              {/* Element Separator */}
                              {index < stack.length - 1 && (
                                <div className="w-64 h-1 bg-gray-300"></div>
                              )}
                            </div>
                          ))}
                          
                          {/* Stack Top Border */}
                          <div className="w-64 h-2 bg-gray-800 rounded-b-lg -mt-1"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Top Pointer Arrow */}
                    {stack.length > 0 && (
                      <div className="absolute -right-20 top-4 flex items-center">
                        <div className="flex flex-col items-center">
                          <div className="text-sm font-bold text-red-600 mb-1">TOP</div>
                          <div className="w-0.5 h-8 bg-red-500"></div>
                          <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-red-500 transform rotate-90"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Stack Info Panel */}
                    <div className="absolute -left-32 top-0 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">Stack Info</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{stack.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Top:</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                            {stack.length > 0 ? stack[0] : 'Empty'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operation Results */}
                {poppedValue !== null && (
                  <div className="text-center mt-6">
                    <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-lg p-3">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      <div>
                        <div className="text-sm text-green-600 font-semibold">Popped Successfully!</div>
                        <div className="text-lg font-bold text-green-800">{poppedValue}</div>
                      </div>
                    </div>
                  </div>
                )}

                {peekValue !== null && (
                  <div className="text-center mt-6">
                    <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <i className="ri-eye-line text-blue-600 mr-2"></i>
                      <div>
                        <div className="text-sm text-blue-600 font-semibold">Peek Value</div>
                        <div className="text-lg font-bold text-blue-800">{peekValue}</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedOperation === 'isempty' && currentStep > 0 && (
                  <div className="text-center mt-6">
                    <div className={`inline-flex items-center rounded-lg p-3 ${
                      stack.length === 0
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <i className={`ri-${stack.length === 0 ? 'check' : 'close'}-line text-${stack.length === 0 ? 'green' : 'red'}-600 mr-2`}></i>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Stack is Empty:</div>
                        <div className={`text-lg font-bold ${stack.length === 0 ? 'text-green-800' : 'text-red-800'}`}>
                          {stack.length === 0 ? 'TRUE' : 'FALSE'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedOperation === 'size' && currentStep > 0 && (
                  <div className="text-center mt-6">
                    <div className="inline-flex items-center bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <i className="ri-ruler-line text-purple-600 mr-2"></i>
                      <div>
                        <div className="text-sm text-purple-600 font-semibold">Current Stack Size</div>
                        <div className="text-lg font-bold text-purple-800">{stack.length} elements</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step Display */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Algorithm Steps</h3>
                <div className="space-y-2">
                  {selectedOperation === 'push' && [
                    'Check if stack is full',
                    'Add new element to top',
                    'Increment top pointer'
                  ].map((step, index) => (
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
                  
                  {selectedOperation === 'pop' && [
                    'Check if stack is empty',
                    'Remove element from top',
                    'Decrement top pointer'
                  ].map((step, index) => (
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

            {/* Stack Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stack Properties</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Characteristics</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      LIFO principle
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Dynamic size
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      O(1) operations
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Limited access
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Push:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pop:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peek:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stack Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Applications</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-800">Function Calls</div>
                  <div className="text-blue-600">Call stack management</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800">Undo/Redo</div>
                  <div className="text-green-600">Operation history</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-800">Expression Evaluation</div>
                  <div className="text-purple-600">Postfix/prefix notation</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-800">Browser History</div>
                  <div className="text-orange-600">Back navigation</div>
                </div>
              </div>
            </div>

            {/* Stack Types */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Implementation Types</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">Array-based</div>
                  <div className="text-gray-600">Fixed or dynamic array</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">Linked List-based</div>
                  <div className="text-gray-600">Dynamic size</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
