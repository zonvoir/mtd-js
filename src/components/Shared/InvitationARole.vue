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
              <div class="text-center">
                <p class="import_file_text">
                  or you can
                  <button
                    :disabled="is_FileUploaded"
                    @click="importFile(index)"
                    :key="staffrole.roleid"
                    class="btn btn_primary_transparent"
                  >
                    Import
                  </button>
                  a file with employee emails
                </p>
                <input
                  type="file"
                  style="display: none"
                  :ref="`fileInput-${index}`"
                  accept=".csv"
                  @change="onFilePicked($event, staffrole.roleid)"
                />
              </div>
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
                    <InvitationEmail :member="member" />
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

import { mapGetters } from "vuex";
import errorhandler, { successhandler } from "../../utils/Error";
import CompanyService from "../../Services/Company/CompanyService";
import InvitationEmail from "../Shared/InvitationEmail.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { departmentModify } from "../../utils/DepartmentModify";
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
  },

  data() {
    return {
      companyData: JSON.parse(localStorage.getItem("selected_company")),
      myValue: "",
      expiryDate: "",
      validity_date: "",
      // consulatant_roleId: 4,
      // ownerId: 5,
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
    ...mapGetters({
      staffRoles: "invitationStaffRoleList",
      companyLists: "staffsCompanies",
      ownRole: "roleInCompany",
    }),
    ...mapGetters(["owner_roleId", "consulatant_roleId"]),
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  //vis
  validations() {
    return {
      myDepartmensList: { required },
    };
  },

  created() {
    this.getCompanyDetails(this.companyData);
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
    clearDate() {
      this.expiryDate = "";
    },
    departmentModifyComp(val) {
      return departmentModify(val);
    },
    checkRoles() {
      if (this.ownRole.roleId == this.consulatant_roleId) {
        return true;
      } else return false;
    },

    chooseRoleStaff(data, id, isYes = false) {
      if (isYes) {
        return data.filter((val) => val.roleid == id);
      } else {
        return data.filter((val) => val.roleid != id);
      }
    },
    updateDate() {
      // this.checkValidation();
      this.validity_date = this.expiryDate.toISOString().slice(0, 10);
      console.log("date", this.validity_date);
    },

    getCompanyDetails(companyId) {
      let companyArr;
      this.tempCompnies = this.companyLists;
      console.log(this.tempCompnies);
      this.tempCompnies.forEach((item) => {
        if (item.company_id == companyId) {
          companyArr = item;
        }
      });

      console.log("all conpany dettails", companyArr);
      // this.$store.dispatch("getCompanyMembers", memberArr);
    },

    importFile(fileNameIndex = 0) {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.$refs["fileInput-" + fileNameIndex].click();
      }
    },

    onFilePicked(event, roleId) {
      console.log("role is k", roleId, event);
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
          // this.is_uploaded = false;
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
        CompanyService.getInvitationByRole(data).then((res) => {
          if (res.data.status) {
            console.log("filterd invitaion list ", res.data.data);
            this.$store.dispatch(
              "GET_INVITATION_STAFFROLE_LIST",
              res.data.data
            );
          } else {
            errorhandler(res, this);
          }
        });
      } else {
        CompanyService.getInvitationByRole(data).then((res) => {
          if (res.data.status) {
            this.$store.dispatch(
              "GET_INVITATION_STAFFROLE_LIST",
              res.data.data
            );
          } else {
            errorhandler(res, this);
          }
        });
      }
    },

    // upload excel File
    sendInvitationByFile(file, staffrole) {
      // this.is_uploaded = false;
      this.is_FileUploaded = true;
      let data = {
        auth_token: this.staffInfo.auth_token,
        role_id: +staffrole,
        departments: this.myDepartmensList.map(Number),
        excel_file: file,
        invitation_validity: this.validity_date,
      };
      console.log("fileData ", data);
      CompanyService.invitationByFile(data).then((res) => {
        if (res.data.status) {
          this.is_FileUploaded = false;
          successhandler(" file Uploaded !! update list after some time");
          // this.$toast.success(" file Uploaded !! update list after some time", {
          //   position: "bottom-left",
          //   duration: 3712,
          // });
          this.$store.dispatch(
            "getInvitationList",
            res.data.data.invitation_list
          );
        } else {
          errorhandler(res, this);
        }
      });
      // this.is_uploaded = false;
    },
    // send Invitation by Emails
    SendEmailsList(roleId) {
      console.log(
        "checking for consulant",
        this.owner_roleId,
        this.consulatant_roleId
      );
      if (this.owner_roleId == roleId) {
        console.log("this is Owner", roleId);
        let data = {
          auth_token: this.staffInfo.auth_token,
          role_id: +roleId,
          recipient_emails: this.myValue,
          // departments: this.myDepartmensList.map(Number),
          invitation_validity: this.validity_date,
        };
        this.invitePeople(data);
      } else {
        console.log("this is regular employee", roleId);
        this.v$.$touch();
        if (this.v$.$invalid) {
          return;
        } else {
          console.log("emailsArray", this.tempEmails, this.myDepartmensList);
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

    invitePeople(data) {
      CompanyService.invitationByEmails(data).then((res) => {
        if (res.data.status) {
          this.myValue.length = 0;
          console.log("data emails", res.data.data);
          this.$store.dispatch("GET_INVITATION_STAFFROLE_LIST", res.data.data);

          this.disbaleInvited = true;
          successhandler("Invitations have been sent ");
          // this.$toast.success(, {
          //   position: "bottom-left",
          //   duration: 3712,
          // });
        } else {
          errorhandler(res);
        }
      });
    },

    mySelectEvent({ id, text }) {
      console.log("id", { id, text });

      this.myValue.length > 0
        ? (this.disbaleInvited = false)
        : (this.disbaleInvited = true);
      if (this.emailPattern.test(text)) {
        return true;
      } else {
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
// dropdown
// .invalid_error {
//   &:focus {
//     outline: 2px solid #db2c66 !important;
//     outline-offset: 0px;
//   }
//   .dp__input {
//     outline: 2px solid #db2c66 !important;
//     outline-offset: 0px;
//   }
// }
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
