<template>
  <div>
    <div class="k_form_group k_inp_half">
      <input
        type="text"
        name="input"
        class="form-control k_inp_field"
        v-model="ansValue"
        @input="onInput"
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
      isFieldValid: undefined,
    };
  },
  created() {
    this.ansValue = new Date();
    if (this.currentAns != "") {
      this.ansValue = this.currentAns;
    }
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
      console.log("close date picker");
      this.v$.$touch();
      this.isFieldValid = false;
      console.log(this.v$.$invalid);
      if (this.v$.$invalid) {
        console.log(event.target.value);
      } else {
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
