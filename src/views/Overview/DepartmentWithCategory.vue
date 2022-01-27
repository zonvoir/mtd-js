<template>
  <div class="overview_index">
    <div class="filter_wrap d-flex align-items-center m-b-20">
      <div class="m-r-4">
        <h6 class="m-b-0 text-gray fs-14 fw-400">
          {{ $t("overview_index.filter_by") }}:
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
        <!-- {{ categoryList }} -->
        <template v-for="(category, index) in categoryList" :key="index">
          <div
            v-if="
              category.questionnaire != '' &&
              [category.questionnaire.questionnaire_status, 'all'].includes(
                isFiltered
              )
            "
            class="custom_grid_col"
          >
            <div class="">
              <Card
                :id="category.id"
                :title="category.name"
                :description="category.questionnaire.short_description"
                :status="category.questionnaire.questionnaire_status"
                :image="category.image"
                :page_name="component_name"
                :page_parmas="{ ...component_params, id: category.id }"
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
import CommonService from "../../Services/CommonService";
import errorhandler from "../../utils/Error";

export default {
  components: {
    Card,
  },
  data() {
    return {
      isFiltered: "all",
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      authToken: "",
      component_name: "category-overview",
      component_params: {},
      departmentId: 0,
    };
  },

  computed: {
    ...mapGetters({
      categoryList: "categoryArrayItems",
    }),
  },
  created() {
    this.component_params = { did: this.$route.params.id };
    this.departmentId = this.$route.params.id;
    console.log("department id", this.departmentId);
    // if (
    //   localStorage.getItem("bWFpbCI6Inpvb") == undefined ||
    //   localStorage.getItem("bWFpbCI6Inpvb") == null ||
    //   localStorage.getItem("bWFpbCI6Inpvb") == ""
    // ) {
    //   this.$router.push({ name: "signup-signin" });
    // }
    this.authToken = this.staffData.auth_token;
    let data = {
      department_id: this.departmentId,
      auth_token: this.authToken,
    };
    this.getDefaultDeptCategories(data);
  },

  methods: {
    // get categories lists
    getDefaultDeptCategories(data) {
      CommonService.getAllCategories(data).then((res) => {
        if (res.data.status) {
          // this.$store.dispatch("getCategoryArray", res.data.data);
          this.$store.dispatch("GET_CATEGORY_ARRAY", res.data.data);
        } else {
          errorhandler(res, this);
          // this.$store.dispatch("getCategoryArray", []);
          this.$store.dispatch("GET_CATEGORY_ARRAY", []);
        }
      });
    },
    filterCategory(val) {
      this.isFiltered = val;
    },
  },
};
</script>

<style lang="scss" scoped>
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
.btn-pill-primary-active {
  background-color: #7900d8;
  box-shadow: none !important;
  outline: none;
  color: #ffffff !important;
  border-color: #7900d8;
}
</style>
