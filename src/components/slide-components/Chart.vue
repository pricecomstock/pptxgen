<template>
  <div class="chart-container">
    <component
      :is="chartComponent"
      v-if="chart"
      :chart-data="chart.chartJsData"
      :chart-options="modifiedChartJsOptions"
    ></component>
  </div>
</template>

<script>
const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone;
};

const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

import barChart from "./BarChart.vue";
import lineChart from "./LineChart.vue";
export default {
  props: {
    vwHeight: {
      type: Number,
      default: 25
    },
    vwWidth: {
      type: Number,
      default: 20
    },
    chart: {
      type: Object,
      required: true
    }
  },
  computed: {
    chartComponent() {
      const type = this.chart.chartType;
      if (type == "bar") {
        return "bar-chart";
      } else if (type == "line") {
        return "line-chart";
      } else {
        return null;
      }
    },
    containerStyles() {
      return {
        position: "relative",
        height: `${this.vwHeight}vw`,
        width: `${this.vwWidth}vw`
      };
    },
    chartFontSizes() {
      const viewWidth = window.innerWidth;

      return {
        // TODO maybe rerender size without leaving the slide
        title: mapNumRange(viewWidth, 400, 3840, 24, 72),
        barX: mapNumRange(viewWidth, 400, 3840, 8, 48),
        barY: mapNumRange(viewWidth, 400, 3840, 12, 36)
      };
    },
    modifiedChartJsOptions() {
      let modifiedOptions = deepClone(this.chart.chartJsOptions);

      modifiedOptions.title.fontSize = this.chartFontSizes.title;
      modifiedOptions.scales.yAxes = modifiedOptions.scales.yAxes.map(axis => {
        axis.ticks.fontSize = this.chartFontSizes.barY;
        return axis;
      });
      modifiedOptions.scales.xAxes = modifiedOptions.scales.xAxes.map(axis => {
        axis.ticks.fontSize = this.chartFontSizes.barX;
        return axis;
      });

      return modifiedOptions;
    }
  },
  components: {
    barChart,
    lineChart
  }
};
</script>

<style></style>
