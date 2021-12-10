<template>
  <div>
    <div class="k_form_group k_inp_half">
      <!-- <label for="" class="form-label">Enter Project Name</label> -->
      <input
        type="text"
        v-model="ansValue"
        @input="onInput"
        name="input"
        class="form-control k_inp_field"
      />
      <!-- <div class="k_form_group">
         @input="$emit('update:modelValue', $event.target.value)
                  <input
                    type="text"
                    class="form-control k_inp_field"
                    placeholder="Company Name"
                    @blur="v$.companyForm.company.$touch"
                    v-model="companyForm.company"
                    :class="{
                      'is-invalid': v$.companyForm.company.$error,
                    }"
                  />
                  <div
                    v-if="v$.companyForm.company.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.companyForm.company.required.$invalid"
                      class="text-left fs-14"
                    >
                      Company is required
                    </span>
                  </div>
                </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentAns: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      ansValue: "",
    };
  },
  created() {
    this.ansValue = this.currentAns;
  },
  methods: {
    onInput(event) {
      this.$emit("getUserSelected", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
