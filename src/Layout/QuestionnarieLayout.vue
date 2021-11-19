<template>
  <div>
    <div class="main_layout_container">
      <div class="main_layout_sidebar">
        <QuestionsSidebar />
      </div>
      <div class="main_layout_body text_container bg-white">
        <div class="k-header-wrapprer m-b-18">
          <Progressbar />
        </div>
        <div class="">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Progressbar from "../components/Shared/Progressbar.vue";
import QuestionsSidebar from "../views/Questionnarie/components/QuestionsSidebar.vue";
export default {
  components: {
    Progressbar,
    QuestionsSidebar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.text_container {
  padding: 14px 20px;
}
</style>
