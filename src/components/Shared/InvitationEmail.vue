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
        <button
          v-if="member.sender_id"
          class="btn btn-transaprent kk_drop"
          type="button"
          @click="toggle"
        >
          <img src="K_Icons/more-vertical.svg" alt="" class="" />
        </button>
      </div>
    </div>
  </div>

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
</template>

<script>
import CompanyService from "../../Services/Company/CompanyService";
import errorhandler from "../../utils/Error";
import { mapGetters } from "vuex";
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
    // vuex getter variables
    ...mapGetters({
      ownRole: "roleInCompany",
      staffInfo: "staffDataLocal",
    }),
  },

  components: {
    Menu,
  },

  data() {
    return {
      // staffInfo: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      dropdown: null,
      openDropdown: false,
      items: [
        {
          label: "Delete",
          command: () => {
            this.removeInvitaion();
          },
        },
      ],
    };
  },

  // onclick outside close the dropdown
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropDrown);
  },

  methods: {
    // to show and hide remove drop down
    toggle() {
      this.$refs.menu.toggle(event);
    },

    // apply the dyanamic class according to te current status of the invited emails

    getClass(value) {
      return {
        expired: "expired",
        accepted: "accepted",
        pending: "pending",
        valid: "accepted",
        invalid: "expired",
      }[value];
    },

    // close the dropdown menu

    closeDropDrown(e) {
      console.log(e);
      if (!this.$el.contains(e.target)) {
        this.openDropdown = false;
      }
    },

    // remove invitaion from the list by user id  using vuex action and  update list

    removeInvitaion(inv_Id) {
      this.openDropdown = false;
      let data = {
        auth_token: this.staffInfo.auth_token,
        invitation_id: inv_Id,
      };
      if (this.teamModal) {
        // if remove member request is commig from team management
        this.$store.dispatch("GET_REMOVE_TEAM_MEMBER", data);
      } else {
        // remove member request is commig from normal Invitaion Modal page
        CompanyService.deleleInvitation(data)
          .then((res) => {
            if (res.data.status) {
              this.$store.dispatch(
                "GET_INVITATION_STAFFROLE_LIST",
                res.data.data
              );
            } else {
              // error notificataion utility function
              errorhandler(res, this);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
</style>
