<template>
  <div>
    <div class="k_form_group k_inp_half">
      <input
        type="text"
        name="input"
        class="form-control k_inp_field"
        v-model="ansValue"
        @input="onInput"
        @blur="v$.ansValue.$touch"
        :class="{
          'is-invalid': v$.ansValue.$error,
        }"
      />
      <div v-if="v$.ansValue.$error" class="invalid-feedback text-left">
        <span v-if="v$.ansValue.required.$invalid" class="text-left fs-14">
          Answer is required
        </span>
        <span v-if="v$.ansValue.urlCase.$invalid" class="text-left fs-14">
          Answer must be an url
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
const urlCase = (val) =>
  !helpers.req(val) ||
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/.test(
    val
  );
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
      tempVal: "",
      isFieldValid: false,
    };
  },

  created() {
    // if ans is given set the ans value
    if (this.currentAns != "") {
      this.ansValue = this.currentAns;
      this.isFieldValid = true;
      this.emitData(this.ansValue);
    }
  },

  //  all the variables declare here that are need validation and its type

  validations() {
    return {
      ansValue: { required, urlCase },
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

    onInput(event) {
      this.v$.$touch();
      this.isFieldValid = false;
      let val;
      if (!this.v$.$invalid) {
        val = event.target.value;
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
  },
};
</script>

<style lang="scss" scoped></style>
