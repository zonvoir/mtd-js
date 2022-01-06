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
    <div class="accordion custom_acc">
      <div class="">
        <!-- v-for="(item, index) in items" :key="index" -->
        <div class="">
          <div class="section_wrap k_acc_sub_btn m-b-10">
            <h4 class="m-b-0 title-dark">Choose departament(s)</h4>
          </div>
          <div class="d-flex align-items-center">
            <div class="dept_selct_wrap k_form_group k_lang k_select_single">
              <Multiselect
                :placeholder="
                  $t('personal_account.form.placeholder.department')
                "
                mode="tags"
                :closeOnSelect="false"
                :searchable="true"
                :createTag="true"
                v-model="myDepartmensList"
                class="form-control k_inp_field"
                rules="required"
                :options="departments"
              />
              <!-- @blur="v$.personalAccount.department.$touch"
                    v-model="personalAccount.department"
                    :class="{
                      'is-invalid': v$.personalAccount.department.$error,
                    }" -->
            </div>
            <div class="k_date_picker k_inp_half m-l-10">
              <Datepicker
                ref="selected_date"
                class="invalid_error"
                :enableTimePicker="false"
                v-model="ansValue"
                @closed="updateDate"
                @blur="v$.ansValue.$touch"
                :class="{
                  'is-invalid': v$.ansValue.$error,
                }"
              />
              <div v-if="v$.ansValue.$error" class="invalid-feedback text-left">
                <span
                  v-if="v$.ansValue.required.$invalid"
                  class="text-left fs-14"
                >
                  Answer is required
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- <template>
        </template> -->
        <div
          class="body_wrap"
          v-for="(staffrole, index) in staffRoles"
          :key="index"
        >
          <div class="sub_acc_body">
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
                  <div class="form_wrapper">
                    <form action="">
                      <div class="d-flex m-b-24">
                        <div class="select_wrap_invite">
                          <Select2
                            v-model="myValue"
                            :options="myOptions"
                            class="select_to"
                            :settings="settings"
                            @select="mySelectEvent($event)"
                          />
                        </div>
                        <div class="btn_wrap">
                          <button
                            :disabled="disbaleInvited"
                            @click="SendEmailsList"
                            type="button"
                            class="btn-primary btn btn-set text-uppercase"
                          >
                            {{
                              $t(
                                "category_details.team_mangementTab.buttons.invite"
                              )
                            }}
                          </button>
                        </div>
                      </div>
                    </form>
                    <div class="text-center">
                      <p class="import_file_text">
                        or you can
                        <button
                          :disabled="is_FileUploaded"
                          @click="importFile"
                          class="btn btn_primary_transparent"
                        >
                          Import
                        </button>
                        a file with employee emails
                      </p>
                      <p v-if="is_uploaded" class="upload_message text-success">
                        Your file has been successfully Uploaded !!! we will
                        show you updated list after some time
                      </p>

                      <input
                        type="file"
                        style="display: none"
                        ref="fileInput"
                        accept=".csv"
                        @change="onFilePicked"
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
                      <div class="list_wrap m-b-20">
                        {{ invitedMembers }}
                        <ul class="list-group">
                          <li
                            v-for="member in staffrole.invitation_list"
                            :key="member.id"
                            class="list_group_item d-inline-flex m-b-8"
                          >
                            <div class="list_wrapper">
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
                            </div>
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
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import Select2 from "vue3-select2-component";
import Multiselect from "@vueform/multiselect";
import useVuelidate from "@vuelidate/core";
import companyService from "../../Services/Company/CompanyService";
import { required, email } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  props: {
    departments: {
      type: Array,
      required: true,
    },
    staffRoles: {
      type: Array,
      required: true,
    },
  },
  components: {
    Select2,
    Multiselect,
    Datepicker,
  },
  data() {
    return {
      companyData: JSON.parse(localStorage.getItem("selected_company")),
      myValue: "",
      ansValue: "",
      validity_date: "",
      // staffRoles: undefined,
      myDepartmensList: null,
      settings: {},
      emailPattern:
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/,
      is_uploaded: undefined,
      is_FileUploaded: false,
      myOptions: [],
      tempEmails: [],
      mySettings: {},
      disbaleInvited: true,
      emailTag: "",
      isOpenAcc: true,
      isAccordionArr: undefined,
    };
  },

  computed: {
    ...mapGetters({
      staffInfo: "staffData",
      invitedMembers: "invitationList",
      selectedDepartments: "staffsDepartment",
      companyLists: "staffsCompanies",
      ownRole: "roleInCompany",
    }),
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      ansValue: { required },
      myDepartmensList: { required },
      myValue: { email },
    };
  },
  created() {
    console.log("localstorage data", this.staffInfo);
    // if (
    //   this.staffInfo != null ||
    //   this.staffInfo != undefined ||
    //   this.staffInfo != ""
    // ) {
    //   this.getInvitaionPeopleListByRole();
    // }
    this.isAccordionArr = new Array(4).fill(false);
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
    // get List of invited people
    // getInvitaionPeopleListByRole() {
    //   companyService
    //     .getInvitationByRole({ auth_token: this.staffInfo.auth_token })
    //     .then((res) => {
    //       if (res.data.status) {
    //         console.log("all invitaion list of people", res.data.data);
    //         this.staffRoles = res.data.data;
    //         this.$store.dispatch(
    //           "getInvitationList",
    //           res.data.data.invitation_list
    //         );
    //       } else {
    //         let $th = this;
    //         if ("error" in res.data) {
    //           Object.keys(res.data.error).map(function (key) {
    //             $th.$toast.error(res.data.error[key], {
    //               position: "bottom-left",
    //               duration: 3712,
    //             });
    //           });
    //         } else {
    //           $th.$toast.error(res.data.message, {
    //             position: "bottom-left",
    //             duration: 3712,
    //           });
    //         }
    //       }
    //     });
    // },
    updateDate() {
      // this.checkValidation();
      this.validity_date = this.ansValue.toISOString().slice(0, 10);
      console.log("date", this.validity_date);
    },
    selectedDepartments() {
      console.lg("selected departments");
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
    importFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
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
          this.is_uploaded = false;
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
            $th.sendInvitationByFile(fileData);
          };
        }
      } else {
        return true;
      }
    },
    // upload excel File
    sendInvitationByFile(file) {
      this.is_FileUploaded = true;
      let data = {
        auth_token: this.staffInfo.auth_token,
        role_id: this.ownRole,
        departments: this.myDepartmensList,
        excel_file: file,
      };
      console.log("fileData ", data);
      companyService.invitationByFile(data).then((res) => {
        if (res.data.status) {
          this.is_uploaded = true;
          this.is_FileUploaded = false;
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
    // send Invitation by Emails
    SendEmailsList() {
      console.log("emailsArray", this.tempEmails, this.myDepartmensList);
      let data = {
        auth_token: this.staffInfo.auth_token,
        role_id: this.ownRole,
        recipient_emails: this.myValue,
        departments: this.myDepartmensList,
        invitation_validity: this.validity_date,
      };
      console.log("emails Array to be send ", data);
      companyService.invitationByEmails(data).then((res) => {
        if (res.data.status) {
          this.myValue.length = 0;
          this.$store.dispatch(
            "getInvitationList",
            res.data.data.invitation_list
          );
          this.$toast.success("Invitations have been sent ", {
            position: "bottom-left",
            duration: 3712,
          });
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
    // myChangeEvent(val) {
    //   // this.validEmail = true;
    //   // this.emailTag = val.target.value;
    // },
    mySelectEvent({ id, text }) {
      console.log("vishal", { id, text });

      this.myValue.length > 0
        ? (this.disbaleInvited = false)
        : (this.disbaleInvited = true);
      if (this.emailPattern.test(text)) {
        return true;
      } else {
        this.$toast.error("please enter valid enter.", {
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
</style>
