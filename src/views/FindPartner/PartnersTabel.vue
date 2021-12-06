<template>
  <table class="table partners_table">
    <thead class="partners_thead">
      <tr>
        <th class="part_th_left">
          <div class="search_wrap">
            <div class="psw_visibilty">
              <input
                type="text"
                class="form-control _search_filter k_inp_field"
                :placeholder="$t('find_partner.table.placeholder.search_here')"
              />

              <span class="search_btn">
                <button type="button" class="btn eye_btn btn-white">
                  <img :src="searchIcon" class="search_icon" />
                </button>
              </span>
            </div>
          </div>
        </th>
        <th class="part_th_right"></th>
      </tr>
      <tr>
        <th class="part_th_left">
          <div class="filter_wrap d-flex align-items-center">
            <div class="m-r-4">
              <h6 class="m-b-0 text-gray fs-14 fw-400">
                {{ $t("find_partner.table.filter_by") }}:
              </h6>
            </div>
            <div class="d-inline-flex">
              <button class="btn btn-pill-primary m-r-8">
                {{ $t("find_partner.table.buttons.company") }}
              </button>
              <button class="btn btn-pill-primary m-r-8">
                {{ $t("find_partner.table.buttons.key_partners") }}
              </button>
              <button class="btn btn-pill-primary">
                {{ $t("find_partner.table.buttons.experts") }}
              </button>
            </div>
          </div>
        </th>
        <th class="part_th_right">
          <table class="table role_cat_filter">
            <tr>
              <td class="sub_partner_td">
                <div class="k_select_single zp-0 m-r-8">
                  <Multiselect
                    :placeholder="$t('find_partner.table.placeholder.role')"
                    class="form-control k_inp_field"
                    rules="required"
                    :options="regions"
                  />
                </div>
              </td>
              <td class="sub_partner_td">
                <div class="k_select_single zp-0">
                  <Multiselect
                    :placeholder="$t('find_partner.table.placeholder.category')"
                    class="form-control k_inp_field"
                    rules="required"
                    mode="tags"
                    :closeOnSelect="false"
                    :searchable="true"
                    :createTag="true"
                    :options="specialization"
                  />
                </div>
              </td>
            </tr>
          </table>
        </th>
      </tr>
    </thead>
    <tbody class="partners_tbody">
      <tr class="partner_row">
        <td class="partner_td p_basic_info">
          <div class="partner_detail">
            <div class="p_profile m-r-10">
              <img :src="UserPic" alt="" class="profile_key_pic" />
            </div>
            <div class="p_info">
              <h4 class="m-b-0 p_name">
                Key Partner Name and name can be longer
              </h4>
              <p class="m-b-0 p_location">Germany, Berlin</p>
            </div>
          </div>
        </td>

        <td class="partner_td">
          <div class="partners_cat">
            <ul class="category_continer list-inline">
              <li class="category">
                <span class="category_title"> #processes </span>
              </li>
              <li class="category">
                <span class="category_title"> #strategy </span>
              </li>
              <li class="category">
                <span class="category_title"> #data </span>
              </li>
              <li class="category">
                <span class="category_title"> data & anlytics</span>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      <tr class="partner_row">
        <td colspan="2" class="bg-gray5">
          <div class="sub_table">
            <table class="table sub_partner_table">
              <tr>
                <td class="p_sub_partner_td">
                  <div class="partner_sub_detail">
                    <div class="p_profile m-r-10">
                      <img :src="UserPic" alt="" class="profile_sub_pic" />
                    </div>
                    <div class="p_info">
                      <h4 class="m-b-0 p_sub_name">
                        Key Partner Name and name can be longer
                      </h4>
                      <p class="m-b-0 p_location">Germany, Berlin</p>
                    </div>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="partners_cat">
                    <ul class="category_continer list-inline">
                      <li class="category">
                        <span class="category_title"> #processes </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #strategy </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #data </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> data & anlytics</span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="">
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >{{ $t("find_partner.table.buttons.request_a_call") }}
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >{{
                          $t("find_partner.table.buttons.contact_via_email")
                        }}
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="p_sub_partner_td">
                  <div class="partner_sub_detail">
                    <div class="p_profile m-r-10">
                      <img :src="UserPic" alt="" class="profile_sub_pic" />
                    </div>
                    <div class="p_info">
                      <h4 class="m-b-0 p_sub_name">
                        Key Partner Name and name can be longer
                      </h4>
                      <p class="m-b-0 p_location">Germany, Berlin</p>
                    </div>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="partners_cat">
                    <ul class="category_continer list-inline">
                      <li class="category">
                        <span class="category_title"> #processes </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #strategy </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #data </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> data & anlytics</span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="">
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Request a call
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Conatct via email
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr class="partner_row">
        <td class="partner_td p_basic_info">
          <div class="partner_detail">
            <div class="p_profile m-r-10">
              <img :src="UserPic" alt="" class="profile_key_pic" />
            </div>
            <div class="p_info">
              <h4 class="m-b-0 p_name">
                Key Partner Name and name can be longer
              </h4>
              <p class="m-b-0 p_location">Germany, Berlin</p>
            </div>
          </div>
        </td>

        <td class="partner_td">
          <div class="partners_cat">
            <ul class="category_continer list-inline">
              <li class="category">
                <span class="category_title"> #processes </span>
              </li>
              <li class="category">
                <span class="category_title"> #strategy </span>
              </li>
              <li class="category">
                <span class="category_title"> #data </span>
              </li>
              <li class="category">
                <span class="category_title"> data & anlytics</span>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      <tr class="partner_row">
        <td colspan="2" class="bg-gray5">
          <div class="sub_table">
            <table class="table sub_partner_table">
              <tr>
                <td class="p_sub_partner_td">
                  <div class="partner_sub_detail">
                    <div class="p_profile m-r-10">
                      <img :src="UserPic" alt="" class="profile_sub_pic" />
                    </div>
                    <div class="p_info">
                      <h4 class="m-b-0 p_sub_name">
                        Key Partner Name and name can be longer
                      </h4>
                      <p class="m-b-0 p_location">Germany, Berlin</p>
                    </div>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="partners_cat">
                    <ul class="category_continer list-inline">
                      <li class="category">
                        <span class="category_title"> #processes </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #strategy </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #data </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> data & anlytics</span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="">
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Request a call
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Conatct via email
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="p_sub_partner_td">
                  <div class="partner_sub_detail">
                    <div class="p_profile m-r-10">
                      <img :src="UserPic" alt="" class="profile_sub_pic" />
                    </div>
                    <div class="p_info">
                      <h4 class="m-b-0 p_sub_name">
                        Key Partner Name and name can be longer
                      </h4>
                      <p class="m-b-0 p_location">Germany, Berlin</p>
                    </div>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="partners_cat">
                    <ul class="category_continer list-inline">
                      <li class="category">
                        <span class="category_title"> #processes </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #strategy </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #data </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> data & anlytics</span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="">
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Request a call
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Conatct via email
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr class="partner_row">
        <td class="partner_td p_basic_info">
          <div class="partner_detail">
            <div class="p_profile m-r-10">
              <img :src="UserPic" alt="" class="profile_key_pic" />
            </div>
            <div class="p_info">
              <h4 class="m-b-0 p_name">
                Key Partner Name and name can be longer
              </h4>
              <p class="m-b-0 p_location">Germany, Berlin</p>
            </div>
          </div>
        </td>

        <td class="partner_td">
          <div class="partners_cat">
            <ul class="category_continer list-inline">
              <li class="category">
                <span class="category_title"> #processes </span>
              </li>
              <li class="category">
                <span class="category_title"> #strategy </span>
              </li>
              <li class="category">
                <span class="category_title"> #data </span>
              </li>
              <li class="category">
                <span class="category_title"> data & anlytics</span>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      <tr class="partner_row">
        <td colspan="2" class="bg-gray5">
          <div class="sub_table">
            <table class="table sub_partner_table">
              <tr>
                <td class="p_sub_partner_td">
                  <div class="partner_sub_detail">
                    <div class="p_profile m-r-10">
                      <img :src="UserPic" alt="" class="profile_sub_pic" />
                    </div>
                    <div class="p_info">
                      <h4 class="m-b-0 p_sub_name">
                        Key Partner Name and name can be longer
                      </h4>
                      <p class="m-b-0 p_location">Germany, Berlin</p>
                    </div>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="partners_cat">
                    <ul class="category_continer list-inline">
                      <li class="category">
                        <span class="category_title"> #processes </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #strategy </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #data </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> data & anlytics</span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="">
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Request a call
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Conatct via email
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="p_sub_partner_td">
                  <div class="partner_sub_detail">
                    <div class="p_profile m-r-10">
                      <img :src="UserPic" alt="" class="profile_sub_pic" />
                    </div>
                    <div class="p_info">
                      <h4 class="m-b-0 p_sub_name">
                        Key Partner Name and name can be longer
                      </h4>
                      <p class="m-b-0 p_location">Germany, Berlin</p>
                    </div>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="partners_cat">
                    <ul class="category_continer list-inline">
                      <li class="category">
                        <span class="category_title"> #processes </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #strategy </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> #data </span>
                      </li>
                      <li class="category">
                        <span class="category_title"> data & anlytics</span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="p_sub_partner_td">
                  <div class="">
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Request a call
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                    <div class="card_link">
                      <a class="page_link m-l-auto"
                        >Conatct via email
                        <img
                          src="K_Icons/next.svg"
                          alt=""
                          class="next_icon p-l-6"
                      /></a>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import searchIcon from "../../../public/icons/search.svg";
