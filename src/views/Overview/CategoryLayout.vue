<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div v-if="dept" class="m-r-6">
              <button @click="backToMain" class="btn btn-transaprent">
                <img src="K_Icons/arrowhead-right.svg" alt="" />
              </button>
            </div>
            <div class="k_icon_wrap m-r-10">
              <img
                :src="
                  category.image
                    ? category.image
                    : 'K_Icons/clipboard_60_logo.svg'
                "
                class="category_logo"
                alt=""
              />
            </div>
            <div class="">
              <h4 class="view_title">{{ category.name }}</h4>
            </div>
          </div>
        </div>
        <div class="invite_btn_wrap m-l-auto">
          <button class="btn-primary btn k_btn_people">INVITE PEOPLE</button>
        </div>
      </div>
      <!-- tabs start -->
      <div class="tabs_wrap m-b-18">
        <div class="">
          <TabsHr :tabs="tablist" @changeTitle="ChangeT($event)" />
        </div>
      </div>
      <!-- tabs end -->
      <div class="overview_container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TabsHr from "../../components/Shared/TabsHr.vue";
import QuestionnaireService from "../../Services/QuestionnaireServices/Questionnaire";

export default {
  data() {
    return {
      tablist: [],
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      dept: true,
      title: "KPI",
      url_dataID: "",
      authToken: "",
      categoryID: "",
      departmentId: "",
    };
  },
  computed: {
    ...mapState({
      category: (state) => state.questionnaire,
    }),
  },
  created() {
    this.tablist = [
      {
        tabId: 0,
        title: "KPI",
        tabTitle: "OVERVIEW",
        component_url: this.$router.resolve({
          name: "category-overview",
          params: this.$route.params,
        }).path,
      },
      {
        tabId: 1,
        title: "KPI",
        tabTitle: "QUESTIONS",
        component_url: this.$router.resolve({
          name: "category-qustionlist",
          params: this.$route.params,
        }).path,
      },
      {
        tabId: 3,
        title: "KPI",
        tabTitle: "RESULTS",
        component_url: this.$router.resolve({
          name: "category-results",
          params: this.$route.params,
        }).path,
      },
      {
        tabId: 4,
        title: "KPI",
        tabTitle: "TEAM MANAGEMENT",
        component_url: this.$router.resolve({
          name: "category-team_management",
          params: this.$route.params,
        }).path,
      },
    ];
  },
  mounted() {
    this.departmentId = this.$route.params.did;
    this.categoryID = this.$route.params.id;
    this.authToken = this.staffData.auth_token;
    if (this.departmentId && this.categoryID && this.authToken) {
      let data = {
        auth_token: this.authToken,
        department_id: this.departmentId,
        category_id: this.categoryID,
      };
      this.getDeptAndCategoryDetails(data);
    }
  },
  components: {
    TabsHr,
  },

  methods: {
    getDeptAndCategoryDetails(data) {
      QuestionnaireService.getOneCategory(data).then((res) => {
        if (res.data.status) {
          this.$store.dispatch(
            "getQuestionnaire",
            res.data.data.category_details
          );
          this.$store.dispatch(
            "getQuestionList",
            res.data.data.questionnaire.questions
          );
          // this.category = res.data.data.category_details;
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
    ChangeT(title) {
      this.title = title;
    },
    backToMain() {
      this.$router.push({ name: "overview-home" });
    },
  },
};
</script>

<style lang="scss" scoped>
.category_logo {
  width: 60px;
  height: 60px;
}
.border-bottom-1 {
  margin-top: 40px;
  border-bottom: 1px solid #e4e9f2;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
.k_btn_people {
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
}
</style>
