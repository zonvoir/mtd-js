<template>
  <tr>
    <td class="cell_width">
      <div class="perms_td_title">{{ categoryPermit.name }}</div>
    </td>
    <td align="center" class="border_right_primary">
      <div class="perms_td">
        <BaseCheckBox
          :key="`${categoryPermit.company_id}${categoryPermit.category_id}`"
          :checkval="categoryPermit.permissions.ans"
          @click="currentPermissson(1)"
          @getCheckboxValue="
            getPermissionValue(
              $event,
              categoryPermit.company_id,
              categoryPermit.category_id
            )
          "
        />
      </div>
    </td>
    <td align="center">
      <div class="perms_td">
        <BaseCheckBox
          :key="2"
          :checkval="true"
          @click="currentPermissson(2)"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td align="center" class="border_right_primary">
      <div class="perms_td">
        <BaseCheckBox
          :key="3"
          :checkval="true"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox @getCheckboxValue="getPermissionValue" />
      </div>
    </td>
    <td class="border_right_primary">
      <div class="perms_td">
        <BaseCheckBox @getCheckboxValue="getPermissionValue" />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox @getCheckboxValue="getPermissionValue" />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox @getCheckboxValue="getPermissionValue" />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox @getCheckboxValue="getPermissionValue" />
      </div>
    </td>
    <td class="border_right_primary">
      <div class="perms_td">
        <BaseCheckBox @getCheckboxValue="getPermissionValue" />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox @getCheckboxValue="getPermissionValue" />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox @getCheckboxValue="getPermissionValue" />
      </div>
    </td>
  </tr>
</template>

<script>
import BaseCheckBox from "../../components/Shared/BaseCheckbox.vue";
export default {
  props: {
    categoryPermit: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isAllowed: undefined,
      currentId: undefined,

      // departmentsWisePermissions: [
      //   {
      //     id: 1,
      //     name: "company",
      //     categories: [
      //       {
      //         category_name: "KPI",
      //         cat_id: 1,
      //         permissons: {
      //           ans: true,
      //           edit_own: true,
      //           edit_dept: false,
      //           vr_own: true,
      //           vr_dept: false,
      //           gr_own_dept: true,
      //           gr_own_module: true,
      //           gr_dept: false,
      //           gr_inc_peer: false,
      //           inv_dept: true,
      //           inv_globle: false,
      //         },
      //       },
      //     ],
      //   },
      // ],
      // categories: [
      //   {
      //     category_name: "KPI",
      //     cat_id: 1,
      //     permissons: {
      //       ans: true,
      //       edit_own: true,
      //       edit_dept: false,
      //       vr_own: true,
      //       vr_dept: false,
      //       gr_own_dept: true,
      //       gr_own_module: true,
      //       gr_dept: false,
      //       gr_inc_peer: false,
      //       inv_dept: true,
      //       inv_globle: false,
      //     },
      //   },
      //   {
      //     category_name: "Advance KPI",
      //     cat_id: 2,
      //     permissons: {
      //       ans: true,
      //       edit_own: true,
      //       edit_dept: false,
      //       vr_own: true,
      //       vr_dept: false,
      //       gr_own_dept: true,
      //       gr_own_module: true,
      //       gr_dept: false,
      //       gr_inc_peer: false,
      //       inv_dept: true,
      //       inv_globle: false,
      //     },
      //   },
      // ],
    };
  },

  components: {
    BaseCheckBox,
  },

  methods: {
    getPermissionValue(ev, companyId, categoryId) {
      console.log(companyId, categoryId);
      this.isAllowed = ev.checkedData;
      this.$emit("getPermitData", {
        id: this.currentId,
        isAllowed: this.isAllowed,
      });
    },
    currentPermissson(id) {
      this.currentId = id;
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  td {
    border: 1px solid #edf1f7;
    text-align: center;
    .perms_td_title {
      text-align: left;
      padding-left: 8px;
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
</style>
