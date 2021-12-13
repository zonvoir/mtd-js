<template>
  <div>
    <div class="k_form_group k_inp_half k_inp_number">
      <input
        type="number"
        name="single"
        v-model="ansValue"
        @input="onInput"
        placeholder="Ex.1"
        class="form-control k_inp_field"
        @blur="v$.ansValue.$touch"
        :class="{
          'is-invalid': v$.ansValue.$error,
        }"
      />
      <div v-if="v$.ansValue.$error" class="invalid-feedback text-left">
        <span v-if="v$.ansValue.required.$invalid" class="text-left fs-14">
          Answer is required
        </span>
      </div>
      <!--  @input="$emit('update:modelValue', $event.target.value)" -->
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  props: {
    currentAns: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      ansValue: "",
    };
  },
  created() {
    this.ansValue = this.currentAns;
  },
  validations() {
    return {
      ansValue: { required },
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  methods: {
    onInput(event) {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.$emit("getUserSelected", event.target.value);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
