<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      ref="exampleModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="verify_email">
              <h2 class="verify_title">
                <strong
                  >Please setup your company and career information
                  first.</strong
                >
              </h2>
            </div>
            <div class="verify-subtitle q-pb-none">
              <h6 class="">
                You've not setup your company and career information
              </h6>
            </div>
          </div>
          <div class="modal_action_btn text-right">
            <!-- data-bs-dismiss="modal" -->
            <button
              type="button"
              @click="onCloseModal"
              class="btn default_padding k_btnfs14_w700 btn-primary"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  emits: ["agreeToComplete"],
  // props: {
  //   registeredEmail: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      modal: null,
    };
  },

  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
  // openModal() {
  //   this.modal.hide();
  // },
  onCloseModal() {
    // this.modal.hide();
    console.log("hi");
    // this.$emit("agreeToComplete");
  },
};
</script>

<style lang="scss" scoped>
.modal_action_btn {
  text-align: right;
  padding: 0 16px 16px 16px;
}
.verify_email {
  .verify_title {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 40px;
    color: #222b45;
  }
}

.verify-subtitle {
  padding-bottom: 0 !important;
}
</style>
