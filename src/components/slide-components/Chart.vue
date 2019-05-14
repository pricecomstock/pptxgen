<template>
    <div class="chart-container">
    <bar-chart v-if="chart"
        :chart-data="chart.chartJsData"
        :chart-options="chart.chartJsOptions"
    ></bar-chart>
    </div>
</template>

<script>

import barChart from "./BarChart.vue";
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
        containerStyles() {
            return {
                position: 'relative',
                height: `${this.vwHeight}vw`,
                width: `${this.vwWidth}vw`
            }
        }
    },
    components: {
        barChart
    }
}
</script>

<style>
</style>
