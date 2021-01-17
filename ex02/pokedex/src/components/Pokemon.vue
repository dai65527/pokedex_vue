<template>
  <div>
    <div v-if="flgFetched">
      <h1>{{ `No.${id} ${pokeInfo.name}` }}</h1>
      <v-img :src="require('@/assets/pokeball_bg.png')" :alt="pokeInfo.name">
        <v-img :src="pokeInfo.imageUrl" :alt="pokeInfo.name"> </v-img>
      </v-img>
      <p>{{ pokeInfo }}</p>
    </div>
    <p v-if="!flgFetched">{{ messageNotLoaded }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokeInfo, { fetchPokeInfoById, emptyPokeInfo } from "@/models/pokeInfo";

@Component({})
export default class Pokedex extends Vue {
  private id: number = parseInt(this.$route.params.id);
  private pokeInfo: PokeInfo = emptyPokeInfo;
  private flgFetched = false;
  private messageNotLoaded = "Loading...";

  async mounted() {
    this.pokeInfo = await fetchPokeInfoById(this.id, "ja-Hrkt").catch(
      (error: Error) => {
        this.messageNotLoaded = error.message;
        return emptyPokeInfo;
      }
    );
    if (this.pokeInfo !== emptyPokeInfo) {
      this.flgFetched = true;
    }
  }
}
</script>
