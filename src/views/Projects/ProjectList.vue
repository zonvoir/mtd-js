<template>
  <div>
    <div class="filter_wrap d-flex align-items-center m-b-20">
      <div class="m-r-4">
        <h6 class="m-b-0 text-gray fs-14 fw-400">Filter by:</h6>
      </div>
      <div class="d-inline-flex">
        <button class="btn btn-pill-primary m-r-8">not started</button>
        <button class="btn btn-pill-primary m-r-8">in progress</button>
        <button class="btn btn-pill-primary">completed</button>
      </div>
    </div>
    <div class="alert-notification">
      <div class="img_wrap m-r-24">
        <img src="K_Icons/alert_yellow.svg" alt="" class="icon_name" />
      </div>

      <div class="">
        <h5 class="m-b-0 alert_title">Need to create a project</h5>
        <p class="m-b-0 alert_message">
          General questions about your project. Some questions about your
          business.
        </p>
      </div>
    </div>
    <!-- Project List open -->
    <div class="list_wrapper">
      <!-- empty Project list -->
      <div v-if="isData" class="icons_container m-t-36">
        <img src="K_Icons/add_files.svg" class="icon_file m-b-20" alt="" />
        <h5 class="m-b-0 alert_title fs-18">Oppps !</h5>
        <p class="m-b-35 alert_message">
          Add projects to track your progress and understand the impact of your
          projects on your company success.
        </p>
        <button
          @click="createProject"
          class="btn btn-primary btn-set text-uppercase m-bottom"
        >
          Add Project
        </button>
      </div>
      <!-- Empty Project List closed -->
      <div v-else class="table_container">
        <table class="table projects_tabel">
          <thead>
            <tr>
              <th class="project_th">
                <div class="label_name">
                  <h3 class="label_th"></h3>
                </div>
              </th>
              <th class="project_th">
                <div class="label_name">
                  <h3 class="m-b-0 label_th">Total Investment overview</h3>
                  <p class="m-b-0 label_th_sub">Internal/ External</p>
                </div>
              </th>
              <th class="project_th">
                <div class="label_name">
                  <h3 class="label_th">Departments</h3>
                </div>
              </th>
              <th class="project_th">
                <div class="label_name">
                  <h3 class="label_th">Categories</h3>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="project_tbody">
            <tr>
              <td class="project_td">
                <div class="project_info">
                  <h4 class="project_title">
                    Project Name Longer Name Name Name
                  </h4>
                  <p class="project_date">16 July - 22 July 2022</p>
                </div>
              </td>
              <td class="project_td">
                <div class="project_visualization">
                  <div class="label_name">
                    <h6 class="label_comprision">FTE vs Cost</h6>
                    <div class="chart-wrap">
                      <div class="Fte">
                        <StackedBar2 class="k-high-chart" />
                      </div>
                      <div class="costs">
                        <StackedBar2 class="k-high-chart" />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="project_td">
                <div class="project_visualization">
                  <ul class="icons_wrap list-inline">
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_teal">
                            <img
                              src="K_Icons/weighing_scale.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_yellow">
                            <img
                              src="K_Icons/speaker.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_info">
                            <img
                              src="K_Icons/settings.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
              <td class="project_td">
                <div class="project_visualization">
                  <ul class="category_continer list-inline">
                    <li class="category">
                      <span class="category_title"> processes </span>
                    </li>
                    <li class="category">
                      <span class="category_title"> strategy </span>
                    </li>
                    <li class="category">
                      <span class="category_title"> data </span>
                    </li>
                    <li class="category">
                      <span class="category_title"> data & anlytics</span>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td class="project_td">
                <div class="project_info">
                  <h4 class="project_title">
                    Project Name Longer Name Name Name
                  </h4>
                  <p class="project_date">16 July - 22 July 2022</p>
                </div>
              </td>
              <td class="project_td">
                <div class="project_visualization">
                  <div class="label_name">
                    <h6 class="label_comprision">FTE vs Cost</h6>
                    <div class="chart-wrap">
                      <div class="Fte">
                        <StackedBar2 class="k-high-chart" />
                      </div>
                      <div class="costs">
                        <StackedBar2 class="k-high-chart" />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="project_td">
                <div class="project_visualization">
                  <ul class="icons_wrap list-inline">
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_teal">
                            <img
                              src="K_Icons/weighing_scale.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_yellow">
                            <img
                              src="K_Icons/speaker.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div class="icon_container">
                          <div class="icon_bg bg_light_info">
                            <img
                              src="K_Icons/settings.svg"
                              class="icon_name"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
              <td class="project_td">
                <div class="project_visualization">
                  <ul class="category_continer list-inline">
                    <li class="category">
                      <span class="category_title"> processes </span>
                    </li>
                    <li class="category">
                      <span class="category_title"> strategy </span>
                    </li>
                    <li class="category">
                      <span class="category_title"> data </span>
                    </li>
                    <li class="category">
                      <span class="category_title"> data & anlytics</span>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- List closed -->
  </div>
