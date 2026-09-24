// src/services/formService.js
import api from './api'

export const formService = {
  async getAll(page = 1) {
    const response = await api.get('/forms', { params: { page } })
    return {
      items: response.data.data,
      currentPage: response.data.current_page,
      lastPage: response.data.last_page,
      hasMore: response.data.current_page < response.data.last_page,
    }
  },

   async getById(id) {
    const response = await api.get(`/forms/${id}`)
    return response.data.data ?? response.data
  },

  async create(formData) {
    const response = await api.post('/admin/forms', formData)
    return response.data.data ?? response.data
  },

  async update(id, formData) {
    formData.append('_method', 'PUT')
    const response = await api.post(`/admin/forms/${id}`, formData)
    return response.data.data ?? response.data
  },

  async remove(id) {
    await api.delete(`/admin/forms/${id}`)
  },
}