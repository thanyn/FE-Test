import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';

function ProtectedRoute({ children }) {
  const isLogIn = localStorage.getItem('token');
  return isLogIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
