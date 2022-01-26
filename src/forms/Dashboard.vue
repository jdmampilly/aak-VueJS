<template>
  <div>
    <b-card no-body>
      <b-tabs pills card vertical >
        <b-tab  title="Home" active
          ><b-card-text > <home /> </b-card-text
        ></b-tab>
        <b-tab title="Employee List"
          ><b-card-text> <employee-list /> </b-card-text
        ></b-tab>
        <b-tab title="Leaves">
          <b-card-text>
            <leaveHistory />
          </b-card-text>
        </b-tab>
        <b-tab title="Loans">
          <b-card-text>
          <employeeLoanHistory/>>
          </b-card-text></b-tab>
        <b-tab title="Salary">
          <b-card-text>
            <salary />
          </b-card-text>
        </b-tab>
        <b-tab title="Reports">
          <b-card-text>
            <!-- <monthEndTransactionList /> -->
          </b-card-text>
        </b-tab>
        <b-tab title="Bank Transfer">
          <b-card-text>
            <salary />
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import home from '../views/Home.vue'
import employeeList from './EmployeeList.vue'
// import loanHistory from './LoanHistory.vue'
import employeeLoanHistory from './EmployeeLoanHistory.vue'
import leaveHistory from './LeaveHistory.vue'
import salary from './Salary.vue'
// import monthEndTransactionList from './MonthEndTransactionList.vue'
export default {
  data () {
    return {}
  },
  created () {},
  components: {
    home,
    employeeList,
    // loanHistory,
    employeeLoanHistory,
    salary,
    leaveHistory
    // monthEndTransactionList
  }
}
</script>
<style  scoped>
.side-bar {
  background-color: rgb(20, 20, 19);
}
.col-left {
  text-align: left;
}
</style>>
