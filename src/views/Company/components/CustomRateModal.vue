<template>
  <div>
    <h6 class="c_base_head" @click="openCustomModal">
      {{
        $t(
          "company_profile.company_tab.company_details.About_Company_lables.custom_rate"
        )
      }}
      <slot name="exchange-rate-button"></slot>
    </h6>
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
          <div class="from_wrapper">
            <form action="">
              <div class="k_form_group k_select_single">
                <label for="" class="m-b-10 fs-20 text_heading fw-700">
                  Currency & Exchange Rates, 2020</label
                >
                <Dropdown
                  class="k_prime_inp_select"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="
                   Currency
                  "
                  :options="currencyLists"
                  @change="onChangeCurrency"
                  v-model="standardCurrency.currency_id"
                  @blur="v$.standardCurrency.currency_id.$touch"
                  :class="{
                    'is-invalid': v$.standardCurrency.currency_id.$error,
                  }"
                />

                <div
                  v-if="v$.standardCurrency.currency_id.$error"
                  class="invalid-feedback text-left"
                >
                  <span
                    v-if="v$.standardCurrency.currency_id.required.$invalid"
                    class="text-left fs-14"
                  >
                    Currency is required
                  </span>
                </div>
              </div>
              <div v-if="exchangeRates" class="k_form_groups">
                <label for="" class="m-b-10 fs-20 text_heading fw-700">
                  Standard Exchange Rates</label
                >
                <p class="custom_exchange p-b-30">
                  1
                  {{ getNameById(currencyLists, standardCurrency.currency_id) }}
                  = {{ exchangeRates.standard_rate_euro }} EUR
                </p>
                <p class="custom_exchange p-b-26">
                  1
                  {{ getNameById(currencyLists, standardCurrency.currency_id) }}
                  = {{ exchangeRates.standard_rate_usd }} USD
                </p>
              </div>
              <div class="k_form_groups">
                <label for="" class="m-b-10 fs-20 text_heading fw-700">
                  Custom Exchange Rates</label
                >
                <div class="exchange_wrap">
                  <div class="currecy_from m-r-20">
                    <p class="custom_exchange">
                      1
                      {{
                        getNameById(currencyLists, standardCurrency.currency_id)
                      }}
                      =
                    </p>
                  </div>
                  <div class="currency_amount m-r-20">
                    <input
                      type="text"
                      @keydown="isNumber"
                      v-model="standardCurrency.euro"
                      class="form-control kk_input_field"
                      @blur="v$.standardCurrency.euro.$touch"
                      :class="{
                        'is-invalid': v$.standardCurrency.euro.$error,
                      }"
                    />

                    <div
                      v-if="v$.standardCurrency.euro.$error"
                      class="invalid-feedback text-left"
                    >
                      <span
                        v-if="v$.standardCurrency.euro.required.$invalid"
                        class="text-left fs-14"
                      >
                        Value is Required
                      </span>
                      <span
                        v-if="v$.standardCurrency.euro.numeric.$invalid"
                        class="text-left fs-14"
                      >
                        Enter numeric number
                      </span>
                    </div>
                  </div>
                  <div class="currency_to">
                    <p class="custom_exchange">EUR</p>
                  </div>
                </div>
                <div class="exchange_wrap">
                  <div class="currecy_from m-r-20">
                    <p class="custom_exchange">
                      1
                      {{
                        getNameById(currencyLists, standardCurrency.currency_id)
                      }}
                      =
                    </p>
                  </div>
                  <div class="currency_amount m-r-20">
                    <input
                      type="text"
                      @keydown="isNumber"
                      v-model="standardCurrency.usd"
                      class="form-control kk_input_field"
                      @blur="v$.standardCurrency.usd.$touch"
                      :class="{
                        'is-invalid': v$.standardCurrency.usd.$error,
                      }"
                    />

                    <div
                      v-if="v$.standardCurrency.usd.$error"
                      class="invalid-feedback text-left"
                    >
                      <span
                        v-if="v$.standardCurrency.usd.required.$invalid"
                        class="text-left fs-14"
                      >
                        Value is Required
                      </span>
                      <span
                        v-if="v$.standardCurrency.usd.numeric.$invalid"
                        class="text-left fs-14"
                      >
                        Enter numeric number
                      </span>
                    </div>
                  </div>
                  <div class="currency_to">
                    <p class="custom_exchange">USD</p>
                  </div>
                </div>
                <!-- alert -->
                <div class="alert_wrapper d-flex m-b-10">
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
                    <p class="custom_exchange">
                      1000
                      {{
                        getNameById(currencyLists, standardCurrency.currency_id)
                      }}
                      =
                      {{ customExchangeValues(standardCurrency.euro) }}
                      EUR
                    </p>
                    <p class="custom_exchange">
                      1000
                      {{
                        getNameById(currencyLists, standardCurrency.currency_id)
                      }}
                      =

                      {{ customExchangeValues(standardCurrency.usd) }}
                      USD
                    </p>
                  </div>
                </div>
                <div class="modal_action_btn">
                  <div class="btns_wrap">
                    <button
                      type="button"
                      @click="onCancel()"
                      class="btn btn-light btn-set m-r-20"
                    >
                      Cancel
                    </button>
                    <button
                      :disabled="isSubmitted"
                      type="button"
                      @click="saveCustomRates()"
                      class="btn btn-primary btn-set"
                    >
                      <div
                        v-if="isSubmitted"
                        class="spinner-border text-light"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      <span v-else> Save </span>
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
import { Modal } from "bootstrap";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
import { getlabelValue } from "../../../utils/commonHelperFuntions";
import { required, numeric } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  data() {
    return {
      modal: null,
      display: false,
      isSubmitted: false,
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      numberPattern: /^\d{0,}(?:\.\d{0,3}){0,1}$/,
      standardCurrency: {
        currency_id: "",
        usd: "",
        euro: "",
      },
    };
  },

  computed: {
    // vuex getter variables
    ...mapGetters({
      currencyLists: "allCurrency",
      exchangeRates: "currencyExRates",
      activeCurrency: "defualtCurrency",
    }),
  },

  created() {
    // get currency selected on page load

    if (this.exchangeRates && Object.keys(this.exchangeRates).length != 0) {
      this.standardCurrency = this.exchangeRates;
    } else {
      this.standardCurrency.currency_id = this.activeCurrency;
      this.onChangeCurrency();
    }
    this.getCurrency();
  },

  components: {
    Dropdown,
  },

  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },

  //  all the variables declare here that are need validation

  validations() {
    return {
      standardCurrency: {
        currency_id: { required },
        usd: { required, numeric },
        euro: { required, numeric },
      },
    };
  },

  setup() {
    return {
      // vuelidate variable decalaration

      v$: useVuelidate(),
    };
  },
  methods: {
    // enter only number
    isNumber(ev) {
      let numberStr = ev.target.value;
      if (this.numberPattern.test(numberStr)) {
        return true;
      } else {
        if (ev.keyCode == 8) {
          return true;
        } else {
          ev.preventDefault();
        }
      }
    },

    // custom exchange rates value must be 4 digits
    customExchangeValues(value) {
      return parseFloat((value * 1000).toFixed(4));
    },

    // open custom exchage  modal
    openCustomModal() {
      this.modal.show();
    },

    // get name of currency by id
    getNameById(listArr, id) {
      return getlabelValue(listArr, id);
    },

    // close modal
    onCancel() {
      this.display = false;
      this.modal.hide();
    },

    // save custom rates
    saveCustomRates() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.standardCurrency.auth_token = this.staffData.auth_token;
        this.$store
          .dispatch(
            "UPDATE_CUSTOM_CURRENCY_EXCHANGE_RATES",
            this.standardCurrency
          )
          .then((res) => {
            if (res.data.status) {
              this.modal.hide();
            }
          });
      }
    },

    // get all currency on page load
    getCurrency() {
      this.$store.dispatch("GET_ALL_CURRENCY");
    },

    // change currency
    onChangeCurrency() {
      // get change exchange currency rates
      this.$store
        .dispatch("GET_CUSTOM_CURRENCY_EXCHANGE_RATES", {
          currency_id: this.standardCurrency.currency_id,
          auth_token: this.staffData.auth_token,
        })
        .then((res) => {
          if (res.data.status) {
            this.standardCurrency = this.exchangeRates;
            return;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.invalid-feedback {
  position: absolute;
  bottom: -23px;
}
.c_base_head {
  font-size: 14px;
  font-weight: 500;
  color: #8f9bb3;
  margin-bottom: 2px;
  cursor: pointer;
}
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
  padding-bottom: 25px;
  .currency_amount {
    margin-right: 20px;
    position: relative;
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
.custom_rate_modal {
  background: #ffffff;
  border-radius: 4px;
  width: 400px;
  height: auto;
}
.modal_body {
  background: #ffffff;

  padding: 28px 24px;
  width: 400px;
  height: auto;
}
.alert_wrapper {
  margin-top: 15px;
}

// modal close
</style>
