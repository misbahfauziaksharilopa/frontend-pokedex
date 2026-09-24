// src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import PokemonListPage from '../pages/public/PokemonListPage'
import AdminLayout from '../layouts/AdminLayout'
import LoginPage from '../pages/admin/LoginPage'
import DashboardPage from '../pages/admin/DashboardPage'
import FormManagePage from '../pages/admin/FormManagePage'
import ProtectedRoute from './ProtectedRoute'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PokemonListPage />} />
      </Route>

      <Route path="/admin/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/forms" element={<FormManagePage />} />
        </Route>
      </Route>
    </Routes>
  )
}