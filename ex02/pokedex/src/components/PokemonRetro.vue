<template>
  <v-container>
    <v-card class="mx-auto" width="560px" height="880px" img="/gameboy_bg.png">
      <v-card
        class="mx-auto"
        width="400px"
        height="400px"
        img="/retroBg_white.png"
        :style="{ top: '104px', overflow: 'hidden' }"
      >
        <v-row no-gutters>
          <v-col class="ma-4">
            <v-row no-gutters>
              <v-col class="mt-2"></v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-img
                  :src="pokeRetro.imageUrl"
                  :alt="pokeRetro.name"
                  height="150"
                  contain
                />
                <div
                  class="text-center mt-1"
                  :class="$style.infoText"
                  :style="{ 'font-size': '28px', 'letter-spacing': '2px' }"
                >
                  No.{{ ("000" + this.pokeRetro.id).slice(-3) }}
                </div>
              </v-col>
              <v-col cols="6" class="mt-1">
                <v-row>
                  <v-col class="mt-1">
                    <span :class="$style.infoText">{{ pokeRetro.name }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mt-2">
                    <span :class="$style.infoText">{{ pokeRetro.genus }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mt-2">
                    <span :class="$style.infoText">たかさ </span>
                    <span
                      :class="$style.infoText"
                      class="ml-5"
                      :style="{ 'font-size': '24px' }"
                      >{{ pokeRetro.height.toFixed(1) }}m</span
                    >
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mt-1">
                    <span :class="$style.infoText">おもさ </span>
                    <span
                      :class="$style.infoText"
                      class="ml-5"
                      :style="{ 'font-size': '24px' }"
                      >{{ pokeRetro.weight.toFixed(1) }}kg</span
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="ma-1 pt-4">
                <div
                  v-for="item in pokeRetro.flavorText"
                  :key="item"
                  :class="$style.infoText"
                  class="my-4"
                >
                  {{ item }}<br />
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-btn
        @click="refresh(-1)"
        tile
        text
        elevation="0"
        :style="{ top: '270px', left: '70px' }"
        width="50px"
        height="50px"
      >
      </v-btn>
      <v-btn
        @click="refresh(1)"
        elevation="0"
        tile
        text
        :style="{ top: '270px', left: '86px' }"
        width="50px"
        height="50px"
      >
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PokeRetro, {
  emptyPokeRetro,
  fetchPokeRetroById,
  POKERETRO_MAX,
} from "@/models/pokeRetro";
import "@/assets/sass/style.scss";
import router from "@/router";
import PokeBallSpinner from "@/components/PokeBallSpinner.vue";

@Component({
  components: {
    PokeBallSpinner,
  },
})
export default class PokemonRetro extends Vue {
  private id: number = parseInt(this.$route.params.id);
  private pokeRetro: PokeRetro = emptyPokeRetro;
  private isLoading = true;
  private isRefresh = false;
  private msgLoading = "Loading...";

  async fetch() {
    this.pokeRetro = await fetchPokeRetroById(this.id, "ja-Hrkt").catch(
      (err: Error) => {
        this.msgLoading = err.message;
        this.isLoading = false;
        return emptyPokeRetro;
      }
    );
    if (this.pokeRetro !== emptyPokeRetro) {
      this.isLoading = false;
      this.isRefresh = false;
    }
  }

  async refresh(num: number) {
    if ((this.id === 1 && num === -1) || (this.id === 151 && num === 1)) return;
    if (!this.isRefresh) {
      this.isRefresh = true;
      this.id += num;
      await this.fetch();
      router.push({ name: "pokemonRetro", params: { id: String(this.id) } });
    }
  }

  created() {
    if (this.id > POKERETRO_MAX) {
      router.push({ name: "pokemon", params: { id: String(this.id) } });
    }
  }

  async mounted() {
    await this.fetch();
  }
}
</script>

<style module>
.infoText {
  font-family: "M PLUS dot" !important;
  font-size: 18px;
}
</style>
