<template>
  <div class="help_conatiner">
    <div v-if="!loadingStatus" class="">
      <div class="list-wrapper">
        <div class="btn_wrap">
          <button
            v-for="(letter, idx) in lists"
            :key="letter.id"
            class="k-letter-btn btn"
            @click="openList(idx)"
            :class="{ kActive: tagId == idx }"
          >
            {{ letter.tag_name }}
          </button>
        </div>
      </div>
      <!--  -->
      <div class="letter_wrap">
        <h2 class="m-b-0 letter_title">{{ lists[tagId].tag_name }}</h2>
      </div>
      <!-- list_wrap -->
      <!-- <div v-for="list in lists" :key="list.id" class=""> -->
      <Accordion :activeIndex="0" class="prime_accordion">
        <AccordionTab
          v-for="item in lists[tagId].tag_list"
          :key="item.id"
          :header="item.title"
          class="prime_accordion_tab"
        >
          <p class="desc_cont">{{ item.description }}</p>
        </AccordionTab>
      </Accordion>
      <!-- </div> -->
      <!-- list_wrap -->
    </div>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import HelpCenterService from "../../Services/HelpCenterService";
import { mapGetters } from "vuex";
import errorhandler from "../../utils/Error";
export default {
  components: {
    Accordion,
    AccordionTab,
  },
  data() {
    return {
      tagId: 0,
      lists: undefined,
      // tag_list:undefined
    };
  },

  computed: {
    ...mapGetters({
      loadingStatus: "loadingStatus",
    }),
  },

  created() {
    this.getAllGlossaryList();
  },

  methods: {
    getAllGlossaryList() {
      this.$store.dispatch("SET_LOADING_STATUS", true);
      HelpCenterService.getGlossaries().then((res) => {
        this.$store.dispatch("SET_LOADING_STATUS", false);

        if (res.data.status) {
          console.log("data is valid", res.data.data);
          this.lists = res.data.data;
        } else {
          errorhandler(res);
        }
      });
    },

    getActiveList(value) {
      console.log(value);
      this.currentIdx = value;
      console.log(this.currentIdx);
      return this.currentIdx;
    },

    openList(idx) {
      this.tagId = idx;
    },
    checkArray(arr) {
      return Array.isArray(arr);
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
.letter_title {
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #7900d8;
  margin-bottom: 0;
  padding-bottom: 10px;
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
.kActive {
  background-color: #7900d8;
  color: #ffffff;
  border: 1px solid #7900d8;
  box-shadow: 1px 1px 8px rgba(147, 50, 221, 0.404);
}
.help_conatiner {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 18px 14px;
  margin-bottom: 20px;
}
.list_acc {
  margin: 0;
  list-style: none;
  padding: 0;
}
.akc_list {
  margin-right: 4px;
}
.lst_content {
  list-style: none;
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  //   color: $heading;
}
</style>
