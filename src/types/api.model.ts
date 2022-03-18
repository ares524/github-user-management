export type QueryParams = {
  id?: string
}

export type ApiErrors = Array<ApiError>

interface ApiError {
  errorType: string
  message: string
}

export type ApiLoadingState = 'loaded' | 'error' | 'loading'

export interface EntitiesLoadingState {
  state: ApiLoadingState
  payload?: {
    message?: string
  }
}
