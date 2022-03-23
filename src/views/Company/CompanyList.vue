<template>
  <div class="member_container">
    <!-- member table -->
    <div class="table_container">
      <div class="table_labels">
        <table class="table company_tabel">
          <thead></thead>
          <tbody class="company_tbody">
            <tr class="company_tr">
              <td @click="addCompany" class="company_td add_new_company">
                <div class="company_detail company_add">
                  <div class="company_pic">
                    <div class="add_company_button">
                      <span class="add_icon">+</span>
                    </div>
                  </div>
                  <div class="company_info">
                    <h4 class="company_name company_new">
                      {{
                        $t(
                          "company_profile.company_tab.company_table.Add_new_company"
                        )
                      }}
                    </h4>
                  </div>
                </div>
              </td>
              <td class="company_td">
                <div class="td_location td_wrap">
                  {{ $t("company_profile.company_tab.company_table.Location") }}
                </div>
              </td>
              <td class="company_td">
                <div class="td_members td_wrap">
                  {{ $t("company_profile.company_tab.company_table.Members") }}
                </div>
              </td>
              <td class="company_td"></td>
            </tr>
            <tr
              v-for="(_company, index) in companyLists.slice().reverse()"
              :key="index"
              @click="companyDetails(_company.company_id)"
              class="company_tr"
            >
              <td class="company_td">
                <div class="company_detail company_add">
                  <div class="company_pic">
                    <img
                      v-if="_company.company_logo"
                      :src="
                        _company.company_logo
                          ? _company.company_logo
                          : 'K_Icons/company_logo.svg'
                      "
                      class="company-logo"
                    />
                    <span
                      v-else
                      :style="{ background: getBgColor() }"
                      class="default_logo m-r-10"
                    >
                      <b>{{ formatMemberName(_company.company) }}</b>
                    </span>
                  </div>
                  <div class="company_info">
                    <h4 class="company_name">{{ _company.company }}</h4>
                  </div>
                </div>
              </td>
              <td class="company_td">
                <div class="td_wrap td_wrap_location">
                  <strong>{{ _company.region }},</strong> {{ _company.country }}
                </div>
              </td>
              <td class="company_td">
                <div class="members_wrapper">
                  <ul class="member_wrap list-inline">
                    <li
                      v-for="(_member, index) in _company.member
                        .slice()
                        .reverse()"
                      :key="index"
                    >
                      <a
                        class="cp_none"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        :title="_member.firstname"
                      >
                        <div class="member_container">
                          <div class="">
                            <img
                              v-if="_member.profile_image"
                              :src="
                                _member.profile_image
                                  ? _member.profile_image
                                  : 'K_Icons/no_photo.svg'
                              "
                              class="members_profile_pic"
                              alt=""
                            />
                            <div
                              v-else
                              class="default_logo default_member_logo"
                            >
                              <b> {{ formatMemberName(_member.firstname) }}</b>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
              <td class="company_td">
                <div class="right_arrow text-center">
                  <img src="K_Icons/arrow-right-fill.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- member end -->
  </div>
</template>

<script>
import UserPic from "../../assets/users/Avatar.png";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { mapGetters } from "vuex";
import {
  getFirstLetter,
  setRandomBackground,
} from "../../utils/commonHelperFuntions";
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
export default {
  components: {},

  data() {
    return {
      UserPic,
      tablist,
      // roles: ["Consultant", "Employee", "Owner"],
      // categories: ["category 1", "category 2", "category 3"],
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    };
  },
  computed: {
    ...mapGetters({
      companyLists: "staffsCompanies",
    }),
  },
  methods: {
    // get member name format
    formatMemberName(str) {
      return getFirstLetter(str);
    },
    // get member name format
    getBgColor() {
      return setRandomBackground();
    },

    addCompany() {
      this.$router.push({ name: "company-update" });
    },

    companyDetails(id) {
      this.$store.dispatch("CAMPNAY_PROFILE_DATA", {
        auth_token: this.staffData.auth_token,
      });
      localStorage.setItem("selected_company", id);
      this.$store.dispatch("getActiveCompany", id);
      this.$router.push({ name: "company-profile" });
    },
  },
  mounted() {
    Array.from(
      document.querySelectorAll('a[data-bs-toggle="tooltip"]')
    ).forEach((tooltipNode) => new Tooltip(tooltipNode));
  },
};
</script>

