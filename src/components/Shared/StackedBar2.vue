<template>
  <div>
    <vue-highcharts
      type="chart"
      class="k-high-chart"
      :options="chartOptions"
      :redrawOnUpdate="true"
      :oneToOneUpdate="false"
      :animateOnUpdate="true"
      @rendered="onRender"
      @update="onUpdate"
      @destroy="onDestroy"
    />
  </div>
</template>

<script>
import VueHighcharts from "vue3-highcharts";

// import { ref } from "vue";
export default {
  name: "MyChart",
  components: {
    VueHighcharts,
  },
  data() {
    var categories = ["Apples", "Oranges"];
    var colors = ["#2E3A59", "#8F9BB3"];

    return {
      chartOptions: {
        chart: {
          type: "bar",
        },
        colors: colors,
        title: {
          text: "",
          style: {
            display: "none",
          },
        },
        tooltip: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        xAxis: [
          {
            categories: categories,
          },
          {
            // lineColor: "#000",
            lineWidth: 0.5,
            // tickWidth: 0.5,
            // tickLength: 3,
          },
          // {
          //   // mirror axis on right side
          //   opposite: false,
          //   reversed: false,
          //   categories: categories,
          //   linkedTo: 0,
          //   labels: {
          //     enabled: false,
          //   },
          // },
        ],
        yAxis: {
          // lineColor: "#000",
          lineWidth: 0,
          // tickWidth: 0.5,
          // tickLength: 3,
          // tickColor: "#000",
          gridLineWidth: 0,
          min: 0,
          // lineWidth: 0,
          // gridLineWidth: 0,
          // title: {
          //   text: "Total fruit consumption",
          //   enabled: false,
          // },
          // accessibility: {
          //   description: "",
          //   enabled: false,
          // },
          // legend: {
          //   reversed: true,
          //   enabled: false,
          // },
          labels: { enabled: false },
        },
        legend: {
          reversed: true,
          enabled: false,
        },
        plotOptions: {
          bar: {
            stacking: "percent",
            groupPadding: 0.1,
            pointPadding: 0,
          },
          column: {
            groupPadding: 0.1,
            pointPadding: 5,
          },
          scatter: {
            marker: {
              symbol: "circle",
            },
          },
          series: {
            shadow: false,
            stacking: "normal",
            pointPadding: 0.1,
            groupPadding: 0.1,
          },
          dataLabels: {
            enabled: false,
          },

          // series: {
          //   stacking: "normal",
          //   // pointWidth: 30,
          // },
        },
        series: [
          {
            name: "John",
            data: [5, 3],
          },
          {
            name: "Jane",
            data: [2, 2],
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.vue-highcharts {
  width: 100%;
  height: 150px;
  // margin: 0 -12px;
  .highcharts-xaxis-labels,
  .highcharts-axis-labels {
    display: none !important;
  }
}
.highcharts-xaxis-labels,
.highcharts-axis-labels {
  display: none !important;
}
</style>
