<template>
  <div class="hint_box">
    <div class="" v-html="value"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:
        "this article we’ll show you how to easily set-up dynamic forms with custom validation using Storyblok, Vuelidate and TailwindCSS.",
    };
  },
};
</script>

<style lang="scss" scoped>
.hint_box {
  background: #ffffff;
  padding: 20px 25px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  height: 300px;
}
</style>
