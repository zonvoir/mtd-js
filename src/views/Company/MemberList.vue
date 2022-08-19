<template>
  <PermissionModal ref="perm_modal" />
  <div class="member_container">
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
                        <MultiSelect
                          class="prime_multiselect"
                          optionLabel="label"
                          optionValue="value"
                          :placeholder="
                            $t(
                              'company_profile.members_tab.members_table.placeholder.role'
                            )
                          "
                          @change="memberFilterbyDepartment"
                          v-model="myRole"
                          :options="ownRoleLists"
                        />
                      </div>
                    </td>
                    <td class="member_name_td">
                      <div class="k_select_single member_filter m-r-8">
                        <MultiSelect
                          class="prime_multiselect"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Category"
                          :options="categoriesList"
                          v-model="categy_list"
                          @change="memberFilterbyDepartment"
                        />
                      </div>
                    </td>
                    <td class="member_name_td">
                      <div class="k_select_single member_filter">
                        <MultiSelect
                          :options="departmentLists"
                          class="prime_multiselect"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Departments"
                          @change="memberFilterbyDepartment"
                          v-model="dept_list"
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
                          @input="SearchByKeyword"
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
            <tr
              v-for="(people, index) in allMembersList.slice().reverse()"
              :key="index"
            >
              <td class="member_td">
                <div class="member_detail">
                  <div class="member_pic">
                    <img
                      v-if="people.profile_image"
                      :src="people.profile_image ? people.profile_image : ''"
                      class="member_profile"
                    />
                    <span v-else class="default_logo">
                      <b>{{ formatMemberName(people.firstname) }}</b>
                    </span>
                  </div>
                  <div class="member_info">
                    <h4 class="member_Id">
                      {{ people.firstname }} {{ people.lastname }}
                    </h4>
                    <p
                      v-if="people.primary_email === null"
                      class="member_email"
                    >
                      {{ people.invited_email }}
                    </p>
                    <p v-else class="member_email">
                      {{ people.primary_email }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="member_td">{{ people.role_name }}</td>
              <td class="member_td">
                <div class="category_wrapper">
                  <ul class="icons_wrap list-inline">
                    <li
                      v-for="(department, idx) in people.departments.slice(
                        0,
                        3
                      )"
                      :key="department.departmentid + idx"
                    >
                      <a
                        data-bs-toggle="tooltip_dept"
                        data-bs-placement="bottom"
                        :title="department.name"
                      >
                        <div class="icon_container">
                          <div class="icon_bg">
                            <img
                              :src="
                                department.department_logo
                                  ? department.department_logo
                                  : 'K_Icons/weighing_scale.svg'
                              "
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>

                    <li v-if="people.departments.length > 3">
                      <a data-bs-placement="bottom">
                        <div class="icon_container">
                          <div class="icon_bg bg_light_yellow">
                            <img
                              src="K_Icons/speaker.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                          <span class="total_icons">
                            +{{ people.departments.length - 3 }}
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>

                  <div v-if="people.set_permissions" class="permission_btns">
                    <button
                      @click="openPermissionModal(people.staffid)"
                      type="button"
                      class="btn-light fs-14 btn-set fw-700 btn"
                    >
                      <div
                        v-if="
                          activeId == people.staffid &&
                          $refs.perm_modal.isGettingData
                        "
                      >
                        <DotLoader
                          :bgColor="'#222b45'"
                          :wideLength="btnDyanmicWidth"
                          :isLoading="$refs.perm_modal.isGettingData"
                        />
                      </div>
                      <div v-else class="">Permission</div>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="allMembersList.length === 0">
              <td class="member_td" colspan="4">
                <div class="">
                  <h4 class="no_data_message">No Record found</h4>
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
import searchIcon from "../../../public/icons/search.svg";
import MultiSelect from "primevue/multiselect";

