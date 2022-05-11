<template>
  <div class="">
    <button
      @click="invitePeople"
      class="btn-primary-outline btn text-uppercase k_btnfs14_w700"
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
          <div class=""></div>
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
import InvitationRole from "../Shared/InvitationARole.vue";
import { Modal } from "bootstrap";
import CompanyService from "../../Services/Company/CompanyService";
import errorhandler from "../../utils/Error";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      staffInfo: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
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
      allDepartments: "staffsDepartment",
    }),
  },

  methods: {
    invitePeople() {
      this.modal.show();
      if (this.staffInfo && Object.keys(this.staffInfo).length != 0) {
        // this.departmentByStaffId();
        console.log("data", this.allDepartments);
        this.getInvitaionPeopleListByRole();
        this.departmentLists = this.allDepartments;
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
          this.rolesOfStaff = res.data.data;
          this.$store.dispatch("GET_INVITATION_STAFFROLE_LIST", res.data.data);
        } else {
          errorhandler(res, this);
        }
      });
    },
    // get list of departments
    departmentByStaffId() {
      this.$store
        .dispatch("GET_STAFFS_DEPARTMENT", {
          auth_token: this.staffInfo.auth_token,
        })
        .then((res) => {
          console.log("deptkk array", res);
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
