<template>
  <div id="app">
    <v-app>
      <Pokedex />
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Pokedex from "./components/Pokedex.vue";

@Component({
  components: {
    Pokedex
  }
})
export default class App extends Vue {}
</script>
