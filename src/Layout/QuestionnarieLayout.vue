<template>
  <div>
    <div class="main_layout_container">
      <div class="main_layout_sidebar">
        <!-- :questions="questionList" -->
        <QuestionsSidebar />
      </div>
      <div class="main_layout_body text_container bg-white">
        <div class="k-header-wrapprer m-b-18">
          <Progressbar
            :valuenow="valuenow"
            :valuemin="valuemin"
            :valuemax="valuemax"
          />
        </div>
        <div class="">
          <!-- :questionsArr="questionList" -->
          <QuestionTest />
        </div>
        <!--  -->
        <!-- <router-view /> -->
      </div>
    </div>
  </div>
</template>

<script>
import Progressbar from "../components/Shared/Progressbar.vue";
import QuestionsSidebar from "../views/Questionnarie/components/QuestionsSidebar.vue";
import { mapGetters } from "vuex";
import QuestionnaireService from "../Services/QuestionnaireServices/Questionnaire";
import QuestionTest from "../views/Questionnarie/QuestionnarieTest.vue";
import errorhandler from "../utils/Error";
export default {
  components: {
    Progressbar,
    QuestionsSidebar,
    QuestionTest,
  },
  data() {
    return {
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      valuemin: 0,
      valuemax: 100,
      questionArr: [],
    };
  },
  // computed: mapState({
  //   questionnaire: (state) => state.questionnaire,
  //   questionList: (state) => state.questionList,
  //   valuenow: (state) => state.quizProgressValue,
  // }),
  computed: {
    ...mapGetters({
      questionnaire: "questionnaire",
      questionList: "questionList",
      valuenow: "quizProgressValue",
    }),
  },

  mounted() {
    this.departmentId = this.$route.params.departmentid;
    this.categoryID = this.$route.params.categoryId;
    this.authToken = this.staffData.auth_token;
    let data = {
      auth_token: this.authToken,
      department_id: this.departmentId,
      category_id: this.categoryID,
    };
    this.getDeptAndCategoryDetails(data);
    this.questionArr = this.$store.getters.questionList;
    // console.log("total question", this.$store.getters.questionList);
  },
  methods: {
    getDeptAndCategoryDetails(data) {
      QuestionnaireService.getOneCategory(data).then((res) => {
        if (res.data.status) {
          this.$store.dispatch(
            "GET_QUESTIONNAIRE",
            res.data.data.category_details
          );

          this.$store.dispatch(
            "GET_QUESTIONNAIRE_DETAILS",
            res.data.data.questionnaire.detail
          );
          this.$store.dispatch(
            "GET_QUESTIONLIST",
            res.data.data.questionnaire.questions
          );
        } else {
          errorhandler(res, this);
          this.$store.dispatch("GET_QUESTIONNAIRE", []);
          this.$store.dispatch("GET_QUESTIONNAIRE_DETAILS", []);
          this.$store.dispatch("GET_QUESTIONLIST", []);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.text_container {
  padding: 14px 20px;
}
</style>
