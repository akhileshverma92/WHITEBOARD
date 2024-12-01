import React from 'react'
import CollaborativeWhiteboard from './CollaborativeWhiteboard'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Hero';
import AboutUs from './AboutUs';
import NavBar from './NavBar';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/whiteboard" element={<CollaborativeWhiteboard />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App