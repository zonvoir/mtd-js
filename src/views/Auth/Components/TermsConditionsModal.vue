<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    ref="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header conf_header">
          <div class="header_wrap">
            <div class="m-r-20">
              <img src="K_Icons/info.svg" alt="" />
            </div>
            <div class="tittle">
              <h5 class="m-b-0 terms_title">confidential information!</h5>
            </div>
          </div>
        </div>
        <div class="modal-body confidencil_msg_body">
          <div class="terms_wrapper">
            <p class="temrs_para">
              The information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended recipient and may not be used,
              published or redistributed.It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).The
              information is confidential, privileged and only for the
              information of the intended
            </p>
          </div>
        </div>
        <div class="modal-footer modal_footer">
          <form action="">
            <div class="k_form_group">
              <div class="check_box_wrapper">
                <label class="k_checkbox check_lable">
                  I agree with the
                  <a
                    target="_blank"
                    class="custom-link"
                    href="https://www.w3schools.com"
                    >Terms of Service!</a
                  >
                  <input
                    type="checkbox"
                    v-model="termsCondtionForm.terms_service"
                    checked="checked"
                  />

                  <span class="checkmark"></span>
                </label>
              </div>
            </div>

            <div class="k_form_group">
              <div class="check_box_wrapper">
                <label class="k_checkbox check_lable">
                  I have read and accept the
                  <a
                    target="_blank"
                    class="custom-link"
                    href="https://www.w3schools.com"
                    >Privacy Policy!</a
                  >
                  <input
                    type="checkbox"
                    v-model="termsCondtionForm.privacy_policy"
                    checked="checked"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="d-grid">
              <button
                @click="acceptTermsCondtions"
                data-bs-dismiss="modal"
                :disabled="
                  !termsCondtionForm.privacy_policy ||
                  !termsCondtionForm.terms_service
                "
                type="button"
                class="btn k_btn_block btn-block text-uppercase btn-primary"
              >
                I Agree
              </button>
            </div>
          </form>
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
      termsCondtionForm: {
        privacy_policy: false,
        terms_service: false,
      },
    };
  },

  created() {
    // localStorage.setItem(
    //   "terms_condtions",
    //   JSON.stringify(this.termsCondtionForm)
    // );
  },
  mounted() {
    this.modal = new Modal(this.$refs.staticBackdrop);
  },
  methods: {
    acceptTermsCondtions() {
      localStorage.setItem("agreedToPrivacy", true);
      // localStorage.setItem(
      //   "terms_condtions",
      //   JSON.stringify(this.termsCondtionForm)
      // );

      this.modal.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.confidencil_msg_body {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 79.69%,
    #ffffff 100%
  );
  border-radius: 4px;
}
.temrs_para {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #222b45;
  text-align: justify;
  margin-bottom: 0;
}
.header_wrap {
  display: flex;
  align-items: center;
  padding: 10px 30px;
  width: 100%;
}
.conf_header {
  background: #edf1f7;
  border-radius: 4px 4px 0px 0px;
}
.terms_title {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
}
</style>
