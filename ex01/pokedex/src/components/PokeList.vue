<template>
  <div>
    <h2>Pokelist</h2>
    <PokeListItem
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokeListItem from "./PokeListItem.vue";
import Pokemon, { fetchPokemons } from "../models/Pokemon";

@Component({
  components: {
    PokeListItem
  }
})
export default class PokeList extends Vue {
  private pokemons: Pokemon[] = [];

  // lifecycle hooks
  async mounted() {
    this.pokemons = await fetchPokemons(0, 20);
  }
}
</script>
