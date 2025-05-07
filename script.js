// Global variables
let array = [];
let currentStep = 0;
let comparisons = 0;
let animationSpeed = 1000;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    generateNewArray();
    loadLeetCodeProblems();
});

// Generate a new random sorted array
function generateNewArray() {
    const size = parseInt(document.getElementById('arraySize').value);
    array = Array.from({length: size}, () => Math.floor(Math.random() * 100));
    array.sort((a, b) => a - b); // Keep array sorted for binary search
    displayArray();
    resetStats();
}

// Display the array with visual elements
function displayArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach((value, index) => {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.id = `element-${index}`;
        element.textContent = value;
        container.appendChild(element);
    });
}

// Reset statistics
function resetStats() {
    currentStep = 0;
    comparisons = 0;
    updateInfo('-');
    updateComparisons();
}

// Update step information
function updateInfo(text) {
    document.getElementById('step-info').textContent = text;
}

// Update comparison count
function updateComparisons() {
    document.getElementById('comparisons').textContent = comparisons;
}

// Start search based on selected algorithm
async function startSearch(algorithm) {
    resetStats();
    const target = parseInt(document.getElementById('target').value);
    
    if (isNaN(target)) {
        alert('Please enter a valid target number');
        return;
    }

    if (algorithm === 'linear') {
        await linearSearch(target);
    } else if (algorithm === 'binary') {
        await binarySearch(target);
    } else if (algorithm === 'interpolation') {
        await interpolationSearch(target);
    } else if (algorithm === 'hashBased') {
        await hashBasedSearch(target);
    }
}

// Linear Search Implementation
async function linearSearch(target) {
    for (let i = 0; i < array.length; i++) {
        // Highlight current element
        document.getElementById(`element-${i}`).classList.add('current');
        updateInfo(`Checking element at index ${i}`);
        comparisons++;
        updateComparisons();

        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        if (array[i] === target) {
            document.getElementById(`element-${i}`).classList.remove('current');
            document.getElementById(`element-${i}`).classList.add('found');
            updateInfo(`Found ${target} at index ${i}`);
            return i;
        }

        document.getElementById(`element-${i}`).classList.remove('current');
    }

    updateInfo(`${target} not found in the array`);
    return -1;
}

// Binary Search Implementation
async function binarySearch(target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // Highlight current search range
        for (let i = left; i <= right; i++) {
            document.getElementById(`element-${i}`).classList.add('current');
        }
        
        updateInfo(`Checking middle element at index ${mid}`);
        comparisons++;
        updateComparisons();

        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        // Clear previous highlighting
        for (let i = 0; i < array.length; i++) {
            document.getElementById(`element-${i}`).classList.remove('current');
        }

        if (array[mid] === target) {
            document.getElementById(`element-${mid}`).classList.add('found');
            updateInfo(`Found ${target} at index ${mid}`);
            return mid;
        }

        if (array[mid] < target) {
            left = mid + 1;
            updateInfo(`Target is in the right half`);
        } else {
            right = mid - 1;
            updateInfo(`Target is in the left half`);
        }
    }

    updateInfo(`${target} not found in the array`);
    return -1;
}

// Interpolation Search Implementation
async function interpolationSearch(target) {
    let low = 0;
    let high = array.length - 1;

    while (low <= high && target >= array[low] && target <= array[high]) {
        let pos = low + Math.floor(((target - array[low]) * (high - low)) / (array[high] - array[low]));

        // Highlight current search range
        for (let i = low; i <= high; i++) {
            document.getElementById(`element-${i}`).classList.add('current');
        }
        
        updateInfo(`Checking middle element at index ${pos}`);
        comparisons++;
        updateComparisons();

        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        // Clear previous highlighting
        for (let i = 0; i < array.length; i++) {
            document.getElementById(`element-${i}`).classList.remove('current');
        }

        if (array[pos] === target) {
            document.getElementById(`element-${pos}`).classList.add('found');
            updateInfo(`Found ${target} at index ${pos}`);
            return pos;
        }

        if (array[pos] < target) {
            low = pos + 1;
            updateInfo(`Target is in the right half`);
        } else {
            high = pos - 1;
            updateInfo(`Target is in the left half`);
        }
    }

    updateInfo(`${target} not found in the array`);
    return -1;
}

