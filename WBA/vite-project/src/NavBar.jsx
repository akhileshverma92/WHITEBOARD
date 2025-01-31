import React, { useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const Navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    // Placeholder navigation handler 
    Navigate(`http://localhost:5173/${path}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 sm:p-6 bg-white shadow-md fixed w-full top-0 z-50 text-xl  sm:text-base">
        {/* Brand Section */}
        <div
          onClick={() => handleNavigation('/')}
          className="text-2xl sm:text-3xl font-bold text-indigo-600 whitespace-nowrap cursor-pointer"
        >
          Canvas<span className="text-red-700">Share</span>
        </div>

        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        
        </div>
      
        {/* Navigation Section */}
        <nav className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:flex 
          flex-col 
          md:flex-row 
          absolute 
          md:relative 
          top-full 
          md:top-auto 
          left-0 
          md:left-auto 
          w-full 
          md:w-auto 
          bg-white 
          md:bg-transparent 
          shadow-md 
          md:shadow-none 
          p-4 
          md:p-0
        `}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
          
            <a href="/"  className="text-gray-700 hover:text-indigo-600 whitespace-nowrap w-full md:w-auto text-center" >Home</a>
            <a href="/whiteboard" className="text-gray-700 hover:text-indigo-600 whitespace-nowrap w-full md:w-auto text-center">Whiteboard</a>
            <a href="/about" className="text-gray-700 hover:text-indigo-600 whitespace-nowrap w-full md:w-auto text-center">About Us</a>
          <UserButton className="" />
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <><div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
        </>

      )}
    </>
  );
}

export default NavBar;