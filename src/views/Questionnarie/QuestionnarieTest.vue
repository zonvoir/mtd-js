<template>
  <div>
    <!-- Category Start  -->
    <div class="d-flex align-items-center m-b-28">
      <div class="view_title_wrap pb-15">
        <div class="page_title_wrap">
          <div class="k_icon_wrap m-r-10">
            <img
              :src="
                questionnaire.image
                  ? questionnaire.image
                  : 'K_Icons/clipboard_60_logo.svg'
              "
              class="catLogo"
              alt=""
            />
          </div>
          <div class="">
            <h4 class="view_title">{{ questionnaire.name }}</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- category ends -->
    <div class="">
      <Question />
      <!--  -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Question from "../Questionnarie/components/Question.vue";
export default {
  props: {},
  components: {
    Question,
  },
  computed: mapState({
    questionnaire: (state) => state.questionnaire,
  }),
  data() {
    return {};
  },

  created() {},
};
</script>

<style lang="scss" scoped>
.catLogo {
  width: 60px;
  height: 60px;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
</style>
