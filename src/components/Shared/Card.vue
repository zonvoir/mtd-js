<template>
  <div
    class="dept_card card_specing"
    :class="financeArr.includes(slug) ? 'finance_card' : ' maturity_card'"
  >
    <div class="card_header">
      <div class="dept_logo position-relative m-r-11">
        <div class="logo_wrap">
          <img :src="image ? image : 'K_Icons/clipbaord_logo.svg'" alt="" />
        </div>
      </div>

      <div class="dept_name">
        <h4
          class="m-b-0 dept_name"
          :class="
            financeArr.includes(slug)
              ? 'finance_dept_name'
              : ' maturity_dept_name'
          "
        >
          {{ title }}
        </h4>
      </div>
    </div>

    <div class="card_body">
      <p
        class="dept_desc"
        :class="financeArr.includes(slug) ? 'finance_desc' : ' maturity_desc'"
      >
        <span v-html="description"> </span>
      </p>
    </div>

    <div class="card_footer">
      <div class="">
        <span
          v-if="status"
          :class="{
            bg_gray: status == $t('status.not_started'),
            bg_warn: status == $t('status.in_progress'),
            bg_success: status == $t('status.completed'),
          }"
          class="dept_status bg_gray"
          >{{ status }}</span
        >
      </div>
      <div @click="sectionDetail()" class="card_link">
        <a class="page_link m-l-auto"
          >{{ $t("overview_index.buttons.view") }}
          <img src="K_Icons/next.svg" alt="" class="next_icon p-l-6"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    page_name: {
      type: String,
      required: true,
    },
    page_parmas: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      financeArr: ["advanced-kpi", "kpi"],
    };
  },
  components: {},

  methods: {
    sectionDetail() {
      this.$router.push({
        name: this.page_name,
        params: this.page_parmas,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page_link {
  margin-left: auto !important;
}
.card_link {
  cursor: pointer;
}
.dept_status {
  border-radius: 12px;
  padding: 6px 13px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 700;
}
.card_specing {
  margin: 0 10px !important;
}
.page_link {
  font-size: 16px;
  line-height: 32px;
  font-weight: 500;
  color: #7900d8;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}

.dept_card {
  // background-color: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 10px 10px 10px 10px;
  &.maturity_card {
    background-color: #ffffff;
  }
  &.finance_card {
    background-color: #ededed;
  }
  .card_header {
    display: inline-flex;
    align-items: center;
    border-bottom: 1px solid #edf1f7;
    padding-bottom: 7px;
    width: 100%;
    height: 52px !important;
    .dept_name_wrap {
      height: 42px;
      line-height: 42px;
    }
    .logo_wrap {
      img {
        width: 36px;
        height: 36px;
        line-height: 36px;
        border-radius: 50%;
      }
    }
    .dept_name {
      font-size: 18px;
      font-weight: 600;
      // color: #222b45;
      vertical-align: middle;
      line-height: normal;
      display: -webkit-inline-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      &.maturity_dept_name {
        color: #222b45;
      }
      &.finance_dept_name {
        color: #7900d8;
      }
    }
  }
  .card_body {
    padding: 11px 4px 10px 10px;
    height: 100px;
    line-height: 100px;
    .dept_desc {
      font-size: 14px;
      font-weight: 400;
      // color: #8f9bb3;
      line-height: 20px;
      vertical-align: middle;
      line-height: normal;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      &.finance_desc {
        color: #000000;
      }
      &.maturity_desc {
        color: #8f9bb3;
      }
    }
  }
  .card_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
