// src/services/typeService.js
import api from './api'

let cachedTypes = null

export const typeService = {
  async getAll() {
    if (cachedTypes) return cachedTypes
    const response = await api.get('/types')
    cachedTypes = response.data.data
    return cachedTypes
  },

  async getById(id) {
    const response = await api.get(`/types/${id}`)
    return response.data.data ?? response.data
  },
}