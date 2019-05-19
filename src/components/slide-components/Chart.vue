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
    chartScaledOptions() {
      const viewWidth = window.innerWidth;

      return {
        fontSizes: {
          title: mapNumRange(viewWidth, 400, 3840, 24, 72),
          legend: mapNumRange(viewWidth, 400, 3840, 12, 36),
          barX: mapNumRange(viewWidth, 400, 3840, 8, 48),
          barY: mapNumRange(viewWidth, 400, 3840, 12, 36)
        },
        lineBorderWidth: mapNumRange(viewWidth, 400, 3840, 1, 15),
        rectangleBorderWidth: mapNumRange(viewWidth, 400, 3840, 1, 15)
      };
    },
    modifiedChartJsOptions() {
      let modifiedOptions = deepClone(this.chart.chartJsOptions);

      if (modifiedOptions.title) {
        modifiedOptions.title.fontSize = this.chartScaledOptions.fontSizes.title;
      }

      if (modifiedOptions.legend.labels) {
        modifiedOptions.legend.labels.fontSize = this.chartScaledOptions.fontSizes.legend;
      }

      if (modifiedOptions.scales.yAxes) {
        modifiedOptions.scales.yAxes = modifiedOptions.scales.yAxes.map(
          axis => {
            if (axis.ticks) {
              axis.ticks.fontSize = this.chartScaledOptions.fontSizes.barY;
              return axis;
            }
          }
        );
      }
      if (modifiedOptions.scales.xAxes) {
        modifiedOptions.scales.xAxes = modifiedOptions.scales.xAxes.map(
          axis => {
            if (axis.ticks) {
              axis.ticks.fontSize = this.chartScaledOptions.fontSizes.barX;
              return axis;
            }
          }
        );
      }

      if (modifiedOptions.elements.line) {
        modifiedOptions.elements.line.borderWidth = this.chartScaledOptions.lineBorderWidth;
      }
      if (modifiedOptions.elements.rectangle) {
        modifiedOptions.elements.rectangle.borderWidth = this.chartScaledOptions.rectangleBorderWidth;
      }

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
