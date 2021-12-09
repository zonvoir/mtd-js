<template>
  <div class="hint_box">
    <div class="" v-if="hintType == 'text'" v-html="hint"></div>
    <div class="" v-if="hintType == 'image'">
      <img :src="hint" />
    </div>

    <div class="" v-if="hintType == 'video'">
      <div class="text-center">
        <video height="180" width="305" controls>
          <source :src="hint" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <div v-if="hintType == 'pdf'" class="">
      <div class="">
        <iframe :src="hint" width="100%" height="230"></iframe>
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
  height: 260px;
}
</style>
