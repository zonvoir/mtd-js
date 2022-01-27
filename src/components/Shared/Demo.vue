<template>
  <div v-for="(item, index) in items" :key="index">
    <Checkbox
      :key="item.id"
      :label="item.name"
      :id="index"
      :isChecked="isChecked(index)"
      @remove-selected-filter="removeSelectedFilter"
      :modelValue="item.name"
      v-model="filter.filterCollection[index]"
    />
  </div>
  <div class="">
    <BaseDropdown :options="techs">
      <template v-slot:options> hello </template>
    </BaseDropdown>
  </div>
</template>

<script>
import Checkbox from "../Shared/MultiSelect.vue";
import BaseDropdown from "../Shared/BaseDropdown.vue";
export default {
  data() {
    return {
      techs: ["Java", "JSP", "Javascript"],
      items: [
        {
          id: 1,
          name: "Markerting",
        },
        {
          id: 2,
          name: "Legal",
        },
        {
          id: 3,
          name: "IT",
        },
      ],
      isOpen: false,
      filter: {
        filterCollection: [], // Object instead of array
      },
    };
  },
  components: {
    Checkbox,
    BaseDropdown,
  },
  methods: {
    removeSelectedFilter(index) {
      console.log("isRemoved", this.filter.filterCollection);

      delete this.filter.filterCollection[index];
    },
    isChecked(index) {
      console.log("isChecked", this.filter.filterCollection);
      return !!this.filter.filterCollection[index];
    },
  },
};
</script>

<style lang="scss" scoped></style>
