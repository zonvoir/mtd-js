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
        <div
          :class="{
            pending: member.status == 'pending',
            accepted: member.status == 'accepted',
            expired: member.status == 'expired',
          }"
          class="email_status_wrap"
        >
          <p class="email_status">
            {{ member.status }}
          </p>
        </div>
        <!-- <img src="K_Icons/more-vertical.svg" alt="" class="" /> -->
        <Button
          type="button"
          icon="pi pi-ellipsis-v"
          class="p-button-rounded kp_icon_btn p-button-text p-button-plain"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_tmenu"
        />
        <TieredMenu id="overlay_tmenu" ref="menu" :model="items" :popup="true">
          <template #item="{ item }">
            <div class="d-flex align-items-center" @click="deleteInvitaion">
              <Button
                type="button"
                :icon="item.icon"
                class="
                  p-button-rounded
                  kp_icon_btn
                  p-button-text p-button-plain
                "
                aria-haspopup="true"
                aria-controls="overlay_tmenu"
              />
              <span icon="item"></span>
              <a :href="item.url" class="cusdropdown">{{ item.label }}</a>
            </div>
          </template>
        </TieredMenu>

        <!-- <SplitButton :model="items" class="bg-primary border-round">
         <Button @click="save">
            <img
              alt="logo"
              src="K_Icons/more-vertical.svg"
              style="width: 1rem"
            />
          </Button>
        </SplitButton> -->
      </div>
    </div>
  </div>
</template>

<script>
// import SplitButton from "primevue/splitbutton";
import TieredMenu from "primevue/tieredmenu";
import Button from "primevue/button";

export default {
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
  components: {
    TieredMenu,
    Button,
  },
  data() {
    return {
      items: [
        {
          label: "Delete",
          icon: "pi pi-trash",
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    deleteInvitaion() {
      alert("hello from each");
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
