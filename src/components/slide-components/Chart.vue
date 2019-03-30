<template>
  <div>
    <div
      :style="{'max-width': chartData.maxWidth, 'max-height': chartData.maxHeight}"
      :id="chartId"
      :class="[chartData.aspect, 'ct-chart', {'ct-chart-donut': chartData.chartType == 'donut'}]"
    >
    </div>
  </div>
</template>

<script>
const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
import Chartist from "chartist";
export default {
  name: "chart",
  props: {
    chartKey: {
      default: 1234,
      required: true
    },
    chartData: {
      default() {
        return {
          aspect: "ct-octave",
          chartType: "pie",
          data: {
            labels: ["TEST", "DATA", "UH OH"],
            series: [[2, 3, 1], [3, 5, 4], [1, 5, 9]]
          },
          // options: {
          //   axisX: {
          //     showGrid: false
          //   },
          //   axisY: {
          //   }
          // },
          maxWidth: "100%"
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
          // REQUIRES a one dimension data set
          this.chart = new Chartist.Pie(
            "#" + this.chartId,
            {
              series: deepFlatten(this.chartData.data.series),
              labels: this.chartData.data.labels
            },
            this.chartData.options
          );
          break;
        case "donut":
          // FIXME
          this.chart = new Chartist.Pie(
            "#" + this.chartId,
            {
              series: deepFlatten(this.chartData.data.series),
              labels: this.chartData.data.labels
            },
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
      return "chart-" + this.chartKey;
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
