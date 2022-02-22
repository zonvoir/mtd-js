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
    <!-- Accordion Of Emp with list -->
    <div class="accordion custom_acc">
      <div class="">
        <!-- departments Sections -->
        <div class="">
          <div class="section_wrap k_acc_sub_btn m-b-10">
            <h4 class="m-b-0 title-dark">Choose departament(s)</h4>
          </div>
          <div class="d-flex">
            <div class="dept_selct_wrap k_form_group k_lang k_select_single">
              <MultiSelect
                :placeholder="
                  $t('personal_account.form.placeholder.department')
                "
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
              <!-- <Multiselect
                mode="tags"
                :closeOnSelect="false"
                :searchable="true"
                :createTag="true"
                v-model="myDepartmensList"
                class="form-control k_inp_field"
                rules="required"
                @deselect="filterInvitationList"
                @select="filterInvitationList"
                :options="departments"
                @blur="v$.myDepartmensList.$touch"
                :class="{
                  'is-invalid': v$.myDepartmensList.$error,
                }"
              /> -->
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
                class="invalid_error"
                :enableTimePicker="false"
                v-model="expiryDate"
                @closed="updateDate"
              />
            </div>
          </div>
        </div>
        <!-- departments Sections ends -->
        <div
          class="body_wrap"
          v-for="(staffrole, index) in staffRoles"
          :key="index"
        >
          <div v-if="checkRoles(staffrole.roleid)" class="sub_acc_body">
            <div class="team_wrapper">
              <div class="">
                <div @click="toggleAccordion(index)" class="section_wrap">
                  <h4 class="m-b-0 title-dark">{{ staffrole.name }}</h4>

                  <div class="m-l-auto">
                    <img
                      :src="
                        isAccordionArr[index]
                          ? 'K_Icons/chevron-up.svg'
                          : 'K_Icons/chevron-down.svg'
                      "
                      alt=""
                      class=""
                    />
                  </div>
                </div>
                <div
                  :class="{ collapse: isAccordionArr[index] }"
                  class="description_body_wrap"
                >
                  <div class="m-b-12 m-t-20">
                    <p class="staff_desc">
                      <!-- {{ item.description }} -->
                      Simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 150.Lorem Ipsum is simply dummy
                      text of the printing and typesetting industry. Lorem Ipsum
                      has been the industry's standard dummy text ever since the
                      Lorem Dummy text Industry was created.It has been the
                      industry's standard dummy text.
                    </p>
                  </div>
                  <!-- v-if="staffrole.roleid !== 0" -->
                  <div
                    v-if="staffrole.roleid != ownRole.roleId"
                    class="form_wrapper"
                  >
                    <form action="">
                      <div class="m-b-24">
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
                      <!-- <p v-if="is_uploaded" class="upload_message text-success">
                        Your file has been successfully Uploaded !!! we will
                        show you updated list after some time
                      </p> -->

                      <input
                        type="file"
                        style="display: none"
                        :ref="`fileInput-${index}`"
                        accept=".csv"
                        @change="onFilePicked($event, staffrole.roleid)"
                      />
                    </div>
                    <div class="staff_list_wrapper">
                      <h6 class="mb-0 text-primary text-14-500 p-b-16">
                        <!-- Invited Employees -->
                        {{
                          $t(
                            "category_details.team_mangementTab.Invited_Employees"
                          )
                        }}
                      </h6>
                      <div class="list_wrap scroll_list m-b-20">
                        <ul class="list-group">
                          <!--   v-for="member in staffrole.invitation_list" -->
                          <li
                            v-for="member in staffrole.invitation_list
                              .slice()
                              .reverse()"
                            :key="member.id"
                            class="list_group_item d-inline-flex m-b-8"
                          >
                            <InvitationEmail :member="member" />
                            <!-- <div class="list_wrapper">
                              <div class="name_wrap">
                                <p
                                  class="
                                    text-14-600
                                    m-b-0
                                    text-capitalize text-heading
                                  "
                                >
                                  First Name
                                </p>
                              </div>
                              <div class="email_wrap">
                                <p class="text-14-600 m-b-0 text-heading">
                                  {{ member.recipient_email }}
                                </p>
                              </div>
                              <div class="icon_wrap">
                                <div class="d-inline-flex">
                                  <div
                                    :class="{
                                      pending: member.status == 'pending',
                                      accepted: member.status == 'accepted',
                                      rejected: member.status == 'rejected',
                                    }"
                                    class="email_status_wrap"
                                  >
                                    <p class="email_status">
                                      {{ member.status }}
                                    </p>
                                  </div>
                                  <img
                                    src="K_Icons/more-vertical.svg"
                                    alt=""
                                    class=""
                                  />
                                </div>
                              </div>
                            </div> -->
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Accordion Of Emp with list -->
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import Select2 from "vue3-select2-component";
// import Multiselect from "@vueform/multiselect";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import MultiSelect from "primevue/multiselect";

