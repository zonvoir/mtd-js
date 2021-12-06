<template>
  <div class="sidenar_wrap">
    <div class="d-flex align-items-center">
      <h4 class="m-b-0 sidebar_title">
        {{ $t("results.sidebar.Select_Department") }}
      </h4>
      <button @click="sidebarClose" class="btn btn-transaprent zp-0 m-l-auto">
        <img src="K_Icons/cancel.svg" alt="" class="cancel_icon" />
      </button>
    </div>
    <div class="dept_wrap m-t-30">
      <!-- repeat dept -->
      <div class="d-flex align-items-center dept_content">
        <div class="dept_info">
          <div class="img m-r-14">
            <img src="K_Icons/pie_30.svg" class="" alt="" />
          </div>
          <div class="img">
            <h4 class="m-b-0 dept_title">
              {{ $t("results.sidebar.Finance_Controling") }}
            </h4>
          </div>
        </div>
        <div class="m-l-auto">
          <div class="check_box_wrapper check_wrap">
            <label class="k_checkbox check_lable">
              <input type="checkbox" v-model="value" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <!-- repeat dept -->
      <div class="d-flex align-items-center dept_content">
        <div class="dept_info">
          <div class="img m-r-14">
            <img src="K_Icons/pie_30.svg" class="" alt="" />
          </div>
          <div class="img">
            <h4 class="m-b-0 dept_title">{{ $t("results.sidebar.HR") }}</h4>
          </div>
        </div>
        <div class="m-l-auto">
          <div class="check_box_wrapper check_wrap">
            <label class="k_checkbox check_lable">
              <input type="checkbox" v-model="value" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center dept_content">
        <div class="dept_info">
          <div class="img m-r-14">
            <img src="K_Icons/pie_30.svg" class="" alt="" />
          </div>
          <div class="img">
            <h4 class="m-b-0 dept_title">{{ $t("results.sidebar.Legal") }}</h4>
          </div>
        </div>
        <div class="m-l-auto">
          <div class="check_box_wrapper check_wrap">
            <label class="k_checkbox check_lable">
              <input type="checkbox" v-model="value" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center dept_content">
        <div class="dept_info">
          <div class="img m-r-14">
            <img src="K_Icons/pie_30.svg" class="" alt="" />
          </div>
          <div class="img">
            <h4 class="m-b-0 dept_title">
              {{ $t("results.sidebar.Logistics") }}
            </h4>
          </div>
        </div>
        <div class="m-l-auto">
          <div class="check_box_wrapper check_wrap">
            <label class="k_checkbox check_lable">
              <input type="checkbox" v-model="value" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center dept_content">
        <div class="dept_info">
          <div class="img m-r-14">
            <img src="K_Icons/pie_30.svg" class="" alt="" />
          </div>
          <div class="img">
            <h4 class="m-b-0 dept_title">
              {{ $t("results.sidebar.Mangement") }}
            </h4>
          </div>
        </div>
        <div class="m-l-auto">
          <div class="check_box_wrapper check_wrap">
            <label class="k_checkbox check_lable">
              <input type="checkbox" v-model="value" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center dept_content">
        <div class="dept_info">
          <div class="img m-r-14">
            <img src="K_Icons/pie_30.svg" class="" alt="" />
          </div>
          <div class="img">
            <h4 class="m-b-0 dept_title">
              {{ $t("results.sidebar.Marketing") }}
            </h4>
          </div>
        </div>
        <div class="m-l-auto">
          <div class="check_box_wrapper check_wrap">
            <label class="k_checkbox check_lable">
              <input type="checkbox" v-model="value" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center dept_content">
        <div class="dept_info">
          <div class="img m-r-14">
            <img src="K_Icons/pie_30.svg" class="" alt="" />
          </div>
          <div class="img">
            <h4 class="m-b-0 dept_title">
              {{ $t("results.sidebar.Production") }}
            </h4>
          </div>
        </div>
        <div class="m-l-auto">
          <div class="check_box_wrapper check_wrap">
            <label class="k_checkbox check_lable">
              <input type="checkbox" v-model="value" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center dept_content">
        <div class="dept_info">
          <div class="img m-r-14">
            <img src="K_Icons/pie_30.svg" class="" alt="" />
          </div>
          <div class="img">
            <h4 class="m-b-0 dept_title">{{ $t("results.sidebar.Sales") }}</h4>
          </div>
        </div>
        <div class="m-l-auto">
          <div class="check_box_wrapper check_wrap">
            <label class="k_checkbox check_lable">
              <input type="checkbox" v-model="value" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="from_wrapper">
      <form action="">
        <div class="modal_apply_btn">
          <div class="btns_wrap">
            <button
              :disabled="isSubmitted"
              type="submit"
              class="btn btn-primary btn-set"
            >
              <div
                v-if="isSubmitted"
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else data-bs-dismiss="modal">
                {{ $t("results.sidebar.buttons.apply") }}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      sidebarActive: false,
    };
  },
  methods: {
    sidebarClose() {
      this.$emit("sidebarToggle", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal_apply_btn {
  margin-top: 42px;
}
.dept_content {
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 0;
  }
}

.check_wrap {
  position: relative;
  top: -10px;
}
.dept_info {
  display: flex;
  align-items: center;
}
.dept_title {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #222b45;
  margin-bottom: 0;
}
.sidebar_wrap {
  padding: 8px 4px;
}
.sidebar_title {
  font-size: 22px;
  line-height: 32px;
  font-weight: 700;
  color: #222b45;
  margin-bottom: 0;
}
</style>
