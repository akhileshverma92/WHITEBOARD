import React from 'react'
import CollaborativeWhiteboard from './CollaborativeWhiteboard'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Hero';
import AboutUs from './AboutUs';
import NavBar from './NavBar';
import Login from './Login';

function App() {
  return (
    <>
      <SignedOut>

        <Login />
       
      </SignedOut>
      <SignedIn>
        <Router>
          
          <NavBar />
         
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/whiteboard" element={<CollaborativeWhiteboard />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </Router>

      </SignedIn>

    </>
  );
}

export default App