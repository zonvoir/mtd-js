<template>
  <div class="invite_btn_wrap">
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
                  <PermissionTable
                    :permissionArr="permissionArr.categories"
                    v-for="permissionArr in permissionArr"
                    :key="permissionArr.departmentid"
                  />
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
            @click="saveMemberPermission"
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
import CompanyService from "../../Services/Company/CompanyService";
import errorhandler from "../../utils/Error";
export default {
  data() {
    return {
      modal: null,
      rolesOfStaff: [],
      departmentLists: [],
      permissionArr: [],
      departmentArr: [],
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
      // membersDepartment: "alocatedDepartments",
    }),
  },
  methods: {
    setPermission(id) {
      console.log("modal clicked", id);
      let data = {
        auth_token: this.staffInfo.auth_token,
        staffid: 42,
      };
      CompanyService.setMemberPermission(data).then((res) => {
        if (res.data.status) {
          this.permissionArr = res.data.data;
          this.departmentArr = [];
          console.log("assign dept", res.data.data);
          for (let i = 0; i < res.data.data.length; i++) {
            let data = {
              departmentid: res.data.data[i].departmentid,
              name: res.data.data[i].name,
            };
            this.departmentArr.push(data);
            console.log("show all departments of staff", this.departmentArr);
          }
          this.$store.dispatch("GET_ALOCATED_DEPARTMENTS", this.departmentArr);
          this.modal.show();
        } else {
          errorhandler(res, this);
        }
      });
    },
    closeModal() {
      this.modal.hide();
    },
    saveMemberPermission() {
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
