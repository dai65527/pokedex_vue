<template>
<div>
  <div>
    <button v-on:click="onClickPrev">PREV</button>
    <button v-on:click="onClickNext">NEXT</button>
  </div>

  <pokemon
  v-for="(item, index) in pokemons"
  :key="index"
  :uri="item.url"></pokemon>

</div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Pokemon from '@/components/pokemon.vue';
  import axios from 'axios';

  @Component({components: {Pokemon}})
  export default class PokeList extends Vue {
  private srcUri: string = 'https://pokeapi.co/api/v2/pokemon/';
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