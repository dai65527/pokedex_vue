<template>
  <div id="app">
    <Pokedex />
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
