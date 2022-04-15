<template>
  <div>
    <!-- <label>{{ cardNumber }}</label> -->
    <input
      placeholder="Enter Number Card"
      v-bind="$attrs"
      :type="type"
      :value="cardNumber"
      @input="updateValue"
      @keyup="isNumber($event)"
    />
  </div>
</template>

<script>
export default {
  name: "MaskInput",
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },

  data() {
    return {
      cardNumber: "",
      count: 0,
    };
  },

  computed: {
    // formatCardNumber() {
    //   return this.cardNumber ? this.cardNumber.match(/.{1,3}/g).join(" ") : "";
    // },
  },

  methods: {
    isNumber(evt) {
      console.log("key press", evt);
      // if (this.cardNumber.includes(".")) {
      //   let afterDeimal = this.cardNumber.split(".");
      //   let str = afterDeimal[1];
      //   let str1 = str.replaceAll(" ", "");
      //   console.log(str, str1, "vishal");
      //   console.log(afterDeimal[1].length);
      //   if (afterDeimal[1].length > 2) {
      //     evt.preventDefault();
      //   }
      // }
      let keyPressed = evt.key;
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        if (keyPressed === ".") {
          evt.preventDefault();
          // if (this.cardNumber.includes(".")) {
          //   console.log(this.cardNumber.split("."));
          // } else {
          //   return true;
          // }
        } else {
          return true;
        }
      }
    },
    updateValue(e) {
      console.log("on Input");
      if (e.target.value.trim() != "") {
        this.cardNumber = e.target.value
          .replace(/ /g, "")
          .match(/.{1,3}/g)
          .join(" ");
        // console.log(this.cardNumber.split("."));

        // Emit the blur event so it automatically sets the modelValue
        this.$emit("update:modelValue", this.cardNumber);
      } else {
        this.cardNumber = "";
        this.$emit("update:modelValue", this.cardNumber);
      }
    },
  },
};
</script>

<style>
/* https://stackoverflow.com/questions/68391877/space-in-4-digits-for-a-credit-card-with-vuejs */
</style>
