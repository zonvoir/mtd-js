<template>
  <div>
    <div class="alert-notification m-t-30">
      <div class="d-inline-flex">
        <div class="img_wrap m-r-24">
          <img src="K_Icons/alert_yellow.svg" alt="" class="icon_name" />
        </div>
        <div class="">
          <h5 class="m-b-0 alert_title">
            {{ $t("results.alert_notification.alert_title") }}
          </h5>
          <p class="m-b-0 alert_message">
            {{ $t("results.alert_notification.alert_message") }}
          </p>
        </div>
      </div>
      <div class="m-l-auto">
        <div class="d-inline-flex align-items-center">
          <h4 class="m-b-0 st_title">
            {{ $t("results.buttons.not_started") }}
          </h4>
          <button class="btn btn-primary btn-set">
            {{ $t("results.buttons.start") }}
          </button>
        </div>
      </div>
    </div>
    <div class="m-b-20">
      <Resulttable :data="head1" />
    </div>
    <div class="m-b-20">
      <h3 class="m-b-0 ext_title">{{ $t("results.Extended") }}</h3>
    </div>
    <div class="m-b-20">
      <Resulttable :data="head2" />
    </div>
  </div>
</template>

<script>
import Resulttable from "./ResultTable.vue";
export default {
  components: {
    Resulttable,
  },
  data() {
    return {
      head1: true,
      head2: false,
      resultdata: [
        {
          id: 1,
          isLoked: false,
          score: 2.5,
          dept_name: "Sales / after sales",
          opened: true,
        },
        {
          id: 2,
          isLoked: false,
          score: 3.5,
          dept_name: "IT",
          opened: true,
        },
        {
          id: 3,
          isLoked: false,
          score: 4.5,
          dept_name: "Marketing",
          opened: true,
        },

        {
          id: 4,
          isLoked: false,
          score: 2.5,
          dept_name: "Sourcing & Supply",
          opened: true,
        },
        {
          id: 5,
          isLoked: false,
          score: 3.5,
          dept_name: "Finance",
          opened: true,
        },
        {
          id: 6,
          isLoked: false,
          score: 4.5,
          dept_name: "HR",
          opened: true,
        },
        {
          id: 7,
          isLoked: false,
          score: 2.5,
          dept_name: "R & D",
          opened: true,
        },
        {
          id: 8,
          isLoked: false,
          score: 3.5,
          dept_name: "Production",
          opened: true,
        },
        {
          id: 9,
          isLoked: false,
          score: 4.5,
          dept_name: "Legal",
          opened: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.ext_title {
  color: #222b45;
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
}
.st_title {
  font-size: 15px;
  font-weight: 600;
  color: #8f9bb3;
  line-height: 24px;
  margin-right: 30px;
}
.alert-notification {
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 18px 20px;
  .img_wrap {
    position: relative;
    background-color: rgba(255, 170, 0, 0.12) !important;
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
  .icon_name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.alert_title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #222b45;
}
.alert_message {
  color: #8f9bb3;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
</style>
