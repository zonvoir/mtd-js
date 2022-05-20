<template>
  <div>
    <div class="company_modal_wrap">
      <slot name="start-questionnaire"> </slot>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      ref="questinnaire_modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content questionnnaire_modal_content">
          <div class="questionnnaire_modal_header">
            <div class="questionnnaire_header_wrapper">
              <div class="k-header-wrapprer">
                <Progressbar
                  @closeModal="closeQuestionModal"
                  :valuenow="valuenow"
                  :valuemin="valuemin"
                  :valuemax="valuemax"
                />
              </div>
            </div>
          </div>
          <div class="questionnaire_modal_body">
            <div class="questionnaire_body_wrapper">
              <div class="">
                <QuestionsSidebar />
              </div>
              <div class="questionnaire_wrap">
                <QuestionTest />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Progressbar from "../../components/Shared/Progressbar.vue";
import QuestionsSidebar from "./components/QuestionsSidebar.vue";
import QuestionTest from "./QuestionnarieTest.vue";
import { Modal } from "bootstrap";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modal: null,
      valuemin: 0,
      valuemax: 100,
      questionArr: [],
    };
  },

  components: {
    Progressbar,
    QuestionsSidebar,
    QuestionTest,
  },

  computed: {
    ...mapGetters({
      valuenow: "quizProgressValue",
      quizModalStatus: "quizModalStatus",
      staffData: "staffDataLocal",
    }),
  },

  watch: {
    quizModalStatus: function (val) {
      if (val) {
        this.modal.show();
      } else {
        this.closeQuestionModal();
      }
    },
  },

  mounted() {
    this.modal = new Modal(this.$refs.questinnaire_modal);
    this.departmentId = this.$route.params.did;
    this.categoryID = this.$route.params.id;
    this.authToken = this.staffData.auth_token;
  },

  methods: {
    closeQuestionModal() {
      this.$swal({
        title: "Are you sure?",
        text: "Your questionnaire will be closed !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7900d8 ",
        cancelButtonColor: "#edf1f7",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("modal close clicked");
          if (this.departmentId && this.categoryID && this.authToken) {
            let data = {
              auth_token: this.authToken,
              department_id: this.departmentId,
              category_id: this.categoryID,
            };
            console.log("close the modal", data);
            this.$store.dispatch("GET_QUESTIONNAIRE_ALL_DATA", data);
            this.$store.dispatch("GET_QUIZ_MODAL_STATUS", false);
            this.modal.hide();
          }
        } else {
          this.$store.dispatch("GET_QUIZ_MODAL_STATUS", true);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom_grid {
}
.questionnaire_body_wrapper {
  display: grid;
  grid-template-columns: 2fr 5fr;
}

.questionnaire_modal_body {
  position: relative;
}
.questionnnaire_modal_content {
  padding: 24px 24px 16px 24px;
}
.k-header-wrapprer {
  margin-bottom: 20px;
}
</style>
