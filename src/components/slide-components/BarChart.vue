<script>
import { Bar } from "vue-chartjs";
// const deepFlatten = arr =>
//   [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
export default {
  extends: Bar,
  name: "bar-chart",
  props: {
    chartData: {
      type: Object,
      default: null
    },
    chartOptions: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
};
</script>

<style lang="scss">
#bar-chart {
  background-color: white;
}
</style>
