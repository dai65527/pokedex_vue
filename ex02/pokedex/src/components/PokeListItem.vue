<template>
  <v-col cols="12" xs="6" sm="4" md="3" xl="2">
      <v-card 
      hover
      :ripple="false"
      :to="{ name: 'pokemon', params: { id: pokemon.id } }"
      class="mx-auto">
        <v-img :src="require('@/assets/pokeball_bg.png')" :alt="pokemon.name">
          <v-img :src="pokemon.imageUrl" :alt="pokemon.name"> </v-img>
        </v-img>
        <v-card-title class="font-weight-black text-body-1">{{
          "No." + pokemon.id + ": " + pokemon.name
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
