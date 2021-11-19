<template>
  <div>
    <!-- Left sidebar Start Here -->
    <div class="sidebar-wrapper sidebar_gray sidebar_container">
      <!-- brand Logo Start Here -->
      <div class="sidebar_logo_wrapper">
        <router-link to="/" class="logo_wraper">
          <img alt="More Than Digital" :src="logo" class="brand_logo" />
        </router-link>
      </div>
      <!-- Brand Logo Ends Here -->
      <div class="link-list-wrapper">
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
                    </div>
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
                    </div>
                  </div>
                </div>
              </li>
              <li class="d-inline-flex">
                <div class="list_wrapper">
                  <div class="list_counter_wrap">
                    <div class="counter_status bg_success m-r-13">
                      <span class="q_no">3</span>
                      <span class="q_check_icon"> </span>
                    </div>
                    <div class="">
                      <p class="m-b-0 ques_title">
                        The earliest moment that the critical event and
                        measurability
                      </p>
                    </div>
                  </div>
                  <div class="list_action m-l-auto"></div>
                </div>
              </li>
              <li class="d-inline-flex">
                <div class="list_wrapper">
                  <div class="list_counter_wrap">
                    <div class="counter_status bg-gray-0 m-r-13">
                      <span class="q_no">4</span>
                      <span class="q_check_icon"> </span>
                    </div>
                    <div class="">
                      <p class="m-b-0 ques_title">
                        The earliest moment that the critical event and
                        measurability
                      </p>
                    </div>
                  </div>
                  <div class="list_action m-l-auto"></div>
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
// import logo from "../assets/images/mtd-logos-rgb_Main-Logo-Size-1-pos.png";
import logo from "../../../assets/images/mtd-logos-rgb_Main-Logo-Size-1-black.png";

export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style lang="scss" scoped>
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
  padding: 22px 10px 10px;
}
</style>
