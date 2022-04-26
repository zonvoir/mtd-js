<template>
  <div>
    <!-- Modal -->
    <!-- -->
    <!-- data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true" -->
    <div
      class="modal custom_modal_email fade"
      id="exampleModal"
      ref="successModal"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content set_modal_width">
          <div class="modal-body update_email_body">
            <div class="text-center">
              <h5 class="update_email_title">S</h5>
            </div>
            <div class="text-center">
              <h5 class="update_email_title">Your Information is Saved</h5>
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
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.successModal);
  },
};
</script>

<style lang="scss" scoped></style>
