<template>
  <div>
     <!-- <b-modal id="modal-LH" size="xl" hide-header-close hide-footer> -->
    <b-row class="ml-1">
      <b-button @click = 'addTrans()'>Add Transaction</b-button>
    </b-row>
      <h5>Loan Activity</h5>

    <!-- <div class="align-left pad-left">Name: {{empName}}</div> -->
    <div>
      <b-table
        head-variant="light"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
      >
        <template slot="bottom-row">
          <td>
            <h4>
              <b-badge>Total:</b-badge>
            </h4>
          </td>
          <td></td>
          <td></td>

          <!-- this is a computed prop that adds up all the expenses in the visible rows -->
          <td class="text-right">{{ (this.t1) }}</td>
          <td class="text-right">{{ (this.t2) }}</td>

          <!-- <td></td> -->
        </template>
        >
      </b-table>
      <hr />
      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
    <addLoan/>
     <!-- </b-modal> -->
  </div>
</template>
<script>
// import moment from "moment";
import addLoan from './AddLoan.vue'
const items = []
export default {
  data () {
    return {
      empName: 'Bob Jack',
      items: [
        {
          empCode: '100',
          id: '1',
          transactionDate: '01/02/2015',
          voucherNo: '12',
          loanAmount: '100',
          amountPaid: '0',
          transactionDescription: 'test1',
          bankCode: ''
        },
        {
          empCode: '100',
          id: '2',
          transactionDate: '01/02/2015',
          voucherNo: '13',
          loanAmount: '110',
          amountPaid: '0',
          transactionDescription: 'test2',
          bankCode: ''
        },
        {
          empCode: '100',
          id: '3',
          transactionDate: '01/02/2015',
          voucherNo: '14',
          loanAmount: '200',
          amountPaid: '0',
          transactionDescription: 'test3',
          bankCode: ''
        },
        {
          empCode: '100',
          id: '4',
          transactionDate: '01/02/2015',
          voucherNo: '15',
          loanAmount: '0',
          amountPaid: '30',
          transactionDescription: 'test4',
          bankCode: ''
        },
        {
          empCode: '100',
          id: '5',
          transactionDate: '01/02/2015',
          voucherNo: '16',
          loanAmount: '0',
          amountPaid: '50',
          transactionDescription: 'test5',
          bankCode: ''
        },
        {
          empCode: '100',
          id: '6',
          transactionDate: '01/02/2015',
          voucherNo: '17',
          loanAmount: '100',
          amountPaid: '0',
          transactionDescription: 'test6',
          bankCode: ''
        },
        {
          empCode: '100',
          id: '7',
          transactionDate: '01/02/2015',
          voucherNo: '18',
          loanAmount: '60',
          amountPaid: '0',
          transactionDescription: 'test7',
          bankCode: ''
        }
      ],
      fields: [
        {
          key: 'id',
          label: 'Id',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'transactionDate',
          label: 'Transaction Date',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'voucherNo',
          label: 'Voucher No',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'loanAmount',
          label: 'Loan Amount',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-right'
        },
        {
          key: 'amountPaid',
          label: 'Paid',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-right'
        },
        {
          key: 'transactionDescription',
          label: 'Description',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'bankCode',
          label: 'Bank Code',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [5, 10, 15],
      // sortBy: null,
      // sortDesc: false,
      // sortDirection: "asc",
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  computed: {
    t1 () {
      return this.items.reduce((accum, item) => {
        return accum + parseFloat(item.loanAmount)
      }, 0.0)
    },
    t2 () {
      return this.items.reduce((accum, item) => {
        return accum + parseFloat(item.amountPaid)
      }, 0.0)
    }
  },
  components: {
    addLoan
  },
  methods: {
    onRowSelected (items) {
      this.selected = items
      // alert(this.selected[0].requestNo);
    },
    async addTrans () {
      console.log('add trans')
      this.$bvModal.show('bv-modal-addLoan')
    }
  }
}
</script>
<style scoped>
.main-div {
  width: 98%;
}
body {
  padding: 1rem;
}
.pad-left {
  padding-left: 30px;
}
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
.button-style {
  margin: 5px;
}
.sample {
  border: 2px solid #a1a1a1;
  padding: 10px 40px;
  background: #dddddd;
}
</style>
