<template>
  <!--  -->
  <a
    class="text-secondary sidebar_link_wrap"
    :class="currentUrl == component_name ? 'active_side_link' : ''"
    @click="changeRoute(component_name)"
  >
    <div class="_link_icon_wrap">
      <div class="icon_container">
        <img :src="icon" alt="overview" />
      </div>
    </div>
    <div class="link_label_wrap">
      <h5 class="link_title">
        {{ $t(title) }}
      </h5>
    </div>
  </a>
</template>

<script>
export default {
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    component_name: {
      type: String,
      default: "",
    },
    currentUrl: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      tabId: 1,
    };
  },

  methods: {
    changeRoute(data) {
      console.log("data", data);
      this.$router.push({ name: data });
    },

    getRoutePath(val) {
      return val.split("/")[1];
    },
  },
};
</script>

<style lang="scss" scoped>
.active_side_link {
  background-color: #192038;
  text-decoration: none;
  padding: 16px 0 16px 20px;
}
</style>
