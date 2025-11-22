import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Networks from './pages/Networks'
import Profile from './pages/Profile'
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
    navigate('/dashboard')
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          userLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route
        path="/networks"
        element={
          <PrivateRoute>
            <Networks onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to={userLoggedIn ? "/dashboard" : "/login"} replace />} />
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
