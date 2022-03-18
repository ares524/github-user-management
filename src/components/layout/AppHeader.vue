<template>
  <header class="header">
    <h2>Header</h2>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHeader',
  components: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/layout/AppHeader';
</style>
