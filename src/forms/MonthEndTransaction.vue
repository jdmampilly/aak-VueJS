<template>
  <div class="main">
    {{this.otherAllowance}}
    <!-- {{this.otRates}} -->
    <!-- <b-row> Information:
      <span id="sp" v-show="loanInfo">
             <p class="info" >
                Loan Amount :{{this.loanAmount}}
                Installment : {{this.loanInstallment}}
             </p>
           </span>
    </b-row> -->
    <b-row class="mt-1">
      <b-col cols="1" class="col-left">Month</b-col>
      <b-col cols="1" class="col-left">
        {{ this.employeeMET.monthName }}
      </b-col>
      <b-col cols="1" offset="1" class="col-left">Year</b-col>
      <b-col cols="1" class="col-left">
        {{ this.employeeMET.trnYear }}
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col cols="1" class="col-left">Employee</b-col>
      <b-col cols="2">
        <b-form-group>
          <b-input-group>
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.empCode"
              placeholder=""
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
                :fetchItem="fetchemployeeMET1"
                @fetchD="fetchEmployeeList"
                :items="employeeList"
                :reset="defaultState"
              />
            </template>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="1" class="col-left">Name</b-col>
      <b-col cols="3" class="col-left">
        {{ this.employeeMET.empName }}
      </b-col>
      <b-col cols="4" class="col-left">
        {{ this.employeeMET.empDepartment }}
      </b-col>
    </b-row>
    <hr />
    <b-row class="mt-1">
      <b-col cols="6">
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Basic Salary</b-col>
          <b-col cols="2">
            {{ this.employeeMET.basicSalary | formatter }}
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Attendance</b-col>
          <b-col cols="2">
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.attendance"
              type="number"
              placeholder
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <b-form-text class="col-right form-control form-control-sm">
              {{ salary }}
            </b-form-text>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Ot1</b-col>
          <b-col cols="2">
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.ot1"
              type="number"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <b-form-text class="col-right form-control form-control-sm">
              {{ ot1Amount }}
            </b-form-text>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Ot2</b-col>
          <b-col cols="2">
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.ot2"
              type="number"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <b-form-text class="col-right form-control form-control-sm">
              {{ ot2Amount }}
            </b-form-text>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Night Shift</b-col>
          <b-col cols="2">
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.nightShift"
              type="number"
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <b-form-text class="col-right form-control form-control-sm">
              {{ nsAmount }}
            </b-form-text>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Rent Allowance</b-col>
          <b-col cols="3" offset="2">
            <vue-numeric
              class="form-control form-control-sm styleLine col-right group1-color"
              style="padding-left: 0px"
              tabindex="65"
              placeholder
              :minus="true"
              separator=","
              :precision="3"
              v-model="employeeMET.rentAllowance"
            ></vue-numeric>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Travel Allowance</b-col>
          <b-col cols="3" offset="2">
            <vue-numeric
              class="form-control form-control-sm styleLine col-right group1-color"
              style="padding-left: 0px"
              tabindex="65"
              placeholder
              :minus="true"
              separator=","
              :precision="3"
              v-model="employeeMET.travelAllowance"
            ></vue-numeric>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Special Allowance</b-col>
          <b-col cols="3" offset="2">
            <vue-numeric
              class="form-control form-control-sm styleLine col-right group1-color"
              style="padding-left: 0px"
              tabindex="65"
              placeholder
              :minus="true"
              separator=","
              :precision="3"
              v-model="employeeMET.spageAllowance"
            ></vue-numeric>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="6">
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Loan deduction</b-col>
          <b-col cols="3" offset="2">
            <vue-numeric
              class="form-control form-control-sm styleLine col-right group1-color"
              style="padding-left: 0px"
              tabindex="65"
              placeholder
              :minus="true"
              separator=","
              :precision="3"
              v-model="employeeMET.loanDeduction"
            ></vue-numeric>
          </b-col>
          <b-button @click="toggleLoanInfo()" variant="link" size="sm">
            <b-icon icon="exclamation-circle-fill" variant="info"></b-icon>
            <!-- <i class="fas fa-info">Loan information</i> -->
          </b-button>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Housing Bank loan</b-col>
          <b-col cols="3" offset="2">
            <vue-numeric
              class="form-control form-control-sm styleLine col-right group1-color"
              style="padding-left: 0px"
              tabindex="65"
              placeholder
              :minus="true"
              separator=","
              :precision="3"
              v-model="employeeMET.hBankLoan"
            ></vue-numeric>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Gosi Amount</b-col>
          <b-col cols="3" offset="2">
            <vue-numeric
              class="form-control form-control-sm styleLine col-right group1-color"
              style="padding-left: 0px"
              tabindex="65"
              placeholder
              :minus="true"
              separator=","
              :precision="3"
              v-model="employeeMET.gosiAmount"
            ></vue-numeric>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Late hours</b-col>
          <b-col cols="2">
            <b-form-input
              class="col-left form-control form-control-sm"
              v-model="employeeMET.lateHours"
              placeholder
            ></b-form-input>
          </b-col>
          <b-col cols="3">
            <b-form-text class="col-right form-control form-control-sm">
              {{ lateHoursAmount | formatter }}
            </b-form-text>
          </b-col>
        </b-row>
        <div class="text-info" v-show="showLoanInfo">
          <Hr />
          <b-row class="mt-1">
            <b-col cols="3" class="col-left text-info">Loans Balance</b-col>
            <b-col cols="2" class="col-right">
              {{ (empLoanSummary.crAmount - empLoanSummary.drAmount) | formatter }}
            </b-col>
          </b-row>
          <!-- <b-row class="mt-1">
            <b-col cols="3" class="col-left">Loan Paid</b-col>
            <b-col cols="2" class="col-right">
              {{ empLoanSummary.drAmount | formatter }}
            </b-col>
          </b-row> -->
          <b-row class="mt-1">
            <b-col cols="3" class="col-left">Loan Installment</b-col>
            <b-col cols="2" class="col-right">
              {{ empLoanSummary.loanInstallment | formatter }}
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col cols="3" class="col-left">Last transaction </b-col>
            <b-col cols="2" class="col-right">
              {{ empLoanSummary.lastTrnDate | moment("DD-MM-YYYY")}}
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <hr />
    <b-row class="mt-1">
      <b-col cols="6" class="col-left">
        <MonthEndTransactionAllowance
          :empCode="this.employeeMET.empCode"
          :trnYear="this.employeeMET.trnYear"
          :trnMonth="this.employeeMET.trnMonth"
          @allowance="getAllowance"
        />
      </b-col>
      <b-col cols="6" class="col-left">
         <MonthEndTransactionDeduction
          :empCode="this.employeeMET.empCode"
          :trnYear="this.employeeMET.trnYear"
          :trnMonth="this.employeeMET.trnMonth"
          @deduction="getDeduction"
        />
      </b-col>
    </b-row>
    <hr />
    <b-row class="mt-1">
      <b-col cols="2" class="col-left text-primary">
        <b-badge variant="dark" class="mt-2"><h6>Salary Payable</h6></b-badge>
      </b-col>
      <b-col cols="2" class="col-right text-primary">
        <b-badge variant="dark" class="mt-2"
          ><h6>{{ netSalary }}</h6></b-badge
        >
      </b-col>
      <b-col offset="5">
        <b-button class="mr-1" variant="success" @click="submit()"
          >Submit</b-button
        >
        <b-button variant="outline-primary" @click="closeForm()"
          >Clear</b-button
        >
      </b-col>
    </b-row>
    <hr />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import VueNumeric from "vue-numeric";