// Hash-Based Search Implementation
async function hashBasedSearch(target) {
    let result = -1;
    const hashTable = {};

    // Insert elements into hash table
    for (let i = 0; i < array.length; i++) {
        hashTable[array[i]] = i + 1; // 1-based index
    }

    // Check if the target is in the hash table
    result = hashTable[target] || -1;

    updateInfo(result !== -1 ? `Found ${target} at index ${result}` : `${target} not found in the array`);
    return result;
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab content and activate button
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// Check practice question answers
function checkAnswer(questionId, answer) {
    let correct = false;
    let explanation = '';

    switch(questionId) {
        case 1:
            correct = answer === 'O(log n)';
            explanation = correct ? 
                'Correct! Binary search has a time complexity of O(log n) as it divides the search space in half with each step.' :
                'Incorrect. Binary search has a time complexity of O(log n) as it divides the search space in half with each step.';
            break;
        case 2:
            correct = answer === 'unsorted';
            explanation = correct ?
                'Correct! Linear search is preferred when the array is unsorted, as binary search requires a sorted array.' :
                'Incorrect. Linear search is preferred when the array is unsorted, as binary search requires a sorted array.';
            break;
        case 3:
            correct = answer === 'O(n)';
            explanation = correct ?
                'Correct! Linear search has O(n) time complexity as it needs to check each element in the worst case.' :
                'Incorrect. Linear search checks each element one by one, leading to O(n) time complexity.';
            break;
        case 4:
            correct = answer === 'sorted';
            explanation = correct ?
                'Correct! Binary search requires a sorted array to work correctly as it relies on comparing middle elements.' :
                'Incorrect. Binary search only works on sorted arrays as it needs to make decisions based on comparing values.';
            break;
        case 5:
            correct = answer === 'middle';
            explanation = correct ?
                'Correct! Binary search starts by checking the middle element to eliminate half of the remaining elements.' :
                'Incorrect. Binary search always checks the middle element first to maximize efficiency.';
            break;
        case 6:
            correct = answer === 'true';
            explanation = correct ?
                'Correct! Linear search can find all occurrences of an element by continuing the search after finding the first match.' :
                'Incorrect. Linear search can find all occurrences by continuing to search through the entire array.';
            break;
    }

    alert(explanation);
    if (correct) {
        document.querySelector(`[onclick="checkAnswer(${questionId}, '${answer}')"]`).style.backgroundColor = '#2ecc71';
    }
}

// LeetCode problems data
const leetcodeProblems = [
    {
        title: "4. Median of Two Sorted Arrays",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
    },
    {
        title: "33. Search in Rotated Sorted Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
    },
    {
        title: "34. Find First and Last Position of Element in Sorted Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
    },
    {
        title: "35. Search Insert Position",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/search-insert-position/"
    },
    {
        title: "69. Sqrt(x)",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/sqrtx/"
    },
    {
        title: "74. Search a 2D Matrix",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/search-a-2d-matrix/"
    },
    {
        title: "153. Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
    },
    {
        title: "154. Find Minimum in Rotated Sorted Array II",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/"
    },
    {
        title: "162. Find Peak Element",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-peak-element/"
    },
    {
        title: "222. Count Complete Tree Nodes",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/count-complete-tree-nodes/"
    },
    {
        title: "240. Search a 2D Matrix II",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/search-a-2d-matrix-ii/"
    },
    {
        title: "275. H-Index II",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/h-index-ii/"
    },
    {
        title: "278. First Bad Version",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/first-bad-version/"
    },
    {
        title: "287. Find the Duplicate Number",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-the-duplicate-number/"
    },
    {
        title: "300. Longest Increasing Subsequence",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/longest-increasing-subsequence/"
    },
    {
        title: "354. Russian Doll Envelopes",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/russian-doll-envelopes/"
    },
    {
        title: "363. Max Sum of Rectangle No Larger Than K",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/"
    },
    {
        title: "367. Valid Perfect Square",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/valid-perfect-square/"
    },
    {
        title: "378. Kth Smallest Element in a Sorted Matrix",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/"
    },
    {
        title: "410. Split Array Largest Sum",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/split-array-largest-sum/"
    },
    {
        title: "441. Arranging Coins",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/arranging-coins/"
    },
    {
        title: "475. Heaters",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/heaters/"
    },
    {
        title: "540. Single Element in a Sorted Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/single-element-in-a-sorted-array/"
    },
    {
        title: "658. Find K Closest Elements",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-k-closest-elements/"
    },
    {
        title: "668. Kth Smallest Number in Multiplication Table",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/"
    },
    {
        title: "704. Binary Search",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/binary-search/"
    },
    {
        title: "719. Find K-th Smallest Pair Distance",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/find-k-th-smallest-pair-distance/"
    },
    {
        title: "744. Find Smallest Letter Greater Than Target",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/find-smallest-letter-greater-than-target/"
    },
    {
        title: "852. Peak Index in a Mountain Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/peak-index-in-a-mountain-array/"
    },
    {
        title: "875. Koko Eating Bananas",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/koko-eating-bananas/"
    }
];

// Load LeetCode problems into the UI with filtering and pagination
function loadLeetCodeProblems() {
    const container = document.querySelector('.problem-list');
    const problemsPerPage = 10;
    let currentPage = 1;
    let filteredProblems = [...leetcodeProblems];

    // Create filter controls
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-controls';
    
    // Difficulty filter
    const difficultyFilter = document.createElement('select');
    difficultyFilter.innerHTML = `
        <option value="all">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
    `;
    
    // Search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search problems...';
    
    filterContainer.appendChild(difficultyFilter);
    filterContainer.appendChild(searchInput);
    container.appendChild(filterContainer);

    // Create problems container
    const problemsContainer = document.createElement('div');
    problemsContainer.className = 'problems-container';
    container.appendChild(problemsContainer);

    // Create pagination container
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    container.appendChild(paginationContainer);

    function filterAndDisplayProblems() {
        const difficulty = difficultyFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        filteredProblems = leetcodeProblems.filter(problem => {
            const matchesDifficulty = difficulty === 'all' || problem.difficulty === difficulty;
            const matchesSearch = problem.title.toLowerCase().includes(searchTerm);
            return matchesDifficulty && matchesSearch;
        });

        displayProblems();
        updatePagination();
    }

    function displayProblems() {
        const startIndex = (currentPage - 1) * problemsPerPage;
        const endIndex = startIndex + problemsPerPage;
        const pageProblems = filteredProblems.slice(startIndex, endIndex);

        problemsContainer.innerHTML = '';
        pageProblems.forEach(problem => {
            const problemElement = document.createElement('div');
            problemElement.className = 'problem-item';
            
            const link = document.createElement('a');
            link.href = problem.url;
            link.target = '_blank';
            link.className = 'problem-title';
            link.textContent = problem.title;

            const difficulty = document.createElement('span');
            difficulty.className = `problem-difficulty difficulty-${problem.difficulty.toLowerCase()}`;
            difficulty.textContent = problem.difficulty;

            problemElement.appendChild(link);
            problemElement.appendChild(difficulty);
            problemsContainer.appendChild(problemElement);
        });
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
        paginationContainer.innerHTML = '';

        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.className = i === currentPage ? 'page-btn active' : 'page-btn';
                pageButton.onclick = () => {
                    currentPage = i;
                    displayProblems();
                    updatePagination();
                };
                paginationContainer.appendChild(pageButton);
            }
        }
    }

    // Event listeners
    difficultyFilter.addEventListener('change', () => {
        currentPage = 1;
        filterAndDisplayProblems();
    });

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        filterAndDisplayProblems();
    });

    // Initial display
    filterAndDisplayProblems();
}
