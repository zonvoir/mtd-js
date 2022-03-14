<template>
  <div class="help_conatiner">
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
    <div v-for="list in lists" :key="list.id" class="">
      <Accordion :activeIndex="0" class="prime_accordion">
        <AccordionTab
          v-for="item in list.tag_list"
          :key="item.id"
          :header="item.title"
          class="prime_accordion_tab"
        >
          <p class="desc_cont">
            Simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            150.Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the Lorem Dummy text Industry was created.It has been the
            industry's standard dummy text.
          </p>
        </AccordionTab>
      </Accordion>
    </div>
    <!-- list_wrap -->
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
export default {
  components: {
    Accordion,
    AccordionTab,
  },
  data() {
    return {
      tagId: 0,
      lists: [
        {
          id: 1,
          tag_name: "A",
          tag_list: [
            {
              id: 1,
              title: "Accounts Payable (AP)",
              description:
                "Accounts payable (AP) are bills to be paid as part of the normal course of business \n. This is a standard accounting term, one of the most commonliabilities, which normally appears in the balance sheet listing ofliabilities. Businesses receive goods or services from a vendor,receive an invoice, and until that invoice is paid the amount is recorded as part of “accounts payable.",
            },
            {
              id: 2,
              title: "Accumulated Depreciation",
              description:
                "Accounts payable (AP) are bills to be paid as part of the normal course of business \n. This is a standard accounting term, one of the most commonliabilities, which normally appears in the balance sheet listing ofliabilities. Businesses receive goods or services from a vendor,receive an invoice, and until that invoice is paid the amount is recorded as part of “accounts payable.",
            },
            {
              id: 3,
              title: "Adaptive Firm",
              description:
                "Accounts payable (AP) are bills to be paid as part of the normal course of business \n. This is a standard accounting term, one of the most commonliabilities, which normally appears in the balance sheet listing ofliabilities. Businesses receive goods or services from a vendor,receive an invoice, and until that invoice is paid the amount is recorded as part of “accounts payable.",
            },
            {
              id: 4,
              title: "Advertising Opportunity",
              description:
                "Accounts payable (AP) are bills to be paid as part of the normal course of business \n. This is a standard accounting term, one of the most commonliabilities, which normally appears in the balance sheet listing ofliabilities. Businesses receive goods or services from a vendor,receive an invoice, and until that invoice is paid the amount is recorded as part of “accounts payable.",
            },
            {
              id: 5,
              title: "Accounts Payable (AP)",
              description:
                "Accounts payable (AP) are bills to be paid as part of the normal course of business \n. This is a standard accounting term, one of the most commonliabilities, which normally appears in the balance sheet listing ofliabilities. Businesses receive goods or services from a vendor,receive an invoice, and until that invoice is paid the amount is recorded as part of “accounts payable.",
            },
            {
              id: 7,
              title: "Accumulated Depreciation",
              description:
                "Accounts payable (AP) are bills to be paid as part of the normal course of business \n. This is a standard accounting term, one of the most commonliabilities, which normally appears in the balance sheet listing ofliabilities. Businesses receive goods or services from a vendor,receive an invoice, and until that invoice is paid the amount is recorded as part of “accounts payable.",
            },
            {
              id: 8,
              title: "Adaptive Firm",
              description:
                "Accounts payable (AP) are bills to be paid as part of the normal course of business \n. This is a standard accounting term, one of the most commonliabilities, which normally appears in the balance sheet listing ofliabilities. Businesses receive goods or services from a vendor,receive an invoice, and until that invoice is paid the amount is recorded as part of “accounts payable.",
            },
            {
              id: 9,
              title: "Advertising Opportunity",
              description:
                "Accounts payable (AP) are bills to be paid as part of the normal course of business \n. This is a standard accounting term, one of the most commonliabilities, which normally appears in the balance sheet listing ofliabilities. Businesses receive goods or services from a vendor,receive an invoice, and until that invoice is paid the amount is recorded as part of “accounts payable.",
            },
            {
              id: 10,
              title: "Advertising Opportunity",
              description:
                "Accounts payable (AP) are bills to be paid as part of the normal course of business \n. This is a standard accounting term, one of the most commonliabilities, which normally appears in the balance sheet listing ofliabilities. Businesses receive goods or services from a vendor,receive an invoice, and until that invoice is paid the amount is recorded as part of “accounts payable.",
            },
          ],
        },
        {
          id: 2,
          tag_name: "B",
          tag_list: [],
        },
        {
          id: 3,
          tag_name: "C",
          tag_list: [],
        },
        {
          id: 4,
          tag_name: "D",
          tag_list: [],
        },
        {
          id: 5,
          tag_name: "E",
          tag_list: [],
        },
        {
          id: 6,
          tag_name: "F",
          tag_list: [],
        },
        {
          id: 7,
          tag_name: "G",
          tag_list: [],
        },
        {
          id: 9,
          tag_name: "I",
          tag_list: [],
        },
        {
          id: 10,
          tag_name: "J",
          tag_list: [],
        },
        {
          id: 11,
          tag_name: "K",
          tag_list: [],
        },
        {
          id: 12,
          tag_name: "L",
          tag_list: [],
        },
        {
          id: 13,
          tag_name: "M",
          tag_list: [],
        },
        {
          id: 14,
          tag_name: "N",
          tag_list: [],
        },
        {
          id: 15,
          tag_name: "O",
          tag_list: [],
        },
        {
          id: 16,
          tag_name: "P",
          tag_list: [],
        },
        {
          id: 17,
          tag_name: "Q",
          tag_list: [],
        },
        {
          id: 18,
          tag_name: "R",
          tag_list: [],
        },
        {
          id: 19,
          tag_name: "S",
          tag_list: [],
        },
        {
          id: 20,
          tag_name: "T",
          tag_list: [],
        },
        {
          id: 21,
          tag_name: "U",
          tag_list: [],
        },
        {
          id: 22,
          tag_name: "V",
          tag_list: [],
        },
        {
          id: 23,
          tag_name: "X",
          tag_list: [],
        },
        {
          id: 24,
          tag_name: "X",
          tag_list: [],
        },
        {
          id: 25,
          tag_name: "Y",
          tag_list: [],
        },
        {
          id: 26,
          tag_name: "Z",
          tag_list: [],
        },
      ],
    };
  },
  methods: {
    getActiveList(value) {
      console.log(value);
      this.currentIdx = value;
      console.log(this.currentIdx);
      return this.currentIdx;
    },
    openList(tag) {
      if (tag != this.tagId) {
        this.tagId = tag;
        // this.$emit("activatedTag", "Kuldeep As Data");
      }
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
.kActive {
  background-color: #7900d8;
  color: #ffffff;
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
