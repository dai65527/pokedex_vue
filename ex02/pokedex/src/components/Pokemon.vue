<template>
  <div>
    <div class="bg" v-if="flgFetched">
      <div class="main mx-auto">
        <v-container>
          <v-row justify="center" align-content="center">
            <v-col cols="12" sm="6" class="my-auto">
              <v-row justify="center" align-content="center" no-gutters>
                <v-col cols="10">
                  <v-img :src="pokeInfo.imageUrl" :alt="pokeInfo.name" />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6">
              <v-row>
                <v-col>
                  <v-card
                    shaped
                    class="grey lighten-5"
                    elevation="4"
                    max-height="100px"
                  >
                    <v-card-text
                      class="font-weight-bold text-center display-1"
                      >{{ `${pokeInfo.name}` }}</v-card-text
                    >
                  </v-card>
                </v-col>
              </v-row>
              <poke-info-card :pokeInfo="pokeInfo" />
              <poke-chart :pokeStats="pokeInfo.stats"></poke-chart>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <poke-ball-spinner v-if="!flgFetched"></poke-ball-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokeInfo, { fetchPokeInfoById, emptyPokeInfo } from "@/models/pokeInfo";
import PokeBallSpinner from "@/components/PokeBallSpinner.vue";
import PokeInfoText from "@/components/PokeInfoText.vue";
import PokeChart from "@/components/PokeChart.vue";
import PokeInfoCard from "@/components/PokeInfoCard.vue";

@Component({
  components: {
    PokeBallSpinner,
    PokeInfoText,
    PokeChart,
    PokeInfoCard,
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

.main {
  max-width: 1300px;
  width: 100%;
}
</style>
