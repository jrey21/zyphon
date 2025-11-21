import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthProvider, useAuth } from './contexts/authContext'
import { doSignOut } from './firebase/auth'
import './App.css'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { userLoggedIn } = useAuth()
  return userLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

function AppContent() {
  const { userLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await doSignOut()
    navigate('/login')
  }

  const handleLogin = () => {
    navigate('/home')
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          userLoggedIn ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to={userLoggedIn ? "/home" : "/login"} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
