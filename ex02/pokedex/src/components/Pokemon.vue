<template>
  <div>
    <div v-if="flgFetched">
      <div class="mx-auto" :style="{ 'max-width': '1200px', width: '100%' }">
        <v-container class="mt-n6">
          <v-row justify="center" align-content="center">
            <v-col cols="12" sm="6" class="my-auto">
              <v-row justify="center" align-content="center" no-gutters>
                <v-col cols="10">
                  <v-img
                    v-if="!isRefresh"
                    :src="pokeInfo.imageUrl"
                    :alt="pokeInfo.name"
                  />
                  <poke-ball-spinner
                    v-show="isRefresh"
                    :isMiniSpinner="false"
                    :infoText="messageNotLoaded"
                    :isLoading="flgLoading"
                  ></poke-ball-spinner>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6">
              <v-row>
                <v-col>
                  <v-card shaped class="grey lighten-5" elevation="4">
                    <v-row class="mt-5 mb-2">
                      <v-col cols="2" :style="{ 'text-align': 'center' }">
                        <v-icon v-if="this.id !== 1" @click="refresh(-1)" large
                          >mdi-menu-left</v-icon
                        >
                      </v-col>
                      <v-col cols="8">
                        <div
                          class="font-weight-bold display-1 text-center grey--text text--darken-2"
                        >
                          {{ `${pokeInfo.name}` }}
                        </div>
                      </v-col>
                      <v-col cols="2" :style="{ 'text-align': 'center' }">
                        <v-icon v-if="isPokeMax" @click="refresh(1)" large
                          >mdi-menu-right</v-icon
                        >
                      </v-col>
                    </v-row>
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
      v-show="!flgFetched"
      :isMiniSpinner="false"
      :infoText="messageNotLoaded"
      :isLoading="flgLoading"
    ></poke-ball-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PokeInfo, { fetchPokeInfoById, emptyPokeInfo } from "@/models/pokeInfo";
import PokeBallSpinner from "@/components/PokeBallSpinner.vue";
import PokeChart from "@/components/PokeChart.vue";
import PokeInfoCard from "@/components/PokeInfoCard.vue";
import { Language } from "@/models/language";
import { POKE_MAX } from "@/models/pokemon";
import router from "@/router";

@Component({
  components: {
    PokeBallSpinner,
    PokeChart,
    PokeInfoCard
  }
})
export default class Pokedex extends Vue {
  private id: number = parseInt(this.$route.params.id);
  private pokeInfo: PokeInfo = emptyPokeInfo;
  private flgFetched = false;
  private flgLoading = true;
  private messageNotLoaded = "Loading...";
  private isRefresh = false;

  get language(): Language {
    return this.$store.state.language;
  }

  get isPokeMax(): boolean {
    return this.id !== POKE_MAX;
  }

  async fetch() {
    this.pokeInfo = await fetchPokeInfoById(this.id, this.language).catch(
      (error: Error) => {
        this.messageNotLoaded = error.message;
        this.flgLoading = false;
        return emptyPokeInfo;
      }
    );
    if (this.pokeInfo !== emptyPokeInfo) {
      this.flgFetched = true;
      this.isRefresh = false;
    }
  }

  async refresh(num: number) {
    if (!this.isRefresh) {
      this.isRefresh = true;
      this.id += num;
      await this.fetch();
      router.push({ name: "pokemon", params: { id: String(this.id) } });
    }
  }

  @Watch("language")
  async reset() {
    this.isRefresh = true;
    await this.fetch();
  }

  created() {
    if (this.id < 1 || this.id > 10000) this.id = 0;
  }

  async mounted() {
    await this.fetch();
  }
}
</script>
