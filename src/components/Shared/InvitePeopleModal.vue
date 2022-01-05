<template>
  <div class="team_wrapper m-b-20">
    <div class="m-b-24">
      <h4 class="m-b-0 title-dark">Invite People</h4>
    </div>
    <div class="m-b-12">
      <p class="staff_desc">
        Simply dummy text of the printing and typesetting industry. Lorem Ipsum
        has been the industry's standard dummy text ever since the 150.Lorem
        Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        Lorem Dummy text Industry was created.It has been the industry's
        standard dummy text.
      </p>
    </div>
  </div>
  <div class="accrodion_wrapper">
    <div class="accordion custom_acc" id="accordionSection1">
      <div class="accordion-item acc_sub_item">
        <h2 class="accordion-header" id="account_owner1">
          <!-- :class="{ collapsed: index !== 0 }" -->
          <button
            class="accordion-button k_acc_sub_btn collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="collapsesub1"
            aria-expanded="true"
            aria-controls="collapsesub1"
          >
            <div class="d-inline-flex align-items-center">
              <div class="">
                <h2 class="m-b-0 title-dark">Owner</h2>
              </div>
            </div>
          </button>
        </h2>
        <!-- :class="{ show: index === 0 }" -->
        <div
          id="collapsesub1"
          class="accordion-collapse collapse show"
          aria-labelledby="account_owner1"
          data-bs-parent="#accordionExample1"
        >
          <div class="accordion-body sub_acc_body">
            <!-- <slot name="accordionbody1"> </slot> -->
            <div class="accordion-body sub_acc_body">
              <!-- <slot name="accordionbody1"> </slot> -->
              <div class="m-b-12">
                <p class="staff_desc">
                  Simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 150.Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the Lorem Dummy text Industry
                  was created.It has been the industry's standard dummy text.
                </p>
              </div>
              <div class="form_wrapper">
                <form action="">
                  <div class="d-flex align-items-center m-b-24">
                    <div class="select_wrap_invite">
                      <Select2
                        v-model="myValue"
                        :options="myOptions"
                        class="select_to"
                        :settings="settings"
                        @change="myChangeEvent($event)"
                        @select="mySelectEvent($event)"
                      />
                    </div>
                    <div class="btn_wrap">
                      <button class="btn-primary btn btn-set text-uppercase">
                        {{
                          $t(
                            "category_details.team_mangementTab.buttons.invite"
                          )
                        }}
                      </button>
                    </div>
                  </div>
                  <div class="staff_list_wrapper">
                    <h6 class="mb-0 text-primary text-14-500 p-b-16">
                      <!-- Invited Employees -->
                      {{
                        $t(
                          "category_details.team_mangementTab.Invited_Employees"
                        )
                      }}
                    </h6>
                    <div class="list_wrap m-b-20">
                      <ul class="list-group">
                        <li class="list_group_item d-inline-flex m-b-8">
                          <div class="list_wrapper">
                            <div class="name_wrap">
                              <p
                                class="
                                  text-14-600
                                  m-b-0
                                  text-capitalize text-heading
                                "
                              >
                                Owner Name
                              </p>
                            </div>
                            <div class="email_wrap">
                              <p class="text-14-600 m-b-0 text-heading">
                                johndoe@email.com
                              </p>
                            </div>
                            <div class="icon_wrap">
                              <div class="d-inline-flex">
                                <div class="email_status_wrap unaccepted">
                                  <p class="email_status">Send</p>
                                </div>
                                <div class="img_drop_wrap">
                                  <img
                                    src="K_Icons/more-vertical.svg"
                                    alt=""
                                    class=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="section_wrap k_acc_sub_btn m-b-10">
        <h4 class="m-b-0 title-dark">Choose departament(s)</h4>
      </div>
    </div>
    <!-- Accordion For Owner -->
    <InvitationRole />
  </div>
</template>

<script>
import Select2 from "vue3-select2-component";

import InvitationRole from "./InvitationARole.vue";
// import CheckSelect from "./CustomSelect.vue";
export default {
  components: {
    InvitationRole,
    // CheckSelect,
    Select2,
  },
  data() {
    return {
      myValue: "",
      settings: {},
      myOptions: [],
    };
  },
  created() {
    this.settings = {
      tags: true,
      allowClear: true,
      multiple: true,
      insertTag: function (data, tag) {
        // Insert the tag at the end of the results
        console.log("data", data, "tag", tag);
        data.push(tag);
      },
    };
  },
  methods: {
    myChangeEvent(val) {
      console.log(val);
    },
    mySelectEvent({ id, text }) {
      console.log({ id, text });
    },
  },
};
</script>

<style lang="scss" scoped>
.select_wrap_invite {
  width: 100%;

  .select2-container {
    width: 100%;
  }
}
// accordion
.email_status_wrap {
  border-radius: 12px;
  width: 100px;
  vertical-align: middle;
  &.unaccepted {
    background: #edf1f7;
    color: #222b45;
  }
  &.accepted {
    background-color: #0aca8a;
    color: white !important;
  }
  .email_status {
    margin-bottom: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    color: inherit;
  }
}
// accordion
.desc_cont {
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #222b45;
}
.accordion-button:not(.collapsed) {
  &::after {
    background-image: url(../../../public/K_Icons/arrow_d.svg);
  }
}
.acc_body {
  padding: 0;
}
.sub_acc_body {
  padding: 12px 18px;
}
.list_wrap {
  ul {
    padding-left: 0;
    margin-bottom: 0;
    li {
      list-style: none;
      display: block;
      padding-bottom: 2px;
      .list_title {
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        color: #222b45;
        margin-bottom: 0;
      }
    }
  }
}
.sub_acc_title {
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #222b45;
}
//accordion
li {
  &:last-child {
    margin-bottom: 0 !important;
  }
}
.list_wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  .name_wrap {
    width: 35%;
  }
  .email_wrap {
    width: 35%;
  }
  .icon_wrap {
    width: 30%;
    justify-content: flex-end;
    text-align: end;
    margin-bottom: 4px;
  }
}
.list_group_item {
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 8px 6px 14px;
  background-color: #fff;
}
.border-bottom-1 {
  border-bottom: 1px solid #e4e9f2;
}
// .select_wrap {
//   width: 86%;
// }
// .select_to {
//   width: 100%;
// }
.border-bottom-1 {
  border-bottom: 1px solid #e4e9f2;
}
.select_wrap {
  width: 100% !important;
}
.select_to {
  width: 100% !important;
}
.staff_desc {
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  color: #222b45;
}
</style>
