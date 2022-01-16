<template>
  <div>
      <b-row class="mt-2">
        <b-col cols="2" class="col-left">Total Loans:</b-col>
        <b-col cols="2" class="col-right">
            {{empLoanSummary.totalLoans}}
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" class="col-left">Loan Installment</b-col>
        <b-col cols="2" class="col-right">
              {{empLoanSummary.loanInstallment}}
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col cols="2" class="col-left">Total Paid</b-col>
        <b-col cols="2" class="col-right">
            {{empLoanSummary.totalPaid}}
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
    data () {
        return {

        }
    },
     computed: {
    ...mapGetters(['empLoanSummary'])
  },
  methods: {
    ...mapActions([
      'fetchEmployeeLoanInfo'
    ])
  }
}
</script>

<style>

</style>