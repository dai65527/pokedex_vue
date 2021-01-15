<template>
  <div>
    <h2>Pokelist</h2>
    <div class="d-flex align-content-start flex-wrap">
      <PokeListItem
        class="ma-6"
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
    <InfiniteLoading
      v-if="!flgErrLoading || !flgErrLoading"
      ref="infiniteLoading"
      spinner="spiral"
      @infinite="loadPokemons"
    >
      <span slot="no-more">以上</span>
    </InfiniteLoading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfiniteLoading from "vue-infinite-loading";
import PokeListItem from "./PokeListItem.vue";
import Pokemon, { fetchPokemons } from "../models/pokemon";

@Component({
  components: {
    PokeListItem,
    InfiniteLoading,
  },
})
export default class PokeList extends Vue {
  private pokemons: Pokemon[] = [];
  private numLoaded = 0;
  private numToLoad = 20;
  private flgErrLoading = false;

  async loadPokemons() {
    const fetchedPokemons = await fetchPokemons(
      this.numLoaded,
      this.numToLoad
    ).catch((error): Pokemon[] => {
      console.error(error);
      this.flgErrLoading = true;
      return [];
    });
    this.numLoaded += fetchedPokemons.length;
    this.pokemons = this.pokemons.concat(fetchedPokemons);
    this.$refs.infiniteLoading.stateChanger.loaded();
    if (fetchedPokemons.length < this.numToLoad) {
      this.$refs.infiniteLoading.stateChanger.complete();
    }
  }
}
</script>
