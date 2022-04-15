<template>
  <div class="opt_wrap" ref="otpboxes">
    <!-- :ref="'v'+index" -->
    <input
      v-for="index in v.keys()"
      :key="index"
      type="text"
      ref="focusInp"
      v-model.trim="v[index]"
      maxlength="1"
      @keydown="clicked"
      @paste="onPaste(index)"
      :data-index="index"
      minlength="0"
      :class="classesName"
    />
  </div>
  <span class="text-danger">{{ this.msg["otp"] }}</span>
</template>

<script>
export default {
  name: "CustomOtp",
  emits: ["onPaste"],
  props: {
    counters: Number,
    classesName: String,
    onChanges: Function,
    onComplete: Function,
    validateType: String,
    patterns: String,
    validateMsg: String,
  },
  data() {
    return { v: Array(this.counters), msg: [], validated: false };
  },

  methods: {
    clicked(ev) {
      /// backspace or delete code
      if (ev.keyCode === 8) {
        ev.preventDefault();
        if (ev.target.dataset.index >= 0) {
          // console.log(ev.target.dataset, this.v[ev.target.dataset.index]);

          if (
            this.v[ev.target.dataset.index] == null &&
            ev.target.dataset.index > 0
          ) {
            this.$refs.otpboxes
              .getElementsByTagName("input")
              [ev.target.dataset.index - 1].focus();
          }

          this.v[ev.target.dataset.index] = null;
          // console.log(this.v);
          if (this.validateOtp(this.v)) {
            ev.preventDefault();
            return false;
          }
        }
      } else {
        ev.preventDefault();

        if (ev.target.dataset.index < this.v.length) {
          // to enter only numbers key and number pad
          let keyCodes = [
            9, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101,
            102, 103, 104, 105,
          ];
          if (keyCodes.includes(ev.keyCode)) {
            if (ev.keyCode !== 9) {
              this.v[ev.target.dataset.index] = ev.key;
              // if (this.v[ev.target.dataset.index] != null) {
              if (ev.target.dataset.index < this.v.length - 1) {
                this.$refs.otpboxes
                  .getElementsByTagName("input")
                  [+ev.target.dataset.index + 1].focus();
              }
              // }
            }
          }
          // to move cursor right arrow and tab
          if (ev.keyCode == 39 || ev.keyCode == 9) {
            if (ev.target.dataset.index < this.v.length - 1) {
              this.$refs.otpboxes
                .getElementsByTagName("input")
                [+ev.target.dataset.index + 1].focus();
            }
          }
          /// ctrl || cmd copy and paste
          if (ev.ctrlKey && ev.keyCode == 86) {
            console.log(
              window,
              window.navigator,
              window.navigator.clipboard,
              "vis"
            );
            window.navigator.clipboard
              .readText()
              .then((text) => {
                for (let i = 0; i < this.v.length; i++) {
                  this.v[i] = text[i];
                }
                this.validateOtp(this.v);
                if (this.validated) {
                  this.onCompleted();
                }
              })
              .catch((err) => {
                console.error("Failed to read clipboard contents: ", err);
              });
          }
          // to move cursor left side left arrow shift + tab
          if ((ev.shiftKey && ev.keyCode == 9) || ev.keyCode === 37) {
            if (ev.target.dataset.index >= 0) {
              this.$refs.otpboxes
                .getElementsByTagName("input")
                [+ev.target.dataset.index - 1].focus();
            }
          }
        }
        this.validateOtp(this.v);

        let $th = this;
        this.onChanges({
          lists: $th.v,
          counts: $th.v.length,
          asString: $th.v.join(""),
          valiated: $th.validated,
        });
      }
      if (this.validated) {
        this.onCompleted();
      }
    },

    onPaste(evt, index) {
      console.log("on paste", evt, index);
      return true;
    },

    onCompleted() {
      let $th = this;
      this.onComplete({
        lists: $th.v,
        counts: $th.v.length,
        asString: $th.v.join(""),
        valiated: $th.validated,
      });
    },

    // validate otp [patterns, alpha, numeric, alphanumeric]
    validateOtp(otpArray) {
      let rule = "";
      if (this.validateType == "patterns") {
        rule = this.patterns;
      } else if (this.validateType == "alpha") {
        rule = /[A-Za-z]/;
      } else if (this.validateType == "numeric") {
        rule = /[0-9]/;
      } else {
        rule = /[A-Za-z0-9]/;
      }
      let errors = [];
      otpArray.map((val) => {
        errors.push(rule.test(val));
      });

      // console.log(errors);

      if (errors.includes(false) || errors.length != this.counters) {
        this.validated = false;
        this.msg["otp"] = this.validateMsg
          ? this.validateMsg
          : "Please enter the " + this.counters + " charcters ";
      } else {
        this.validated = true;
        this.msg["otp"] = null;
      }

      return errors.includes(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.opt_wrap {
  display: flex;
  align-items: center;
  margin: 10px;
  justify-content: center;
}

.single_num_inp {
  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
  padding: 10px !important;
  width: 60px;
  height: 60px;
  margin: 10px;
  text-align: center;
  color: #000000;
}
</style>
