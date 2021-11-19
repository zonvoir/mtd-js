<template>
  <div class="row">
    <div class="col lg-6">
      <div class="bg-white zp-10">
        <div class="description_wrapper">
          <h4 class="m-b-0 desc_title">Description</h4>
        </div>
        <div class="border-bottom-1 m-b-22">
          <p class="desc_content">
            A Key Performance Indicator is a measurable value that demonstrates
            how effectively a company is achieving key business objectives.
            Organizations use KPIs at multiple levels to evaluate their success
            at reaching targets. High-level KPIs may focus on the overall
            performance of the business, while low-level KPIs may focus on
            processes in departments such as sales, marketing, HR, support and
            others.
          </p>
        </div>
      </div>
    </div>
    <div class="col lg-6">
      <div class="status_wrapper bg-white zp-20"></div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.border-bottom-1 {
  border-bottom: 1px solid #e4e9f2;
}
.desc_title {
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  padding-bottom: 18px;
}
.desc_content {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #8f9bb3;
  height: 240px;
}
</style>
