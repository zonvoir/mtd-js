<template>
  <div>
    <div class="form_container">
      <div class="d-flex align-items-center">
        <h4 class="form_title">{{ $t("payments.payment_tab.Information") }}</h4>
        <h2 class="invoice_title m-l-auto">
          {{ $t("payments.payment_tab.Invoice_No") }}:
          <span class="">3511</span>
        </h2>
      </div>
      <form @submit.prevent="saveInvoiceInfo" action="">
        <div class="row">
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.company_name')"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="
                  $t('payments.form.placeholder.department_name_optional')
                "
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.firstname')"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.lastname')"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="email"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.email')"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="wrap_phone_inp">
              <div class="k_form_group codes_select k_select_single">
                <Multiselect
                  v-model="value"
                  label="name"
                  class="form-control country_codes"
                  :options="countryCodes"
                >
                  <template v-slot:singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      <img
                        class="character-label-icon country_flag p-r-10"
                        :src="value.icon"
                      />
                      {{ value.name }}
                    </div>
                  </template>

                  <template v-slot:option="{ option }">
                    <img
                      class="character-option-icon country_flag p-r-10"
                      :src="option.icon"
                    />
                  </template>
                </Multiselect>
              </div>
              <div class="k_form_group k_inp_number phone_field">
                <input
                  type="number"
                  class="form-control shift_number k_inp_field"
                  :placeholder="$t('payments.form.placeholder.Phone_No')"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.Address_1')"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.Address_2')"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.State_province')"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.Zip')"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group k_select_single">
              <Multiselect
                v-model="value"
                :placeholder="
                  $t('payments.form.placeholder.Select_your_country')
                "
                label="name"
                class="form-control country_select k_inp_field"
                :options="heros"
              >
                <template v-slot:singlelabel="{ value }">
                  <div class="multiselect-single-label">
                    <img
                      class="character-label-icon country_flag p-r-10"
                      :src="value.icon"
                    />
                    {{ value.name }}
                  </div>
                </template>

                <template v-slot:option="{ option }">
                  <img
                    class="character-option-icon country_flag p-r-10"
                    :src="option.icon"
                  />
                  {{ option.name }}
                </template>
              </Multiselect>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="k_form_group k_select_single">
              <Multiselect
                :placeholder="$t('payments.form.placeholder.Currency')"
                :searchable="true"
                class="form-control k_inp_field"
                rules="required"
                :options="services"
              />
            </div>
          </div>
        </div>
        <div class="border-top-1"></div>
        <h4 class="form_title">{{ $t("payments.form.labels.Service") }}</h4>
        <div class="row">
          <div class="col lg-6">
            <div class="k_form_group k_select_single">
              <Multiselect
                :placeholder="$t('payments.form.placeholder.Service')"
                :searchable="true"
                class="form-control k_inp_field"
                rules="required"
                :options="services"
              />
            </div>
          </div>
          <div class="col lg-6">
            <div class="k_form_group">
              <div class="k_date_picker">
                <Datepicker class="" v-model="date"></Datepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="border-top-1"></div>
        <h4 class="form_title">{{ $t("payments.form.labels.Checkout") }}</h4>
        <div class="row">
          <div class="col lg-6"></div>
          <div class="col lg-6">
            <div
              class="k_form_group d-flex align-items-center position-relative"
            >
              <input
                type="text"
                class="form-control dist_inp k_inp_field"
                :placeholder="
                  $t('payments.form.placeholder.Enter_discount_code')
                "
              />
              <button type="button" class="btn-light btn apply_code btn-set">
                {{ $t("payments.buttons.Apply_Code") }}
              </button>
            </div>
            <div class="text-right">
              <h4 class="invoice_total">
                {{ $t("payments.form.labels.Total_Price") }}:
                <span class="amt">5000</span><span class="currency">$</span>
              </h4>
            </div>
          </div>
        </div>
        <button class="btn btn-primary m-l-auto btn-set">
          {{ $t("payments.buttons.submit") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
const countryList = [
  {
    value: "usa",
    name: "USA",
    icon: "K_Icons/flag1.svg",
  },
  {
    value: "india",
    name: "India",
    icon: "K_Icons/flag1.svg",
  },
  {
    value: "germany",
    name: "Germany",
    icon: "K_Icons/flag1.svg",
  },
];
import Multiselect from "@vueform/multiselect";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
export default {
  data() {
    return {
      date: new Date(),
      heros: countryList,
      countryCodes: [
        {
          value: "+923",
          icon: "K_Icons/flag1.svg",
        },
        {
          value: "+91",
          icon: "K_Icons/flag1.svg",
        },
        {
          value: "+532",
          icon: "K_Icons/flag1.svg",
        },
      ],

      services: [
        { value: 0, label: "Service 1" },
        { value: 1, label: "Service 2" },
        { value: 3, label: "Service 3" },
      ],
    };
  },
  components: {
    Multiselect,
    Datepicker,
  },
  methods: {
    saveInvoiceInfo() {},
  },
};
</script>

<style lang="scss" scoped>
// .country_flag {
//   width: 26px;
//   height: 17px;
// }
.dist_inp {
  padding-right: 150px !important;
  margin-right: 1px;
}
.apply_code {
  position: absolute;
  right: -2px;
  font-weight: 700;
  font-size: 14px;
  width: 140px;
  height: 46px;
}
.wrap_phone_inp {
  position: relative;
  .phone_field {
    width: 100%;
    .shift_number {
      padding-left: 90px !important;
    }
  }
  .codes_select {
    position: absolute;
    left: -3px;
    top: -3px;
  }
}
.invoice_total {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #231f20;
  margin-bottom: 20px;
}
.invoice_title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 24px;
  color: #231f20;
}
.form_title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #7900d8;
  margin-bottom: 24px;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
.border-top-1 {
  margin-bottom: 10px;
  border-bottom: 1px solid #e4e9f2;
}
.form_container {
  background-color: #ffffff;
  padding: 20px 28px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
}
</style>
