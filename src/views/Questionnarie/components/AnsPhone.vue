<template>
  <div>
    <div class="k_form_group k_inp_half k_inp_number">
      <input
        type="text"
        name="single"
        v-model="ansValue"
        @keypress="isNumber"
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

        <span
          v-if="v$.ansValue.maxLengthValue.$invalid"
          class="text-left fs-14"
        >
          Phone Number must be 10 digit
        </span>
        <span
          v-if="v$.ansValue.minLengthValue.$invalid"
          class="text-left fs-14"
        >
          Phone Number atlest 10 digit
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";
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
      numberPattern: /[0-9]/,
      ansValue: "",
      isFieldValid: undefined,
    };
  },
  created() {
    this.ansValue = this.currentAns;
  },
  validations() {
    return {
      ansValue: {
        required,
        numeric,
        maxLengthValue: maxLength(13),
        minLengthValue: minLength(10),
      },
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
    isNumber(event) {
      let char = String.fromCharCode(event.keyCode);
      if (this.numberPattern.test(char)) return true;
      else event.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped></style>
