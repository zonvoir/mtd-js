<template>
  <div class="invite_btn_wrap">
    <!-- <button @click="addMultipleCareer" class="btn-transaprent btn_add_multiple">
    </button> -->
    <slot name="add-button-action" :addCareer="addMultipleCareer"></slot>
  </div>
  <!-- Career Information modal -->
  <div class="modal fade" ref="careerModal">
    <div class="modal-dialog modal-xl invitation_dialog">
      <div class="modal-content invitaion_content">
        <div class="modal-header invite_header">
          <div class="m-l-auto">
            <button @click="closeModal" class="btn-transaprent zp-0 m-l-auto">
              <img src="K_Icons/cancel.svg" alt="" class="cancel_icon" />
            </button>
          </div>
        </div>
        <div class="modal-body invitaion_body">
          <div class="team_wrapper m-b-20">
            <div class="m-b-12">
              <p class="staff_desc">
                Simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 150.Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the Lorem Dummy text Industry was
                created.It has been the industry's standard dummy text.
              </p>
            </div>
          </div>
          <!-- career form start here -->
          <div class="from_container">
            <form @submit.prevent="saveCarreerInfo" action="">
              <div v-for="(career, idx) in carreerForm" :key="idx" class="">
                <div class="m-b-24">
                  <h4 class="m-t-0 title-dark">Add Carreer Information</h4>
                </div>
                <div class="k_form_group">
                  <input
                    type="text"
                    class="form-control k_inp_field"
                    placeholder="Company"
                    @blur="v$.carreerForm.company.$touch"
                    v-model.trim="carreerForm.company"
                    :class="{
                      'is-invalid': v$.carreerForm.company.$error,
                    }"
                  />
                  <div
                    v-if="v$.carreerForm.company.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.carreerForm.company.required.$invalid"
                      class="text-left fs-14"
                    >
                      Company is required
                    </span>
                  </div>
                </div>

                <div class="k_form_group k_select_single">
                  <Multiselect
                    placeholder="Industry"
                    class="form-control k_inp_field"
                    :options="industryLists"
                    rules="required"
                    @blur="v$.carreerForm.industry.$touch"
                    v-model="carreerForm.industry"
                    :class="{
                      'is-invalid': v$.carreerForm.industry.$error,
                    }"
                  />
                  <div
                    v-if="v$.carreerForm.industry.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.carreerForm.industry.required.$invalid"
                      class="text-left fs-14"
                    >
                      Industry is required
                    </span>
                  </div>
                </div>

                <div class="k_form_group k_select_single">
                  <!-- :disabled="isInvitedDepartments" -->
                  <Multiselect
                    placeholder="Department"
                    mode="tags"
                    :closeOnSelect="false"
                    :searchable="true"
                    :createTag="true"
                    class="form-control k_inp_field"
                    rules="required"
                    :options="departmentLists"
                    @blur="v$.carreerForm.department.$touch"
                    v-model="carreerForm.department"
                    :class="{
                      'is-invalid': v$.carreerForm.department.$error,
                    }"
                  />
                  <div
                    v-if="v$.carreerForm.department.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.carreerForm.department.required.$invalid"
                      class="text-left fs-14"
                    >
                      Department is required
                    </span>
                  </div>
                </div>
                <div class="k_form_group">
                  <input
                    type="text"
                    class="form-control k_inp_field"
                    placeholder="Position"
                    @blur="v$.carreerForm.position.$touch"
                    v-model.trim="carreerForm.position"
                    :class="{
                      'is-invalid': v$.carreerForm.position.$error,
                    }"
                  />
                  <div
                    v-if="v$.carreerForm.position.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.carreerForm.position.required.$invalid"
                      class="text-left fs-14"
                    >
                      Position is required
                    </span>
                  </div>
                </div>
                <div class="k_form_group k_select_single">
                  <Multiselect
                    placeholder="Seniority Level"
                    class="form-control k_inp_field"
                    rules="required"
                    :options="seniorityLevels"
                    @blur="v$.carreerForm.seniority_level.$touch"
                    v-model="carreerForm.seniority_level"
                    :class="{
                      'is-invalid': v$.carreerForm.seniority_level.$error,
                    }"
                  />
                  <div
                    v-if="v$.carreerForm.seniority_level.$error"
                    class="invalid-feedback text-left"
                  >
                    <span
                      v-if="v$.carreerForm.seniority_level.required.$invalid"
                      class="text-left fs-14"
                    >
                      Seniority level is required
                    </span>
                  </div>
                </div>
                <div class="k_form_group row">
                  <div class="col-lg-6">
                    <div class="k_form_group position-relative">
                      <label for="" class="date_label">{{
                        $t("projects.project_form.placeholder.from")
                      }}</label>
                      <Datepicker
                        class="project_date_picker custom_label"
                        v-model="date"
                        placeholder="dd/mm/yyyy"
                      ></Datepicker>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="k_form_group position-relative">
                      <label for="" class="date_label">{{
                        $t("projects.project_form.placeholder.to")
                      }}</label>
                      <Datepicker
                        class="project_date_picker custom_label"
                        placeholder="dd/mm/yyyy"
                      ></Datepicker>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <button
                  @click="addMoreCareerInformation"
                  class="btn_add_multiple btn-transaprent"
                >
                  add More
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer invite_modal_footer">
          <button
            type="button"
            class="btn btn-light btn-set"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import Multiselect from "@vueform/multiselect";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  data() {
    return {
      modal: null,
      from: "From",
      to: "To",
      date: new Date(),
      invitation_id: undefined,
      carreerForm: [
        {
          company: "",
          position: "",
          industry: "",
          seniority_level: "",
          department: "",
        },
      ],
    };
  },
  components: {
    Multiselect,
    Datepicker,
  },
  validations: {
    carreerForm: {
      company: { required },
      position: { required },
      industry: { required },
      department: { required },
      seniority_level: { required },
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.careerModal);
  },
  methods: {
    closeModal() {
      this.modal.hide();
    },
    addMultipleCareer() {
      this.modal.show();
    },
    addMoreCareerInformation() {
      this.carreerForm.push({
        company: "",
        position: "",
        industry: "",
        department: "",
        seniority_level: "",
      });
      console.log("add more", this.carreerForm);
    },
  },
};
</script>

<style lang="scss" scoped>
// modal start
// .custom_label {
//   &::placeholder {
//     color: red;
//     opacity: 1; /* Firefox */
//   }

//   &:-ms-input-placeholder {
//     /* Internet Explorer 10-11 */
//     color: red;
//   }

//   &::-ms-input-placeholder {
//     color: red;
//   }
// }
.date_label {
  position: absolute;
  padding: 8px;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  color: #8f9bb3;
}

.invitation_dialog {
  width: 60%;
}
.invitaion_content {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  text-align: justify;
}
.invite_modal_footer {
  border-top: 0;
  padding: 8px 26px;
}
.invite_header {
  border-bottom: 0;
  padding: 8px 26px;
}
.invitaion_body {
  padding: 0px 26px;
}
.btn_add_multiple {
  text-transform: capitalize;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
}
// modal end
</style>
