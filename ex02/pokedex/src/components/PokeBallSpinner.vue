<template>
    <v-img
      :src="require('@/assets/pokeball_bg.png')"
      :class="$style.pokeBall"
      class="mx-auto my-16"
      width="150"
      ></v-img>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class PokeBallSpinner extends Vue {}
</script>

<style module>
.pokeBall {
  animation: rotation 4s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
