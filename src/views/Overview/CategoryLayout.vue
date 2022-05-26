<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div v-if="dept" class="m-r-6">
              <button @click="goToPreviousPage" class="btn btn-transaprent">
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
        <div class="d-flex m-l-auto">
          <div class="invite_btn_wrap" v-if="ownRole.can_invite">
            <InvitePeopleModal>
              <template v-slot:invite-button>
                {{ $t("overview_index.buttons.invite_people") }}
              </template>
            </InvitePeopleModal>
          </div>
          <div class="m-l-8">
            <button
              @click="startQuestionnarie"
              class="btn-primary btn btn-set text-uppercase"
            >
              Start
            </button>
          </div>
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
  <QuestionnaireModal ref="questinnaire_comp" />
</template>

<script>
import { mapGetters } from "vuex";
import TabsHr from "../../components/Shared/TabsHr.vue";
import QuestionnaireModal from "../Questionnarie/QuestionnaireModal.vue";
import InvitePeopleModal from "../../components/Shared/InvitePeopleModal.vue";
export default {
  data() {
    return {
      componenentId: 0,
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
    QuestionnaireModal,
  },

  // get vue x getters variables
  computed: {
    ...mapGetters({
      questionnaireDetails: "questionnaireDetails",
      getQuestionList: "getQuestionList",
      category: "questionnaireCategoryDetails",
      ownRole: "roleInCompany",
      defaultDepartment: "defaultCompanyDeptId",
    }),
  },

  created() {
    // tab name and other details are send to tabsHr module

    this.tablist = [
      {
        tabId: 0,
        title: "KPI",
        tabTitle: "OVERVIEW",
        component_url: this.$router.resolve({
          // this line are used to send department and categories id
          name: "category-overview",
          params: this.$route.params,
        }).path,
      },
      {
        tabId: 1,
        title: "KPI",
        tabTitle: "QUESTIONS",
        component_url: this.$router.resolve({
          // this line are used to send department and categories id
          name: "category-qustionlist",
          params: this.$route.params,
        }).path,
      },
      {
        tabId: 3,
        title: "KPI",
        tabTitle: "RESULTS",
        component_url: this.$router.resolve({
          // this line are used to send department and categories id
          name: "category-results",
          params: this.$route.params,
        }).path,
      },
      {
        tabId: 4,
        title: "KPI",
        tabTitle: "TEAM MANAGEMENT",
        component_url: this.$router.resolve({
          // this line are used to send department and categories id
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
      this.$store.dispatch("GET_QUESTIONNAIRE_ALL_DATA", data); // get all questionnaire detail by using vuex action
    }
  },

  methods: {
    // to open the questionnaire modal via vuex actions
    startQuestionnarie() {
      this.$store.dispatch("GET_QUIZ_MODAL_STATUS", true);
    },

    // change the page title
    ChangeT(title) {
      this.title = title;
    },

    // to send the previous page
    goToPreviousPage() {
      if (
        this.$route.params.did === this.defaultDepartment &&
        this.$route.params.id
      ) {
        this.$router.push({ name: "overview-home" });
      } else {
        this.$router.push({
          name: "department-category",
          params: { did: this.departmentId },
        });
      }
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
    text-transform: capitalize;
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
