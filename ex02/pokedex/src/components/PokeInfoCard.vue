<template>
  <v-row>
    <v-col class="ma-auto mx-auto" cols="10">
      <v-card shaped class="grey lighten-5" elevation="4">
        <poke-info-text
          v-for="item in informations"
          :key="item.title"
          :title="item.title"
          :value="item.value"
        ></poke-info-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PokeInfo from "@/models/pokeInfo.ts";
import PokeInfoText from "@/components/PokeInfoText.vue";

@Component({
  components: {
    PokeInfoText,
  },
})
export default class PokeInfoCard extends Vue {
  @Prop()
  private pokeInfo!: PokeInfo;
  private informations: { title: string; value: string | number }[] = [];

  created() {
    this.informations.push({ title: "分類", value: `${this.pokeInfo.genus}` });
    this.informations.push({
      title: "たかさ",
      value: `${this.pokeInfo.height}m`,
    });
    this.informations.push({
      title: "おもさ",
      value: `${this.pokeInfo.weight}kg`,
    });
    if (this.pokeInfo.types.length == 2)
      this.informations.push({
        title: "タイプ",
        value: `${this.pokeInfo.types[0].name}/${this.pokeInfo.types[1].name}`,
      });
    else
      this.informations.push({
        title: "タイプ",
        value: `${this.pokeInfo.types[0].name}`,
      });
  }
}
</script>
