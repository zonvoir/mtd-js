<template>
  <div class="hint_box">
    <!-- hint type is text -->
    <div class="textpart" v-if="hintType === 'text'" v-html="hint"></div>
    <!-- hint type is image -->
    <div class="imgpart" v-if="hintType === 'image'">
      <div class="img_part_wrap">
        <div
          :class="
            size_width > 640 && size_height > 480
              ? 'hint_img_big'
              : 'hint_img_small'
          "
        >
          <div class="fullview_img">
            <a
              class="view_button"
              data-toggle="tooltip"
              title="view in full size"
              target="_blank"
              :href="hint"
            >
              <div class="img_exp">
                <img
                  class="img_fhv"
                  src="../../../assets/images/icons/expand.svg"
                  alt=""
                />
              </div>
            </a>
          </div>
          <img
            :class="
              size_width > 640 && size_height > 480
                ? 'img_width'
                : 'img_width_small'
            "
            :src="hint"
          />
        </div>
      </div>
    </div>
    <!-- hint type image end -->
    <!-- hint type is video -->
    <div class="" v-if="hintType === 'video'">
      <div class="text-center">
        <video style="width: 35.5rem" controls>
          <source :src="hint" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <!-- hint type is video close -->

    <!-- hint type is pdf -->
    <div v-if="hintType === 'pdf'" class="">
      <div class="text-center">
        <iframe :src="hint" style="width: 43rem" height="500" width=""></iframe>
      </div>
    </div>
    <!-- hint type is pdf closed -->
  </div>
</template>

<script>
export default {
  props: {
    hint: {
      type: String,
    },
    hintType: {
      type: String,
    },
    size_width: {
      type: Number,
      default: 0,
    },
    size_height: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.imgpart {
  text-align: center;
  .img_part_wrap {
    position: relative;
  }
  .hint_img_big {
    cursor: pointer;

    &:hover {
      .fullview_img {
        opacity: 1;
        transition: 0.5s linear opacity;
      }
    }
  }
  .hint_img_small {
    &:hover {
      .fullview_img {
        opacity: 0;
      }
    }
  }
}

.hint_img_small {
  cursor: pointer;
}

.img_exp {
  background-color: #ead2ff;
  padding: 4px;
  border-radius: 4px;
  .img_fhv {
    width: 24px;
    height: 24px;
  }
}

.fullview_img {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
}
.img_width {
  // width: 100%;
  width: 640px;
  height: 480px;
}
.img_width_small {
  width: auto;
}
.hint_box {
  margin: 5px 10px;
  background: #ffffff;
  padding: 20px 25px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
}
</style>
