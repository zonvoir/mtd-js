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
                  :disabled="newDepartment == ''"
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
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="row">
      <div class="col-lg-6">
        <div class="k_form_group position-relative">
          <label for="" class="date_label">{{
            $t("career_step.form.placeholder.from")
          }}</label>
          <Datepicker
            class="project_date_picker custom_label"
            v-model="careerForm.from"
            :enableTimePicker="false"
            :weekStart="0"
            :disabledWeekDays="[6, 0]"
            :maxDate="new Date()"
            @open="clearFromDate"
            placeholder="mm/dd/yyyy"
          />
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
            :weekStart="0"
            :disabledWeekDays="[6, 0]"
            v-model="careerForm.to"
            :minDate="careerForm.from"
            :maxDate="new Date()"
            @open="clearToDate"
            placeholder="mm/dd/yyyy"
          />
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
    "careerForm.workingAtPresent": function () {
      this.clearToDate();
    },
    "careerForm.from": function () {
      if (this.careerForm.from > new Date()) {
        errorhandler("Future date is not accepeted");
        return (this.careerForm.from = "");
      }
    },
  },

  updated() {
    this.careerForm = this.myCareer;
  },

  mounted() {
    this.careerForm = this.myCareer;
    this.careerForm.workingAtPresent = this.workingAtPresent;
    this.getAllCompany();
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
      this.isValid = true;
      this.careerForm.company = this.modifyCompanyData(
        this.careerForm.company,
        "label"
      );
      this.careerForm.to = formatDate(this.careerForm["to"], "L");
      this.careerForm.from = formatDate(this.careerForm["from"], "L");
      console.log("check vali", this.careerForm);
      this.$emit("addNewCareer", {
        isvalid: this.isValid,
        newCareer: this.careerForm,
      });

      return true;
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
