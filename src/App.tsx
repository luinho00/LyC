import React, { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState('')

  const handleLogin = (username: string) => {
    setUser(username)
    setIsAuth(true)
  }

  const handleLogout = () => {
    setIsAuth(false)
    setUser('')
  }

  return (
    <div className="app">
      {!isAuth ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
