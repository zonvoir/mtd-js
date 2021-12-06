<template>
  <div class="header-wrappper">
    <!-- header for question overview start -->
    <div class="left-header">
      <!-- company-name -->
      <!-- <div class="dropdown-wrapper"> -->
      <div class="comp_select">
        <Multiselect
          v-model="value"
          :placeholder="$t('header.placeholder.select_your_company')"
          label="name"
          class="header_select"
          :options="heros"
        >
          <template v-slot:singlelabel="{ value }">
            <div class="multiselect-single-label">
              <img class="character-label-icon" :src="value.icon" />
              {{ value.name }}
            </div>
          </template>

          <template v-slot:option="{ option }">
            <img class="character-option-icon" :src="option.icon" />
            {{ option.name }}
          </template>
        </Multiselect>
      </div>
      <!-- select year- -->
      <div class="comp_year_select">
        <Multiselect
          v-model="value"
          :placeholder="$t('header.placeholder.select_year')"
          class="header_select"
          :options="yearOptions"
        />
      </div>
    </div>

    <div class="right-header">
      <!-- profile section -->
      <div class="profile-pic-conatiner">
        <a @click.prevent="toggleDropdown" class="user_acc">
          <!-- <img src="userpic ? userpic : ''" class="profile-pic" /> -->
          <img src="../../assets/users/100_3.jpg" class="profile-pic" />
        </a>
      </div>
    </div>
    <div class="drop_menu_wrap" :class="{ shown: state }">
      <ul class="drop_down_menu" v-show="state">
        <li>
          <a
            :class="{ active_drop_item: isprofile }"
            @click="personalProfile"
            class="drop_dowm_link"
            >{{ $t("header.profile_drop_down.profile") }}
          </a>
        </li>
        <li>
          <a @click="onLogout" class="drop_dowm_link">
            {{ $t("header.profile_drop_down.logout") }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import signupService from "../../Services/SignupService";
import userLogo from "../../assets/users/100_3.jpg";
const companiesList = [
  {
    value: "captainamerica",
    name: "Captain America",
    icon: "https://cdn2.iconfinder.com/data/icons/avengers-filled/48/03_-_Captain_America_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png",
  },
  {
    value: "spiderman",
    name: "Spiderman",
    icon: "https://cdn2.iconfinder.com/data/icons/avengers-filled/48/12_-_Spiderman_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png",
  },
  {
    value: "ironman",
    name: "Iron Man",
    icon: "https://cdn2.iconfinder.com/data/icons/avengers-filled/48/02_-_IRONMAN_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png",
  },
];
export default {
  name: "Header",
  components: {
    Multiselect,
  },
  data() {
    return {
      // staffData: localStorage.getItem("memberPic"),
      state: false,
      userLogo,
      userpic: "",
      value: "2021",
      isprofile: false,
      heros: companiesList,
      yearOptions: ["2022", "2021", "2020", "2019"],
    };
  },
  computed: {
    getUpdatedProfile() {
      return this.$store.getters.updateMemberProfile;
    },
  },
  created() {
    this.userpic = localStorage.getItem("memberPic");
    console.log("header", this.userpic);
  },
  methods: {
    personalProfile() {
      this.isprofile = true;
      this.$router.push({ name: "personal-account" });
      this.currentPage = this.$route.path;
      console.log("profile Page", this.currentPage);
    },
    getStaffDetails() {
      this.auth_token = this.staffData.auth_token;
      this.token.auth_token = this.staffData.auth_token;
      signupService
        .getPersonalDetails(this.token)
        .then((res) => {
          if (res.data.status) {
            this.personalAccount = res.data.data;
          } else {
            let $th = this;
            Object.keys(res.data.error).map(function (key) {
              console.log("failed");
              $th.$toast.error(res.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("");
        });
    },
    onLogout() {
      console.log("Logout successfully");
      localStorage.removeItem("bWFpbCI6Inpvb");
      this.$router.push({ name: "signup-signin" });
    },
    toggleDropdown() {
      this.state = !this.state;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.state = false;
      }
    },
  },
  mounted() {
    if (this.$route.path === "/personal-account") {
      this.isprofile = true;
    } else {
      this.isprofile = false;
    }
    document.addEventListener("click", this.close);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },
};
</script>

<style lang="scss" scoped>
.user_acc {
  cursor: pointer;
}
.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.shown {
  position: absolute;
  top: 66px !important;
  right: 2px;
  z-index: 99;
}
.drop_down_menu {
  background: #ffffff;
  box-shadow: 10px 0px 25px rgba(178, 187, 211, 0.2);
  border-radius: 0px 0px 4px 4px;
  margin: 0;
  padding-left: 0;
  padding: 10px;
}
li {
  background-color: #ffffff;
  padding: 15px 10px;
  border-radius: 4px;
  list-style: none;
  width: 120px;
  text-align: center;
  .drop_dowm_link {
    text-decoration: none;
    color: #8f9bb3;
    cursor: pointer;
  }
  .active_drop_item {
    color: #7900d8 !important;
  }
}

.left-header {
}
.right-header {
  margin-left: auto;
}
.header-wrappper {
  padding: 12px 20px;
  box-shadow: 0px 2px 25px rgba(178, 187, 211, 0.12);
  display: flex;
  align-items: center;
}
</style>
