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
            <h4 class="view_title_with_catgry">
              {{ questionnaireDetails.department_name }} /
              <span class="catgry_name">{{ questionnaire.name }}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <!-- category ends -->
    <div class="sec_scrollbar">
      <Question />
      <!--  -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Question from "../Questionnarie/components/Question.vue";
export default {
  props: {},
  components: {
    Question,
  },
  computed: {
    ...mapGetters({
      questionnaireDetails: "questionnaireDetails",
      questionnaire: "questionnaire",
    }),
  },

  data() {
    return {};
  },

  created() {},
};
</script>

<style lang="scss" scoped>
.view_title_with_catgry {
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
  color: #7900d8;
  .catgry_name {
    color: #222b45;
  }
}
.sec_scrollbar {
  height: 65vh;
  overflow: auto;
  /* width */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f7f9fc;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e1e2e4;
    border-radius: 4px;
    width: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #cbcbcc;
    width: 10px;
    cursor: pointer;
    border-radius: 4px;
  }
}
.catLogo {
  width: 60px;
  height: 60px;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
</style>
