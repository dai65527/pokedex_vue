<template>
<div>

<v-container>
<v-row>


  <pokemon
  v-for="(item, index) in pokemons"
  :key="index"
  :uri="item.url"></pokemon>

</v-row>
</v-container>

  <v-row justify="center">
    <v-btn v-on:click="onClickPrev">PREV</v-btn>
    <v-btn v-on:click="onClickNext">NEXT</v-btn>
  </v-row>

</div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Pokemon from '@/components/pokemon.vue';
  import axios from 'axios';

  @Component({components: {Pokemon}})
  export default class PokeList extends Vue {
  private srcUri: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=24';
  private nextUri: string = '';
  private prevUri: string = '';
  private pokemons: object = {};

  private created() {
    this.fetchPokemonList(this.srcUri);
  }

  private onClickNext() {
    if (this.nextUri) {
      this.fetchPokemonList(this.nextUri);
    }
  }

  private onClickPrev() {
    if (this.prevUri) {
      this.fetchPokemonList(this.prevUri);
    }
  }

  private fetchPokemonList(uri: string) {
    axios.get(uri)
    .then((res) => {
      const tmpUrl: URL = new URL(res.data.next);

      this.pokemons = res.data.results;
      this.prevUri = res.data.previous;

      if ((Number)(tmpUrl.searchParams.get('offset')) <= 898) {
        this.nextUri = res.data.next;
      } else {
        this.nextUri = '';
      }
    });
  }
}
</script>