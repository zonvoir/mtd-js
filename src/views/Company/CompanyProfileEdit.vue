<template>
  <div>
    <div v-if="isAuthenticUser" class="company_profile">
      <div class="" v-if="companyProfileData">
        <CompanyUpdate :companyProfile="companyProfileData" />
      </div>
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

import CompanyUpdate from "./components/CompanyUpdate.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tablist,
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    };
  },
  computed: {
    ...mapGetters({
      companyProfileData: "companyData",
    }),
  },
  created() {
    this.$store.dispatch("GET_CUSTOM_CURRENCY_EXCHANGE_RATES", {
      auth_token: this.staffData.auth_token,
    });
    this.getCompanyInformation();
  },
  components: {
    CompanyUpdate,
  },

  methods: {
    getCompanyInformation() {
      this.$store.dispatch("CAMPNAY_PROFILE_DATA", {
        auth_token: this.staffData.auth_token,
      });
    },
    isAuthenticUser() {
      if (
        this.companyProfileData &&
        this.companyProfileData.edit_company_details
      ) {
        return true;
      } else {
        this.$router.push({ name: "company-profile" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
