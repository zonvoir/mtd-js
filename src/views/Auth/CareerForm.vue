<template>
  <div :class="className">
    <div class="k_form_group">
      <AutoComplete
        class="k_prime_inp_field"
        :suggestions="filteredCompanies"
        @complete="searchCompany($event)"
        field="label"
        placeholder="Company name"
        @blur="v$.careerForm.company.$touch"
        v-model="careerForm.company"
        modelValue="value"
        :class="{
          'is-invalid': v$.careerForm.company.$error,
        }"
      />
      <div
        v-if="v$.careerForm.company.$error"
        class="invalid-feedback text-left"
      >
        <span
          v-if="v$.careerForm.company.required.$invalid"
          class="text-left fs-14"
        >
          Company is required
        </span>
      </div>
    </div>
    <!-- <div class="k_form_group">
      <div class="">
        <input
          type="text"
          class="form-control k_inp_field"
          placeholder="Company name"
          @blur="v$.careerForm.company.$touch"
          v-model.trim="careerForm.company"
          :class="{
            'is-invalid': v$.careerForm.company.$error,
          }"
        />
        <div
          v-if="v$.careerForm.company.$error"
          class="invalid-feedback text-left"
        >
          <span
            v-if="v$.careerForm.company.required.$invalid"
            class="text-left fs-14"
          >
            Company is required
          </span>
        </div>
      </div>
   
    </div> -->
  </div>
  <div :class="className">
    <div class="k_form_group">
      <Dropdown
        class="k_prime_inp_select"
        v-model="careerForm.industry"
        :options="industries"
        optionLabel="label"
        optionValue="value"
        placeholder="Industry"
        @blur="v$.careerForm.industry.$touch"
        :class="{
          'is-invalid': v$.careerForm.industry.$error,
        }"
      />
      <div
        v-if="v$.careerForm.industry.$error"
        class="invalid-feedback text-left"
      >
        <span
          v-if="v$.careerForm.industry.required.$invalid"
          class="text-left fs-14"
        >
          Industry is required
        </span>
      </div>
    </div>
    <!-- <div class="k_form_group k_select_single">
      <Multiselect
        placeholder="Industry"
        class="form-control k_inp_field"
        rules="required"
        :close-on-select="false"
        :filter-results="false"
        :min-chars="1"
        :resolve-on-load="false"
        :delay="0"
        :searchable="true"
        :options="industries"
        @blur="v$.careerForm.industry.$touch"
        v-model="careerForm.industry"
        :class="{
          'is-invalid': v$.careerForm.industry.$error,
        }"
      />
      <div
        v-if="v$.careerForm.industry.$error"
        class="invalid-feedback text-left"
      >
        <span
          v-if="v$.careerForm.industry.required.$invalid"
          class="text-left fs-14"
        >
          Industry is required
        </span>
      </div>
    </div> -->
  </div>
  <!-- {{ careerForm.department }} -->
  <!-- :options="myOptions" -->
  <div :class="className">
    <!-- <div class="btn_wrap">
      <button
        :disabled="disbaleInvited"
        @click="SendEmailsList(staffrole.roleid)"
        type="button"
        class="btn-primary inv_button btn btn-set text-uppercase"
      >
        {{ $t("category_details.team_mangementTab.buttons.invite") }}
      </button>
    </div> -->
    <div class="k_form_group">
      <div v-if="addNewDept" class="">
        <div class="add_dept">
          <input
            type="text"
            class="form-control k_inp_field"
            placeholder="Department"
            v-model="newDepartment"
          />
          <div class="btn-dept">
            <button
              @click="updateDepartment"
              type="button"
              class="btn btn-primary update_btn btn-set"
            >
              Add
            </button>
          </div>
        </div>
        <div class="text_right">
          <button
            @click="addNewDept = false"
            type="button"
            class="btn_adds btn-transaprent"
          >
            Back
          </button>
        </div>
        <!-- v-model.trim="depts" -->
        <!-- <Select2
          v-model="myValue"
          class="select_to"
          :settings="settings"
          @select="mySelectEvent($event)"
        /> -->
        <!-- <div class="text_right"></div> -->
      </div>
      <div class="" v-else>
        <MultiSelect
          v-model="careerForm.department"
          :options="departments"
          class="prime_multiselect"
          optionLabel="label"
          optionValue="value"
          placeholder="Department"
          @blur="v$.careerForm.department.$touch"
          :class="{
            'is-invalid': v$.careerForm.department.$error,
          }"
        />
        <div
          v-if="v$.careerForm.department.$error"
          class="invalid-feedback text-left"
        >
          <span
            v-if="v$.careerForm.department.required.$invalid"
            class="text-left fs-14"
          >
            {{
              $t("personal_account.form.invalid_msgs.Department_is_required")
            }}
          </span>
        </div>
        <div class="text_right">
          <button
            @click="extrernalDepartment"
            type="button"
            class="btn_adds btn-transaprent"
          >
            Add department
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="k_form_group k_select_single">
      <Multiselect
        placeholder="department"
        :closeOnSelect="false"
        :searchable="true"
        mode="tags"
        :createTag="true"
        class="form-control k_inp_field"
        rules="required"
        :options="departments"
        v-model="careerForm.department"
        :class="{
          'is-invalid': v$.careerForm.department.$error,
        }"
      />

      <div
        v-if="v$.careerForm.department.$error"
        class="invalid-feedback text-left"
      >
        <span
          v-if="v$.careerForm.department.required.$invalid"
          class="text-left fs-14"
        >
          {{ $t("personal_account.form.invalid_msgs.Department_is_required") }}
        </span>
      </div>
    </div> -->
  </div>
  <div :class="className">
    <div class="k_form_group">
      <input
        type="text"
        class="form-control k_inp_field"
        :placeholder="$t('personal_account.form.placeholder.position')"
        v-model.trim="careerForm.position"
        @blur="v$.careerForm.position.$touch"
        :class="{
          'is-invalid': v$.careerForm.position.$error,
        }"
      />
      <div
        v-if="v$.careerForm.position.$error"
        class="invalid-feedback text-left"
      >
        <span
          v-if="v$.careerForm.position.required.$invalid"
          class="text-left fs-14"
        >
          {{ $t("personal_account.form.invalid_msgs.Position_is_required") }}
        </span>
      </div>
    </div>
  </div>
  <div :class="className">
    <div class="k_form_group">
      <Dropdown
        class="k_prime_inp_select"
        optionLabel="label"
        optionValue="value"
        :placeholder="$t('personal_account.form.placeholder.seniority_level')"
        :options="seniority"
        @blur="v$.careerForm.seniority_level.$touch"
        v-model="careerForm.seniority_level"
        :class="{
          'is-invalid': v$.careerForm.seniority_level.$error,
        }"
      />
      <!-- <Multiselect
        :placeholder="$t('personal_account.form.placeholder.seniority_level')"
        class="form-control k_inp_field"
        rules="required"
        :options="seniority"
        @blur="v$.careerForm.seniority_level.$touch"
        v-model="careerForm.seniority_level"
        :class="{
          'is-invalid': v$.careerForm.seniority_level.$error,
        }"
      /> -->
      <div
        v-if="v$.careerForm.seniority_level.$error"
        class="invalid-feedback text-left"
      >
        <span
          v-if="v$.careerForm.seniority_level.required.$invalid"
          class="text-left fs-14"
        >
          {{
            $t("personal_account.form.invalid_msgs.Seniority_level_is_required")
          }}
        </span>
      </div>
    </div>
  </div>
  <div :class="className">
    <div class="k_form_group row">
      <div class="col-lg-6">
        <div class="k_form_group position-relative">
          <label for="" class="date_label">{{ fromDate }}</label>
          <Datepicker
            class="project_date_picker custom_label"
            v-model="careerForm.from"
            :enableTimePicker="false"
            @open="clearFromDate"
            @blur="v$.careerForm.from.$touch"
            placeholder="dd/mm/yyyy"
            :class="{
              invalid_error: v$.careerForm.from.$error,
            }"
          />
          <!-- {{ v$.careerForm.from.required.$invalid }} -->
          <div
            v-if="v$.careerForm.from.$error"
            class="invalid_feedback text-left"
          >
            <span
              v-if="v$.careerForm.from.required.$invalid"
              class="text-left fs-14"
            >
              From date is required
            </span>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="k_form_group position-relative">
          <label for="" class="date_label">{{ toDate }}</label>
          <Datepicker
            class="project_date_picker custom_label"
            :enableTimePicker="false"
            v-model="careerForm.to"
            @open="clearToDate"
            @blur="v$.careerForm.to.$touch"
            placeholder="dd/mm/yyyy"
            :class="{
              invalid_error: v$.careerForm.to.$error,
            }"
          />
          <div
            v-if="v$.careerForm.to.$error"
            class="invalid_feedback text-left"
          >
            <span
              v-if="v$.careerForm.to.required.$invalid"
              class="text-left fs-14"
            >
              To date is required
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <slot name="add-form" :validateForm="validateForm"></slot> -->
</template>

