<template>
  <div>
    <div class="form_container m-b-20">
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
        <form action="">
          <div class="row">
            <div class="col-lg-6">
              <div class="k_form_group k_select_single">
                <Dropdown
                  class="k_prime_inp_select"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="
                   Country/region
                  "
                  :options="countryLists"
                  v-model="peerForm.country"
                  @blur="v$.peerForm.country.$touch"
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
                <Dropdown
                  class="k_prime_inp_select"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Comapny size"
                  :options="companySize"
                  rules="required"
                  v-model="peerForm.company_size"
                  @blur="v$.peerForm.company_size.$touch"
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
                    Company size is required
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div
              class="industries_info_wraper"
              v-for="(industry, idx) in industriesInformation"
              :key="idx"
            >
              <PeerIndustry
                @addNewIndustry="addIndustry"
                ref="childIndustry"
                :industryForm="industry"
              />
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
              @click="savePeerInfo"
              type="button"
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
// import CommonService from "../../Services/CommonService";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import PeerIndustry from "./PeerIndustryForm.vue";
export default {
  components: {
    Dropdown,
    PeerIndustry,
  },

  data() {
    return {
      isSubmitted: false,
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      newIndArr: [],
      industriesInformation: [
        {
          main_industry: "",
          sub_industry: "",
          detailed_industry: "",
        },
      ],
      selectedCountry: null,

      companySize: [
        { label: "100", value: "100" },
        { label: "200", value: "200" },
        { label: "300", value: "300" },
      ],
      peerForm: {
        auth_token: "",
        company_size: null,
        country: null,
        industrArr: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      countryLists: "allCountries",
    }),
  },
  created() {
    this.$store.dispatch("GET_COUNTRIES");
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
        company_size: { required },
      },
    };
  },
  methods: {
    addMoreIndustries() {
      console.log("ref", this.$refs.childIndustry.validationIndustry());
      if (this.$refs.childIndustry.validationIndustry()) {
        this.industriesInformation.push({
          main_industry: "",
          sub_industry: "",
          detailed_industry: "",
        });
      }
    },

    addIndustry(val) {
      console.log("get data", val.newIndustry, val.newIndustry.length);
      // if (val.newIndustry.length) {
      this.newIndArr.push(val.newIndustry);
      // }
    },

    savePeerInfo() {
      this.$refs.childIndustry.validationIndustry();
      this.peerForm.industrArr = [...this.newIndArr];
      this.v$.$touch();
      if (!this.v$.$invalid) {
        console.log("company data", this.peerForm);
        this.formReset();
      }
    },
    formReset() {
      this.v$.$reset();
      this.peerForm = {
        company_size: "",
        country: "",
      };
      this.industriesInformation = [
        {
          main_industry: "",
          sub_industry: "",
          detailed_industry: "",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.company-item {
  display: flex;
  align-items: center;
  .img_logo {
    width: 30px;
  }
  .company_item_name {
    margin-left: 5px;
  }
}
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
