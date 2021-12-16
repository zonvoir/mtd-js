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
        <span v-if="v$.ansValue.numeric.$invalid" class="text-left fs-14">
          Answer is required
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric } from "@vuelidate/validators";
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
      isFieldValid: false,
    };
  },
  created() {
    if (this.currentAns != "") {
      this.isFieldValid = true;
      this.ansValue = this.currentAns;
      this.emitData(this.ansValue);
    }
  },
  validations() {
    return {
      ansValue: { required, numeric },
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
      let val;
      if (!this.v$.$invalid) {
        val = event.target.value;
        this.isFieldValid = true;
      }

      this.emitData(val);
      // this.$emit("getUserSelected", {
      //   ansData: val,
      //   isFieldValid: this.isFieldValid,
      // });
    },
    emitData(val) {
      this.$emit("getUserSelected", {
        ansData: val,
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