<script>
import Datepicker from "vue3-date-time-picker";
// import Multiselect from "@vueform/multiselect";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { formatDate } from "../../utils/FormatDate";
import AutoComplete from "primevue/autocomplete";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import CompanyService from "../../Services/Company/CompanyService";
import errorhandler from "../../utils/Error";
import CommonService from "../../Services/CommonService";
// import Select2 from "vue3-select2-component";

// import { selectedDepartemntsValue } from "../../utils/DepartmentModify";

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
      myOptions: ["India", "France"],
      myValue: "uservalue",
      date: new Date(),
      careerForm: this.myCareer, //{ ...this.myCareer },
      filteredCompanies: null,
      companies: [],
    };
  },
  validations: {
    careerForm: {
      company: { required },
      position: { required },
      industry: { required },
      department: { required },
      from: { required },
      to: { required },
      seniority_level: { required },
    },
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  components: {
    Datepicker,
    // Multiselect,
    // Select2,
    MultiSelect,
    AutoComplete,
    Dropdown,
  },
  updated() {
    this.careerForm = this.myCareer;
  },
  mounted() {
    this.careerForm = this.myCareer;

    this.getAllCompany();
  },
  created() {
    this.settings = {
      tags: true,
      allowClear: true,
      multiple: true,
      insertTag: function (data, tag) {
        // Insert the tag at the end of the results
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
      console.log("date", this.careerForm.from);
    },
    clearToDate() {
      this.careerForm.to = "";
      console.log("date", this.careerForm.to);
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
      CommonService.addNewDepartment(deptData).then((res) => {
        if (res.data.status) {
          this.addNewDept = false;
          this.$store.dispatch("GET_ALL_COMPANY_DEPARTMENT", res.data.data);
          console.log("new department added successfully", res.data.data);
        } else {
          errorhandler(res, this);
        }
      });
      console.log("update department value", this.newDepartment);
    },
    // getDefaulDepartment(options, dept) {
    //   let filterdArr = options.filter((item) => {
    //     return dept.includes(item.value);
    //   });
    //   console.log("filter arr", filterdArr);
    //   return filterdArr;
    // },
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
      if (!this.v$.$invalid) {
        this.isValid = true;
        this.careerForm.company = this.modifyCompanyData(
          this.careerForm.company,
          "label"
        );

        this.careerForm.to = formatDate(this.careerForm["to"], "L");
        this.careerForm.from = formatDate(this.careerForm["from"], "L");
        this.$emit("addNewCareer", {
          isvalid: this.isValid,
          newCareer: this.careerForm,
        });

        return true;
      } else {
        return false;
      }
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
.invalid_error {
  outline: 3px solid #db2c66 !important;
  &:focus {
    outline: 2px solid #db2c66 !important;
    outline-offset: 0px;
  }
}
.invalid_feedback {
  padding-top: 2px;
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
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
