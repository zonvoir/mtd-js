<template>
  <div>
    <div class="k_form_group k_inp_half">
      <input
        type="email"
        name="firstName"
        class="form-control k_inp_field"
        v-model="ansValue"
        @input="onInput"
        @blur="v$.ansValue.$touch"
        :class="{
          'is-invalid': v$.ansValue.$error,
        }"
      />
      <div v-if="v$.ansValue.$errors" class="invalid-feedback text-left">
        <span v-if="v$.ansValue.required.$invalid" class="text-left fs-14">
          Answer is required
        </span>
        <span class="text-left fs-14" v-if="v$.ansValue.email.$invalid">
          Answer must be email
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "@vuelidate/validators";
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
      isFieldValid: undefined,
    };
  },
  created() {
    this.ansValue = this.currentAns;
  },
  validations() {
    return {
      ansValue: { required, email },
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
      this.isFieldValid = false;
      if (!this.v$.$invalid) {
        this.isFieldValid = true;
      }
      this.$emit("getUserSelected", {
        ansData: event.target.value,
        isFieldValid: this.isFieldValid,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
