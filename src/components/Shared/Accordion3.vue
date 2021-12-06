<template>
  <div class="accordion custom_acc" :id="'accordionExample'">
    <div
      class="accordion-item acc_sub_item"
      v-for="(item, index) in items"
      :key="item.id"
    >
      <h2 class="accordion-header">
        <button
          class="accordion-button k_acc_sub_btn"
          :class="{ collapsed: index !== 0 }"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse-nested' + item.id"
        >
          <div class="d-inline-flex align-items-center">
            <div class="">
              <h2 class="m-b-0 sub_acc_title">{{ item.title }}</h2>
            </div>
          </div>
        </button>
      </h2>
      <div
        :id="'collapse-nested' + item.id"
        class="accordion-collapse collapse"
        :class="{ show: index === 0 }"
        :aria-labelledby="'sub-heading-nested' + item.id"
        :data-bs-parent="'#accordionExample' + acc_id"
      >
        <div class="accordion-body sub_acc_body">
          <!-- <slot name="accordionbody1"> </slot> -->
          <div class="list_wrap">
            <ul>
              <li v-for="point in item.points" :key="point.id">
                <div class="list_item">
                  <h4 class="m-b-0 list_title">
                    <span class="m-r-2">{{ point.id }}.</span>{{ point.title }}
                  </h4>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="help_conatiner">
  </div> -->
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      acc_id: 1,
    };
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
    // transform: rotate(-180deg);
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
.video_title {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #222b45;
}
.dep_title {
  color: #7900d8;
  font-size: 24px;
  line-height: 29px;
  font-weight: 600;
}
.video_wrap {
  background: #f7f9fc;
  border-radius: 4px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.help_conatiner {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 18px 14px;
  margin-bottom: 20px;
}
</style>
