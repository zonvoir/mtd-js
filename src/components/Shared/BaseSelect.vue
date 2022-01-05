<template>
  <div class="select_one">
    <input
      :placeholder="placeholder"
      type="text"
      v-model="selected"
      :class="{ open: open }"
      class="k_inp_field form-control"
      @blur="open = false"
      @click="open = !open"
    />
    <div class="custom-select">
      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="$emit('input', option)"
        >
          {{ option }}
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
    placeholder: {
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
  created() {
    console.log("show me placeholder", this.placeholder);
  },
  methods: {
    selectOption(opt) {
      this.selected = opt;
      console.log("option", opt);
    },
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
  /* height: 47px; */
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
.select_one {
  position: relative;
}
.select_one:after {
  position: absolute;
  content: "";
  top: 18px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #222b45 transparent transparent transparent;
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
  color: #222b45;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #d1d9e9;
  border-left: 1px solid #d1d9e9;
  border-bottom: 1px solid #d1d9e9;
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
  color: #222b45;
  padding: 2px 0 2px 10px;
}

.custom-select .items div:hover {
  background-color: #7900d8;
  color: #fff !important;
}

.selectHide {
  display: none;
}
</style>
