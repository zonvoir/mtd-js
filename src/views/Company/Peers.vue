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
            <div
              class="industries_info_wraper"
              v-for="(industry, idx) in industriesInformation"
              :key="idx"
            >
              <div class="row">
                <div class="col-lg-6">
                  <div class="k_form_group k_select_single">
                    <Dropdown
                      class="k_prime_inp_select"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="
                   Select industry
                  "
                      :options="industryLists"
                      @select="onChangeMainIndustry"
                      v-model="industry.main_industry"
                    />
                    <!-- <Multiselect
                      placeholder="Industry"
                      class="form-control k_inp_field"
                      rules="required"
                      :options="industryLists"
                      @select="onChangeMainIndustry"
                      v-model="industry.main_industry"
                    /> -->
                    <!-- @blur="v$.peerForm.main_industry.$touch"
                  :class="{
                    'is-invalid': v$.peerForm.main_industry.$error,
                  }"
                <div
                  v-if="v$.peerForm.main_industry.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.peerForm.main_industry.required.$invalid"
                    class="text-left fs-14"
                  >
                    Industry is required
                  </span>
                </div> -->
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="k_form_group k_select_single">
                    <Dropdown
                      class="k_prime_inp_select"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Sub Industry"
                      :options="subIndustryLists"
                      rules="required"
                      v-model="industry.sub_industry"
                    />
                    <!-- <Multiselect
                      placeholder="Sub Industry"
                      class="form-control k_inp_field"
                      :options="subIndustryLists"
                      rules="required"
                      v-model="industry.sub_industry"
                    /> -->
                    <!-- @blur="v$.peerForm.sub_industry.$touch"
                  :class="{
                    'is-invalid': v$.peerForm.sub_industry.$error,
                  }"
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
                </div> -->
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="k_form_group k_select_single">
                    <Dropdown
                      class="k_prime_inp_select"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Detailed Industry"
                      :options="detailedIndustryLists"
                      rules="required"
                      v-model="industry.detailed_industry"
                    />
                    <!-- <Multiselect
                      class="form-control k_inp_field"
                      placeholder="Detailed Industry"
                      :options="detailedIndustryLists"
                      rules="required"
                      v-model="industry.detailed_industry"
                    /> -->
                    <!-- @blur="v$.peerForm.detailed_industry.$touch"
                  :class="{
                    'is-invalid': v$.peerForm.detailed_industry.$error,
                  }"
                <div
                  v-if="v$.peerForm.detailed_industry.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.peerForm.detailed_industry.required.$invalid"
                    class="text-left fs-14"
                  >
                    Detailed Industry is required
                  </span>
                </div> -->
                  </div>
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
  <!-- checking custom select -->
  <!-- {{ selectedCountry }}
  <Dropdown
    v-model="selectedCountry"
    :options="countries"
    optionLabel="name"
    class="k_prime_inp_select"
    placeholder="Select a Country"
  >
    <template #value="slotProps">
      <div class="company-item company-item-value" v-if="slotProps.value">
        <img
          class="img_logo"
          src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
        />
        <span class="company_item_name">{{ slotProps.value.name }}</span>
      </div>
    </template>
    <template #option="slotProps">
      <div class="company-item">
        <img
          class="img_logo"
          src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
        />
        <span class="company_item_name">{{ slotProps.option.name }}</span>
      </div>
    </template>
  </Dropdown> -->
</template>

<script>
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import CommonService from "../../Services/CommonService";
import Dropdown from "primevue/dropdown";

export default {
  components: {
    Dropdown,
  },

  data() {
    return {
      isSubmitted: false,
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      industriesInformation: [
        {
          main_industry: "",
          sub_industry: "",
          detailed_industry: "",
        },
      ],
      industryLists: [],
      regionLists: [],
      subIndustryLists: [],
      detailedIndustryLists: [],
      selectedCountry: null,
      countries: [
        { name: "Australia", code: "AU" },
        { name: "Brazil", code: "BR" },
        { name: "China", code: "CN" },
        { name: "Egypt", code: "EG" },
        { name: "France", code: "FR" },
        { name: "Germany", code: "DE" },
        { name: "India", code: "IN" },
        { name: "Japan", code: "JP" },
        { name: "Spain", code: "ES" },
        { name: "United States", code: "US" },
      ],
      companySize: [
        { label: "100", value: "100" },
        { label: "200", value: "200" },
        { label: "300", value: "300" },
      ],
      // "India", "France", "Italy"
      countryLists: [],
      peerForm: {
        auth_token: "",
        company_size: null,
        country: null,
        main_industry: null,
        sub_industry: null,
        region: null,
        detailed_industry: null,
      },
      // industry: null,
      // sub_industry: null,
    };
  },
  created() {
    this.getIndustryList();
    this.getRegions();
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
        // main_industry: { required },
        // sub_industry: { required },
        // detailed_industry: { required },
        region: { required },
        company_size: { required },
      },
    };
  },
  methods: {
    addMoreIndustries() {
      console.log("add new Industries");
      this.industriesInformation.push({
        main_industry: "",
        sub_industry: "",
        detailed_industry: "",
      });
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
        company_size: "",
        country: "",
        main_industry: "",
        sub_industry: "",
        region: "",
        detailed_industry: "",
      };
      // this.$router.push({ name: "company-profile-edit" });
    },
    // get Country list
    getCountries(id) {
      console.log("data country");
      CommonService.getAllCountry(id).then((resp) => {
        if (resp.data.status) {
          for (var i = 0; i < resp.data.data.length; i++) {
            let countries = {
              value: resp.data.data[i].country_id,
              label: resp.data.data[i].short_name,
            };
            this.countryLists.push(countries);
          }
          console.log("country industry", this.countryLists);
        } else {
          this.countryLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
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
    // get detailed Industry lists
    getDetailedIndustryList() {
      CommonService.getAllDetailedIndustries(this.peerForm.sub_industry).then(
        (resp) => {
          if (resp.data.status) {
            for (var i = 0; i < resp.data.data.length; i++) {
              let detailIndus = {
                value: resp.data.data[i].id,
                label: resp.data.data[i].name,
              };
              this.detailedIndustryLists.push(detailIndus);
            }
            // this.detailedIndustryLists = resp.data.data;
            console.log("detailed industry", this.detailedIndustryLists);
          } else {
            this.detailedIndustryLists = [
              { value: 0, label: "No record found", disabled: true },
            ];
          }
        }
      );
    },
    onChangeMainIndustry() {
      console.log("sub Industry", this.peerForm.main_industry);
      this.getSubIndustryList(this.peerForm.main_industry);
    },
    onChangeSubIndustry() {
      console.log("Detail Industry", this.peerForm.sub_industry);
      this.getDetailedIndustryList(this.peerForm.sub_industry);
    },
    onChangeRegion() {
      console.log("Detail Country", this.peerForm.region);
      this.getCountries(this.peerForm.region);
    },
    deselectRegion() {
      this.countryLists = [];
    },
    // get Sub Industry lists
    getSubIndustryList(id) {
      CommonService.getAllSubIndustries(id).then((resp) => {
        if (resp.data.status) {
          console.log("get all data", resp.data);
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
    getRegions() {
      CommonService.getAllRegion().then((resp) => {
        if (resp.data.status) {
          console.log("all regions", resp.data.data);
          for (var i = 0; i < resp.data.data.length; i++) {
            let regions = {
              value: resp.data.data[i].id,
              label: resp.data.data[i].region_name,
            };
            this.regionLists.push(regions);
          }
        } else {
          this.regionLists = [
            { value: 0, label: "No record found", disabled: true },
          ];
        }
      });
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
