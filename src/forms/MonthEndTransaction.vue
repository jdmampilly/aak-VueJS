<template>
  <div class="main">
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
      <b-col cols="1" class="col-left">Code</b-col>
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
                :fetchItem="fetchemployeeMET"
                @fetchD="fetchEmployeeList"
                :items="employeeList"
                :reset="defaultState"
              />
            </template>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="1"  class="col-left">Name</b-col>
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
          <b-col cols="3" offset="2">
            <b-form-input
              :readonly="true"
              class="col-right form-control form-control-sm"
              v-model="employeeMET.basicSalary"
              placeholder
            ></b-form-input>
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
            <b-form-input
              :readonly="true"
              class="col-right form-control form-control-sm"
              v-model="salary"
              placeholder
            ></b-form-input>
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
            {{ot1Amount}}
            <!-- <b-form-input
              :readonly="true"
              class="col-right form-control form-control-sm"
              v-model="ot1Amount"
              placeholder
            ></b-form-input> -->
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
            <b-form-input
              :readonly="true"
              class="col-right form-control form-control-sm"
              v-model="ot2Amount"
              placeholder
            ></b-form-input>
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
            <b-form-input
              :readonly="true"
              class="col-right form-control form-control-sm"
              v-model="nsAmount"
              placeholder
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Rent Allowance</b-col>
          <b-col cols="3" offset="2">
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.rentAllowance"
              type="number"
              placeholder
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Travel Allowance</b-col>
          <b-col cols="3" offset="2">
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.travelAllowance"
              type="number"
              placeholder
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Special Allowance</b-col>
          <b-col cols="3" offset="2">
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.spageAllowance"
              type="number"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="6">
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Loan deduction</b-col>
          <b-col cols="3" offset="2">
            <b-form-input
              id="loan"
              class="col-right form-control form-control-sm"
              v-model="employeeMET.loanDeduction"
              type="number"
              v-b-popover.hover.top="this.loanDetails"
              title="Loan Information"
            ></b-form-input>
          </b-col>
          <b-button @click="toggleLoanInfo()" variant="link" size="sm">
            <i class="fas fa-info">Loan information</i>
          </b-button>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Housing Bank loan</b-col>
          <b-col cols="3" offset="2">
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.housingBankLoan"
              type="number"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="3" class="col-left">Gosi Amount</b-col>
          <b-col cols="3" offset="2">
            <b-form-input
              class="col-right form-control form-control-sm"
              v-model="employeeMET.gosiAmount"
              type="number"
            ></b-form-input>
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
            <b-form-input
              :readonly="true"
              class="col-right form-control form-control-sm"
              v-model="lateHoursAmount"
              placeholder
            ></b-form-input>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <hr />
    <b-row class="mt-1">
      <b-col cols="6" class="col-left">
        <MonthEndTransactionAllowance 
        :empCode=this.employeeMET.empCode
        :trnYear=this.employeeMET.trnYear
        :trnMonth=this.employeeMET.trnMonth
        @allowance="getAllowance"
        />
      </b-col>
      <b-col cols="6" class="col-left">
        <MonthEndTransactionAllowance />
      </b-col>
    </b-row>
    <hr />
    <b-row class="mt-1">
      <b-col cols="2" class="col-left">Salary Payable</b-col>
      <b-col cols="3">
        {{netSalary}}
        <!-- <b-form-input
          :readonly="true"
          class="col-left form-control form-control-sm"
          v-model="netSalary"
          placeholder
        ></b-form-input> -->
      </b-col>
      <b-col offset="5">
        <b-button class="mr-1" variant="success"  @click="submit()">Submit</b-button>
        <b-button variant="outline-primary" @click="closeForm()"
          >Clear</b-button
        >
      </b-col>
    </b-row>
    <hr />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MonthEndTransactionAllowance from './MonthEndTransactionAllowance.vue'
import searchSm from '../components/SearchSm.vue'
export default {
  props: {
    setDisplay: { type: Function },
    currentMonth: {}
  },
  data () {
    return {
      loanDetails: {},
      loanInfo: false,
      loanAmount: 20000,
      loanInstallment: 500,
      allowances: [],
      searchEmp: {
        attr1: { name: 'id', label: 'Employee Code' },
        attr2: { name: 'empName', label: 'Employee Name' }
      }
    }
  },
  mounted () {
    // this.getEmployeeSalaryTransaction()
  },
  components: {
    MonthEndTransactionAllowance,
    searchSm
  },
  computed: {
    ...mapGetters([
      'employeeMET',
      'showMETform',
      'message',
      'emplist',
      'employeeList',
      'fetchStartRec'
    ]),
    netSalary: function () {
      return parseFloat(this.salary || 0) + parseFloat(this.ot1Amount || 0) 
    },
    salary: function () {
      return (
        (parseFloat(this.employeeMET.attendance || 0) *
          parseFloat(this.employeeMET.basicSalary || 0)) /
        30
      ).toFixed(3)
    },
    ot1Amount: function () {
      return (parseFloat(this.employeeMET.ot1 || 0) * parseFloat(this.ot1Rate || 0)).toFixed(
        3
      )
    },
    ot2Amount: function () {
      return (parseFloat(this.employeeMET.ot2 || 0) * parseFloat(this.ot2Rate || 0)).toFixed(
        3
      )
    },
    nsAmount: function () {
      return (
        parseFloat(this.employeeMET.nightShift || 0) * parseFloat(this.nsRate || 0)
      ).toFixed(3)
    },
    lateHoursAmount: function () {
      return (
        (-1 *
          parseFloat(this.employeeMET.lateHours || 0) *
          parseFloat(this.employeeMET.basicSalary || 0)) /
        240
      ).toFixed(3)
    }
  },
  methods: {
    ...mapActions(['METformDisplay', 'fetchemployeeMET', 'defaultState', 'fetchEmployeeList']),
    toggleLoanInfo () {
      // this.loanInfo = !this.loanInfo
    },
     getAllowance: function (x) {
       this.allowances = x
    },
    async getEmployee () {
      await this.fetchemployeeMET(this.employeeMET.empCode)
      if (this.message.length !== 0) {
        this.$toasted.show(this.message, {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000
        })
      }
    },
    submit () {
       console.log(JSON.stringify(this.allowances))
    },
    closeForm () {
      // console.log('clear Form')
      this.defaultState()
    }
  }
}
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
.info {
  color: red;
}
</style>
