<template>
  <div class="k_form_group k_inp_half k_select_single">
    <Multiselect
      placeholder="Please select"
      class="form-control k_inp_field"
      @select="updateAnswer"
      rules="required"
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
import Multiselect from "@vueform/multiselect";
import { required } from "@vuelidate/validators";
import useValidator from "@vuelidate/core";
export default {
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
    Multiselect,
  },
  setup() {
    return {
      v$: useValidator(),
    };
  },
  validations() {
    return {
      ansValue: { required },
    };
  },
  created() {
    // this.ansValue = this.currentAns;
    this.data.forEach((item) => {
      const element = {
        value: item.option_id,
        label: item.choices,
      };
      this.dropdownArray.push(element);
    });
    if (this.currentAns != "") {
      this.isFieldValid = true;
      this.ansValue = this.currentAns;
      this.emitData(this.ansValue);
    }
    // if (this.currentAns != "") {

    //   this.ansValue = this.currentAns;
    // }
  },
  methods: {
    updateAnswer() {
      this.v$.$touch();
      this.isFieldValid = false;
      if (!this.v$.$invalid) {
        this.isFieldValid = true;
        this.tempAns.push(this.ansValue);
      }
      this.emitData(this.tempAns);
      // this.$emit("getUserSelected", {
      //   ansData: this.tempAns,
      //   isFieldValid: this.isFieldValid,
      // });
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

<style lang="scss" scoped></style>
