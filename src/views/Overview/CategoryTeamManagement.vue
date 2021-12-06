<template>
  <div class="team_wrapper m-b-20">
    <div class="m-b-24">
      <h4 class="m-b-0 title-dark">Managers</h4>
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
    <div class="form_wrapper">
      <form action="">
        <div class="d-flex align-items-center m-b-24">
          <div class="select_wrap">
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
              invite
            </button>
          </div>
        </div>
        <div class="staff_list_wrapper">
          <h6 class="mb-0 text-primary text-14-500 p-b-16">
            <!-- Invited Managers -->
          </h6>
          <div class="list_wrap m-b-20">
            <ul class="list-group">
              <li class="list_group_item d-inline-flex m-b-8">
                <div class="list_wrapper">
                  <div class="name_wrap">
                    <p class="text-14-600 m-b-0 text-capitalize text-heading">
                      <!-- first last name  -->
                      {{
                        $t("category_details.team_mangementTab.First_Last_Name")
                      }}
                    </p>
                  </div>
                  <div class="email_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      <!-- name@email.com -->{{
                        $t("category_details.team_mangementTab.name_email_com")
                      }}
                    </p>
                  </div>
                  <div class="icon_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      <img src="K_Icons/more-vertical.svg" alt="" class="" />
                    </p>
                  </div>
                </div>
              </li>
              <li class="list_group_item d-inline-flex m-b-8">
                <div class="list_wrapper">
                  <div class="name_wrap">
                    <p class="text-14-600 m-b-0 text-capitalize text-heading">
                      John Doe
                    </p>
                  </div>
                  <div class="email_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      johndoe@email.com
                    </p>
                  </div>
                  <div class="icon_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      <img src="K_Icons/more-vertical.svg" alt="" class="" />
                    </p>
                  </div>
                </div>
              </li>
              <li class="list_group_item d-inline-flex m-b-8">
                <div class="list_wrapper">
                  <div class="name_wrap">
                    <p class="text-14-600 m-b-0 text-capitalize text-heading">
                      John Doe
                    </p>
                  </div>
                  <div class="email_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      johndoe@email.com
                    </p>
                  </div>
                  <div class="icon_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      <img src="K_Icons/more-vertical.svg" alt="" class="" />
                    </p>
                  </div>
                </div>
              </li>
              <li class="list_group_item d-inline-flex m-b-8">
                <div class="list_wrapper">
                  <div class="name_wrap">
                    <p class="text-14-600 m-b-0 text-capitalize text-heading">
                      John Doe
                    </p>
                  </div>
                  <div class="email_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      johndoe@email.com
                    </p>
                  </div>
                  <div class="icon_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      <img src="K_Icons/more-vertical.svg" alt="" class="" />
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="team_wrapper m-b-20">
    <div class="m-b-24">
      <h4 class="m-b-0 title-dark">Employees</h4>
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
    <div class="form_wrapper">
      <form action="">
        <div class="d-flex align-items-center m-b-24">
          <div class="select_wrap">
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
              {{ $t("category_details.team_mangementTab.buttons.invite") }}
            </button>
          </div>
        </div>
        <div class="staff_list_wrapper">
          <h6 class="mb-0 text-primary text-14-500 p-b-16">
            <!-- Invited Employees -->{{
              $t("category_details.team_mangementTab.Invited_Employees")
            }}
          </h6>
          <div class="list_wrap m-b-20">
            <ul class="list-group">
              <li class="list_group_item d-inline-flex m-b-8">
                <div class="list_wrapper">
                  <div class="name_wrap">
                    <p class="text-14-600 m-b-0 text-capitalize text-heading">
                      {{
                        $t("category_details.team_mangementTab.First_Last_Name")
                      }}
                    </p>
                  </div>
                  <div class="email_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      {{
                        $t("category_details.team_mangementTab.name_email_com")
                      }}
                    </p>
                  </div>
                  <div class="icon_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      <img src="K_Icons/more-vertical.svg" alt="" class="" />
                    </p>
                  </div>
                </div>
              </li>
              <li class="list_group_item d-inline-flex m-b-8">
                <div class="list_wrapper">
                  <div class="name_wrap">
                    <p class="text-14-600 m-b-0 text-capitalize text-heading">
                      John Doe
                    </p>
                  </div>
                  <div class="email_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      johndoe@email.com
                    </p>
                  </div>
                  <div class="icon_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      <img src="K_Icons/more-vertical.svg" alt="" class="" />
                    </p>
                  </div>
                </div>
              </li>
              <li class="list_group_item d-inline-flex m-b-8">
                <div class="list_wrapper">
                  <div class="name_wrap">
                    <p class="text-14-600 m-b-0 text-capitalize text-heading">
                      John Doe
                    </p>
                  </div>
                  <div class="email_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      johndoe@email.com
                    </p>
                  </div>
                  <div class="icon_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      <img src="K_Icons/more-vertical.svg" alt="" class="" />
                    </p>
                  </div>
                </div>
              </li>
              <li class="list_group_item d-inline-flex m-b-8">
                <div class="list_wrapper">
                  <div class="name_wrap">
                    <p class="text-14-600 m-b-0 text-capitalize text-heading">
                      John Doe
                    </p>
                  </div>
                  <div class="email_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      johndoe@email.com
                    </p>
                  </div>
                  <div class="icon_wrap">
                    <p class="text-14-600 m-b-0 text-heading">
                      <img src="K_Icons/more-vertical.svg" alt="" class="" />
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Select2 from "vue3-select2-component";
export default {
  components: { Select2 },
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
  }
}
.list_group_item {
  border: 1px solid #e4e9f2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 8px 6px 14px;
}
.border-bottom-1 {
  border-bottom: 1px solid #e4e9f2;
}
.select_wrap {
  width: 86%;
}
.select_to {
  width: 100%;
}
.staff_desc {
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  color: #222b45;
}
</style>
