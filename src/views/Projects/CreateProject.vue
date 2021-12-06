<template>
  <div class="prjcts_form_container">
    <div class="form_wrap">
      <form action="">
        <div class="row">
          <div class="col-lg-12">
            <div class="k_form_group">
              <label for="" class="k_form_label">{{
                $t("projects.project_form.lables.Project_Name")
              }}</label>
              <input
                type="text"
                name="ProjectName"
                class="form-control k_inp_field"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="k_form_group">
              <label for="" class="k_form_label">{{
                $t("projects.project_form.lables.Project_Success")
              }}</label>
              <p class="bold">5 start Come here</p>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="k_form_group">
              <label for="" class="k_form_label">{{
                $t("projects.project_form.lables.Tags")
              }}</label>
              <input
                type="text"
                name="ProjectName"
                class="form-control k_inp_field"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <label for="" class="k_form_label"
              >{{ $t("projects.project_form.lables.Project_Period") }}
            </label>
            <div class="row">
              <div class="col-lg-6">
                <div class="k_form_group position-relative">
                  <label for="" class="date_label">{{
                    $t("projects.project_form.placeholder.from")
                  }}</label>
                  <Datepicker
                    class="project_date_picker custom_label"
                    v-model="date"
                    placeholder="dd/mm/yyyy"
                  ></Datepicker>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="k_form_group position-relative">
                  <label for="" class="date_label">{{
                    $t("projects.project_form.placeholder.to")
                  }}</label>
                  <Datepicker
                    class="project_date_picker custom_label"
                    placeholder="dd/mm/yyyy"
                  ></Datepicker>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <label for="" class="k_form_label"
              >{{ $t("projects.project_form.lables.Personal_Cost_FTE") }}
            </label>
            <div class="row">
              <div class="col-lg-6">
                <div class="k_form_group">
                  <input
                    type="text"
                    name="Internal Fte"
                    :placeholder="
                      $t('projects.project_form.placeholder.internal_fte')
                    "
                    class="form-control k_inp_field"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <input
                  type="text"
                  name="External FTE"
                  :placeholder="
                    $t('projects.project_form.placeholder.external_fte')
                  "
                  class="form-control k_inp_field"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <label for="" class="k_form_label">{{
              $t("projects.project_form.lables.Project_Cost")
            }}</label>
            <div class="row">
              <div class="col-lg-6">
                <div class="k_form_group">
                  <input
                    type="text"
                    name="internal Costs "
                    :placeholder="
                      $t('projects.project_form.placeholder.internal_costs')
                    "
                    class="form-control k_inp_field"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <input
                  type="text"
                  name="external Costs"
                  :placeholder="
                    $t('projects.project_form.placeholder.external_costs')
                  "
                  class="form-control k_inp_field"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <label for="" class="k_form_label">{{
              $t("projects.project_form.lables.Department_impacted")
            }}</label>
            <div class="row">
              <div
                class="col-lg-3"
                :key="index"
                v-for="(option, index) in options"
              >
                <div class="k_form_group">
                  <div class="check_box_wrapper">
                    <label class="k_checkbox check_lable">
                      {{ option.choice }}
                      <input
                        type="checkbox"
                        v-model="option.value"
                        checked="checked"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <label for="" class="k_form_label">{{
              $t("projects.project_form.lables.areas_topics_impacted")
            }}</label>
            <div class="row">
              <div
                class="col-lg-3"
                :key="index"
                v-for="(option, index) in options"
              >
                <div class="k_form_group">
                  <div class="check_box_wrapper">
                    <label class="k_checkbox check_lable">
                      {{ option.choice }}
                      <input
                        type="checkbox"
                        v-model="option.value"
                        checked="checked"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="k_form_group">
              <label for="" class="k_form_label">{{
                $t("projects.project_form.lables.Challages")
              }}</label>
              <textarea class="form-control k_inp_field" rows="5"></textarea>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="k_form_group">
              <label for="" class="k_form_label">{{
                $t("projects.project_form.lables.Lesson_Learned")
              }}</label>
              <textarea class="form-control k_inp_field" rows="5"></textarea>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="k_form_group">
              <label for="" class="k_form_label">{{
                $t("projects.project_form.lables.More_Project_Details")
              }}</label>
              <textarea class="form-control k_inp_field" rows="5"></textarea>
            </div>
          </div>
          <div class="text-right">
            <button class="btn btn-primary btn-set">
              {{ $t("projects.buttons.create") }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      from: "From",
      to: "To",
      options: [
        { id: 1, value: true, choice: "HR" },
        { id: 2, value: false, choice: "Sales" },
        { id: 3, value: false, choice: "IT" },
        { id: 4, value: false, choice: "IT" },
        { id: 5, value: false, choice: "Sales" },
        { id: 6, value: false, choice: "Management" },
        { id: 7, value: false, choice: "Sales" },
        { id: 8, value: false, choice: "Management" },
        { id: 9, value: true, choice: "Other" },
        { id: 10, value: false, choice: "Management" },
      ],
      date: new Date(),
    };
  },
};
</script>

<style lang="scss" scoped>
.custom_label {
  &::placeholder {
    color: red;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: red;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: red;
  }
}
.date_label {
  position: absolute;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  color: #dadada;
}
.k_form_label {
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 10px;
}
.prjcts_form_container {
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
