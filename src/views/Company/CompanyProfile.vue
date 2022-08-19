<template>
  <div v-if="companyAllInformation">
    <div class="company_profile">
      <div class="comapny_profile_header d-flex m-b-32">
        <div class="company_prof_info">
          <div class="img_wrapper">
            <img
              v-if="companyAllInformation.client_logo"
              :src="
                companyAllInformation.client_logo
                  ? companyAllInformation.client_logo
                  : ''
              "
              class="c_logo_wrapper"
              :alt="companyAllInformation.company"
            />
            <span v-else class="default_logo" style="background: #42aaff">
              <b>{{ formatMemberName(companyAllInformation.company) }}</b>
            </span>
          </div>
          <div class="c_details_wrapper">
            <h4 class="text_heading fs-22 fw-700 m-b-9">
              {{ companyAllInformation.company }}
              <span class="m-l-8 comp_id"> IN 5647234890 </span>
            </h4>
            <div class="d-inline-flex">
              <p class="m-b-0 text_light fs-16 fw-500">
                {{ getTitleById(countryLists, companyAllInformation.country) }}
              </p>
              <p class="m-b-0 text_light fs-16 street_address fw-500">
                Address Street Number
              </p>
              <span class="ph_no"
                ><span class="text_light_code m-r-2">
                  <span>(+</span>{{ companyAllInformation.country_code }}
                  <span>)</span> </span
                >{{ companyAllInformation.phonenumber }}</span
              >
            </div>
          </div>
        </div>
        <div
          class="c_actions"
          v-if="companyAllInformation.edit_company_details"
        >
          <div class="">
            <button
              class="
                btn btn-light
                d-inline-flex
                justify-content-center
                kh-40
                kw-40
                zp-10
                m-r-13
              "
            >
              <img src="icons/printer.svg" class="print_icon kw-20" alt="" />
            </button>
          </div>
          <div class="">
            <!--  -->
            <button
              type="button"
              @click="editCompany()"
              class="btn btn-primary btn_size"
            >
              <img
                src="K_Icons/edit_white.svg"
                class="print_icon kw-20 m-r-8"
                alt=""
              />
              <span class="fs-14 fw-700"
                >{{
                  $t("company_profile.company_tab.company_details.buttons.edit")
                }}
              </span>
            </button>
          </div>
        </div>
      </div>
      <!-- compnay details sec start -->
      <div class="c_page_title m-b-21">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">
          {{
            $t(
              "company_profile.company_tab.company_details.main_headings.About_Company"
            )
          }}
        </h4>
      </div>
      <div class="company_basic_info m-b-15">
        <div class="row">
          <div class="col-lg-3 m-b-26">
            <h4 class="c_base_head">
              {{
                $t(
                  "company_profile.company_tab.company_details.About_Company_lables.Main_Industry"
                )
              }}
              <span class="m-l-9">
                <img src="icons/info.svg" alt="" class="kw-15" />
              </span>
            </h4>
            <h6 class="c_base_value">
              {{ companyAllInformation.main_industry_name }}
            </h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">
              {{
                $t(
                  "company_profile.company_tab.company_details.About_Company_lables.Sub_Industry"
                )
              }}
              <span class="m-l-9">
                <img src="icons/info.svg" alt="" class="kw-15" />
              </span>
            </h6>
            <h6 class="c_base_value">
              {{ companyAllInformation.sub_industry_name }}
            </h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">
              {{
                $t(
                  "company_profile.company_tab.company_details.About_Company_lables.Detailed_Industry"
                )
              }}
              <span class="m-l-9">
                <img src="icons/info.svg" alt="" class="kw-15" />
              </span>
            </h6>
            <h6 class="c_base_value">
              {{ companyAllInformation.detailed_industry_name }}
            </h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">
              {{
                $t(
                  "company_profile.company_tab.company_details.About_Company_lables.Legal_Form_of_Corporation"
                )
              }}
            </h6>
            <h6 class="c_base_value">
              {{
                getTitleById(
                  legalCorpLists,
                  companyAllInformation.corporation_legal_form
                )
              }}
            </h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">
              {{
                $t(
                  "company_profile.company_tab.company_details.About_Company_lables.Region"
                )
              }}
            </h6>
            <h6 class="c_base_value">
              {{ getTitleById(regionLists, companyAllInformation.region) }}
            </h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">
              {{
                $t(
                  "company_profile.company_tab.company_details.About_Company_lables.Revenu_Total"
                )
              }}
            </h6>
            <h6 class="c_base_value">
              <span>
                {{
                  companyAllInformation.currency_symbol
                    ? companyAllInformation.currency_symbol
                    : "$"
                }}
              </span>
              {{ companyAllInformation.total_revenue }}
            </h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h4 class="c_base_head">
              {{
                $t(
                  "company_profile.company_tab.company_details.About_Company_lables.Currency"
                )
              }}
              <span class="m-l-9">
                <img src="icons/info.svg" alt="" class="kw-15" />
              </span>
            </h4>
            <h6 class="c_base_value">
              {{
                companyAllInformation.currency_name
                  ? companyAllInformation.currency_name
                  : "USD"
              }}
            </h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <CustomRateModal>
              <template v-slot:exchange-rate-button>
                <a class="primary-link link_edit">{{
                  $t("company_profile.company_tab.company_details.buttons.edit")
                }}</a>
              </template>
            </CustomRateModal>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">Country</h6>
            <h6 class="c_base_value">
              {{ getTitleById(regionLists, companyAllInformation.region) }}
            </h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">Economic Region</h6>
            <h6 class="c_base_value">
              <span>
                {{
                  companyAllInformation.currency_symbol
                    ? companyAllInformation.currency_symbol
                    : "$"
                }}
              </span>
              {{ companyAllInformation.total_revenue }}
            </h6>
          </div>
        </div>
      </div>
      <!-- company_detail ends -->
      <!-- employee sec start -->
      <div class="c_page_title m-b-20">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">
          {{
            $t(
              "company_profile.company_tab.company_details.main_headings.Employees"
            )
          }}
        </h4>
      </div>
      <div class="emloyees_wrap m-b-24">
        <div class="custom_grid g-0">
          <CompanyInfo />

          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Employees_lables.TOTAL_EMPLOYEE_INTERNAL"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.employees.internal_employee }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Employees_lables.TOTAL_EMPLOYEE_CONTRACTED"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.employees.contracted_employee }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Employee sec ends -->
      <!-- Fte Section start -->
      <div class="c_page_title m-b-20">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">
          {{
            $t("company_profile.company_tab.company_details.main_headings.FTE")
          }}
          <span class="m-l-8">
            <img src="icons/info.svg" alt="" class="kw-17" />
          </span>
        </h4>
      </div>
      <div class="emloyees_wrap m-b-24">
        <div class="custom_grid">
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.FTE_lables.TOTAL_FTE"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.fte.total_fte }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.FTE_lables.FTE_INHOUSE"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.fte.total_fte }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.FTE_lables.FTE_CONTRACTED"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.fte.contracted_fte }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Fte Section End -->
      <!-- Spending sec start  -->
      <div class="c_page_title m-b-20">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">
          {{
            $t(
              "company_profile.company_tab.company_details.main_headings.Spending"
            )
          }}
        </h4>
      </div>
      <div class="emloyees_wrap m-b-24">
        <div class="custom_grid">
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.TOTAL_SPENDING"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.total_spending }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.OPEX"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.opex }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.CAPEX"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.capex }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.INHOUSE"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.inhousing }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.CONTRACTED"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.contracted }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.OUTSOURCED"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.outsourced }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.SERVIVE"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.survive }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.EXPAND"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.expand }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.TRANSFORM"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.transform }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.DIGITALIZATION_SPENDING"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.digitalization_spending }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_lables.NON_DIGITALIZATION_SPENDING"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending.non_digitalization_spending }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Spending sec ends  -->
      <!-- Spending ON sec start  -->
      <div class="c_page_title m-b-20">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">
          {{
            $t(
              "company_profile.company_tab.company_details.main_headings.Spending_on"
            )
          }}
        </h4>
      </div>
      <div class="emloyees_wrap m-b-24">
        <div class="custom_grid">
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.MANAGEMENT_OVERHEAD"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.management }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.MARKETING"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.marketing }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.SALES_AFTER_SELES"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.sales }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.PRODUCTION"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.production }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.SOURCING_LOGIDTICS"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.sourcing }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.RESEARCH_MANAGEMENT"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.research }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.LEGAL"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.legal }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.FINANCE_CONTROLING"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.finance_controlling }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.HR"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.hr }}
              </h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Spending_on_lables.IT"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.spending_on.it }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Spending ON sec ends  -->
    </div>
  </div>
