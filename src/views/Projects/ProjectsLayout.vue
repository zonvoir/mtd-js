<template>
  <div>
    <div class="member_container">
      <div class="d-flex align-items-center">
        <div class="view_title_wrap pb-15">
          <div class="page_title_wrap">
            <div class="">
              <h4 class="view_title">{{ $t("projects.Projects") }}</h4>
            </div>
          </div>
        </div>
        <!-- This button is available on project list is available -->
        <div class="invite_btn_wrap m-l-auto" v-if="ownRole.can_invite">
          <InvitePeopleModal>
            <template v-slot:invite-button>
              {{ $t("projects.buttons.invite_people") }}
            </template>
          </InvitePeopleModal>
          <!-- <button class="btn-primary btn k_btn_people">
            
          </button> -->
        </div>
      </div>
      <!-- tabs start -->
      <div class="tabs_wrap m-b-18">
        <div class="border-bottom-1"></div>
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

export default {
  data() {
    return {
      // tablist,
      dept: true,
      title: "Projects",
    };
  },
  computed: {
    ...mapGetters({
      ownRole: "roleInCompany",
    }),
  },
  components: {
    InvitePeopleModal,
  },
  methods: {
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
