<template>
  <div class="permission_table_wrap">
    <table class="permission_table">
      <thead class="perms_head">
        <tr>
          <th class="cell_width"></th>
          <th class="border_right_primary"></th>
          <th colspan="2" class="border_right_primary">
            <div class="perms_th_top">Edit</div>
          </th>
          <th colspan="2" class="border_right_primary">
            <div class="perms_th_top">View results</div>
          </th>
          <th colspan="4" class="border_right_primary">
            <div class="perms_th_top">Genrate reports</div>
          </th>
          <th colspan="2" class="">
            <div class="perms_th_top">Invite</div>
          </th>
        </tr>
        <tr>
          <th class="perms_th_sub border_bottom_primary cell_width"></th>
          <th class="border_right_primary border_bottom_primary">
            <div class="perms_th_sub">Answer</div>
          </th>
          <th class="border_bottom_primary">
            <div class="perms_th_sub">Own</div>
          </th>
          <th class="border_right_primary border_bottom_primary">
            <div class="perms_th_sub">Dpt</div>
          </th>
          <th class="border_bottom_primary">
            <div class="perms_th_sub">Own</div>
          </th>
          <th class="border_right_primary border_bottom_primary">
            <div class="perms_th_sub">Dpt</div>
          </th>
          <th class="border_bottom_primary">
            <div class="perms_th_sub">Мy own Modules</div>
          </th>
          <th class="border_bottom_primary">
            <div class="perms_th_sub">Мy own Dpt</div>
          </th>
          <th class="border_bottom_primary">
            <div class="perms_th_sub">incl Peer Reports</div>
          </th>
          <th class="border_right_primary border_bottom_primary">
            <div class="perms_th_sub">Global incl Peer</div>
          </th>
          <th class="border_bottom_primary">
            <div class="perms_th_sub">Dpt</div>
          </th>
          <th class="border_bottom_primary">
            <div class="perms_th_sub">Globle</div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td class="cell_width">
            <div class="perms_td_title">KPI</div>
          </td>
          <td align="center" class="border_right_primary">
            <div class="perms_td">
              <BaseCheckBox />
            </div>
          </td>
          <td align="center">
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td align="center" class="border_right_primary">
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td class="border_right_primary">
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td class="border_right_primary">
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
        </tr>
        <tr>
          <td class="cell_width">
            <div class="perms_td_title">Advanced KPI</div>
          </td>
          <td align="center" class="border_right_primary">
            <div class="perms_td">
              <BaseCheckBox />
            </div>
          </td>
          <td align="center">
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td align="center" class="border_right_primary">
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td class="border_right_primary">
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td class="border_right_primary">
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
          <td>
            <div class="perms_td"><BaseCheckBox /></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BaseCheckBox from "../../components/Shared/BaseCheckbox.vue";
export default {
  daat() {
    return {};
  },
  components: {
    BaseCheckBox,
  },
};
</script>

<style lang="scss" scoped>
.border_right_primary {
  border-right: 1px solid #7900d8 !important;
}
.border_bottom_primary {
  border-bottom: 1px solid #7900d8 !important;
}
.permission_table_wrap {
  .cell_width {
    width: 18% !important;
    padding-left: 8px;
  }
  table {
    width: 100%;
    // border: 1px solid #fff !important;
    thead {
      tr {
        th {
          border: 1px solid #edf1f7;
          text-align: center;
          vertical-align: center;
          padding: 10px;
          width: 7%;
          &:first-child() {
            width: 20%;
          }
          .perms_th_top {
            font-weight: 500;
            // font-size: 11px;
            font-size: 14px;
            line-height: 16px;
            text-align: center;
            color: #7900d8;
          }
          .perms_th_sub {
            font-weight: 500;
            // font-size: 11px;
            font-size: 14px;
            line-height: 19px;
            text-align: center;
            color: #8f9bb3;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          border: 1px solid #edf1f7;
          text-align: center;
          .perms_td_title {
            text-align: left;
            // padding-left: 8px;
            vertical-align: center;
          }
          .perms_td {
            font-weight: 500;
            // font-size: 12px;
            padding: 14px;
            text-align: center;
            vertical-align: center;
            font-size: 14px;
            line-height: 24px;
            color: #000000;
          }
          // &.cell_width {

          //   text-align: left;
          //   vertical-align: center;
          // }
        }
      }
    }
  }
}
</style>
