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
          <!-- <div class="team_wrapper m-b-20">
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
          </div> -->
          <!-- career form start here -->

          <div class="from_container">
            <form @submit.prevent="saveCarreerInfo" action="">
              <div v-for="(career, idx) in carreerForm" :key="idx" class="">
                <div
                  class="
                    m-b-24
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <h4 class="m-t-0 title-dark">Add Carreer Information</h4>
                  <button
                    @click="removeForm(idx)"
                    class="btn-danger btn-set btn"
                  >
                    Remove
                  </button>
                </div>
                <career-form
                  :ref="'childCareer' + idx"
                  @isFormValid="checkFormValidation"
                  @addNewCareer="isCareerFilled"
                  :className="'col-lg-12'"
                  :myCareer="career"
                  :departments="departments"
                  :industries="industry"
                  :seniority="seniority_level"
                />
              </div>
              <div class="">
                <button
                  type="button"
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
            @click="saveData"
            type="button"
            class="btn btn-primary btn-set"
          >
            Done
          </button>
          <button
            @click="resetCareer"
            type="button"
            class="btn btn-light btn-set"
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
// import Multiselect from "@vueform/multiselect";
// import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import CareerForm from "../../views/Auth/CareerForm.vue";
export default {
  emits: ["multiCareer"],
  props: {
    departments: {
      required: true,
      type: Array,
    },
    industry: {
      required: true,
      type: Array,
    },
    seniority_level: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      modal: null,
      from: "From",
      to: "To",
      // emitedValidation: undefined,
      multifrom: false,
      newAddedCareer: [],
      invitation_id: undefined,
      carreerForm: [
        {
          company: "",
          position: "",
          industry: "",
          seniority_level: "",
          department: [],
        },
      ],
    };
  },
  components: {
    CareerForm,
    // Multiselect,
    // Datepicker,
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
    resetCareer() {
      this.v$.$reset();
      this.carreerForm = {
        company: "",
        position: "",
        industry: null,
        invitation_id: null,
        seniority_level: null,
        department: [],
      };
      this.modal.hide();
    },
    // checkFormValidation(value) {
    //   this.emitedValidation = value;
    // },
    addMultipleCareer() {
      this.newAddedCareer = [];
      this.modal.show();
      this.multifrom = true;
    },
    isCareerFilled(value) {
      if (value && Object.keys(value).length != 0) {
        this.newAddedCareer.push(value.newCareer);
        console.log("career array ", this.newAddedCareer);
      }
    },
    removeForm(id) {
      console.log(id);
      console.log(
        this.carreerForm,
        this.carreerForm.splice(id, 1),
        this.carreerForm
      );
    },
    saveData() {
      this.v$.$touch();
      let data = [];
      let dataResp = [];
      this.carreerForm.forEach((val, indx) => {
        dataResp[indx] = this.$refs["childCareer" + indx].validateForm();

        console.log(dataResp);
        // console.log(this.$refs["childCareer" + indx], val, indx);
        data.push(val);
      });

      if (!dataResp.includes(false)) {
        this.$emit("multiCareer", {
          newCareer: data,
        });
        this.multifrom = false;
        this.modal.hide();
      }
      // if (!this.v$.$invalid) {
      // }
    },
    addMoreCareerInformation() {
      this.carreerForm.push({
        company: "",
        position: "",
        industry: "",
        department: [],
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
