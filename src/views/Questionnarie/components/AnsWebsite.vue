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
        <span v-if="v$.ansValue.url.$invalid" class="text-left fs-14">
          Answer must be an url
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, url } from "@vuelidate/validators";
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
      tempVal: "",
      isFieldValid: false,
    };
  },
  created() {
    if (this.currentAns != "") {
      this.ansValue = this.currentAns;
      this.isFieldValid = true;
      this.emitData(this.ansValue);
    }
  },
  validations() {
    return {
      ansValue: { required, url },
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
      // if (this.v$.$invalid) {
      //   return;
      // } else {
      //   this.isFieldValid = true;
      // }
      // this.tempVal = event.target.value;
      // this.emitData(this.tempVal);
    },
    emitData(val) {
      this.$emit("getUserSelected", {
        ansData: val,
        isFieldValid: this.isFieldValid,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
