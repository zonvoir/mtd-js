<template>
  <div>
    <div class="team_wrapper m-b-20">
      <div class="m-b-24">
        <h4 class="m-b-0 title-dark">Invite People</h4>
      </div>
      <div class="m-b-12">
        <p class="staff_desc">
          Simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          150.Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the Lorem Dummy text Industry was created.It has been the
          industry's standard dummy text.
        </p>
      </div>
    </div>
    <!-- role desc start -->

    <Accordion :activeIndex="0" class="prime_accordion">
      <AccordionTab
        v-for="staffrole in chooseRoleStaff(staffRoles, ownRole.roleId, true)"
        :key="staffrole.roleid"
        class="prime_accordion_tab"
        :header="staffrole.name"
      >
        <p class="staff_desc">
          Simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          150.Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the Lorem Dummy text Industry was created.It has been the
          industry's standard dummy text.
        </p>
      </AccordionTab>
    </Accordion>
    <!-- role desc end -->
    <!-- departments Sections -->
    <div v-if="!checkRoles()" class="">
      <div class="section_wrap k_acc_sub_btn m-b-10">
        <h4 class="m-b-0 title-dark">Choose departament(s)</h4>
      </div>
      <div class="d-flex">
        <div class="dept_selct_wrap k_form_group k_lang k_select_single">
          <MultiSelect
            :placeholder="$t('personal_account.form.placeholder.department')"
            @change="filterInvitationList"
            class="prime_multiselect"
            optionLabel="label"
            optionValue="value"
            v-model="myDepartmensList"
            :options="departments"
            @blur="v$.myDepartmensList.$touch"
            :class="{
              'is-invalid': v$.myDepartmensList.$error,
            }"
          />
          <div
            v-if="v$.myDepartmensList.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.myDepartmensList.required.$invalid"
              class="text-left fs-14"
            >
              Department is Required
            </span>
          </div>
        </div>
        <div class="k_date_picker k_inp_half m-l-10">
          <Datepicker
            ref="selected_date"
            class=""
            @open="clearDate"
            :enableTimePicker="false"
            v-model="expiryDate"
            @closed="updateDate"
          />
        </div>
      </div>
    </div>
    <!-- departments Sections ends -->
    <div class="" v-if="staffRoles.length > 0">
      <Accordion :activeIndex="0" class="prime_accordion">
        <AccordionTab
          v-for="(staffrole, index) in chooseRoleStaff(
            staffRoles,
            ownRole.roleId
          )"
          :key="staffrole.roleid"
          class="prime_accordion_tab"
          :header="staffrole.name"
        >
          <p class="staff_desc">
            Simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            150.Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the Lorem Dummy text Industry was created.It has been the
            industry's standard dummy text.
          </p>
          <!-- only for cunsutant -->
          <div
            class="select_wrap_invite"
            v-if="checkRoles() && staffrole.is_creator"
          >
            <div
              v-if="staffrole.invitation_list.length > 0"
              class="staff_list_wrapper"
            >
              <div class="list_wrap scroll_list m-b-20">
                <ul class="list-group">
                  <li
                    v-for="member in staffrole.invitation_list
                      .slice()
                      .reverse()"
                    :key="member.id"
                    class="list_group_item d-inline-flex m-b-8"
                  >
                    <!-- invited email -->
                    <InvitationEmail :member="member" />
                  </li>
                </ul>
              </div>
            </div>
            <div v-else class="">
              <Select2
                v-model="myValue"
                :options="myOptions"
                class="select_to"
                :settings="settings"
                @select="mySelectEvent($event)"
              />
              <div class="btn_wrap">
                <button
                  :disabled="disbaleInvited"
                  @click="SendEmailsList(staffrole.roleid)"
                  type="button"
                  class="btn-primary inv_button btn btn-set text-uppercase"
                >
                  {{ $t("category_details.team_mangementTab.buttons.invite") }}
                </button>
              </div>
            </div>
          </div>
          <!-- only for conosultant -->
          <div v-else class="">
            <div>
              <form action="">
                <div class="m-b-10">
                  <div class="select_wrap_invite">
                    <Select2
                      v-model="myValue"
                      :options="myOptions"
                      class="select_to"
                      :settings="settings"
                      @select="mySelectEvent($event)"
                    />
                    <div class="btn_wrap">
                      <button
                        :disabled="disbaleInvited"
                        @click="SendEmailsList(staffrole.roleid)"
                        type="button"
                        class="
                          btn-primary
                          inv_button
                          btn btn-set
                          text-uppercase
                        "
                      >
                        {{
                          $t(
                            "category_details.team_mangementTab.buttons.invite"
                          )
                        }}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <!-- on Import file modal to be opend -->
              <InvitationConfirmModal
                @uploadCSVFile="importFile(index)"
                ref="confirmFile"
                :department_List="myDepartmensList"
                :key="staffrole.roleid"
                :staffRole="staffrole.roleid"
                :indexValue="index"
              />

              <input
                type="file"
                style="display: none"
                :ref="`fileInput-${index}`"
                accept=".csv"
                @change="onFilePicked($event, staffrole.roleid)"
              />
            </div>
            <div
              v-if="staffrole.invitation_list.length > 0"
              class="staff_list_wrapper"
            >
              <h6 class="mb-0 text-primary text-14-500 p-b-16">
                <!-- Invited Employees -->
                {{ $t("category_details.team_mangementTab.Invited_Employees") }}
              </h6>
              <div class="list_wrap scroll_list m-b-20">
                <ul class="list-group">
                  <li
                    v-for="member in staffrole.invitation_list
                      .slice()
                      .reverse()"
                    :key="member.id"
                    class="list_group_item d-inline-flex m-b-8"
                  >
                    <!-- invited email  -->
                    <InvitationEmail :key="member.id" :member="member" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div v-else class="has_error text-align-center">
      You have no permisstion to invite people
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import Select2 from "vue3-select2-component";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import MultiSelect from "primevue/multiselect";
import InvitationConfirmModal from "./InvitationListConfirm.vue";
import { mapGetters } from "vuex";
import errorhandler, { successhandler } from "../../utils/Error";
import CompanyService from "../../Services/Company/CompanyService";
import InvitationEmail from "../Shared/InvitationEmail.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
// import { departmentModify } from "../../utils/DepartmentModify";
export default {
  props: {
    departments: {
      type: Array,
      required: true,
    },
  },
  components: {
    Select2,
    MultiSelect,
    Datepicker,
    InvitationEmail,
    Accordion,
    AccordionTab,
    InvitationConfirmModal,
  },

  data() {
    return {
      companyData: JSON.parse(localStorage.getItem("selected_company")),
      myValue: "",
      expiryDate: "",
      validity_date: "",
      myDepartmensList: [],
      settings: {},
      emailPattern:
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/,
      is_FileUploaded: false,
      myOptions: [],
      tempEmails: [],
      mySettings: {},
      disbaleInvited: true,
      emailTag: "",
      isOpenAcc: true,
      isAccordionArr: undefined,
      staffInfo: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    };
  },

  computed: {
    // get vuex getter variables
    ...mapGetters({
      staffRoles: "invitationStaffRoleList",
      companyLists: "staffsCompanies",
      ownRole: "roleInCompany",
    }),
    ...mapGetters(["owner_roleId", "consulatant_roleId"]),
  },

  //  initializing vuex variable

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  //list of variables that are required

  validations() {
    return {
      myDepartmensList: { required },
    };
  },

  created() {
    // setting that are required for making emails data as input chips
    this.settings = {
      tags: true,
      allowClear: true,
      multiple: true,
      insertTag: function (data, tag) {
        // Insert the tag at the end of the results
        this.emailTag = tag;
        console.log("data", data, "tag", tag);
        data.push(tag);
      },
    };

    this.mySettings = {
      multiple: true,
    };
  },
  methods: {
    // clear expiry  date
    clearDate() {
      this.expiryDate = "";
    },

    // departmentModifyComp(val) {
    //   return departmentModify(val);
    // },

    // check if role is consultant in selected company

    checkRoles() {
      if (this.ownRole.roleId == this.consulatant_roleId) {
        return true;
      } else return false;
    },

    // get the active role according to selected company

    chooseRoleStaff(data, id, isYes = false) {
      if (isYes) {
        return data.filter((val) => val.roleid == id);
      } else {
        return data.filter((val) => val.roleid != id);
      }
    },

    // update date format

    updateDate() {
      this.validity_date = this.expiryDate.toISOString().slice(0, 10);
    },

    //   this function indirectly triggers onFilePicked Funtion

    importFile(fileNameIndex = 0) {
      console.log(this.v$);
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.$refs["fileInput-" + fileNameIndex].click();
      }
    },

    // to upload the file(csv) of email list

    onFilePicked(event, roleId) {
      this.$refs.confirmFile.openModal;
      console.log(this.$refs.confirmFile.openModal);
      this.valiImage = true;
      const allowedExtensions = ["csv"];
      const files = event.target.files;
      let $th = this;
      if (files != "undefined" && files.length > 0) {
        var filename = files[0].name;
        var fileType = files[0].type;
        console.log("file extention type", fileType);
        const fileExtension = filename.split(".").pop();
        if (!allowedExtensions.includes(fileExtension)) {
          this.$toast.error(" File type must be (.csv) only.", {
            position: "bottom-left",
            duration: 3712,
          });
          this.value = null; // Null the Value  here
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = function (e) {
            let filebase64 = e.target.result;
            let fileData = filebase64.replace(
              "data:" + fileType + ";base64,",
              ""
            );
            $th.sendInvitationByFile(fileData, roleId);
          };
        }
      } else {
        return true;
      }
    },

    //  filter invitation list by departments

    filterInvitationList() {
      let data = {
        auth_token: this.staffInfo.auth_token,
        departments: this.myDepartmensList.map(Number),
      };
      if (this.myDepartmensList.length > 0) {
        // department is selected
        CompanyService.getInvitationByRole(data).then((res) => {
          if (res.data.status) {
            this.$store.dispatch(
              "GET_INVITATION_STAFFROLE_LIST",
              res.data.data
            );
          } else {
            // error notificataion utility function
            errorhandler(res, this);
          }
        });
      } else {
        // department is not selected
        CompanyService.getInvitationByRole(data).then((res) => {
          if (res.data.status) {
            this.$store.dispatch(
              "GET_INVITATION_STAFFROLE_LIST",
              res.data.data
            );
          } else {
            // error notificataion utility function
            errorhandler(res, this);
          }
        });
      }
    },

    // upload csv File status success for failed
    sendInvitationByFile(file, staffrole) {
      this.is_FileUploaded = true;
      console.log("fileData ", file, staffrole);
    },

    // send Invitation by Emails by manually entered
    SendEmailsList(roleId) {
      if (this.owner_roleId == roleId) {
        // Invite for role Owner by consultant
        let data = {
          auth_token: this.staffInfo.auth_token,
          role_id: +roleId,
          recipient_emails: this.myValue,
          invitation_validity: this.validity_date,
        };
        this.invitePeople(data);
      } else {
        this.v$.$touch();
        if (this.v$.$invalid) {
          return;
        } else {
          // Invite people to give access of whole department, all role except Owner
          let data = {
            auth_token: this.staffInfo.auth_token,
            role_id: +roleId,
            recipient_emails: this.myValue,
            departments: this.myDepartmensList.map(Number),
            invitation_validity: this.validity_date,
          };
          this.invitePeople(data);
        }
      }
    },

    // Invite people

    invitePeople(data) {
      CompanyService.invitationByEmails(data).then((res) => {
        if (res.data.status) {
          this.myValue.length = 0;
          this.$store.dispatch("GET_INVITATION_STAFFROLE_LIST", res.data.data);

          this.disbaleInvited = true;
          // success notificataion utility function
          successhandler("Invitations have been sent ");
        } else {
          // error notificataion utility function
          errorhandler(res);
        }
      });
    },

    // to create tags/chips of emails entered manually

    mySelectEvent({ id, text }) {
      console.log("id", { id, text });

      this.myValue.length > 0
        ? (this.disbaleInvited = false)
        : (this.disbaleInvited = true);

      // testing for valid email type
      if (this.emailPattern.test(text)) {
        //  valid email type
        return true;
      } else {
        //  invalid email type
        this.$toast.error("please enter valid email.", {
          position: "bottom-left",
          duration: 3712,
        });
        this.myValue.pop();
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// dropdown
.dropdown_wrap {
  width: 100px;
  position: absolute;
  right: 76px;
}
.has_error {
  color: #db2c66;
  font-size: 14px;
  padding-top: 5px;
  font-weight: 400;
  text-align: center;
}

.btn_primary_transparent {
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
}
.img_drop_wrap {
  position: relative;
  cursor: pointer;
}
.select_wrap_invite {
  position: relative;

  .select2-container {
    width: 100%;
  }
}

// accordion
.dept_selct_wrap {
  width: 30%;
  margin-bottom: 10px;
}
.import_file_text {
  font-weight: normal;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 20px;
  color: #222b45;
  text-align: center;
  margin-bottom: 0;
}
.failed_message {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #222b45;
  margin-bottom: 0;
}
.upload_message {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 0;
}

.desc_cont {
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #222b45;
}
.section_wrap {
  display: flex;
  align-items: center;
  // margin-bottom: 24px;
  cursor: pointer;
}

.scroll_list {
  max-height: 15rem;
  overflow: auto;
  padding-right: 6px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  // / Track /
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #f7f9fc;
    border-radius: 0px;
  }
  // / Handle /
  &::-webkit-scrollbar-thumb {
    background-color: #aab4c5bd !important;
    border-radius: 10px;
  }
}

.list_wrap {
  margin-bottom: 20px;
  ul {
    padding-left: 0;
    margin-bottom: 0;
    li {
      list-style: none;
      display: block;
      padding-bottom: 2px;
      .list_title {
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        color: #222b45;
        margin-bottom: 0;
      }
    }
  }
}
.sub_acc_title {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #222b45;
}
//accordion
li {
  &:last-child {
    margin-bottom: 0 !important;
  }
}

.list_group_item {
  position: relative;
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 8px 6px 14px;
  background-color: #fff;
}
.border-bottom-1 {
  border-bottom: 1px solid #e4e9f2;
}
.select_wrap {
  width: 100% !important;
}
.one_option_select2 {
  width: 100% !important;
}
.select_to {
  width: 100% !important;
}
.staff_desc {
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  color: #222b45;
}
.inv_button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 45px;
  border-radius: 0 4px 4px 0px !important;
}
</style>
