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

</div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Pokemon from '@/components/pokemon.vue';
  import axios from 'axios';

  @Component({components: {Pokemon}})
  export default class PokeList extends Vue {
  private srcUri: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=36';
  private nextUri: string = '';
  private prevUri: string = '';
  private pokemons: Array<object> = [];
  private isLoadiong: boolean = false;

  private created() {
    this.fetchPokemonList(this.srcUri);
  }

  private mounted() {
    window.onscroll = () => {
      if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight
      ) {
        this.fetchPokemonList(this.nextUri);
      }
    }
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
    if (this.isLoadiong) return;
    this.isLoadiong = true;
    axios.get(uri)
    .then((res) => {
      const tmpUrl: URL = new URL(res.data.next);

      this.pokemons = this.pokemons.concat(res.data.results);
      this.prevUri = res.data.previous;

      if ((Number)(tmpUrl.searchParams.get('offset')) <= 898) {
        this.nextUri = res.data.next;
      } else {
        this.nextUri = '';
      }
      this.isLoadiong = false;
    });
  }
}
</script>