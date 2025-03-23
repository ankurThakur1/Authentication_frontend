import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Home from './components/Home'
import ProtectedRoute from './ProtectedRoute'

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
      const getToken = localStorage.getItem("token");
      if(getToken){
        setToken(getToken);
      }
    }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/profile" />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
            } />
        </Routes>
      </Router>
    </>
  )
}

export default App
