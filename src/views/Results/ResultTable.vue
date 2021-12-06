<template>
  <div class="section_wraper_top">
    <table class="table score_table">
      <thead class="sr_head">
        <tr v-if="data">
          <th colspan="3">
            <div
              class="th_heading justify-content-end d-flex align-items-center"
            >
              <h4 class="m-b-0 main_heading m-r-4">
                {{ $t("results.Financials") }}
              </h4>
              <span class="">
                <img src="K_Icons/info.svg" alt="" class="" />
              </span>
            </div>
          </th>
          <th colspan="8">
            <div
              class="
                th_heading
                justify-content-center
                d-flex
                align-items-center
              "
            >
              <h4 class="m-b-0 main_heading m-r-4">
                {{ $t("results.Maturity") }}
              </h4>
              <span class="">
                <img src="K_Icons/info.svg" alt="" class="" />
              </span>
            </div>
          </th>
        </tr>
        <tr>
          <th class="department_th">
            <div class="th_title"></div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">KPI</h6>
            </div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">
                Advanced <br />
                KPI
              </h6>
            </div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">
                Processes&<br />
                Operations
              </h6>
            </div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">
                Data& <br />
                Analytics
              </h6>
            </div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">
                Data& <br />
                Analytics
              </h6>
            </div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">
                IT& <br />
                Technology
              </h6>
            </div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">
                People& <br />
                Culture
              </h6>
            </div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">Stratagy</h6>
            </div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">
                Customers& <br />
                Engagements
              </h6>
            </div>
          </th>
          <th class="category_th">
            <div class="th_title">
              <h6 class="category_title">Sustainability</h6>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td_title">
            <div class="department_wrap">
              <h6 class="category_title">Company Overall</h6>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-gray">
              <img src="K_Icons/plus.svg" class="icon_s" alt="" />
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-danger-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-warn-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-gray">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-success-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-gray">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-success-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-warn-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-gray">
              <img src="K_Icons/plus.svg" class="icon_s" alt="" />
              <!-- <p class="m-b-0 score_value">3.5</p> -->
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-warn-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
        </tr>
        <tr>
          <td class="td_title">
            <div class="department_wrap">
              <h6 class="category_title">Company Overall</h6>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-gray">
              <img src="K_Icons/plus.svg" class="icon_s" alt="" />
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-danger-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-warn-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-gray">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-success-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-gray">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-success-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-warn-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-gray">
              <img src="K_Icons/plus.svg" class="icon_s" alt="" />
              <!-- <p class="m-b-0 score_value">3.5</p> -->
            </div>
          </td>
          <td class="td_score_status">
            <div class="score_wrapper bg-warn-light">
              <!-- <img src="K_Icons/lock.svg" class="icon_s" alt="" /> -->
              <p class="m-b-0 score_value">3.5</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// table start
th.department_th {
  border: 0 !important;
}
.score_table {
  thead {
    tr {
      th {
        text-align: center;
        vertical-align: top;
        // width: 8%;
        padding: 5px;
        &:nth-child(3) {
          padding-right: 8px;
          border-right: 1px solid #8f9bb3;
        }
        &:nth-child(4) {
          padding-left: 8px;
        }
      }
      &:nth-child(1) {
        th {
          &:first-child {
            padding-right: 8px;
            border-right: 1px solid #8f9bb3;
            padding-left: 8px;
          }
        }
      }
    }
  }
  tbody {
    tr {
      td {
        &:nth-child(3) {
          padding-right: 10px;
          border-right: 1px solid #8f9bb3;
        }
        &:nth-child(4) {
          padding-left: 10px;
        }
      }
    }
  }
}
.td_title {
  text-align: left;
  vertical-align: middle;
  border: 0;
}
.department_wrap {
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  padding-right: 12px;
}
.score_wrapper {
  max-width: 100%;
  width: 80px;
  height: 48px;
  margin: 5px auto;

  position: relative;
}
// status classes
.bg-gray {
  background-color: #f7f9fc;
}
.bg-success-light {
  background-color: #d9faef;
  color: #0aca8a;
}
.score_value {
  text-align: center;
  font-weight: 700;
  line-height: 24px;
  font-size: 18px;
  color: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.bg-warn-light {
  background-color: #fff1c2;
  color: #ffaa00;
}
.bg-danger-light {
  background-color: #ffd6d9;
  color: #ff4070;
}
//
.icon_s {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.category_title {
  font-size: 12px;
  font-weight: 500;
  color: #222b45;
  line-height: 16px;
  margin-bottom: 0;
}
.main_heading {
  color: #222b45;
  line-height: 32px;
  font-size: 24px;
  font-weight: 700;
}
.table {
  padding: 0;
  margin: 0;
  // &:not(:first-child) {
  //   border-top: 0;
  // }
}
.table > :not(caption) > * > * {
  padding: 0;
  border: 0;
}
.table > :not(:first-child) {
  border-top: 0;
}
.section_wraper_top {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 16px 10px;
}
// table_end
</style>
