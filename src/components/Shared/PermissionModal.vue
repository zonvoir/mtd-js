<template>
  <div class="modal fade" ref="invitationModal">
    <div class="modal-dialog modal-xl invitation_dialog">
      <div class="modal-content invitaion_content perms_content">
        <div class="modal-header invite_header">
          <div class="">
            <h4 class="m-b-0 title-dark">Description Permission</h4>
          </div>
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
                :header="department.name"
                class="prime_accordion_tab"
              >
                <div class="staff_desc">
                  <!-- permission component  -->
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
      isGettingData: false,
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
    // vuex getter varables
    ...mapGetters({
      staffInfo: "staffDataLocal", // auth token from local storage
      permissonList: "memberPermissions", // default permission given to the user
      membersDepartment: "alocatedDepartments", // department in which permemission will be change
    }),
  },

  methods: {
    // get data emmited by permissionTable component
    getLatestPermission(val) {
      this.updatedPermissionArr = this.permissionArr.filter(
        (dept, idx, deptArr) => {
          if (dept.id == val.dept_id) {
            dept.category = val.deptPermission;
          }
          return deptArr;
        }
      );
    },

    // update the member default permission
    setPermission(id) {
      this.currentStaffId = id;
      let data = {
        auth_token: this.staffInfo.auth_token,
        staffid: this.currentStaffId,
      };
      this.isGettingData = true;
      CompanyService.setMemberPermission(data)
        .then((res) => {
          if (res.data.status) {
            this.permissionArr = res.data.data;
            this.departmentArr = [];
            this.isAccordionArr = new Array(this.permissionArr.length).fill(
              false
            );

            for (let i = 0; i < res.data.data.length; i++) {
              let data = {
                value: res.data.data[i].departmentid,
                label: res.data.data[i].name,
              };
              this.departmentArr.push(data);
            }

            // get members department
            this.$store.dispatch(
              "GET_ALOCATED_DEPARTMENTS",
              this.departmentArr
            );

            // get member updated permissions
            this.$store.dispatch("GET_PERMISSION_ARRAY", this.permissionArr);
            this.modal.show();
          } else {
            // error notifications
            errorhandler(res);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isGettingData = false;
        });
    },

    // closeModal
    closeModal() {
      this.modal.hide();
    },

    // save the modifiied permission list
    saveMemberPermission() {
      let data = {
        auth_token: this.staffInfo.auth_token,
        staffid: this.currentStaffId,
        member_permissions: this.updatedPermissionArr,
      };

      CompanyService.updateMemberPermission(data).then((res) => {
        if (res.data.status) {
          this.permissionArr = res.data.data;
          // set the member permission
          this.$store.dispatch("GET_PERMISSION_ARRAY", this.permissionArr);
          this.modal.hide();
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
.perms_content {
  padding: 10px 0;
}
.invitaion_content perms_content {
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
