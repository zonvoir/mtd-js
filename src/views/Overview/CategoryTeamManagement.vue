<template>
  <div
    v-for="staffrole in staffRoles"
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
              v-for="member in staffrole.invitation_list.slice().reverse()"
              :key="member.id"
              class="list_group_item d-inline-flex m-b-8"
            >
              <InvitationEmail :member="member" />
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
import CompanyService from "../../Services/Company/CompanyService";
import errorhandler from "../../utils/Error";
export default {
  components: {
    Select2,
    InvitationEmail,
  },

  data() {
    return {
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      departmentId: "",
      categoryId: "",
      myValue: "",
      // staffRoles: [
      //   {
      //     roleid: "1",
      //     name: "Employee",
      //     permissions:
      //       'a:1:{s:9:"contracts";a:4:{i:0;s:8:"view_own";i:1;s:6:"create";i:2;s:4:"edit";i:3;s:6:"delete";}}',
      //     invitation_list: [
      //       {
      //         id: "55",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "shivdev576@gmail.com",
      //         role_id: "1",
      //         sent_at: "2022-02-17 16:15:18",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "accepted",
      //         accepted_at: "2022-02-17 16:18:58",
      //       },
      //       {
      //         id: "84",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "dikshatripathi172@gmail.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "85",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "zonvoirkuldip@gmail.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "86",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "kuldip@zonvoir.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "87",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "designerdeepak19@gmail.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "88",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "devdiksha172@gmail.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "89",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "sushant@zonvoir.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "90",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "devsushanttiwari@gmail.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "91",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "devsadiyakhan@gmail.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "92",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "deepak.codeable@gmail.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "93",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "diks.tripathi1401@gmail.com",
      //         role_id: "1",
      //         sent_at: "2022-02-24 17:20:07",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //     ],
      //     is_creator: true,
      //   },
      //   {
      //     roleid: "4",
      //     name: "Consultant",
      //     permissions:
      //       'a:3:{s:9:"contracts";a:4:{i:0;s:8:"view_own";i:1;s:6:"create";i:2;s:4:"edit";i:3;s:6:"delete";}s:9:"marketing";a:3:{i:0;s:4:"view";i:1;s:6:"create";i:2;s:4:"edit";}s:15:"sourcing_supply";a:3:{i:0;s:4:"view";i:1;s:6:"create";i:2;s:4:"edit";}}',
      //     invitation_list: [
      //       {
      //         id: "81",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "devkuldip836@gmail.com",
      //         role_id: "4",
      //         sent_at: "2022-02-24 14:59:55",
      //         is_sent: "1",
      //         invitation_validity: "2022-02-25 00:00:00",
      //         status: "expired",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "82",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "deepak@zonvoir.com",
      //         role_id: "4",
      //         sent_at: "2022-02-24 15:03:24",
      //         is_sent: "1",
      //         invitation_validity: "2022-02-25 00:00:00",
      //         status: "expired",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "83",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "sadiya@zonvoirdemo.in",
      //         role_id: "4",
      //         sent_at: "2022-02-24 15:13:47",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "accepted",
      //         accepted_at: "2022-02-24 16:09:33",
      //       },
      //     ],
      //     is_creator: true,
      //   },
      //   {
      //     roleid: "5",
      //     name: "Owner",
      //     permissions: null,
      //     invitation_list: [],
      //     is_creator: true,
      //   },
      //   {
      //     roleid: "9",
      //     name: "Manager",
      //     permissions:
      //       'a:1:{s:9:"marketing";a:3:{i:0;s:4:"view";i:1;s:6:"create";i:2;s:4:"edit";}}',
      //     invitation_list: [
      //       {
      //         id: "54",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "devsadiyakhan@gmail.com",
      //         role_id: "9",
      //         sent_at: "2022-02-17 16:14:32",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "accepted",
      //         accepted_at: "2022-02-17 16:19:31",
      //       },
      //       {
      //         id: "57",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "zonvoirkuldip@gmail.com",
      //         role_id: "9",
      //         sent_at: "2022-02-21 11:29:52",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "70",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "kuldip@zonvoir.com",
      //         role_id: "9",
      //         sent_at: "2022-02-21 17:27:35",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "accepted",
      //         accepted_at: "2022-02-21 17:32:53",
      //       },
      //       {
      //         id: "77",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "zonvoirkuldip@gmail.com",
      //         role_id: "9",
      //         sent_at: "2022-02-24 12:07:40",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //       {
      //         id: "80",
      //         sender_id: "72",
      //         inviting_company_id: "38",
      //         recipient_email: "vishal@zonvoir.com",
      //         role_id: "9",
      //         sent_at: "2022-02-24 12:10:27",
      //         is_sent: "1",
      //         invitation_validity: "0000-00-00 00:00:00",
      //         status: "pending",
      //         accepted_at: null,
      //       },
      //     ],
      //     is_creator: true,
      //   },
      // ],
      settings: {},
      myOptions: [],
    };
  },

  computed: {
    ...mapGetters({
      staffRoles: "invitationsForQuestionnaireTeam",
    }),
  },

  created() {
    this.departmentId = this.$route.params.did;
    this.categoryId = this.$route.params.id;
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
    addTeamMember() {
      this.$store.dispatch("");
    },

    removeTeamMember() {
      this.$store.dispatch("");
    },

    getInvitedTeam() {
      let data = {
        auth_token: this.staffData.auth_token,
        category_id: this.departmentId,
        department_id: this.categoryId,
      };
      this.$store
        .dispatch("GET_INVITATIONS_FOR_QUESTIONNAIRE_TEAM", data)
        .then((res) => {
          if (res.data.status) {
            console.log("team response", res.data.data);
          }
        });
    },

    chooseRoleStaff(data, id, isYes = false) {
      if (isYes) {
        return data.filter((val) => val.roleid == id);
      } else {
        return data.filter((val) => val.roleid != id);
      }
    },

    // upload csv File
    sendInvitationByFile(file, staffrole) {
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

    myChangeEvent(val) {
      console.log(val);
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
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 8px 6px 14px;
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
