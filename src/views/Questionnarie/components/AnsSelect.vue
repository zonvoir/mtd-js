<template>
  <div class="k_form_group k_inp_half k_select_single">
    <Dropdown
      class="k_prime_inp_select"
      optionLabel="label"
      optionValue="value"
      placeholder="Select option"
      @change="updateAnswer"
      :options="dropdownArray"
      @blur="v$.ansValue.$touch"
      v-model="ansValue"
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
</template>

<script>
import { required } from "@vuelidate/validators";
import useValidator from "@vuelidate/core";
import Dropdown from "primevue/dropdown";
export default {
  emits: ["getUserSelected"],

  props: {
    data: {
      type: Array,
      required: true,
    },
    currentAns: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      ansValue: null,
      isFieldValid: false,
      dropdownArray: [],
      tempAns: [],
    };
  },

  components: {
    Dropdown,
  },

  setup() {
    return {
      // vuelidate variable decalaration
      v$: useValidator(),
    };
  },

  validations() {
    return {
      //  all the variables declare here that are need validation

      ansValue: { required },
    };
  },

  created() {
    // if ans is given set the ans value
    this.data.forEach((item) => {
      const element = {
        value: item.option_id,
        label: item.choices,
      };
      this.dropdownArray.push(element);
    });
    if (this.currentAns != "") {
      this.isFieldValid = true;
      this.ansValue = this.currentAns[0];
      this.emitData(this.ansValue);
    }
  },

  methods: {
    // get the value of user given ans and validate it

    updateAnswer() {
      this.v$.$touch();
      this.isFieldValid = false;
      if (!this.v$.$invalid) {
        (this.tempAns = []), (this.isFieldValid = true);
        this.tempAns.push(this.ansValue);
      }
      this.emitData(this.tempAns);
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
