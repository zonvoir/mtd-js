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
                v-model="paymentForm.company_name"
                @blur="v$.paymentForm.company_name.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.company_name.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.company_name.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.company_name.required.$invalid"
                  class="text-left fs-14"
                >
                  Company is required
                </span>
              </div>
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
                v-model="paymentForm.department_name"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.firstname')"
                v-model="paymentForm.first_name"
                @blur="v$.paymentForm.first_name.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.first_name.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.first_name.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.first_name.required.$invalid"
                  class="text-left fs-14"
                >
                  First name is required
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.lastname')"
                v-model="paymentForm.last_name"
                @blur="v$.paymentForm.last_name.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.last_name.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.last_name.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.last_name.required.$invalid"
                  class="text-left fs-14"
                >
                  Last name is required
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="email"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.email')"
                v-model="paymentForm.email"
                @blur="v$.paymentForm.email.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.email.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.email.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.email.required.$invalid"
                  class="text-left fs-14"
                >
                  Email name is required
                </span>
                <span
                  v-if="v$.paymentForm.email.email.$invalid"
                  class="text-left fs-14"
                >
                  Email is not valid
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group k_select_single">
              <Dropdown
                v-model="paymentForm.country"
                :options="countryLists"
                optionLabel="label"
                class="k_prime_inp_select"
                placeholder="Select a Country"
                @change="onChangeCountry(paymentForm.country)"
                @blur="v$.paymentForm.country.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.country.$error,
                }"
              >
                <template #value="slotProps">
                  <div
                    class="company-item company-item-value"
                    v-if="slotProps.value"
                  >
                    <img
                      class="img_logo"
                      :src="
                        slotProps.value.icon
                          ? slotProps.value.icon
                          : 'usflag.png'
                      "
                    />
                    <span class="company_item_name">{{
                      slotProps.value.label
                    }}</span>
                  </div>
                </template>
                <template #option="slotProps">
                  <div class="company-item">
                    <img
                      class="img_logo"
                      :src="
                        slotProps.option.icon
                          ? slotProps.option.icon
                          : 'usflag.png'
                      "
                    />
                    <span class="company_item_name">{{
                      slotProps.option.label
                    }}</span>
                  </div>
                </template>
              </Dropdown>

              <div
                v-if="v$.paymentForm.country.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.country.required.$invalid"
                  class="text-left fs-14"
                >
                  Country is required
                </span>
              </div>
            </div>
          </div>
          <!-- state -->
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.State_province')"
                v-model="paymentForm.state"
                @blur="v$.paymentForm.state.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.state.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.state.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.state.required.$invalid"
                  class="text-left fs-14"
                >
                  State is required
                </span>
              </div>
            </div>
          </div>
          <!-- currency -->
          <div class="col-lg-6">
            <div class="k_form_group k_select_single">
              <Dropdown
                class="k_prime_inp_select"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('payments.form.placeholder.Currency')"
                :options="services"
                v-model="paymentForm.currency"
                @blur="v$.paymentForm.currency.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.currency.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.currency.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.currency.required.$invalid"
                  class="text-left fs-14"
                >
                  Currency is required
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.Address_1')"
                v-model="paymentForm.address1"
                @blur="v$.paymentForm.address1.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.address1.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.address1.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.address1.required.$invalid"
                  class="text-left fs-14"
                >
                  Address 1 is required
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.Address_2')"
                v-model="paymentForm.address2"
                @blur="v$.paymentForm.address2.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.address2.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.address2.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.address2.required.$invalid"
                  class="text-left fs-14"
                >
                  Address 2 is required
                </span>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="k_form_group">
              <input
                type="text"
                class="form-control k_inp_field"
                :placeholder="$t('payments.form.placeholder.Zip')"
                @keypress="isNumber"
                v-model="paymentForm.zipcode"
                @blur="v$.paymentForm.zipcode.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.zipcode.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.zipcode.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.zipcode.required.$invalid"
                  class="text-left fs-14"
                >
                  Zipcode is required
                </span>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="input-group d-flex">
              <div class="country_flag_wrap">
                <img
                  v-if="country_flag"
                  :src="country_flag"
                  class="country_flag"
                  alt=""
                />
              </div>
              <div class="phone_main_wrap">
                <div class="d-flex w-100">
                  <span v-if="country_code" class="country_code">
                    (+{{ country_code }})
                  </span>
                  <span v-else class="country_code"> (+91) </span>
                  <input
                    class="form-control k_inp_field cus_ph_inp"
                    aria-label="Phonenumber"
                    aria-describedby="basic-addon1"
                    type="text"
                    @keypress="isNumber"
                    :placeholder="
                      $t(
                        'company_profile.company_tab.company_setup_update.form.placeholder.phone_no'
                      )
                    "
                    v-model="paymentForm.phone_number"
                    @blur="v$.paymentForm.phone_number.$touch"
                    :class="{
                      'is-invalid': v$.paymentForm.phone_number.$error,
                    }"
                  />
                  <div
                    v-if="v$.paymentForm.phone_number.$error"
                    class="invalid-feedback cust_err text-left"
                  >
                    <span
                      v-if="v$.paymentForm.phone_number.required.$invalid"
                      class="text-left fs-14"
                    >
                      Phone number is required
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-top-1"></div>
        <h4 class="form_title">{{ $t("payments.form.labels.Service") }}</h4>
        <div class="row">
          <div class="col lg-6">
            <div class="k_form_group k_select_single">
              <Dropdown
                class="k_prime_inp_select"
                optionLabel="label"
                optionValue="value"
                :placeholder="$t('payments.form.placeholder.Service')"
                :options="services"
                v-model="paymentForm.service_type"
                @blur="v$.paymentForm.service_type.$touch"
                :class="{
                  'is-invalid': v$.paymentForm.service_type.$error,
                }"
              />
              <div
                v-if="v$.paymentForm.service_type.$error"
                class="invalid-feedback text-left"
              >
                <span
                  v-if="v$.paymentForm.service_type.required.$invalid"
                  class="text-left fs-14"
                >
                  Service is required
                </span>
              </div>
            </div>
          </div>
          <div class="col lg-6">
            <div class="k_form_group">
              <div class="k_date_picker">
                <Datepicker
                  class="custom_label"
                  :enableTimePicker="false"
                  v-model="paymentForm.service_date"
                  @open="paymentForm.service_date = ''"
                  @blur="v$.paymentForm.service_date.$touch"
                  placeholder="dd/mm/yyyy"
                  :class="{
                    invalid_error: v$.paymentForm.service_date.$error,
                  }"
                />
                <div
                  v-if="v$.paymentForm.service_date.$error"
                  class="invalid_feedback text-left"
                >
                  <span
                    v-if="v$.paymentForm.service_date.required.$invalid"
                    class="text-left fs-14"
                  >
                    Date is required
                  </span>
                </div>
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
                v-model="paymentForm.discount_code"
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
        <button type="submit" class="btn btn-primary m-l-auto btn-set">
          {{ $t("payments.buttons.submit") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Datepicker from "vue3-date-time-picker";
import Dropdown from "primevue/dropdown";
import "vue3-date-time-picker/dist/main.css";
import { mapGetters } from "vuex";
import CommonService from "../../Services/CommonService";
export default {
  data() {
    return {
      date: new Date(),
      numberPattern: /[0-9]/,
      country_code: "",
      country_flag: "",
      paymentForm: {
        company_name: "",
        department_name: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address1: "",
        address2: "",
        state: "",
        country: "",
        zipcode: "",
        currency: "",
        service_type: "",
        service_date: "",
        discount_code: "",
      },
      countries: [
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
      ],
      selectedCountry: null,
      services: [
        { value: 0, label: "Service 1" },
        { value: 1, label: "Service 2" },
        { value: 3, label: "Service 3" },
      ],
    };
  },
  components: {
    // Multiselect,
    Datepicker,
    Dropdown,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      paymentForm: {
        company_name: { required },
        first_name: { required },
        last_name: { required },
        email: { required, email },
        phone_number: { required },
        address1: { required },
        address2: { required },
        state: { required },
        country: { required },
        zipcode: { required },
        currency: { required },
        service_type: { required },
        service_date: { required },
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
  methods: {
    saveInvoiceInfo() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        console.log("form is still valid", this.paymentForm);
        this.formReset();
      }
    },
    onChangeCountry() {
      console.log("Detail CountryCode", this.paymentForm.country);
      this.selectedCountryCode(+this.paymentForm.country);
    },
    selectedCountryCode(id) {
      CommonService.getCountryCode({ country_id: id }).then((resp) => {
        if (resp.data.status) {
          this.country_flag = resp.data.data.image;
          this.country_code = resp.data.data.code;
          console.log(
            "country codes and flags",
            this.country_flag,
            this.country_code
          );
        }
      });
    },

    // enter only number
    isNumber(event) {
      let char = String.fromCharCode(event.keyCode);
      if (this.numberPattern.test(char)) return true;
      else event.preventDefault();
    },

    formReset() {
      this.v$.$reset();
      this.defaultImg = "icons/cloud-upload.svg";
      this.country_flag = "";
      this.country_code = "";
      this.paymentForm = {
        company_name: "",
        department_name: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address1: "",
        address2: "",
        state: "",
        country: "",
        zipcode: "",
        currency: "",
        service_type: "",
        service_date: "",
        discount_code: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.cust_err {
  position: absolute;
  top: 100%;
}
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
.company-item {
  display: flex;
  align-items: center;
  .img_logo {
    width: 20px;
  }
  .company_item_name {
    margin-left: 5px;
  }
}
</style>
