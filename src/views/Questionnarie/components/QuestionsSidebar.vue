<template>
  <div>
    <!-- Left sidebar Start Here -->
    <div class="sidebar-wrapper sidebar_gray sidebar_container">
      <div class="link-list-wrapper">
        <div class="question_list_wrapper">
          <div class="list_wrap m-b-20">
            <ul class="list-group">
              <li
                v-for="(question, idx) in questions"
                :key="question.id"
                class="d-inline-flex pointer"
              >
                <div @click="getQuestionById(question.id)" class="list_wrapper">
                  <div class="list_counter_wrap">
                    <div
                      :class="question.is_answered ? 'bg_success' : 'bg-gray-0'"
                      class="counter_status m-r-13"
                    >
                      <span class="q_no">{{ idx + 1 }}</span>
                      <span class="q_check_icon">
                        <img
                          v-if="question.is_answered"
                          src="K_Icons/checkmark-circle-fill.svg"
                          alt=""
                          class="check_icon"
                        />
                      </span>
                    </div>
                    <div class="">
                      <p class="m-b-0 ques_title">
                        {{ question.name }}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- Left sidebar Ends Here -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "../../../assets/images/mtd-logos-rgb_Main-Logo-Size-1-black.png";

export default {
  data() {
    return {
      logo,
    };
  },

  computed: {
    // vuex variable to get QuestionList
    ...mapGetters({
      questions: "getQuestionList",
    }),
  },

  methods: {
    // select the random question id and send to Question component via vuex
    getQuestionById(id) {
      this.$store.dispatch("GET_RANDOM_QUESTION_INDEX", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.ques_title {
  font-size: 13px;
  font-weight: 400;
  color: #8f9bb3;
  line-height: 14px;
  text-align: left;
}
.q_no {
  color: #f9f9f9;
  font-size: 14px;
  font-weight: 500;
  margin-right: 13px;
}
.q_check_icon {
  width: 16px;
  height: 16px;
  position: relative;
}
.check_icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.counter_status {
  border-radius: 2px;
  padding: 4px;
  display: flex;
  width: 52px;
  height: 28px;
  align-items: center;
}

li {
  margin-bottom: 27px;
  &:last-child {
    margin-bottom: 0 !important;
  }
}
.list_wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}
.list_counter_wrap {
  display: flex;
}
.list_group_item {
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 8px 6px 14px;
}
.link-list-wrapper {
  padding: 10px 10px 10px 10px;
  height: 65vh;
  overflow: auto;
  /* width */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f7f9fc;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e1e2e4;
    border-radius: 4px;
    width: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #cbcbcc;
    width: 10px;
    cursor: pointer;
    border-radius: 4px;
  }
}
</style>
