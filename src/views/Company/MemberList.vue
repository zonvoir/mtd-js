<template>
  <div class="member_container">
    <!-- member table -->
    <div class="table_container">
      <div class="table_labels">
        <table class="table member_tabel">
          <thead>
            <tr>
              <th class="member_name">
                <div class="label_name">
                  <h3 class="table_label">
                    {{ $t("company_profile.members_tab.members_table.Name") }}
                  </h3>
                </div>
              </th>
              <th class="member_role">
                <div class="label_name">
                  <h3 class="table_label">
                    {{ $t("company_profile.members_tab.members_table.Role") }}
                  </h3>
                </div>
              </th>
              <th class="member_category">
                <div class="label_name">
                  <h3 class="table_label">
                    {{
                      $t("company_profile.members_tab.members_table.Categories")
                    }}
                  </h3>
                </div>
              </th>
            </tr>
            <tr>
              <td class="filter_name_td">
                <table class="table role_cat_filter">
                  <tr>
                    <td class="member_name_td">
                      <div class="k_select_single member_filter m-r-8">
                        <Multiselect
                          :placeholder="
                            $t(
                              'company_profile.members_tab.members_table.placeholder.role'
                            )
                          "
                          class="form-control k_inp_field"
                          rules="required"
                          :options="roles"
                        />
                      </div>
                    </td>
                    <td class="member_name_td">
                      <div class="k_select_single member_filter">
                        <Multiselect
                          :placeholder="
                            $t(
                              'company_profile.members_tab.members_table.placeholder.category'
                            )
                          "
                          class="form-control k_inp_field"
                          rules="required"
                          :options="categories"
                        />
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
              <td class="filter_name_td"></td>
              <td class="filter_name_td">
                <table class="table search_filter">
                  <tr>
                    <td class="member_name_td">
                      <div class="psw_visibilty">
                        <input
                          type="text"
                          class="form-control _search_filter k_inp_field"
                          :placeholder="
                            $t(
                              'company_profile.members_tab.members_table.placeholder.search_here'
                            )
                          "
                        />

                        <span class="search_btn">
                          <button type="button" class="btn eye_btn btn-white">
                            <img :src="searchIcon" class="search_icon" />
                          </button>
                        </span>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </thead>
          <tbody class="member_tbody">
            <tr>
              <td class="member_td">
                <div class="member_detail">
                  <div class="member_pic">
                    <img :src="UserPic" class="member_profile" />
                  </div>
                  <div class="member_info">
                    <h4 class="member_Id">Mike Johnson</h4>
                    <p class="member_email">mike.johnson@morethandigital.com</p>
                  </div>
                </div>
              </td>
              <td class="member_td">Member</td>
              <td class="member_td">
                <div class="category_wrapper">
                  <ul class="icons_wrap list-inline">
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_teal">
                            <img
                              src="K_Icons/weighing_scale.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Logistic"
                      >
                        <div class="icon_container">
                          <div class="icon_bg bg_light_yellow">
                            <img
                              src="K_Icons/speaker.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Logistic"
                      >
                        <div class="icon_container">
                          <div class="icon_bg bg_light_info">
                            <img
                              src="K_Icons/settings.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div class="permission_btns">
                    <button
                      class="btn-light text-uppercase fs-14 btn-set fw-700 btn"
                    >
                      {{ $t("company_profile.members_tab.buttons.permission") }}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="member_td">
                <div class="member_detail">
                  <div class="member_pic">
                    <img :src="UserPic" class="member_profile" />
                  </div>
                  <div class="member_info">
                    <h4 class="member_Id">Mike Johnson</h4>
                    <p class="member_email">mike.johnson@morethandigital.com</p>
                  </div>
                </div>
              </td>
              <td class="member_td">Member</td>
              <td class="member_td">
                <div class="category_wrapper">
                  <ul class="icons_wrap list-inline">
                    <li>
                      <a
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Logistic"
                      >
                        <div class="icon_container">
                          <div class="icon_bg bg_light_teal">
                            <img
                              src="K_Icons/weighing_scale.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_yellow">
                            <img
                              src="K_Icons/speaker.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Logistic"
                      >
                        <div class="icon_container">
                          <div class="icon_bg bg_light_info">
                            <img
                              src="K_Icons/settings.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div class="permission_btns">
                    <button class="btn-light fs-14 btn-set fw-700 btn">
                      PERMISSIONS
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="member_td">
                <div class="member_detail">
                  <div class="member_pic">
                    <img :src="UserPic" class="member_profile" />
                  </div>
                  <div class="member_info">
                    <h4 class="member_Id">Mike Johnson</h4>
                    <p class="member_email">mike.johnson@morethandigital.com</p>
                  </div>
                </div>
              </td>
              <td class="member_td">Member</td>
              <td class="member_td">
                <div class="category_wrapper">
                  <ul class="icons_wrap list-inline">
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_teal">
                            <img
                              src="K_Icons/weighing_scale.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_yellow">
                            <img
                              src="K_Icons/speaker.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Logistic"
                      >
                        <div class="icon_container">
                          <div class="icon_bg bg_light_info">
                            <img
                              src="K_Icons/settings.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_info">
                            <img
                              src="K_Icons/settings.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                          <span class="total_icons"> +37 </span>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div class="permission_btns">
                    <button class="btn-light fs-14 btn-set fw-700 btn">
                      PERMISSIONS
                    </button>
                  </div>
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
// import TabsHr from "../../components/Shared/TabsHr.vue";
import Multiselect from "@vueform/multiselect";
import searchIcon from "../../../public/icons/search.svg";
import UserPic from "../../assets/users/Avatar.png";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
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
  components: {
    // TabsHr,
    Multiselect,
  },
  mounted() {
    //inti tooltip
    Array.from(
      document.querySelectorAll('a[data-bs-toggle="tooltip"]')
    ).forEach((tooltipNode) => new Tooltip(tooltipNode));
  },
  data() {
    return {
      searchIcon,
      UserPic,
      tablist,
      roles: ["Consultant", "Employee", "Owner"],
      categories: ["category 1", "category 2", "category 3"],
    };
  },
};
</script>

