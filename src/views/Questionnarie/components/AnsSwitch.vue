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
  beforeUnmount() {
    console.log("i am from before unmunted");
  },
  unmounted() {
    console.log("i am from un mounted");
    this.isFieldValid = false;
    if (this.tempAns != "") {
      this.emitData(this.tempAns);
    } else {
      this.emitData(this.tempAns);
    }
  },
  created() {
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
    updateAnswer() {
      this.v$.$touch();
      this.isFieldValid = true;

      this.changeAns(this.answer.toString());
      this.tempAns = this.changeAns(this.answer);
      console.log("ans", this.tempAns);
      this.emitData(this.tempAns);
    },
    emitData(val) {
      this.$emit("getUserSelected", {
        ansData: val,
        isFieldValid: this.isFieldValid,
      });
    },
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
