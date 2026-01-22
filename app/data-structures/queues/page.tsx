'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function QueuesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedOperation, setSelectedOperation] = useState('enqueue');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [queue, setQueue] = useState([10, 20, 30]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [newValue, setNewValue] = useState(25);
  const [dequeuedValue, setDequeuedValue] = useState(null);
  const [frontValue, setFrontValue] = useState(null);
  const [rearValue, setRearValue] = useState(null);

  const operations = [
    { id: 'enqueue', name: 'Enqueue', icon: 'ri-add-line' },
    { id: 'dequeue', name: 'Dequeue', icon: 'ri-subtract-line' },
    { id: 'front', name: 'Front', icon: 'ri-arrow-left-line' },
    { id: 'rear', name: 'Rear', icon: 'ri-arrow-right-line' },
    { id: 'isempty', name: 'Is Empty', icon: 'ri-checkbox-blank-circle-line' },
    { id: 'size', name: 'Size', icon: 'ri-ruler-line' }
  ];

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setHighlightIndex(-1);
    setDequeuedValue(null);
    setFrontValue(null);
    setRearValue(null);

    switch (selectedOperation) {
      case 'enqueue':
        await animateEnqueue();
        break;
      case 'dequeue':
        await animateDequeue();
        break;
      case 'front':
        await animateFront();
        break;
      case 'rear':
        await animateRear();
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

  const animateEnqueue = async () => {
    // Step 1: Check if queue is full
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Add element to rear
    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newQueue = [...queue, newValue];
    setQueue(newQueue);
    setHighlightIndex(newQueue.length - 1);
    
    // Step 3: Update rear pointer
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateDequeue = async () => {
    if (queue.length === 0) {
      // Step 1: Check if queue is empty
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Show empty message
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    // Step 1: Check if queue is empty
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Remove element from front
    setCurrentStep(1);
    setHighlightIndex(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dequeued = queue[0];
    setDequeuedValue(dequeued as any);
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    
    // Step 3: Update front pointer
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateFront = async () => {
    if (queue.length === 0) {
      // Step 1: Check if queue is empty
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Show empty message
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    // Step 1: Check if queue is empty
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Get front element
    setCurrentStep(1);
    setHighlightIndex(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFrontValue(queue[0] as any);
    
    // Step 3: Return front element
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateRear = async () => {
    if (queue.length === 0) {
      // Step 1: Check if queue is empty
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Show empty message
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    // Step 1: Check if queue is empty
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Get rear element
    setCurrentStep(1);
    setHighlightIndex(queue.length - 1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setRearValue(queue[queue.length - 1] as any);
    
    // Step 3: Return rear element
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateIsEmpty = async () => {
    // Step 1: Check queue size
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
    setDequeuedValue(null);
    setFrontValue(null);
    setRearValue(null);
    setQueue([10, 20, 30]);
  };

  const codeSnippets: Record<string, Record<string, string>> = {
    javascript: {
      enqueue: `// JavaScript Queue Implementation - Enqueue Operation
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = -1;
    }

    // Add element to rear of queue
    enqueue(element) {
        this.rear++;
        this.items[this.rear] = element;
        console.log(\`Enqueued \${element} to queue\`);
    }

    // Alternative using array methods
    enqueueAlt(element) {
        this.items.push(element);
        this.rear = this.items.length - 1;
    }
}

// Usage
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.items); // [10, 20, 30]`,

      dequeue: `// JavaScript Queue Implementation - Dequeue Operation
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = -1;
    }

    // Remove element from front of queue
    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return null;
        }

        const dequeuedElement = this.items[this.front];
        this.front++;
        console.log(\`Dequeued \${dequeuedElement} from queue\`);
        return dequeuedElement;
    }

    // Alternative using array methods
    dequeueAlt() {
        if (this.isEmpty()) {
            return null;
        }
        this.front++;
        return this.items.shift();
    }

    isEmpty() {
        return this.front > this.rear;
    }
}

// Usage
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

const dequeued = queue.dequeue(); // 10
console.log(dequeued);
console.log(queue.items); // [20, 30]`,

      front: `// JavaScript Queue Implementation - Front Operation
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = -1;
    }

    // Get front element without removing
    front() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return null;
        }

        const frontElement = this.items[this.front];
        console.log(\`Front element: \${frontElement}\`);
        return frontElement;
    }

    // Alternative using array methods
    frontAlt() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    isEmpty() {
        return this.front > this.rear;
    }
}

// Usage
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

const frontElement = queue.front(); // 10
console.log(frontElement);
console.log(queue.items); // [10, 20, 30] (unchanged)`,

      rear: `// JavaScript Queue Implementation - Rear Operation
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = -1;
    }

    // Get rear element without removing
    rear() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return null;
        }

        const rearElement = this.items[this.rear];
        console.log(\`Rear element: \${rearElement}\`);
        return rearElement;
    }

    // Alternative using array methods
    rearAlt() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.front > this.rear;
    }
}

// Usage
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

const rearElement = queue.rear(); // 30
console.log(rearElement);
console.log(queue.items); // [10, 20, 30] (unchanged)`,

      isempty: `// JavaScript Queue Implementation - Is Empty Operation
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = -1;
    }

    // Check if queue is empty
    isEmpty() {
        const empty = this.front > this.rear;
        console.log(\`Queue is empty: \${empty}\`);
        return empty;
    }

    // Alternative using array length
    isEmptyAlt() {
        return this.items.length === 0;
    }
}

// Usage
const queue = new Queue();
console.log(queue.isEmpty()); // true

queue.enqueue(10);
console.log(queue.isEmpty()); // false

queue.dequeue();
console.log(queue.isEmpty()); // true`,

      size: `// JavaScript Queue Implementation - Size Operation
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = -1;
    }

    // Get current size of queue
    size() {
        const currentSize = this.rear - this.front + 1;
        console.log(\`Queue size: \${currentSize}\`);
        return currentSize;
    }

    // Alternative using array length
    sizeAlt() {
        return this.items.length;
    }

    enqueue(element) {
        this.rear++;
        this.items[this.rear] = element;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const dequeued = this.items[this.front];
        this.front++;
        return dequeued;
    }

    isEmpty() {
        return this.front > this.rear;
    }
}

// Usage
const queue = new Queue();
console.log(queue.size()); // 0

queue.enqueue(10);
queue.enqueue(20);
console.log(queue.size()); // 2

queue.dequeue();
console.log(queue.size()); // 1`
    },

    python: {
      enqueue: `# Python Queue Implementation - Enqueue Operation
class Queue:
    def __init__(self):
        self.items = []
        self.front = 0
        self.rear = -1

    def enqueue(self, element):
        self.rear += 1
        self.items.append(element)
        print(f"Enqueued {element} to queue")

    # Alternative using list methods
    def enqueue_alt(self, element):
        self.items.append(element)
        self.rear = len(self.items) - 1

# Usage
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
print(queue.items)  # [10, 20, 30]`,

      dequeue: `# Python Queue Implementation - Dequeue Operation
class Queue:
    def __init__(self):
        self.items = []
        self.front = 0
        self.rear = -1

    def dequeue(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        
        dequeued = self.items[self.front]
        self.front += 1
        print(f"Dequeued {dequeued} from queue")
        return dequeued

    def is_empty(self):
        return self.front > self.rear

# Usage
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

dequeued = queue.dequeue()  # 10
print(dequeued)
print(queue.items)  # [10, 20, 30]`,

      front: `# Python Queue Implementation - Front Operation
class Queue:
    def __init__(self):
        self.items = []
        self.front = 0
        self.rear = -1

    def front(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        
        front_element = self.items[self.front]
        print(f"Front element: {front_element}")
        return front_element

    def is_empty(self):
        return self.front > self.rear

# Usage
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

front_element = queue.front()  # 10
print(front_element)
print(queue.items)  # [10, 20, 30] (unchanged)`,

      rear: `# Python Queue Implementation - Rear Operation
class Queue:
    def __init__(self):
        self.items = []
        self.front = 0
        self.rear = -1

    def rear(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        
        rear_element = self.items[self.rear]
        print(f"Rear element: {rear_element}")
        return rear_element

    def is_empty(self):
        return self.front > self.rear

# Usage
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

rear_element = queue.rear()  # 30
print(rear_element)
print(queue.items)  # [10, 20, 30] (unchanged)`,

      isempty: `# Python Queue Implementation - Is Empty Operation
class Queue:
    def __init__(self):
        self.items = []
        self.front = 0
        self.rear = -1

    def is_empty(self):
        empty = self.front > self.rear
        print(f"Queue is empty: {empty}")
        return empty

    # Alternative using list length
    def is_empty_alt(self):
        return len(self.items) == 0

# Usage
queue = Queue()
print(queue.is_empty())  # True

queue.enqueue(10)
print(queue.is_empty())  # False

queue.dequeue()
print(queue.is_empty())  # True`,

      size: `# Python Queue Implementation - Size Operation
class Queue:
    def __init__(self):
        self.items = []
        self.front = 0
        self.rear = -1

    def size(self):
        current_size = self.rear - self.front + 1
        print(f"Queue size: {current_size}")
        return current_size

    # Alternative using list length
    def size_alt(self):
        return len(self.items)

    def enqueue(self, element):
        self.rear += 1
        self.items.append(element)

    def dequeue(self):
        if self.is_empty():
            return None
        dequeued = self.items[self.front]
        self.front += 1
        return dequeued

    def is_empty(self):
        return self.front > self.rear

# Usage
queue = Queue()
print(queue.size())  # 0

queue.enqueue(10)
queue.enqueue(20)
print(queue.size())  # 2

queue.dequeue()
print(queue.size())  # 1`
    },

    java: {
      enqueue: `// Java Queue Implementation - Enqueue Operation
import java.util.LinkedList;
import java.util.Queue;

class CustomQueue {
    private Queue<Integer> items;
    private int front;
    private int rear;

    public CustomQueue() {
        this.items = new LinkedList<>();
        this.front = 0;
        this.rear = -1;
    }

    // Add element to rear of queue
    public void enqueue(int element) {
        rear++;
        items.add(element);
        System.out.println("Enqueued " + element + " to queue");
    }

    // Alternative using array
    public void enqueueArray(int element, int[] queueArray, int capacity) {
        if (rear < capacity - 1) {
            rear++;
            queueArray[rear] = element;
        }
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        CustomQueue queue = new CustomQueue();
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
    }
}`,

      dequeue: `// Java Queue Implementation - Dequeue Operation
class CustomQueue {
    private Queue<Integer> items;
    private int front;
    private int rear;

    public CustomQueue() {
        this.items = new LinkedList<>();
        this.front = 0;
        this.rear = -1;
    }

    // Remove element from front of queue
    public Integer dequeue() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return null;
        }

        int dequeuedElement = items.poll();
        front++;
        System.out.println("Dequeued " + dequeuedElement + " from queue");
        return dequeuedElement;
    }

    public boolean isEmpty() {
        return front > rear;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        CustomQueue queue = new CustomQueue();
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);

        Integer dequeued = queue.dequeue(); // 10
        System.out.println(dequeued);
    }
}`,

      front: `// Java Queue Implementation - Front Operation
class CustomQueue {
    private Queue<Integer> items;
    private int front;
    private int rear;

    public CustomQueue() {
        this.items = new LinkedList<>();
        this.front = 0;
        this.rear = -1;
    }

    // Get front element without removing
    public Integer front() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return null;
        }

        int frontElement = items.peek();
        System.out.println("Front element: " + frontElement);
        return frontElement;
    }

    public boolean isEmpty() {
        return front > rear;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        CustomQueue queue = new CustomQueue();
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);

        Integer frontElement = queue.front(); // 10
        System.out.println(frontElement);
    }
}`,

      rear: `// Java Queue Implementation - Rear Operation
class CustomQueue {
    private Queue<Integer> items;
    private int front;
    private int rear;

    public CustomQueue() {
        this.items = new LinkedList<>();
        this.front = 0;
        this.rear = -1;
    }

    // Get rear element without removing
    public Integer rear() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return null;
        }

        // Convert to array to get last element
        Integer[] array = items.toArray(new Integer[0]);
        int rearElement = array[rear];
        System.out.println("Rear element: " + rearElement);
        return rearElement;
    }

    public boolean isEmpty() {
        return front > rear;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        CustomQueue queue = new CustomQueue();
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);

        Integer rearElement = queue.rear(); // 30
        System.out.println(rearElement);
    }
}`,

      isempty: `// Java Queue Implementation - Is Empty Operation
class CustomQueue {
    private Queue<Integer> items;
    private int front;
    private int rear;

    public CustomQueue() {
        this.items = new LinkedList<>();
        this.front = 0;
        this.rear = -1;
    }

    // Check if queue is empty
    public boolean isEmpty() {
        boolean empty = front > rear;
        System.out.println("Queue is empty: " + empty);
        return empty;
    }

    // Alternative using queue size
    public boolean isEmptyAlt() {
        return items.isEmpty();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        CustomQueue queue = new CustomQueue();
        System.out.println(queue.isEmpty()); // true

        queue.enqueue(10);
        System.out.println(queue.isEmpty()); // false

        queue.dequeue();
        System.out.println(queue.isEmpty()); // true
    }
}`,

      size: `// Java Queue Implementation - Size Operation
class CustomQueue {
    private Queue<Integer> items;
    private int front;
    private int rear;

    public CustomQueue() {
        this.items = new LinkedList<>();
        this.front = 0;
        this.rear = -1;
    }

    // Get current size of queue
    public int size() {
        int currentSize = rear - front + 1;
        System.out.println("Queue size: " + currentSize);
        return currentSize;
    }

    // Alternative using queue size
    public int sizeAlt() {
        return items.size();
    }

    public void enqueue(int element) {
        rear++;
        items.add(element);
    }

    public Integer dequeue() {
        if (isEmpty()) {
            return null;
        }
        int dequeued = items.poll();
        front++;
        return dequeued;
    }

    public boolean isEmpty() {
        return front > rear;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        CustomQueue queue = new CustomQueue();
        System.out.println(queue.size()); // 0

        queue.enqueue(10);
        queue.enqueue(20);
        System.out.println(queue.size()); // 2

        queue.dequeue();
        System.out.println(queue.size()); // 1
    }
}`
    },

    cpp: {
      enqueue: `// C++ Queue Implementation - Enqueue Operation
#include <iostream>
#include <queue>
using namespace std;

class CustomQueue {
private:
    int items[100]; // Fixed size array
    int front;
    int rear;

public:
    CustomQueue() {
        front = 0;
        rear = -1;
    }

    // Add element to rear of queue
    void enqueue(int element) {
        if (rear >= 99) {
            cout << "Queue is full" << endl;
            return;
        }
        rear++;
        items[rear] = element;
        cout << "Enqueued " << element << " to queue" << endl;
    }

    // Alternative using STL queue
    void enqueueSTL(queue<int>& q, int element) {
        q.push(element);
    }
};

// Usage
int main() {
    CustomQueue queue;
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    
    return 0;
}`,

      dequeue: `// C++ Queue Implementation - Dequeue Operation
class CustomQueue {
private:
    int items[100];
    int front;
    int rear;

public:
    CustomQueue() {
        front = 0;
        rear = -1;
    }

    // Remove element from front of queue
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return -1; // Return error value
        }

        int dequeuedElement = items[front];
        front++;
        cout << "Dequeued " << dequeuedElement << " from queue" << endl;
        return dequeuedElement;
    }

    bool isEmpty() {
        return front > rear;
    }
};

// Usage
int main() {
    CustomQueue queue;
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);

    int dequeued = queue.dequeue(); // 10
    cout << dequeued << endl;
    
    return 0;
}`,

      front: `// C++ Queue Implementation - Front Operation
class CustomQueue {
private:
    int items[100];
    int front;
    int rear;

public:
    CustomQueue() {
        front = 0;
        rear = -1;
    }

    // Get front element without removing
    int frontElement() {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return -1; // Return error value
        }

        int frontElement = items[front];
        cout << "Front element: " << frontElement << endl;
        return frontElement;
    }

    bool isEmpty() {
        return front > rear;
    }
};

// Usage
int main() {
    CustomQueue queue;
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);

    int frontElement = queue.frontElement(); // 10
    cout << frontElement << endl;
    
    return 0;
}`,

      rear: `// C++ Queue Implementation - Rear Operation
class CustomQueue {
private:
    int items[100];
    int front;
    int rear;

public:
    CustomQueue() {
        front = 0;
        rear = -1;
    }

    // Get rear element without removing
    int rearElement() {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return -1; // Return error value
        }

        int rearElement = items[rear];
        cout << "Rear element: " << rearElement << endl;
        return rearElement;
    }

    bool isEmpty() {
        return front > rear;
    }
};

// Usage
int main() {
    CustomQueue queue;
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);

    int rearElement = queue.rearElement(); // 30
    cout << rearElement << endl;
    
    return 0;
}`,

      isempty: `// C++ Queue Implementation - Is Empty Operation
class CustomQueue {
private:
    int items[100];
    int front;
    int rear;

public:
    CustomQueue() {
        front = 0;
        rear = -1;
    }

    // Check if queue is empty
    bool isEmpty() {
        bool empty = front > rear;
        cout << "Queue is empty: " << (empty ? "true" : "false") << endl;
        return empty;
    }

    // Alternative using size tracking
    bool isEmptyAlt() {
        return (rear - front + 1) == 0;
    }
};

// Usage
int main() {
    CustomQueue queue;
    queue.isEmpty(); // true

    queue.enqueue(10);
    queue.isEmpty(); // false

    queue.dequeue();
    queue.isEmpty(); // true
    
    return 0;
}`,

      size: `// C++ Queue Implementation - Size Operation
class CustomQueue {
private:
    int items[100];
    int front;
    int rear;

public:
    CustomQueue() {
        front = 0;
        rear = -1;
    }

    // Get current size of queue
    int size() {
        int currentSize = rear - front + 1;
        cout << "Queue size: " << currentSize << endl;
        return currentSize;
    }

    void enqueue(int element) {
        if (rear < 99) {
            rear++;
            items[rear] = element;
        }
    }

    int dequeue() {
        if (isEmpty()) {
            return -1;
        }
        int dequeued = items[front];
        front++;
        return dequeued;
    }

    bool isEmpty() {
        return front > rear;
    }
};

// Usage
int main() {
    CustomQueue queue;
    queue.size(); // 0

    queue.enqueue(10);
    queue.enqueue(20);
    queue.size(); // 2

    queue.dequeue();
    queue.size(); // 1
    
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
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-order-play-line text-2xl text-teal-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Queues</h1>
              <p className="text-gray-600">FIFO (First In First Out) data structure with enqueue and dequeue operations</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Operation Selector */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Queue Operations</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {operations.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setSelectedOperation(op.id)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      selectedOperation === op.id
                        ? 'bg-teal-50 border-teal-300 text-teal-700'
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
                {(selectedOperation === 'enqueue') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enqueue Value:</label>
                    <input
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(Number(e.target.value))}
                      disabled={isAnimating}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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

              {/* Queue Visualization */}
              <div className="mb-6">
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Queue Container */}
                    <div className="flex items-center space-x-2">
                      {queue.length === 0 ? (
                        <div className="w-64 h-16 border-4 border-gray-800 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                          Empty Queue
                        </div>
                      ) : (
                        queue.map((value, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-300 ${
                                highlightIndex === index
                                  ? 'bg-yellow-500 text-white border-yellow-500 scale-110'
                                  : 'bg-white text-gray-700 border-gray-300'
                              }`}
                            >
                              {value}
                            </div>
                            {index < queue.length - 1 && (
                              <div className="w-4 h-0.5 bg-gray-400"></div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    
                    {/* Front and Rear Pointers */}
                    {queue.length > 0 && (
                      <>
                        <div className="absolute -left-20 top-0 flex items-center">
                          <div className="text-sm font-semibold text-blue-700">FRONT</div>
                          <div className="w-8 h-0.5 bg-blue-500"></div>
                        </div>
                        <div className="absolute -right-20 top-0 flex items-center">
                          <div className="text-sm font-semibold text-green-700">REAR</div>
                          <div className="w-8 h-0.5 bg-green-500"></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Operation Results */}
                {dequeuedValue !== null && (
                  <div className="text-center mt-4">
                    <div className="text-sm text-gray-600 mb-2">Dequeued Value:</div>
                    <div className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-lg font-semibold">
                      {dequeuedValue}
                    </div>
                  </div>
                )}

                {frontValue !== null && (
                  <div className="text-center mt-4">
                    <div className="text-sm text-gray-600 mb-2">Front Value:</div>
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
                      {frontValue}
                    </div>
                  </div>
                )}

                {rearValue !== null && (
                  <div className="text-center mt-4">
                    <div className="text-sm text-gray-600 mb-2">Rear Value:</div>
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                      {rearValue}
                    </div>
                  </div>
                )}

                {selectedOperation === 'isempty' && currentStep > 0 && (
                  <div className="text-center mt-4">
                    <div className="text-sm text-gray-600 mb-2">Queue is Empty:</div>
                    <div className={`inline-block px-4 py-2 rounded-lg font-semibold ${
                      queue.length === 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {queue.length === 0 ? 'True' : 'False'}
                    </div>
                  </div>
                )}

                {selectedOperation === 'size' && currentStep > 0 && (
                  <div className="text-center mt-4">
                    <div className="text-sm text-gray-600 mb-2">Queue Size:</div>
                    <div className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-lg font-semibold">
                      {queue.length}
                    </div>
                  </div>
                )}
              </div>

              {/* Step Display */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Algorithm Steps</h3>
                <div className="space-y-2">
                  {selectedOperation === 'enqueue' && [
                    'Check if queue is full',
                    'Add element to rear',
                    'Update rear pointer'
                  ].map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 rounded-lg ${
                        currentStep === index && isAnimating
                          ? 'bg-teal-100 text-teal-800'
                          : currentStep > index && isAnimating
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          currentStep === index && isAnimating
                            ? 'bg-teal-600 text-white'
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
                  
                  {selectedOperation === 'dequeue' && [
                    'Check if queue is empty',
                    'Remove element from front',
                    'Update front pointer'
                  ].map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 rounded-lg ${
                        currentStep === index && isAnimating
                          ? 'bg-teal-100 text-teal-800'
                          : currentStep > index && isAnimating
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          currentStep === index && isAnimating
                            ? 'bg-teal-600 text-white'
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

            {/* Queue Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Queue Properties</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Characteristics</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      FIFO principle
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
                      Ordered processing
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Enqueue:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dequeue:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Front/Rear:</span>
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
            {/* Queue Applications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Applications</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-800">Task Scheduling</div>
                  <div className="text-blue-600">CPU process management</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800">Print Spooling</div>
                  <div className="text-green-600">Document printing order</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-800">Call Centers</div>
                  <div className="text-purple-600">Customer service lines</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-800">Message Queues</div>
                  <div className="text-orange-600">Async communication</div>
                </div>
              </div>
            </div>

            {/* Queue Types */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Queue Types</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">Simple Queue</div>
                  <div className="text-gray-600">Basic FIFO</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">Circular Queue</div>
                  <div className="text-gray-600">Circular buffer</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">Priority Queue</div>
                  <div className="text-gray-600">Priority-based</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">Deque</div>
                  <div className="text-gray-600">Double-ended</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
