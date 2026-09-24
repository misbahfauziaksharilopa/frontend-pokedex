// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token')
    const savedUser = localStorage.getItem('admin_user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    const { token, user } = await authService.login(email, password)
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_user', JSON.stringify(user))
    setToken(token)
    setUser(user)
    return user
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch {
      // tetap logout di sisi frontend meskipun request ke server gagal
    } finally {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      setToken(null)
      setUser(null)
    }
  }

  const value = { user, token, isAuthenticated: !!token, isLoading, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}