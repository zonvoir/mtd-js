<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div class="">
              <h4 class="view_title">{{ title }}</h4>
            </div>
          </div>
        </div>
      </div>
      <!-- tabs start -->
      <div class="tabs_wrap m-b-18">
        <div class="">
          <TabsHr :tabs="tablist" @changeTitle="ChangeT($event)" />
        </div>
        <div class="invite_btn_wrap">
          <button class="btn-primary btn k_btnfs14_w700">INVITE MEMBERS</button>
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
    title: "Companies",
    tabTitle: "Company",
    component_name: "company-list",
  },
  {
    tabId: 1,
    title: "Members",
    tabTitle: "Members",
    component_name: "company-member",
  },
];
import TabsHr from "../../components/Shared/TabsHr.vue";
import searchIcon from "../../../public/icons/search.svg";

export default {
  data() {
    return {
      tablist,
      searchIcon,
      dept: true,
      title: "Help Center",
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
.tabs_wrap {
  display: flex;
  justify-content: space-between;
}
._search_filter {
  background: #ffffff;
  border-radius: 4px;
  width: 300px;
}
.search_btn {
  position: absolute;
  top: 0;
  right: 0;
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
