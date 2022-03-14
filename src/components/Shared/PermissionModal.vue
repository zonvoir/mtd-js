<template>
  <div class="">
    <slot name="permission-button" :openPermissionModal="setPermission"></slot>
  </div>
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
            <DepartmentPermission :staffId="currentStaffId" />
          </div>
          <div class="">
            <Accordion :activeIndex="0" class="prime_accordion">
              <AccordionTab
                v-for="(department, index) in permissonList"
                :key="index"
                class="prime_accordion_tab"
                :header="department.name"
              >
                <div class="staff_desc">
                  <PermissionTable
                    @getUpdatedPermission="getLatestPermission"
                    :categoryList="department.categories"
                  />
                </div>
              </AccordionTab>
            </Accordion>
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
import DepartmentPermission from "../Shared/DepartmentPermission.vue";
import PermissionTable from "../../views/Company/PermissionTable.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { Modal } from "bootstrap";
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
      isAccordionArr: [],
      updatedPermissionArr: undefined,
      isvalid: true,
      currentStaffId: undefined,
    };
  },

  components: {
    DepartmentPermission,
    PermissionTable,
    Accordion,
    AccordionTab,
  },

  mounted() {
    this.modal = new Modal(this.$refs.invitationModal);
  },

  computed: {
    ...mapGetters({
      staffInfo: "staffData",
      permissonList: "memberPermissions",
      membersDepartment: "alocatedDepartments",
    }),
  },
  methods: {
    getLatestPermission(val) {
      console.log("updated department permissions", val);
      this.updatedPermissionArr = this.permissionArr.filter(
        (dept, idx, deptArr) => {
          if (dept.id == val.dept_id) {
            dept.category = val.deptPermission;
          }
          return deptArr;
        }
      );
      console.log("updated permissions", this.updatedPermissionArr);
    },
    setPermission(id) {
      this.currentStaffId = id;
      let data = {
        auth_token: this.staffInfo.auth_token,
        staffid: this.currentStaffId,
      };
      CompanyService.setMemberPermission(data).then((res) => {
        if (res.data.status) {
          this.permissionArr = res.data.data;
          this.departmentArr = [];
          this.isAccordionArr = new Array(this.permissionArr.length).fill(
            false
          );
          console.log("assign dept", this.permissionArr);
          for (let i = 0; i < res.data.data.length; i++) {
            let data = {
              value: res.data.data[i].departmentid,
              label: res.data.data[i].name,
            };
            this.departmentArr.push(data);
          }
          this.$store.dispatch("GET_ALOCATED_DEPARTMENTS", this.departmentArr);
          this.$store.dispatch("GET_PERMISSION_ARRAY", this.permissionArr);
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
      console.log("updated permission", this.updatedPermissionArr);
      let data = {
        auth_token: this.staffInfo.auth_token,
        staffid: this.currentStaffId,
        member_permissions: this.updatedPermissionArr,
      };
      CompanyService.updateMemberPermission(data).then((res) => {
        if (res.data.status) {
          this.permissionArr = res.data.data;
          this.$store.dispatch("GET_PERMISSION_ARRAY", this.permissionArr);
          console.log(
            "response is comming from updated permissions",
            res.data.data
          );
          this.modal.hide();
        }
      });
      console.log("modal closed");
    },
    // toggle accordion
    toggleAccordion(index) {
      this.isAccordionArr.forEach((ac, i) => {
        if (index === i) {
          this.isAccordionArr[i] = !this.isAccordionArr[i];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-set {
  text-transform: uppercase;
}
.staff_desc {
  padding-bottom: 20px;
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
// style for accordion
.desc_cont {
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #222b45;
}
.accordion-button:not(.collapsed) {
  &::after {
    background-image: url(../../../public/K_Icons/arrow_d.svg);
  }
}
.section_wrap {
  display: flex;
  align-items: center;
  // margin-bottom: 24px;
  cursor: pointer;
}
.body_wrap {
  margin-bottom: 10px;
}
.description_body_wrap {
  min-block-size: 0;
  transition: 500ms;
  transition: height 500ms;
  &.collapse {
    transition: 1s;
    transition: height 500ms;
    display: block !important;
  }
  // margin-top: 24px;
}
.acc_body {
  padding: 0;
}
.sub_acc_body {
  padding: 12px 18px;
  background: #f7f9fc;
  border-radius: 4px;
}
</style>
