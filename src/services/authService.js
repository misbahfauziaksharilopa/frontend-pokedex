// src/services/authService.js
import api from './api'

export const authService = {
  async login(email, password) {
    const response = await api.post('/login', { email, password })

    const token = response.data.access_token
    const user = response.data.data

    return { token, user }
  },

  async logout() {
    await api.post('/admin/logout')
  },
}