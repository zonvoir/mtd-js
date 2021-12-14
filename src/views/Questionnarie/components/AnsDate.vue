<template>
  <div class="k_date_picker k_inp_half">
    <Datepicker
      class=""
      v-model="date"
      @update="onInput"
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
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
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
      date: new Date(),
      isFieldValid: undefined,
    };
  },
  components: {
    Datepicker,
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
