<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div class="m-r-6">
              <button @click="backToMain" class="btn btn-transaprent">
                <img src="K_Icons/arrowhead-right.svg" alt="" />
              </button>
            </div>
            <div class="k_icon_wrap m-r-10">
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
      // staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      // authToken: "",
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
    oneDepartmentDetails(id) {
      // let data = {
      //   auth_token: this.staffData.auth_token,
      // };
      // CommonService.getTokenValidation(data).then((res) => {
      //   if (res.data.status) {
      //     console.log("welcome Data Value", res.data);
      //   } else {
      //     let $th = this;
      //     if ("error" in res.data) {
      //       Object.keys(res.data.error).map(function (key) {
      //         $th.$toast.error(res.data.error[key], {
      //           position: "bottom-left",
      //           duration: 3712,
      //         });
      //       });
      //     } else {
      //       $th.$toast.error(res.data.message, {
      //         position: "bottom-left",
      //         duration: 3712,
      //       });
      //     }
      //   }
      // });
      let deptInfo = this.department.find((item) => {
        return item.departmentid === id;
      });
      console.log("dept info", deptInfo);
      this.title = deptInfo.name;
      this.id = deptInfo.id;
      this.image = deptInfo.image;
    },
    // get DepartmentDetail
    getDepartmentDetails(id) {
      CommonService.getOneDepartment(id).then((res) => {
        if (res.data.status) {
          // console.log("dept layout", res.data.data);
          this.department = res.data.data;
          this.oneDepartmentDetails(this.url_dataID);
        } else {
          let $th = this;
          if ("error" in res.data) {
            Object.keys(res.data.error).map(function (key) {
              $th.$toast.error(res.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          } else {
            $th.$toast.error(res.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
          }
        }
      });
    },
    backToMain() {
      this.$router.push({ name: "overview-extended" });
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
