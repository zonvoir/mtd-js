<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div class="">
              <h4 class="view_title">{{ $t(title) }}</h4>
            </div>
          </div>
        </div>
        <div class="invite_btn_wrap m-l-auto">
          <button class="btn-primary btn k_btn_people">
            {{ $t("overview_index.buttons.invite_people") }}
          </button>
        </div>
      </div>
      <!-- tabs  -->
      <div class="tabs_wrap m-b-18">
        <div class="">
          <TabsHr :tabs="tablist" @changeTitle="ChangeT($event)" />
        </div>
      </div>
      <!-- tabs end -->
      <div class="overview_container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const tablist = [
  {
    tabId: 0,
    title: "overview_index.Company",
    tabTitle: "overview_index.tab.company",
    component_url: "/overview/index",
  },
  {
    tabId: 1,
    title: "overview_index.Extended",
    tabTitle: "overview_index.tab.extended",
    component_url: "/overview/extended",
  },
];
import TabsHr from "../../components/Shared/TabsHr.vue";
import CompanyService from "../../Services/Company/CompanyService";
export default {
  data() {
    return {
      tablist,
      dept: true,
      invitedId: undefined,
      title: "Company",
    };
  },
  computed: {
    ...mapGetters({
      staffInfo: "staffData",
    }),
  },
  components: {
    TabsHr,
  },
  created() {
    let invitedStaffData = this.$route.query;
    console.log("invited user query data", invitedStaffData);
    if (invitedStaffData && Object.keys(invitedStaffData).length != 0) {
      this.invitedId = invitedStaffData.invitation_id;
      console.log("invited id ", this.invitedId);
      if (this.invitedId != undefined) {
        this.invitaionAccepted();
      }
    }
  },
  methods: {
    invitaionAccepted() {
      CompanyService.acceptInvitation({
        auth_token: this.staffInfo.auth_token,
        invitation_id: this.invitedId,
      }).then((res) => {
        if (res.data.status) {
          console.log("invitainon accepted successfully");
        } else {
          let $th = this;
          if ("error" in res.data) {
            Object.keys(res.data.error).map(function (key) {
              $th.$toast.error(res.data.error[key], {
                position: "bottom-left",
                duration: 3712,
              });
            });
          } else {
            $th.$toast.error(res.data.message, {
              position: "bottom-left",
              duration: 3712,
            });
          }
        }
      });
    },
    ChangeT(title) {
      this.title = title;
    },
  },
};
</script>

<style lang="scss" scoped>
.border-bottom-1 {
  margin-top: 40px;
  border-bottom: 1px solid #e4e9f2;
}
.page_title_wrap {
  display: flex;
  align-items: center;
}
.k_btn_people {
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  text-transform: uppercase;
}
</style>
