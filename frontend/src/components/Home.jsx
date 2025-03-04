import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center px-6 md:px-0">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Your Digital <span className="text-blue-500">Note Space</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Create, organize, and access your notes from anywhere. A simple and elegant 
          solution for keeping your thoughts in order.
        </p>
        <button
          onClick={() => navigate('/notes')}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold 
                     transform transition duration-200 hover:scale-105 hover:bg-blue-600
                     shadow-lg hover:shadow-blue-500/50"
        >
          Get Started →
        </button>
      </div>
    </div>
  )
}

export default Home
