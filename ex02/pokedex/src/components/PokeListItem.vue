<template>
  <v-col cols="6" sm="4" md="3" xl="2" v-if="isSearchTarget">
    <v-card
      hover
      :ripple="false"
      :to="{ name: 'pokemon', params: { id: pokemon.id } }"
      class="mx-auto"
    >
      <v-img :src="require('@/assets/pokeball_bg.png')" :alt="pokemon.name">
        <v-img :src="pokemon.imageUrl" :alt="pokemon.name"> </v-img>
      </v-img>
      <p class="font-weight-black body-1 py-3 mx-3">
        {{ "No." + pokemon.id + ": " + pokemon.name }}
      </p>
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
  @Prop()
  private searchString!: string;

  get isSearchTarget(): boolean {
    if (
      this.searchString !== "" &&
      this.pokemon.name.indexOf(this.searchString) === -1
    ) {
      return false;
    }
    return true;
  }
}
</script>
