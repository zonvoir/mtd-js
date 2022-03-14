<template>
  <tr>
    <td class="cell_width">
      <div class="perms_td_title">{{ categoryPermit.name }}</div>
    </td>
    <td align="center" class="border_right_primary">
      <div class="perms_td">
        <!-- :checkval="categoryPermit.permissions.ans" -->
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.ans"
          :key="
            'ans' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'ans',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td align="center">
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.edit_own"
          :key="
            'edit_own' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'edit_own',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td align="center" class="border_right_primary">
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.edit_dept"
          :key="
            'edit_dept' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'edit_dept',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.vr_own"
          :key="
            'vr_own' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'vr_own',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td class="border_right_primary">
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.vr_dept"
          :key="
            'vr_dept' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'vr_dept',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.gr_own_module"
          :key="
            'gr_own_module' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'gr_own_module',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.gr_own_dept"
          :key="
            'gr_own_dept' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'gr_own_dept',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.gr_inc_peer"
          :key="
            'gr_inc_peer' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'gr_inc_peer',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td class="border_right_primary">
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.gr_globle_peer"
          :key="
            'gr_globle_peer' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'gr_globle_peer',
              +categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.inv_dept"
          :key="
            'inv_dept' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'inv_dept',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.inv_global"
          :key="
            'inv_global' +
            categoryPermit.permissions.department_id +
            categoryPermit.permissions.category_id
          "
          @getCheckboxValue="
            getPermissionValue(
              $event,
              'inv_global',
              categoryPermit.permissions.department_id,
              categoryPermit.permissions.category_id
            )
          "
        />
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
    };
  },

  components: {
    BaseCheckBox,
  },

  methods: {
    getPermissionValue(ev, keyname, departmentId, categoryId) {
      console.log(ev.checkedData, keyname, departmentId, categoryId);

      this.$emit("getPermitData", {
        dept_id: departmentId,
        cat_id: categoryId,
        parms_change: keyname,
        isAllowed: ev.checkedData,
      });
    },
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
      padding: 14px;
      text-align: center;
      vertical-align: center;
      font-size: 14px;
      line-height: 24px;
      color: #000000;
    }
  }
}
</style>
