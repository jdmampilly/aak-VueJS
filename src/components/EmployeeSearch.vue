<template>
  <div>
    <b-button @click="show=true" variant="link" size="sm">
      <i class="fas fa-search">?</i>
    </b-button>

    <b-modal size="xl" v-model="show" title="Search..">
      <b-container fluid>
        <b-table
          small
          show-empty
          stacked="md"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="0"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          @sort-changed="foo"
        >
          <template slot="top-row">
            <td>
              <b-form-input v-model="s1" placeholder="s1"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="s2" placeholder="s2"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="s3" placeholder="s3"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="s4" placeholder="s4"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="s5" placeholder="s5"></b-form-input>
            </td>
            <!-- <td>
              <b-form-input v-model="s6" placeholder></b-form-input>
            </td>-->

            <td>
              <b-button @click="search_text()" variant="outline-primary">Filter</b-button>
            </td>
          </template>
          <template slot="name" slot-scope="row">{{ row.value.first }} {{ row.value.last }}</template>

          <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="details(row.item.id)">{{ 'Select' }}</b-button>
          </template>

          <template slot="row-details" slot-scope="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>
        </b-table>
        <b-pagination :total-rows="totalRows" v-model="currentPage" :per-page="perPage"></b-pagination>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
// import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
const items = []
export default {
  data () {
    return {
      show: false,
      items: items,
      i: [],
      s1: '',
      s2: '',
      s3: '',
      s4: '',
      s5: '',
      s6: '',
      startRec: 0,
      transactionStatus: '',

      searchData: {
        sorting: { fieldName: 'id', Sort: 'ASC' },
        filter: [
          {
            fieldName: 'id',
            value: ''
          }
        ]
      },
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'empCode',
          label: 'Employee Code',
          sortable: true,
          class: 'text-left',
          sortDirection: 'desc'
        },
        {
          key: 'empName',
          label: 'Name',
          sortable: true,
          class: 'text-left',
          sortDirection: 'desc'
        },
        {
          key: 'nationality',
          label: 'Nationality',
          sortable: true,
          class: 'text-left',
          sortDirection: 'desc'
        },
        {
          key: 'workDesignation',
          label: 'Designation',
          sortable: true,
          class: 'text-left',
          sortDirection: 'desc'
        },
        {
          key: 'basicSalary',
          label: 'Basic Salary',
          sortable: true,
          class: 'text-left',
          sortDirection: 'desc'
        },
        // { key: "isActive", label: "is Active" },
        { key: 'actions', label: 'Actions' }

        // { key: "isActive", label: "is Active" },
        // { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: this.totalItems,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      search: { filter: null, text: '' },
      modalInfo: { title: '', content: '' }
    }
  },
  created () {},

  async mounted () {
    this.fetchDataFiltered(this.searchData).catch(error => {
      console.error(error)
    })
  },
  destroyed () {
    this.items = {}
  },

  computed: {
    ...mapGetters(['employee']),
    // ...mapState({
    //   user: state => state.user,
    //   tender: state => state.tender
    // }),
    sortOptions () {
      // Create an options list from our fields
      console.log('Sort')
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  methods: {
    ...mapActions(['getEmployee']),
    foo (e) {
      this.searchData = {
        sorting: {
          fieldName: e.sortBy,
          Sort: e.sortDesc === true ? 'DESC' : 'ASC'
        },
        filter: [
          {
            fieldName: 'empCode',
            value: this.s1
          },
          {
            fieldName: 'empName',
            value: this.s2
          },

          {
            fieldName: 'nationality',
            value: this.s4
          },
          {
            fieldName: 'workDesignation',
            value: this.s5
          }
        ]
      }
      this.fetchDataFiltered(this.searchData).catch(error => {
        console.log('start record' + this.start)
        console.error(error)
      })
      this.sortBy = e.sortBy
    },
    search_text () {
      console.log('this.search.text')

      this.searchData = {
        sorting: { fieldName: 'id', Sort: 'ASC' },
        filter: [
          {
            fieldName: 'empCode',
            value: this.s1
          },
          {
            fieldName: 'empName',
            value: this.s2
          },

          {
            fieldName: 'nationality',
            value: this.s4
          },
          {
            fieldName: 'workDesignation',
            value: this.s5
          }
        ]
      }

      this.fetchDataFiltered(this.searchData).catch(error => {
        console.log('start record' + this.start)
        console.error(error)
      })
    },
    async fetchDataFiltered (data) {
      console.log('inside fetchDataFiltered:' + data.sorting.fieldName)
      // const url =
      //   "http://01-191294:8080/vuejs_tco/restResources" +
      //   `/assessment/getAssessments1/${this.startRec}/${this.perPage}`;

      if (this.currentPage === 1) {
        this.startRec = 0
      } else {
        this.startRec = this.currentPage + this.perPage - 2
        console.log('startRec:' + this.startRec)
      }
      const url =
        process.env.VUE_APP_API_URL +
        `/fetchEmployeeList1/${this.startRec}/${this.perPage}`
      axios
        .post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.items = response.data
          this.totalRows = parseInt(response.headers['x_total_count'])
          console.log(response.headers['x_total_count'])
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    async details (item) {
      this.getEmployee(item).then(() => {
        // this.fetchDirectorate(this.tender.directorateCode)
        // this.fetchSection(this.tender.submittedSectionCode)
      })
      this.show = false
    },

    // loadAssessment: function(x, y) {
    //   console.log("here in load assessment..." + x);
    //   console.log("assessment status in listAssessment ..." + y);
    //   //  alert("Assessment status: "+y)
    //   // console.log("item value:" + this.items[x]);
    //   this.$router.push({
    //     // name: "assessment1",
    //     name: "tcoassessment",
    //     params: { Pid: "A" + x }
    //   });
    //   this.$store.dispatch("GET_FILES", x);
    //   this.$store.commit("SetAssessmentStatus", y);
    // },

    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      console.log('called onFiltered')
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  watch: {
    currentPage: {
      handler: function () {
        console.log('in currentPage watch')
        this.fetchDataFiltered(this.searchData).catch(error => {
          console.log('start record' + this.start)
          console.error(error)
        })
      }
    }
  }
}
</script>

<style>
</style>
