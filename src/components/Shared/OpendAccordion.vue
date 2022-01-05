<template>
  <div class="accordion custom_acc" id="accordionExample1">
    <div
      class="accordion-item acc_sub_item"
      v-for="(item, index) in items"
      :key="item.id"
    >
      <h2 class="accordion-header" :id="'sub-heading' + item.id">
        <button
          class="accordion-button k_acc_sub_btn"
          :class="{ collapsed: index !== 0 }"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapsesub' + item.id"
          :aria-controls="'collapsesub' + item.id"
        >
          <div class="d-inline-flex align-items-center">
            <div class="">
              <h2 class="m-b-0 sub_acc_title">{{ item.title }}</h2>
            </div>
          </div>
        </button>
      </h2>
      <!-- :class="{ show: index === 0 }" -->
      <div
        :id="'collapsesub' + item.id"
        class="accordion-collapse collapse"
        :class="{ show: index === 0 }"
        :aria-labelledby="'sub-heading' + item.id"
        data-bs-parent="#accordionExample1"
      >
        <div class="accordion-body sub_acc_body">
          <slot name="accordionbody1"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.desc_cont {
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #222b45;
}
.accordion-button:not(.collapsed) {
  &::after {
    background-image: url(../../../public/K_Icons/arrow_d.svg);
  }
}
.acc_body {
  padding: 0;
}
.sub_acc_body {
  padding: 12px 18px;
}
.list_wrap {
  ul {
    padding-left: 0;
    margin-bottom: 0;
    li {
      list-style: none;
      display: block;
      padding-bottom: 2px;
      .list_title {
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        color: #222b45;
        margin-bottom: 0;
      }
    }
  }
}
.sub_acc_title {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #222b45;
}
</style>
