<template>
  <div class="col-lg-6">
    <div class="k_form_group k_select_single">
      <!-- :close-on-select="false" -->
      <Multiselect
        mode="multiple"
        v-model="value"
        placeholder="Select your Department"
        label="name"
        class="form-control country_select k_inp_field"
        :options="checboxSelect"
      >
        <template v-slot:singlelabel="{ value }">
          <div class="multiselect-single-label">
            {{ value.label }}
          </div>
        </template>

        <template v-slot:option="{ option }">
          <div class="check_box_wrapper">
            <label class="k_checkbox check_lable">
              {{ option.label }}
              <input type="checkbox" v-model="option.value" checked="checked" />
              <span class="checkmark"></span>
            </label>
          </div>
        </template>
      </Multiselect>
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
      checboxSelect: [
        {
          value: "marketing",
          label: "Marketing",
        },
        {
          value: "it",
          label: "IT",
        },
        {
          value: "finanace",
          label: "Finanace",
        },
        {
          value: "legal",
          label: "Legal",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 16px;
}

.container {
  margin-top: 100px;
  padding: 32px;
}

.select-box {
  display: flex;
  width: 400px;
  flex-direction: column;
}

.select-box .options-container {
  background: #2f3640;
  color: #f5f6fa;
  max-height: 0;
  width: 100%;
  opacity: 0;
  transition: all 0.4s;
  border-radius: 8px;
  overflow: hidden;

  order: 1;
}

.selected {
  background: #2f3640;
  border-radius: 8px;
  margin-bottom: 8px;
  color: #f5f6fa;
  position: relative;

  order: 0;
}

.selected::after {
  content: "";
  background: url("../../../public/K_Icons/arrow_d.svg");
  background-size: contain;
  background-repeat: no-repeat;

  position: absolute;
  height: 100%;
  width: 32px;
  right: 10px;
  top: 5px;

  transition: all 0.4s;
}

.select-box .options-container.active {
  max-height: 240px;
  opacity: 1;
  overflow-y: scroll;
}

.select-box .options-container.active + .selected::after {
  transform: rotateX(180deg);
  top: -6px;
}

.select-box .options-container::-webkit-scrollbar {
  width: 8px;
  background: #0d141f;
  border-radius: 0 8px 8px 0;
}

.select-box .options-container::-webkit-scrollbar-thumb {
  background: #525861;
  border-radius: 0 8px 8px 0;
}

.select-box .option,
.selected {
  padding: 12px 24px;
  cursor: pointer;
}

.select-box .option:hover {
  background: #414b57;
}

.select-box label {
  cursor: pointer;
}

.select-box .option .radio {
  display: none;
}
</style>
