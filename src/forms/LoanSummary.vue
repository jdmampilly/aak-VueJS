<template>
  <div class="main-div">

      <b-row class="mt-2">
        <b-col cols="2" class="col-left">
          <label>Employee Loan Summary</label>
        </b-col>
        <b-col cols="2" offset="6" class="col-left">
          <label>Payroll Summary</label>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col cols="2" class="col-left">Total Loans:</b-col>
        <b-col cols="2" class="col-right">
           <label class="form-control form-control-sm">
               {{empLoanSummary.indeminity | crAmountTotal}}
          </label >
        </b-col>
        <b-col cols="2" class="col-left">Loan Installment</b-col>
        <b-col cols="2" class="col-right">
          <label class="form-control form-control-sm">
               {{empLoanSummary.indeminity | loanInstallment}}
          </label >
        </b-col>
        <b-col cols="2" class="col-left">Indeminity</b-col>
        <b-col cols="2" class="col-right">
          <label class="form-control form-control-sm">
               {{empLoanSummary.indeminity | formatter}}
          </label >
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col cols="2" class="col-left">Total Paid</b-col>
        <b-col cols="2" class="col-right">
          <label class="form-control form-control-sm">
               {{empLoanSummary.drAmountTotal | formatter}}
          </label >
        </b-col>
        <b-col cols="2" class="col-left">Additional Installment</b-col>
        <b-col cols="2">
          <b-form-input
            class="col-right"
            type="number"
            id="input-additionalInstallment"
            v-model="empLoanSummary.additionalInstallment"
          ></b-form-input>
        </b-col>
        <b-col cols="2" class="col-left">Basic Salary</b-col>
        <b-col cols="2" class="col-right">
           <label class="form-control form-control-sm">
               {{empLoanSummary.basicSalary | formatter}}
          </label >
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col cols="2" class="col-left">Last transaction Date</b-col>
        <b-col cols="2" class="col-right">
           <label class="form-control form-control-sm">
              {{ empLoanSummary.lastTrnDate | moment("DD-MM-YYYY") }}
           </label>
        </b-col>
        <b-col cols="2" class="col-left">Total Installment</b-col>
        <b-col cols="2" class="col-right">
           <label class="form-control form-control-sm">
               {{this.totalInstallment | formatter}}
          </label >
        </b-col>
      </b-row>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      indeminity: '5500',
      basicSalary: '1800'
    }
  },
  computed: {
    ...mapGetters(['empLoanSummary']),
   totalInstallment () {
        return (parseFloat(this.empLoanSummary.additionalInstallment) + parseFloat(this.empLoanSummary.loanInstallment)).toFixed(3)
    }
  },
   filters: {
    formatter: function (value) {
      return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 3
      }).format(value)
    }
  },
  methods: {
    // ...mapActions([''])
  },
  mounted () {
    console.log('mounted loan summary')
  }
}
</script>
<style  scoped>
.main-div {
  width: 95%;
  margin-left: 40px;
  margin-right: 40px;
}
.no-border {
  border: 0;
  box-shadow: none; /* You may want to include this as bootstrap applies these styles too */
}

.col-left {
  text-align: left;
}
.col-right {
  text-align: right;
}
</style>
