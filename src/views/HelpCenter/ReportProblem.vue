<template>
  <div class="help_conatiner m-b-20">
    <div class="">
      <h5 class="m-b-0 m_title">
        {{ $t("help_center.Report_a_problem_tab.labels.Report_a_problem") }}
      </h5>
    </div>
    <p ref="paragraph">
      Here is my solution. I found there are two ways to achieve this. In
      Firefox, you can use selection api. Unfortunately, it will not work in
      Chrome. A simpler solution is to just match the search text and highlight
      it by enclosing it in
    </p>

    <div class="form_container">
      <form @submit.prevent="submitReport">
        <div class="k_select_single k_inp_half m-b-20">
          <Dropdown
            optionLabel="label"
            optionValue="value"
            placeholder=" Issue type
            "
            class="k_prime_inp_select"
            :options="issueList"
            v-model="reportProblem.issue_type"
            :class="{ 'is-invalid': v$.reportProblem.issue_type.$error }"
            @blur="v$.reportProblem.issue_type.$touch"
          />
          <div
            v-if="v$.reportProblem.issue_type.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.reportProblem.issue_type.required.$invalid"
              class="text-left fs-14"
            >
              Issue type is required
            </span>
          </div>
        </div>
        <div class="k_form_group p-b-49">
          <textarea
            :placeholder="
              $t('help_center.Report_a_problem_tab.form.placeholder.message')
            "
            v-model="reportProblem.message"
            @input="getUpdatedData"
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

import HelpCenterService from "../../Services/HelpCenterService";
import errorhandler from "../../utils/Error";

import DotLoader from "@/components/Shared/DotLoader";
import { mapGetters } from "vuex";
export default {
  components: {
    Dropdown,
    DotLoader,
  },

  data() {
    return {
      issueList: undefined,
      btnDyanmicWidth: undefined,
      isSubmitted: false,
      matchPattern1: /[.*+?^${}()|[\]\\]/g,
      matchPattern2: "\\$&",
      allData: "",
      matchedData: "",
      searchedterm: "",
      reportProblem: {
        issue_type: "",
        message: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      staffDataLocal: "staffDataLocal",
    }),
  },

  mounted() {
    this.btnDyanmicWidth = this.$refs.button_title.clientWidth;
  },

  created() {
    this.getTypeofIssues();
  },

  validations() {
    return {
      reportProblem: {
        issue_type: { required },
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
    getTypeofIssues() {
      HelpCenterService.getAllIssues()
        .then((res) => {
          if (res.data.status) {
            this.issueList = res.data.data.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            });
          } else {
            errorhandler(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitReport() {
      this.v$.$touch();
      console.log(this.v$.$invalid);
      if (this.v$.$invalid) return;
      this.isSubmitted = true;
      this.reportProblem.auth_token = this.staffDataLocal.auth_token;
      HelpCenterService.reportAProblem(this.reportProblem)
        .then((res) => {
          if (res.data.status) {
            this.formReset();
          } else {
            errorhandler(res);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isSubmitted = false;
        });
    },

    formReset() {
      this.v$.$reset();
      this.reportProblem = {
        issue: "",
        message: "",
      };
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
