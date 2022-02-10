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
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td align="center">
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.edit_own"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td align="center" class="border_right_primary">
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.edit_dept"
          @getCheckboxValue="getPermissionValue"
        />
        <!-- <BaseCheckBox v-if="categoryPermit.permissions!=null"
          :checkval="categoryPermit.permissions.ans"
          :key="`${categoryPermit.company_id}${categoryPermit.category_id}`"
          :checkval="categoryPermit.permissions.ans"
          @getCheckboxValue="
            getPermissionValue(
              $event,
              categoryPermit.company_id,
              categoryPermit.category_id
            )
          "
        /> -->
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.vr_own"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td class="border_right_primary">
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.vr_dept"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.gr_own_module"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.gr_own_dept"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.gr_inc_peer"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td class="border_right_primary">
      <div class="perms_td">
        <!-- change here  -->
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.gr_dept"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.inv_dept"
          @getCheckboxValue="getPermissionValue"
        />
      </div>
    </td>
    <td>
      <div class="perms_td">
        <BaseCheckBox
          v-if="categoryPermit.permissions != null"
          :checkval="categoryPermit.permissions.inv_global"
          @getCheckboxValue="getPermissionValue"
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

  created() {
    console.log("permission page ", this.categoryPermit.permissions);
  },
  methods: {
    getPermissionValue(ev, companyId, categoryId) {
      console.log(companyId, categoryId);
      this.currentId = companyId + categoryId;
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
