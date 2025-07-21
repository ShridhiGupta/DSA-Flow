
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600" style={{fontFamily: "Pacifico, serif"}}>
                  DSA Flow
                </h1>
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/data-structures" className="text-gray-700 hover:text-indigo-600 font-medium">
                Data Structures
              </Link>
              <Link href="/algorithms" className="text-gray-700 hover:text-indigo-600 font-medium">
                Algorithms
              </Link>
              <Link href="/practice" className="text-gray-700 hover:text-indigo-600 font-medium">
                Practice
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20digital%20learning%20environment%20with%20abstract%20geometric%20patterns%2C%20coding%20symbols%2C%20data%20visualization%20elements%2C%20clean%20minimalist%20background%20with%20soft%20blue%20and%20purple%20gradients%2C%20educational%20technology%20theme%2C%20futuristic%20interface%20design&width=1920&height=800&seq=hero-bg&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
        <div className="relative container mx-auto text-center">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Master <span className="text-indigo-600">Data Structures</span> & <span className="text-indigo-600">Algorithms</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Learn with interactive visualizations, step-by-step animations, and real-time complexity analysis. 
              From basic data structures to advanced problem-solving techniques.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/data-structures" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Start Learning
            </Link>
            <Link 
              href="/practice" 
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Practice Problems
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose DSA Flow?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-blue-50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-play-circle-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Animations</h3>
              <p className="text-gray-600">
                Watch algorithms come to life with step-by-step visual animations that make complex concepts easy to understand.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-green-50">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-code-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Code Visualization</h3>
              <p className="text-gray-600">
                See how your code executes line by line with dynamic highlighting and variable tracking.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-purple-50">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-speed-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Complexity Analysis</h3>
              <p className="text-gray-600">
                Understand time and space complexity with real-time analysis and comparison tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Learning Path
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/data-structures" className="group cursor-pointer">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-database-2-line text-2xl text-indigo-600"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Data Structures</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Master fundamental data structures with interactive visualizations
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Arrays & Strings
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    LinkedList, Stacks & Queues
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Trees & Graphs
                  </div>
                </div>
                <div className="mt-6">
                  <span className="text-indigo-600 font-semibold group-hover:text-indigo-700">
                    Start Learning →
                  </span>
                </div>
              </div>
            </Link>
            
            <Link href="/algorithms" className="group cursor-pointer">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-algorithm-line text-2xl text-green-600"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Algorithms</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Learn essential algorithms with step-by-step visual explanations
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Breadth-First Search
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Depth-First Search
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Dijkstra's Algorithm
                  </div>
                </div>
                <div className="mt-6">
                  <span className="text-green-600 font-semibold group-hover:text-green-700">
                    Start Learning →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">22+</div>
              <div className="text-gray-600">Data Structures</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">12+</div>
              <div className="text-gray-600">Algorithms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Visualizations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Practice Problems</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4" style={{fontFamily: "Pacifico, serif"}}>
            DSA Flow
          </h3>
          <p className="text-gray-400 mb-6">
            Master Data Structures and Algorithms through Interactive Learning
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/data-structures" className="text-gray-400 hover:text-white transition-colors">
              Data Structures
            </Link>
            <Link href="/algorithms" className="text-gray-400 hover:text-white transition-colors">
              Algorithms
            </Link>
            <Link href="/practice" className="text-gray-400 hover:text-white transition-colors">
              Practice
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
