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
          <div class="modal-body">
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
                    v-model="currency"
                  />
                  <!-- <Multiselect
                  class="form-control k_inp_field m-b-16"
                  rules="required"
                  :options="currencyLists"
                /> -->
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
                        type="button"
                        @click="closeModal()"
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
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modal: null,
      currency: undefined,
    };
  },
  computed: {
    ...mapGetters({
      currencyLists: "allCurrency",
    }),
  },

  created() {
    this.$store.dispatch("GET_ALL_CURRENCY");
  },
  components: {
    Dropdown,
  },

  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
  setup() {
    return {};
  },
  methods: {
    openCustomModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    onChangeCurrency() {},
  },
};
</script>

<style lang="scss" scoped>
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
</style>
