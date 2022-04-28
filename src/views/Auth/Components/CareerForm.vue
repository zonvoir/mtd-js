<template>
  <div class="col-lg-12">
    <h5 class="section_heading">{{ $t("career_step.current_employer") }}</h5>
    <div class="row">
      <div :class="className">
        <div class="k_form_group">
          <AutoComplete
            class="k_prime_inp_field"
            :suggestions="filteredCompanies"
            @complete="searchCompany($event)"
            field="label"
            :placeholder="$t('career_step.form.placeholder.company_name')"
            v-model="careerForm.company"
            modelValue="value"
          />
          <!-- @blur="v$.careerForm.company.$touch"
            :class="{
              'is-invalid': v$.careerForm.company.$error,
            }"
          <div
            v-if="v$.careerForm.company.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.careerForm.company.required.$invalid"
              class="text-left fs-14"
            >
              {{ $t("career_step.form.invalid_msgs.company_name_is_required") }}
            </span>
          </div> -->
        </div>
      </div>
      <div :class="className">
        <div class="k_form_group">
          <Dropdown
            class="k_prime_inp_select"
            v-model="careerForm.industry"
            :options="industries"
            optionLabel="label"
            optionValue="value"
            :placeholder="$t('career_step.form.placeholder.Industry')"
          />
          <!-- @blur="v$.careerForm.industry.$touch"
            :class="{
              'is-invalid': v$.careerForm.industry.$error,
            }"
          <div
            v-if="v$.careerForm.industry.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.careerForm.industry.required.$invalid"
              class="text-left fs-14"
            >
              {{ $t("career_step.form.invalid_msgs.Industry_is_required") }}
            </span>
          </div> -->
        </div>
      </div>
      <!-- division section -->
      <div :class="className">
        <div class="k_form_group">
          <input
            type="text"
            class="form-control k_inp_field"
            :placeholder="$t('career_step.form.placeholder.Division')"
            v-model.trim="careerForm.division"
          />
          <!-- @blur="v$.careerForm.division.$touch"
            :class="{
              'is-invalid': v$.careerForm.division.$error,
            }"

          <div
            v-if="v$.careerForm.division.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.careerForm.division.required.$invalid"
              class="text-left fs-14"
            >
              {{ $t("career_step.form.invalid_msgs.Division_is_required") }}
            </span>
          </div> -->
        </div>
      </div>
      <!-- division section end -->
      <div :class="className">
        <div class="k_form_group">
          <div v-if="addNewDept" class="">
            <div class="add_dept">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('career_step.form.placeholder.Department')"
                v-model="newDepartment"
              />
              <div class="btn-dept">
                <button
                  @click="updateDepartment"
                  type="button"
                  class="btn btn-primary update_btn btn-set"
                >
                  {{ $t("career_step.buttons.add") }}
                </button>
              </div>
            </div>
            <div class="text_right">
              <button
                @click="addNewDept = false"
                type="button"
                class="btn_adds btn-transaprent"
              >
                {{ $t("career_step.buttons.back") }}
              </button>
            </div>
          </div>
          <div class="" v-else>
            <MultiSelect
              v-model="careerForm.department"
              :options="departments"
              class="prime_multiselect"
              optionLabel="label"
              optionValue="value"
              :placeholder="$t('career_step.form.placeholder.Department')"
            />
            <!-- @blur="v$.careerForm.department.$touch"
              :class="{
                'is-invalid': v$.careerForm.department.$error,
              }"
            <div
              v-if="v$.careerForm.department.$error"
              class="invalid-feedback text-left"
            >
              <span
                v-if="v$.careerForm.department.required.$invalid"
                class="text-left fs-14"
              >
                {{ $t("career_step.form.invalid_msgs.Department_is_required") }}
              </span>
            </div> -->
            <div class="text_right">
              <button
                @click="extrernalDepartment"
                type="button"
                class="btn_adds btn-transaprent"
              >
                {{ $t("career_step.buttons.add_department") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-12">
    <h5 class="section_heading">{{ $t("career_step.current_employment") }}</h5>
    <div class="row">
      <div :class="className">
        <div class="k_form_group">
          <input
            type="text"
            class="form-control k_inp_field"
            :placeholder="$t('career_step.form.placeholder.Position')"
            v-model.trim="careerForm.position"
          />
          <!-- @blur="v$.careerForm.position.$touch"
            :class="{
              'is-invalid': v$.careerForm.position.$error,
            }"
          <div
            v-if="v$.careerForm.position.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.careerForm.position.required.$invalid"
              class="text-left fs-14"
            >
              {{ $t("career_step.form.invalid_msgs.Position_is_required") }}
            </span>
          </div> -->
        </div>
      </div>
      <div :class="className">
        <div class="k_form_group">
          <Dropdown
            class="k_prime_inp_select"
            optionLabel="label"
            optionValue="value"
            :placeholder="$t('career_step.form.placeholder.Seniority_level')"
            :options="seniority"
            v-model="careerForm.seniority_level"
          />
          <!-- @blur="v$.careerForm.seniority_level.$touch"
            :class="{
              'is-invalid': v$.careerForm.seniority_level.$error,
            }"

          <div
            v-if="v$.careerForm.seniority_level.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.careerForm.seniority_level.required.$invalid"
              class="text-left fs-14"
            >
              {{
                $t("career_step.form.invalid_msgs.Seniority_level_is_required")
              }}
            </span>
          </div> -->
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="k_form_group row">
      <div class="col-lg-6">
        <div class="k_form_group position-relative">
          <label for="" class="date_label">{{
            $t("career_step.form.placeholder.from")
          }}</label>
          <Datepicker
            class="project_date_picker custom_label"
            v-model="careerForm.from"
            :enableTimePicker="false"
            @open="clearFromDate"
            placeholder="mm/dd/yyyy"
          />
          <!-- @blur="v$.careerForm.from.$touch"
                :class="{
                  invalid_error: v$.careerForm.from.$error,
                }"
              <div
                v-if="v$.careerForm.from.$error"
                class="invalid_feedback text-left"
              >
                <span
                  v-if="v$.careerForm.from.required.$invalid"
                  class="text-left fs-14"
                >
                  {{ $t("career_step.form.invalid_msgs.from_is_required") }}
                </span>
              </div> -->
        </div>
      </div>
      <div class="col-lg-6">
        <div class="k_form_group position-relative">
          <label for="" class="date_label">{{
            $t("career_step.form.placeholder.to")
          }}</label>
          <Datepicker
            :disabled="careerForm.workingAtPresent"
            class="project_date_picker custom_label"
            :enableTimePicker="false"
            v-model="careerForm.to"
            @open="clearToDate"
            placeholder="mm/dd/yyyy"
          />
          <!-- @blur="v$.careerForm.to.$touch"
                :class="{
                  invalid_error: v$.careerForm.to.$error,
                }"
              <div
                v-if="v$.careerForm.to.$error"
                class="invalid_feedback text-left"
              >
                <span
                  v-if="v$.careerForm.to.required.$invalid"
                  class="text-left fs-14"
                >
                  {{ $t("career_step.form.invalid_msgs.to_is_required") }}
                </span>
              </div> -->
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-12">
    <div class="k_form_group">
      <div class="check_box_wrapper">
        <label class="k_checkbox check_lable">
          {{ $t("career_step.currrenly_working") }}

          <input
            type="checkbox"
            v-model="careerForm.workingAtPresent"
            checked="checked"
          />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
