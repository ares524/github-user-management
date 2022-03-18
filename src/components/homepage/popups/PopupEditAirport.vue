<template>
  <div class="popup">
    <div class="popup-content">
      <AppBackButton button-text="Back" :back-route="{ name: $route.meta.backRoute }" class="popup-back-button" />
      <AppCloseButton class="popup-close-button" @click="onClose" />

      <h3 class="popup-title">Please, enter following values.</h3>
      <div class="form-field">
        <AppLabel>
          Name
          <AppInput v-model="airportName.value" responsive class="popup-input" :error="airportName.isError" />
        </AppLabel>
        <AppInputError v-if="airportName.isError" class="profile-error">
          {{ airportName.getErrorMessage }}
        </AppInputError>
      </div>

      <div class="form-field">
        <AppLabel>
          Type
          <AppInput v-model="airportType.value" responsive class="popup-input" :error="airportType.isError" />
        </AppLabel>
        <AppInputError v-if="airportType.isError" class="profile-error">
          {{ airportType.getErrorMessage }}
        </AppInputError>
      </div>

      <div class="form-field">
        <AppLabel>
          Country
          <AppInput v-model="airportCountry.value" responsive class="popup-input" :error="airportCountry.isError" />
        </AppLabel>
        <AppInputError v-if="airportCountry.isError" class="profile-error">
          {{ airportCountry.getErrorMessage }}
        </AppInputError>
      </div>

      <div class="form-field">
        <AppLabel>
          Region
          <AppInput v-model="airportRegion.value" responsive class="popup-input" :error="airportRegion.isError" />
        </AppLabel>
        <AppInputError v-if="airportRegion.isError" class="profile-error">
          {{ airportRegion.getErrorMessage }}
        </AppInputError>
      </div>

      <div class="form-field">
        <AppLabel>
          GPS Code
          <AppInput v-model="airportGps.value" responsive class="popup-input" :error="airportGps.isError" />
        </AppLabel>
        <AppInputError v-if="airportGps.isError" class="profile-error">
          {{ airportGps.getErrorMessage }}
        </AppInputError>
      </div>

      <AppButton
        class="action-button"
        :disabled="isWaitingSavingResponse"
        :is-loading="isWaitingSavingResponse"
        @click="handleSave()"
        >Save</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import AppCloseButton from '@/components/common/AppCloseButton.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppLabel from '@/components/common/AppLabel.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppInputError from '@/components/common/AppInputError.vue'
import AppBackButton from '@/components/common/AppBackButton.vue'
import { useRoute, useRouter } from 'vue-router'
import useEditAirportPopup from '@/components/homepage/popups/PopupEditAirport'

export default defineComponent({
  name: 'PopupAddAirport',
  components: {
    AppCloseButton,
    AppBackButton,
    AppButton,
    AppLabel,
    AppInput,
    AppInputError,
  },
  setup() {
    const { airportForm, isWaitingSavingResponse, handleSave } = useEditAirportPopup()

    const {
      name: airportName,
      type: airportType,
      country: airportCountry,
      region: airportRegion,
      gpsCode: airportGps,
    } = toRefs(airportForm.fieldSet)

    const router = useRouter()
    const route = useRoute()
    const onClose = () => {
      router.push({ name: route.meta.backRoute as string })
    }

    return {
      airportName,
      isWaitingSavingResponse,
      airportType,
      airportCountry,
      airportRegion,
      airportGps,
      handleSave,
      onClose,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/views/homepage/popups/PopupAddAirport';
</style>
