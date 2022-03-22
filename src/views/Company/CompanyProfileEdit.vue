<template>
  <div>
    {{ companyProfileData }}
    <div class="company_profile">
      <CompanyUpdate :companyProfile="companyProfileData" />
      <!-- company_detail ends -->
      <div class="form_wrapper">
        <form action="">
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
              <div class="custom_grid_col m-r-15">
                <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
                  <h6 class="text_light info_title">
                    {{
                      $t(
                        "company_profile.company_tab.company_details.Employees_lables.TOTAL_EMPLOYEE"
                      )
                    }}
                  </h6>
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
                </div>
              </div>
              <div class="custom_grid_col m-r-15">
                <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
                  <h6 class="text_light info_title">
                    {{
                      $t(
                        "company_profile.company_tab.company_details.Employees_lables.TOTAL_EMPLOYEE_INTERNAL"
                      )
                    }}
                  </h6>
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Employee sec ends -->
          <!-- Fte Section start -->
          <div class="c_page_title m-b-20">
            <h4 class="m-b-0 fs-18 fw-700 text-heading">
              {{
                $t(
                  "company_profile.company_tab.company_details.main_headings.FTE"
                )
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="4.1K"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="3.3K"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="3K"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="1K"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="5K"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="2.2K"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="2K"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
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
                  <input
                    type="text"
                    value="220"
                    class="form-control text-center k_input_update_field"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="btns_wrap">
            <button class="btn btn-light btn-set m-r-20">
              {{
                $t("company_profile.company_tab.company_edit.buttons.Cancel")
              }}
            </button>
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
              <span v-else>
                {{
                  $t(
                    "company_profile.company_tab.company_edit.buttons.save_changes"
                  )
                }}
              </span>
            </button>
          </div>
          <!-- Spending ON sec ends  -->
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
      <div class="modal-content modal_body">
        <div class="modal-body">
          <div class="from_wrapper">
            <form action="">
              <div class="k_form_group k_select_single">
                <label for="" class="m-b-10 fs-20 text_heading fw-700">
                  {{
                    $t(
                      "company_profile.company_tab.company_details.custom_rate_modal.lables.Currency_Exchange_Rates"
                    )
                  }}, 2020</label
                >
                <Multiselect
                  class="form-control k_inp_field m-b-16"
                  rules="required"
                  :options="currencyLists"
                />
              </div>
              <div class="k_form_groups">
                <label for="" class="m-b-10 fs-20 text_heading fw-700">
                  {{
                    $t(
                      "company_profile.company_tab.company_details.custom_rate_modal.lables.Standard_Exchange_Rates"
                    )
                  }}</label
                >
                <p class="custom_exchange p-b-30">
                  1
                  {{
                    $t(
                      "company_profile.company_tab.company_details.custom_rate_modal.currency.BGN"
                    )
                  }}
                  = 0.5100
                  {{
                    $t(
                      "company_profile.company_tab.company_details.custom_rate_modal.currency.EUR"
                    )
                  }}
                </p>
                <p class="custom_exchange p-b-26">
                  1
                  {{
                    $t(
                      "company_profile.company_tab.company_details.custom_rate_modal.currency.BGN"
                    )
                  }}
                  = 0.6000
                  {{
                    $t(
                      "company_profile.company_tab.company_details.custom_rate_modal.currency.USD"
                    )
                  }}
                </p>
              </div>
              <div class="k_form_groups">
                <label for="" class="m-b-10 fs-20 text_heading fw-700">
                  {{
                    $t(
                      "company_profile.company_tab.company_details.custom_rate_modal.lables.Custom_Exchange_Rates"
                    )
                  }}</label
                >
                <div class="exchange_wrap m-b-20">
                  <div class="currecy_from m-r-20">
                    <p class="custom_exchange">
                      1
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.currency.BGN"
                        )
                      }}
                      =
                    </p>
                  </div>
                  <div class="currency_amount m-r-20">
                    <input type="text" class="form-control kk_input_field" />
                  </div>
                  <div class="currency_to">
                    <p class="custom_exchange">
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.currency.EUR"
                        )
                      }}
                    </p>
                  </div>
                </div>
                <div class="exchange_wrap p-b-20">
                  <div class="currecy_from m-r-20">
                    <p class="custom_exchange">
                      1
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.currency.BGN"
                        )
                      }}
                      =
                    </p>
                  </div>
                  <div class="currency_amount m-r-20">
                    <input type="text" class="form-control kk_input_field" />
                  </div>
                  <div class="currency_to">
                    <p class="custom_exchange">
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.currency.USD"
                        )
                      }}
                    </p>
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
                    <p class="custom_exchange">
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.With_the_values_above"
                        )
                      }}
                    </p>
                    <p class="custom_exchange">
                      1000
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.currency.BGN"
                        )
                      }}
                      = 510
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.currency.EUR"
                        )
                      }}
                    </p>
                    <p class="custom_exchange">
                      1000
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.currency.BGN"
                        )
                      }}
                      = 620
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.currency.USD"
                        )
                      }}
                    </p>
                  </div>
                </div>
                <div class="modal_action_btn">
                  <div class="btns_wrap">
                    <button
                      class="btn btn-light btn-set m-r-10"
                      data-bs-dismiss="modal"
                    >
                      {{
                        $t(
                          "company_profile.company_tab.company_details.custom_rate_modal.buttons.Cancel"
                        )
                      }}
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
                      <span v-else data-bs-dismiss="modal">
                        {{
                          $t(
                            "company_profile.company_tab.company_details.custom_rate_modal.buttons.save"
                          )
                        }}
                      </span>
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

import { Modal } from "bootstrap";

import CompanyUpdate from "./components/CompanyUpdate.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tablist,
      currencyLists: [
        { value: 1, label: "BGN" },
        { value: 2, label: "EUR" },
        { value: 3, label: "USD" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      companyProfileData: "companyData",
    }),
  },
  components: {
    // TabsHr,
    CompanyUpdate,
    Multiselect,
  },

  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
  methods: {
    openCustomModal() {
      this.modal.show();
    },
  },
};
</script>

<style lang="scss" scoped>
// modal start
.ph_no {
  margin-left: 20px;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
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
// modal close
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
  cursor: pointer;
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
}
</style>
