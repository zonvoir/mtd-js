<template>
  <div :class="className">
    <div class="k_form_group">
      <input
        type="text"
        class="form-control k_inp_field"
        placeholder="Company"
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
  </div>
  <div :class="className">
    <div class="k_form_group k_select_single">
      <Multiselect
        placeholder="Industry"
        class="form-control k_inp_field"
        rules="required"
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
    </div>
  </div>
  <div :class="className">
    <div class="k_form_group k_select_single">
      <Multiselect
        placeholder="department"
        mode="tags"
        :closeOnSelect="false"
        :searchable="true"
        :createTag="true"
        class="form-control k_inp_field"
        rules="required"
        :options="departments"
        @blur="v$.careerForm.department.$touch"
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
    </div>
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
    <div class="k_form_group k_select_single">
      <Multiselect
        :placeholder="$t('personal_account.form.placeholder.seniority_level')"
        class="form-control k_inp_field"
        rules="required"
        :options="seniority"
        @blur="v$.careerForm.seniority_level.$touch"
        v-model="careerForm.seniority_level"
        :class="{
          'is-invalid': v$.careerForm.seniority_level.$error,
        }"
      />
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
            @blur="v$.careerForm.to.$touch"
            placeholder="dd/mm/yyyy"
            :class="{
              invalid_error: v$.careerForm.to.$error,
            }"
          />
          <div
            v-if="v$.careerForm.from.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.careerForm.from.required.$invalid"
              class="text-left fs-14"
            >
              Enter From Date
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
            @blur="v$.careerForm.to.$touch"
            placeholder="dd/mm/yyyy"
            :class="{
              invalid_error: v$.careerForm.to.$error,
            }"
          />
          <div
            v-if="v$.careerForm.to.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.careerForm.to.required.$invalid"
              class="text-left fs-14"
            >
              Enter To Date
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
import Multiselect from "@vueform/multiselect";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { getDepartemntsValue } from "../../utils/DepartmentModify";
import { formatDate } from "../../utils/FormatDate";
export default {
  props: {
    className: {
      required: true,
      type: String,
      default: "col-lg-12",
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
      checkValidation: undefined,
      fromDate: "From",
      toDate: "To",
      isValid: undefined,
      date: new Date(),
      careerForm: this.myCareer,
      // careerForm: {
      //   company: "",
      //   position: "",
      //   industry: null,
      //   seniority_level: null,
      //   department: [],
      // },
    };
  },
  created() {
    this.careerForm.department = getDepartemntsValue(this.myCareer.department);
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
    Multiselect,
  },

  methods: {
    formatMyDate(value) {
      formatDate(value, "L");
    },
    validateForm() {
      if (!this.v$.$invalid) {
        this.isValid = true;
        this.careerForm.to = formatDate(this.careerForm["to"], "L");
        this.careerForm.from = formatDate(this.careerForm["from"], "L");
        this.$emit("addNewCareer", {
          isvalid: this.isValid,
          newCareer: this.careerForm,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.invalid_error {
  outline: 3px solid #db2c66 !important;
  &:focus {
    outline: 2px solid #db2c66 !important;
    outline-offset: 0px;
  }
}
</style>
