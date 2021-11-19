<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div class="">
              <h4 class="view_title">{{ title }}</h4>
            </div>
          </div>
        </div>
        <!-- This button is available on project list is available -->
        <div class="m-l-auto"></div>
        <div class="invite_btn_wrap m-r-20">
          <button @click="openCustomModal" class="btn-primary btn k_btn_people">
            Genrate Report
          </button>
        </div>
        <div class="">
          <button
            @click="sidebarModal(true)"
            class="btn btn-transaprent settings_wrap"
          >
            <img src="K_Icons/settings-2.svg" alt="" class="setting" />
          </button>
        </div>
      </div>

      <div class="overview_container">
        <router-view />
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    ref="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content modal_body">
        <div class="modal-body">
          <div class="m-t-10">
            <h4 class="m-b-0 report_title">Peer Group Selection</h4>
            <p class="m-b-0 desc_content">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour.
            </p>
          </div>
          <div class="from_wrapper">
            <form action="">
              <div class="k_form_group k_select_single">
                <Multiselect
                  placeholder="Industry List"
                  class="form-control k_inp_field m-b-16"
                  rules="required"
                  :options="industryLists"
                />
              </div>
              <div class="k_form_group k_select_single">
                <Multiselect
                  placeholder="Company Size"
                  class="form-control k_inp_field m-b-16"
                  rules="required"
                  :options="companySize"
                />
              </div>
              <div class="modal_action_btn">
                <div class="btns_wrap">
                  <button
                    class="btn btn-light btn-set m-r-10"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    :disabled="isSubmitted"
                    type="submit"
                    class="btn btn-primary btn-set"
                  >
                    <div
                      v-if="isSubmitted"
                      class="spinner-border text-light"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <span v-else data-bs-dismiss="modal"> Save </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Sidebar -->
  <div
    :class="{ sidebaractive: sidebarActive }"
    class="sidebar_modal_container"
  >
    <DepartmentSidebar @sidebarToggle="sidebarModal($event)" />
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import Multiselect from "@vueform/multiselect";
import DepartmentSidebar from "./DepartmentSidebar.vue";
export default {
  components: {
    Multiselect,
    DepartmentSidebar,
  },
  data() {
    return {
      // tablist,
      value: true,
      sidebarActive: false,
      title: "Company",
      industryLists: [
        { value: 1, label: "industry 1" },
        { value: 2, label: "industry 2" },
        { value: 3, label: "industry 3" },
      ],
      companySize: [
        { value: 1, label: "micro" },
        { value: 2, label: "small" },
        { value: 3, label: "medium" },
        { value: 4, label: "large" },
      ],
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
  methods: {
    ChangeT(title) {
      this.title = title;
    },
    openCustomModal() {
      this.modal.show();
    },
    sidebarModal(val) {
      if (val) {
        this.toggleBodyClass("addClass", "remove_sroll");
        this.sidebarActive = val;
      } else {
        this.toggleBodyClass("removeClass", "remove_sroll");
        this.sidebarActive = val;
      }
    },
    toggleBodyClass(addRemoveClass, className) {
      const el = document.body;

      if (addRemoveClass === "addClass") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar_modal_container {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  padding: 24px 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: -360px;
  width: 360px;
  z-index: 999;
  transition: 0.5s;
  &.sidebaractive {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0px;
    transition: 0.5s;
  }
}

.modal_body {
  width: 400px;
}
.modal_action_btn {
  margin-top: 282px;
  margin-bottom: 10px;
}
.report_title {
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  color: #222b45;
  padding-bottom: 10px;
}
.desc_content {
  font-size: 15px;
  line-height: 22px;
  color: #8f9bb3;
  font-weight: 400;
  padding-bottom: 10px;
}
.setting {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.settings_wrap {
  background: #ffffff;
  border-radius: 4px;
  position: relative;
  width: 40px;
  height: 40px;
  &:hover {
    background: #ffffff !important;
  }
  &:focus {
    background: #ffffff !important;
  }
  &:active {
    background: #ffffff !important;
  }
  &:enabled {
    background: #ffffff !important;
  }
}
.border-bottom-1 {
  margin-top: 40px;
  border-bottom: 1px solid #e4e9f2;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
.k_btn_people {
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
}
</style>
