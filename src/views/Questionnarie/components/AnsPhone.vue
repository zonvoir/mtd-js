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
    this.ansValue =
      phoneNumberMask("", this.default_seprator) == 0
        ? ""
        : phoneNumberMask("", this.default_seprator);
    // this.ansValue = phoneNumberMask("", " ");
    if (this.currentAns != "") {
      this.isFieldValid = true;
      this.ansValue = this.currentAns;
      this.emitData(this.ansValue);
    }
  },

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
      v$: useVuelidate(),
    };
  },

  updated() {
    // this.ansValue = this.formatedData;
  },

  methods: {
    // onInput(event) {
    //   this.v$.$touch();
    //   this.isFieldValid = false;

    //   let val;
    //   if (!this.v$.$invalid) {
    //     val = event.target.value;
    //     this.isFieldValid = true;
    //   }

    //   this.emitData(val);
    // },
    // emitData(val) {
    //   this.$emit("getUserSelected", {
    //     ansData: val,
    //     isFieldValid: this.isFieldValid,
    //   });
    // },
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
    emitData(val) {
      this.$emit("getUserSelected", {
        ansData: val,
        isFieldValid: this.isFieldValid,
      });
    },
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
      console.log("dello2");
    },
    // numberKeyUp() {
    //   console.log("dello");
    // },
    isNumber(evt) {
      console.log(evt, "kk");
      if (this.tabBackDel.includes(evt.keyCode)) {
        console.log("going to delete the code", evt.target.value);
        this.onInput(evt.target.value);
      }
      // evt = evt ? evt : window.event;
      // var charCode = evt.which ? evt.which : evt.keyCode;
      // if (
      //   charCode > 31 &&
      //   (charCode < 48 || charCode > 57) &&
      //   charCode !== 46
      // ) {
      //   evt.preventDefault();
      // } else {
      //   this.formatedData = phoneNumberMask(
      //     maskRemover(evt.target.value, " "),
      //     " "
      //   );
      //   console.log("fromated phone number", this.formatedData);
      //   this.ansValue = this.formatedData;
      //   return true;
      // }

      // let char = String.fromCharCode(evt.keyCode);
      let char = evt.key;
      if (this.numberPattern.test(char)) {
        // if (this.numbersArr.includes(char)) {
        this.formatedData = phoneNumberMask(
          maskRemover(evt.target.value, this.default_seprator),
          this.default_seprator
        );
        console.log("fromated phone number", this.formatedData);
        this.onInput(this.ansValue);
        this.ansValue = this.formatedData;
        return true;
      } else evt.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped></style>
