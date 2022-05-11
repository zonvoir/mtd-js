<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade success_modal_dialog"
      id="exampleModal"
      ref="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="">
            <div class="success_body_wrap">
              <div class="checkmark_container">
                <img src="image_icon/check.png" alt="" class="check_img" />
              </div>
              <h2 class="sucesstitle">
                <strong>Your Information is Saved</strong>
              </h2>

              <div class="modal_action_btn text-ceter">
                <button
                  type="button"
                  data-dismiss="modal"
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
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  emits: ["agreeToComplete"],

  data() {
    return {
      modal: null,
    };
  },

  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },

  onCloseModal() {
    this.modal.hide();
    console.log("hi");
  },
};
</script>

<style lang="scss" scoped>
.success_body_wrap {
  text-align: center;
  padding: 24px;
}
.check_img {
  width: 90px;
}
.sucesstitle {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 40px;
  color: #222b45;
  margin: 5px 0 10px 0;
}

.verify-subtitle {
  padding-bottom: 0 !important;
}
</style>
