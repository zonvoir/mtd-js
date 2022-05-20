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
    if (this.currentAns != "") {
      this.isFieldValid = true;
      this.ansValue = this.currentAns;
      this.emitData(this.ansValue);
    }
  },

  methods: {
    onInput(event) {
      let dataI = "";
      if (event.target.value.includes(".")) {
        console.log("decimal is available", event.target.value);
        let dataValArr = event.target.value.split(".");
        let str_first = dataValArr[0];
        let str_last = dataValArr[1];
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
        if (event.target.value !== "") {
          dataI = event.target.value
            .replace(/ /g, "")
            .match(/.{1,3}/g)
            .join(" ");
        }
      }

      this.checkValidate(dataI);
    },
    checkValidate(ansParams) {
      this.ansValue = ansParams;
      this.ansValue ? (this.isValid = false) : (this.isValid = true);
      this.isFieldValid = true;
      if (this.isValid) {
        this.isFieldValid = !this.isFieldValid;
      }
      this.emitData(this.ansValue);
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
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
</style>
