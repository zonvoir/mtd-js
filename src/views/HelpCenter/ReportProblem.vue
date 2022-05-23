<template>
  <div class="help_conatiner m-b-20">
    <div class="">
      <h5 class="m-b-0 m_title">
        {{ $t("help_center.Report_a_problem_tab.labels.Report_a_problem") }}
      </h5>
    </div>
    <div class="form_container">
      <form @submit.prevent="submitReport">
        <div class="k_select_single k_inp_half m-b-20">
          <Dropdown
            optionLabel="label"
            optionValue="value"
            :placeholder="
              $t('help_center.Report_a_problem_tab.form.placeholder.role')
            "
            class="k_prime_inp_select"
            :options="issues"
            v-model="reportProblem.issue"
            :class="{ 'is-invalid': v$.reportProblem.issue.$error }"
            @blur="v$.reportProblem.issue.$touch"
          />
          <div
            v-if="v$.reportProblem.issue.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.reportProblem.issue.required.$invalid"
              class="text-left fs-14"
            >
              Issue is required
            </span>
          </div>
        </div>
        <div class="k_form_group p-b-49">
          <textarea
            :placeholder="
              $t('help_center.Report_a_problem_tab.form.placeholder.message')
            "
            v-model="reportProblem.message"
            class="form-control k_inp_field"
            rows="5"
            @blur="v$.reportProblem.message.$touch"
            :class="{ 'is-invalid': v$.reportProblem.message.$error }"
          />
          <div
            v-if="v$.reportProblem.message.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.reportProblem.message.required.$invalid"
              class="text-left fs-14"
            >
              Message is required
            </span>
          </div>
        </div>
        <div class="m-l-auto p-t-49">
          <button type="submit" class="btn btn-primary btn-set">
            <div ref="button_title" v-if="!isSubmitted" class="">
              {{ $t("help_center.Report_a_problem_tab.buttons.submit") }}
            </div>
            <div v-else>
              <DotLoader
                :wideLength="btnDyanmicWidth"
                :isLoading="isSubmitted"
              />
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

// import HelpCenterService from "../../Services/HelpCenterService";
// import errorhandler from "../../utils/Error";

import DotLoader from "@/components/Shared/DotLoader";
export default {
  components: {
    Dropdown,
    DotLoader,
  },

  data() {
    return {
      issues: [
        { value: 0, label: "Issue 1" },
        { value: 1, label: "Issue 2" },
        { value: 2, label: "Issue 3" },
        { value: 3, label: "Issue 4" },
      ],
      btnDyanmicWidth: undefined,
      isSubmitted: false,
      reportProblem: {
        issue: "",
        message: "",
      },
    };
  },

  mounted() {
    this.btnDyanmicWidth = this.$refs.button_title.clientWidth;
  },

  validations() {
    return {
      reportProblem: {
        issue: { required },
        message: { required },
      },
    };
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  methods: {
    submitReport() {
      this.v$.$touch();
      if (this.v$.invalid) return;
      this.isSubmitted = true;

      setTimeout(() => {
        this.isSubmitted = false;
        console.log("all fields are valid", this.isSubmitted);
      }, 5000);
      // this.isSubmitted = false;
      // console.log("I am out of  the timeout function ", this.isSubmitted);
      // HelpCenterService.reportAProblem()
      //   .then((res) => {
      //     if (res.data.status) {
      //       console.log("res will come thia block ");
      //     } else {
      //       errorhandler(res);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => {
      //     console.log("this will run every time");
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.dot_loader_size {
  width: 54px;
  height: 10px;
}

.m_title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  padding-bottom: 16px;
  color: #7900d8;
}
.help_conatiner {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 18px 14px;
}
</style>
