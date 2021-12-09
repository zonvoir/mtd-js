<template>
  <div>
    <div class="k_form_group k_inp_half k_inp_number">
      <!-- <label for="" class="form-label">Single Number</label> -->
      <input
        type="number"
        name="single"
        minlength="0"
        v-model="input"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Ex.1"
        class="form-control k_inp_field"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["data"],
  data() {
    return {
      ansValue: ref(""),
    };
  },
  setup() {
    const input = ref("");
    return { input };
  },
};
</script>

<style lang="scss" scoped></style>