import UserPic from "../../assets/users/Avatar.png";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      searchIcon,
      UserPic,

      specialization: [
        { value: 0, label: "IT" },
        { value: 1, label: "HR" },
        { value: 2, label: "Data" },
        { value: 3, label: "Anaylist" },
      ],
      regions: [
        { value: 0, label: "Asia" },
        { value: 1, label: "Europe" },
        { value: 2, label: "Africa" },
        { value: 3, label: "Other" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
// @import"../node_modules/@syncfusion/ej2-base/styles/material.scss";
// @import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
// @import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
// @import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
.bg-gray5 {
  background-color: #f7f9fc;
  // border: 10px solid #ffffff;
  border: 0;
  padding: 0;
}
.sub_table {
  padding-left: 86px;
  background-color: #f7f9fc;
}
.sub_partner_table {
  //   border-top: 1px solid #8f9bb3;
  //   border-bottom: 0;
  tr {
    &:last-child {
      .p_sub_partner_td {
        border-bottom: 0;
      }
    }
  }
}
.p_sub_partner_td {
  border-bottom: 0;
  vertical-align: middle;
  padding: 0;
  background-color: #f7f9fc;
  border-bottom: 1px solid #8f9bb3;
  border-radius: 4px;
  position: relative;
  &:first-child {
    &::before {
      content: "";
      background-color: #f7f9fc;
      height: 5px;
      width: 47px;
      position: absolute;
      bottom: -1px;
      left: 0;
    }
  }
}
.page_link {
  margin-left: auto !important;
  color: #7900d8;
  font-size: 16px;
  line-height: 32px;
  font-weight: 500;
  text-decoration: none;
}
.card_link {
  cursor: pointer;
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
.list-inline li {
  cursor: pointer;
}
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
.partner_row {
  //   border-bottom: 1px solid #8f9bb3;
}
.partner_sub_detail {
  display: flex;
  align-items: center;
  padding: 0;
  .profile_sub_pic {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .p_location {
    color: #8f9bb3;
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
  }
  .p_sub_name {
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    color: #222b45;
  }
}
.partner_detail {
  display: flex;
  align-items: center;
  .p_name {
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    color: #222b45;
  }
  .p_sub_name {
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    color: #222b45;
  }
  .p_location {
    color: #8f9bb3;
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
  }
  .profile_key_pic {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .profile_sub_pic {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}
.sub_partner_td {
  border-bottom: 0;
  vertical-align: middle;
  width: 180px;
  padding: 0;
}
.partner_td {
  border-bottom: 0;
  vertical-align: middle;
  padding: 15px 0 15px 15px;
  background-color: #f7f9fc;
  border-bottom: 1px solid #8f9bb3;
  border-radius: 4px;
  position: relative;
  &.p_basic_info {
    width: 46%;
  }
  &:first-child {
    &::before {
      content: "";
      background-color: #f7f9fc;
      height: 5px;
      width: 86px;
      position: absolute;
      bottom: -1px;
      left: 0;
    }
  }
}
.part_th_right {
  padding: 0;
  width: 250px;
  border-bottom: 0;
  padding: 0;
  vertical-align: middle;
}
.part_th_left {
  width: 280px;
  padding: 0;
  border-bottom: 0;
  vertical-align: middle;
}
.table {
  padding: 0;
  margin: 0;
  // &:not(:first-child) {
  //   border-top: 0;
  // }
}
.table > :not(:first-child) {
  border-top: 0;
}

.partners_thead {
  border: 0 !important;
}
.partners_tbody {
  border: 0 !important;
  tr {
    &:nth-child(even) {
      .bg-gray5 {
        border-bottom: 10px solid #ffffff;
      }
    }
  }
}

._search_filter {
  height: 40px;
  width: 350px;
}
.search_btn {
  position: absolute;
  top: 0px;
  left: 299px;
}
.project_td {
  vertical-align: middle;
  padding: 15px 8px;
  border-bottom: 1px solid #edf1f7;
  border-right: 1px solid #edf1f7;
  &:last-child {
    border-right: 0;
  }
}
</style>
