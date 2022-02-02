<template>
  <div class="list-container">
    <div @click="selectOption(value)" class="list_wrap">
      <h3 class="m-b-0">Company Name</h3>
    </div>
    <div class="list_wrap">
      <h3 class="m-b-0">Company Name</h3>
    </div>
    <div class="list_wrap">
      <h3 class="m-b-0">Company Name</h3>
    </div>
  </div>
</template>

<script>
export default {
  //   props: {
  //     options: {
  //       type: Object,
  //       required: true,
  //     },
  //   },
  data() {
    return {};
  },
  methods: {
    selectOption(val) {
      let data = {
        value: val,
        onClose: true,
      };
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #d1d9e9;
}
.list_wrap {
  // border-radius: 5px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e3e5e9;
  h3 {
    padding: 10px 11px;
    font-weight: 400;
    line-height: 20px;
    font-size: 15px;
    text-transform: capitalize;
    color: #292b45;
  }
  &:hover {
    background-color: rgba(121, 0, 216, 0.1);
    cursor: pointer;
    h3 {
      color: #7900d8;
    }
  }
}
</style>
