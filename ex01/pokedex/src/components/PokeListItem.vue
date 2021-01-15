<template>
  <v-col>
    <v-card class="mx-auto" width="170">
      <v-img :src="pokemon.imageUrl" :alt="pokemon.name" />
      <v-card-title class="font-weight-black text-body-1">{{
      pokemon.id + ": " + pokemon.name
      }}</v-card-title>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Pokemon from "../models/pokemon";

@Component({})
export default class PokeList extends Vue {
  @Prop()
  private pokemon!: Pokemon;
}
</script>
