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
    </ul>
  </div>
</template>

<script>
export default {
  // props: "tabs"],
  props: {
    tabs: {
      type: Array,
    },
    activeTabUrl: {
      type: String,
    },
  },
  data() {
    return {
      url: "",
    };
  },

  watch: {
    activeTabUrl: function () {
      this.url = this.$route.path;
    },
  },

  mounted() {
    this.url = this.$route.path;
  },
  methods: {
    activateTab(tab) {
      this.$emit("changeTitle", tab.title);
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
      text-transform: uppercase;
      cursor: pointer;
      width: 236px;
      height: 48px;
      display: inline-block;
      text-align: center;
      &:hover {
        text-decoration: none;
        color: #7900d8;
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
