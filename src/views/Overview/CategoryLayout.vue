<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div v-if="dept" class="m-r-6">
              <!-- <button @click="backToMain" class="btn btn-transaprent"> -->
              <button @click="$router.back()" class="btn btn-transaprent">
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
              <h4 class="view_title_with_catgry">
                {{ questionnaireDetails.department_name }} /<span
                  class="catgry_name m-l-4"
                  >{{ category.name }}</span
                >
              </h4>
            </div>
          </div>
        </div>
        <div class="invite_btn_wrap m-l-auto" v-if="ownRole.can_invite">
          <InvitePeopleModal>
            <template v-slot:invite-button>
              {{ $t("company_profile.buttons.invite_members") }}
            </template>
          </InvitePeopleModal>
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
import { mapGetters } from "vuex";
import TabsHr from "../../components/Shared/TabsHr.vue";
import QuestionnaireService from "../../Services/QuestionnaireServices/Questionnaire";
import InvitePeopleModal from "../../components/Shared/InvitePeopleModal.vue";
import errorhandler from "../../utils/Error";
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
  components: {
    TabsHr,
    InvitePeopleModal,
  },
  computed: {
    ...mapGetters({
      questionnaireDetails: "questionnaireDetails",
      category: "questionnaire",
      ownRole: "roleInCompany",
    }),
  },
  created() {
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

  methods: {
    getDeptAndCategoryDetails(data) {
      console.log(this.category);
      this.$store.dispatch("SET_LOADING_STATUS", true);
      QuestionnaireService.getOneCategory(data).then((res) => {
        this.$store.dispatch("SET_LOADING_STATUS", false);
        if (res.data.status) {
          this.$store.dispatch(
            "GET_QUESTIONNAIRE",
            res.data.data.category_details
          );

          console.log(this.category);

          this.$store.dispatch(
            "GET_QUESTIONNAIRE_DETAILS",
            res.data.data.questionnaire.detail
          );
          this.$store.dispatch(
            "GET_QUESTIONLIST",
            res.data.data.questionnaire.questions
          );
        } else {
          errorhandler(res, this);
          this.$store.dispatch("GET_QUESTIONNAIRE", []);
          this.$store.dispatch("GET_QUESTIONNAIRE_DETAILS", []);
          this.$store.dispatch("GET_QUESTIONLIST", []);
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
.view_title_with_catgry {
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
  color: #7900d8;
  .catgry_name {
    color: #222b45;
  }
}
.category_logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
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
