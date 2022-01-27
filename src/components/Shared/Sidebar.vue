<template>
  <!-- Left sidebar Start Here -->
  <div class="sidebar-wrapper sidebar_container">
    <!-- brand Logo Start Here -->
    <div class="sidebar_logo_wrapper">
      <router-link to="/" class="logo_wraper">
        <img alt="More Than Digital" :src="logo" class="brand_logo" />
      </router-link>
    </div>
    <!-- Brand Logo Ends Here -->
    <div class="link-list-wrapper">
      <EssentialLink
        class="menu_link"
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
      />
    </div>

    <!-- Left sidebar Ends Here -->
  </div>
</template>

<script>
import EssentialLink from "./EssentialLinks.vue";
import logo from "../../assets/images/mtd-logos-rgb_Main-Logo-Size-1-pos.png";

export default {
  data() {
    return {
      logo,
      essentialLinks: [
        {
          id: 1,
          title: "sidebar_links.overview",
          icon: "icons/layout.svg",
          component_name: "overview",
        },
        {
          id: 2,
          title: "sidebar_links.results",
          icon: "icons/pie-chart.svg",
          component_name: "results",
        },
        {
          id: 3,
          title: "sidebar_links.projects",
          icon: "icons/book.svg",
          component_name: "projects",
        },
        {
          id: 4,
          title: "sidebar_links.company_profile",
          icon: "icons/camera.svg",
          component_name: "company",
        },
        {
          id: 5,
          title: "sidebar_links.payment",
          icon: "icons/Payment_icon.svg",
          component_name: "payments",
        },
        {
          id: 6,
          title: "sidebar_links.find_partner",
          icon: "icons/partners-icon.svg",
          component_name: "find-partner",
        },
        {
          id: 7,
          title: "sidebar_links.help_center",
          icon: "icons/question-mark-circle.svg",
          component_name: "help-center",
        },
      ],
    };
  },
  components: {
    EssentialLink,
  },
  created() {
    console.log("vis", this.$i18n.t("personalAccount.personalAccount"));
  },
};
</script>

<style lang="scss" scoped>
.menu_link {
  &:nth-last-child(2) {
    position: absolute;
    // background-color: #04050a;
    bottom: 56px;
    width: 100%;
  }
  &:last-child {
    position: absolute;
    // background-color: #04050a;
    bottom: 0;
    width: 100%;
  }
}
</style>
