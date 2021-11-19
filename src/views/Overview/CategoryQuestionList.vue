<template>
  <div class="team_wrapper m-b-20">
    <div class="m-b-14">
      <h4 class="m-b-0 title-dark">Questions</h4>
    </div>
    <div class="question_list_wrapper">
      <div class="list_wrap m-b-20">
        <ul class="list-group">
          <li class="d-inline-flex">
            <div class="list_wrapper">
              <div class="list_counter_wrap">
                <div class="counter_status bg_success m-r-13">
                  <span class="q_no">1</span>
                  <span class="q_check_icon">
                    <img
                      src="K_Icons/checkmark-circle-fill.svg"
                      alt=""
                      class="check_icon"
                    />
                  </span>
                </div>
                <div class="">
                  <p class="m-b-0 ques_title">
                    The earliest moment that the critical event and
                    measurability
                  </p>
                  <p class="m-b-0 ques_ans">Ok</p>
                </div>
              </div>
              <div class="list_action m-l-auto">
                <button
                  @click="editQuetion"
                  class="
                    btn
                    text-primary
                    fs-16
                    text-capitalize
                    fw-500
                    btn-transaprent
                  "
                >
                  edit
                </button>
              </div>
            </div>
          </li>
          <li class="d-inline-flex">
            <div class="list_wrapper">
              <div class="list_counter_wrap">
                <div class="counter_status bg_success m-r-13">
                  <span class="q_no">2</span>
                  <span class="q_check_icon">
                    <img
                      src="K_Icons/checkmark-circle-fill.svg"
                      alt=""
                      class="check_icon"
                    />
                  </span>
                </div>
                <div class="">
                  <p class="m-b-0 ques_title">
                    The earliest moment that the critical event and
                    measurability
                  </p>
                  <p class="m-b-0 ques_ans">Ok</p>
                </div>
              </div>
              <div class="list_action m-l-auto">
                <button
                  @click="editQuetion"
                  class="
                    btn
                    text-primary
                    fs-16
                    text-capitalize
                    fw-500
                    btn-transaprent
                  "
                >
                  edit
                </button>
              </div>
            </div>
          </li>
          <li class="d-inline-flex">
            <div class="list_wrapper">
              <div class="list_counter_wrap">
                <div class="counter_status bg_success m-r-13">
                  <span class="q_no">3</span>
                  <span class="q_check_icon">
                    <!--  <img
                      src="K_Icons/checkmark-circle-fill.svg"
                      alt=""
                      class="check_icon"
                    /> -->
                  </span>
                </div>
                <div class="">
                  <p class="m-b-0 ques_title">
                    The earliest moment that the critical event and
                    measurability
                  </p>
                  <p class="m-b-0 ques_ans">Ok</p>
                </div>
              </div>
              <div class="list_action m-l-auto">
                <!-- <button
                  @click="editQuetion"
                  class="
                    btn
                    text-primary
                    fs-16
                    text-capitalize
                    fw-500
                    btn-transaprent
                  "
                >
                  edit
                </button> -->
              </div>
            </div>
          </li>
          <li class="d-inline-flex">
            <div class="list_wrapper">
              <div class="list_counter_wrap">
                <div class="counter_status bg-gray-0 m-r-13">
                  <span class="q_no">4</span>
                  <span class="q_check_icon">
                    <!--  <img
                      src="K_Icons/checkmark-circle-fill.svg"
                      alt=""
                      class="check_icon"
                    /> -->
                  </span>
                </div>
                <div class="">
                  <p class="m-b-0 ques_title">
                    The earliest moment that the critical event and
                    measurability
                  </p>
                  <!-- <p class="m-b-0 ques_ans">Ok</p> -->
                </div>
              </div>
              <div class="list_action m-l-auto">
                <!-- <button
                  @click="editQuetion"
                  class="
                    btn
                    text-primary
                    fs-16
                    text-capitalize
                    fw-500
                    btn-transaprent
                  "
                >
                  edit
                </button> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    editQuetion() {},
  },
};
</script>

<style lang="scss" scoped>
.ques_title {
  font-size: 12px;
  font-weight: 400;
  color: #8f9bb3;
  text-align: left;
  line-height: 14px;
}
.ques_ans {
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  color: #000000;
}
.q_no {
  color: #f9f9f9;
  font-size: 14px;
  font-weight: 500;
  margin-right: 16px;
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
  .list_counter {
  }
  .list_action {
  }
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
.team_wrapper {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 20px 33px;
}
</style>
