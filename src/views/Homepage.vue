<template>
  <main class="homepage">
    <div class="add-more">
      <AppInput class="search-name-input" placeholder="search name..." @input="filterValues" />
      <AppButton> Add </AppButton>
    </div>

    <AppSkeleton v-if="isAirportLoading" class="special-state" />
    <AppErrorBox v-else-if="isAirportError" class="special-state" @clicked="refetchAllAirpot()"> airports </AppErrorBox>
    <AppEmptyBox v-else-if="isAirportLoaded && !airports?.length" class="special-state">
      No history at the moment
    </AppEmptyBox>
    <div v-else class="airport-table">
      <div class="airport-header">
        <div class="airport-cell --name">Name</div>
        <div class="airport-cell --type">Type</div>
        <div class="airport-cell --country">Country</div>
        <div class="airport-cell --region">Region</div>
        <div class="airport-cell --gps">GPS Code</div>
        <div class="airport-cell --other"></div>
      </div>

      <div class="airport-wrapper">
        <div class="airport-rows">
          <div v-for="(airport, index) in filteredAirports" :key="index" class="airport-row">
            <div class="airport-cell --name" :title="airport.name">{{ airport.name }}</div>

            <div class="airport-cell --type">{{ airport.type }}</div>

            <div class="airport-cell --country">{{ airport.iso_country }}</div>

            <div class="airport-cell --region">{{ airport.iso_region }}</div>
            <div class="airport-cell --gps">{{ airport.gps_code }}</div>
            <div class="airport-cell --other">
              <AppIcon name="edit" :color="variables.cPrimary500" size="md" class="edit-icon" />
              <AppIcon
                name="delete"
                :color="variables.cPrimary500"
                size="md"
                class="remove-icon"
                @click="handleRemove(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppPagination
      :active-page="activePage"
      :per-page="limit"
      :count="airports.length"
      class="pagination-section"
      @page-change="updatePage"
    />
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import AppInput from '@/components/common/AppInput.vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/common/AppButton.vue'
import useHomepageManage from '@/components/homepage/homepage'
import AppSkeleton from '@/components/common/AppSkeleton.vue'
import AppEmptyBox from '@/components/common/AppEmptyBox.vue'
import AppErrorBox from '@/components/common/AppErrorBox.vue'
import AppPagination from '@/components/common/AppPagination.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import variables from '@/assets/variables'
import { AirportPublicInfo } from '@/types/airport.model'

export default defineComponent({
  name: 'Homepage',
  components: {
    AppInput,
    AppSkeleton,
    AppEmptyBox,
    AppErrorBox,
    AppIcon,
    AppPagination,
    AppButton,
  },
  setup() {
    const router = useRouter()
    const { airports, isAirportLoading, isAirportLoaded, isAirportError, searchName, refetchAllAirpot } =
      useHomepageManage()

    const filteredAirports = ref<Array<AirportPublicInfo>>([])
    const limit = 10
    const activePage = ref(1)

    refetchAllAirpot()

    const updatePage = (target: number) => {
      activePage.value = target
      filteredAirports.value = airports.value.slice(target * limit, limit * (target + 1))
    }

    const filterValues = (e: InputEvent) => {
      const target = e.target as HTMLInputElement

      searchName(target.value)
    }

    watch(airports, () => {
      if (airports.value) {
        filteredAirports.value = airports.value.slice(0, 10)
      }
    })

    const handleRemove = (index: number) => {
      router.push({
        name: 'PopupRemoveItem',
        params: { itemId: index },
      })
    }

    return {
      airports,
      filteredAirports,
      isAirportLoading,
      isAirportError,
      isAirportLoaded,
      variables,
      limit,
      activePage,
      refetchAllAirpot,
      updatePage,
      filterValues,
      handleRemove,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/views/Homepage';
</style>
