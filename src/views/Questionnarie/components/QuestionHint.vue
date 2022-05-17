<template>
  <div class="hint_box">
    <div class="textpart" v-if="hintType === 'text'" v-html="hint"></div>
    <div class="imgpart" v-if="hintType === 'image'">
      <div class="img_part_wrap">
        <!-- <div class="hint_img_big">
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
          <img class="img_width" :src="hint" />
        </div> -->
        <!-- class="hint_img_small" -->
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
          <!-- class="img_width_small" -->
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

    <div class="" v-if="hintType === 'video'">
      <div class="text-center">
        <video style="width: 35.5rem" controls>
          <source :src="hint" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <div v-if="hintType === 'pdf'" class="">
      <div class="text-center">
        <iframe :src="hint" style="width: 43rem" height="500" width=""></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ["hint", "hintType"],
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
  // margin: 0 16%;
  .img_part_wrap {
    position: relative;
    // &:hover {
    //   .fullview_img {
    //     opacity: 1;
    //     transition: 0.5s linear opacity;
    //   }
    // }
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
        // transition: 0.5s linear opacity;
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
  // width: 100%;
  // height: 100%;
}
.hint_box {
  margin: 5px 10px;
  // position: relative;
  background: #ffffff;
  padding: 20px 25px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  // height: 260px;
}
</style>
