import { useStringPathParamReactive } from '@/components/helpers/route'
import airportStore from '@/store/airport'
import { useRoute, useRouter } from 'vue-router'

export default function useRemoveAirportItem() {
  const router = useRouter()
  const route = useRoute()
  const itemId = useStringPathParamReactive('itemId')
  const { getAirports, setAirports } = airportStore()

  const onRemove = () => {
    const airports = getAirports.value.filter((airport, index) => index !== Number(itemId.value))
    setAirports(airports)
    router.push({ name: route.meta.backRoute as string })
  }

  return {
    itemId,
    onRemove,
  }
}
