<template>
  <div class="content">
    <transition-fade :duration="100" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </transition-fade>
  </div>
</template>
<script>
import { TransitionFade } from "@morev/vue-transitions";
export default {
  components: {
    TransitionFade,
  },
};
</script>

