import { EntitiesLoadingState } from '@/types/api.model'
import { computed } from 'vue'

export const extractStates = (state: EntitiesLoadingState) => {
  const isLoading = computed(() => state.state === 'loading')
  const isError = computed(() => state.state === 'error')
  const isLoaded = computed(() => state.state === 'loaded')

  return {
    isLoading,
    isError,
    isLoaded,
  }
}
