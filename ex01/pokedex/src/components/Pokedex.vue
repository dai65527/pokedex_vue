<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
    >Pokedex</v-app-bar>

    <v-main>
    <PokeList class="mx-auto px-3 py-2" width="70%" max-width="500px" />
    </v-main>
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
