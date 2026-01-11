import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home"; 
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Route: Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Authentication Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          
          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

         
        </Routes>
      </div>
    </Router>
  );
}

export default App;