<style lang="scss" scoped>
.default_logo {
  justify-content: center;
  align-content: center;
  display: inline-flex;
  line-height: 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  b {
    font-weight: bold;
    font-size: 16px;
    line-height: 2.4rem;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
}
.default_member_logo {
  background-color: #8f9bb3;
  border-radius: 50% !important;
  border: 2px solid #ffffff;
}
.first_letter_wraper {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 36px;
  border: 1px solid #fff;
  background-color: #8f9bb3;
  padding: 5px 0;
  text-align: center;
}
.member_first_letter {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}
.list-inline {
  margin-bottom: 0;
  padding-left: 0;
}
.list-inline li {
  display: inline-block;
  display: inline-block;
  margin-left: -12px;
  z-index: 1;
  &:first-child {
    margin-left: 0px;
  }
  &:hover {
    z-index: 9;
  }
}
.list-inline li a {
  cursor: pointer;
  z-index: 1;
  text-decoration: none;
  &:hover {
    z-index: 9;
    position: relative;
  }
}
.td_wrap_location {
  font-size: 15px;
  font-weight: 400;
  color: #222b45;
}
.add_company_button {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  text-align: center;
  background-color: #edf1f7;
  cursor: pointer;
  .add_icon {
    color: #222b45;
    font-size: 18px;
    font-weight: 700;
  }
}
.add_new_company {
  cursor: pointer;
}
.company_tr {
  border-radius: 4px;
  border-bottom: 10px solid #eff3f9;
}
.icons_wrap {
  margin-bottom: 0;
  padding-left: 0;
}
.members_profile_pic {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  border: 2px solid #fdfdfd;
}
.tabs_wrap {
  display: flex;
  justify-content: space-between;
}

.company_tbody {
  border: 0 !important;
  tr {
    &:last-child {
      .company_td {
        border-bottom: 0;
      }
    }
  }
}

.table {
  padding: 0;
}

.company_td {
  vertical-align: middle;
  padding: 0;
  cursor: pointer;
  border-bottom: 1px solid #ffffff;
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  .td_location {
    font-style: italic;
    font-size: 15px;
    font-weight: 500;
    color: #222b45;
  }
  .td_members {
    font-style: italic;
    font-size: 15px;
    font-weight: 500;
    color: #222b45;
  }
}
.td_wrap {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  margin: 8px 0;
  width: 340px;
  height: 68px;
  padding: 20px 0px;
  vertical-align: middle;
}
.company_new {
  margin-bottom: 0;
  font-size: 18px;
  font-style: italic !important;
  font-weight: 700;
  display: inline;
  color: #222b45;
}
.company_add {
  padding: 14px 20px;
  margin-right: 20px;
  background: #ffffff;
  margin: 8px 0;
  width: 324px;
  height: 68px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  .company_pic {
    margin-right: 16px;
    .company-logo {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      display: block;
      text-align: center;
    }
  }
}
.company_detail {
  display: flex;
  align-items: center;
}
.company_info {
  .company_name {
    margin-bottom: 0;
    font-size: 18px;
    font-weight: 700;
    color: #222b45;
    display: inline-block;
    width: 220px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
  .member_email {
    margin-bottom: 0;
    font-weight: 400;
    font-style: 14px;
    color: #222b45;
  }
}
.member_category {
  padding: 0;
  width: 40%;
  border-bottom: 1px solid #edf1f7;
}
.member_name {
  padding: 0;
  width: 40%;
  border-bottom: 1px solid #edf1f7;
}
.member_role {
  padding: 0;
  width: 20%;
  border-bottom: 1px solid #edf1f7;
}
.company_tabel {
  width: 100%;
  margin-bottom: 0;
  .search_filter {
    width: 50%;
    margin-bottom: 0;
    margin: 0 auto;
    margin-right: 0;
  }
  .role_cat_filter {
    width: 40%;
    margin-bottom: 0;
  }
}
.member_filter {
  width: 170px;
}
.table_label {
  font-size: 14px;
  color: #8f9bb3;
  font-weight: 500;
  margin-bottom: 9px;
}
.border-0 {
  border: 0;
}
</style>
