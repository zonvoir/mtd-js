<template>
  <div>
    <div class="member_container m-b-20">
      <div class="table_container">
        <div class="table_labels">
          <table class="table company_tabel">
            <thead></thead>
            <tbody class="company_tbody">
              <!-- repeat this arrow -->
              <tr @click="getInvoice" class="company_tr">
                <td class="company_td add_new_company">
                  <div class="company_detail company_add">
                    <div class="company_info">
                      <h4 class="company_name company_new">
                        {{ $t("payments.history_tab.Invoice") }} #7326
                      </h4>
                    </div>
                  </div>
                </td>
                <td class="company_td">
                  <div class="td_location td_wrap">
                    {{ $t("payments.history_tab.Service_type") }}
                  </div>
                </td>
                <td class="company_td">
                  <div class="td_members text-right td_wrap">
                    17/04/2021
                    <button class="btn btn-transaprent px-2">
                      <img src="K_Icons/print.svg" class="print" alt="" />
                    </button>
                  </div>
                </td>
              </tr>
              <!-- repeat this arrow -->
              <tr @click="getInvoice" class="company_tr">
                <td class="company_td add_new_company">
                  <div class="company_detail company_add">
                    <div class="company_info">
                      <h4 class="company_name company_new">Invoice #7326</h4>
                    </div>
                  </div>
                </td>
                <td class="company_td">
                  <div class="td_location td_wrap">Service type</div>
                </td>
                <td class="company_td">
                  <div class="td_members text-right td_wrap">
                    17/04/2021
                    <button class="btn btn-transaprent px-2">
                      <img src="K_Icons/print.svg" class="print" alt="" />
                    </button>
                  </div>
                </td>
              </tr>
              <!-- repeat this arrow -->
              <tr @click="getInvoice" class="company_tr">
                <td class="company_td add_new_company">
                  <div class="company_detail company_add">
                    <div class="company_info">
                      <h4 class="company_name company_new">Invoice #7326</h4>
                    </div>
                  </div>
                </td>
                <td class="company_td">
                  <div class="td_location td_wrap">Service type</div>
                </td>
                <td class="company_td">
                  <div class="td_members text-right td_wrap">
                    17/04/2021
                    <button class="btn btn-transaprent px-2">
                      <img src="K_Icons/print.svg" class="print" alt="" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- member end -->
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  methods: {
    getInvoice() {
      this.$router.push({ name: "payment-invoice" });
    },
  },
};
</script>

<style lang="scss" scoped>
.add_new_company {
  cursor: pointer;
}
.company_tr {
  border-radius: 4px;
  border-bottom: 10px solid #eff3f9;
}
.company_tbody {
  border: 0 !important;
  tr {
    &:last-child {
      .company_td {
        border-bottom: 0;
      }
    }
  }
}

.table {
  padding: 0;
}

.company_td {
  vertical-align: middle;
  padding: 0;
  border-bottom: 1px solid #ffffff;
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  .td_location {
    font-style: italic;
    font-weight: 600;
    padding-left: 8px;
    font-size: 15px;
    line-height: 20px;
    color: #222b45;
  }
  .td_members {
    font-style: italic;
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    color: #222b45;
  }
}
.td_wrap {
  background: #ffffff;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
  margin: 8px 0;
  width: 340px;
  height: 68px;
  padding: 20px 0px;
  vertical-align: middle;
}
.company_new {
  margin-bottom: 0;
  font-size: 18px;
  font-weight: 700;
  display: inline;
  color: #222b45;
}
.company_add {
  padding: 14px 20px;
  margin-right: 20px;
  background: #ffffff;
  margin: 8px 0;
  width: 340px;
  height: 68px;
  box-shadow: 0px -2px 25px rgba(178, 187, 211, 0.1);
  border-radius: 4px;
}

.company_info {
  .company_name {
    margin-bottom: 0;
    font-size: 18px;
    font-weight: 700;
    display: inline;
    color: #222b45;
  }
}

.company_tabel {
  width: 100%;
  margin-bottom: 0;
}

.table_label {
  font-size: 14px;
  color: #8f9bb3;
  font-weight: 500;
  margin-bottom: 9px;
}
.border-0 {
  border: 0;
}
</style>
