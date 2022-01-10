<template>
  <div>
     <span id="metCalculation" v-show="showCalculation ">
          <monthEndTransaction
           @setDisplay="displayCurrent()"
           :currentMonth=this.activeMonth
           />>
      </span>
      <span id="metList" v-show="showList">
          <monthEndTransactionList
           @setDisplay="displayCurrent()"
            v-on:getEmpCode="setEmpCode"
           />>
      </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MonthEndTransaction from './MonthEndTransaction.vue'
import MonthEndTransactionList from './MonthEndTransactionList.vue'
export default {
  data () {
    return {
      showList: false,
      showCalculation: true
    }
  },
  mounted () {
    this.fetchActiveMonth()
  },
  components: {
    MonthEndTransaction,
    MonthEndTransactionList
  },
  computed: {
    ...mapGetters(['activeMonth'])
  },
  methods: {
    ...mapActions(['fetchEmployee', 'fetchActiveMonth']),
    displayCurrent () {
      this.showList = !this.showList
      this.showCalculation = !this.showCalculation
    },
    setEmpCode (id) {
      this.fetchEmployee(id)
    }
  }
}
</script>

<style>
</style>
