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
          <div class="border-bottom-1 m-b-10">
            <p class="desc_content">
              <span
                class=""
                v-html="questionnaireDetails.long_description"
              ></span>
            </p>
          </div>
        </div>

        <div class="bottom_section_wrapper zp-10">
          <h4 class="desc_title m-b-18">
            {{ $t("category_details.overiewTab.Questionnarie") }}
          </h4>
          <p class="text-gray text-14-400 m-b-33">
            {{ $t("category_details.overiewTab.Fill_all_the_KPI_questions") }}
            <!-- Fill all the KPI questions -->
          </p>
          <!-- {{ questionnaireDetails.expiration_date }} fill -->
          <div class="m-l-auto">
            <button
              :disabled="questionnaireDetails.is_accessible"
              @click="startQuestionnarie"
              class="btn-primary btn btn-set text-uppercase"
            >
              {{ $t("category_details.overiewTab.buttons.start") }}
            </button>
          </div>
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
              {{ $t("category_details.overiewTab.Completed_Surveys") }}
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
import { mapState } from "vuex";
import DonutChart from "../../components/Shared/DonutChart.vue";
import QuestionnaireService from "../../Services/QuestionnaireServices/Questionnaire";
export default {
  components: {
    DonutChart,
  },
  data() {
    return {
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      permissionStatus: Boolean,
      authToken: "",
      categoryID: "",
      departmentId: "",
    };
  },

  computed: {
    ...mapState({
      category: (state) => state.questionnaire,
      questionnaireDetails: (state) => state.questionnaireDetails,
    }),
  },
  mounted() {
    console.log("kuldip  Details", this.category, this.questionnaireDetails);
    this.departmentId = this.$route.params.did;
    this.categoryID = this.$route.params.id;
    this.authToken = this.staffData.auth_token;
    let data = {
      auth_token: this.authToken,
      department_id: this.departmentId,
      category_id: this.categoryID,
    };

    this.getDeptAndCategoryDetails(data);
  },
  methods: {
    getDeptAndCategoryDetails(data) {
      QuestionnaireService.getOneCategory(data).then((res) => {
        if (res.data.status) {
          this.permissionStatus =
            res.data.data.questionnaire.detail.is_accessible;
          console.log("questionlist", this.permissionStatus);
          this.$store.dispatch(
            "getQuestionnaire",
            res.data.data.category_details
          );
        } else {
          let $th = this;
          if ("error" in res.data) {
            Object.keys(res.data.error).map(function (key) {
              $th.$toast.error(res.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          } else {
            $th.$toast.error(res.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
            if (res.data.message === "Authentication token mismatch") {
              this.$router.push({ name: "signup-signin" });
            }
          }
        }
      });
    },
    // get categories lists
    // getDefaultDeptCategories(Dept_id) {
    //   CommonService.getAllCategories(Dept_id)
    //     .then((resp) => {
    //       if (resp.data.status) {
    //         this.categoryList = resp.data.data;
    //         console.log("latest category", this.categoryList);
    //       } else {
    //         console.log("no department list found");
    //         let $th = this;
    //         Object.keys(resp.data.error).map(function (key) {
    //           $th.$toast.error(resp.data.error[key], {
    //             position: "bottom-left",
    //             duration: 3712,
    //           });
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       console.log("");
    //     });
    // },
    startQuestionnarie() {
      this.$router.push({
        name: "questionnarie-test",
        params: {
          departmentid: this.departmentId,
          categoryId: this.categoryID,
        },
      });
    },
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
