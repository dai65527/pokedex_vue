<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-img
            v-if="isLoading"
            src="/pokeball_bg.png"
            :class="$style.pokeBall"
            class="mx-auto"
            width="50"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="mx-auto grey--text headline text text-center">
            {{ infoText }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class PokeBallSpinnerMini extends Vue {
  @Prop()
  private infoText!: string;
  @Prop()
  private isLoading!: boolean;
}
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
