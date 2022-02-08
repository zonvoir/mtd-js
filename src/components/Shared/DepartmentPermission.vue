<template>
  <div>
    <div class="team_wrapper m-b-20">
      <div class="m-b-24">
        <h4 class="m-b-0 title-dark">Description Permission</h4>
      </div>
      <div class="m-b-12">
        <p class="staff_desc">
          Simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          150.Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the Lorem Dummy text Industry was created.It has been the
          industry's standard dummy text.
        </p>
      </div>
      <div class="d-flex">
        <div class="dept_selct_wrap k_form_group k_lang k_select_single m-r-20">
          <Multiselect
            :placeholder="$t('personal_account.form.placeholder.department')"
            mode="tags"
            :closeOnSelect="false"
            :searchable="true"
            :createTag="true"
            v-model="dept_list"
            class="form-control k_inp_field"
            rules="required"
            :options="modifyDept(allDepartments)"
          />
          <!-- @blur="v$.myDepartmensList.$touch"
            :class="{
              'is-invalid': v$.myDepartmensList.$error,
            }"
          <div
            v-if="v$.myDepartmensList.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.myDepartmensList.required.$invalid"
              class="text-left fs-14"
            >
              Department is Required
            </span>
          </div> -->
        </div>
        <div class="k_form_group dept_selct_wrap k_lang k_select_single">
          <Multiselect
            :placeholder="
              $t(
                'company_profile.members_tab.members_table.placeholder.category'
              )
            "
            mode="tags"
            :closeOnSelect="false"
            :searchable="true"
            :createTag="true"
            v-model="catgry_list"
            class="form-control k_inp_field"
            rules="required"
            :options="modifyCategories(categoriesArr)"
          />
          <!-- @blur="v$.categoriesList.$touch"
            :class="{
              'is-invalid': v$.categoriesList.$error,
            }"
          <div
            v-if="v$.categoriesList.$error"
            class="invalid-feedback text-left"
          >
            <span
              v-if="v$.categoriesList.required.$invalid"
              class="text-left fs-14"
            >
              Department is Required
            </span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue3-date-time-picker/dist/main.css";
import Multiselect from "@vueform/multiselect";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
// import CommonService from "../../Services/CommonService";
import { departmentModify } from "../../utils/DepartmentModify";
import { getCategoryModified } from "../../utils/commonHelperFuntions";
export default {
  props: {
    // departments: {
    //   type: Array,
    //   required: true,
    // },
    staffRoles: {
      type: Array,
      required: true,
    },
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      dept_list: [],
      catgry_list: [],
      categoriesList: [],
    };
  },

  computed: {
    ...mapGetters({
      staffInfo: "staffData",
      categoriesArr: "allCategories",
      allDepartments: "alocatedDepartments",
    }),
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      catgry_list: { required },
      dept_list: { required },
    };
  },
  // mounted() {
  //   this.isAccordionArr = new Array(4).fill(false);
  // },
  created() {
    // this.getCategoryList();
  },
  methods: {
    // get All dept lists
    modifyDept(data) {
      return departmentModify(data);
    },
    modifyCategories(data) {
      return getCategoryModified(data);
    },
    // get All cateArr lists
    // get All Category lists
    // getCategoryList() {
    //   CommonService.allCategories().then((resp) => {
    //     if (resp.data.status) {
    //       for (var i = 0; i < resp.data.data.length; i++) {
    //         let categy = {
    //           value: resp.data.data[i].id,
    //           label: resp.data.data[i].name,
    //         };
    //         this.categoriesList.push(categy);
    //       }
    //       console.log("roles", this.categoriesList);
    //     } else {
    //       this.ownRoleLists = [
    //         { value: 0, label: "No record found", disabled: true },
    //       ];
    //     }
    //   });
    // },
    // toggleAccordion(index) {
    //   this.isAccordionArr.forEach((ac, i) => {
    //     if (index === i) {
    //       this.isAccordionArr[i] = !this.isAccordionArr[i];
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
// dropdown
.dropdown_wrap {
  width: 100px;
  position: absolute;
  right: 76px;
}
// dropdown
.invalid_error {
  &:focus {
    outline: 2px solid #db2c66 !important;
    outline-offset: 0px;
  }
  .dp__input {
    outline: 2px solid #db2c66 !important;
    outline-offset: 0px;
  }
}
.btn_primary_transparent {
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
}
.img_drop_wrap {
  position: relative;
  cursor: pointer;
}
.select_wrap_invite {
  .select2-container {
    width: 100%;
  }
}

// accordion
.dept_selct_wrap {
  width: 30%;
  margin-bottom: 10px;
}
.import_file_text {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #222b45;
  text-align: center;
  margin-bottom: 0;
}
.failed_message {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #222b45;
  margin-bottom: 0;
}
.upload_message {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 0;
}
.email_status_wrap {
  border-radius: 12px;
  width: 100px;
  vertical-align: middle;
  &.pending {
    background: #edf1f7;
    color: #222b45;
  }
  &.accepted {
    background-color: #0aca8a;
    color: white !important;
  }
  &.rejected {
    background-color: #db2c66;
    color: white !important;
  }
  .email_status {
    margin-bottom: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    color: inherit;
  }
}
.desc_cont {
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #222b45;
}
.accordion-button:not(.collapsed) {
  &::after {
    background-image: url(../../../public/K_Icons/arrow_d.svg);
  }
}
.section_wrap {
  display: flex;
  align-items: center;
  // margin-bottom: 24px;
  cursor: pointer;
}
.body_wrap {
  margin-bottom: 10px;
}
.description_body_wrap {
  display: none;
  min-block-size: 0;
  transition: 500ms;
  transition: height 500ms;
  &.collapse {
    transition: 1s;
    transition: height 500ms;
    display: block !important;
  }
  // margin-top: 24px;
}
.acc_body {
  padding: 0;
}
.sub_acc_body {
  padding: 12px 18px;
  background: #f7f9fc;
  border-radius: 4px;
}
.list_wrap {
  ul {
    padding-left: 0;
    margin-bottom: 0;
    li {
      list-style: none;
      display: block;
      padding-bottom: 2px;
      .list_title {
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        color: #222b45;
        margin-bottom: 0;
      }
    }
  }
}
.sub_acc_title {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #222b45;
}
//accordion
li {
  &:last-child {
    margin-bottom: 0 !important;
  }
}
.list_wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  .name_wrap {
    width: 35%;
  }
  .email_wrap {
    width: 35%;
  }
  .icon_wrap {
    width: 30%;
    justify-content: flex-end;
    text-align: end;
    margin-bottom: 4px;
  }
}
.list_group_item {
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 8px 6px 14px;
  background-color: #fff;
}
.border-bottom-1 {
  border-bottom: 1px solid #e4e9f2;
}
.select_wrap {
  width: 100% !important;
}
.one_option_select2 {
  width: 100% !important;
}
.select_to {
  width: 100% !important;
}
.staff_desc {
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  color: #222b45;
}
</style>
