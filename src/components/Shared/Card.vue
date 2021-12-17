<template>
  <div class="dept_card card_specing">
    <div class="card_header">
      <div class="dept_logo position-relative m-r-11">
        <div class="logo_wrap">
          <img :src="image ? image : 'K_Icons/clipbaord_logo.svg'" alt="" />
        </div>
      </div>

      <div class="dept_name">
        <h4 class="m-b-0 dept_name">{{ title }}</h4>
      </div>
    </div>
    <div class="card_body">
      <p class="dept_desc">
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
      <div @click="sectionDetail(id)" class="card_link">
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
    return {};
  },
  methods: {
    sectionDetail(componentId) {
      console.log(
        "current dept id",
        this.page_name,
        this.page_parmas,
        componentId
      );
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
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 10px 10px 10px 10px;
  // width: auto;
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
    .dept_name {
      font-size: 18px;
      font-weight: 600;
      color: #222b45;
      vertical-align: middle;
      line-height: normal;
      display: -webkit-inline-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .card_body {
    padding: 11px 4px 10px 10px;
    height: 100px;
    line-height: 100px;
    .dept_desc {
      font-size: 14px;
      font-weight: 400;
      color: #8f9bb3;
      line-height: 20px;
      vertical-align: middle;
      line-height: normal;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .card_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
