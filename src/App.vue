<template>
  <div id="app-container">
    <div class="main-content-container">
      <AppHeader />
      <router-view />
    </div>
    <AppToasts />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppToasts from './components/layout/AppToasts.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    AppToasts,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
@import '@/assets/styles/reset';
@import '@/assets/styles/app';
</style>
