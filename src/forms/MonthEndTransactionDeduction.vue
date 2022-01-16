<template>
  <div>
    <b-table :small="true" :items="metDeduction" :fields="fields" :borderless="true">
      <template v-slot:cell(description)="row">
        <b-form-input
          class="col-left form-control form-control-sm"
          v-model="row.item.description"
        />
      </template>
      <template v-slot:cell(otherDeduction)="row">
        <b-form-input
          class="col-right form-control form-control-sm"
          type="number"
          v-model="row.item.otherDeduction"
        />
      </template>
      <template slot="bottom-row">
        <td class="row-background form-control form-control-sm">
          <h6>Total other deductions</h6>
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
    trnMonth: {}
  },
  data() {
    return {
      // items: [{description: '' , otherDeduction: 0 }],
      fields: [
        {
          key: "description",
          label: "Description",
          class: "text-left",
        },
        {
          key: "otherDeduction",
          label: "Other Deduction",
          class: "text-right th.sm",
        },
      ],
    }
  },
  computed: {
    ...mapGetters(["metDeduction"]),
    t1: function () {
      return this.metDeduction.reduce(function (a, c) {
        return a + Number(c.otherDeduction || 0)
      }, 0)
    },
  },
  created() {
      this.items = [{}]
  },
  methods: {
    ...mapActions(["addRowMetDeduction"]),
    // addItem (x) {
    //   console.log('Item Row add' + x.description)
    // },
    AddItemRow: function () {
      this.metDeduction.push({ description: "", otherDeduction: 0 })
    },
    RemoveItemRow: function () {
     this.metDeduction.splice(0, this.metDeduction.length)
    },
  },
   watch: {
     t1: {
      handler: function () {
        for (var i=0; i< this.metDeduction.length; i++){
           this.metDeduction[i].empCode= this.empCode
           this.metDeduction[i].trnYear = this.trnYear
           this.metDeduction[i].trnMonth= this.trnMonth
        } 
        this.$emit("deduction", this.metDeduction)
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
