<template>
  <div>
    <div class="k_form_group k_inp_half">
      <!-- <label for="" class="form-label">Enter Project Name</label> -->
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
      isFieldValid: undefined,
    };
  },
  created() {
    this.ansValue = this.currentAns;
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
      this.isFieldValid = false;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
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
