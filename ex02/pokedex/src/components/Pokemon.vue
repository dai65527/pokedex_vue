<template>
  <div>
    <div class="bg" v-if="flgFetched">
      <v-container>
        <v-row justify="center" align-content="center">
          <v-col cols="12" lg="6" class="my-auto">
            <v-row justify="center" align-content="center" no-gutters>
              <v-col cols="10">
                <v-img :src="pokeInfo.imageUrl" :alt="pokeInfo.name" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6">
            <v-row>
              <v-col>
                <v-card
                  shaped
                  class="grey lighten-5"
                  elevation="4"
                  max-height="100px"
                >
                  <v-card-text class="font-weight-bold text-center display-3">{{
                    `${pokeInfo.name}`
                  }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="my-10 mx-auto" cols="10">
                <v-card class="grey lighten-5" elevation="4">
                  <poke-info-text
                    :row="this.rows[0]"
                    :column="`たねポケモン`"
                  />
                  <poke-info-text
                    :row="this.rows[1]"
                    :column="`${pokeInfo.height}m`"
                  />
                  <poke-info-text
                    :row="this.rows[2]"
                    :column="`${pokeInfo.weight}kg`"
                  />
                  <poke-info-text
                  v-if="pokeInfo.types.length == 2"
                    :row="this.rows[3]"
                    :column="`${pokeInfo.types[0].name} ${pokeInfo.types[1].name}`"
                  />
                  <poke-info-text
                  v-if="pokeInfo.types.length == 1"
                    :row="this.rows[3]"
                    :column="`${pokeInfo.types[0].name}`"
                  />
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-card shaped class="grey lighten-5" elevation="4">
                  <v-card-text
                    class="font-weight-bold display-1 text-center mb-n10"
                    >ステータス</v-card-text
                  >
                  <pokechart :pokeStats="pokeInfo.stats"></pokechart>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <poke-ball-spinner v-if="!flgFetched"></poke-ball-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokeInfo, { fetchPokeInfoById, emptyPokeInfo } from "@/models/pokeInfo";
import PokeBallSpinner from "@/components/PokeBallSpinner.vue";
import Pokechart from "@/components/Pokechart.vue";
import PokeInfoText from "@/components/PokeInfoText.vue";

@Component({
  components: {
    PokeBallSpinner,
    Pokechart,
    PokeInfoText,
  },
})
export default class Pokedex extends Vue {
  private id: number = parseInt(this.$route.params.id);
  private pokeInfo: PokeInfo = emptyPokeInfo;
  private flgFetched = false;
  private messageNotLoaded = "Loading...";
  private rows: string[] = ["分類", "たかさ", "おもさ", "タイプ"];

  async mounted() {
    this.pokeInfo = await fetchPokeInfoById(this.id, "ja-Hrkt").catch(
      (error: Error) => {
        this.messageNotLoaded = error.message;
        return emptyPokeInfo;
      }
    );
    if (this.pokeInfo !== emptyPokeInfo) {
      this.flgFetched = true;
    }
  }
}
</script>

<style>
.bg {
  background-image: url("~@/assets/pokebg.png");
  background-size: cover;
}
</style>
