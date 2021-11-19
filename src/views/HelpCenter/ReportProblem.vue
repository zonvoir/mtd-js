<template>
  <div class="help_conatiner m-b-20">
    <div class="">
      <h5 class="m-b-0 m_title">Report a problem</h5>
    </div>
    <div class="form_container">
      <div class="k_select_single k_inp_half m-b-20">
        <Multiselect
          placeholder="Role"
          class="form-control k_inp_field"
          rules="required"
          :options="issues"
        />
      </div>
      <div class="k_form_group p-b-49">
        <textarea
          placeholder="Message"
          class="form-control k_inp_field"
          rows="5"
        ></textarea>
      </div>
      <div class="m-l-auto p-t-49">
        <button type="submit" class="btn btn-primary btn-set">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      issues: [
        { value: 0, label: "Issue 1" },
        { value: 1, label: "Issue 2" },
        { value: 2, label: "Issue 3" },
        { value: 3, label: "Issue 4" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.m_title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  padding-bottom: 16px;
  color: #7900d8;
}
.help_conatiner {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 18px 14px;
}
</style>
