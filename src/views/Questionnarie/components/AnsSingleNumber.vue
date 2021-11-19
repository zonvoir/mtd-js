<template>
  <div>
    <div class="k_form_group k_inp_half k_inp_number">
      <label for="" class="form-label">Single Number</label>
      <input
        type="number"
        name="single"
        minlength="0"
        maxlength="1"
        placeholder="Ex.1"
        class="form-control k_inp_field"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: [""],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
