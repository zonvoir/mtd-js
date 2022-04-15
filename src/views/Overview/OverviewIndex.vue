<template>
  <div class="overview_index">
    <div class="filter_wrap d-flex align-items-center m-b-20">
      <div class="m-r-4">
        <h6 class="m-b-0 text-gray fs-14 fw-400">
          {{ $t("overview_index.filter_by") }}
        </h6>
      </div>
      <div class="d-inline-flex">
        <button
          @click="filterCategory('all')"
          class="btn btn-pill-primary p_btrm m-r-8"
          :class="{ 'btn-pill-primary-active': isFiltered == 'all' }"
        >
          {{ $t("overview_index.buttons.all") }}
        </button>
        <button
          @click="filterCategory('not_started')"
          class="btn btn-pill-primary p_btrm m-r-8"
          :class="{ 'btn-pill-primary-active': isFiltered == 'not_started' }"
        >
          {{ $t("overview_index.buttons.not_started") }}
        </button>
        <button
          @click="filterCategory('in_progress')"
          class="btn btn-pill-primary p_btrm m-r-8"
          :class="{ 'btn-pill-primary-active': isFiltered == 'in_progress' }"
        >
          {{ $t("overview_index.buttons.in_progress") }}
        </button>
        <button
          @click="filterCategory('completed')"
          class="btn btn-pill-primary p_btrm"
          :class="{ 'btn-pill-primary-active': isFiltered == 'completed' }"
        >
          {{ $t("overview_index.buttons.completed") }}
        </button>
      </div>
    </div>
    <div v-if="categoryList.length > 0" class="dept_wrapper">
      <div class="custom_grid">
        <template v-for="(category, index) in categoryList" :key="index">
          <div
            class="custom_grid_col"
            v-if="
              category.questionnaire != '' &&
              [category.questionnaire.questionnaire_status, 'all'].includes(
                isFiltered
              )
            "
          >
            <div class="">
              <Card
                :id="category.id"
                :title="category.name"
                :description="category.questionnaire.short_description"
                :status="category.questionnaire.questionnaire_status"
                :image="category.image"
                :page_name="component_name"
                :page_parmas="{ ...defaultDeptId, id: category.id }"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-else class="no_questionnaire_list">
      <h6 class="empty_list_warning">Questionnaire list is empty</h6>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "../../components/Shared/Card.vue";
export default {
  data() {
    return {
      component_name: "category-overview",
      departmentLists: [],
      isFiltered: "all",
      defaultDeptId: {},
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      authToken: "",
    };
  },
  components: {
    Card,
  },
  computed: {
    ...mapGetters({
      categoryList: "categoryArrayItems",
      currentYear: "activeYear",
      currentCompany: "activeCompany",
      defaultDepartment: "defaultCompanyDeptId",
    }),
  },
  watch: {
    currentYear: function (next, pre) {
      console.log("pre", +pre, "next", next);
      this.getdDepartmentList();
    },
    currentCompany: function (next, pre) {
      console.log("pre", +pre, "next", next);
      this.getdDepartmentList();
    },
  },

  beforeCreate() {
    localStorage.removeItem("bWFInpvitedbpbUser");
  },

  created() {
    if (
      localStorage.getItem("bWFpbCI6Inpvb") == undefined ||
      localStorage.getItem("bWFpbCI6Inpvb") == null ||
      localStorage.getItem("bWFpbCI6Inpvb") == ""
    ) {
      this.$router.push({ name: "signup-signin" });
    }
    this.authToken = this.staffData.auth_token;
    this.getdDepartmentList();
  },

  methods: {
    getdDepartmentList() {
      let data = { auth_token: this.authToken };
      this.$store
        .dispatch("GET_STAFFS_QUESTIONNIRE_DEPARTMENT", data)
        .then((res) => {
          let $th = this;
          if (res.data.status) {
            console.log("all departments", res);
            this.departmentLists = res.data.data.filter(function (depts) {
              return depts.departmentid === $th.defaultDepartment; //5 is default company department id
            });
            // let department_Id = this.departmentLists[0].departmentid;
            console.log("default department", this.departmentLists);
            let data = {
              department_id: $th.defaultDepartment,
              auth_token: this.authToken,
            };
            this.getDefaultDeptCategories(data);
            this.defaultDeptId = { did: $th.defaultDepartment };
          }
        });
    },
    // get categories lists
    getDefaultDeptCategories(data) {
      this.$store
        .dispatch("GET_QUESTIONNAIRE_CATEGORY_ARRAY", data)
        .then((res) => {
          console.log("categories res", res);
        });
    },
    filterCategory(val) {
      this.isFiltered = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-pill-primary-active {
  background-color: #7900d8;
  box-shadow: none !important;
  outline: none;
  color: #ffffff !important;
  border-color: #7900d8;
  &:hover {
    background-color: #7900d8;
    box-shadow: none !important;
    outline: none;
    color: #ffffff !important;
    border-color: #7900d8;
  }
}
.empty_list_warning {
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #8f9bb3;
  margin-bottom: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.no_questionnaire_list {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  width: 100%;
  height: 23rem;
  margin-bottom: 20px;
  position: relative;
}
</style>
