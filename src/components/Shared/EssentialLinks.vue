<template>
  <a
    class="text-secondary sidebar_link_wrap"
    @click="changeRoute(component_name)"
  >
    <div class="_link_icon_wrap">
      <div class="icon_container">
        <img :src="icon" alt="overview" />
      </div>
    </div>
    <div class="link_label_wrap">
      <h5 class="link_title">{{ title }}</h5>
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
      this.$router.push({ name: data });
      // if (this.tabId != id) {
      //   this.tabId = id;
      //   console.log(this.tabId);
      // }
    },
  },
};
</script>

<style lang="scss" scoped></style>
