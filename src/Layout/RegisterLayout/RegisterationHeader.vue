<template>
  <div>
    <!-- brand Logo start -->
    <div class="brand-logo-wrapper text-center">
      <img
        alt="More Than Digital"
        src="../../assets/images/MTGLogo.png"
        class="brand-logo-size"
      />
    </div>
    <!-- brand logo Ends  -->
    <Language />

    <!-- stepper begins -->
    <div class="stepper_container">
      <ul class="stepper_wrap">
        <li class="">
          <a class="step">
            <div
              class="step_number_wrap"
              :class="
                this.currentUrl === 'register'
                  ? 'step_active'
                  : 'step_completed'
              "
            >
              <span v-if="this.currentUrl === 'register'" class="step_number"
                >1</span
              >
              <span v-else class="">
                <img src="K_Icons/checkmark.svg" class="checked" alt="" />
              </span>
            </div>
          </a>
        </li>
        <li class="">
          <a class="step">
            <div
              class="step_number_wrap"
              :class="
                this.currentUrl === 'career'
                  ? 'step_active'
                  : this.currentUrl === 'company'
                  ? 'step_completed'
                  : 'step_not_visited'
              "
            >
              <span v-if="this.currentUrl === 'company'" class="">
                <img src="K_Icons/checkmark.svg" class="checked" alt="" />
              </span>
              <span v-else class="step_number">2</span>
            </div></a
          >
        </li>

        <li v-if="invitedUserData === null" class="">
          <a class="step">
            <div
              class="step_number_wrap"
              :class="
                this.currentUrl === 'company'
                  ? 'step_active'
                  : 'step_not_visited'
              "
            >
              <span class="step_number">3</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <!-- stepper ends -->
  </div>
</template>

<script>
// import Dropdown from "primevue/dropdown";
import Language from "../../components/Shared/LanguageDropdown.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      invitedUserData: JSON.parse(localStorage.getItem("bWFInpvitedbpbUser")),
      pages: ["register", "career", "company"],
    };
  },

  components: {
    Language,
  },

  computed: {
    ...mapGetters({
      currentUrl: "actviePage",
      userType: "userType",
    }),
  },

  watch: {
    currentUrl: function () {
      return this.currentUrl;
    },
  },

  created() {
    let url = this.$route.path.split("/")[2];
    this.$store.dispatch("GET_ACTIVE_PAGE", url);
  },

  methods: {
    getActiveClass(value) {
      return {
        step_not_visited: "expired",
        step_active: "accepted",
        step_completed: "pending",
      }[value];
    },
    testUrl(url) {
      return this.pages.includes(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.stepper_container {
  margin-top: 20px;
  .stepper_wrap {
    justify-content: center !important;
    display: flex !important;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    padding-left: 0;
    li {
      list-style: none;
      position: relative;
      width: 34%;
      overflow: hidden;
      text-align: center;
      &::after {
        content: "";
        background-color: #7002c8;
        height: 2px;
        top: 18px;
        position: absolute;
        width: 100%;
      }
      &:nth-child(2) {
        &::before {
          content: "";
          background-color: #7002c8;
          height: 2px;
          top: 18px;
          left: 0;
          position: absolute;
          width: 100%;
        }
      }
      &:last-of-type {
        &::before {
          content: "";
          background-color: #7002c8;
          height: 2px;
          top: 18px;
          position: absolute;

          width: 53%;
          left: 0;
        }
        &::after {
          display: none;
        }
      }

      a {
        text-decoration: none;
        .step_number_wrap {
          display: inline-block;
          width: 36px;
          height: 36px;
          line-height: 32px;
          text-align: center;
          border-radius: 50%;

          &.step_not_visited {
            background-color: #ffffff;
            color: #7002c8;
            border: 2px solid #7002c8;
            position: relative;
          }
          &.step_active {
            position: relative;
            // border: 0;
            color: #ffffff;
            border: 2px solid #7002c8;
            background-color: #7002c8;
          }
          &.step_completed {
            position: relative;
            border: 0;

            color: #ffffff;
            background-color: #7002c8;
            .checked {
              width: 23px;
            }
          }
          .step_number {
            color: inherit;
            font-weight: 900;
            font-size: 16px;
            line-height: 16px;
          }
        }
      }
    }
  }
}
// .language_wrap {
//   position: absolute;
//   top: 0;
//   right: 0;
// }
// .img_logo {
//   margin-left: auto;
// }
// .language_dropdown {
//   .img_logo {
//     width: 22px;
//   }
// }
</style>
