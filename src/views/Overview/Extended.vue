<template>
  <div class="">
    <div v-if="departmentLists.length" class="dept_wrapper">
      <div class="custom_grid">
        <div
          v-for="(deparment, index) in departmentLists"
          :key="index"
          class="custom_grid_col"
        >
          <Card
            :id="deparment.departmentid"
            :title="deparment.name"
            :description="deparment.description"
            :image="deparment.image"
            :page_name="component_name"
            :page_parmas="{ did: deparment.departmentid }"
          />
        </div>
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
  components: {
    Card,
  },

  data() {
    return {
      component_name: "department-category",
      staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
      authToken: "",

      departmentLists: [],
    };
  },

  // get vuex getters
  computed: {
    ...mapGetters({
      defaultDepartment: "defaultCompanyDeptId",
    }),
  },

  created() {
    this.authToken = this.staffData.auth_token;
    this.getdDepartmentList();
  },

  methods: {
    // get categories list of all  department except company/default

    getdDepartmentList() {
      let data = { auth_token: this.authToken };
      this.$store
        .dispatch("GET_STAFFS_QUESTIONNIRE_DEPARTMENT", data)
        .then((res) => {
          let $th = this;
          if (res.data.status) {
            this.departmentLists = res.data.data.filter(function (depts) {
              return depts.departmentid != $th.defaultDepartment; // default company department id
            });
          }
        });
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
  .card_header {
    display: inline-flex;
    align-items: center;
    border-bottom: 1px solid #edf1f7;
    padding-bottom: 7px;
    width: 100%;
    height: 52px !important;
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
