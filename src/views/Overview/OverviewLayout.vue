<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div class="">
              <h4 class="view_title">{{ $t(title) }}</h4>
            </div>
          </div>
        </div>
        <div class="invite_btn_wrap m-l-auto">
          <button class="btn-primary btn k_btn_people">
            {{ $t("overview_index.buttons.invite_people") }}
          </button>
        </div>
      </div>
      <!-- tabs  -->
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
    title: "overview_index.Company",
    tabTitle: "overview_index.tab.company",
    component_url: "/overview/index",
  },
  {
    tabId: 1,
    title: "overview_index.Extended",
    tabTitle: "overview_index.tab.extended",
    component_url: "/overview/extended",
  },
];
import TabsHr from "../../components/Shared/TabsHr.vue";
export default {
  data() {
    return {
      tablist,
      dept: true,
      title: "Company",
    };
  },

  components: {
    TabsHr,
  },

  methods: {
    ChangeT(title) {
      this.title = title;
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
  text-transform: uppercase;
}
</style>
