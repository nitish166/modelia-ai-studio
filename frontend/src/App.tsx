import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Hello world! 🌍
        </h1>
        
        <div className="space-y-4">
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-700 font-semibold">✅ Tailwind CSS is working!</p>
          </div>
          
          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 font-semibold">🎨 Colors are beautiful!</p>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-700 font-semibold">⚡ Vite is super fast!</p>
          </div>
          
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
            🚀 Test Button
          </button>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="h-16 bg-red-400 rounded-lg shadow-md"></div>
            <div className="h-16 bg-green-400 rounded-lg shadow-md"></div>
            <div className="h-16 bg-blue-400 rounded-lg shadow-md"></div>
          </div>
          
          <div className="text-center mt-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              🔥 Frontend Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
