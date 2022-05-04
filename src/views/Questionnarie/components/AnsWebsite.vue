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
//^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$
//  regex 2 (https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})
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
    if (this.currentAns != "") {
      this.ansValue = this.currentAns;
      this.isFieldValid = true;
      this.emitData(this.ansValue);
    }
  },
  validations() {
    return {
      ansValue: { required, urlCase },
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
      let val;
      if (!this.v$.$invalid) {
        val = event.target.value;
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
  },
};
</script>

<style lang="scss" scoped></style>
