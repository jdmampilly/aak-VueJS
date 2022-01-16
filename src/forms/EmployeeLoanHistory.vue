<template>
  <div>
    <div id="showformlistid" v-show="showFormList">
      <div class="h-35 d-inline-block" style="width: 100%">
        <h5 class="align-left pad-left">Employee Loan History</h5>
      </div>
      <baseList
        :listColumns="listColumns"
        :totalRows="totalLHRows"
        v-on:searchToParent="fetchStartRec"
        @fetchD="fetchLoanHistory"
        :items="loanHistoryList"
        :moreDetails="moreDetails"
        :newButtonLabel="'Add new loan transaction'"
        :showDetailsButton="false"
        @OpenNew="NewPage"
        @OpenCurrent="getCurrentPage"
      />
    </div>
  </div>
</template>

<script>
import baseList from "../components/BaseList.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      listColumns: {
        attr1: { name: "id", label: "Id" },
        attr2: { name: "empCode", label: "Employee Code" },
        attr3: { name: "empName", label: "Employee Name" },
        attr4: { name: "drAmount", label: "Debit Amount" },
        attr5: { name: "crAmount", label: "Credit Amount" },
        attr6: { name: "trnDate", label: "Transaction Date" },
      },
      moreDetails: {
        attr1: { name: "trnDescription", label: "Description" },
        attr2: { name: "trnId", label: "Transaction Id" },
        attr3: { name: "voucherNo", label: "Voucher No" },
        attr4: { name: "passage", label: "Passage" },
        attr5: { name: "", label: "Basic Salary" },
        attr6: { name: "", label: "" },
      },
    };
  },
  created() {
    console.log("Created ", "");
  },
  computed: {
    ...mapGetters([
      "loanHistory",
      "showForm",
      "showFormList",
      "totalRows",
      "totalLHRows",
      "startRec",
      "loanHistoryList",
    ]),
  },
  components: {
    baseList,
  },
  methods: {
    ...mapActions([
      "fetchLoanHistory",
      "setFormDisplay",
      "defaultState",
      "setIsEditMode",
      "fetchEmployee",
      "fetchStartRec",
    ]),
    getCurrentPage: function (x) {
      this.setFormDisplay(true);
      this.setIsEditMode(false);
      this.fetchEmployee(x);
    },
    NewPage: function () {
      this.$bvModal.show("bv-modal-addLoan");
    },
  },
};
</script>

<style></style>