import MonthEndTransactionAllowance from "./MonthEndTransactionAllowance.vue";
import MonthEndTransactionDeduction from "./MonthEndTransactionDeduction.vue";
import searchSm from "../components/SearchSm.vue";
export default {
  props: {
    setDisplay: { type: Function },
    currentMonth: {},
  },
  data() {
    return {
      showLoanInfo: false,
      loanDetails: {},
      loanInfo: false,
      loanAmount: 20000,
      loanInstallment: 500,
      otRates: {},
      otherAllowance: 0,
      otherDeduction: 0,
      deductions: [],
      allowances: [],
      searchEmp: {
        attr1: { name: "id", label: "Employee Code" },
        attr2: { name: "empName", label: "Employee Name" },
      },
    };
  },
  mounted() {
    this.loadOTRates();
    console.log("mounted month end transactions");
  },
  components: {
    MonthEndTransactionAllowance,
    MonthEndTransactionDeduction,
    searchSm,
    VueNumeric
    // LoanSummary
  },
  computed: {
    ...mapGetters([
      "employeeMET",
      "showMETform",
      "message",
      "emplist",
      "employeeList",
      "fetchStartRec",
      "empLoanSummary",
    ]),
    netSalary() {
      return (
        parseFloat(this.salary) +
        parseFloat(this.ot1Amount) +
        parseFloat(this.ot2Amount) +
        parseFloat(this.nsAmount) +
        parseFloat(this.employeeMET.rentAllowance) +
        parseFloat(this.employeeMET.travelAllowance) +
        parseFloat(this.employeeMET.spageAllowance) -
        parseFloat(this.employeeMET.loanDeduction) -
        parseFloat(this.employeeMET.hBankLoan) -
        parseFloat(this.employeeMET.gosiAmount) +
        parseFloat(this.employeeMET.lateHours) +
        parseFloat(this.otherAllowance) -
        parseFloat(this.otherDeduction)
      ).toFixed(3);
    },
    salary: function () {
      return (
        (parseFloat(this.employeeMET.attendance || 0) *
          parseFloat(this.employeeMET.basicSalary || 0)) /
        30
      ).toFixed(3);
    },
    ot1Amount: function () {
      return (
        parseFloat(this.employeeMET.ot1 || 0) *
        parseFloat(this.otRates.otRate1 || 0)
      ).toFixed(3);
    },
    ot2Amount: function () {
      return (
        parseFloat(this.employeeMET.ot2 || 0) *
        parseFloat(this.otRates.otRate2 || 0)
      ).toFixed(3);
    },
    nsAmount: function () {
      return (
        parseFloat(this.employeeMET.nightShift || 0) *
        parseFloat(this.otRates.nightShiftAmount || 0)
      ).toFixed(3);
    },
    lateHoursAmount: function () {
      return (
        (-1 *
          parseFloat(this.employeeMET.lateHours || 0) *
          parseFloat(this.employeeMET.basicSalary || 0)) /
        240
      ).toFixed(3);
    },
  },
  filters: {
    formatter: function (value) {
      if (isNaN(value)) {
        return 0;
      } else {
        return new Intl.NumberFormat(undefined, {
          minimumFractionDigits: 3,
        }).format(value);
      }
    }
    // formatDate: function (value) {
    //   if (value) {
    //     return  moment(value).format('DD-MM-YYYY')
    //   }
    // },
  },
  methods: {
    ...mapActions([
      "METformDisplay",
      "fetchemployeeMET",
      "defaultState",
      "fetchEmployeeList",
      "fetchEmployeeLoanInfo",
      'saveEmployeeMET'
    ]),
    toggleLoanInfo() {
      // this.loanInfo = !this.loanInfo
      this.showLoanInfo = !this.showLoanInfo;
      // alert("loan info");
    },
    getAllowance: function (x) {
      this.allowances = x;
      this.otherAllowance = this.otherAllowanceTotal();
      // console.log('allowance total: ' + this.allowances.otherAllowance)
      // this.otherAllowance = this.otherAllowanceTotal()
    },
    getDeduction: function (x) {
      console.log("get deduction")
      this.deductions = x;
      this.otherDeduction = this.otherDeductionTotal();
    },
    async getEmployee() {
      await this.fetchemployeeMET(this.employeeMET.empCode);
      await this.fetchEmployeeLoanInfo(this.employeeMET.empCode);
      console.log("fetch employee");
      if (this.message.length !== 0) {
        this.$toasted.show(this.message, {
          theme: "bubble",
          position: "top-right",
          duration: 5000,
        });
      }
    },
    async fetchemployeeMET1(x) {
      await this.fetchemployeeMET(x);
      await this.fetchEmployeeLoanInfo(x);
      console.log("fetch employee1");
    },
    submit() {
      console.log(JSON.stringify(this.allowances));
      console.log(JSON.stringify(this.deductions));
      this.employeeMET.otherAllowances = this.allowances
      this.employeeMET.otherDeductions = this.deductions
      this.saveEmployeeMET(this.employeeMET)
    },
    otherAllowanceTotal() {
      return this.allowances.reduce(function (a, c) {
        return a + Number(c.otherAllowance || 0);
      }, 0);
    },
    otherDeductionTotal() {
      return this.deductions.reduce(function (a, c) {
        return a + Number(c.otherDeduction || 0);
      }, 0);
    },
    closeForm() {
      // console.log('clear Form')
      this.defaultState();
    },
    async loadOTRates() {
      const url = process.env.VUE_APP_API_URL + `/otRates`;
      const response = await fetch(url);
      this.otRates = await response.json();
      console.log(this.otRates);
    },
  },
  //    watch: {
  //    allowances: {
  //     handler: function () {
  //       this.otherAllowance= this.otherAllowanceTotal ()
  //     }
  //   }
  // }
};
</script>
<style scoped>
.main {
  width: 95%;
  margin-left: 40px;
  margin-right: 40px;
  /* font-family: "Arial", Times, serif; */
  font-size: small;
}
.col-left {
  text-align: left;
}
.col-right {
  text-align: right;
}
.col-middle {
  /* vertical-align: bottom; */
  /* padding-top: 25px;
  padding-left: 0px; */
  width: 50%;
}
.text-info {
  color: #007bff !important;
}
.text-primary {
  color: #fff;
  background-color: #343a40;
}
.info {
  color: red;
}
</style>
