<template>
  <div class="opt_wrap" ref="otpboxes">
    <!-- :ref="'v'+index" -->
    <input
      v-for="index in v.keys()"
      :key="index"
      type="text"
      v-model="v[index]"
      maxlength="1"
      @keyup="clicked"
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
  // watch: {
  //   v: {
  //     handler(val) {
  //       if (val.length === this.v.length) {
  //         this.onCompleted();
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    clicked(ev) {
      if (ev.keyCode === 8 || ev.keyCode === 37) {
        if (ev.target.dataset.index != 0) {
          this.$refs.otpboxes
            .getElementsByTagName("input")
            [ev.target.dataset.index - 1].focus();
          if (this.validateOtp(this.v)) {
            ev.preventDefault();
            return false;
          }
        }
      } else {
        if (this.validateOtp(this.v)) {
          ev.preventDefault();
          this.v[ev.target.dataset.index] = undefined;
          return false;
        }
        if (ev.target.dataset.index < this.v.length - 1) {
          this.$refs.otpboxes
            .getElementsByTagName("input")
            [+ev.target.dataset.index + 1].focus();
        }
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
