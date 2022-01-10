<template>
  <div class="invite_btn_wrap">
    <button
      @click="invitePeople"
      class="btn-primary btn text-uppercase k_btnfs14_w700"
    >
      <slot name="invite-button"></slot>
    </button>
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
          <InvitationRole
            :departments="departmentLists"
            :staffRoles="rolesOfStaff"
          />
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
import InvitationRole from "../Shared/InvitationARole.vue";
import { Modal } from "bootstrap";
import CompanyService from "../../Services/Company/CompanyService";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modal: null,
      rolesOfStaff: [],
      departmentLists: [],
    };
  },
  components: {
    InvitationRole,
  },
  mounted() {
    this.modal = new Modal(this.$refs.invitationModal);
  },
  computed: {
    ...mapGetters({
      staffInfo: "staffData",
      allDepartments: "staffsDepartment",
    }),
  },
  watch: {
    allDepartments: function () {
      this.departmentLists = this.allDepartments;
    },
  },

  created() {
    if (
      this.staffInfo != null ||
      this.staffInfo != undefined ||
      this.staffInfo != ""
    ) {
      this.departmentByStaffId();
      this.getInvitaionPeopleListByRole();
    }
  },
  methods: {
    invitePeople() {
      console.log("modal clicked");
      this.modal.show();
      if (
        this.staffInfo != null ||
        this.staffInfo != undefined ||
        this.staffInfo != ""
      ) {
        this.departmentByStaffId();
        this.getInvitaionPeopleListByRole();
      }
    },

    closeModal() {
      this.modal.hide();
    },
    // get List of invited people
    getInvitaionPeopleListByRole() {
      CompanyService.getInvitationByRole({
        auth_token: this.staffInfo.auth_token,
      }).then((res) => {
        if (res.data.status) {
          console.log("all invitaion list of people", res.data.data);
          this.rolesOfStaff = res.data.data;
          this.$store.dispatch(
            "getInvitationList",
            res.data.data.invitation_list
          );
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
    // get list of departments
    departmentByStaffId() {
      CompanyService.departmentsByToken({
        auth_token: this.staffInfo.auth_token,
      }).then((res) => {
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
</style>
