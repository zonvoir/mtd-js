<template>
  <div class="accordion custom_acc" id="accordionExample">
    <div
      class="accordion-item acc_item"
      v-for="(item, index) in items"
      :key="item.id"
    >
      <h2 class="accordion-header" :id="'heading' + item.id">
        <button
          class="accordion-button k_acc_btn"
          :class="{ collapsed: index !== 0 }"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + item.id"
          aria-expanded="true"
          :aria-controls="'collapse' + item.id"
        >
          <div class="d-inline-flex align-items-center">
            <div class="icon_wrap m-r-10">
              <img src="K_Icons/clipboard_32.svg" alt="" class="icon_c" />
            </div>
            <div class="">
              <h2 class="m-b-0 dep_title">{{ item.title }}</h2>
            </div>
          </div>
        </button>
      </h2>
      <div
        :id="'collapse' + item.id"
        class="accordion-collapse collapse"
        :class="{ show: index === 0 }"
        :aria-labelledby="'heading' + item.id"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body acc_body">
          <div class="video_wrap">
            <h4 class="m-b-0 video_title">{{ item.video_title }}</h4>
            <button class="btn btn-primary btn-set">Watch</button>
          </div>
          <div>
            <Accordion3 :items="item.subItems"> </Accordion3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="help_conatiner">
  </div> -->
</template>

<script>
import Accordion3 from "../Shared/Accordion3.vue";
export default {
  props: ["items"],
  components: {
    Accordion3,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
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
