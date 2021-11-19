<template>
  <div>
    <div class="k_form_group k_toggle">
      <Toggle v-model="value1" />
      <label id="toggle-label" class="toggle_label m-l-12"
        >Stay signed in</label
      >
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";

export default {
  props: ["data"],
  components: {
    Toggle,
  },
  data() {
    return {
      value1: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>
