import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <>
      <header className="flex justify-between items-center p-6 bg-white shadow-md fixed w-full top-0 ">
        <Link className='text-3xl font-bold text-indigo-600' to="/">Canvas<span className='text-red-700'>Share</span></Link>
        <nav className="space-x-4 text-xl font-semibold ">
          
        
          <Link to="/" className="text-gray-700 hover:text-indigo-600"> Home</Link>
         
          <Link to="/whiteboard" className="text-gray-700 hover:text-indigo-600"> Get Started</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
        </nav>
      </header>
    </>
  )
}

export default NavBar