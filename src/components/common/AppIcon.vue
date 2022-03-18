<template>
  <component
    :is="component"
    :color="color"
    :notify="notify"
    :pass-visible="passVisible"
    :size="size"
    :fill="fill"
    :outline="outline"
    :direction="direction"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import BackIcon from './icons/BackIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'
import DeleteIcon from './icons/DeleteIcon.vue'
import DownloadIcon from './icons/DownloadIcon.vue'
import DropdownIcon from './icons/DropdownIcon.vue'
import EditIcon from './icons/EditIcon.vue'
import HelpIcon from './icons/HelpIcon.vue'
import SearchIcon from './icons/SearchIcon.vue'
import SuccessMessageIcon from './icons/SuccessMessageIcon.vue'
import DangerMessageIcon from './icons/DangerMessageIcon.vue'
import InfoMessageIcon from './icons/InfoMessageIcon.vue'
import WarningIcon from './icons/WarningIcon.vue'

export type IconName =
  | 'back'
  | 'close'
  | 'delete'
  | 'download'
  | 'dropdown'
  | 'edit'
  | 'help'
  | 'info-message'
  | 'search'
  | 'success-message'
  | 'warning'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

export type IconDirection = 'left' | 'right'

export default defineComponent({
  name: 'AppIcon',
  components: {
    BackIcon,
    CloseIcon,
    DangerMessageIcon,
    DeleteIcon,
    DownloadIcon,
    DropdownIcon,
    EditIcon,
    HelpIcon,
    InfoMessageIcon,
    SearchIcon,
    SuccessMessageIcon,
    WarningIcon,
  },
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    fill: {
      type: String,
      required: false,
    },
    size: {
      type: String as PropType<IconSize>,
      required: false,
    },
    notify: {
      type: Boolean,
      default: false,
    },
    passVisible: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String as PropType<IconDirection>,
      required: false,
    },
  },
  setup(props) {
    const component = computed(() => {
      const splittedWords = props.name.split('-')
      const splittedUppercaseWords = splittedWords.map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)

      return `${splittedUppercaseWords.join('')}Icon`
    })

    return { component }
  },
})
</script>

<style lang="scss" scoped>
.icon {
  user-select: none;
  pointer-events: none;
}
</style>
