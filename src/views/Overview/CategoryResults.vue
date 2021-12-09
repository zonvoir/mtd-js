<template>
  <div class="team_wrapper m-b-20">
    <div class="m-b-14">
      <h4 class="m-b-0 title-dark">
        {{ $t("category_details.resultsTab.Score") }}
      </h4>
    </div>
    <div class="score_wrapper">
      <div class="custom_grid">
        <div class="custom_grid_col bg-yellow">
          <div class="k_grid">
            <h6 class="m-b-0 tabb_title">
              {{ $t("category_details.resultsTab.My_score") }}
            </h6>
            <h1 class="m-b-0 tabb_val">10.3</h1>
          </div>
        </div>
        <div class="custom_grid_col bg_success">
          <div class="k_grid">
            <h6 class="m-b-0 tabb_title">
              {{ $t("category_details.resultsTab.Team_score") }}
            </h6>
            <h1 class="m-b-0 tabb_val">10.3</h1>
          </div>
        </div>
        <div class="custom_grid_col">
          <div class="k_grid bg-danger">
            <h6 class="m-b-0 tabb_title">
              {{ $t("category_details.resultsTab.Peer_score") }}
            </h6>
            <h1 class="m-b-0 tabb_val">10.3</h1>
          </div>
        </div>
      </div>
    </div>
    <!-- scatterd chart  -->
    <div class="scatterd_chart_wrap">
      <ScatterdChart />
    </div>
    <!-- donut chart  -->
    <div class="donut_chart_wrap">
      <DonutChart />
    </div>
  </div>
</template>

<script>
import ScatterdChart from "../../components/Shared/ScatterdChart.vue";
import DonutChart from "../../components/Shared/DonutChart.vue";
import QuestionnaireService from "../../Services/QuestionnaireServices/Questionnaire";

export default {
  components: {
    ScatterdChart,
    DonutChart,
  },
  data() {
    return {};
  },
  mounted() {
    this.url_dataID = this.$route.params.id;
    if (this.url_dataID) {
      this.getDeptAndCategoryDetails(this.url_dataID);
    }
  },
  methods: {
    getDeptAndCategoryDetails() {
      // departmemntID, categoryID, staffID

      QuestionnaireService.getOneCategory(5, 3, 37).then((res) => {
        if (res.data.status) {
          console.log(res.data.data);
        } else {
          console.log("no department list found");
          // let $th = this;
          // Object.keys(res.data.error).map(function (key) {
          //   $th.$toast.error(res.data.error[key], {
          //     position: "bottom-left",
          //     duration: 3712,
          //   });
          // });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.k_grid {
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.2);
  border-radius: 4px;
  width: 222px;
  height: 100px;
  text-align: center;
  text-transform: capitalize;
  padding: 14px;
  .tabb_title {
    font-size: 15px;
    font-weight: 600;
    color: #222b45;
    padding-bottom: 16px;
  }
  .tabb_val {
    font-size: 22px;
    font-weight: 600;
    color: #222b45;
  }
}
.custom_grid_col {
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
}
.team_wrapper {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 24px 30px;
}
</style>
