<template>
  <div>
    <ul class="ulhr_wrap">
      <li class="hr_links" v-for="(tab, tabId) in tabs" :key="tabId">
        <a
          @click="activateTab(tab)"
          :class="url == tab.component_url ? 'activehr_tab' : ''"
          class="hr_link"
          >{{ $t(tab.tabTitle) }}</a
        >
      </li>
      <!-- <li class="hr_links">
        <a
          @click="activateTab(1)"
          :class="tabId == '1' ? 'activehr_tab' : ''"
          class="hr_link"
          to="/"
          >Members</a
        >
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: ["tabs"],
  data() {
    return {
      // tabsId: 0,
      url: "",
    };
  },
  mounted() {
    this.url = this.$route.path;
    // console.log("url ", this.url);
  },
  methods: {
    activateTab(tab) {
      // if (this.tabsId != tab.tabId) {
      //   this.tabsId = tab.tabId;
      // }
      this.$emit("changeTitle", tab.title);
      // console.log(this.$route.path);
      this.url = tab.component_url;
      this.$router.push({ path: tab.component_url });
    },
  },
};
</script>

<style lang="scss" scoped>
.ulhr_wrap {
  margin: 0;
  padding-left: 0;
  display: inline-flex;
  .hr_links {
    list-style: none;
    .hr_link {
      padding: 16px;
      text-decoration: none;
      color: #8f9bb3;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      width: 236px;
      height: 48px;
      display: inline-block;
      text-align: center;
      &:hover {
        text-decoration: none;
        color: #7900d8;
        // border-bottom: 4px solid #7900d8;
        border-radius: 1px;
      }
    }
    .activehr_tab {
      text-decoration: none;
      color: #7900d8;
      border-bottom: 4px solid #7900d8;
      border-radius: 1px;
    }
  }
}
</style>
