<template>
  <div>
    <apexchart
      width="150"
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
          height: 115,
          stacked: true,
          stackType: "50%",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },

        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "60%",
          },
        },
        stroke: {
          width: 0,
          colors: ["#fff"],
        },
        title: {
          text: undefined,
        },

        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            show: false,
          },
        },
        tooltip: {
          enabled: false,
          y: {
            formatter: function (val) {
              return val + "K";
            },
          },
        },
        fill: {
          opacity: 1,
        },

        colors: ["#E4E9F2", "#2E3A59"],
      },
      series: [
        {
          data: [44, 55],
        },
        {
          data: [53, 47],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
