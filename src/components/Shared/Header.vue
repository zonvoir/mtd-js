<template>
  <div class="header-wrappper">
    <!-- header for question overview start -->
    <div class="left-header">
      <!-- company-name -->
      <!-- <div class="dropdown-wrapper"> -->
      <div class="comp_select">
        <Multiselect
          v-model="value"
          placeholder="Select your Company"
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
          class="header_select"
          :options="yearOptions"
        />
      </div>
      <!-- </div> -->
    </div>
    <div class="right-header">
      <!-- profile section -->
      <div class="profile-pic-conatiner">
        <router-link :to="{ name: 'company-profile' }">
          <img src="../../assets/users/Avatar.png" class="profile-pic" />
        </router-link>
      </div>
    </div>

    <!-- header for question overview ends -->
  </div>
</template>

<script>
// import userProfile from "../../assets/";
import Multiselect from "@vueform/multiselect";
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
      heros: companiesList,
      yearOptions: ["2022", "2021", "2020", "2019"],
    };
  },
  // setup() {
  //   return {
  //     modal: ref("MTD Company"),
  //     options: ["Google", "Facebook", "Apple", "Netflix"],
  //     yearModel: ref("2021"),
  //     yearOptions: ["2022", "2021", "2020", "2019"],
  //   };
  // },
};
</script>

<style lang="scss" scoped>
.left-header {
}
.right-header {
  margin-left: auto;
  // display: flex;
  // align-items: center;
}
.header-wrappper {
  padding: 12px 20px;
  box-shadow: 0px 2px 25px rgba(178, 187, 211, 0.12);
  display: flex;
  align-items: center;
}

// .dropdown-wrapper {
//   width: 25%;
//   display: flex;
//   align-items: center;
//   margin-right: 20px;
// }
</style>
