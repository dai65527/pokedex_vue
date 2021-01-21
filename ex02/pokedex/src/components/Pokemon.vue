<template>
  <div>
    <div class="bg" height="100vh" v-if="flgFetched">
      <div class="mx-auto" max-width="1300px" width="100%">
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
    <poke-ball-spinner
      v-if="!flgFetched"
      :infoText="messageNotLoaded"
      :isLoading="flgLoading"
    ></poke-ball-spinner>
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
  private flgLoading = true;
  private messageNotLoaded = "Loading...";
  private rows: string[] = ["分類", "たかさ", "おもさ", "タイプ"];

  async mounted() {
    this.pokeInfo = await fetchPokeInfoById(this.id, "ja-Hrkt").catch(
      (error: Error) => {
        this.messageNotLoaded = error.message;
        this.flgLoading = false;
        return emptyPokeInfo;
      }
    );
    if (this.pokeInfo !== emptyPokeInfo) {
      this.flgFetched = true;
    }
  }
}
</script>

<style scoped>
.bg {
  background-image: url("~@/assets/pokebg.png");
}
</style>
