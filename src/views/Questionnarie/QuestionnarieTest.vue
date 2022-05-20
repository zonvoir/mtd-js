<template>
  <div>
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
