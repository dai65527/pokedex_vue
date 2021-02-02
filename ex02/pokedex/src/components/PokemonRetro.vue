<template>
  <v-container>
    <v-card
      class="mx-auto"
      width="500px"
      height="500px"
      img="/retroBg_white.png"
    >
      <v-row no-gutters>
        <v-col class="ma-4">
          <v-row no-gutters>
            <v-col class="mt-2"></v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="mt-11">
              <v-img
                :src="pokeRetro.imageUrl"
                :alt="pokeRetro.name"
                height="150"
                contain
              />
              <div
                class="text-center mt-3"
                :class="$style.infoText"
                :style="{ 'font-size': '35px', 'letter-spacing': '2px' }"
              >
                No.{{ ("000" + this.pokeRetro.id).slice(-3) }}
              </div>
            </v-col>
            <v-col cols="6" class="mt-3">
              <v-row>
                <v-col class="my-2">
                  <span :class="$style.infoText">{{ pokeRetro.name }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="my-2">
                  <span :class="$style.infoText">{{ pokeRetro.genus }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="my-1">
                  <span :class="$style.infoText">たかさ </span>
                  <span
                    :class="$style.infoText"
                    class="ml-5"
                    :style="{ 'font-size': '30px' }"
                    >{{ pokeRetro.height }}m</span
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mb-2">
                  <span :class="$style.infoText">おもさ </span>
                  <span
                    :class="$style.infoText"
                    class="ml-5"
                    :style="{ 'font-size': '30px' }"
                    >{{ pokeRetro.weight }}kg</span
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="ma-2 pt-3">
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
  font-size: 25px;
}
</style>