import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { mapGetters } from "vuex";
import PermissionModal from "../../components/Shared/PermissionModal.vue";
import DotLoader from "../../components/Shared/DotLoader.vue";
import CompanyService from "../../Services/Company/CompanyService";
import { getFirstLetter } from "../../utils/commonHelperFuntions";

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
    PermissionModal,
    MultiSelect,
    DotLoader,
  },

  data() {
    return {
      searchIcon,
      activeId: 0,

      myRole: [],
      userKeyword: undefined,
      filterRole: "",

      tablist,
      dept_list: [],
      categy_list: [],
      allMembersList: [],
    };
  },

  computed: {
    // vuex getters variables
    ...mapGetters({
      staffData: "staffDataLocal",
      membersList: "companyMembers",
      ownRole: "roleInCompany",
      categoriesList: "allCategories",
      ownRoleLists: "allRoles",
      departmentLists: "staffsDepartment",
    }),
  },

  watch: {
    membersList: function () {
      this.allMembersList = this.membersList;
    },
  },

  mounted() {
    //inti tooltip
    Array.from(
      document.querySelectorAll('a[data-bs-toggle="tooltip_dept"]')
    ).forEach((tooltipNode) => new Tooltip(tooltipNode));
  },

  created() {
    // get all member list, department list and category list on page load
    this.allMembersList = this.membersList;
    this.$store.dispatch("GET_STAFFS_DEPARTMENT", {
      auth_token: this.staffData.auth_token,
    });
    this.getRoleInCompany();
    this.getdDepartmentList();
    this.getCategoryList();
  },

  methods: {
    // open member permissionaModal
    openPermissionModal(val) {
      this.activeId = val;
      this.$refs.perm_modal.setPermission(val);
    },

    // get the firt letter from the member name
    formatMemberName(str) {
      return getFirstLetter(str);
    },

    // filter member by the search inputs
    SearchByKeyword(event) {
      this.userKeyword = event.target.value;
      console.log(this.userKeyword);
      if (
        this.userKeyword != "" &&
        this.userKeyword != null &&
        this.userKeyword != undefined
      ) {
        let data = {
          role_id: this.filterRole,
          department_id: this.dept_list,
          search: this.userKeyword,
          auth_token: this.staffData.auth_token,
        };
        this.filterMemberList(data);
      } else {
        // default member list without any filter
        this.memberListDeafault();
      }
    },

    // default member list with no filter are applied
    memberListDeafault() {
      this.allMembersList = this.membersList;
    },

    // filter by Department
    memberFilterbyDepartment() {
      let data = {
        role_id: this.myRole.map(Number),
        department_id: this.dept_list.map(Number),
        category_id: this.categy_list.map(Number),
        search: this.userKeyword,
        auth_token: this.staffData.auth_token,
      };
      this.filterMemberList(data);
    },

    // filter member list

    filterMemberList(filterParams) {
      CompanyService.memberByRoleId(filterParams).then((res) => {
        if (res.data.status) {
          let filterdMemberList = res.data.data;
          this.allMembersList = filterdMemberList;
        } else {
          this.allMembersList = [];
        }
      });
    },

    // get role in company lists
    getRoleInCompany() {
      this.$store.dispatch("GET_ROLES");
    },

    // get All Category lists
    getCategoryList() {
      this.$store.dispatch("GET_ALL_CATEGORIES");
    },

    getdDepartmentList() {
      this.$store.dispatch("GET_ALL_COMPANY_DEPARTMENT");
    },
  },
};
</script>

<style lang="scss" scoped>
.default_logo {
  justify-content: center;
  align-content: center;
  display: inline-flex;
  line-height: 3rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #8f9bb3;
  border: 2px solid #ffffff;
  b {
    font-weight: bold;
    font-size: 16px;
    line-height: 3rem;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
}
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
.no_data_message {
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #8f9bb3;
}
.member_container {
  margin-bottom: 20px;
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
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
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
  padding: 0 !important;
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
  // width: 170px;
  width: 180px;
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
.table_container {
  background-color: #ffffff;
  padding: 20px 24px 0 24px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
}
.btn-set {
  text-transform: uppercase;
}
</style>
