<template>
  <div>
    <div class="k_form_group k_inp_half k_inp_number">
      <input
        maxlength="20"
        type="text"
        name="single"
        v-model="ansValue"
        @keyup="isNumber"
        @keydown="numberKeyDown"
        placeholder="Ex.1"
        class="form-control k_inp_field"
        @blur="v$.ansValue.$touch"
        :class="{
          'is-invalid': v$.ansValue.$error,
        }"
      />
      <div v-if="v$.ansValue.$error" class="invalid-feedback text-left">
        <span v-if="v$.ansValue.required.$invalid" class="text-left fs-14">
          Answer is required
        </span>

        <span
          v-if="v$.ansValue.maxLengthValue.$invalid"
          class="text-left fs-14"
        >
          Phone Number can't be more than 13 digits
        </span>
        <span
          v-if="v$.ansValue.minLengthValue.$invalid"
          class="text-left fs-14"
        >
          Phone Number at least 10 digits
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { maxLength, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { phoneNumberMask } from "../../../utils/commonHelperFuntions";
import { maskRemover } from "../../../utils/mask-formmater";

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
      numberPattern: /[0-9]/,
      numbersArr: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      tabBackDel: [8, 9, 46],
      ansValue: "",
      formatedData: "",
      isFieldValid: false,
      default_seprator: " ",
    };
  },

  created() {
    // if ans is given set the ans value

    this.ansValue =
      // phoneNumberMask is helper funtion that are used for formatting number like 123 123 123
      phoneNumberMask("", this.default_seprator) == 0
        ? ""
        : phoneNumberMask("", this.default_seprator);
    if (this.currentAns != "") {
      this.isFieldValid = true;
      this.ansValue = this.currentAns;
      this.emitData(this.ansValue);
    }
  },

  //  all the variables declare here that are need validation and its type

  validations() {
    return {
      ansValue: {
        required,
        maxLengthValue: maxLength(17),
        minLengthValue: minLength(13),
      },
    };
  },

  setup() {
    return {
      // vuelidate variable decalaration

      v$: useVuelidate(),
    };
  },

  methods: {
    // get the value of user given ans and validate it
    onInput(value) {
      this.v$.$touch();
      this.isFieldValid = false;

      let val;
      if (!this.v$.$invalid) {
        val = value;
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

    // allow the keys which are going to press and restrict other

    numberKeyDown(evt) {
      let keysCodes = [
        ...this.numbersArr,
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];

      if (!keysCodes.includes(evt.key)) {
        evt.preventDefault();

        return false;
      }
    },

    // get the value of user given ans

    isNumber(evt) {
      if (this.tabBackDel.includes(evt.keyCode)) {
        this.onInput(evt.target.value);
      }

      let char = evt.key;
      if (this.numberPattern.test(char)) {
        this.formatedData = phoneNumberMask(
          // maskRemover function is to format number like 123123123
          maskRemover(evt.target.value, this.default_seprator),
          this.default_seprator
        );
        this.onInput(this.ansValue);
        this.ansValue = this.formatedData;
        return true;
      } else evt.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped></style>
