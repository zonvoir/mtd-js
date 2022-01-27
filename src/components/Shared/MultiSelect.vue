<template>
  <div class="check_box_wrapper">
    <label class="k_checkbox check_lable">
      {{ label }}
      <input
        type="checkbox"
        :id="id"
        :value="modelValue"
        :checked="isChecked"
        @change="emitUncheck($event.target.checked)"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="checkmark"></span>
    </label>
  </div>
  <!-- <label>
    <p>{{ label }}</p>
    <input
      type="checkbox"
      :id="id"
      :value="modelValue"
      :checked="isChecked"
      @change="emitUncheck($event.target.checked)"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span class="checkmark"></span>
  </label> -->
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    modelValue: { type: String, default: "" },
    isChecked: Boolean,
    label: { type: String },
    value: { type: Array },
    id: { type: Number },
  },
  methods: {
    emitUncheck(event) {
      if (!event) {
        this.$emit("remove-selected-filter", this.id);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.check_box_wrapper {
  margin-bottom: 20px;
  &:last-child() {
    margin-bottom: 0 !important;
  }
}
.k_checkbox .checkmark {
  position: absolute;
  top: 0px;
  left: 16px;
  height: 20px;
  width: 20px;
  background-color: #ffffff;
  border-radius: 3px;
  outline: 1px solid #e4e9f2;
}
.check_lable {
  padding-left: 50px !important;
}
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
</style>
