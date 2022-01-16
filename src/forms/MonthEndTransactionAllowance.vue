<template>
  <div>
    <!-- {{ this.metAllowance }} -->
    <b-table
      :small="true"
      :items="metAllowance"
      :fields="fields"
      :borderless="true"
    >
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
          <h6>Total other allowance</h6>
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
import { mapGetters } from "vuex";
export default {
  props: {
    empCode: {},
    trnYear: {},
    trnMonth: {},
  },
  data() {
    return {
      // items: [{description: '' , otherAllowance: 0 }],
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
    };
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
      return this.metAllowance.reduce(function (a, c) {
        return a + Number(c.otherAllowance || 0);
      }, 0);
    },
  },
  mounted() {
//  this.items = this.metAllowance;
  },
  created() {
    this.items = [{}]
    // const source = {  empCode: this.empCode, transactionMonth: this.trnMonth, description: '' , otherAllowance: 0  };
    // Object.assign(this.items, source);
  },
  methods: {
    // ...mapActions(["addRowMetAllowance"]),
    AddItemRow: function () {
      this.metAllowance.push({ description: "", otherAllowance: 0 });
    },
    RemoveItemRow: function () {
      this.metAllowance.splice(0, this.metAllowance.length)
    },
  },
  watch: {
    t1: {
      handler: function () {
        // this.items[0].empCode= 1633
        for (var i = 0; i < this.items.length; i++) {
          this.metAllowance[i].empCode = this.empCode;
          this.metAllowance[i].trnYear = this.trnYear;
          this.metAllowance[i].trnMonth = this.trnMonth;
          // console.log('year:' + this.metAllowance[i].trnYear)
        }
        console.log("before emit t1:" + this.metAllowance);
        this.$emit("allowance", this.metAllowance);
      },
    },
  },
};
</script>
<style scoped>
.col-left {
  text-align: left;
}
.col-right {
  text-align: right;
}
.row-background {
  background-color: darkgray;
}
</style>
