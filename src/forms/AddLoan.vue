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
              v-model="employeeLoan.trnDescription"
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
            <b-button variant="success" class="mr-1" @click="save()">Submit</b-button>
          </b-col>
          <b-col cols="1">
            <b-button variant="outline-primary" class="mr-1" @click="closeModal()">Clear</b-button>
          </b-col>
        </b-row>
        <br />
      </div>
      <div class="form-background">
        <!-- <hr /> -->
        <loanSummary  @calculateAdditionalInstallment="getAdditionalInstallment"/>
        <!-- <hr /> -->
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
      additionalInstallment: 0,
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
    getAdditionalInstallment: function (x) {
      this.additionalInstallment = x
      console.log(this.additionalInstallment)
    },
    checkForm: function () {
      console.log('checking form data')
      this.errors = []
      if (!this.employeeLoan.empCode) {
        this.errors.push('Employee Code Required.')
      }
      if (!this.employeeLoan.drAmount || !this.employeeLoan.crAmount)   {
        this.errors.push('Debit or Credit Required.')
      }
      if (!this.employeeLoan.trnDescription) {
        this.errors.push('Description Required.')
      }
      if (!this.errors.length) {
        return true
      } else {
        this.errors.unshift(
          'Fields highlighted in yellow are required, please enter following ..'
        )
      }
    },
    houseKeeping () {
      this.errors = []
    },
    async save () {
      this.checkForm()
      if (!this.errors.length) {
          this.employeeLoan.trnDate = new Date()
          this.employeeLoan.additionalInstallment = this.additionalInstallment
          await this.saveLoanTransaction(this.employeeLoan)
        this.$toasted.show(
          this.message,
          {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000
          })
          this.closeModal()
      } else {
        // console.log('Show errors!!')
        this.$toasted.show(this.errors, {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000
        })
      }
      this.houseKeeping()
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
