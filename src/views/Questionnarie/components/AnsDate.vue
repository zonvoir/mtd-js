<template>
  <div class="k_date_picker m-b-15 k_inp_half">
    <Datepicker
      class="ans_date_picker"
      :enableTimePicker="false"
      v-model="ansValue"
      @open="clearDate"
      @closed="updateDate"
      placeholder="mm/dd/yyyy"
      @blur="v$.ansValue.$touch"
      :class="{
        invalid_error: v$.ansValue.$error,
      }"
    />
    <div v-if="v$.ansValue.$error" class="invalid_feedback text-left">
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
  emits: ["getUserSelected"],

  props: {
    currentAns: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      ansValue: "",
      calcDate: "",
      isFieldValid: false,
    };
  },
  components: {
    Datepicker,
  },
  created() {
    console.log(this.currentAns);
    if (this.currentAns != "") {
      this.isFieldValid = true;
      let parts = this.currentAns.split("/");
      let date = new Date(parts[2], parts[1] - 1, parts[0]);
      this.ansValue = date;
      this.emitData(this.currentAns);
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
    clearDate() {
      this.ansValue = "";
    },
    updateDate() {
      this.checkValidation();
      this.formatMyDate(this.ansValue);
    },
    formatMyDate(value) {
      let tempDate = new Date(value);
      let date = tempDate.getDate();
      let year = tempDate.getFullYear();
      let month = tempDate.getMonth() + 1;
      if (isNaN(date) && isNaN(month) && isNaN(year)) {
        this.calcDate = "";
      } else {
        this.calcDate = date + "/" + month + "/" + year;
      }
      this.emitData(this.calcDate);
      // this.ansValue = this.calcDate;
      console.log("date", this.ansValue);
    },
    checkValidation() {
      this.v$.$touch();
      this.isFieldValid = false;
      console.log(this.v$.$invalid);
      if (!this.v$.$invalid) {
        this.isFieldValid = true;
      }
      console.log("validation successful", this.isFieldValid);
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
<style lang="scss" scoped>
.ans_date_picker {
  .dp__input {
    text-align: left !important;
    padding: auto !important;
  }
}
.invalid_error {
  &:focus {
    outline: 2px solid #db2c66 !important;
    outline-offset: 0px;
  }
}
</style>
