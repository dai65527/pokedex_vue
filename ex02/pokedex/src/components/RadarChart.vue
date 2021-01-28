<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import Chart from "chart.js";
import { Radar, mixins } from "vue-chartjs";
import PokeStats from "@/models/pokeStats";
import { Language } from "@/models/language";

const getLabelsInLanguage = (language: Language): string[] => {
  if (language === "ja-Hrkt") {
    return ["HP", "こうげき", "ぼうぎょ", "すばやさ", "とくぼう", "とくこう"];
  } else {
    return ["HP", "Attack", "Defence", "Speed", "S-Defence", "S-Attack"];
  }
};

@Component({})
export default class RadarChart extends Mixins(Radar, mixins.reactiveProp) {
  @Prop()
  private pokeStats!: PokeStats;

  get chartData(): Chart.ChartData {
    return {
      labels: getLabelsInLanguage(this.$store.state.language),
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
            this.pokeStats.specialAttack
          ]
        }
      ]
    }
  }

  private chartOptions: Chart.ChartOptions = {
    legend: { display: false },
    layout: { padding: 30 },
    scale: {
      pointLabels: {
        fontSize: 12,
        fontFamily: "Arial",
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 70,
        fontSize: 10,
        backdropColor: "rgba(255,255,255,0)",
      },
    },
  };

  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>
