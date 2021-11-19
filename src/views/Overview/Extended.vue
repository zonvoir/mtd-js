<template>
  <div class="dept_wrapper">
    <div class="custom_grid">
      <div
        v-for="(category, index) in departmentList"
        :key="index"
        class="custom_grid_col"
      >
        <Card :categories="category" />
      </div>
    </div>
    <!-- <div class="dept_wrapper">
      <div class="custom_grid">
        <div
          v-for="(category, index) in departmentList"
          :key="index"
          class="dept_card custom_grid_col card_specing"
        >
          <div class="card_header">
            <div class="dept_logo position-relative m-r-11">
              <div :class="getClass(category.catTitle)" class="logo_wrap">
                <img :src="category.icon" alt="" />
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
      </div>
    </div> -->
  </div>
</template>

<script>
const departmentList = [
  {
    id: 0,
    catTitle: "Marketing",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    icon: "K_Icons/green_pie.svg",
    icon_bg: "",
    component_name: "department-category",
  },
  {
    id: 1,
    catTitle: "IT",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    icon: "K_Icons/hierarchy.svg",
    component_name: "department-category",
  },
  {
    id: 2,
    catTitle: "Sourcing/Supply",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    icon: "K_Icons/hiring.svg",
    component_name: "department-category",
  },
  {
    id: 3,
    catTitle: "Sales/AfterSales",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    icon: "K_Icons/price_tag.svg",
    component_name: "department-category",
  },
  {
    id: 4,
    catTitle: "Finance",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    icon: "K_Icons/price_tag.svg",
    component_name: "department-category",
  },
  {
    id: 5,
    catTitle: "Legal",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    icon: "K_Icons/hiring.svg",
    component_name: "department-category",
  },
  {
    id: 6,
    catTitle: "HR",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    icon: "K_Icons/green_pie.svg",
    component_name: "department-category",
  },
  {
    id: 7,
    catTitle: "R&D",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    icon: "K_Icons/weighing_scale.svg",
    component_name: "department-category",
  },
  {
    id: 8,
    catTitle: "Production",
    cat_desc:
      "General questions about your company. Some questions about your business.General questions about your",
    icon: "K_Icons/settings.svg",
    component_name: "department-category",
  },
];
import Card from "../../components/Shared/Card.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      departmentList,
    };
  },
  methods: {
    getClass(value) {
      return {
        default: "bg_light_teal",
        Marketing: "bg_light_green",
        HR: "bg_light_green",
        // IT: "bg_light_parrot",
        Finance: "bg_light_parrot",
        Legal: "bg_light_red",
        //  R&D: "bg_light_teal",
        IT: "bg_light_blue",
        Production: "bg_light_info",
      }[value];
    },
  },
};
</script>

<style lang="scss" scoped>
.dept_status {
  border-radius: 12px;
  padding: 6px 13px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 700;
}
.card_specing {
  margin: 0 10px 20px 10px;
}
.page_link {
  font-size: 16px;
  line-height: 32px;
  font-weight: 500;
  color: #7900d8;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}

.dept_card {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 14px 10px 10px 10px;
  width: 240px;
  .card_header {
    display: inline-flex;
    align-items: center;
    border-bottom: 1px solid #edf1f7;
    padding-bottom: 7px;
    width: 100%;
    .dept_name_wrap {
      height: 42px;
      line-height: 42px;
    }
    .dept_name {
      font-size: 18px;
      font-weight: 600;
      color: #222b45;
      vertical-align: middle;
      line-height: normal;
      display: -webkit-inline-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .card_body {
    padding: 11px 4px 10px 10px;
    height: 100px;
    line-height: 100px;
    .dept_desc {
      font-size: 14px;
      font-weight: 400;
      color: #8f9bb3;
      line-height: 20px;
      vertical-align: middle;
      line-height: normal;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .card_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
