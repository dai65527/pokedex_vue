<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import Chart from "chart.js";
import { Radar, mixins } from "vue-chartjs";
import PokeStats from "@/models/pokeStats";

@Component({})
export default class RadarChart extends Mixins(Radar, mixins.reactiveProp) {
  @Prop()
  private pokeStats!: PokeStats;

  private chartData: Chart.ChartData = {
    labels: ["HP", "こうげき", "ぼうぎょ", "すばやさ", "とくぼう", "とくこう"],
    datasets: [
      {
        label: "",
        backgroundColor: "rgba(96,144,239,0.3)",
        borderColor: "#6090EF",
        data: [
          this.pokeStats.hp,
          this.pokeStats.attack,
          this.pokeStats.defense,
          this.pokeStats.speed,
          this.pokeStats.specialDefense,
          this.pokeStats.specialAttack,
        ],
      },
    ],
  };

  private chartOptions: Chart.ChartOptions = {
    legend: { display: false },
    layout:{ padding: 30 },
    scale: {
      pointLabels: {
        fontSize: 25,
        fontFamily: "Arial",
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 70,
        fontSize: 20,
        fontStyle: 'bold',
        backdropColor: "rgba(255,255,255,0)"
      },
    },
  };

  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>
