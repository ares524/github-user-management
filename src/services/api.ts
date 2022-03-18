import axios, { AxiosError } from 'axios'
import { computed } from 'vue'
import { ApiErrors } from '@/types/api.model'

const api = axios.create({
  baseURL: 'https://raw.githubusercontent.com',
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error?.response?.status === 403) console.log('Not logined user')
    return Promise.reject(error)
  }
)

export default api

const getBaseURL = computed(() => api.defaults.baseURL)

const errorMessagesToString = (error: AxiosError) => {
  let errorsString = ''

  if (error?.response?.data?.errors) {
    const requestErrors = error.response.data.errors as ApiErrors

    requestErrors.forEach((e) => {
      if (!errorsString.length) errorsString = e.message
      else errorsString = `${errorsString}\n${e.message}`
    })
  }

  if (!errorsString && error?.response?.data?.message) {
    errorsString = error?.response?.data?.message
  }

  return errorsString
}

export { getBaseURL, errorMessagesToString }
