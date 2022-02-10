<template>
  <!-- {{ companyAllInformation }} -->
  <div>
    <div class="company_profile">
      <div class="comapny_profile_header d-flex m-b-32">
        <div class="company_prof_info">
          <div class="img_wrapper">
            <img
              v-if="companyAllInformation.company_logo"
              :src="
                companyAllInformation.company_logo
                  ? companyAllInformation.company_logo
                  : ''
              "
              class="c_logo_wrapper"
              :alt="companyAllInformation.company"
            />
            <span
              v-else
              class="default_logo"
              :style="{ background: getBgColor() }"
            >
              <b>{{ formatMemberName(companyAllInformation.company) }}</b>
            </span>
          </div>
          <div class="c_details_wrapper">
            <h4 class="text_heading fs-22 fw-700 m-b-9">
              {{ companyAllInformation.company }},<span class="m-l-4">
                {{ companyAllInformation.incorporation_year }}
              </span>
            </h4>
            <div class="d-inline-flex">
              <p class="m-b-0 text_light fs-16 fw-500">
                {{ companyAllInformation.country }}
              </p>
              <span class="ph_no"
                ><span class="text_light_code m-r-2">
                  <span>(+</span>{{ companyAllInformation.calling_code }}
                  <span>)</span> </span
                >{{ companyAllInformation.phonenumber }}</span
              >
            </div>
          </div>
        </div>
        <div class="c_actions">
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
            <button
              type="button"
              @click="editCompany(companyAllInformation.company_id)"
              class="btn btn-primary btn_size"
            >
              <img
                src="K_Icons/edit_white.svg"
                class="print_icon kw-20 m-r-8"
                alt=""
              />
              <span class="fs-14 fw-700">{{
                $t("company_profile.company_tab.company_details.buttons.edit")
              }}</span>
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
              {{ companyAllInformation.corporation_legal_form }}
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
              {{ companyAllInformation.region }}
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
            <h6 class="c_base_head" @click="openCustomModal">
              {{
                $t(
                  "company_profile.company_tab.company_details.About_Company_lables.custom_rate"
                )
              }}
              <a class="primary-link link_edit">{{
                $t("company_profile.company_tab.company_details.buttons.edit")
              }}</a>
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
          <!-- <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">
                {{
                  $t(
                    "company_profile.company_tab.company_details.Employees_lables.TOTAL_EMPLOYEE"
                  )
                }}
              </h6>
              <h1 class="info_value">
                {{ companyAllInformation.employees.total_employee }}
              </h1>
            </div>
          </div> -->
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
      <div class="modal-content modal_body">
        <div class="modal-body">
          <div class="from_wrapper">
            <form action="">
              <div class="k_form_group k_select_single">
                <label for="" class="m-b-10 fs-20 text_heading fw-700">
                  Currency & Exchange Rates, 2020</label
                >
                <Multiselect
                  class="form-control k_inp_field m-b-16"
                  rules="required"
                  :options="currencyLists"
                />
              </div>
              <div class="k_form_groups">
                <label for="" class="m-b-10 fs-20 text_heading fw-700">
                  Standard Exchange Rates</label
                >
                <p class="custom_exchange p-b-30">1 BGN = 0.5100 EUR</p>
                <p class="custom_exchange p-b-26">1 BGN = 0.6000 USD</p>
              </div>
              <div class="k_form_groups">
                <label for="" class="m-b-10 fs-20 text_heading fw-700">
                  Custom Exchange Rates</label
                >
                <div class="exchange_wrap m-b-20">
                  <div class="currecy_from m-r-20">
                    <p class="custom_exchange">1 BGN =</p>
                  </div>
                  <div class="currency_amount m-r-20">
                    <input type="text" class="form-control kk_input_field" />
                  </div>
                  <div class="currency_to">
                    <p class="custom_exchange">EUR</p>
                  </div>
                </div>
                <div class="exchange_wrap p-b-20">
                  <div class="currecy_from m-r-20">
                    <p class="custom_exchange">1 BGN =</p>
                  </div>
                  <div class="currency_amount m-r-20">
                    <input type="text" class="form-control kk_input_field" />
                  </div>
                  <div class="currency_to">
                    <p class="custom_exchange">USD</p>
                  </div>
                </div>
                <!-- alert -->
                <div class="alert_wrapper d-flex m-b-40">
                  <div class="icon_wrapper">
                    <div class="bg_alert_circle"></div>
                    <div class="bg_alert_icon bg_light_yellow">
                      <img
                        src="K_Icons/alert_yellow.svg"
                        class="icon_name"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="alert_message">
                    <p class="custom_exchange">With the values above</p>
                    <p class="custom_exchange">1000 BGN = 510 EUR</p>
                    <p class="custom_exchange">1000 BGN = 620 USD</p>
                  </div>
                </div>
                <div class="modal_action_btn">
                  <div class="btns_wrap">
                    <button
                      class="btn btn-light btn-set m-r-20"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      :disabled="isSubmitted"
                      type="submit"
                      class="btn btn-primary btn-set"
                    >
                      <div
                        v-if="isSubmitted"
                        class="spinner-border text-light"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      <span v-else data-bs-dismiss="modal"> Save </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
// import TabsHr from "../../components/Shared/TabsHr.vue";
import Multiselect from "@vueform/multiselect";
import CompanyInfo from "./components/CompanyInfoTile.vue";
import { Modal } from "bootstrap";
import companyService from "../../Services/Company/CompanyService";
import {
  getFirstLetter,
  setRandomBackground,
} from "../../utils/commonHelperFuntions";

export default {
  components: {
    CompanyInfo,
    Multiselect,
  },
  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
  created() {
    this.getCompanyInformation();
  },
  data() {
    return {
      tablist,
      companyAllInformation: undefined,
      currencyLists: [
        { value: 1, label: "BGN" },
        { value: 2, label: "EUR" },
        { value: 3, label: "USD" },
      ],
    };
  },
  methods: {
    // get member name format
    formatMemberName(str) {
      return getFirstLetter(str);
    },
    // get member name format
    getBgColor() {
      return setRandomBackground();
    },
    openCustomModal() {
      this.modal.show();
    },
    editCompany(id) {
      console.log("cliked company", id);
      this.$router.push({ name: "company-profile-edit" });
    },
    getCompanyInformation() {
      companyService.companyDetails().then((res) => {
        if (res.data.status) {
          this.companyAllInformation = res.data.data;
          console.log("all company details", this.companyAllInformation);
        } else {
          let $th = this;
          if ("error" in res.data) {
            Object.keys(res.data.error).map(function (key) {
              $th.$toast.error(res.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          } else {
            $th.$toast.error(res.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.default_logo {
  justify-content: center;
  align-content: center;
  display: inline-flex;
  line-height: 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  b {
    font-weight: bold;
    font-size: 16px;
    line-height: 2.5rem;
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
.exchange_wrap {
  display: flex;
  align-items: center;
  .currency_amount {
    margin-right: 20px;
  }
  .currency_from {
    width: 10%;
    margin-right: 20px;
    margin-right: 20px;
  }
  .currency_to {
    width: 10%;
    margin-right: 20px;
    margin-right: 20px;
  }
}
.custom_exchange {
  font-size: 15px;
  font-weight: 400;
  color: #8f9bb3;
  margin-bottom: 0;
}
.modal_body {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  width: 400px;
  height: 600px;
}
.modal-body {
  padding: 28px 24px;
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
  // margin-bottom: 13px;
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
