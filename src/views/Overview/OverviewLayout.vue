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
        <div class="invite_btn_wrap d-flex m-l-auto" v-if="ownRole.can_invite">
          <InvitePeopleModal>
            <template v-slot:invite-button>
              {{ $t("overview_index.buttons.invite_people") }}
            </template>
          </InvitePeopleModal>
        </div>
      </div>
      <!-- tabs  -->
      <div class="tabs_wrap m-b-18">
        <div class="">
          <TabsHr
            :tabs="tablist"
            :activeTabUrl="$route.path"
            @changeTitle="ChangeT($event)"
          />
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
import InvitePeopleModal from "../../components/Shared/InvitePeopleModal.vue";
import TabsHr from "../../components/Shared/TabsHr.vue";

// static list of tab name and tab details

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
export default {
  data() {
    return {
      tablist,
      dept: true,
      invitedId: undefined,
      title: this.$route.path == "/overview/index" ? "Company" : "Extended",
    };
  },

  components: {
    TabsHr,
    InvitePeopleModal,
  },

  // remove the invited user from localstorage
  beforeCreate() {
    localStorage.removeItem("bWFInpvitedbpbUser");
  },

  // get vuex getters
  computed: {
    ...mapGetters({
      ownRole: "roleInCompany",
    }),
  },

  methods: {
    // change page title
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
