import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Pages/signUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1>HOME</h1>} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
