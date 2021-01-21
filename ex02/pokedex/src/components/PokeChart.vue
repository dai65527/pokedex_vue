<template>
  <v-row>
    <v-spacer />
    <v-col cols="10">
      <v-card shaped class="grey lighten-5" elevation="4">
        <p class="font-weight-bold text-center grey--text text--darken-2">
          ステータス
        </p>
        <radar-chart :pokeStats="this.pokeStats"></radar-chart>
      </v-card>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import RadarChart from "@/components/RadarChart.vue";
import PokeStats from "@/models/pokeStats.ts";

@Component({
  components: {
    RadarChart,
  },
})
export default class PokeChart extends Vue {
  @Prop()
  private pokeStats!: PokeStats;
}
</script>
