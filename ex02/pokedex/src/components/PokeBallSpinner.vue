<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-img
            v-if="isLoading"
            src="/pokedex_vue/pokeball_bg.png"
            :class="isMiniSpinner ? $style.pokeBallMini : $style.pokeBall"
            class="mx-auto"
            lazy-src="/pokedex_vue/pokeball_bg.png"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p
            class="mx-auto"
            :class="isMiniSpinner ? $style.TextMini : $style.Text"
          >
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
export default class PokeBallSpinner extends Vue {
  @Prop()
  private infoText!: string;
  @Prop()
  private isLoading!: boolean;
  @Prop()
  private isMiniSpinner!: boolean;
}
</script>

<style module>
.pokeBall {
  animation: rotation 4s linear infinite;
  filter: brightness(50%);
  width: 150px;
  min-width: 150px;
  margin-top: 64px;
  margin-bottom: 64px;
}

.pokeBallMini {
  animation: rotation 4s linear infinite;
  width: 50px;
  min-width: 50px;
}

.Text {
  font-weight: bold;
  text-align: center;
  font-size: 34px;
  color: #616161;
}

.TextMini {
  text-align: center;
  font-size: 24px;
  color: #9e9e9e;
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
