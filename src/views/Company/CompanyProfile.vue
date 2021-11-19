<template>
  <div>
    <div class="company_profile">
      <div class="comapny_profile_header d-flex m-b-32">
        <div class="company_prof_info">
          <div class="img_wrapper">
            <img
              src="K_icons/company_logo_64.svg"
              class="c_logo_wrapper"
              alt=""
            />
          </div>
          <div class="c_details_wrapper">
            <h4 class="text_heading fs-22 fw-700 m-b-9">MoreThanDigital</h4>
            <p class="m-b-0 text_light fs-16 fw-500">New York</p>
          </div>
        </div>
        <div class="c_actions m-l-auto">
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
          <button
            @click="$router.push({ name: 'company-profile-edit' })"
            class="btn btn-primary btn_size"
          >
            <img
              src="K_Icons/edit_white.svg"
              class="print_icon kw-20 m-r-8"
              alt=""
            />
            <span class="fs-14 fw-700">Edit</span>
          </button>
        </div>
      </div>
      <!-- compnay details sec start -->
      <div class="c_page_title m-b-21">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">About Company</h4>
      </div>
      <div class="company_basic_info m-b-15">
        <div class="row">
          <div class="col-lg-3 m-b-26">
            <h4 class="c_base_head">
              Main Industry
              <span class="m-l-9">
                <img src="icons/info.svg" alt="" class="kw-15" />
              </span>
            </h4>
            <h6 class="c_base_value">Services</h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">
              Sub Industry
              <span class="m-l-9">
                <img src="icons/info.svg" alt="" class="kw-15" />
              </span>
            </h6>
            <h6 class="c_base_value">Department</h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">
              Detailed Industry
              <span class="m-l-9">
                <img src="icons/info.svg" alt="" class="kw-15" />
              </span>
            </h6>
            <h6 class="c_base_value">Develoopment Web Services</h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">Legal Form of Corporation</h6>
            <h6 class="c_base_value">Public Limited Company</h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">Regional</h6>
            <h6 class="c_base_value">Regional</h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head">Revenu Total</h6>
            <h6 class="c_base_value"><span>$ </span> 25 000</h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h4 class="c_base_head">
              Currency
              <span class="m-l-9">
                <img src="icons/info.svg" alt="" class="kw-15" />
              </span>
            </h4>
            <h6 class="c_base_value">EUR</h6>
          </div>
          <div class="col-lg-3 m-b-26">
            <h6 class="c_base_head" @click="openCustomModal">
              Custom Rate <a class="primary-link link_edit">Edit</a>
            </h6>
          </div>
        </div>
      </div>
      <!-- company_detail ends -->
      <!-- employee sec start -->
      <div class="c_page_title m-b-20">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">Employees</h4>
      </div>
      <div class="emloyees_wrap m-b-24">
        <div class="custom_grid g-0">
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Total Employee</h6>
              <h1 class="info_value">220</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Total Employee Internal</h6>
              <h1 class="info_value">320</h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Total Employee Contracted</h6>
              <h1 class="info_value">120</h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Employee sec ends -->
      <!-- Fte Section start -->
      <div class="c_page_title m-b-20">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">
          FTE
          <span class="m-l-8">
            <img src="icons/info.svg" alt="" class="kw-17" />
          </span>
        </h4>
      </div>
      <div class="emloyees_wrap m-b-24">
        <div class="custom_grid">
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Total FTE</h6>
              <h1 class="info_value">10.4</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">FTE Inhouse</h6>
              <h1 class="info_value">4.5</h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">fte Contracted</h6>
              <h1 class="info_value">6.5</h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Fte Section End -->
      <!-- Spending sec start  -->
      <div class="c_page_title m-b-20">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">Spending</h4>
      </div>
      <div class="emloyees_wrap m-b-24">
        <div class="custom_grid">
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Total Spending</h6>
              <h1 class="info_value">20K</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">opex</h6>
              <h1 class="info_value">2.5K</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">capex</h6>
              <h1 class="info_value">5.5K</h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">inhouse</h6>
              <h1 class="info_value">300</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Contracted</h6>
              <h1 class="info_value">2K</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">outsourced</h6>
              <h1 class="info_value">580</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">servive</h6>
              <h1 class="info_value">479</h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">expand</h6>
              <h1 class="info_value">300</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Transform</h6>
              <h1 class="info_value">206</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Digitalization Spending</h6>
              <h1 class="info_value">360</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">non Digitalization Spending</h6>
              <h1 class="info_value">850</h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Spending sec ends  -->
      <!-- Spending ON sec start  -->
      <div class="c_page_title m-b-20">
        <h4 class="m-b-0 fs-18 fw-700 text-heading">Spending</h4>
      </div>
      <div class="emloyees_wrap m-b-24">
        <div class="custom_grid">
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Management, Und overhead</h6>
              <h1 class="info_value">20K</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Marketing</h6>
              <h1 class="info_value">2.5K</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">sales/after seles</h6>
              <h1 class="info_value">5.5K</h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">production</h6>
              <h1 class="info_value">300</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">sourcing / logidtics (SCM)</h6>
              <h1 class="info_value">20K</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Research And Management</h6>
              <h1 class="info_value">2.5K</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Legal</h6>
              <h1 class="info_value">5.5K</h1>
            </div>
          </div>
          <div class="custom_grid_col">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Finance & Controling</h6>
              <h1 class="info_value">300</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">Hr</h6>
              <h1 class="info_value">20K</h1>
            </div>
          </div>
          <div class="custom_grid_col m-r-15">
            <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
              <h6 class="text_light info_title">IT</h6>
              <h1 class="info_value">2.5K</h1>
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

import { Modal } from "bootstrap";

export default {
  components: {
    // TabsHr,
    Multiselect,
  },
  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
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
  methods: {
    openCustomModal() {
      this.modal.show();
    },
  },
};
</script>

<style lang="scss" scoped>
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
.info_title {
  font-size: 12px;
  font-weight: 700;
  color: #8f9bb3;
  margin-bottom: 13px;
  text-transform: uppercase;
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
  width: 91px;
  height: 40px;
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
