<template>
  <div class="register_auth_wrapper">
    <div class="">
      <div class="">
        <div class="main-heading-wrap text-center">
          <h2 class="main-heading">Create an account</h2>
          <div class="im-user flex justify-center">
            <span class="para14"> Already have an account?</span>
            <router-link
              target="_blank"
              class="custom-link"
              :to="{ name: 'signup-signin' }"
              >Sign In</router-link
            >
          </div>
        </div>
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="onSubmit" action="">
          <div class="k_form_group">
            <input
              type="text"
              name="firstName"
              @blur="v$.registerForm.firstname.$touch"
              v-model.trim="registerForm.firstname"
              class="form-control k_inp_field"
              placeholder="Firstname"
              :class="{
                'is-invalid': v$.registerForm.firstname.$error,
              }"
            />
            <span
              v-if="v$.registerForm.firstname.$error"
              class="invalid-feedback text-left"
            >
              First Name is required
            </span>
          </div>
          <div class="k_form_group">
            <input
              type="text"
              @blur="v$.registerForm.lastname.$touch"
              v-model.trim="registerForm.lastname"
              class="form-control k_inp_field"
              placeholder="Lastname"
              :class="{
                'is-invalid': v$.registerForm.lastname.$error,
              }"
            />
            <span
              v-if="v$.registerForm.lastname.$error"
              class="invalid-feedback text-left"
            >
              Last Name is required
            </span>
          </div>
          <div class="k_form_group">
            <input
              type="text"
              @blur="v$.registerForm.username.$touch"
              v-model.trim="registerForm.username"
              class="form-control k_inp_field"
              placeholder="Username"
              :class="{
                'is-invalid': v$.registerForm.username.$error,
              }"
            />
            <span
              v-if="v$.registerForm.username.$error"
              class="invalid-feedback text-left"
            >
              Userename is required
            </span>
          </div>
          <div class="k_form_group">
            <input
              :readonly="registerForm.invitation_id != ''"
              type="email"
              @blur="v$.registerForm.email.$touch"
              v-model.trim="registerForm.email"
              class="form-control k_inp_field"
              placeholder="Email"
              :class="{
                'is-invalid': v$.registerForm.email.$error,
              }"
            />
            <div
              v-if="v$.registerForm.email.$errors"
              class="invalid-feedback text-left"
            >
              <span
                v-if="v$.registerForm.email.required.$invalid"
                class="text-left fs-14"
              >
                Email is required
              </span>

              <span
                class="text-left fs-14"
                v-if="v$.registerForm.email.email.$invalid"
                >Email is invalid</span
              >
            </div>
          </div>
          <div class="k_form_group psw_visibilty">
            <input
              ref="refPass"
              :type="passwordFieldType"
              @blur="v$.registerForm.password.$touch"
              v-model.trim="registerForm.password"
              class="form-control k_inp_field"
              placeholder="Password"
              :class="{
                'is-invalid': v$.registerForm.password.$error,
              }"
            />
            <div
              v-if="
                !registerForm.password == '' || v$.registerForm.password.$error
              "
              class="text-danger text-left"
            >
              <div
                class="text-left"
                :class="{
                  'text-success': !v$.registerForm.password.required.$invalid,
                }"
              >
                <span class="fs-14"> Password is required</span>
              </div>
              <div
                :class="{
                  'text-success':
                    !v$.registerForm.password.minimum8CharCalc.$invalid,
                }"
                class="text-left d-flex"
              >
                <span class="fs-14">
                  Strong password must be minimum 8 character</span
                >
              </div>

              <div
                :class="{
                  'text-success':
                    !v$.registerForm.password.upperCaseCalc.$invalid,
                }"
                class="text-left"
              >
                <span class="fs-14">
                  Password must contain uppercase alphabetic characters (e.g.
                  A-Z)</span
                >
              </div>

              <div
                :class="{
                  'text-success':
                    !v$.registerForm.password.lowerCaseCalc.$invalid,
                }"
                class="text-left"
              >
                <span class="fs-14">
                  Password must contain lowerercase alphabetic characters (e.g.
                  a-z)</span
                >
              </div>

              <div
                :class="{
                  'text-success': !v$.registerForm.password.numberCalc.$invalid,
                }"
                class="text-left"
              >
                <span class="fs-14">
                  Password must have at least one numerical character(e.g.
                  0-9)</span
                >
              </div>

              <div
                :class="{
                  'text-success':
                    !v$.registerForm.password.specialCharCalc.$invalid,
                }"
                class="text-left"
              >
                <span class="fs-14">
                  Password must have at least one special character</span
                >
              </div>
            </div>
            <span class="visibilty_btn">
              <button
                @click="switchVisibility"
                type="button"
                class="btn eye_btn btn-white"
              >
                <img :src="visibilityIcon" class="eye_icon" />
              </button>
            </span>
          </div>
          <div class="k_form_group psw_visibilty">
            <input
              :type="passwordFieldType"
              @click="sw"
              @blur="v$.registerForm.confirm_password.$touch"
              v-model.trim="registerForm.confirm_password"
              class="form-control k_inp_field"
              placeholder="Confirm Password"
              :class="{
                'is-invalid': v$.registerForm.confirm_password.$error,
              }"
            />
            <div
              v-if="v$.registerForm.confirm_password.$errors"
              class="invalid-feedback text-left"
            >
              <span
                v-if="v$.registerForm.confirm_password.required.$invalid"
                class="text-left fs-14"
              >
                Confirm Password is required
              </span>

              <span
                class="text-left fs-14"
                v-if="v$.registerForm.confirm_password.sameAsPassword.$invalid"
                >Password does not matched</span
              >
            </div>

            <span class="visibilty_btn">
              <button
                @click="switchVisibility"
                type="button"
                class="btn eye_btn btn-white"
              >
                <img :src="visibilityIcon" class="eye_icon" />
              </button>
            </span>
          </div>
          <div class="k_form_group">
            <div class="check_box_wrapper">
              <label class="k_checkbox check_lable">
                I agree with the
                <a
                  target="_blank"
                  class="custom-link"
                  href="https://www.w3schools.com"
                  >Terms of Service!</a
                >
                <input
                  type="checkbox"
                  :class="{
                    'is-invalid': v$.registerForm.terms_service.$error,
                  }"
                  v-model="registerForm.terms_service"
                  checked="checked"
                />
                <span
                  v-if="v$.registerForm.terms_service.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.registerForm.terms_service.required.$invalid"
                    class="text-left"
                  >
                    Please accept terms and conditions required
                  </span>
                </span>
                <span class="checkmark"></span>
              </label>
            </div>
          </div>

          <div class="k_form_group">
            <div class="check_box_wrapper">
              <label class="k_checkbox check_lable">
                I have read and accept the
                <a
                  target="_blank"
                  class="custom-link"
                  href="https://www.w3schools.com"
                  >Privacy Policy!</a
                >
                <input
                  type="checkbox"
                  v-model="registerForm.privacy_policy"
                  :class="{
                    'is-invalid': v$.registerForm.privacy_policy.$error,
                  }"
                  checked="checked"
                />
                <span class="checkmark"></span>
                <span
                  v-if="v$.registerForm.privacy_policy.$error"
                  class="invalid-feedback text-left"
                >
                  <!-- Please accept privacy and policy reuired -->
                  <span
                    v-if="v$.registerForm.privacy_policy.required.$invalid"
                    class="text-left"
                  >
                    Please accept privacy and policy required
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div class="d-grid space_btn">
            <button
              :disabled="isSubmitted"
              type="submit"
              class="btn k_btn_block btn-primary"
            >
              <div
                v-if="isSubmitted"
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else> Create Account </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    ref="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="verify_email">
            <h2 class="verify_title">
              <strong>Verify your email</strong>
            </h2>
          </div>
          <div class="verify-subtitle q-pb-none">
            <h6 class="">
              We've sent you an email verification link to
              <strong>{{ registeredEmail }}</strong
              ><br />
              Please click that link to verify your email address.
              <br />
              If you don't see it please check it in your
              <strong>spam</strong> folder
            </h6>
          </div>
        </div>
        <div class="modal_action_btn">
          <button
            type="button"
            data-bs-dismiss="modal"
            @click="closeModal"
            class="btn k_btnfs14_w700 btn-primary"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {OK} from "mdue";
