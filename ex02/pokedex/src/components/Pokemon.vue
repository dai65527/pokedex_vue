<template>
  <div>
    <div class="bg" v-if="flgFetched">
      <v-container>
        <v-row justify="center" align-content="center">
          <v-col cols="12" lg="6">
            <v-row no-gutters justify="center" align-content="center">
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
              <v-col class="my-10">
                <v-card class="grey lighten-5" elevation="4">
                  <v-row>
                    <v-col>
                      <v-card-text class="font-weight-bold display-1"
                        >分類: たねポケモン</v-card-text
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card-text class="font-weight-bold display-1"
                        >たかさ:
                      </v-card-text>
                    </v-col>
                    <v-col>
                      <v-card-text class="font-weight-bold display-1"
                        >{{ pokeInfo.height }}m</v-card-text
                      >
                    </v-col>
                    <v-col>
                      <v-card-text class="font-weight-bold display-1"
                        >おもさ:
                      </v-card-text>
                    </v-col>
                    <v-col>
                      <v-card-text class="font-weight-bold display-1"
                        >{{ pokeInfo.weight }}kg</v-card-text
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card-text class="font-weight-bold display-1"
                        >タイプ：　くさ/どく</v-card-text
                      >
                    </v-col>
                  </v-row>
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
import PokeBallSpinner from "./PokeBallSpinner";

const husi: string =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/1.png";

@Component({
  components: {
    PokeBallSpinner,
  },
})
export default class Pokedex extends Vue {
  private id: number = parseInt(this.$route.params.id);
  private pokeInfo: PokeInfo = emptyPokeInfo;
  private flgFetched = false;
  private messageNotLoaded = "Loading...";

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
