<template>
  <div
    v-for="(subQuestion, index) in data"
    :key="subQuestion.subquestion_id"
    class="d-flex"
  >
    <div class="sub_question_wrap">
      <h5 class="sub_ques_name">
        {{ subQuestion.subquestion }}
      </h5>
    </div>
    <div class="k_form_group k_inp_number m-r-10">
      <!-- @keypress="isNumber" -->
      <!-- @keydown="isNumber" new -->
      <!-- ref="inpValue" -->
      <input
        :key="'mni' + index"
        type="text"
        name="single"
        @focus="originalNumberBackup(subQuestion.subquestion_id, index, $event)"
        @blur="formatMaskedNumber(subQuestion.subquestion_id, index, $event)"
        :value="staffAns[index].sub_ans"
        :data-original="maskRemovers(staffAns[index].sub_ans, '-')"
        class="form-control k_inp_field"
        @keydown="onInput(subQuestion.subquestion_id, index, $event)"
      />
      <!-- @input="onInput(subQuestion.subquestion_id, index, $event)" -->
      <!-- @keydown="isNumber" -->
    </div>
  </div>
  <div v-if="isValid" class="custom_error">All answer is required</div>
</template>

<script>
import maskFormatter, { maskRemover } from "../../../utils/mask-formmater";
export default {
  emits: ["getUserSelected"],

  props: {
    data: {
      required: true,
      type: Array,
    },
    currentAns: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      numberPattern: /^\d{0,}(?:\.\d{0,1}){0,1}$/,
      // numberPattern: /^\d{1,10}(\.\d{1,4})?$/,
      // numberPattern: /[0-9]/,
      default_seprator: " ",
      staffAns: new Array(this.data.length).fill({
        subquestion_id: "",
        sub_ans: "",
      }),
      // staffAns: [],
      updatetedAns: "",
      isValid: false,
      allAnsFilled: undefined,
    };
  },

  created() {
    console.log(this.staffAns);
    if (this.currentAns != "") {
      this.staffAns = this.currentAns;
      this.allAnsFilled = true;
      this.emitData(this.currentAns);
      console.log("current ans", this.staffAns);
    }
  },

  // updated() {
  //   this.staffAns[0] = {
  //     subquestion_id: "4555555",
  //     sub_ans: this.updatetedAns,
  //   };
  // },

  methods: {
    onInput(_id, _index, event) {
      console.log(event);
      if (event.key == "-") {
        event.preventDefault();
        return false;
      }
      //   // event.target.dataset.org = event.target.dataset.org + event.data;
      //   // console.info(event.target.dataset, event);
      //   let tempAns = event.target.value;
      //   // console.info("vishu", typeof tempAns);
      //   this.updatetedAns = tempAns;
      //   console.info(
      //     "updated",
      //     this.updatetedAns,
      //     this.maskRemovers(this.updatetedAns, this.default_seprator)
      //   );
      //   event.target.dataset.org = this.maskRemovers(
      //     this.updatetedAns,
      //     this.default_seprator
      //   );
      //   // console.log(id, index, event);
      //   // console.info(tempAns);
      //   this.checkValidate(this.updatetedAns, id, index);
    },
    checkValidate(tempAns, tempid, index) {
      this.staffAns[index] = {
        subquestion_id: tempid,
        sub_ans: tempAns,
      };
      console.log(this.staffAns[index]);
      this.isValid = this.staffAns.some((e) => e.sub_ans === "");
      this.allAnsFilled = true;
      if (this.isValid) {
        this.allAnsFilled = !this.isValid;
      }
      console.log(this.isValid);
      // this.staffAns.forEach((item) => {
      //   if (item.sub_ans != "") {
      //     length = length + 1;
      //     this.isValid = false;
      //   }
      // });
      // if ((this.staffAns.length, length)) {
      //   this.isValid = false;
      // }
      console.log(this.staffAns.length);
      this.emitData(this.staffAns);
    },

    emitData(val) {
      this.$emit("getUserSelected", {
        ansData: val,
        isFieldValid: this.allAnsFilled,
      });
    },

    maskRemovers(number, seprator = ",") {
      if (number == "") {
        return maskRemover(number, seprator);
      } else {
        return number;
      }
    },

    originalNumberBackup(id, index, ev) {
      console.log(ev.target.value);
      if (
        ev.target.value != null &&
        ev.target.value != "" &&
        ev.target.value != undefined
      ) {
        let v = maskRemover(ev.target.value, this.default_seprator);
        this.checkValidate(v, id, index);
        ev.target.setAttribute("type", "number");
        ev.target.setAttribute("min", "0");
      }
      console.log(ev.target.value, ev.target.dataset, "original Number Backup");
    },

    formatMaskedNumber(id, index, ev) {
      console.log(
        ev.target.value,
        ev.target.value == null,
        ev.target.value == undefined,
        ev.target.value == "",
        "original number backup"
      );
      // if (ev.target.value) {
      let fVal = 0;
      if (ev.target.value != "") {
        fVal = maskFormatter(ev.target.value, this.default_seprator);
        ev.target.removeAttribute("min");
        ev.target.setAttribute("type", "text");
        this.checkValidate(fVal, id, index);
      }
      console.log("numbrvis", fVal.toString());

      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.custom_error {
  color: #db2c66;
  font-size: 14px;
  font-weight: 400;
}
.sub_question_wrap {
  width: 80%;
}
.k_inp_number {
  width: 18%;
  margin-left: 2rem;
  text-align: center;
}
.sub_ques_name {
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: #222b45;
}
</style>
