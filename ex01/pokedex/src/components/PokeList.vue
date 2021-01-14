<template>
  <div>
    <h2>Pokelist</h2>
    <PokeListItem :pokemon="pokemon" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokeListItem from "./PokeListItem.vue";
import Pokemon from "../models/Pokemon";

@Component({
  components: {
    PokeListItem,
  },
})
export default class PokeList extends Vue {
  private pokemon = new Pokemon(
    1,
    "Fushigidane",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
  );
}
</script>
