<template>
  <div>
    <div class="k_form_group k_inp_half k_inp_number">
      <input
        @keydown="isNumber"
        @blur="blurEvent"
        @input="onInput"
        v-model="ansValue"
        type="text"
        name="single"
        placeholder="Ex.1"
        class="form-control k_inp_field"
      />

      <div v-if="isValid" class="custom_error">
        <span class="text-left fs-14"> Valid number is required </span>
      </div>
    </div>
  </div>
</template>

<script>
import numfractionMixin from "../../../mixins/numeric-fraction-numbers";

export default {
  emits: ["getUserSelected"],
  // external mixin code that used for input only number and decimal (.)

  mixins: [numfractionMixin],

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
      isValid: false,
      default_seprator: " ",
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

  methods: {
    // get the value of user given ans

    onInput(event) {
      let dataI = "";
      if (event.target.value.includes(".")) {
        console.log("decimal is available", event.target.value);
        let dataValArr = event.target.value.split(".");
        let str_first = dataValArr[0];
        let str_last = dataValArr[1];
        // with decimal format the number like 123 123.123
        let itermediatData =
          str_first
            .replace(/ /g, "")
            .match(/.{1,3}/g)
            .join(" ") +
          "." +
          (str_last.length > 3 ? "" : str_last);
        dataI = itermediatData;
      } else {
        console.log("no decimal", event.target.value);
        // without decimal format the number like 123 123 123
        if (event.target.value !== "") {
          dataI = event.target.value
            .replace(/ /g, "")
            .match(/.{1,3}/g)
            .join(" ");
        }
      }

      this.checkValidate(dataI);
    },

    // validation for user ans(value) is given or not
    checkValidate(ansParams) {
      this.ansValue = ansParams;
      this.ansValue ? (this.isValid = false) : (this.isValid = true);
      this.isFieldValid = true;
      if (this.isValid) {
        this.isFieldValid = !this.isFieldValid;
      }
      this.emitData(this.ansValue);
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

<style lang="scss" scoped>
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
</style>
