<template>
  <div>
    <!-- Category Start  -->
    <!-- <div class="d-flex align-items-center m-b-28">
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
    </div> -->
    <!-- category ends -->
    <div class="">
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
      questionnaire: "questionnaireCategoryDetails",
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

.catLogo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
</style>
