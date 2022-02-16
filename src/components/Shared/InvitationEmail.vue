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
        <img src="K_Icons/more-vertical.svg" alt="" class="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
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
</style>
