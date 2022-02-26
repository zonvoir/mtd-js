<template>
  <div>
    <!-- {{ $store.state.staffsDepartment }} -->
    <!-- {{ allDepartments }} -->
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div class="">
              <h4 class="view_title">{{ $t(title) }}</h4>
            </div>
          </div>
        </div>
      </div>
      <!-- tabs start -->
      <div class="tabs_wrap m-b-18">
        <div class="">
          <TabsHr :tabs="tablist" @changeTitle="ChangeT($event)" />
        </div>
        <div class="" v-if="ownRole.can_invite">
          <InvitePeopleModal>
            <template v-slot:invite-button>
              {{ $t("overview_index.buttons.invite_people") }}
            </template>
          </InvitePeopleModal>
        </div>
      </div>
      <!-- tabs end -->
      <div class="overview_container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
const tablist = [
  {
    tabId: 0,
    title: "company_profile.Company",
    tabTitle: "company_profile.tab.company",
    component_url: "/company/company-list",
  },
  {
    tabId: 1,
    title: "company_profile.Members",
    tabTitle: "company_profile.tab.member",
    component_url: "/company/members",
  },
  {
    tabId: 2,
    title: "company_profile.Peers",
    tabTitle: "company_profile.tab.peers",
    component_url: "/company/peers",
  },
];
import TabsHr from "../../components/Shared/TabsHr.vue";
import searchIcon from "../../../public/icons/search.svg";
import InvitePeopleModal from "../../components/Shared/InvitePeopleModal.vue";
// import CareerInformationModal from "../../components/Shared/CareerInformationModal.vue";
import { mapGetters } from "vuex";
import companyService from "../../Services/Company/CompanyService";
import errorhandler from "../../utils/Error";

export default {
  data() {
    return {
      tablist,
      searchIcon,
      departmentLists: [],
      dept: true,
      title: "company_profile.Company",
    };
  },
  components: {
    TabsHr,
    InvitePeopleModal,
    // CareerInformationModal,
  },
  computed: {
    ...mapGetters({
      staffInfo: "staffData",
      allDepartments: "staffsDepartment",
      ownRole: "roleInCompany",
    }),
  },
  // watch: {
  //   allDepartments: function () {
  //     this.departmentLists = this.allDepartments;
  //   },
  // },
  created() {
    this.departmentLists = this.allDepartments;
    if (this.staffInfo != null) {
      this.departmentLists = this.allDepartments;
      // this.departmentByStaffId();
    }
  },
  methods: {
    ChangeT(title) {
      this.title = title;
    },
    departmentByStaffId() {
      companyService
        .departmentsByToken({ auth_token: this.staffInfo.auth_token })
        .then((res) => {
          if (res.data.status) {
            this.departmentLists = [];
            this.departmentLists = res.data.data;
            // for (let k = 0; k < res.data.data.length; k++) {
            //   let dept = {
            //     value: res.data.data[k].departmentid,
            //     label: res.data.data[k].name,
            //   };
            //   this.departmentLists.push(dept);
            // }
            // console.log("all departments of role id", this.departmentLists);
            this.$store.dispatch("GET_STAFFS_DEPARTMENT", this.departmentLists);
          } else {
            errorhandler(res, this);
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
.tabs_wrap {
  display: flex;
  justify-content: space-between;
}
._search_filter {
  background: #ffffff;
  border-radius: 4px;
  width: 300px;
}
.search_btn {
  position: absolute;
  top: 0;
  right: 0;
}
.border-bottom-1 {
  margin-top: 40px;
  border-bottom: 1px solid #e4e9f2;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
.k_btn_people {
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
}
</style>
