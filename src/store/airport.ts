import { computed, Ref, ref, reactive } from 'vue'
import { AirportPublicInfo, AirportLoadingState } from '@/types/airport.model'
import { ApiLoadingState } from '@/types/api.model'

const airports: Ref<Array<AirportPublicInfo>> = ref([])
const allAirportState = reactive<AirportLoadingState>({
  state: 'loading',
  payload: {
    message: undefined,
  },
})

export default function useAirpotStore() {
  const getAirports = computed(() => airports.value)
  const getAirportState = computed(() => allAirportState)
  const setAirports = (data: Array<AirportPublicInfo>) => {
    airports.value = data
  }

  const setNewAirportState = (state: ApiLoadingState, payload?: { message?: string }) => {
    allAirportState.state = state
    allAirportState.payload = payload
  }

  const reset = () => {
    setAirports([])
  }

  return {
    getAirports,
    getAirportState,
    setAirports,
    setNewAirportState,
    reset,
  }
}
