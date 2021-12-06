<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <!-- <div v-if="dept" class="m-r-6">
              <button class="btn btn-transaprent">
                <img src="K_Icons/arrowhead-right.svg" alt="" />
              </button>
            </div>
            <div v-if="dept" class="k_icon_wrap m-r-10">
              <img src="K_Icons/green_pie_logo.svg" class="" alt="" />
            </div> -->
            <div class="">
              <h4 class="view_title">{{ $t("projects.Projects") }}</h4>
            </div>
          </div>
        </div>
        <!-- This button is available on project list is available -->
        <div class="invite_btn_wrap m-l-auto">
          <button class="btn-primary btn k_btn_people">
            {{ $t("projects.buttons.invite_people") }}
          </button>
        </div>
      </div>
      <!-- tabs start -->
      <div class="tabs_wrap m-b-18">
        <div class="border-bottom-1"></div>
      </div>
      <!-- tabs end -->
      <div class="overview_container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tablist,
      dept: true,
      title: "Projects",
    };
  },
  methods: {
    ChangeT(title) {
      this.title = title;
    },
  },
};
</script>

<style lang="scss" scoped>
.border-bottom-1 {
  margin-top: 40px;
  border-bottom: 1px solid #e4e9f2;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
.k_btn_people {
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  text-transform: uppercase;
}
</style>
