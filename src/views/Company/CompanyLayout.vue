<template>
  <div>
    {{}}
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
        <div class="invite_btn_wrap">
          <button
            @click="invitePeople"
            class="btn-primary btn text-uppercase k_btnfs14_w700"
          >
            {{ $t("company_profile.buttons.invite_members") }}
          </button>
        </div>
      </div>
      <!-- tabs end -->
      <div class="overview_container">
        <router-view />
      </div>
    </div>
  </div>
  <!-- Invite People Modal -->
  <div class="modal fade" ref="invitationModal">
    <div class="modal-dialog modal-xl invitation_dialog">
      <div class="modal-content invitaion_content">
        <div class="modal-header invite_header">
          <div class="m-l-auto">
            <button
              @click="closeModal"
              class="btn btn-transaprent zp-0 m-l-auto"
            >
              <img src="K_Icons/cancel.svg" alt="" class="cancel_icon" />
            </button>
          </div>
        </div>
        <div class="modal-body invitaion_body">
          <InvitationRole :departments="departmentLists" />
        </div>
        <div class="modal-footer invite_modal_footer">
          <button
            type="button"
            class="btn btn-light btn-set"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
        </div>
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
];
import TabsHr from "../../components/Shared/TabsHr.vue";
import searchIcon from "../../../public/icons/search.svg";
import InvitationRole from "../../components/Shared/InvitationARole.vue";
import { Modal } from "bootstrap";
import { mapGetters } from "vuex";
import companyService from "../../Services/Company/CompanyService";

export default {
  data() {
    return {
      tablist,
      searchIcon,
      departmentLists: [],
      dept: true,
      modal: null,
      title: "company_profile.Company",
    };
  },
  components: {
    TabsHr,
    InvitationRole,
  },
  computed: {
    ...mapGetters({
      staffInfo: "staffData",
    }),
  },
  mounted() {
    this.modal = new Modal(this.$refs.invitationModal);
  },
  created() {
    if (this.staffInfo != null) {
      this.departmentByStaffId();
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
            for (let k = 0; k < res.data.data.length; k++) {
              let dept = {
                value: res.data.data[k].departmentid,
                label: res.data.data[k].name,
              };
              this.departmentLists.push(dept);
            }
            this.$store.dispatch("getStaffsDepartment", this.departmentLists);
            console.log("latest department kk list", this.departmentLists);
          } else {
            let $th = this;
            if ("error" in res.data) {
              Object.keys(res.data.error).map(function (key) {
                $th.$toast.error(res.data.error[key], {
                  position: "bottom-left",
                  duration: 3712,
                });
              });
            } else {
              $th.$toast.error(res.data.message, {
                position: "bottom-left",
                duration: 3712,
              });
            }
          }
        });
    },
    invitePeople() {
      this.modal.show();
      console.log("Please Open Modal");
    },

    closeModal() {
      this.modal.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
// modal start
.invitation_dialog {
  width: 80%;
}
.invitaion_content {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  text-align: justify;
}
.invite_modal_footer {
  border-top: 0;
  padding: 8px 26px;
}
.invite_header {
  border-bottom: 0;
  padding: 8px 26px;
}
.invitaion_body {
  padding: 0px 26px;
}
// modal end
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
