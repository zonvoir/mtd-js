<template>
  <div class="custom_dropdown" :tabindex="tabindex" @blur="open = false">
    <div class="option_list" :class="{ selectHide: !isOpen }">
      <slot name="options"></slot>

      <!-- <div
        class="list_option"
        v-for="(option, i) of options"
        :key="i"
        @click="selectOption(option)"
      >
        {{ option }}
      </div> -->
    </div>
  </div>
  <!-- <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: "",
      // isOpen: false,
    };
  },

  methods: {
    selectOption(option) {
      let open = false;
      this.$emit("myinput", { selectedOption: option, isOpended: open });
    },
  },
};
</script>

<style scoped lang="scss">
.custom_dropdown {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  line-height: 40px;
  background-color: #fff;
  .option_list {
    color: #222b45;
    border-radius: 0;
    overflow: hidden;
    border: 1px solid #d1d9e9;
    position: absolute;
    background-color: #fff;
    left: 0;
    right: 0;
    z-index: 1;
    &.selectHide {
      display: none;
    }
    .list_option {
      cursor: pointer;
      user-select: none;
      color: #222b45;
      padding: 0px 0 0px 10px;
      &:hover {
        background-color: #7900d8;
        color: #fff !important;
      }
    }
  }
}
</style>
