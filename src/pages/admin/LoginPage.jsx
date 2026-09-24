// src/pages/admin/LoginPage.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) {
    navigate('/admin/dashboard', { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await login(email, password)
      const redirectTo = location.state?.from?.pathname || '/admin/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      const message = err.response?.data?.message || 'Email atau password salah.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Pokedex Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Masuk untuk mengelola data Pokémon</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 space-y-4 ring-1 ring-slate-800">
          {error && (
            <div className="bg-red-950 text-red-300 text-sm rounded-lg px-4 py-2 ring-1 ring-red-900">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pokedex.com"
              className="w-full bg-base text-white placeholder-slate-500 rounded-lg px-4 py-2.5 outline-none ring-1 ring-slate-700 focus:ring-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-base text-white placeholder-slate-500 rounded-lg px-4 py-2.5 outline-none ring-1 ring-slate-700 focus:ring-red-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 transition-colors"
          >
            {isSubmitting ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}