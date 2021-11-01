<template>
  <div>
    <!-- <div class="row gap-0">
      <div class="col-lg-3"></div>
      <div class="col-lg-9"></div>
    </div> -->
    <h1 class="">Welcome to Dashboard</h1>
    <button @click="onLogout" class="btn k_btnfs14_w700 btn-primary">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  methods: {
    onLogout() {
      console.log("Logout successfully");
      localStorage.removeItem("bWFpbCI6Inpvb");
      this.$router.push({ name: "signup-signin" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
