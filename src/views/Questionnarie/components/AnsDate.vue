<template>
  <div class="k_date_picker k_inp_half">
    <Datepicker class="" v-model="date"></Datepicker>
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
export default {
  props: ["data"],
  components: {
    Datepicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>