</template>

<script>
import StackedBar2 from "../../components/Shared/StackedBar.vue";
export default {
  components: {
    StackedBar2,
  },
  data() {
    return {
      isData: true,
    };
  },
  methods: {
    createProject() {
      this.$router.push({ name: "create-project" });
    },
  },
};
</script>

<style lang="scss" scoped>
// heigh chart
.ch_title {
  margin: 0;
  text-align: center;
  position: relative;
  top: 45px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
}
.chart-wrap {
  display: flex;
  align-items: center;
  white-space: nowrap;
  .Fte {
    transform: scaleX(-1) !important;
  }
}
// comonine chart
.project_th {
  vertical-align: middle;
  padding: 8px 8px;
  border-right: 1px solid #edf1f7;
  &:last-child {
    border-right: 0;
  }
}
.chart-wrap {
  display: flex;
  align-items: center;
  white-space: nowrap;
  .Fte {
    transform: scaleX(-1) !important;
  }
}
.combine_chart_wrap {
  display: flex;
  .left_chart {
    display: flex;
    flex-direction: row-reverse;
  }
  .right_chart {
  }
}
//Combine chart
// tabel open
//
.category {
  text-decoration: none;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  .category_title {
    background-color: #edf1f7;
    border-radius: 12px;
    padding: 4px 8px;
    font-size: 13px;
    font-weight: 500;
    color: #222b45;
    line-height: 16px;
  }
}

.project_visualization {
  width: 220px;
}
.label_comprision {
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #222b45;
  line-height: 16px;
  margin-bottom: 0;
}
.label_th {
  font-size: 13px;
  font-weight: 500;
  color: #222b45;
  line-height: 16px;
  margin-bottom: 0;
}
.label_th_sub {
  font-size: 11px;
  font-weight: 500;
  color: #222b45;
  line-height: 16px;
}
.list-inline {
  margin-bottom: 0;
  padding-left: 0;
}
.list-inline li {
  display: inline-block;
  display: inline-block;
  margin-right: 10px;
  &:last-child {
    margin-right: 0 !important;
  }
}
.list-inline li a {
  cursor: pointer;
}
.icon_container {
  .icon_bg {
    width: 36px;
    height: 36px;
    border-radius: 36px;
    position: relative;
  }
}

.bg_light_teal {
  background-color: #e5f8fa;
}
.bg_light_yellow {
  background-color: #fff4e5;
}
.bg_light_info {
  background-color: #e8f4fd;
}
.icon_name {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
//
.project_tbody {
  border: 0 !important;
  tr {
    &:last-child {
      .project_td {
        border-bottom: 0;
      }
    }
  }
}
.table {
  padding: 0;
}
.project_td {
  vertical-align: top;
  padding: 15px 8px;
  border-bottom: 1px solid #edf1f7;
  border-right: 1px solid #edf1f7;
  &:last-child {
    border-right: 0;
  }
}

.project_info {
  width: 250px;
  .project_title {
    margin-bottom: 0;
    font-size: 18px;
    font-weight: 700;
    display: inline;
    color: #222b45;
  }
  .project_date {
    margin-bottom: 0;
    font-weight: 600;
    line-height: 16px;
    font-size: 11px;
    color: #8f9bb3;
  }
}

.projects_tabel {
  width: 100%;
  margin-bottom: 0;
}

.border-0 {
  border: 0;
}
// table Close
.icons_container {
  text-align: center;
}
.m-bottom {
  margin-bottom: 100px;
}
.fs-18 {
  font-size: 18px !important;
}
.empty_list_wrapper,
.list_wrapper {
  background-color: #ffffff;
  padding: 20px;
  padding: 20px 24px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  margin-bottom: 20px;
}
.alert-notification {
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 18px 20px;
  .img_wrap {
    position: relative;
    background-color: rgba(255, 170, 0, 0.12) !important;
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
  .icon_name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.alert_title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #222b45;
}
.alert_message {
  color: #8f9bb3;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
</style>
