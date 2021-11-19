<template>
  <div>
    <div class="k_form_group k_inp_half k_inp_number">
      <label for="" class="form-label">Multiple Number</label>
      <input
        type="number"
        name="mutliple"
        placeholder="Ex.1122"
        class="form-control k_inp_field"
      />
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

<style lang="scss" scoped></style>
