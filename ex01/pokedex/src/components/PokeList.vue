<template>
  <div>
    <v-container>
      <v-row>
        <PokeListItem
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </v-row>
    </v-container>
    <InfiniteLoading
      v-if="!flgErrLoading"
      ref="infiniteLoading"
      @infinite="loadPokemons"
    >
      <template slot="spinner">
        <p>Loading...</p>
      </template>
      <span slot="no-more">End of list</span>
    </InfiniteLoading>
    <div v-if="flgErrLoading">
      <p>{{ axiosErrorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfiniteLoading from "vue-infinite-loading";
import PokeListItem from "./PokeListItem.vue";
import Pokemon, { POKE_MAX, fetchPokemons } from "../models/pokemon";

@Component({
  components: {
    PokeListItem,
    InfiniteLoading,
  },
})
export default class PokeList extends Vue {
  private pokemons: Pokemon[] = [];
  private numLoaded = 0;
  private numToLoad = 36;
  private flgErrLoading = false;
  private axiosErrorMessage = "";

  get infiniteLoading(): InfiniteLoading {
    return this.$refs.infiniteLoading as InfiniteLoading;
  }

  async loadPokemons() {
    let flgFinishLoading = false;
    if (this.numLoaded + this.numToLoad >= POKE_MAX) {
      this.numToLoad = POKE_MAX - this.numLoaded;
      flgFinishLoading = true;
    }
    const fetchedPokemons = await fetchPokemons(
      this.numLoaded,
      this.numToLoad,
      "ja"
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
