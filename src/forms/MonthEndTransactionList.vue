<template>
  <div class="main">
    {{this.showMETform}}
    <div id="empList" v-show="empList">
      <b-row>
        <b-col md="8" class="my-1">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="3" class="my-1">
          <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
            <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        :items="employeeList"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
      >
        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>
        <template v-slot:cell(action)="row">
          <b-button  variant="outline-secondary"
            size="sm"
            @click="details(row.item)"
          >{{ row.detailsShowing ? 'Hide' : 'Show' }} </b-button>
          <!-- <b-button v-show="row.item.empCode===100"
            size="sm"
            @click="details(row.item)"
          >{{ row.detailsShowing ? 'Hide'  : 'Show' }} </b-button> -->
        </template>
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    setActiveTab: { type: Function }
  },
  data () {
    return {
      showMET: false,
      empList: true,
      selectMode: 'single',
      selected: [],
      fields: [
        { key: 'selected', label: '' },
        {
          key: 'id',
          label: 'Employee Code',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'empName',
          label: 'Employee Name',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'profession',
          label: 'Profession',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'workDesignation',
          label: 'Designation',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: 'deptCode',
          label: 'Department',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },

        { key: 'action', label: 'Action' }
      ],
      currentPage: 1,
      perPage: 5,
      // totalRows: this.totalRows,
      pageOptions: [2, 5, 10, 15],
      // sortBy: null,
      // sortDesc: false,
      // sortDirection: "asc",
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  mounted () {
    this.fetchEmployeeList1({
      sorting: { fieldName: 'id', Sort: 'DESC' },
      filter: [{
        fieldName: 'id',
        value: ''
      }
      ]
    })
    // this.totalRows = this.employeeList.length
  },
  computed: {
    ...mapGetters(['employee', 'showMETform', 'employeeList', 'totalRows'])
  },
  methods: {
    ...mapActions(['METformDisplay', 'fetchEmployeeList1', 'fetchemployeeMET']),
    details (item) {
      console.log('call setDisplay', item.id)
      this.fetchemployeeMET(item.id)
      this.$emit('setActiveTab')
    }
  }
}
</script>
<style scoped>
.main {
  width: 95%;
  margin-left: 40px;
  margin-right: 40px;
  /* font-family: "Arial", Times, serif; */
  font-size: small;
}
.col-left {
  text-align: left;
}
.col-right {
  text-align: right;
}
</style>
