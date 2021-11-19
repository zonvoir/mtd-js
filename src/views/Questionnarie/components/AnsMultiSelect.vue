<template>
  <div>
    <div class="k_form_group k_inp_half k_select_single">
      <label for="" class="form-label">Select Multiple</label>

      <Multiselect
        placeholder="Department"
        mode="tags"
        :closeOnSelect="false"
        :searchable="true"
        :createTag="true"
        class="form-control k_inp_field"
        rules="required"
        :options="departmentLists"
      />
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      departmentLists: [
        { value: 0, label: "Level 1" },
        { value: 1, label: "Level 2" },
        { value: 2, label: "Level 3" },
        { value: 3, label: "Level 4" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