import { ref } from "vue";
import { required, email, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { Modal } from "bootstrap";
import signupService from "../../Services/SignupService";
import errorhandler from "../../utils/Error";

// MINIMUM 8 CHARCTER
const minimum8CharCalc = (val) => val.length >= 8;
// for upper case calculation
const upperCaseCalc = (val) => /[A-Z]/.test(val);
// for lower case calculation
const lowerCaseCalc = (val) => /[a-z]/.test(val);
// for numbers
const numberCalc = (val) => /[0-9]/.test(val);
// for special character
const specialCharCalc = (val) => {
  return /[ `!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/.test(val);
};

export default {
  components: {
    // MicrosoftWindows,
    // Check,
  },

  data() {
    return {
      visibilityIcon: "icons/eye-off.svg",
      passwordFieldType: "password",
      registeredEmail: undefined,
      visibility: false,
      isSubmitted: false,
      invitedUserData: undefined,
      registerForm: {
        privacy_policy: false,
        terms_service: false,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        invitation_id: "",
        password: "",
        confirm_password: "",
      },
      modal: null,
    };
  },
  validations() {
    return {
      // $th = this,
      registerForm: {
        privacy_policy: {
          required(val) {
            return val;
          },
        },
        terms_service: {
          required(val) {
            return val;
          },
        },
        firstname: { required },
        lastname: { required },
        username: { required },
        email: { required, email },
        password: {
          required,
          minimum8CharCalc,
          upperCaseCalc,
          lowerCaseCalc,
          numberCalc,
          specialCharCalc,
        },
        confirm_password: {
          required,
          sameAsPassword: sameAs(this.registerForm.password),
        },
      },
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
    // this.invitedUserData = JSON.parse(
    //   localStorage.getItem("bWFInpvitedbpbUser")
    // );
    this.invitedUserData = JSON.parse(
      localStorage.getItem("bWFInpvitedbpbUser")
    );
    if (this.invitedUserData && Object.keys(this.invitedUserData).length != 0) {
      this.registerForm.email = this.invitedUserData.email;
      this.registerForm.invitation_id = this.invitedUserData.invitation_id;
    }
    // console.log("user is email ", invitedStaff.email);
  },
  created() {
    let invitedStaffData = this.$route.query;
    console.log("invited data", invitedStaffData);
    if (invitedStaffData && Object.keys(invitedStaffData).length != 0) {
      console.log("invited user is awailble");
      invitedStaffData.departments = invitedStaffData.departments.split(",");
      console.log("user is Invited data", invitedStaffData);
      localStorage.setItem(
        "bWFInpvitedbpbUser",
        JSON.stringify(invitedStaffData)
      );
    }
    // let deparments = this.$route.query.departments;
    // console.log("data in route", deparments, this.$route.query.departments);
    // let Arr = deparments.split(",");
    // getTokenFromUrl() {
    // if ( != null) {
    //   this.verifyEmail(this.$route.query.token);
    // }
    // this.getTokenFromUrl();
  },
  setup() {
    return {
      isPwd: ref(true),
      v$: useVuelidate(),
    };
  },
  methods: {
    onSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.isSubmitted = true;
        console.log(this.registerForm);
        signupService
          .create(this.registerForm)
          .then((response) => {
            if (response.data.status) {
              console.log("regitration respponse", response.data.data);
              this.registeredEmail = response.data.data.email;
              this.$toast.success(response.data.message, {
                position: "bottom-left",
                duration: 3712,
              });

              if (this.invitedUserData === null) {
                this.modal.show();
              } else {
                sessionStorage.setItem(
                  "OiJKV1QiLCJhbGciOiJIUzI1",
                  JSON.stringify(response.data.data)
                );
                this.$router.push({ name: "signup-career" });
                console.log("userSata");
              }
              this.formReset();
            } else {
              errorhandler(response, this);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isSubmitted = false;
          });
      }
    },
    formReset() {
      this.v$.$reset();
      this.registerForm = {
        privacy_policy: false,
        terms_service: false,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        invitation_id: "",
      };
    },
    closeModal() {
      this.modal.hide();
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility
        ? "icons/eye.svg"
        : "icons/eye-off.svg";
      // this.visibilityIcon = this.visibility
      //   ? "img/eye.77c3e01f.svg"
      //   : "img/eye-off.ac4fa589.svg";
    },
  },
};
</script>

<style lang="scss" scoped>
.modal_action_btn {
  text-align: right;
  padding: 0 16px 16px 16px;
}
.verify_email {
  .verify_title {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 40px;
    color: #222b45;
  }
}

.verify-subtitle {
  padding-bottom: 0 !important;
}
</style>
