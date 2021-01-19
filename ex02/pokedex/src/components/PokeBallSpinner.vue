<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-img
            :src="require('@/assets/pokeball_bg.png')"
            :class="$style.pokeBall"
            class="mx-auto my-16"
            width="150"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" >
          <p class="mx-auto grey--text text--lighten-1 display-1 text text-center">
          Loading...
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
