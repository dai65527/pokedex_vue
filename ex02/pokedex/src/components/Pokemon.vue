<template>
  <div>
    <h1>Pokemon</h1>
    <h2>id: {{ id }}</h2>
    <h3>{{ pokeInfo }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokeInfo, { fetchPokeInfoById, emptyPokeInfo } from "@/models/pokeInfo";

@Component({})
export default class Pokedex extends Vue {
  private id: number = parseInt(this.$route.params.id);
  private pokeInfo: PokeInfo = emptyPokeInfo;

  async mounted() {
    this.pokeInfo = await fetchPokeInfoById(this.id, "ja-Hrkt").catch(
      (error: Error) => {
        console.log("hoge");
        console.error(error);
        return emptyPokeInfo;
      }
    );
  }
}
</script>