</template>

<script>
const tablist = [
  {
    tabId: 0,
    title: "Company",
    pageUrl: "company-member",
  },
  {
    tabId: 1,
    title: "Member",
    pageUrl: "company-member",
  },
];
import CompanyInfo from "./components/CompanyInfoTile.vue";
import CustomRateModal from "./components/CustomRateModal.vue";
import {
  getFirstLetter,
  getlabelValue,
  setRandomBackground,
} from "../../utils/commonHelperFuntions";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      tablist,
      // staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      currency: undefined,
    };
  },

  components: {
    CompanyInfo,
    CustomRateModal,
  },

  created() {
    // on page load get all currency, main industry, legal form of incorporation and regions list
    this.$store.dispatch("GET_ALL_CURRENCY");
    this.$store.dispatch("GET_MAIN_INDUSTRIES");
    this.$store.dispatch("GET_ALL_LEGAL_FORM_CORPORATION");
    this.$store.dispatch("GET_ALL_REGION");
    this.getCountries();
    this.getCompanyInformation();
  },
  mounted() {
    this.getCompanyInformation();
  },

  computed: {
    // vuex getter variables
    ...mapGetters({
      staffData: "staffDataLocal", // get auth token from local storage
      companyAllInformation: "companyData", //get company information
      industryLists: "mainIndustries",
      subIndustryLists: "subIndustries",
      detailedIndustryLists: "detailIndustries",
      legalCorpLists: "allLegalFormCorporation",
      countryLists: "allCountries",
      regionLists: "allRegion",
      currencyLists: "allCurrency",
    }),
  },

  methods: {
    // get member name format
    formatMemberName(str) {
      return getFirstLetter(str);
    },
    // get background Color
    getBgColor() {
      return setRandomBackground();
    },
    getTitleById(givenArr, id) {
      return getlabelValue(givenArr, id);
    },

    // edit company details
    editCompany() {
      this.$router.push({ name: "company-profile-edit" });
    },

    // get company all informations
    getCompanyInformation() {
      this.$store.dispatch("CAMPNAY_PROFILE_DATA", {
        auth_token: this.staffData.auth_token,
      });
    },

    // get sub Industry list when main industry changed
    onChangeMainIndustry(id) {
      this.$store.dispatch("GET_SUB_INDUSTRIES", id);
    },

    // get detailed industry when sub Industry changed
    onChangeSubIndustry(id) {
      this.$store.dispatch("GET_DEATAIL_INDUSTRIES", id);
    },

    // get list of countries

    getCountries(id) {
      this.$store.dispatch("GET_COUNTRIES", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.comp_id {
  font-weight: 500;
  font-size: 18px;
  line-height: 16px;
  color: rgba(121, 0, 216, 0.5);
}
.default_logo {
  justify-content: center;
  align-content: center;
  display: inline-flex;
  line-height: 4rem;
  width: 4rem;
  height: 4rem;
  border-radius: 4px;
  b {
    font-weight: bold;
    font-size: 22px;
    line-height: 4rem;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
}
.c_logo_wrapper_default {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: block;
  text-align: center;
  background-color: #222b45;
}
.street_address {
  margin-left: 20px;
}
.ph_no {
  margin-left: 20px;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  .text_light_code {
    color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    line-height: 22px;
  }
}
.icon_wrapper {
  margin-right: 11px;
}
.bg_light_yellow {
  background-color: #fff4e5;
  position: relative;
}
.icon_name {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.bg_light {
  background-color: #f7f9fc;
}
.comapny_profile_header {
  justify-content: space-between;
  .c_actions {
    display: flex;
  }
}
.info_title {
  font-size: 12px;
  font-weight: 700;
  color: #8f9bb3;
  text-transform: uppercase;
  vertical-align: middle;
  line-height: normal;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 28px;
}
.info_value {
  font-size: 20px;
  font-weight: 700;
  color: #222b45;
  margin-bottom: 0;
}
.link_edit {
  font-style: italic;
  font-size: 14px;
  font-weight: 300;
}
.c_base_head {
  font-size: 14px;
  font-weight: 500;
  color: #8f9bb3;
  margin-bottom: 10px;
}
.c_base_value {
  font-size: 15px;
  font-weight: 500;
  color: #222b45;
  margin-bottom: 0;
}
.btn_size {
  width: 100%;
}
.company_profile {
  background-color: #ffffff;
  padding: 22px 24px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
}
.company_prof_info {
  display: inline-flex;
  .c_details_wrapper {
    h4 {
    }
  }
  .img_wrapper {
    margin-right: 20px;
  }
}
.c_logo_wrapper {
  width: 64px;
  height: 64px;
  border-radius: 4px;
}
</style>
