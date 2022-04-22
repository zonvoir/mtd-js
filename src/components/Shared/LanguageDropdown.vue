<template>
  <div class="language_wrap">
    <Dropdown
      v-model="selectedLanguage"
      :options="laguage"
      optionLabel="label"
      class="language_dropdown"
      @change="onChangeLanguage"
    >
      <template #value="slotProps">
        <div class="company-item company-item-value" v-if="slotProps.value">
          <span class="company_item_name m-r-6">{{
            slotProps.value.label
          }}</span>
          <img
            v-if="slotProps.value.icon"
            class="img_logo"
            :src="slotProps.value.icon"
          />
        </div>
      </template>
      <template #option="slotProps">
        <div class="company-item">
          <span class="company_item_name m-r-3">{{
            slotProps.option.label
          }}</span>
          <img
            v-if="slotProps.option.icon"
            class="img_logo"
            :src="slotProps.option.icon"
          />
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import errorhandler from "../../utils/Error";
import { loadLocaleMessages } from "../../i18n";
import CommonService from "../../Services/CommonService";

export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      selectedLanguage: { value: "1", label: "En", icon: "ukflag.png" },

      laguage: [
        { value: "en", label: "En", icon: "ukflag.png" },
        { value: "de", label: "De", icon: "K_Icons/flag1.svg" },
      ],
    };
  },

  created() {
    this.selectedLanguage =
      this.getActiveLanguage(localStorage.getItem("language")) ||
      this.selectedLanguage;
  },

  methods: {
    onChangeLanguage() {
      console.log("selected language", this.selectedLanguage.value);
      localStorage.setItem("language", this.selectedLanguage.value);
      loadLocaleMessages(this.$i18n, this.selectedLanguage.value);
      this.$router.go();
    },

    getActiveLanguage(value) {
      return this.laguage.find((x) => x.value == value);
    },
    getLanguage(value) {
      return {
        en: "english",
        de: "german",
      }[value];
    },

    // onChangeLanguage() {
    //   console.log("selected langage");
    //   // let data = {
    //   //   auth_token: this.authToken,
    //   //   language: this.getLanguage(this.selectedLanguage),
    //   // };

    //   // this.setLanguages(data);
    //   // this.$router.go();
    //   // loadLocaleMessages(i18n, "en");
    // },
    setLanguages(data) {
      console.log("set Lang", data);
      CommonService.setLanguage(data).then((res) => {
        if (res.data.status) {
          console.log("data", res.data);
          localStorage.setItem("language", this.selectedLanguage);
          loadLocaleMessages(this.$i18n, this.selectedLanguage);
          this.$router.go();
        } else {
          errorhandler(res);
          // let $th = this;
          // if ("error" in res.data) {
          //   Object.keys(res.data.error).map(function (key) {
          //     $th.$toast.error(res.data.error[key], {
          //       position: "bottom-left",
          //       duration: 3712,
          //     });
          //   });
          // } else {
          //   $th.$toast.error(res.data.message, {
          //     position: "bottom-left",
          //     duration: 3712,
          //   });
          // }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.language_wrap {
  position: absolute;
  top: 0;
  right: 0;
}
.img_logo {
  margin-left: auto;
}
.language_dropdown {
  .img_logo {
    width: 22px;
  }
}
</style>
