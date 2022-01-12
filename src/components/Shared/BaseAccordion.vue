<template>
  <div>
    <div class="accordion custom_acc">
      <div class="">
        <div
          class="body_wrap"
          v-for="(staffrole, index) in staffRoles"
          :key="index"
        >
          <div class="sub_acc_body">
            <div class="team_wrapper">
              <div class="">
                <div @click="toggleAccordion(index)" class="section_wrap">
                  <h4 class="m-b-0 title-dark">{{ staffrole.name }}</h4>

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
                  <div class="m-b-12 m-t-20">
                    <p class="staff_desc">
                      <!-- {{ item.description }} -->
                      Simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard
                      dummy text ever since the 150.Lorem Ipsum is simply dummy
                      text of the printing and typesetting industry. Lorem Ipsum
                      has been the industry's standard dummy text ever since the
                      Lorem Dummy text Industry was created.It has been the
                      industry's standard dummy text.
                    </p>
                  </div>
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
export default {
  data() {
    return {
      isAccordionArr: undefined,
    };
  },
  mounted() {
    this.isAccordionArr = new Array(4).fill(false);
  },
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

<style lang="scss" scoped></style>
