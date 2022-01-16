<template>
  <div>
    <div>
      <b-tabs v-model="tabIndex" content-class="mt-3">
        <b-tab id="tab-calc" title="Calculation" >
          <metr  />
        </b-tab>
        <b-tab id="tab-list" title="List" >
          <metrList  v-on:setActiveTab="setActive" />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import metr from './MonthEndTransaction.vue'
import metrList from './MonthEndTransactionList.vue'
export default {
  data () {
    return {
      tabIndex: 0
    }
  },
  components: {
    metr,
    metrList
  },
  methods: {
    setActive () {
      console.log('setActive', '')
      this.tabIndex = 0
    }
  }
}
</script>
