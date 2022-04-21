<template>
  <div class="">
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
          @keydown="isNumber"
          @blur="blurEvent"
          @input="onInput(subQuestion.subquestion_id, index, $event)"
          v-model="staffAns[index].sub_ans"
          class="form-control k_inp_field"
        />
        <!-- :data-original="maskRemovers(staffAns[index].sub_ans, '-')" -->
        <!-- @input="onInput(subQuestion.subquestion_id, index, $event)" -->
        <!-- @keydown="isNumber" -->
      </div>
    </div>
    <div v-if="isValid" class="custom_error">All answer is required</div>
  </div>
</template>

<script>
import maskFormatter, { maskRemover } from "../../../utils/mask-formmater";
import numfractionMixin from "../../../mixins/numeric-fraction-numbers";

export default {
  emits: ["getUserSelected"],
  mixins: [numfractionMixin],

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
      console.log(_id, _index, event);
      let dataI = "";
      if (event.target.value.includes(".")) {
        console.log("decimal is available", event.target.value);
        let dataValArr = event.target.value.split(".");
        let str_first = dataValArr[0];
        let str_last = dataValArr[1];
        let itermediatData =
          str_first //below code modify in middle
            .replace(/ /g, "")
            .match(/.{1,3}/g)
            .join(" ") +
          "." +
          (str_last.length > 3 ? "" : str_last);
        dataI = itermediatData;
      } else {
        console.log("no decimal", event.target.value);
        dataI = "";
        if (event.target.value !== "") {
          dataI = event.target.value
            .replace(/ /g, "")
            .match(/.{1,3}/g)
            .join(" ");
        }
      }
      this.checkValidate(dataI, _id, _index);
    },
    checkValidate(tempAns, tempid, index) {
      console.log("checking for null values");
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
