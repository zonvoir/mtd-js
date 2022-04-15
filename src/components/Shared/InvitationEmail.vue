<template>
  <div class="list_wrapper">
    <div class="name_wrap">
      <p class="text-14-600 m-b-0 text-capitalize text-heading">First Name</p>
    </div>
    <div class="email_wrap">
      <p class="text-14-600 m-b-0 text-heading">
        {{ member.recipient_email }}
      </p>
    </div>
    <div class="icon_wrap">
      <div class="d-inline-flex">
        <div :class="getClass(member.status)" class="email_status_wrap">
          <p class="email_status">
            {{ member.status }}
          </p>
        </div>
        <!-- <div class="dropdown"> -->
        <button
          v-if="member.sender_id"
          class="btn btn-transaprent kk_drop"
          type="button"
          @click="toggle"
        >
          <img src="K_Icons/more-vertical.svg" alt="" class="" />
        </button>
        <!-- </div> -->
        <!--  -->
        <!-- <Button
          type="button"
          icon="pi pi-ellipsis-v"
          class="kp_icon_btn p-button-text p-button-plain"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_tmenu"
        /> :popup="true"-->
      </div>
    </div>
  </div>
  <!-- :appendTo="'kk_drop'" -->
  <!-- :appendTo="'.kk_drop'" -->
  <Menu id="overlay_tmenu" ref="menu" :model="items" :popup="true">
    <template #item="{ item }">
      <div
        class="d-flex drop_cus_option align-items-center"
        @click="removeInvitaion(member.id)"
      >
        <a :href="item.url" class="cusdropdown">{{ item.label }}</a>
      </div>
    </template>
  </Menu>
  <!-- <ul
    :class="openDropdown ? 'active_dropdown' : ''"
    class="dropdown-menu custom_dropdown"
    ref="invitationModal"
  >
    <li @click="removeInvitaion(member.id)">
      <a class="dropdown-item">Delete</a>
    </li>
  </ul> -->
</template>

<script>
// import TieredMenu from "primevue/tieredmenu";
// import Button from "primevue/button";
import CompanyService from "../../Services/Company/CompanyService";
import errorhandler from "../../utils/Error";
import { mapGetters } from "vuex";
// import { Dropdown } from "bootstrap";
import Menu from "primevue/menu";

export default {
  props: {
    member: {
      type: Object,
      required: true,
    },
    teamModal: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      ownRole: "roleInCompany",
    }),
  },

  components: {
    Menu,
    // TieredMenu,
    // Button,
  },
  mounted() {
    // document.addEventListener("click", this.closeDropDrown);
  },
  data() {
    return {
      staffInfo: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      dropdown: null,
      openDropdown: false,
      items: [
        {
          label: "Delete",
          // icon: "pi pi-trash",
          command: () => {
            this.removeInvitaion();
          },
        },
      ],
    };
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropDrown);
  },
  methods: {
    toggle() {
      // console.log(this.dropdown);
      // this.openDropdown = !this.openDropdown;
      this.$refs.menu.toggle(event);
    },
    getClass(value) {
      return {
        expired: "expired",
        accepted: "accepted",
        pending: "pending",
        valid: "accepted",
        invalid: "expired",
      }[value];
    },
    closeDropDrown(e) {
      console.log(e);
      if (!this.$el.contains(e.target)) {
        this.openDropdown = false;
      }
    },
    removeInvitaion(inv_Id) {
      this.openDropdown = false;
      let data = {
        auth_token: this.staffInfo.auth_token,
        invitation_id: inv_Id,
      };
      if (this.teamModal) {
        this.$store.dispatch("GET_REMOVE_TEAM_MEMBER", data);
        // CompanyService.removeTeamMember(data).then((res) => {
        //   if (res.data.status) {
        //     console.log("response come from remved team", res.data.data);
        //   }
        // });
      } else {
        CompanyService.deleleInvitation(data)
          .then((res) => {
            if (res.data.status) {
              this.deletedInvitaion(inv_Id);
              console.log("deleted invitaion res ", res.data);
              this.$store.dispatch(
                "GET_INVITATION_STAFFROLE_LIST",
                res.data.data
              );
            } else {
              errorhandler(res, this);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // deleted list
    deletedInvitaion(id) {
      console.log("id deletedInvitaion ", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.list_wrapper {
  position: relative;
}
.custom_dropdown {
  &.active_dropdown {
    display: block;
  }
  top: 44px;
  right: 0;
  position: absolute;
  z-index: 1000;

  min-width: 10rem;
  padding: 0.3rem 0;
  margin: 0;
  font-size: 1rem;
  color: #222b45;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  .dropdown-item {
    cursor: pointer;
    padding: 8px 12px;
    text-decoration: none;
    color: #222b45;
    &:active {
      background-color: #7900d8;
      color: #ffffff;
    }
  }
}
.cusdropdown {
  cursor: pointer;
  text-decoration: none;
  color: #222b45;
  &:hover {
    cursor: pointer;
    text-decoration: none;
    color: #222b45;
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
  &.expired {
    background-color: #ff5c92;
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
.drop_cus_option {
  padding: 0 15px;
}
#overlay_tmenu {
  // width: 7rem !important;
  // left: 1015.08px;
  // min-width: 26px;
  // z-index: 9999;
  // width: 7rem;
}
</style>