<style lang="scss" scoped>
.icons_wrap {
  margin-bottom: 0;
  padding-left: 0;
}
.search_btn {
  position: absolute;
  top: 8px;
  right: 8px;
}
.list-inline {
  margin-bottom: 0;
  padding-left: 0;
}
.list-inline li {
  display: inline-block;
  display: inline-block;
  margin-left: -8px;
}
.list-inline li a {
  cursor: pointer;
}
.list-inline li:nth-child(1) a {
  .icon_container {
    z-index: 9;
    position: relative;
  }
}

.list-inline li:nth-child(2) a {
  .icon_container {
    z-index: 8;
    position: relative;
  }
}

.list-inline li:nth-child(3) a {
  .icon_container {
    z-index: 7;
    position: relative;
  }
}

.list-inline li:nth-child(4) a {
  .icon_container {
    z-index: 6;
    position: relative;
  }
  .total_icons {
    background-color: #0000004d;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    text-align: center;
    line-height: 36px;
    color: white;
    font-weight: 600;
    font-size: 13px;

    z-index: 10;
  }
}

.icon_bg {
  width: 36px;
  height: 36px;
  border-radius: 36px;
}
.bg_light_teal {
  background-color: #e5f8fa;
}
.bg_light_yellow {
  background-color: #fff4e5;
}
.bg_light_info {
  background-color: #e8f4fd;
}
.icon_name {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
._search_filter {
  height: 40px;
  width: 320px;
}
.tabs_wrap {
  display: flex;
  justify-content: space-between;
}
.category_wrapper {
  display: flex;
  align-items: center;
  .icons_wrap {
  }
  .permission_btns {
    margin-left: auto;
    .btn-set {
      font-weight: 700;
      font-style: 14px;
      width: 136px;
      height: 40px;
    }
  }
}
.member_tbody {
  border: 0 !important;
  tr {
    &:last-child {
      .member_td {
        border-bottom: 0;
      }
    }
  }
}

.table {
  padding: 0;
  // &.table > :not(caption) > * > * {
  //   padding: 0;
  //   border: 0;
  // }
}
.filter_name_td {
  padding: 0;
  vertical-align: middle;
  padding: 8px 0;
  border-bottom: 0;
}
.member_name_td {
  padding: 0;
  vertical-align: middle;

  td {
    border: 0;
  }
}
.member_td {
  vertical-align: middle;
  padding: 15px 0;
  border-bottom: 1px solid #edf1f7;
}
.member_detail {
  display: flex;
  align-items: center;
  .member_pic {
    margin-right: 20px;
    .member_profile {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: block;
      text-align: center;
    }
  }
  .member_info {
    .member_Id {
      margin-bottom: 0;
      font-size: 18px;
      font-weight: 700;
      display: inline;
      color: #222b45;
    }
    .member_email {
      margin-bottom: 0;
      font-weight: 400;
      font-style: 14px;
      color: #222b45;
    }
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
.member_tabel {
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
  // border-bottom: 1px solid #edf1f7;
  // padding-bottom: 9px;
  // margin-bottom: 0;
}
.border-0 {
  border: 0;
}
.table_container {
  background-color: #ffffff;
  padding: 20px 24px 0 24px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
}
</style>
