<template>
  <div class="overview_index">
    <div class="filter_wrap d-flex align-items-center m-b-20">
      <div class="m-r-4">
        <h6 class="m-b-0 text-gray fs-14 fw-400">
          {{ $t("overview_index.filter_by") }}:
        </h6>
      </div>
      <div class="d-inline-flex">
        <button class="btn btn-pill-primary p_btrm m-r-8">
          {{ $t("overview_index.buttons.not_started") }}
        </button>
        <button class="btn btn-pill-primary p_btrm m-r-8">
          {{ $t("overview_index.buttons.in_progress") }}
        </button>
        <button class="btn btn-pill-primary p_btrm">
          {{ $t("overview_index.buttons.completed") }}
        </button>
      </div>
    </div>
    <div class="dept_wrapper">
      <div class="custom_grid">
        <div
          v-for="(category, index) in categoryList"
          :key="index"
          class="custom_grid_col"
        >
          <Card
            :id="category.id"
            :title="category.name"
            :description="category.description"
            :status="category.questionnaire_status"
            :image="category.image"
            :page_name="component_name"
            :page_parmas="{ ...defaultDeptId, id: category.id }"
          />
        </div>
        <!-- :page_parmas="{ ...defaultDeptId, cid: category.id }" -->
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/Shared/Card.vue";
import CommonService from "../../Services/CommonService";
export default {
  components: {
    Card,
  },
  created() {
    if (
      localStorage.getItem("bWFpbCI6Inpvb") == undefined ||
      localStorage.getItem("bWFpbCI6Inpvb") == null ||
      localStorage.getItem("bWFpbCI6Inpvb") == ""
    ) {
      this.$router.push({ name: "signup-signin" });
    }
    this.getDefaultDeptCategories();
    this.getdDepartmentList();
  },

  data() {
    return {
      component_name: "category-overview",
      categoryList: [],
      departmentLists: [],
      defaultDeptId: {},
    };
  },
  methods: {
    // get departmens lists
    getdDepartmentList() {
      // this.$store.commit("loadingStatus", true);
      CommonService.getAllDepartments().then((res) => {
        // this.$store.commit("loadingStatus", false);
        if (res.data.status) {
          this.departmentLists = res.data.data.filter(function (depts) {
            return depts.is_default === "1";
          });
          this.defaultDeptId = { did: this.departmentLists[0].departmentid };
          console.log("default dept IDs", this.defaultDeptId);
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
            if (res.data.message === "Authentication token mismatch") {
              console.log("token Mismatch");
              this.$router.push({ name: "signup-signin" });
            }
            $th.$toast.error(res.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
          }
        }
      });
      // .catch((err) => {
      //   console.log(err);
      // })
      // .finally(() => {
      //   console.log("fianly");
      //   // this.$store.commit("loadingStatus", false);
      // });
    },
    // get categories lists
    getDefaultDeptCategories() {
      console.log("department deatil");
      CommonService.getAllCategories()
        .then((res) => {
          if (res.data.status) {
            this.categoryList = res.data.data;
            console.log("list", this.categoryList);
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
              if (res.data.message === "Authentication token mismatch") {
                this.$router.push({ name: "signup-signin" });
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("finaly");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
