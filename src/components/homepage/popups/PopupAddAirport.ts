import airportStore from '@/store/airport'
import { useRoute, useRouter } from 'vue-router'
import { createFormFieldSet, createFormItem, useFormatters, useValidators } from '../../helpers/forms'
import { ref } from '@vue/runtime-core'
export default function useAddAirportPopup() {
  const router = useRouter()
  const route = useRoute()
  const { required } = useValidators()
  const { trimFormatter } = useFormatters()
  const { getAirports, setAirports } = airportStore()

  const isWaitingSavingResponse = ref(false)

  const createAirportAddForm = () => {
    const name = createFormItem('', {
      validators: [required],
      formatters: [trimFormatter],
    })
    const type = createFormItem('', {
      validators: [required],
      formatters: [trimFormatter],
    })
    const country = createFormItem('', {
      validators: [required],
      formatters: [trimFormatter],
    })
    const region = createFormItem('', {
      validators: [required],
      formatters: [trimFormatter],
    })
    const gpsCode = createFormItem('', {
      validators: [required],
      formatters: [trimFormatter],
    })

    return createFormFieldSet({
      name,
      type,
      country,
      region,
      gpsCode,
    })
  }

  const airportForm = createAirportAddForm()

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

    const newAirports = [...getAirports.value, parameter]
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
