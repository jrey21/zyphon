import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Networks from './pages/Networks'
import Profile from './pages/Profile'
import Transaction from './pages/Transaction'
import AllTransactions from './pages/AllTransactions'
import Commission from './pages/Commission'
import InvestmentPlans from './pages/InvestmentPlans'
import { AuthProvider, useAuth } from './contexts/authContext'
import './App.css'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { userLoggedIn } = useAuth()
  return userLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

function AppContent() {

  const { userLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/dashboard?login=success')
  }

  const handleLogout = async () => {
    // Dynamically import supabase client
    const { supabase } = await import('./supabase/supabaseClient')
    await supabase.auth.signOut()
    navigate('/login')
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
        path="/register"
        element={<Register />}
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
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Transaction onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route
        path="/all-transactions"
        element={
          <PrivateRoute>
            <AllTransactions onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route
        path="/commission"
        element={
          <PrivateRoute>
            <Commission onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route
        path="/investment-plans"
        element={
          <PrivateRoute>
            <InvestmentPlans />
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
