<template>
  <v-container>
    <v-card class="mx-auto" width="560px" height="880px" img="/gameboy_bg.png">
      <v-card
        class="mx-auto"
        width="400px"
        height="400px"
        img="/retroBg_white.png"
        :style="{ 'top': '104px', 'overflow': 'hidden' }"
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
                  <v-col class="mt-1">
                    <span :class="$style.infoText">{{ pokeRetro.genus }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mt-1">
                    <span :class="$style.infoText">たかさ </span>
                    <span
                      :class="$style.infoText"
                      class="ml-5"
                      :style="{ 'font-size': '24px' }"
                      >{{ pokeRetro.height }}m</span
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
                      >{{ pokeRetro.weight }}kg</span
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="ma-1 pt-3">
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
      <v-img
        src="/gameboy_btn.png"
        width="50px"
        height="50px"
        :style="{ top: '272px', left: '' }"
      ></v-img>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PokeRetro, {
  emptyPokeRetro,
  fetchPokeRetroById,
} from "@/models/pokeRetro";
import "@/assets/sass/style.scss";
@Component({
  components: {},
})
export default class PokemonRetro extends Vue {
  private id: number = parseInt(this.$route.params.id);
  private pokeRetro: PokeRetro = emptyPokeRetro;
  private isLoading = true;
  private msgLoading = "Loading...";

  get slicedNumber() {
    return ("000" + this.pokeInfo.id).slice(-3);
  }

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
  font-size: 20px;
}
</style>
