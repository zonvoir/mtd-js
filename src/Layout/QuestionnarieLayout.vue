<template>
  <div>
    <div class="main_layout_container" v-if="questionList.length">
      <div class="main_layout_sidebar">
        <QuestionsSidebar :questions="questionList" />
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
          <QuestionTest :questionsArr="questionList" />
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
// import quest from "./store/questionnaire";
import { mapState } from "vuex";
import QuestionnaireService from "../Services/QuestionnaireServices/Questionnaire";
import QuestionTest from "../views/Questionnarie/QuestionnarieTest.vue";
export default {
  components: {
    Progressbar,
    QuestionsSidebar,
    QuestionTest,
  },
  data() {
    return {
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      // questionnaire: {},
      // questionList: [],
      valuenow: 0,
      valuemin: 0,
      valuemax: 100,
    };
  },
  computed: mapState({
    questionnaire: (state) => state.questionnaire,
    questionList: (state) => state.questionList,
  }),
  // watch: {
  //   questionList(newQuestion, oldQuestion) {
  //     console.log(newQuestion, oldQuestion);
  //   },
  // },
  mounted() {
    this.departmentId = this.$route.params.did;
    this.categoryID = this.$route.params.id;
    this.authToken = this.staffData.auth_token;
    // if (this.departmentId && this.categoryID && this.authToken) {
    //   }
    let data = {
      auth_token: this.authToken,
      department_id: "5",
      category_id: "3",
    };
    this.getDeptAndCategoryDetails(data);
  },
  methods: {
    getDeptAndCategoryDetails(data) {
      QuestionnaireService.getOneCategory(data).then((res) => {
        if (res.data.status) {
          this.$store.dispatch(
            "getQuestionnaire",
            res.data.data.category_details
          );
          this.$store.dispatch(
            "getQuestionList",
            res.data.data.questionnaire.questions
          );
          // this.questionnaire = res.data.data.category_details;
          // this.questionList = res.data.data.questionnaire.questions;
          console.log("questionlist", this.questionList);
        } else {
          let $th = this;
          if ("error" in res.data) {
            Object.keys(res.data.error).map(function (key) {
              $th.$toast.error(res.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          } else {
            $th.$toast.error(res.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
          }
        }
      });
    },
    // getDeptAndCategoryDetails() {
    //   // departmemntID, categoryID, staffID

    //   QuestionnaireService.getOneCategory(5, 3, 37).then((res) => {
    //     if (res.data.status) {
    //       this.questionnaire = res.data.data;
    //       console.log("questionnaire", this.questionnaire);
    //       this.questionList = res.data.data.questionnaire.questions;
    //       // console.log("questionlist", this.questionList);
    //     } else {
    //       console.log("no department list found");
    //       let $th = this;
    //       Object.keys(res.data.error).map(function (key) {
    //         $th.$toast.error(res.data.error[key], {
    //           position: "bottom-left",
    //           duration: 3712,
    //         });
    //       });
    //     }
    //   });
    // },
    editQuetion(id) {
      console.log("edit Question by Id", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.text_container {
  padding: 14px 20px;
}
</style>
