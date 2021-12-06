<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div class="m-r-6">
              <button class="btn btn-transaprent">
                <img src="K_Icons/arrowhead-right.svg" alt="" />
              </button>
            </div>
            <div class="k_icon_wrap m-r-10">
              <!-- <img src="K_Icons/green_pie_logo.svg" class="" alt="" /> -->
              <img
                :src="image ? image : 'K_Icons/clipboard_36.svg'"
                class="dept_logo"
                alt=""
              />
            </div>
            <div class="">
              <h4 class="view_title">{{ title }}</h4>
            </div>
          </div>
        </div>
        <div class="invite_btn_wrap m-l-auto">
          <button class="btn-primary btn k_btn_people">INVITE PEOPLE</button>
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
import CommonService from "../../Services/CommonService";
export default {
  data() {
    return {
      title: "",
      department: [],
      id: "",
      image: "",
    };
  },
  created() {
    this.url_dataID = this.$route.params.id;
    if (this.url_dataID) {
      console.log("id on layout", this.url_dataID);
      this.getDepartmentDetails(this.url_dataID);
    }
  },
  components: {},
  methods: {
    ChangeT(title) {
      this.title = title;
    },
    // get DepartmentDetail
    getDepartmentDetails(id) {
      console.log("department layout");
      CommonService.getOneDepartment(id).then((resp) => {
        if (resp.data.status) {
          console.log("dept layout", resp.data.data);
          this.department = resp.data.data;
          this.title = resp.data.data[0].name;
          this.id = resp.data.data[0].id;
          this.image = resp.data.data[0].image;
        } else {
          console.log("no department details found");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dept_logo {
  width: 36px;
  height: 36px;
}
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
}
</style>
