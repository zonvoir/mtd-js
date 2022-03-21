<template>
  <div>
    <div class="k_form_group k_inp_half">
      <input
        type="text"
        name="input"
        placeholder=""
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
  emits: ["emitData"],

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
    if (this.currentAns != "") {
      this.isFieldValid = true;
      this.ansValue = this.currentAns;
      this.emitData(this.ansValue);
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
      this.v$.$touch();
      this.isFieldValid = false;
      let val;
      if (!this.v$.$invalid) {
        val = event.target.value;
        this.isFieldValid = true;
      }

      this.emitData(val);
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
