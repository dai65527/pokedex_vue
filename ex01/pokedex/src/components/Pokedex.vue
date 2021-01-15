<template>
  <v-app>
    <h1>Pokedex</h1>
    <PokeList class="mx-auto px-3 py-2" width="70%" max-width="500px" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokeList from "./PokeList.vue";

@Component({
  components: {
    PokeList
  }
})
export default class Pokedex extends Vue {}
</script>
