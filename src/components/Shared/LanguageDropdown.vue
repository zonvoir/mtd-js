<template>
  <div class="language_wrap">
    <Dropdown
      v-model="selectedLanguage"
      :options="laguage"
      optionLabel="label"
      class="language_dropdown"
      placeholder="Select a company"
    >
      <template #value="slotProps">
        <div class="company-item company-item-value" v-if="slotProps.value">
          <span class="company_item_name m-r-6">{{
            slotProps.value.label
          }}</span>
          <img
            v-if="slotProps.value.icon"
            class="img_logo"
            :src="slotProps.value.icon"
          />
        </div>
      </template>
      <template #option="slotProps">
        <div class="company-item">
          <span class="company_item_name m-r-3">{{
            slotProps.option.label
          }}</span>
          <img
            v-if="slotProps.option.icon"
            class="img_logo"
            :src="slotProps.option.icon"
          />
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";

export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      selectedLanguage: { value: "1", label: "En", icon: "K_Icons/flag1.svg" },

      laguage: [
        { value: "1", label: "En", icon: "ukflag.png" },
        { value: "2", label: "Ge", icon: "K_Icons/flag1.svg" },
      ],
    };
  },

  methods: {
    onChangeLanguage() {
      console.loog("selected language", this.selectedLanguage);
    },
  },
};
</script>

<style lang="scss" scoped>
.language_wrap {
  position: absolute;
  top: 0;
  right: 0;
}
.img_logo {
  margin-left: auto;
}
.language_dropdown {
  .img_logo {
    width: 22px;
  }
}
</style>
