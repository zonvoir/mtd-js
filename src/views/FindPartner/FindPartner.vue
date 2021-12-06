<template>
  <div>
    <div class="card_container m-b-2">
      <div class="custom_grid3">
        <div class="custom_grid_col m-r-20">
          <div class="card_wrapper">
            <h5 class="card_title m-b-12">Companeis</h5>
            <div class="card_body">
              <p class="m-b-0 card_desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellat alias distinctio optio repudiandae, nihil laboriosam
                aliquam voluptatum quasi in ipsum.
              </p>
            </div>
            <div class="card_footer">
              <div class="card_link">
                <a class="page_link m-l-auto"
                  >{{ $t("find_partner.table.buttons.view") }}
                  <img src="K_Icons/next.svg" alt="" class="next_icon p-l-6"
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="custom_grid_col m-r-20">
          <div class="card_wrapper">
            <h5 class="card_title m-b-12">Key Partners</h5>
            <div class="card_body">
              <p class="m-b-0 card_desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellat alias distinctio optio repudiandae, nihil laboriosam
                aliquam voluptatum quasi in ipsum.
              </p>
            </div>
            <div class="card_footer">
              <div class="card_link">
                <a class="page_link m-l-auto"
                  >{{ $t("find_partner.table.buttons.view") }}
                  <img src="K_Icons/next.svg" alt="" class="next_icon p-l-6"
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="custom_grid_col">
          <div class="card_wrapper">
            <h5 class="card_title m-b-12">Experts</h5>
            <div class="card_body">
              <p class="m-b-0 card_desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellat alias distinctio optio repudiandae, nihil laboriosam
                aliquam voluptatum quasi in ipsum.
              </p>
            </div>
            <div class="card_footer">
              <div class="card_link">
                <a class="page_link m-l-auto"
                  >{{ $t("find_partner.table.buttons.view") }}
                  <img src="K_Icons/next.svg" alt="" class="next_icon p-l-6"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <h5 class="head_title m-b-20">{{ $t("find_partner.Partners") }}</h5>
    </div>
    <div class="table_container">
      <PartnerTable />
    </div>
  </div>
</template>

<script>
import PartnerTable from "../FindPartner/PartnersTabel.vue";
export default {
  components: {
    PartnerTable,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
//table start

//table end
.table_container {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 15px 20px;
}
.card_wrapper {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  padding: 14px;
  .card_body {
    padding: 12px 4px;
    .card_desc {
      color: #222b45;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
    }
  }
  .page_link {
    margin-left: auto !important;
    color: #7900d8;
    font-size: 16px;
    line-height: 32px;
    font-weight: 500;
    text-decoration: none;
  }
  .card_link {
    cursor: pointer;
  }
  .card_title {
    text-transform: capitalize;
    text-align: center;
    color: #7900d8;
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    margin-bottom: 0;
  }
}
.head_title {
  text-transform: capitalize;

  color: #7900d8;
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
}
</style>
