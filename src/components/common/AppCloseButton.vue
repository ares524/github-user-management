<template>
  <button class="close-button">
    <AppIcon name="close" :color="color" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from './AppIcon.vue'
import variables from '@/assets/variables'

export default defineComponent({
  name: 'AppCloseButton',
  components: { AppIcon },
  props: {
    color: {
      type: String,
      default: variables.cPrimary500,
    },
  },
  setup() {
    return { variables }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/common/AppCloseButton';
</style>
