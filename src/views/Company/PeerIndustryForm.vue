<template>
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
          @change="onChangeMainIndustry(industryArr.main_industry)"
          v-model="industryArr.main_industry"
          @blur="v$.industryArr.main_industry.$touch;"
          :class="{
            'is-invalid': v$.industryArr.main_industry.$error,
          }"
        />
        <div
          v-if="v$.industryArr.main_industry.$error"
          class="invalid-feedback text-left"
        >
          <span
            v-if="v$.industryArr.main_industry.required.$invalid"
            class="text-left fs-14"
          >
            Main industry is required
          </span>
        </div>
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
          @change="onChangeSubIndustry(industryArr.sub_industry)"
          v-model="industryArr.sub_industry"
          @blur="v$.industryArr.sub_industry.$touch;"
          :class="{
            'is-invalid': v$.industryArr.sub_industry.$error,
          }"
        />
        <div
          v-if="v$.industryArr.sub_industry.$error"
          class="invalid-feedback text-left"
        >
          <span
            v-if="v$.industryArr.sub_industry.required.$invalid"
            class="text-left fs-14"
          >
            Sub industry is required
          </span>
        </div>
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
          v-model="industryArr.detailed_industry"
          @blur="v$.industryArr.detailed_industry.$touch;"
          :class="{
            'is-invalid': v$.industryArr.detailed_industry.$error,
          }"
        />
        <div
          v-if="v$.industryArr.detailed_industry.$error"
          class="invalid-feedback text-left"
        >
          <span
            v-if="v$.industryArr.detailed_industry.required.$invalid"
            class="text-left fs-14"
          >
            Deatiled industry is required
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Dropdown from "primevue/dropdown";
import { mapGetters } from "vuex";
export default {
  emits: ["addNewIndustry"],
  props: {
    industryForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      industryArr: this.industryForm,
    };
  },
  components: {
    Dropdown,
  },
  computed: {
    ...mapGetters({
      industryLists: "mainIndustries",
      subIndustryLists: "subIndustries",
      detailedIndustryLists: "detailIndustries",
    }),
  },
  created() {
    this.$store.dispatch("GET_MAIN_INDUSTRIES");
    this.$store.dispatch("GET_COUNTRIES");
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      industryArr: {
        main_industry: { required },
        sub_industry: { required },
        detailed_industry: { required },
      },
    };
  },
  methods: {
    // get Industry lists
    onChangeMainIndustry(industryId) {
      this.$store.dispatch("GET_SUB_INDUSTRIES", industryId);
    },
    onChangeSubIndustry(subIndustryId) {
      this.$store.dispatch("GET_DEATAIL_INDUSTRIES", subIndustryId);
    },
    validationIndustry() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.$emit("addNewIndustry", {
          newIndustry: this.industryArr,
        });

        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
