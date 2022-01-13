<template>
  <div>
    <div class="form_container">
      <!-- warn section start -->
      <div class="alert-notification">
        <div class="img_wrap">
          <div class="icon_name">
            <img src="K_Icons/alert_yellow.svg" alt="" class="" />
          </div>
        </div>
        <div class="m-l-24">
          <h5 class="m-b-0 alert_title">Select peer properties</h5>
          <p class="m-b-0 alert_message">
            In order to compare the company with appropriate competitors, select
            respective industry and company size. The results from the survey
            would be compared to the companies in similar size and industry
          </p>
        </div>
      </div>
      <!-- warn section close -->
      <div class="">
        <form @submit.prevent="savePeerInfo" action="">
          <div class="row">
            <div class="col-lg-6">
              <div class="k_form_group k_select_single">
                <Multiselect
                  placeholder="Select country"
                  class="form-control k_inp_field"
                  rules="required"
                  :options="countryList"
                  @blur="v$.peerForm.country.$touch"
                  v-model="peerForm.country"
                  :class="{
                    'is-invalid': v$.peerForm.country.$error,
                  }"
                />
                <div
                  v-if="v$.peerForm.country.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.peerForm.country.required.$invalid"
                    class="text-left fs-14"
                  >
                    Country is required
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="k_form_group k_select_single">
                <Multiselect
                  class="form-control k_inp_field"
                  rules="required"
                  placeholder="Select company size "
                  :options="companySize"
                  @blur="v$.peerForm.company_size.$touch"
                  v-model="peerForm.company_size"
                  :class="{
                    'is-invalid': v$.peerForm.company_size.$error,
                  }"
                />
                <div
                  v-if="v$.peerForm.company_size.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.peerForm.company_size.required.$invalid"
                    class="text-left fs-14"
                  >
                    Company Size is required
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="k_form_group k_select_single">
                <Multiselect
                  placeholder="Industry"
                  class="form-control k_inp_field"
                  :options="industryLists"
                  rules="required"
                  @select="onChangeMainIndustry"
                  @blur="v$.peerForm.industry.$touch"
                  v-model="peerForm.industry"
                  :class="{
                    'is-invalid': v$.peerForm.industry.$error,
                  }"
                />
                <div
                  v-if="v$.peerForm.industry.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.peerForm.industry.required.$invalid"
                    class="text-left fs-14"
                  >
                    Industry is required
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6"></div>
            <div class="col-lg-6">
              <div class="k_form_group k_select_single">
                <!-- loading="true"
                  delay="5" -->
                <Multiselect
                  placeholder="Sub Industry"
                  class="form-control k_inp_field"
                  :options="subIndustryLists"
                  rules="required"
                  @blur="v$.peerForm.sub_industry.$touch"
                  v-model="peerForm.sub_industry"
                  :class="{
                    'is-invalid': v$.peerForm.sub_industry.$error,
                  }"
                />
                <div
                  v-if="v$.peerForm.sub_industry.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.peerForm.sub_industry.required.$invalid"
                    class="text-left fs-14"
                  >
                    Sub Industry is required
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="k_form_group k_select_single">
                <!-- loading="true"
                  delay="5" -->
                <Multiselect
                  placeholder="Sub Industry"
                  class="form-control k_inp_field"
                  :options="subIndustryLists"
                  rules="required"
                  @blur="v$.peerForm.sub_industry.$touch"
                  v-model="peerForm.sub_industry"
                  :class="{
                    'is-invalid': v$.peerForm.sub_industry.$error,
                  }"
                />
                <div
                  v-if="v$.peerForm.sub_industry.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.peerForm.sub_industry.required.$invalid"
                    class="text-left fs-14"
                  >
                    Sub Industry is required
                  </span>
                </div>
              </div>
            </div>
            <div class="">
              <button
                type="button"
                class="btn btn-set btn-transaprent"
                @click="addMoreIndustries"
              >
                Add more industries
              </button>
            </div>
          </div>

          <div class="btns_wrap">
            <button
              :disabled="isSubmitted"
              type="submit"
              class="btn btn-primary btn-set text-uppercase"
            >
              <div
                v-if="isSubmitted"
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else> save </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Multiselect from "@vueform/multiselect";
import CommonService from "../../Services/CommonService";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      isSubmitted: false,
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      industryLists: [],
      regionLists: [],
      subIndustryLists: [],
      companySize: ["100", "500", "1000"],
      countryList: ["India", "France", "Italy"],
      peerForm: {
        auth_token: "",
        country: null,
        industry: null,
        company_size: null,
        sub_industry: null,
      },
    };
  },
  created() {
    this.getIndustryList();
    // this.getRegions();
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      peerForm: {
        country: { required },
        industry: { required },
        sub_industry: { required },
        company_size: { required },
      },
    };
  },
  methods: {
    addMoreIndustries() {
      console.log("add new Industries");
    },
    savePeerInfo() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        //   return;
        // } else {
        this.peerForm.auth_token = this.staffData.auth_token;
        console.log("company data", this.peerForm);
      }
    },
    formReset() {
      this.v$.$reset();
      this.peerForm = {
        auth_token: "",
        country: null,
        industry: null,
        sub_industry: null,
        company_size: null,
      };
      // this.$router.push({ name: "company-profile-edit" });
    },
    // get Industry lists
    getIndustryList() {
      CommonService.getAllIndustries().then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let industry = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].name,
            };
            this.industryLists.push(industry);
          }
        } else {
          this.industryLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },
    onChangeMainIndustry() {
      console.log("sub Industry", this.peerForm.industry);
      this.getSubIndustryList(this.peerForm.industry);
    },
    onChangeSubIndustry() {
      console.log("Detail Industry", this.peerForm.sub_industry);
      this.getDetailedIndustryList(this.peerForm.sub_industry);
    },
    // get Sub Industry lists
    getSubIndustryList(id) {
      // console.log("sub Industry", this.peerForm.industry);
      CommonService.getAllSubIndustries(id).then((resp) => {
        if (resp.data.status) {
          this.subIndustryLists = [];
          for (var i = 0; i < resp.data.data.length; i++) {
            let subIndustery = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].name,
            };
            this.subIndustryLists.push(subIndustery);
          }
          // this.subIndustryLists = resp.data.data;
          console.log("sub industry", this.subIndustryLists);
        } else {
          this.subIndustryLists = [
            // { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },
    // get regions lists
    // getRegions() {
    //   CommonService.getAllRegion().then((resp) => {
    //     if (resp.data.status) {
    //       for (var i = 0; i < resp.data.data.length; i++) {
    //         let regions = {
    //           value: resp.data.data[i].id,
    //           label: resp.data.data[i].region_name,
    //         };
    //         this.regionLists.push(regions);
    //       }
    //     } else {
    //       this.regionLists = [
    //         { value: 0, label: "No record found", disabled: true },
    //       ];
    //     }
    //   });
    // },
    // get country lists
    getCountries(id) {
      CommonService.getAllCountry(id).then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let countries = {
              value: resp.data.data[i].country_id,
              label: resp.data.data[i].short_name,
            };
            this.countryLists.push(countries);
          }
          // this.countryLists = resp.data.data;
          console.log("country industry", this.countryLists);
        } else {
          this.countryLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form_container {
  background-color: #ffffff;
  padding: 20px 28px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
}
.btn-transaprent {
  &:hover {
    color: #7900d8;
  }
}
.alert-notification {
  display: flex;
  background-color: #fff;
  margin-bottom: 20px;
  .img_wrap {
  }
  .icon_name {
    position: relative;
    background-color: rgba(255, 170, 0, 0.12) !important;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
  }
}
.alert_title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #222b45;
}
.alert_message {
  color: #8f9bb3;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
</style>
