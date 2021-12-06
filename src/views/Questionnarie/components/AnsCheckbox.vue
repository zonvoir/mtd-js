<template>
  <div class="">
    <div class="check_box_wrapper" :key="index" v-for="(option, index) in data">
      <label class="k_checkbox check_lable">
        {{ option.choices }}
        <input type="checkbox" v-model="option.option_id" checked="checked" />
        <span class="checkmark"></span>
      </label>
    </div>
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

<style lang="scss" scoped>
.check_box_wrapper {
  margin-bottom: 28px;
  &:lastchild() {
    margin-bottom: 0;
  }
}
</style>
