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
      isFieldValid: false,
    };
  },

  created() {
    // if ans is given set the ans value
    if (this.currentAns != "") {
      this.isFieldValid = true;
      this.ansValue = this.currentAns;
      this.emitData(this.ansValue);
    }
  },

  //  all the variables declare here that are need validation

  validations() {
    return {
      ansValue: { required, email },
    };
  },

  setup() {
    return {
      // vuelidate variable decalaration

      v$: useVuelidate(),
    };
  },

  methods: {
    // get the value of user given ans
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

    // send the data to Question Component
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
