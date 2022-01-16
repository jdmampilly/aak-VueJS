<template>
  <div>
    <b-modal id="bv-modal-addLoan" size="xl" hide-header-close hide-footer>
      <H4>Add Loan</H4>
      <!-- {{this.empLoanSummary}} -->
      <div class="main-div">
        <hr />
        <b-row class="mt-2">
          <b-col cols="2" offset="1" class="col-left">
            <label for="input-code">Trn. Id:</label>
          </b-col>
          <b-col cols="2" class="col-left">{{ employeeLoan.trnId }}</b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="2" offset="1" class="col-left">
            <label for="input-code">Code:</label>
          </b-col>
          <!-- <b-col cols="2">
            <b-form-input
              id="input-code"
              v-model="employeeLoan.empCode"
              placeholder="Code"
            ></b-form-input>
          </b-col> -->
          <b-col cols="2">
            <b-form-group>
              <b-input-group>
                <b-form-input
                  class="col-right form-control form-control-sm"
                  v-model="employeeLoan.empCode"
                  placeholder="Employee code"
                  @change="getEmployee"
                  v-b-tooltip.hover
                  title="Enter employee code"
                ></b-form-input>
                <template v-slot:append>
                  <searchSm
                    :column1Key="searchEmp.attr1.name"
                    :column1label="searchEmp.attr1.label"
                    :column2Key="searchEmp.attr2.name"
                    :column2label="searchEmp.attr2.label"
                    :fetchItem="fetchEmployeeCode"
                    @fetchD="fetchEmployeeList"
                    :items="employeeList"
                    :reset="defaultStateEmpLoan"
                  />
                </template>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="5" class="col-left">{{ employeeLoan.empName }}</b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="2" offset="1" class="col-left">
            <label for="input-drAmount">Dr. Amount:</label>
          </b-col>
          <b-col cols="2">
            <b-form-input
              class="col-right"
              id="input-drAmount"
              v-model="employeeLoan.drAmount"
              placeholder="Debit Amount"
            ></b-form-input>
          </b-col>
          <b-col cols="2">
            <label for="input-crAmount">Cr. Amount:</label>
          </b-col>
          <b-col cols="2">
            <b-form-input
              class="col-right"
              id="input-crAmount"
              v-model="employeeLoan.crAmount"
              placeholder="Credit Amount"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="2" offset="1" class="col-left">
            <label for="input-description">Description:</label>
          </b-col>
          <b-col cols="6" class="col-left">
            <b-form-input
              id="input-description"
              v-model="employeeLoan.description"
              placeholder="description"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="2" offset="1" class="col-left">
            <label for="input-bankCode">Bank Code:</label>
          </b-col>
          <b-col cols="2" class="col-left">
            <b-form-input
              id="input-bankCode"
              v-model="employeeLoan.bankCode"
              placeholder="bank code"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="1" offset="3">
            <b-button @click="closeModal()">Submit</b-button>
          </b-col>
          <b-col cols="1">
            <b-button @click="closeModal()">Cancel</b-button>
          </b-col>
        </b-row>
        <br />
      </div>
      <div class="form-background">
        <hr />
        <loanSummary />
        <hr />
      </div>
      <hr />
    </b-modal>
  </div>
</template>
<script>
import loanSummary from "./LoanSummary.vue";
import searchSm from "../components/SearchSm.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchEmp: {
        attr1: { name: "id", label: "Employee Code" },
        attr2: { name: "empName", label: "Employee Name" },
      },
    };
  },
  components: {
    loanSummary,
    searchSm,
  },
  computed: {
    ...mapGetters(["employeeLoan", "employeeList", "fetchStartRec", 'empLoanSummary']),
  },
  methods: {
    ...mapActions([
      "saveLoanTransaction",
      "fetchEmployeeList",
      "fetchEmployeeLoan",
      'fetchEmployeeLoanInfo',
      'defaultStateEmpLoan'
    ]),
    async fetchEmployeeCode (x) {
      this.fetchEmployeeLoan(x)
      this.fetchEmployeeLoanInfo(x)
    },
    async getEmployee() {
      await this.fetchEmployee(this.employeeLoan.empCode);
      if (this.message.length !== 0) {
        this.$toasted.show(this.message, {
          theme: "bubble",
          position: "top-right",
          duration: 5000,
        });
      }
    },
    closeModal() {
      this.defaultStateEmpLoan()
      this.$root.$emit("bv::hide::modal", "bv-modal-addLoan", "#btnShow");
    },
    defaultState() {}
  },
};
</script>
<style scoped>
.main-div {
  width: 95%;
  margin-left: 30px;
  margin-right: 40px;
}
.col-left {
  text-align: left;
}
.col-right {
  text-align: right;
}
.form-background {
  background-color: #dee2e6;
}
</style>
