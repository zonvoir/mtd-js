<template>
  <div
    v-if="isLoading"
    :style="{ width: wideLength + 'px' }"
    class="dot_loader_container"
  >
    <div class="loading-dots">
      <div
        class="loading-dots--dot"
        :style="{ backgroundColor: bgColor }"
      ></div>
      <div
        class="loading-dots--dot"
        :style="{ backgroundColor: bgColor }"
      ></div>
      <div
        class="loading-dots--dot"
        :style="{ backgroundColor: bgColor }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    wideLength: {
      type: Number,
    },
    bgColor: {
      type: String,
      default: "#ffffff",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// #loading {
//   -webkit-animation: rotation 0.8s infinite linear;
// }

.dot_loader_container {
  position: relative;
  background-color: inherit;
  height: 10px;
  z-index: 1055;
  overflow: hidden;
}

@keyframes dot-keyframes {
  0% {
    opacity: 0.4;
    transform: scale(1, 1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }

  100% {
    opacity: 0.4;
    transform: scale(1, 1);
  }
}

.loading-dots {
  text-align: center;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &--dot {
    animation: dot-keyframes-257ddca2 1.5s infinite ease-in-out;
    border-radius: 6px;
    display: inline-block;
    height: 6px;
    width: 6px;
    margin: 2px;
    &:nth-child(2) {
      animation-delay: 0.5s;
    }

    &:nth-child(3) {
      animation-delay: 1s;
    }
  }
}

.spiner_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom_spinner {
  width: 3rem;
}
</style>
