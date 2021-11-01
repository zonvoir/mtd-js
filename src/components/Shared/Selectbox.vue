<template>
  <div @click="openSelect" class="selectBox">
    <div class="selectBox__value">Select Option</div>

    <div class="dropdown-menu">
      <a href="#" class="dropdown-item active">Kathmandu</a>
      <a href="#" class="dropdown-item">Biratnagar</a>
      <a href="#" class="dropdown-item">Pokhara</a>
      <a href="#" class="dropdown-item">Lumbini</a>
      <a href="#" class="dropdown-item">Chitwan</a>
      <a href="#" class="dropdown-item">Dharan</a>
      <a href="#" class="dropdown-item">Kathmandu</a>
      <a href="#" class="dropdown-item">Kathmandu</a>
      <a href="#" class="dropdown-item">Kathmandu</a>
      <a href="#" class="dropdown-item">Kathmandu</a>
      <a href="#" class="dropdown-item">Kathmandu</a>
      <a href="#" class="dropdown-item">Kathmandu</a>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  methods: {
    openSelect() {
      console.log("hello from ccheckbox");
    },
  },
};
</script>

<style lang="scss" scoped>
.selectBox {
  border: 1px solid #ccc;
  position: relative;
  padding: 12px 24px;
  cursor: pointer;
  &__value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  &:after {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: all 0.2s ease-in-out;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14.001' height='8.165' viewBox='0 0 14.001 8.165'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%23212121;%7D%3C/style%3E%3C/defs%3E%3Cpath class='a' d='M13.861,60.224l-.7-.7a.441.441,0,0,0-.645,0L7,65.036,1.487,59.522a.441.441,0,0,0-.645,0l-.7.7a.441.441,0,0,0,0,.645l6.537,6.538a.441.441,0,0,0,.645,0l6.538-6.538a.442.442,0,0,0,0-.645Z' transform='translate(0 -59.382)'/%3E%3C/svg%3E");
  }

  .dropdown-menu {
    transition: all 0.5s ease-in-out;
    opacity: 0;
    display: block;
    top: 100%;
    width: 100%;
    max-height: 250px;
    z-index: -1;
    overflow-y: auto;
    transform: translateY(-15%);
    visibility: hidden;
  }

  &.show {
    background-color: #fff;
    &:after {
      transform: translateY(-50%) rotate(180deg);
    }
    .dropdown-menu {
      transition: all 0.3s ease-in-out;

      // max-height: 300px;
      visibility: visible;

      opacity: 1;
      z-index: 1;

      transform: translateY(0);
    }
  }
}
</style>
