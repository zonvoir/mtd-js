<template>
  <div class="row g-0">
    <div class="col lg-6 m-r-20 m-b-20">
      <div class="bg-white zp-10">
        <div class="zp-10">
          <div class="description_wrapper">
            <h4 class="m-b-0 desc_title">Description</h4>
          </div>
          <div class="border-bottom-1 m-b-10">
            <p class="desc_content">
              A Key Performance Indicator is a measurable value that
              demonstrates how effectively a company is achieving key business
              objectives. Organizations use KPIs at multiple levels to evaluate
              their success at reaching targets. High-level KPIs may focus on
              the overall performance of the business, while low-level KPIs may
              focus on processes in departments such as sales, marketing, HR,
              support and others.
            </p>
          </div>
        </div>
        <div class="bottom_section_wrapper zp-10">
          <h4 class="desc_title m-b-18">Questionnarie</h4>
          <p class="text-gray text-14-400 m-b-33">Fill all the KPI questions</p>
          <div class="m-l-auto">
            <button
              @click="startQuestionnarie"
              class="btn-primary btn btn-set text-uppercase"
            >
              start
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col lg-6 m-b-20">
      <div class="status_wrapper bg-white zp-20">
        <div class="description_wrapper">
          <h4 class="m-b-0 desc_title">Own Status</h4>
        </div>
        <div class="list_wrap m-b-20">
          <ul class="list-group">
            <li
              class="
                list_group_item
                d-flex
                justify-content-between
                align-items-center
                text-14-600 text-heading
              "
            >
              KPI
              <span class="bg_warn rounded-pill">in progress</span>
            </li>
          </ul>
        </div>
        <div class="description_wrapper">
          <h4 class="m-b-0 desc_title">Status</h4>
        </div>
        <div class="list_wrap m-b-20">
          <ul class="list-group">
            <li
              class="
                list_group_item
                d-flex
                justify-content-between
                align-items-center
                text-14-600 text-heading
                m-b-8
              "
            >
              Invited people
              <span class="text-warn">22</span>
            </li>
            <li
              class="
                list_group_item
                d-flex
                justify-content-between
                align-items-center
                text-14-600 text-heading
              "
            >
              Completed surveys
              <span class="text-green">22/22</span>
            </li>
          </ul>
        </div>
        <!-- donut chart  -->
        <div class="donut_chart_wrap text-center">
          <DonutChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DonutChart from "../../components/Shared/DonutChart.vue";

export default {
  components: {
    DonutChart,
  },
  methods: {
    startQuestionnarie() {
      this.$router.push({ name: "questionnarie-test" });
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.list_group_item {
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
  text-transform: capitalize;
  padding: 6px 8px 6px 14px;
}
.border-bottom-1 {
  border-bottom: 1px solid #e4e9f2;
}
.status_wrapper {
  height: 100%;
}
.bottom_section_wrapper {
  padding: 0 10px 0 20px;
}
.desc_title {
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  padding-bottom: 18px;
}
.desc_content {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #8f9bb3;
  height: 240px;
}
</style>
