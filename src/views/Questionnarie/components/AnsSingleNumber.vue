<template>
  <div>
    <div class="k_form_group k_inp_half k_inp_number">
      <input
        type="number"
        name="single"
        v-model="ansValue"
        @input="onInput"
        placeholder="Ex.1"
        class="form-control k_inp_field"
      />
      <!--  @input="$emit('update:modelValue', $event.target.value)" -->
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
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
