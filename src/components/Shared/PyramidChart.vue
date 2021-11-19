<template>
  <div>
    <apexchart
      width="300"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          height: 440,
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
        // gray and dark

        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "80%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
        },

        yaxis: {
          min: -5,
          max: 5,
          title: {},
          style: {
            fontSize: "12px",
            fontFamily: "Roboto",
            fontWeight: 400,
          },
        },
        axisBorder: {
          show: true,
          color: "#cccccc",
          height: 1,
          width: "100%",
          offsetX: 0,
          offsetY: 0,
        },
        tooltip: {
          shared: false,
          x: {
            formatter: function (val) {
              return val;
            },
          },
          y: {
            formatter: function (val) {
              return Math.abs(val) + "%";
            },
          },
        },
        title: {
          text: "Mauritius population pyramid 2011",
        },
        xaxis: {
          categories: ["5-9", "0-4"],
          title: {
            text: "Percent",
          },
          labels: {
            formatter: function (val) {
              return Math.abs(Math.round(val)) + "%";
            },
          },
        },
      },
      series: [
        {
          name: "Males",
          data: [0.4, 0.65],
        },
        {
          name: "Females",
          data: [-0.8, -1.05],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
