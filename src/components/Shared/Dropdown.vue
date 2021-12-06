<template>
  <div class="dropdown position-relative">
    <a href="#" @click.prevent="toggleDropdown" class="dropdown-toggle"
      >toggle menu</a
    >
    <div class="" :class="{ shown: state }">
      <ul class="drop_down_menu" v-show="state">
        <li><a class="drop_dowm_link active_drop_item">Profile</a></li>
        <li><a class="drop_dowm_link">Logout</a></li>
      </ul>
    </div>
    <!-- <transition/> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.state = !this.state;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.state = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },
};
</script>

<style lang="scss" scoped>
.shown {
  background: #cc5b5b;
  box-shadow: 10px 0px 25px rgba(178, 187, 211, 0.2);
  border-radius: 0px 0px 4px 4px;
  z-index: 9999;
  position: absolute;
  top: 60px;
  right: 30px;
  .drop_down_menu {
    margin: 0;
    padding-left: 0;
    padding: 10px;
  }
  li {
    background-color: #ffffff;
    padding: 15px 40px;
    border-radius: 4px;
    list-style: none;
    width: 120px;
    text-align: right;
    .drop_dowm_link {
      text-decoration: none;
      color: #8f9bb3;
    }
  }
  .active_drop_item {
    color: #7900d8 !important;
  }
}
</style>
