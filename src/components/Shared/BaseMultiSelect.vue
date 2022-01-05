<template>
  <!-- https://codesandbox.io/s/custom-vuejs-select-component-8nqgd?file=/App.vue:91-231 -->
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div v-for="(option, i) of options" :key="i">
        <div
          @click="
            selected = option;
            open = false;
            $emit('input', option);
          "
          class="check_box_wrapper"
        >
          <label class="k_checkbox check_lable">
            {{ option.name }}
            <input type="checkbox" v-model="option.value" checked="checked" />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default,
      // ? this.default
      // : this.options.length > 0
      // ? this.options[0]
      // : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
    console.log("options array", this.selected, this.options);
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 40px;
}

.custom-select .selected {
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e4e9f2;
  color: #0a0a0a;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #7900d8;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #222b45 transparent transparent transparent;
}

.custom-select .items {
  color: #ffffff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #7900d8;
  border-left: 1px solid #7900d8;
  border-bottom: 1px solid #7900d8;
  position: absolute;
  /* padding: 5px 0; */
  /* margin: 10px 0; */
  background-color: #fff;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  cursor: pointer;
  user-select: none;
  color: #ffffff;
  padding: 5px 0 5px 10px;
}

.custom-select .items div:hover {
  background-color: #7900d8;
  color: #fff !important;
}

.selectHide {
  display: none;
}
</style>
