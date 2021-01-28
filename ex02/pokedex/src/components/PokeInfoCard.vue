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
    this.informations.push({
      title: this.$store.state.language === "ja-Hrkt" ? "ぶんるい" : "GENUS",
      value: `${this.pokeInfo.genus}`,
    });
    this.informations.push({
      title: this.$store.state.language === "ja-Hrkt" ? "たかさ" : "HEIGHT",
      value: `${this.pokeInfo.height.toFixed(1)}m`,
    });
    this.informations.push({
      title: this.$store.state.language === "ja-Hrkt" ? "おもさ" : "WEIGHT",
      value: `${this.pokeInfo.weight.toFixed(1)}kg`,
    });
    if (this.pokeInfo.types.length == 2)
      this.informations.push({
        title: this.$store.state.language === "ja-Hrkt" ? "タイプ" : "TYPE",
        value: `${this.pokeInfo.types[0].name}/${this.pokeInfo.types[1].name}`,
      });
    else
      this.informations.push({
        title: this.$store.state.language === "ja-Hrkt" ? "タイプ" : "TYPE",
        value: `${this.pokeInfo.types[0].name}`,
      });
  }
}
</script>