// import { required, requiredIf } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import AutoComplete from "primevue/autocomplete";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import errorhandler from "../../../utils/Error";
import CompanyService from "../../../Services/Company/CompanyService";
import { formatDate } from "../../../utils/FormatDate";
export default {
  emits: ["addNewCareer"],
  props: {
    className: {
      required: true,
      type: String,
      default: "col-lg-12",
    },
    authToken: {
      type: String,
    },
    seniority: {
      type: Array,
      required: true,
    },
    departments: {
      type: Array,
      required: true,
    },
    industries: {
      type: Array,
      required: true,
    },
    myCareer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      staffData: this.authToken,
      addNewDept: false,
      checkValidation: undefined,
      fromDate: "From",
      toDate: "To",
      newDepartment: "",
      isValid: undefined,
      myValue: "uservalue",
      date: new Date(),
      workingAtPresent: true,
      careerForm: this.myCareer,
      filteredCompanies: null,
      companies: [],
    };
  },
  // validations() {
  //   let validator = {
  //     careerForm: {
  //       company: { required },
  //       position: { required },
  //       industry: { required },
  //       department: { required },
  //       from: { required },
  //       to: {
  //         required: requiredIf(() => !this.careerForm.workingAtPresent),
  //       },
  //       division: { required },
  //       seniority_level: { required },
  //     },
  //   };
  //   return validator;
  // },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  components: {
    Datepicker,
    MultiSelect,
    AutoComplete,
    Dropdown,
  },
  watch: {
    "careerForm.workingAtPresent": function (oldVal, newVal) {
      // this.careerForm.workingAtPresent = val;
      console.log(oldVal, newVal, "vis", this.careerForm.workingAtPresent);
      this.clearToDate();
    },
  },

  updated() {
    this.careerForm = this.myCareer;
    // this.careerForm.workingAtPresent = this.workingAtPresent;
  },

  mounted() {
    this.careerForm = this.myCareer;
    this.careerForm.workingAtPresent = this.workingAtPresent;
    this.getAllCompany();
  },
  created() {
    this.settings = {
      tags: true,
      allowClear: true,
      multiple: true,
      insertTag: function (data, tag) {
        this.emailTag = tag;
        console.log("data", data, "tag", tag);
        data.push(tag);
      },
    };

    this.mySettings = {
      multiple: true,
    };
  },

  methods: {
    clearFromDate() {
      this.careerForm.from = "";
    },
    clearToDate() {
      this.careerForm.to = "";
    },
    extrernalDepartment() {
      this.addNewDept = true;
      this.newDepartment = "";
    },
    mySelectEvent({ id, text }) {
      console.log("id", { id, text });

      console.log("my all department", this.myValue);
    },
    updateDepartment() {
      let deptData = {
        auth_token: this.staffData,
        name: this.newDepartment,
      };
      this.$store
        .dispatch("ADD_NEW_CAREER_DEPARTMENT", deptData)
        .then((res) => {
          if (res.data.status) {
            this.addNewDept = false;
          }
        });
    },

    searchCompany(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredCompanies = [...this.companies];
        } else {
          this.filteredCompanies = this.companies.filter((compnay) => {
            return compnay.label
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }
      }, 250);
    },
    getAllCompany() {
      CompanyService.companySuggestions().then((res) => {
        if (res.data.status) {
          this.companies = [];
          this.companies = res.data.data;
        } else {
          console.log("ff");
          errorhandler(res, this);
        }
      });
    },
    modifyCompanyData(data, parmas) {
      if (typeof data === "object") {
        console.log("this is object");
        return data[parmas];
      } else {
        return data;
      }
    },

    validateForm() {
      // this.v$.careerForm.$touch();
      // if (!this.v$.careerForm.$invalid) {
      this.isValid = true;
      this.careerForm.company = this.modifyCompanyData(
        this.careerForm.company,
        "label"
      );
      // this.careerForm.workingAtPresent = this.workingAtPresent;
      this.careerForm.to = formatDate(this.careerForm["to"], "L");
      this.careerForm.from = formatDate(this.careerForm["from"], "L");
      console.log("check vali", this.careerForm);
      this.$emit("addNewCareer", {
        isvalid: this.isValid,
        newCareer: this.careerForm,
      });

      return true;
      // } else {
      //   return false;
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.add_dept {
  position: relative;
  .btn-dept {
    position: absolute;
    top: 0;
    right: 0;
    .update_btn {
      border-radius: 0;
      text-transform: uppercase;
    }
  }
}
.custom_select2 {
  position: relative;
  z-index: 99;
  height: 3rem;
  top: 10px;
  left: 0;
  right: 0;
}

.btn_adds {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #7900d8;
  text-align: left;
}
.text_right {
  position: relative;
  top: 0;
  right: 0;
  text-align: right !important;
}
.select_to {
  width: 100% !important;
}
</style>
