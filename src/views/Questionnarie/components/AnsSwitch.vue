<template>
  <div>
    <div class="k_form_group d-flex k_toggle">
      <label id="toggle-label" class="toggle_label m-r-12">No</label>
      <Toggle v-model="answer" @change="updateAnswer" />
      <label id="toggle-label" class="toggle_label m-l-12">Yes</label>
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  emits: ["getUserSelected"],

  props: {
    currentAns: {
      type: Array,
      required: true,
    },
  },
  components: {
    Toggle,
  },
  data() {
    return {
      answer: undefined,
      tempAns: "",
      isFieldValid: true,
    };
  },

  unmounted() {
    this.isFieldValid = false;
    if (this.tempAns != "") {
      this.emitData(this.tempAns);
    } else {
      this.emitData(this.tempAns);
    }
  },

  created() {
    // if ans is given set the ans value
    if (this.currentAns != "") {
      if (this.currentAns === "yes") {
        this.answer = true;
        this.tempAns = this.changeAns(this.answer);
      } else {
        this.answer = false;
        this.tempAns = this.changeAns(this.answer);
      }
      this.isFieldValid = true;
      this.emitData(this.tempAns);
    }
  },

  //  all the variables declare here that are need validation and its type

  validations() {
    return {
      ansValue: { required },
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

    updateAnswer() {
      this.v$.$touch();
      this.isFieldValid = true;

      this.changeAns(this.answer.toString());
      this.tempAns = this.changeAns(this.answer);
      this.emitData(this.tempAns);
    },

    // send the data to Question Component
    emitData(val) {
      this.$emit("getUserSelected", {
        ansData: val,
        isFieldValid: this.isFieldValid,
      });
    },

    // convert string value to boolean value
    changeAns(value) {
      return {
        true: "yes",
        false: "no",
      }[value];
    },
  },
};
</script>

<style lang="scss" scoped></style>
