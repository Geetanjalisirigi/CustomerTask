import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const customerApi = {
  getCustomerDetails: async (customerId) => {
    try {
      const response = await api.get(`/customer/${customerId}/details`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getCustomerSummary: async (customerId) => {
    try {
      const response = await api.get(`/customer/${customerId}/summary`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  getAllCustomers: async () => {
  try {
    const response = await api.get('/customer/all')
    return response.data
  } catch (error) {
    throw error
  }
},
}

export default api
