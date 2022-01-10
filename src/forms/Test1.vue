<template>
    <div>
        {{loanHistoryList}}
        <b-row class="mt-1">
            <b-col cols="1" offset="2">
                <b-button @click="test()">Test</b-button>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  created () {},
  computed: {
    ...mapGetters([
      'loanHistory',
      'showForm',
      'showFormList',
      'totalRows',
      'totalLHRows',
      'startRec',
      'loanHistoryList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchLoanHistory'])
  },
  test () {
    this.searchData = {
      sorting: { fieldName: this.listColumns.attr1.name, Sort: 'DESC' },
      filter: [
        {
          fieldName: this.listColumns.attr1.name,
          value: this.s1
        },
        {
          fieldName: this.listColumns.attr2.name,
          value: this.s2
        },
        {
          fieldName: this.listColumns.attr3.name,
          value: this.s3
        },

        {
          fieldName: this.listColumns.attr4.name,
          value: this.s4
        },
        {
          fieldName: this.listColumns.attr5.name,
          value: this.s5
        },
        {
          fieldName: this.listColumns.attr6.name,
          value: this.s6
        }
      ]
    }
    this.fetchLoanHistory()
  }
}
</script>
