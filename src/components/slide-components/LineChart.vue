<script>
import { Line } from "vue-chartjs";
const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
export default {
  extends: Line,
  name: "line-chart",
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
#line-chart {
  background-color: white;
}
</style>
