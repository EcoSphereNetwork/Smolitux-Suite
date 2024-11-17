<template>
  <li class="nav-item">
    <component
      :is="tag"
      class="nav-link"
      v-bind="$attrs"
      @click="hideSidebar"
    >
      <slot>
        <i v-if="icon" :class="icon"></i>
        <p>{{ name }}</p>
      </slot>
    </component>
  </li>
</template>
<script>
import { inject, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: "sidebar-link",
  inheritAttrs: false,
  props: {
    name: String,
    icon: String,
    tag: {
      type: String,
      default: "router-link",
    },
  },
  setup(props) {
    const autoClose = inject('autoClose', true)
    const addLink = inject('addLink', () => {})
    const removeLink = inject('removeLink', () => {})
    const $sidebar = inject('$sidebar')

    const hideSidebar = () => {
      if (autoClose) {
        $sidebar.displaySidebar(false)
      }
    }

    const isActive = () => {
      return document.querySelector('.nav-link.active') !== null
    }

    onMounted(() => {
      if (addLink) {
        addLink({ isActive })
      }
    })

    onBeforeUnmount(() => {
      if (removeLink) {
        removeLink({ isActive })
      }
    })

    return {
      hideSidebar,
      isActive
    }
  }
}
</script>
<style></style>

