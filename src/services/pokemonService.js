// src/services/pokemonService.js
import api from './api'

export const pokemonService = {
  async getAll(page = 1, search = '') {
    const response = await api.get('/pokemon', { params: { page, search } })
    return {
      items: response.data.data,
      currentPage: response.data.current_page,
      lastPage: response.data.last_page,
      hasMore: response.data.current_page < response.data.last_page,
    }
  },

    async getById(id) {
    const response = await api.get(`/pokemon/${id}`)
    return response.data.data ?? response.data
  },

  async create(formData) {
    const response = await api.post('/admin/pokemons', formData)
    return response.data.data ?? response.data
  },

  async update(id, formData) {
    formData.append('_method', 'PUT')
    const response = await api.post(`/admin/pokemons/${id}`, formData)
    return response.data.data ?? response.data
  },

  async remove(id) {
    await api.delete(`/admin/pokemons/${id}`)
  },
}