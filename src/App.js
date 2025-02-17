import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SignUp from './Pages/signUp';
import Login from './Pages/login';
import ResetPassword from './Pages/resetPassowrd';
import Home from './Pages/home';
import PrivateRoute from './Utils/privateRoutes';
import PublicRoute from './Utils/publicRoutes';
import NotFound from './Pages/notFound';
import Profile from './Pages/profile';
import About from './Pages/about';
import UserList from './Pages/userList';

function App() {
  // useEffect(() => {
  //   // Test toast on component mount
  //   toast.error('This is a test error message!');
  // }, []);

  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route
            path="/sign-up"
            element={<PublicRoute element={<SignUp />} />}
          />
          <Route
            path="/reset-password"
            element={<PublicRoute element={<ResetPassword />} />}
          />

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/all_users"
            element={<PrivateRoute element={<UserList />} />}
          />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
