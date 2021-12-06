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
        {{ category }}
        <div
          v-for="(category, index) in categoryList"
          :key="index"
          class="custom_grid_col"
        >
          <Card
            :id="category.id"
            :title="category.name"
            :description="category.description"
            :status="category.status"
            :image="category.image"
            :page_name="component_name"
            :page_parmas="{ ...component_params, cid: category.id }"
          />
        </div>
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
  data() {
    return {
      url_dataID: "",
      categoryList: [],
      component_name: "category-overview",
      component_params: {},
      departmentId: 0,
    };
  },
  created() {
    this.component_params = { did: this.$route.params.id };
    this.departmentId = this.$route.params.id;
    console.log(this.$route.params.id, this.departmentId);
    if (
      localStorage.getItem("bWFpbCI6Inpvb") == undefined ||
      localStorage.getItem("bWFpbCI6Inpvb") == null ||
      localStorage.getItem("bWFpbCI6Inpvb") == ""
    ) {
      this.$router.push({ name: "signup-signin" });
    }
    this.getDefaultDeptCategories();
  },
  mounted() {
    this.url_dataID = this.$route.params.id;
    console.log("id from url ", this.url_dataID);
    if (this.url_dataID) {
      this.getDepartmentDetails(this.url_dataID);
    }
  },
  methods: {
    // get categories lists
    getDefaultDeptCategories() {
      CommonService.getAllCategories()
        .then((resp) => {
          if (resp.data.status) {
            this.categoryList = resp.data.data;
          } else {
            console.log("no department list found");
            let $th = this;
            Object.keys(resp.data.error).map(function (key) {
              $th.$toast.error(resp.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("");
        });
    },
    // get DepartmentDetail
    getDepartmentDetails(id) {
      CommonService.getOneDepartment(id).then((res) => {
        if (res.data.status) {
          console.log("departmentWithCategory list ", res.data.data);
        } else {
          console.log("no department details found");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
