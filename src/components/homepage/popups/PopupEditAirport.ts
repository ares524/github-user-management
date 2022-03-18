import airportStore from '@/store/airport'
import { useStringPathParamReactive } from '@/components/helpers/route'
import { useRoute, useRouter } from 'vue-router'
import { createFormFieldSet, createFormItem, useFormatters, useValidators } from '../../helpers/forms'
import { ref, watch } from '@vue/runtime-core'

export default function useEditAirportPopup() {
  const router = useRouter()
  const route = useRoute()
  const { required } = useValidators()
  const { trimFormatter } = useFormatters()
  const { getAirports, setAirports } = airportStore()
  const itemId = useStringPathParamReactive('itemId')

  const isWaitingSavingResponse = ref(false)

  const createAirportEditForm = () => {
    const airport = getAirports.value.find((item, index) => index === Number(itemId.value))
    const name = createFormItem(airport?.name || '', {
      validators: [required],
      formatters: [trimFormatter],
    })
    const type = createFormItem(airport?.type || '', {
      validators: [required],
      formatters: [trimFormatter],
    })
    const country = createFormItem(airport?.iso_country || '', {
      validators: [required],
      formatters: [trimFormatter],
    })
    const region = createFormItem(airport?.iso_region || '', {
      validators: [required],
      formatters: [trimFormatter],
    })
    const gpsCode = createFormItem(airport?.gps_code || '', {
      validators: [required],
      formatters: [trimFormatter],
    })

    watch(getAirports, (getAirport) => {
      const filteredAirport = getAirport.find((item, index) => index === Number(itemId.value))

      name.setValue(filteredAirport?.name || '')
      type.setValue(filteredAirport?.type || '')
      country.setValue(filteredAirport?.iso_country || '')
      region.setValue(filteredAirport?.iso_region || '')
      gpsCode.setValue(filteredAirport?.gps_code || '')
    })

    return createFormFieldSet({
      name,
      type,
      country,
      region,
      gpsCode,
    })
  }

  const airportForm = createAirportEditForm()

  const handleSave = () => {
    const isValid = airportForm.validate()

    if (!isValid) return
    isWaitingSavingResponse.value = true
    const formdata = airportForm.getValue()

    const parameter = {
      continent: 'string',
      coordinates: 'string',
      elevation_ft: 'string',
      gps_code: formdata.gpsCode,
      iata_code: 'string',
      ident: 'string',
      iso_country: formdata.country,
      iso_region: formdata.region,
      local_code: 'string',
      municipality: 'string',
      name: formdata.name,
      type: formdata.type,
    }

    const removedAirports = getAirports.value.filter((airport, index) => index !== Number(itemId.value))
    const newAirports = [...removedAirports, parameter]

    setAirports(newAirports)

    isWaitingSavingResponse.value = false
    router.push({ name: route.meta.backRoute as string })
  }

  return {
    isWaitingSavingResponse,
    airportForm,
    handleSave,
  }
}
