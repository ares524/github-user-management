import api from '@/services/api'

const fetchAllUser = async () => {
  return await api.get('datasets/airport-codes/master/data/airport-codes.csv')
}

export default function useUserManagementController() {
  return {
    fetchAllUser,
  }
}
