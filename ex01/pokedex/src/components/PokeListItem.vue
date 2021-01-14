<template>
  <div>
    <h3>{{ pokemon.id + ": " + pokemon.name }}</h3>
    <img width="200" :src="pokemon.imageUrl" :alt="pokemon.name" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Pokemon from "../models/Pokemon";

@Component({})
export default class PokeList extends Vue {
  @Prop()
  private pokemon!: Pokemon;
}
</script>
