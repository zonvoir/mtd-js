<template>
  <div class="overview_index">
    <div class="filter_wrap d-flex align-items-center m-b-20">
      <div class="m-r-4">
        <h6 class="m-b-0 text-gray fs-14 fw-400">Filter by:</h6>
      </div>
      <div class="d-inline-flex">
        <button class="btn btn-pill-primary m-r-8">not started</button>
        <button class="btn btn-pill-primary m-r-8">in progress</button>
        <button class="btn btn-pill-primary">completed</button>
      </div>
    </div>
    <div class="dept_wrapper">
      <div class="custom_grid">
        <div
          v-for="(category, index) in categoryList"
          :key="index"
          class="custom_grid_col"
        >
          <Card :categories="category" />
        </div>
      </div>
      <!-- <div class="custom_grid">
        <div
          v-for="(category, index) in categoryList"
          :key="index"
          class="dept_card custom_grid_col card_specing"
        >
          <div class="card_header">
            <div class="dept_logo position-relative m-r-11">
              <div class="logo_wrap">
                <img src="K_Icons/clipboard.svg" alt="" />
              </div>
            </div>
            <div class="dept_name_wrap">
              <h4 class="m-b-0 dept_name">{{ category.catTitle }}</h4>
            </div>
          </div>
          <div class="card_body">
            <p class="dept_desc">
              {{ category.cat_desc }}
            </p>
          </div>
          <div class="card_footer">
            <div class="">
              <span
                :class="{
                  bg_gray: category.status == 'not started',
                  bg_warn: category.status == 'in progress',
                  bg_success: category.status == 'completed',
                }"
                class="dept_status bg-gray"
                >{{ category.status }}</span
              >
            </div>
            <div class="card_link">
              <a to="" class="page_link"
                >view
                <img src="K_Icons/next.svg" alt="" class="next_icon p-l-6"
              /></a>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
const categoryList = [
  {
    id: 0,
    catTitle: "IT&Technology",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    status: "not started",
    component_name: "cateogry-home",
  },
  {
    id: 1,
    catTitle: "Processes and Operation",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    status: "not started",
    component_name: "cateogry-home",
  },
  {
    id: 2,
    catTitle: "Data & Analytics",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    status: "not started",
    component_name: "cateogry-home",
  },
  {
    id: 3,
    catTitle: "Customer & Customer Engagement dfsfgfdsgds",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    status: "in progress",
    component_name: "cateogry-home",
  },
  {
    id: 4,
    catTitle: "Advanced KPI",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    status: "in progress",
    component_name: "cateogry-home",
  },
  {
    id: 5,
    catTitle: "Strategy",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    status: "in progress",
    component_name: "cateogry-home",
  },
  {
    id: 6,
    catTitle: "KPI",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    status: "completed",
    component_name: "cateogry-home",
  },
  {
    id: 7,
    catTitle: "People and Culture",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    status: "completed",
    component_name: "cateogry-home",
  },
];
import Card from "../../components/Shared/Card.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      categoryList,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
