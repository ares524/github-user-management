import axios, { AxiosError } from 'axios'
import { computed } from 'vue'
import { ApiErrors, QueryParams } from '@/types/api.model'

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

const addAuthHeader = () => {
  const _auth = localStorage.getItem('_auth')

  if (_auth) {
    const user = JSON.parse(_auth)
    if (user && user.access_token) {
      return { Authorization: 'Bearer ' + user.access_token }
    } else {
      return {}
    }
  } else {
    return {}
  }
}

const paramsToQueryString = (params?: QueryParams) => {
  if (!params) return ''

  const queryArray: Array<string> = []
  for (const [k, v] of Object.entries(params)) {
    if (v) {
      if (Array.isArray(v)) {
        if (v.length) {
          Object.values(v).forEach((el) => {
            if (el.length) {
              queryArray.push(`${k}=${el}`)
            }
          })
        }
      } else {
        queryArray.push(`${k}=${v}`)
      }
    }
  }

  if (!queryArray.length) return ''
  return `?${queryArray.join('&')}`
}

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

const getFirstError = <T extends string = string>(error: AxiosError) => {
  if (error?.response?.data?.errors?.length) {
    return error?.response?.data?.errors[0] as {
      errorType: T
      message: string
    }
  }
  return null
}

export { getBaseURL, addAuthHeader, paramsToQueryString, errorMessagesToString, getFirstError }
