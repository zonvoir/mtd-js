<template>
  <div class="hint_box">
    <div class="textpart" v-if="hintType == 'text'" v-html="hint"></div>
    <div class="imgpart" v-if="hintType == 'image'">
      <img :src="hint" />
    </div>

    <div class="" v-if="hintType == 'video'">
      <div class="text-center">
        <video style="width: 42.5rem" controls>
          <source :src="hint" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <div v-if="hintType == 'pdf'" class="">
      <div class="">
        <iframe :src="hint" height="500" width=""></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hint", "hintType"],
};
</script>

<style lang="scss" scoped>
.hint_box {
  background: #ffffff;
  padding: 20px 25px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  // height: 260px;
}
</style>
