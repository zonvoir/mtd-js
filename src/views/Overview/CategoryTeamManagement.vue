<template>
  <div
    v-for="(staffrole, index) in staffRoles"
    :key="staffrole.roleid"
    class="team_wrapper m-b-20"
  >
    <div class="m-b-24">
      <h4 class="m-b-0 title-dark">{{ staffrole.name }}</h4>
    </div>
    <div class="m-b-12">
      <p class="staff_desc">
        Simply dummy text of the printing and typesetting industry. Lorem Ipsum
        has been the industry's standard dummy text ever since the 150.Lorem
        Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        Lorem Dummy text Industry was created.It has been the industry's
        standard dummy text.
      </p>
    </div>
    <div class="form_wrapper">
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
                  class="btn-primary inv_button btn btn-set text-uppercase"
                >
                  {{ $t("category_details.team_mangementTab.buttons.invite") }}
                </button>
              </div>
            </div>
          </div>
        </form>
        <!-- emails of uploaded file on modal -->
        <InvitationConfirmModal
          @uploadCSVFile="importFile(index)"
          ref="confirmFile"
          :teamModal="true"
          :key="staffrole.roleid"
          :staffRole="staffrole.roleid"
          :indexValue="index"
          :department_id="departmentId"
          :category_id="categoryId"
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
              v-for="member in staffrole.invitation_list.slice().reverse()"
              :key="member.id"
              class="list_group_item d-inline-flex m-b-8"
            >
              <!-- invitaed email -->
              <InvitationEmail
                :teamModal="true"
                :key="member.id"
                :member="member"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select2 from "vue3-select2-component";
import { mapGetters } from "vuex";
import InvitationEmail from "../../components/Shared/InvitationEmail.vue";
import InvitationConfirmModal from "../../components/Shared/InvitationListConfirm.vue";
import { successhandler } from "../../utils/Error";
export default {
  data() {
    return {
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      departmentId: "",
      categoryId: "",
      myValue: "",
      is_FileUploaded: false,
      emailPattern:
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/,
      settings: {},
      myOptions: [],
    };
  },

  components: {
    Select2,
    InvitationEmail,
    InvitationConfirmModal,
  },

  computed: {
    ...mapGetters({
      staffRoles: "invitationsForQuestionnaireTeam",
    }),
    ...mapGetters(["owner_roleId", "consulatant_roleId"]),
  },

  created() {
    this.departmentId = this.$route.params.did;
    this.categoryId = this.$route.params.id;
    console.log(
      "get department id,category Id",
      this.departmentId,
      this.categoryId
    );
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
    this.getInvitedTeam();
  },
  methods: {
    // get Invited team members list  on page load by vuex action

    getInvitedTeam() {
      let data = {
        auth_token: this.staffData.auth_token,
        category_id: this.categoryId,
        department_id: this.departmentId,
      };
      this.$store.dispatch("GET_INVITATIONS_FOR_QUESTIONNAIRE_TEAM", data);
    },

    // this function will indirectly trigger  onFilePicked  function

    importFile(fileNameIndex = 0) {
      console.log(this.v$);
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.$refs["fileInput-" + fileNameIndex].click();
      }
    },

    // import a file of email list

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

    // upload CSV File  of emails list

    sendInvitationByFile(file, staffrole) {
      this.is_FileUploaded = true;
      let data = {
        auth_token: this.staffData.auth_token,
        role_id: +staffrole,
        excel_file: file,
        category_id: this.categoryId,
        department_id: this.departmentId,
      };
      console.log("fileData ", data);
      this.$store
        .dispatch("GET_INVITE_TEAM_MEMBER_BY_FILELIST", data)
        .then((res) => {
          if (res.data.status) {
            this.is_FileUploaded = false;
            successhandler(" file Uploaded !! update list after some time");
          }
        });
    },

    // send Invitation by Emails

    SendEmailsList(roleId) {
      let data = {
        auth_token: this.staffData.auth_token,
        role_id: +roleId,
        recipient_emails: this.myValue,
        category_id: this.categoryId,
        department_id: this.departmentId,
      };
      this.invitePeople(data);
    },

    // invite team member by the vuex actin
    invitePeople(data) {
      this.$store.dispatch("GET_INVITE_TEAM_MEMBER", data).then((res) => {
        if (res.data.status) {
          this.myValue.length = 0;
          console.log("data emails", res.data.data);
          this.disbaleInvited = true;
          // success notificataion utility function
          successhandler("Invitations have been sent ");
        }
      });
    },

    // make the email input as input chip

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
.select_wrap_invite {
  position: relative;

  .select2-container {
    width: 100%;
  }
}
.inv_button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 45px;
  border-radius: 0 4px 4px 0px !important;
}
.btn_primary_transparent {
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
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
  }
}
.list_group_item {
  position: relative;
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 8px 6px 14px;
  background-color: #ffffff;
  &:last-child() {
    position: absolute !important;
  }
}
.border-bottom-1 {
  border-bottom: 1px solid #e4e9f2;
}
.select_wrap {
  width: 86%;
}
.select_to {
  width: 100%;
}
.staff_desc {
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  color: #222b45;
}
</style>
