'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function StringsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedOperation, setSelectedOperation] = useState('concatenation');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [string1, setString1] = useState('Hello');
  const [string2, setString2] = useState('World');
  const [result, setResult] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [searchText, setSearchText] = useState('World');
  const [foundIndex, setFoundIndex] = useState(-1);

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setHighlightIndex(-1);
    setFoundIndex(-1);

    switch (selectedOperation) {
      case 'concatenation':
        await animateConcatenation();
        break;
      case 'substring':
        await animateSubstring();
        break;
      case 'search':
        await animateSearch();
        break;
      case 'replace':
        await animateReplace();
        break;
      case 'reverse':
        await animateReverse();
        break;
      case 'palindrome':
        await animatePalindrome();
        break;
    }

    setIsAnimating(false);
  };

  const animateConcatenation = async () => {
    // Step 1: Combine string1 and string2
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Add space between strings
    setCurrentStep(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setResult(string1 + ' ' + string2);
    
    // Step 3: Return concatenated result
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateSubstring = async () => {
    // Step 1: Identify start and end positions
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Extract substring
    setCurrentStep(1);
    setHighlightIndex(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep(2);
    setResult(string1.substring(0, 3));
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 3: Return extracted substring
    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateSearch = async () => {
    // Step 1: Start from beginning of string
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Compare each substring with search text
    setCurrentStep(1);
    let found = false;
    for (let i = 0; i <= string1.length - searchText.length; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
      if (string1.substring(i, i + searchText.length) === searchText) {
        setFoundIndex(i);
        found = true;
        break;
      }
    }
    
    // Step 3: Return index if found, or -1 if not found
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!found) {
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const animateReplace = async () => {
    // Step 1: Find all occurrences of search text
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Replace with new text
    setCurrentStep(1);
    setHighlightIndex(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep(2);
    setResult(string1.replace(searchText, 'DSA'));
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 3: Return modified string
    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animateReverse = async () => {
    // Step 1: Convert string to character array
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Reverse the character order
    setCurrentStep(1);
    const chars = string1.split('');
    for (let i = 0; i < chars.length / 2; i++) {
      setHighlightIndex(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setResult(string1.split('').reverse().join(''));
    
    // Step 3: Return reversed string
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const animatePalindrome = async () => {
    // Step 1: Clean string (remove non-alphanumeric, convert to lowercase)
    setCurrentStep(0);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Compare characters from both ends
    setCurrentStep(1);
    const cleanStr = string1.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleanStr.length - 1;
    let isPal = true;
    
    while (left < right) {
      setHighlightIndex(left);
      await new Promise(resolve => setTimeout(resolve, 500));
      if (cleanStr[left] !== cleanStr[right]) {
        isPal = false;
        break;
      }
      left++;
      right--;
    }
    
    setResult(isPal ? 'Palindrome' : 'Not a Palindrome');
    
    // Step 3: Return result
    setCurrentStep(isPal ? 2 : 3);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setHighlightIndex(-1);
    setFoundIndex(-1);
    setResult('');
  };

  const operations = [
    { id: 'concatenation', name: 'Concatenation', icon: 'ri-link' },
    { id: 'substring', name: 'Substring', icon: 'ri-scissors-cut' },
    { id: 'search', name: 'Search', icon: 'ri-search-line' },
    { id: 'replace', name: 'Replace', icon: 'ri-refresh-line' },
    { id: 'reverse', name: 'Reverse', icon: 'ri-arrow-left-right-line' },
    { id: 'palindrome', name: 'Palindrome Check', icon: 'ri-flip-horizontal' }
  ];

  const codeSnippets: Record<string, Record<string, string>> = {
    javascript: {
      concatenation: `// JavaScript String Concatenation
let str1 = "Hello";
let str2 = "World";
let result = str1 + " " + str2; // "Hello World"

// Using template literals
let result2 = \`\${str1} \${str2}\`; // "Hello World"

// Using concat method
let result3 = str1.concat(" ", str2); // "Hello World"

console.log(result);`,
      
      substring: `// JavaScript Substring Operations
let text = "JavaScript Programming";

// substring() - extracts between indices
let sub1 = text.substring(0, 10); // "JavaScript"

// slice() - similar to substring
let sub2 = text.slice(11); // "Programming"

// substr() - deprecated but still works
let sub3 = text.substr(0, 4); // "Java"

console.log(sub1, sub2, sub3);`,

      search: `// JavaScript String Search
let text = "Hello World, Hello Universe";

// indexOf() - first occurrence
let index1 = text.indexOf("Hello"); // 0

// lastIndexOf() - last occurrence
let index2 = text.lastIndexOf("Hello"); // 13

// includes() - check if exists
let exists = text.includes("World"); // true

// startsWith() and endsWith()
let starts = text.startsWith("Hello"); // true
let ends = text.endsWith("Universe"); // true

console.log(index1, index2, exists, starts, ends);`,

      replace: `// JavaScript String Replace
let text = "Hello World, Hello Universe";

// replace() - replace first occurrence
let result1 = text.replace("Hello", "Hi"); // "Hi World, Hello Universe"

// replaceAll() - replace all occurrences
let result2 = text.replaceAll("Hello", "Hi"); // "Hi World, Hi Universe"

// Using regex with replace
let result3 = text.replace(/Hello/g, "Hi"); // "Hi World, Hi Universe"

// Case-insensitive replace
let result4 = text.replace(/hello/gi, "Hi"); // "Hi World, Hi Universe"

console.log(result1, result2, result3, result4);`,

      reverse: `// JavaScript String Reverse
let text = "Hello World";

// Method 1: Using split, reverse, join
let reversed1 = text.split('').reverse().join(''); // "dlroW olleH"

// Method 2: Using for loop
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}
let reversed2 = reverseString(text); // "dlroW olleH"

console.log(reversed1, reversed2);`,

      palindrome: `// JavaScript Palindrome Check
function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Compare with reversed string
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}

// Test cases
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello")); // false

// Two-pointer approach
function isPalindromeTwoPointers(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleanStr.length - 1;
    
    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`
    },

    python: {
      concatenation: `# Python String Concatenation
str1 = "Hello"
str2 = "World"

# Using + operator
result1 = str1 + " " + str2  # "Hello World"

# Using f-strings (Python 3.6+)
result2 = f"{str1} {str2}"  # "Hello World"

# Using join() method
result3 = " ".join([str1, str2])  # "Hello World"

# Using format() method
result4 = "{} {}".format(str1, str2)  # "Hello World"

print(result1, result2, result3, result4)`,

      substring: `# Python Substring Operations
text = "Python Programming"

# Slicing - most common way
sub1 = text[0:6]  # "Python"
sub2 = text[7:]    # "Programming"
sub3 = text[:4]    # "Pyth"

# Using find() to get substring
index = text.find("Programming")
if index != -1:
    sub4 = text[index:index+11]  # "Programming"

print(sub1, sub2, sub3, sub4)`,

      search: `# Python String Search
text = "Hello World, Hello Universe"

# find() - first occurrence (returns -1 if not found)
index1 = text.find("Hello")  # 0

# rfind() - last occurrence
index2 = text.rfind("Hello")  # 13

# index() - similar to find but raises ValueError
try:
    index3 = text.index("Hello")  # 0
except ValueError:
    print("Not found")

# "in" operator - check if exists
exists = "Hello" in text  # True

# startswith() and endswith()
starts = text.startswith("Hello")  # True
ends = text.endswith("Universe")  # True

print(index1, index2, exists, starts, ends)`,

      replace: `# Python String Replace
text = "Hello World, Hello Universe"

# replace() - replace all occurrences by default
result1 = text.replace("Hello", "Hi")  # "Hi World, Hi Universe"

# Replace only first n occurrences
result2 = text.replace("Hello", "Hi", 1)  # "Hi World, Hello Universe"

# Case-insensitive replace using regex
import re
result3 = re.sub(r'hello', 'Hi', text, flags=re.IGNORECASE)  # "Hi World, Hi Universe"

print(result1, result2, result3)`,

      reverse: `# Python String Reverse
text = "Hello World"

# Method 1: Using slicing
reversed1 = text[::-1]  # "dlroW olleH"

# Method 2: Using reversed() function
reversed2 = ''.join(reversed(text))  # "dlroW olleH"

# Method 3: Using for loop
def reverse_string(s):
    reversed_str = ""
    for char in s:
        reversed_str = char + reversed_str
    return reversed_str

reversed3 = reverse_string(text)  # "dlroW olleH"

print(reversed1, reversed2, reversed3)`,

      palindrome: `# Python Palindrome Check
def is_palindrome(s):
    # Remove non-alphanumeric characters and convert to lowercase
    clean_str = ''.join(char.lower() for char in s if char.isalnum())
    
    # Compare with reversed string
    return clean_str == clean_str[::-1]

# Test cases
print(is_palindrome("racecar"))  # True
print(is_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_palindrome("hello"))  # False

# Two-pointer approach
def is_palindrome_two_pointers(s):
    clean_str = ''.join(char.lower() for char in s if char.isalnum())
    left, right = 0, len(clean_str) - 1
    
    while left < right:
        if clean_str[left] != clean_str[right]:
            return False
        left += 1
        right -= 1
    return True`
    },

    java: {
      concatenation: `// Java String Concatenation
public class StringConcatenation {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "World";
        
        // Using + operator
        String result1 = str1 + " " + str2; // "Hello World"
        
        // Using concat() method
        String result2 = str1.concat(" ").concat(str2); // "Hello World"
        
        // Using StringBuilder (more efficient for multiple concatenations)
        StringBuilder sb = new StringBuilder();
        sb.append(str1).append(" ").append(str2);
        String result3 = sb.toString(); // "Hello World"
        
        // Using String.format()
        String result4 = String.format("%s %s", str1, str2); // "Hello World"
        
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
        System.out.println(result4);
    }
}`,

      substring: `// Java Substring Operations
public class SubstringOperations {
    public static void main(String[] args) {
        String text = "Java Programming";
        
        // substring(beginIndex) - from index to end
        String sub1 = text.substring(5); // " Programming"
        
        // substring(beginIndex, endIndex) - between indices
        String sub2 = text.substring(0, 4); // "Java"
        
        // Using charAt() for single character
        char firstChar = text.charAt(0); // 'J'
        
        // Get character array
        char[] chars = text.toCharArray();
        
        System.out.println(sub1);
        System.out.println(sub2);
        System.out.println(firstChar);
    }
}`,

      search: `// Java String Search
public class StringSearch {
    public static void main(String[] args) {
        String text = "Hello World, Hello Universe";
        
        // indexOf() - first occurrence
        int index1 = text.indexOf("Hello"); // 0
        
        // lastIndexOf() - last occurrence
        int index2 = text.lastIndexOf("Hello"); // 13
        
        // contains() - check if exists
        boolean exists = text.contains("World"); // true
        
        // startsWith() and endsWith()
        boolean starts = text.startsWith("Hello"); // true
        boolean ends = text.endsWith("Universe"); // true
        
        System.out.println("First index: " + index1);
        System.out.println("Last index: " + index2);
        System.out.println("Contains: " + exists);
        System.out.println("Starts with: " + starts);
        System.out.println("Ends with: " + ends);
    }
}`,

      replace: `// Java String Replace
public class StringReplace {
    public static void main(String[] args) {
        String text = "Hello World, Hello Universe";
        
        // replace() - replace all occurrences of char
        String result1 = text.replace('o', '0'); // "Hell0 W0rld, Hell0 Universe"
        
        // replace() - replace all occurrences of CharSequence
        String result2 = text.replace("Hello", "Hi"); // "Hi World, Hi Universe"
        
        // replaceFirst() - replace only first occurrence
        String result3 = text.replaceFirst("Hello", "Hi"); // "Hi World, Hello Universe"
        
        // replaceAll() - using regex
        String result4 = text.replaceAll("Hello", "Hi"); // "Hi World, Hi Universe"
        
        System.out.println(result1);
        System.out.println(result2);
        System.out.println(result3);
        System.out.println(result4);
    }
}`,

      reverse: `// Java String Reverse
public class StringReverse {
    public static void main(String[] args) {
        String text = "Hello World";
        
        // Method 1: Using StringBuilder
        String reversed1 = new StringBuilder(text).reverse().toString();
        
        // Method 2: Using char array
        char[] chars = text.toCharArray();
        String reversed2 = "";
        for (int i = chars.length - 1; i >= 0; i--) {
            reversed2 += chars[i];
        }
        
        // Method 3: Using recursion
        String reversed3 = reverseRecursive(text);
        
        System.out.println(reversed1);
        System.out.println(reversed2);
        System.out.println(reversed3);
    }
    
    public static String reverseRecursive(String str) {
        if (str.isEmpty()) {
            return str;
        }
        return reverseRecursive(str.substring(1)) + str.charAt(0);
    }
}`,

      palindrome: `// Java Palindrome Check
public class PalindromeCheck {
    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar")); // true
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // true
        System.out.println(isPalindrome("hello")); // false
    }
    
    public static boolean isPalindrome(String str) {
        // Remove non-alphanumeric characters and convert to lowercase
        String cleanStr = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        
        // Compare with reversed string
        String reversed = new StringBuilder(cleanStr).reverse().toString();
        return cleanStr.equals(reversed);
    }
    
    // Two-pointer approach
    public static boolean isPalindromeTwoPointers(String str) {
        String cleanStr = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        int left = 0;
        int right = cleanStr.length() - 1;
        
        while (left < right) {
            if (cleanStr.charAt(left) != cleanStr.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`
    },

    cpp: {
      concatenation: `// C++ String Concatenation
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str1 = "Hello";
    string str2 = "World";
    
    // Using + operator
    string result1 = str1 + " " + str2; // "Hello World"
    
    // Using append() method
    string result2 = str1;
    result2.append(" ");
    result2.append(str2); // "Hello World"
    
    // Using stringstream for complex concatenations
    #include <sstream>
    stringstream ss;
    ss << str1 << " " << str2;
    string result3 = ss.str(); // "Hello World"
    
    cout << result1 << endl;
    cout << result2 << endl;
    cout << result3 << endl;
    
    return 0;
}`,

      substring: `// C++ Substring Operations
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "C++ Programming";
    
    // substr(position, length)
    string sub1 = text.substr(0, 3); // "C++"
    string sub2 = text.substr(4); // "Programming"
    
    // Using iterators
    string sub3(text.begin(), text.begin() + 3); // "C++"
    
    // Find and extract
    size_t pos = text.find("Programming");
    string sub4 = text.substr(pos, 11); // "Programming"
    
    cout << sub1 << endl;
    cout << sub2 << endl;
    cout << sub3 << endl;
    cout << sub4 << endl;
    
    return 0;
}`,

      search: `// C++ String Search
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "Hello World, Hello Universe";
    
    // find() - first occurrence
    size_t pos1 = text.find("Hello"); // 0
    
    // rfind() - last occurrence
    size_t pos2 = text.rfind("Hello"); // 13
    
    // Check if found (find returns string::npos if not found)
    bool exists = text.find("World") != string::npos; // true
    
    // Compare substrings
    bool startsWith = text.compare(0, 5, "Hello") == 0; // true
    
    cout << "First position: " << pos1 << endl;
    cout << "Last position: " << pos2 << endl;
    cout << "Contains: " << (exists ? "true" : "false") << endl;
    cout << "Starts with: " << (startsWith ? "true" : "false") << endl;
    
    return 0;
}`,

      replace: `// C++ String Replace
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string text = "Hello World, Hello Universe";
    
    // Manual replacement
    string result1 = text;
    size_t pos = result1.find("Hello");
    while (pos != string::npos) {
        result1.replace(pos, 5, "Hi");
        pos = result1.find("Hello", pos + 2);
    }
    
    // Using replace() for single occurrence
    string result2 = text;
    size_t pos2 = result2.find("Hello");
    if (pos2 != string::npos) {
        result2.replace(pos2, 5, "Hi");
    }
    
    cout << "Original: " << text << endl;
    cout << "Replaced all: " << result1 << endl;
    cout << "Replaced first: " << result2 << endl;
    
    return 0;
}`,

      reverse: `// C++ String Reverse
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string text = "Hello World";
    
    // Method 1: Using reverse() algorithm
    string reversed1 = text;
    reverse(reversed1.begin(), reversed1.end());
    
    // Method 2: Manual reversal
    string reversed2 = text;
    int left = 0, right = reversed2.length() - 1;
    while (left < right) {
        swap(reversed2[left], reversed2[right]);
        left++;
        right--;
    }
    
    // Method 3: Using reverse iterators
    string reversed3(text.rbegin(), text.rend());
    
    cout << "Original: " << text << endl;
    cout << "Reversed1: " << reversed1 << endl;
    cout << "Reversed2: " << reversed2 << endl;
    cout << "Reversed3: " << reversed3 << endl;
    
    return 0;
}`,

      palindrome: `// C++ Palindrome Check
#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

bool isPalindrome(const string& str) {
    // Remove non-alphanumeric characters and convert to lowercase
    string cleanStr;
    for (char c : str) {
        if (isalnum(c)) {
            cleanStr += tolower(c);
        }
    }
    
    // Compare with reversed string
    string reversed = cleanStr;
    reverse(reversed.begin(), reversed.end());
    
    return cleanStr == reversed;
}

// Two-pointer approach
bool isPalindromeTwoPointers(const string& str) {
    int left = 0, right = str.length() - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters
        while (left < right && !isalnum(str[left])) left++;
        while (left < right && !isalnum(str[right])) right--;
        
        if (tolower(str[left]) != tolower(str[right])) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

int main() {
    cout << boolalpha;
    cout << isPalindrome("racecar") << endl; // true
    cout << isPalindrome("A man, a plan, a canal: Panama") << endl; // true
    cout << isPalindrome("hello") << endl; // false
    
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-double-quotes-l text-2xl text-green-600"></i>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Strings</h1>
              <p className="text-gray-600">Sequence of characters with specialized string manipulation operations</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Operation Selector */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">String Operations</h2>
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
                      <span className="font-medium">{op.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Input Controls */}
              <div className="mb-6 space-y-4">
                {selectedOperation === 'concatenation' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">String 1:</label>
                      <input
                        type="text"
                        value={string1}
                        onChange={(e) => setString1(e.target.value)}
                        disabled={isAnimating}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">String 2:</label>
                      <input
                        type="text"
                        value={string2}
                        onChange={(e) => setString2(e.target.value)}
                        disabled={isAnimating}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}
                
                {selectedOperation === 'search' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Text:</label>
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      disabled={isAnimating}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}

                {selectedOperation === 'replace' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Replace Text:</label>
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      disabled={isAnimating}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

              {/* Visualization */}
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {string1.split('').map((char, index) => (
                      <div
                        key={index}
                        className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-300 ${
                          highlightIndex === index
                            ? 'bg-yellow-500 text-white border-yellow-500 scale-110'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                  
                  {selectedOperation === 'concatenation' && (
                    <div className="text-2xl text-gray-600">+</div>
                  )}
                  
                  {selectedOperation === 'concatenation' && (
                    <div className="flex items-center space-x-1">
                      {string2.split('').map((char, index) => (
                        <div
                          key={index}
                          className="w-10 h-10 flex items-center justify-center border-2 rounded-lg font-bold text-lg bg-white text-gray-700 border-gray-300"
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {result && (
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Result:</div>
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                      {result}
                    </div>
                  </div>
                )}

                {foundIndex !== -1 && (
                  <div className="text-center">
                    <div className="text-sm text-green-600 mb-2">
                      Found "{searchText}" at index {foundIndex}
                    </div>
                  </div>
                )}
              </div>

              {/* Step Display */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Algorithm Steps</h3>
                <div className="space-y-2">
                  {selectedOperation === 'concatenation' && [
                    'Combine string1 and string2',
                    'Add space between strings',
                    'Return concatenated result'
                  ].map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 rounded-lg ${
                        currentStep === index && isAnimating
                          ? 'bg-green-100 text-green-800'
                          : currentStep > index && isAnimating
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          currentStep === index && isAnimating
                            ? 'bg-green-600 text-white'
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
                  
                  {selectedOperation === 'search' && [
                    'Start from beginning of string',
                    'Compare each substring with search text',
                    'Return index if found, or -1 if not found'
                  ].map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 rounded-lg ${
                        currentStep === index && isAnimating
                          ? 'bg-green-100 text-green-800'
                          : currentStep > index && isAnimating
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          currentStep === index && isAnimating
                            ? 'bg-green-600 text-white'
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
                  {codeSnippets[selectedLanguage]?.[selectedOperation] || '// Select an operation and language'}
                </pre>
              </div>
            </div>

            {/* String Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">String Properties</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Characteristics</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Immutable in most languages
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Sequential memory access
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Built-in methods for manipulation
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      Unicode support
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Complexity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Access:</span>
                      <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Concatenation:</span>
                      <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Substring:</span>
                      <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">O(k)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Common Operations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Common Operations</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-800">Length</div>
                  <div className="text-blue-600">Get string size</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800">Concatenation</div>
                  <div className="text-green-600">Join strings together</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-800">Splitting</div>
                  <div className="text-purple-600">Break into substrings</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-800">Trimming</div>
                  <div className="text-orange-600">Remove whitespace</div>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Text processing</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Pattern matching</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Data validation</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="font-semibold">File operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
