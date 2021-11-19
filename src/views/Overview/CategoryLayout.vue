<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <!-- <div v-if="dept" class="m-r-6">
              <button @click="backToMain" class="btn btn-transaprent">
                <img src="K_Icons/arrowhead-right.svg" alt="" />
              </button>
            </div> -->
            <div class="k_icon_wrap m-r-10">
              <img src="K_Icons/clipboard_60_logo.svg" class="" alt="" />
            </div>
            <div class="">
              <h4 class="view_title">{{ title }}</h4>
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
const tablist = [
  {
    tabId: 0,
    title: "KPI",
    tabTitle: "OVERVIEW",
    component_name: "category-overview",
  },
  {
    tabId: 1,
    title: "KPI",
    tabTitle: "QUESTIONS",
    component_name: "category-qustionlist",
  },
  {
    tabId: 3,
    title: "KPI",
    tabTitle: "RESULTS",
    component_name: "category-results",
  },
  {
    tabId: 4,
    title: "KPI",
    tabTitle: "TEAM MANAGEMENT",
    component_name: "category-team_management",
  },
];
import TabsHr from "../../components/Shared/TabsHr.vue";
export default {
  data() {
    return {
      tablist,
      dept: true,
      title: "KPI",
    };
  },
  components: {
    TabsHr,
  },
  methods: {
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
