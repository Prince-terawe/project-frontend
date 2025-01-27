import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Pages/signUp';
import Login from './Pages/login';
import ResetPassword from './Pages/resetPassowrd';
import Home from './Pages/home';
import PrivateRoute from './Utils/privateRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
