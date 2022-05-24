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
        <div class="search_wrap m-l-auto">
          <div class="psw_visibilty">
            <input
              type="text"
              v-model="word"
              @input="getSearchData"
              class="form-control _search_filter k_inp_field"
              :placeholder="$t('help_center.placeholder.search_here')"
            />

            <span class="search_btn">
              <button type="button" class="btn eye_btn btn-white">
                <img :src="searchIcon" class="search_icon" />
              </button>
            </span>
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
      <div ref="help_center_data" class="overview_container highlited_word">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
const tablist = [
  {
    tabId: 0,
    title: "help_center.Help_Center",
    tabTitle: "help_center.tab.Help_Center",
    component_url: "/help-center/video-faq",
  },
  {
    tabId: 1,
    title: "help_center.Glossary",
    tabTitle: "help_center.tab.Glossary",
    component_url: "/help-center/glossary",
  },
  {
    tabId: 3,
    title: "help_center.Report_a_Problem",
    tabTitle: "help_center.tab.Report_a_Problem",
    component_url: "/help-center/report-problem",
  },
];
import TabsHr from "../../components/Shared/TabsHr.vue";
import searchIcon from "../../../public/icons/search.svg";

export default {
  data() {
    return {
      tablist,
      word: "",
      allPageData: undefined,
      matchedData: undefined,
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

    getSearchData(ev) {
      console.log("data to be find", ev.target.value.toLowerCase());
      this.allPageData = this.$refs.help_center_data.textContent.toLowerCase();
      this.matchedData = this.allPageData.match(ev.target.value.toLowerCase());
      console.log("data heap", this.matchedData);
    },
  },
};
</script>

<style lang="scss" scoped>
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
