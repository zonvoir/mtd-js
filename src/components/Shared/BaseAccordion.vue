<template>
  <div>
    <div class="accordion custom_acc">
      <div class="">
        <div
          class="body_wrap"
          v-for="(department, index) in allDepartments"
          :key="index"
        >
          <div class="sub_acc_body">
            <div class="team_wrapper">
              <div class="">
                <div @click="toggleAccordion(index)" class="section_wrap">
                  <h4 class="m-b-0 title-dark">{{ department.label }}</h4>

                  <div class="m-l-auto">
                    <img
                      :src="
                        isAccordionArr[index]
                          ? 'K_Icons/chevron-up.svg'
                          : 'K_Icons/chevron-down.svg'
                      "
                      alt=""
                      class=""
                    />
                  </div>
                </div>
                <div
                  :class="{ collapse: isAccordionArr[index] }"
                  class="description_body_wrap"
                >
                  <!-- accordion body -->
                  <slot name="accordion_content_body"></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  props: {
    allDepartments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isAccordionArr: new Array(this.allDepartments.length).fill(false),
    };
  },
  // computed: {
  //   ...mapGetters({
  //     allDepartments: "staffsDepartment",
  //   }),
  // },
  // mounted() {
  //   this.isAccordionArr = new Array(this.allDepartments.length).fill(false);
  // },
  methods: {
    toggleAccordion(index) {
      this.isAccordionArr.forEach((ac, i) => {
        if (index === i) {
          this.isAccordionArr[i] = !this.isAccordionArr[i];
        }
      });
    },
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
.section_wrap {
  display: flex;
  align-items: center;
  // margin-bottom: 24px;
  cursor: pointer;
}
.body_wrap {
  margin-bottom: 10px;
}
.description_body_wrap {
  display: none;
  min-block-size: 0;
  transition: 500ms;
  transition: height 500ms;
  &.collapse {
    transition: 1s;
    transition: height 500ms;
    display: block !important;
  }
  // margin-top: 24px;
}
.acc_body {
  padding: 0;
}
.sub_acc_body {
  padding: 12px 18px;
  background: #f7f9fc;
  border-radius: 4px;
}
</style>
