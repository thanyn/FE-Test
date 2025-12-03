import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import './App.css';

import Login from './pages/Login';
import Home from "./pages/Home";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token"); // หรือเช็ค state ที่คุณใช้

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
