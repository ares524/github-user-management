import { computed, ref, watch } from 'vue'
import useToastsStore from '@/store/toasts'
import useAirportManagementController from '@/middleware/controllers/useAirportManagementController'
import airportStore from '@/store/airport'
import { errorMessagesToString } from '@/services/api'
import { AxiosError } from 'axios'
import { CSVToJSON } from '@/components/helpers/utils'

export default function useHomepageManagement() {
  const { fetchAllAirpot } = useAirportManagementController()
  const { getAirports, getAirportState, setAirports, setNewAirportState } = airportStore()
  const { addToast } = useToastsStore()
  const airports = ref(getAirports.value)

  const isAirportLoading = computed(() => getAirportState.value.state === 'loading')
  const isAirportLoaded = computed(() => getAirportState.value.state === 'loaded')
  const isAirportError = computed(() => getAirportState.value.state === 'error')

  const _fetchAirpot = () => {
    fetchAllAirpot()
      .then((resp) => {
        const JSONData = JSON.parse(CSVToJSON(resp.data))
        setAirports(JSONData)
        setNewAirportState('loaded')
      })
      .catch((e: AxiosError) => {
        setNewAirportState('error')
        addToast(errorMessagesToString(e) || 'Unexpected error occurred. Please try later', 'danger')
      })
  }

  const searchName = (searchIndex: string) => {
    const searchedAirports = getAirports.value.filter((airport) => {
      if (airport.name) {
        return airport.name.toLowerCase().includes(searchIndex.toLowerCase())
      }
    })

    airports.value = searchedAirports
  }

  const refetchAllAirpot = () => {
    setNewAirportState('loading')
    _fetchAirpot()
  }

  watch(getAirports, () => {
    airports.value = getAirports.value
  })

  return {
    airports,
    isAirportLoading,
    isAirportLoaded,
    isAirportError,
    searchName,
    refetchAllAirpot,
  }
}
