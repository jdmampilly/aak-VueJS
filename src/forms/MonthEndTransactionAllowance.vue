<template>
  <div>
    <!-- {{ this.items }} -->
    <b-table :small="true" :items="items" :fields="fields" :borderless="true">
      <!-- <template v-slot:cell(action)="row">
            <b-button size="sm" @click="addItem(row.items)">{{ '+' }}</b-button>
      </template> -->
      <template v-slot:cell(description)="row">
        <b-form-input
          class="col-left form-control form-control-sm"
          v-model="row.item.description"
        />
      </template>
      <template v-slot:cell(otherAllowance)="row">
        <b-form-input
          class="col-right form-control form-control-sm"
          type="number"
          v-model="row.item.otherAllowance"
        />
      </template>
      <template slot="bottom-row">
        <td class="row-background form-control form-control-sm">
          <h6>Total</h6>
        </td>
        <td class="col-right row-background">{{ this.t1.toFixed(3) }}</td>
      </template>
    </b-table>
    <button class="mr-1" variant="primary" @click="AddItemRow()">
      Add Row
    </button>
    <button class="mr-1" variant="danger" @click="RemoveItemRow()">
      Remove Row
    </button>
  </div>
</template>
<script>
// const items = []
import { mapActions, mapGetters } from "vuex"
export default {
  props: {
    empCode: {},
    trnYear: {},
    trnMonth: {},
  },
  data() {
    return {
      items: [{description: '' , otherAllowance: 0 }],
      fields: [
        {
          key: "description",
          label: "Description",
          class: "text-left",
        },
        {
          key: "otherAllowance",
          label: "Other Allowance",
          class: "text-right th.sm",
        },
      ],
    }
  },
  computed: {
    ...mapGetters(["metAllowance"]),
    // allowanceState() {
    //   return this.name.length > 2 ? true : false;
    // }
    // t1 () {
    //   return this.items.reduce((accum, item) => {
    //     return accum + parseFloat(item.otherAllowance)
    //   }, 0.0)
    //   return 0
    // },
    t1: function () {
      return this.items.reduce(function (a, c) {
        return a + Number(c.otherAllowance || 0)
      }, 0)
    },
  },
  created() {
    // const source = {  empCode: this.empCode, transactionMonth: this.trnMonth, description: '' , otherAllowance: 0  };
    // Object.assign(this.items, source);
  },
  methods: {
    ...mapActions(["addRowMetAllowance"]),
    // addItem (x) {
    //   console.log('Item Row add' + x.description)
    // },
    AddItemRow: function () {
      this.items.push({ description: "", otherAllowance: 0 })
    },
    RemoveItemRow: function () {
      this.items = [{}]
    },
  },
   watch: {
    items: {
      handler: function () {
        this.items[0].empCode= 1633
        for (var i=0; i< this.items.length; i++){
           this.items[i].empCode= this.empCode
           this.items[i].trnYear = this.trnYear
           this.items[i].trnMonth= this.trnMonth
        } 
        this.$emit("allowance", this.items)
      }
    }
  }
};
</script>
<style scoped>
.col-left {
  text-align: left
}
.col-right {
  text-align: right
}
.row-background {
  background-color: darkgray
}
</style>
