<template>
  <div>
    <button class="button" @click="renderChart">Chart</button>
    <div
      :id="chartId"
      :class="[chartData.aspect, 'ct-chart']"
    >
    </div>
  </div>
</template>

<script>
import Chartist from "chartist";
export default {
  name: "chart",
  props: {
    chartkey: {
      default: 1234,
      required: true
    },
    chartData: {
      default() {
        return {
          aspect: "ct-octave",
          chartType: "bar",
          data: {
            labels: ["TEST", "DATA", "UH OH"],
            series: [[2, 3, 1]]
          }
        };
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  methods: {
    renderChart() {
      switch (this.chartData.chartType) {
        case "bar":
          this.chart = new Chartist.Bar(
            "#" + this.chartId,
            this.chartData.data,
            this.chartData.options
          );
          break;
        case "line":
          this.chart = new Chartist.Line(
            "#" + this.chartId,
            this.chartData.data,
            this.chartData.options
          );
          break;
        case "pie":
          // FIXME
          this.chart = new Chartist.Pie(
            "#" + this.chartId,
            this.chartData.data,
            this.chartData.options
          );
          break;
        case "donut":
          // FIXME
          this.chart = new Chartist.Donut(
            "#" + this.chartId,
            this.chartData.data,
            this.chartData.options
          );
          break;
        case "area":
          // FIXME
          this.chart = new Chartist.Area(
            "#" + this.chartId,
            this.chartData.data,
            this.chartData.options
          );
          break;

        default:
          break;
      }
    }
  },
  computed: {
    chartId() {
      return "chart-" + this.chartkey;
    }
  },
  watch: {
    chartData() {
      this.renderChart();
    }
  },
  mounted() {
    this.renderChart();
    // console.log(Chartist);
  }
};
</script>

<style>
</style>
