<template>
  <div class="row g-0">
    <div class="col lg-6 m-r-20 m-b-20">
      <div class="bg-white zp-10">
        <div class="zp-10">
          <div class="description_wrapper">
            <h4 class="m-b-0 desc_title">
              {{ $t("category_details.overiewTab.Description") }}
            </h4>
          </div>
          <p class="desc_content">
            <span
              class=""
              v-html="questionnaireDetails.long_description"
            ></span>
          </p>
        </div>
      </div>
    </div>
    <div class="col lg-6 m-b-20">
      <div class="status_wrapper bg-white zp-20">
        <div class="description_wrapper">
          <h4 class="m-b-0 desc_title">
            {{ $t("category_details.overiewTab.Own_Status") }}
          </h4>
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
              {{ category.name }}
              <span
                :class="{
                  bg_gray:
                    questionnaireDetails.questionnaire_status ==
                    $t('status.not_started'),
                  bg_warn:
                    questionnaireDetails.questionnaire_status ==
                    $t('status.in_progress'),
                  bg_success:
                    questionnaireDetails.questionnaire_status ==
                    $t('status.completed'),
                }"
                class="bg_gray rounded-pill"
                >{{ questionnaireDetails.questionnaire_status }}</span
              >
            </li>
          </ul>
        </div>
        <div class="description_wrapper">
          <h4 class="m-b-0 desc_title">
            {{ $t("category_details.overiewTab.Status") }}
          </h4>
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
              {{ $t("category_details.overiewTab.Invited_People") }}
              <span class="text-warn">{{
                questionnaireDetails.invited_people
              }}</span>
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
              {{ $t("category_details.overiewTab.Completed_Surveys") }}
              <span class="text-green"
                >{{ questionnaireDetails.completed_servey }}/{{
                  questionnaireDetails.invited_people
                }}</span
              >
            </li>
          </ul>
        </div>
        <!-- donut chart  -->
        <div class="donut_chart_wrap">
          <DonutChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import DonutChart from "../../components/Shared/DonutChart.vue";
export default {
  components: {
    DonutChart,
  },
  data() {
    return {
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      authToken: "",
      categoryID: "",
      departmentId: "",
      isInvalidUser: true,
      isQuestionnireExpired: undefined,
    };
  },

  computed: {
    ...mapGetters({
      questionnaireDetails: "questionnaireDetails",
      category: "questionnaireCategoryDetails",
    }),
  },
  created() {
    this.departmentId = this.$route.params.did;
    this.categoryID = this.$route.params.id;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.list_group_item {
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
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
  height: 322px;
  margin-bottom: 0;
}
</style>
