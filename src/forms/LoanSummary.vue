<template>
  <div class="main-div">
      <b-row class="mt-2">
        <b-col cols="2" class="col-left">
          <!-- <label><h6>Loan Summary</h6></label> -->
          <b-badge variant="warning"><h6>Loan Summary</h6></b-badge>
        </b-col>
        <b-col cols="2" offset="6" class="col-left">
          <!-- <label><h6>Payroll Summary</h6></label> -->
            <b-badge  variant="warning"><h6>Payroll Summary</h6></b-badge>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col cols="2" class="col-left">Total Loans:</b-col>
        <b-col cols="2" class="col-right">
           <label class="form-control form-control-sm">
               {{empLoanSummary.crAmountTotal  | formatter}}
          </label >
        </b-col>
        <b-col cols="2" class="col-left">Loan Installment</b-col>
        <b-col cols="2" class="col-right">
          <label class="form-control form-control-sm">
               {{empLoanSummary.loanInstallment | formatter}}
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
            v-model="installmentAdditional"
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
 props: ['myprop'],
  data () {
    return {
      installmentAdditional: 0
    }
  },
  computed: {
    ...mapGetters(['empLoanSummary']),
   totalInstallment () {
        return (parseFloat(this.installmentAdditional) + parseFloat(this.empLoanSummary.loanInstallment)).toFixed(3)
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
  },
    watch: {
    installmentAdditional: {
      handler: function () {
        console.log('in watch')
       this.$emit("calculateAdditionalInstallment", this.installmentAdditional);
      },
    },
  },
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
