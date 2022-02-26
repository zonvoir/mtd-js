<template>
  <div class="help_conatiner">
    <Accordion :activeIndex="0" class="helpC_accordion">
      <AccordionTab
        v-for="item in acc_items"
        :key="item.id"
        class="helpC_accordion_tab"
      >
        <template #header>
          <div class="d-inline-flex align-items-center">
            <div class="icon_wrap m-r-10">
              <img src="K_Icons/clipboard_32.svg" alt="" class="icon_c" />
            </div>
            <div class="">
              <h2 class="m-b-0 dep_title">{{ item.title }}</h2>
            </div>
          </div>
        </template>
        <div class="video_wrap">
          <h4 class="m-b-0 video_title">{{ item.video_title }}</h4>
          <button class="btn btn-primary btn-set">Watch</button>
        </div>
        <Accordion class="sub_helpC_accordion">
          <AccordionTab
            v-for="sub_item in item.subItems"
            :key="sub_item.id"
            :header="sub_item.title"
            class="sub_helpC_accordion_tab"
          >
            <div class="list_wrap">
              <ul>
                <li v-for="point in sub_item.points" :key="point.id">
                  <div class="list_item">
                    <h4 class="m-b-0 list_title">
                      <span class="m-r-2">{{ point.id }}.</span
                      >{{ point.title }}
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </AccordionTab>
        </Accordion>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script>
// import Accordion from "../../components/Shared/Accordion.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
export default {
  components: {
    Accordion,
    AccordionTab,
  },
  data() {
    return {
      acc_items: [
        {
          id: 1,
          title: "KPI",
          video_title: "What is KPI ?",
          subItems: [
            {
              id: 1,
              title: "How do you measure KPI?",
              points: [
                {
                  id: 1,
                  title: "Monthly new leads/prospects.",
                },
                {
                  id: 2,
                  title: "Monthly new leads/prospects.",
                },
                {
                  id: 3,
                  title: "Monthly new leads/prospects.",
                },
                {
                  id: 4,
                  title: "Monthly new leads/prospects.",
                },
                {
                  id: 5,
                  title: "Monthly new leads/prospects.",
                },
              ],
            },
            {
              id: 2,
              title: "What are good KPI examples?",
              points: [
                {
                  id: 1,
                  title: "Monthly new leads/prospects.",
                },
                {
                  id: 2,
                  title: "Monthly new leads/prospects.",
                },
                {
                  id: 3,
                  title: "Monthly new leads/prospects.",
                },
                {
                  id: 4,
                  title: "Monthly new leads/prospects.",
                },
                {
                  id: 5,
                  title: "Monthly new leads/prospects.",
                },
              ],
            },
          ],
        },

        {
          id: 2,
          title: "Adv KPI",
          video_title: "What is Advanced KPI ?",
          subItems: [
            {
              id: 1,
              title: "How do you measure KPI?",
              points: [
                {
                  id: 1,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 2,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 3,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 4,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 5,
                  title: "Yearly new leads/prospects.",
                },
              ],
            },
            {
              id: 2,
              title: "What are good KPI examples?",
              points: [
                {
                  id: 1,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 2,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 3,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 4,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 5,
                  title: "Yearly new leads/prospects.",
                },
              ],
            },
          ],
        },

        {
          id: 3,
          title: "Advanced KPI",
          video_title: "What is Advanced KPI ?",
          subItems: [
            {
              id: 1,
              title: "How do you measure KPI?",
              points: [
                {
                  id: 1,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 2,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 3,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 4,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 5,
                  title: "Yearly new leads/prospects.",
                },
              ],
            },
            {
              id: 2,
              title: "What are good KPI examples?",
              points: [
                {
                  id: 1,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 2,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 3,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 4,
                  title: "Yearly new leads/prospects.",
                },
                {
                  id: 5,
                  title: "Yearly new leads/prospects.",
                },
              ],
            },
          ],
        },
      ],
    };
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
