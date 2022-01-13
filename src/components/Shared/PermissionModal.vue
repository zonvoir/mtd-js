<template>
  <div class="invite_btn_wrap">
    <!-- <button
      @click="invitePeople"
      class="btn-primary btn text-uppercase k_btnfs14_w700"
    >
    </button> -->
    <!-- @click="setPermission(people.staffid)" -->
    <button
      @click="setPermission"
      type="button"
      class="btn-light fs-14 btn-set fw-700 btn"
    >
      <slot name="permission-button"></slot>
    </button>
  </div>
  <!-- Permission Invite People Modal -->
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
          <div class="">
            <DepartmentPermission
              :departments="departmentLists"
              :staffRoles="rolesOfStaff"
            />
          </div>
          <div class="">
            <BaseAccordion :allDepartments="membersDepartment">
              <template v-slot:accordion_content_body>
                <div class="m-t-20">
                  <PermissionTable />
                </div>
              </template>
            </BaseAccordion>
          </div>
        </div>
        <div class="modal-footer invite_modal_footer">
          <button
            type="button"
            class="btn btn-light btn-set"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            :disabled="isvalid"
            @click="setMemberPermission"
            type="button"
            class="btn btn-primary btn-set m-l-10"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PermissionTable from "../../views/Company/PermissionTable.vue";
import DepartmentPermission from "../Shared/DepartmentPermission.vue";
import { Modal } from "bootstrap";
import BaseAccordion from "../Shared/BaseAccordion.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modal: null,
      rolesOfStaff: [],
      departmentLists: [],
      isvalid: true,
    };
  },
  components: {
    DepartmentPermission,
    PermissionTable,
    BaseAccordion,
  },
  mounted() {
    this.modal = new Modal(this.$refs.invitationModal);
  },
  computed: {
    ...mapGetters({
      staffInfo: "staffData",
      membersDepartment: "staffsDepartment",
    }),
  },
  methods: {
    setPermission(id) {
      console.log("modal clicked", id);
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    setMemberPermission() {
      console.log("modal closed");
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-set {
  text-transform: uppercase;
}
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
