<template>
  <div class="mx-auto" :style="{ 'max-width': '1300px', width: '100%' }">
    <v-container fluid>
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
      spinner="spiral"
      @infinite="loadPokemons"
    >
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
import { Language } from "../models/language"

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

  get language(): Language {
    return this.$store.state.language;
  }

  @Watch("language")
  async reset() {
    this.pokemons = [];
    this.numLoaded = 0;
    await this.loadPokemons();
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
      this.language
    ).catch((error: Error): Pokemon[] => {
      this.axiosErrorMessage = error.message;
      this.flgErrLoading = true;
      return [];
    });
    this.numLoaded += fetchedPokemons.length;
    this.pokemons = this.pokemons.concat(fetchedPokemons);
    this.$refs.infiniteLoading.stateChanger.loaded();
    if (flgFinishLoading) {
      this.$refs.infiniteLoading.stateChanger.complete();
    }
  }
}
</script>
