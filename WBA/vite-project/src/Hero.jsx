import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-100 to-indigo-200 ">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md fixed w-full top-0 ">
        <Link className='text-3xl font-bold text-indigo-600' to="/">Canvas<span className='text-red-700'>Share</span></Link>
        <nav className="space-x-4 text-xl font-semibold ">
          
        
          <Link to="/" className="text-gray-700 hover:text-indigo-600"> Home</Link>
         
          <Link to="/whiteboard" className="text-gray-700 hover:text-indigo-600"> Get Started</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="h-screen  pt-[6rem] md:pt-[3rem] flex flex-col md:flex-row items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            Collaborate in Real-Time, Anywhere
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            CanvasShare is a live whiteboard for teams and individuals to brainstorm, draw, and create together from anywhere in the world.
          </p>
         
          <Link to="/whiteboard" className="bg-indigo-600 text-white py-3 px-6 rounded shadow-lg hover:bg-indigo-700 transition"> Start Drawing Now</Link>
        </motion.div>
        <motion.img
          src="https://via.placeholder.com/600x400" // Replace with a modern whiteboard illustration
          alt="Whiteboard illustration"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10"
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Features You'll Love
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Real-Time Collaboration", description: "Work with your team instantly on a shared canvas." },
              { title: "Customizable Tools", description: "Choose colors, brush sizes, and more for your creativity." },
              { title: "Multi-Device Support", description: "Accessible on desktops, tablets, and smartphones." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-indigo-50 p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-tr from-indigo-100 to-blue-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              About CanvasShare
            </h2>
            <p className="text-lg text-gray-600">
              Designed for seamless collaboration, CanvasShare allows users to innovate, brainstorm, and communicate visually in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="cta" className="py-16 bg-indigo-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Collaborating?
            </h2>
            <p className="text-lg mb-6">
              Join the thousands of users who are creating together in real-time with CanvasShare.
            </p>
            <a
              href="/whiteboard"
              className="bg-white text-indigo-600 py-3 px-6 rounded shadow-md hover:bg-indigo-100 transition"
            >
              Start for Free
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-gray-400 text-center">
        <p>© 2024 CanvasShare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Hero;
