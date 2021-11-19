<template>
  <!-- <div class="check_box_wrapper" :key="index" v-for="(option, index) in data">
      <label class="k_checkbox check_lable">
        {{ option.choice }}
        <input type="checkbox" v-model="option.value" checked="checked" />
        <span class="checkmark"></span>
      </label>
    </div> -->
  <div
    :key="index"
    v-for="(option, index) in data"
    class="check_box_wrapper m-b-28"
  >
    <label class="k_radio_btn check_lable"
      >{{ option.choice }}
      <input
        type="radio"
        v-model="option.value"
        checked="checked"
        name="radio"
      />
      <span class="radio_btn"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
