<template>
  <div class="custom_grid_col m-r-15">
    <div class="detail_wrap b-radius-4 text-center bg_light zp-20">
      <h6 class="text_light info_title">
        {{
          $t(
            "company_profile.company_tab.company_details.Employees_lables.TOTAL_EMPLOYEE"
          )
        }}
      </h6>
      <h1 class="info_value">1000</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.bg_light {
  background-color: #f7f9fc;
}
.info_title {
  font-size: 12px;
  font-weight: 700;
  color: #8f9bb3;
  // margin-bottom: 13px;
  text-transform: uppercase;
  vertical-align: middle;
  line-height: normal;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 28px;
}
.info_value {
  font-size: 20px;
  font-weight: 700;
  color: #222b45;
  margin-bottom: 0;
}
</style>
