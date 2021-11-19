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
const linksList = [
  {
    id: 1,
    title: "Overview",
    icon: "icons/layout.svg",
    component_name: "overview",
  },
  // {
  //   title: "Questions Quiz",
  //   icon: "icons/layout.svg",
  //   link: "/quiz",
  // },
  // {
  //   title: "Questions Overview",
  //   icon: "icons/layout.svg",
  //   link: "/overview/question-overview",
  // },
  {
    id: 2,
    title: "Results",
    icon: "icons/pie-chart.svg",
    component_name: "results",
  },
  {
    id: 3,
    title: "Projects",
    icon: "icons/book.svg",
    component_name: "projects",
  },
  {
    id: 4,
    title: "Company Profile",
    icon: "icons/camera.svg",
    component_name: "company",
  },
  {
    id: 5,
    title: "Payment",
    icon: "icons/Payment_icon.svg",
    component_name: "payments",
  },
  // {
  //   title: "Glossary",
  //   icon: "icons/book.svg",
  //   link: "/glossary",
  // },

  {
    id: 6,
    title: "Find Partner",
    icon: "icons/partners-icon.svg",
    component_name: "find-partner",
  },
  {
    id: 7,
    title: "Help Center",
    icon: "icons/question-mark-circle.svg",
    component_name: "help-center",
  },
  // {
  //   title: "Logout",
  //   icon: "icons/question-mark-circle.svg",
  //   link: "",
  // },
  // {
  //   title: "Settings",
  //   icon: "icons/settings-2.svg",
  //   link: "/settings",
  // },
  // {
  //   title: 'Twitter',
  //   caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev'
  // },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev'
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev'
  // }
];
import EssentialLink from "./EssentialLinks.vue";
// import logo from "../assets/images/mtd-logos-rgb_Main-Logo-Size-1-pos.png";
import logo from "../../assets/images/mtd-logos-rgb_Main-Logo-Size-1-pos.png";

export default {
  data() {
    return {
      logo,
      essentialLinks: linksList,
    };
  },
  components: {
    EssentialLink,
  },
};
</script>

<style lang="scss" scoped>
.menu_link {
  &:nth-last-child(2) {
    position: absolute;
    bottom: 56px;
    width: 100%;
  }
  &:last-child {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
