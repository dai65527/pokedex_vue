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
import { Prop, Component, Vue } from "vue-property-decorator";
import axios from "axios";
import PokeListItem from "./PokeListItem.vue";
import Pokemon from "../models/Pokemon";

const fetchPokemons = (): Pokemon[] => {
  const p1 = new Pokemon(
    1,
    "Fushigidane",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
  );

  const p2 = new Pokemon(
    2,
    "Fushigisou",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
  );

  const p3 = new Pokemon(
    3,
    "Fushigibana",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
  );

  return [p1, p2, p3];
};

@Component({
  components: {
    PokeListItem,
  },
})
export default class PokeList extends Vue {
  private pokemons: Pokemon[] = [];

  // lifecycle hooks
  mounted() {
    this.pokemons = fetchPokemons();
  }
}
</script>
