<template>
  <div class="">
    <div class="progress_bar_container">
      <div class="k_icon_wrap m-r-10">
        <img
          :src="
            questionnaire.image
              ? questionnaire.image
              : 'K_Icons/clipboard_60_logo.svg'
          "
          class="catLogo"
          alt=""
        />
      </div>
      <div class="">
        <h4 class="view_title_with_catgry">
          {{ questionnaire.name }}
        </h4>
      </div>
      <div class="m-l-auto">
        <button @click="closeQuestionnaire" class="btn btn-transaprent zp-0">
          <img src="K_Icons/cancel.svg" alt="" class="cancel_icon" />
        </button>
      </div>
    </div>

    <div class="progess_wrappwer">
      <p class="m-b-0 progres_value">
        <span>{{ valuenow }}%</span> to complete
      </p>
    </div>
    <div class="progress k_progress_wrap">
      <div
        class="progress-bar k_progress_bar"
        role="progressbar"
        :style="{ width: valuenow + '%' }"
        :aria-valuenow="valuenow"
        :aria-valuemin="valuemin"
        :aria-valuemax="valuemax"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    valuenow: {
      required: true,
    },
    valuemin: {
      required: true,
    },
    valuemax: {
      required: true,
    },
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      questionnaireDetails: "questionnaireDetails",
      questionnaire: "questionnaireCategoryDetails",
    }),
  },

  methods: {
    closeQuestionnaire() {
      this.$store.dispatch("GET_QUIZ_MODAL_STATUS", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.progress_bar_container {
  display: flex;
  align-content: center;
  margin-bottom: 10px;
}
.view_title_with_catgry {
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #7900d8;
  text-transform: capitalize;
  .catgry_name {
    color: #222b45;
  }
}
.catLogo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}

//////////////////
.progess_wrappwer {
  display: flex;
  align-items: center;
}
.progres_value {
  font-size: 15px;
  font-weight: 600;
  color: #8f9bb3;
  line-height: 16px;
  margin-bottom: 4px;
}
.k_progress_bar {
  height: 6px;
  background-color: #7900d8;
  border-radius: 4px;
}
.k_progress_wrap {
  height: 6px;
  background-color: #edf1f7;
  border-radius: 4px;
}
</style>
