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
          chartType: "line",
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
  }
};
</script>

<style lang="scss">
.ct-chart {
  background-color: white;
}

.ct-label {
  font-size: 2em !important;
}
</style>

