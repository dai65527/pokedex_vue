<template>
  <v-row>
    <v-col>
      <v-card shaped class="grey lighten-5" elevation="4">
        <v-card-text class="font-weight-bold display-1 text-center mb-n10"
          >ステータス</v-card-text>
          <radar-chart :pokeStats="this.pokeStats"></radar-chart>
      </v-card>
    </v-col>
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
