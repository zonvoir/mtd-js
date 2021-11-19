<template>
  <div>
    <!-- Category Start  -->
    <div class="d-flex align-items-center m-b-28">
      <div class="view_title_wrap pb-15">
        <div class="page_title_wrap">
          <div class="k_icon_wrap m-r-10">
            <img src="K_Icons/clipboard_60_logo.svg" class="" alt="" />
          </div>
          <div class="">
            <h4 class="view_title">{{ title }}</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- category ends -->
    <div class="">
      <Question />
    </div>
  </div>
</template>

<script>
import Question from "../Questionnarie/components/Question.vue";
export default {
  components: {
    Question,
  },
  data() {
    return {
      title: "KPI",
    };
  },
};
</script>

<style lang="scss" scoped>
.page_title_wrap {
  display: flex;
  align-items: center;
}
</style>