import { mapGetters } from "vuex";
import errorhandler from "../../utils/Error";
import CompanyService from "../../Services/Company/CompanyService";
import InvitationEmail from "../Shared/InvitationEmail.vue";
export default {
  props: {
    departments: {
      type: Array,
      required: true,
    },
    // staffRoles: {
    //   type: Array,
    //   required: true,
    // },
  },
  components: {
    Select2,
    MultiSelect,
    Datepicker,
    InvitationEmail,
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
    ...mapGetters({
      // invitedMembers: "invitationList",
      staffRoles: "invitationStaffRoleList",
      companyLists: "staffsCompanies",
      ownRole: "roleInCompany",
    }),
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

  updated() {
    this.isAccordionArr = new Array(this.staffRoles.length).fill(false);

    // this.isAccordionArr = new Array(4).fill(false);
  },
  mounted() {
    this.isAccordionArr = new Array(this.staffRoles.length).fill(false);

    // this.isAccordionArr = new Array(4).fill(false);
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
    checkRoles(roleid) {
      if (
        this.ownRole.roleId == 4 &&
        (roleid == 1 || roleid == 4 || roleid == 9)
      ) {
        return true;
      } else if (
        this.ownRole.roleId == 5 &&
        (roleid == 1 || roleid == 4 || roleid == 5 || roleid == 9)
      ) {
        return true;
      } else if (this.ownRole.roleId == 9 && (roleid == 1 || roleid == 9)) {
        return true;
      } else {
        return false;
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

    checkRole(id) {
      if (id) {
        return true;
      }
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
            console.log("role is kk", roleId);
            $th.sendInvitationByFile(fileData, roleId);
            console.log("role is kkk", roleId);
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
        console.log("no array dept founds ");
        CompanyService.getInvitationByRole(data).then((res) => {
          if (res.data.status) {
            console.log("no array dept founds ", res.data.data);
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
          this.$toast.success(" file Uploaded !! update list after some time", {
            position: "bottom-left",
            duration: 3712,
          });
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

        CompanyService.invitationByEmails(data).then((res) => {
          if (res.data.status) {
            this.myValue.length = 0;
            console.log("data emails", res.data.data);
            this.$store.dispatch(
              "GET_INVITATION_STAFFROLE_LIST",
              res.data.data
            );

            this.disbaleInvited = true;
            this.$toast.success("Invitations have been sent ", {
              position: "bottom-left",
              duration: 3712,
            });
          } else {
            errorhandler(res, this);
          }
        });
      }
    },
    // myChangeEvent(val) {
    //   // this.validEmail = true;
    //   // this.emailTag = val.target.value;
    // },
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

    toggleAccordion(index) {
      this.isAccordionArr.forEach((ac, i) => {
        if (index === i) {
          this.isAccordionArr[i] = !this.isAccordionArr[i];
        }
      });
      // this.isAccordionArr[index] = !this.isAccordionArr[index];
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
// dropdown
.invalid_error {
  &:focus {
    outline: 2px solid #db2c66 !important;
    outline-offset: 0px;
  }
  .dp__input {
    outline: 2px solid #db2c66 !important;
    outline-offset: 0px;
  }
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
.email_status_wrap {
  border-radius: 12px;
  width: 100px;
  vertical-align: middle;
  &.pending {
    background: #edf1f7;
    color: #222b45;
  }
  &.accepted {
    background-color: #0aca8a;
    color: white !important;
  }
  &.rejected {
    background-color: #db2c66;
    color: white !important;
  }
  .email_status {
    margin-bottom: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    color: inherit;
  }
}
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
  display: none;
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
// .scroll_list{

// }
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
.list_wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  .name_wrap {
    width: 35%;
  }
  .email_wrap {
    width: 35%;
  }
  .icon_wrap {
    width: 30%;
    justify-content: flex-end;
    text-align: end;
    margin-bottom: 4px;
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
  height: 39px;
  border-radius: 0 4px 4px 0px !important;
}
</style>
