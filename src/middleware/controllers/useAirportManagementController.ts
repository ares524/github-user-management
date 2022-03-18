import api from '@/services/api'
const fetchAllAirpot = async () => {
  return await api.get('https://raw.githubusercontent.com/datasets/airport-codes/master/data/airport-codes.csv')
}

export default function useAirportManagementController() {
  return {
    fetchAllAirpot,
  }
}
