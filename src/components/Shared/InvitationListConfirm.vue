<template>
  <div class="text-center">
    <p class="import_file_text">
      or you can
      <button
        :disabled="is_FileUploaded"
        @click="invitaionsFile"
        :key="staffRole"
        class="btn btn_primary_transparent"
      >
        Import
      </button>
      a file with employee emails
    </p>
    <!-- <input
      type="file"
      style="display: none"
      :ref="`fileInput-${index}`"
      accept=".csv"
      @change="onFilePicked($event, staffRole)"
    /> -->
  </div>
  <!-- Invite People Modal -->
  <div
    class="modal fade confirmation_modal"
    ref="invitationConfirmModal"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg invitation_dialog">
      <div class="modal-content invitaion_content">
        <div class="modal-body invitaion_body">
          <div class="m-l-auto">
            <button
              @click="closeModal"
              class="btn btn-transaprent cn_button zp-0 m-l-auto"
            >
              <img src="K_Icons/cancel.svg" alt="" class="cancel_icon" />
            </button>
          </div>

          <div
            v-if="!members.length"
            @dragenter.prevent="toggleActive"
            @dragleave.prevent="toggleActive"
            @dragover.prevent
            @drop.prevent="onFilePicked"
            :class="{ 'active-dropzone': active }"
            ref="dropbox"
            class="dropbox_area"
          >
            <div class="upload_area">
              <div class="imgContainer">
                <img src="K_Icons/download.svg" class="upload_logo" alt="" />
              </div>
            </div>
            <div class="text-center">
              <h5 v-if="dropFilename" class="m-b-0 box_title">
                {{ dropFilename }}
              </h5>
              <h5 class="m-b-0 box_title">Select Your File or Drop here</h5>
              <input
                :ref="`fileInput-${indexValue}`"
                type="file"
                style="display: none"
                accept=".csv"
                @change="onFilePicked($event)"
              />
              <button
                v-if="!dropFilename"
                @click="importFile(indexValue)"
                class="btn btn-primary btn-set text-uppercase m-bottom"
              >
                Select File
              </button>
            </div>
          </div>
          <div v-else class="response_list">
            <h6 class="mb-0 text-primary text-14-500 p-b-16">
              Members in the file
            </h6>
            <div class="list_wrap scroll_list m-b-20">
              <ul class="list-group">
                <li
                  v-for="member in members.slice().reverse()"
                  :key="member.id"
                  class="list_group_item d-inline-flex m-b-8"
                >
                  <InvitationEmail :member="member" />
                </li>
              </ul>
            </div>
            <div class="btns_wrap">
              <button
                @click="closeModal"
                class="btn btn-light btn-set text-uppercase m-r-20"
              >
                Cancel
              </button>
              <button
                @click="proceedForward"
                type="button"
                class="btn btn-primary btn-set text-uppercase"
              >
                <span>Proceed</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import InvitationEmail from "./InvitationEmail.vue";
import CompanyService from "../../Services/Company/CompanyService";
import errorhandler from "../../utils/Error";

export default {
  emits: ["uploadCSVFile"],

  props: {
    department_List: {
      type: Array,
      required: true,
    },
    indexValue: {
      type: Number,
      required: true,
      default: 0,
    },
    staffRole: {
      type: Number,
    },
  },
  data() {
    return {
      modal: null,
      active: false,
      dropFilename: undefined,
      filelist: [], //https://codepen.io/stenvdb/pen/wvBoYQO
      staffInfo: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      is_FileUploaded: false,
      departmentsArr: this.department_List,
      members: [],
    };
  },

  components: {
    InvitationEmail,
  },

  mounted() {
    this.modal = new Modal(this.$refs.invitationConfirmModal);
  },

  methods: {
    importFile(fileNameIndex = 0) {
      this.$refs["fileInput-" + fileNameIndex].click();
    },

    onFilePicked(event) {
      // console.log("role is k", event);
      // if(DragEvent==event)
      // this.filelist = [this.$refs["fileInput-" + this.indexValue].files];
      // console.log(this.filelist);
      // console.log(event.dataTransfer.files);
      // event.currentTarget.classList.add('active-dropzone');
      // event.currentTarget.classList.remove('active-dropzone');
      const allowedExtensions = ["csv"];
      const files = event.target.files || event.dataTransfer.files;
      let $th = this;
      if (files != "undefined" && files.length > 0) {
        var filename = files[0].name;
        var fileType = files[0].type;
        const fileExtension = filename.split(".").pop();
        if (!allowedExtensions.includes(fileExtension)) {
          // this.is_uploaded = false;
          this.$toast.error(" File type must be (.csv) only.", {
            position: "bottom-left",
            duration: 3712,
          });
          this.value = null; // Null the Value  here
        } else {
          this.dropFilename = filename;
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

    sendInvitationByFile(file) {
      this.is_FileUploaded = true;
      let data = {
        auth_token: this.staffInfo.auth_token,
        role_id: this.staffRole,
        excel_file: file,
      };
      CompanyService.invitationByFile(data).then((res) => {
        if (res.data.status) {
          this.members = [];
          this.is_FileUploaded = false;
          this.members = res.data.data;
        }
      });
    },

    closeModal() {
      this.dropFilename = "";
      this.active = false;
      this.members = [];
      this.modal.hide();
    },

    proceedForward() {
      let data = {
        auth_token: this.staffInfo.auth_token,
        role_id: this.staffRole,
        departments: this.department_List,
        email_list: this.members,
        invitation_validity: "",
      };
      CompanyService.confirmedInvitationFile(data).then((res) => {
        if (res.data.data) {
          this.$store.dispatch("GET_INVITATION_STAFFROLE_LIST", res.data.data);
          this.closeModal();
        } else {
          this.closeModal();
          errorhandler(res);
        }
      });
    },
    invitaionsFile() {
      if (this.department_List.length) {
        this.modal.show();
      } else {
        errorhandler("Please select department");
      }
    },
    // today
    toggleActive() {
      this.active = !this.active;
    },
    // drop down start here
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("bg-green-300")) {
        event.currentTarget.classList.remove("bg-gray-100");
        event.currentTarget.classList.add("bg-green-300");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
  },
};
</script>

<style lang="scss" scoped>
.active-dropzone {
  color: #7900d8;
  border-color: #7900d8;
  background-color: #7900d81a;
  .box_title {
    background-color: transparent !important;
    color: #7900d8;
  }
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
.cn_button {
  position: absolute;
  top: -22px;
  border-radius: 50%;
  right: -24px;
  background-color: #fff;
  border: 1px solid #bec5d3;
  &:hover {
    background-color: #fff;
    border: 1px solid #bec5d3;
  }
}
.dropbox_area {
  padding: 12px 0;
  border-style: dashed;
  border-color: #222b45;
  border-width: 2px;
  margin-bottom: 20px;
}
.upload_area {
  // width: 200px;
  height: 100px;
  position: relative;
}
.imgContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .upload_logo {
    width: 50px;
  }
}
.alert_title {
  font-size: 15px;
  line-height: 20px;
  color: #222b45;
  margin-bottom: 10px;
}
.box_title {
  @extend .alert_title;
}
.confirmation_modal {
  &.modal {
    z-index: 999 !important;
  }
}
.invitaion_content {
  // box-shadow: 9px 9px 16px rgba(163 177 198 / 60%),
  //   -9px -9px 16px rgba(255 255 255 / 50%);
}
</style>
