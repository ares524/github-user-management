<template>
  <div class="popup">
    <div class="popup-content">
      <AppBackButton button-text="Back" :back-route="{ name: $route.meta.backRoute }" class="popup-back-button" />
      <AppCloseButton class="popup-close-button" @click="onClose" />

      <h3 class="popup-title">Are you sure you want to remove?</h3>

      <div class="button-container">
        <AppButton class="popup-action-button" @click="onClose">Keep it</AppButton>
        <AppButton outlined @click="onRemove">Remove it</AppButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppCloseButton from '@/components/common/AppCloseButton.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppBackButton from '@/components/common/AppBackButton.vue'
import { useRoute, useRouter } from 'vue-router'
import useRemoveAirportItem from '@/components/homepage/popups/PopupRemoveItem'

export default defineComponent({
  name: 'PopupRemoveItem',
  components: {
    AppCloseButton,
    AppButton,
    AppBackButton,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { onRemove } = useRemoveAirportItem()
    const onClose = () => {
      router.push({ name: route.meta.backRoute as string })
    }

    return { onRemove, onClose }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/views/homepage/popups/PopupRemoveItem';
</style>
