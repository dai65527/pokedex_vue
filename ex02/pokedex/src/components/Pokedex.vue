<template>
  <PokeList />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokeList from "./PokeList.vue";

@Component({
  components: {
    PokeList,
  },
})
export default class Pokedex extends Vue {}
</script>
