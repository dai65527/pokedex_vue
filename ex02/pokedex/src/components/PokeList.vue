<template>
  <div class="mx-auto" :style="{ 'max-width': '1300px', width: '100%' }">
    <v-container fluid>
      <v-row>
        <PokeListItem
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
          :searchString="searchString"
        />
      </v-row>
    </v-container>
    <InfiniteLoading
      v-if="!flgErrLoading"
      ref="infiniteLoading"
      @infinite="loadPokemons"
    >
      <template slot="spinner">
        <poke-ball-spinner
          :isMiniSpinner="true"
          :infoText="axiosErrorMessage"
          :isLoading="!flgErrLoading"
        ></poke-ball-spinner>
      </template>
      <span slot="no-more">End of list</span>
    </InfiniteLoading>
    <div v-if="flgErrLoading">
      <p>{{ axiosErrorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import InfiniteLoading from "vue-infinite-loading";
import PokeListItem from "./PokeListItem.vue";
import Pokemon, { POKE_MAX, fetchPokemons } from "../models/pokemon";
import { Language } from "../models/language";
import PokeBallSpinner from "@/components/PokeBallSpinner.vue";

@Component({
  components: {
    PokeListItem,
    InfiniteLoading,
    PokeBallSpinner
  }
})
export default class PokeList extends Vue {
  private pokemons: Pokemon[] = [];
  private numLoaded = 0;
  private numToLoad = 72;
  private flgErrLoading = false;
  private axiosErrorMessage = "Loading...";

  get language(): Language {
    return this.$store.state.language;
  }

  get typeFilter(): string {
    return this.$store.state.typeFilter;
  }

  get searchString(): string {
    return this.$store.state.search;
  }

  get flgFiltered(): boolean {
    if (this.typeFilter === "None") {
      return false;
    } else {
      return true;
    }
  }

  get fetchUrl(): string {
    if (!this.flgFiltered) {
      return `pokemon/?offset=${this.numLoaded}&limit=${this.numToLoad}`;
    } else {
      return `type/${this.typeFilter}`;
    }
  }

  get infiniteLoading(): InfiniteLoading {
    return this.$refs.infiniteLoading as InfiniteLoading;
  }

  private reset() {
    this.pokemons = [];
    this.numLoaded = 0;
    this.infiniteLoading.stateChanger.reset();
  }

  @Watch("language")
  langReset() {
    this.reset();
  }

  @Watch("typeFilter")
  filterReset() {
    this.reset();
  }

  @Watch("searchString")
  searchReset() {
    this.reset();
  }
  async loadPokemons() {
    let flgFinishLoading = false;
    if (!this.flgFiltered && this.numLoaded + this.numToLoad >= POKE_MAX) {
      this.numToLoad = POKE_MAX - this.numLoaded;
      flgFinishLoading = true;
    }
    if (this.flgFiltered) {
      flgFinishLoading = true;
    }
    const fetchedPokemons = await fetchPokemons(
      this.fetchUrl,
      this.language,
      this.flgFiltered
    ).catch((error: Error): Pokemon[] => {
      this.axiosErrorMessage = error.message;
      this.flgErrLoading = true;
      return [];
    });
    this.numLoaded += fetchedPokemons.length;
    this.pokemons = this.pokemons.concat(fetchedPokemons);
    this.infiniteLoading.stateChanger.loaded();
    if (flgFinishLoading) {
      this.infiniteLoading.stateChanger.complete();
    }
  }
}
</script>
