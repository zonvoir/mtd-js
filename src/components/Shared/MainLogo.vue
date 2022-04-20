<template>
  <div class="brand-logo-wrapper text-center">
    <img
      alt="More Than Digital"
      src="../../assets/images/MTGLogo.png"
      class="brand-logo-size"
    />
  </div>
  <div class="">
    <Language />
  </div>
</template>

<script>
import Language from "../Shared/LanguageDropdown.vue";
export default {
  components: {
    Language,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
