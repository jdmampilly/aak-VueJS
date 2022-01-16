<template>
  <div>
    <b-container fluid>
      <b-table
        small
        selectable
        :select-mode="selectMode"
        selected-variant="active"
        @row-selected="onRowSelected"
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
        @sort-changed="searchFilter"
      >
        <template slot="top-row">
          <td>
            <b-form-input v-model="s1" placeholder></b-form-input>
          </td>
          <td>
            <b-form-input v-model="s2" placeholder></b-form-input>
          </td>
          <td>
            <b-form-input v-model="s3" placeholder></b-form-input>
          </td>
          <td>
            <b-form-input v-model="s4" placeholder></b-form-input>
          </td>
          <td>
            <b-form-input v-model="s5" placeholder></b-form-input>
          </td>
          <td>
            <b-form-input v-model="s6" placeholder></b-form-input>
          </td>
          <td>
            <b-button @click="search_text()" variant="outline-primary">Filter</b-button>
          </td>
        </template>
        <template v-slot:cell(action)="row">
            <b-button variant="outline-primary" size="sm" @click="row.toggleDetails">{{ row.detailsShowing ? '-' : '+' }}</b-button>
        </template>
          <template v-slot:cell(selected)="{ rowSelected }">
            <template v-if="rowSelected">
              <span class="sr-only">Selected</span>
            </template>
            <template v-else>
              <span class="sr-only">Not selected</span>
            </template>
          </template>
         <template v-slot:row-details="row">
            <b-card class="bg-light text-primary">
              <b-row class="mb-1">
                <b-col cols="2" class="align-left">
                  <b>{{moreDetails.attr1.label}}:</b>
                </b-col>
                <b-col cols="2" class="align-left">{{ row.item[moreDetails.attr1.name]}}</b-col>
                <b-col cols="2" class="align-left">
                  <b>{{moreDetails.attr2.label}}:</b>
                </b-col>
                <b-col cols="3" class="align-left">{{ row.item[moreDetails.attr2.name] }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="2" class="align-left"><b>{{moreDetails.attr3.label}}:</b></b-col>
                <b-col cols="2" class="align-left">{{row.item[moreDetails.attr3.name]}}</b-col>
                <b-col cols="2" class="align-left"><b>{{moreDetails.attr4.label}}:</b></b-col>
                <b-col cols="2" class="align-left">{{row.item[moreDetails.attr4.name]}}</b-col>
              </b-row>
              <b-row>
                <b-col cols="2" class="align-left"><b>{{moreDetails.attr5.label}}:</b></b-col>
                <b-col cols="2" class="align-left">{{row.item[moreDetails.attr5.name]}}</b-col>
                <b-col cols="2" class="align-left">{{ row.item.creationDate | formattedDate }}</b-col>
                <b-col cols="2" class="align-left">
                  <b>{{moreDetails.attr6.label}}:</b>
                </b-col>
                 <b-col cols="2" class="align-left">
                    {{row.item[moreDetails.attr6.name]}}
                   </b-col>
              </b-row>
            </b-card>
          </template>
        <template slot="name" slot-scope="row">{{ row.value.first }} {{ row.value.last }}</template>
      </b-table>
      <hr/>
      <b-pagination :total-rows="totalRows" v-model="currentPage" :per-page="perPage"></b-pagination>
      <template >
         <div class="d-flex justify-content-start">
          <b-button v-if="showNewButton" size="sm" variant="primary" class="button-style" @click="openNewForm()">{{newButtonLabel}}</b-button>
          <b-button v-if="showDetailsButton" size="sm" variant="primary" class="button-style" @click="details()">{{this.detailBtnLabel}}</b-button>
          <b-col></b-col>
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right"
            @click="refreshData"
          >Refresh</b-button>
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right"
            @click="resetFilter"
          >Clear Filter</b-button>
          <!-- <b-button variant="primary" size="sm" @click="show=false">Close</b-button> -->
           <b-button
            size="sm"
            v-if="showReturnButton"
            variant="primary"
            @click="returnButton"
            >
            Close
          </b-button>
        </div>
      </template>
    </b-container>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    listColumns: {},
    items: {},
    totalRows: Number,
    moreDetails: {},
    showReturnButton: {},
    returnButtonAction: { type: Function },
    newButtonLabel: {
      type: String,
      default: 'New'
    },
    showDetailsButton: {
      type: Boolean,
      default: true
    },
    showNewButton: {
      type: Boolean,
      default: true
    },
    detailBtnLabel: {
      type: String,
      default: 'Details'
    }
  },
  data () {
    return {
      show: true,
      x: 0,
      selectMode: 'single',
      selected: [],
      s1: '',
      s2: '',
      s3: '',
      s4: '',
      s5: '',
      s6: '',
      startRec: 0,
      searchData: {
        sorting: { fieldName: 'id', Sort: 'DESC' },
        filter: [
          {
            fieldName: 'id',
            value: ''
          }
        ]
      },
      fields: [
        {
          key: this.listColumns.attr1.name,
          label: this.listColumns.attr1.label,
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: this.listColumns.attr2.name,
          label: this.listColumns.attr2.name,
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: this.listColumns.attr3.name,
          label: this.listColumns.attr3.label,
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: this.listColumns.attr4.name,
          label: this.listColumns.attr4.label,
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },

        {
          key: this.listColumns.attr5.name,
          label: this.listColumns.attr5.label,
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left',
          formatter: 'convertText'
          // formatter (value) {
          //   return this.convertText(value, this.column5Key)
          // }
        },
        {
          key: this.listColumns.attr6.name,
          label: this.listColumns.attr6.label,
          sortable: true,
          sortDirection: 'desc',
          formatter (value) {
            return moment(value).format('DD-MM-YYYY')
          }
        },
        { key: 'action', label: 'More info' }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' },

      variants: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'light',
        'dark'
      ],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark'
    }
  },
  mounted () {
    this.$emit('fetchD', this.searchData)
  },
  filters: {
    formattedDate: function (value) {
      if (!value) return ''
      value = value.toString()
      return moment(String(value)).format('DD-MM-YYYY')
    }
  },

  methods: {
    convertText: function (value) {
      let retValue = ''
      if (!value) return ''
      value = value.toString()
      if (this.listColumns.attr5.label === 'status') {
        switch (value) {
          case 'I':
            retValue = 'In Progress'
            break
          case 'C':
            retValue = 'Created'
            break
          case 'X':
            retValue = 'Cancelled'
            break
          case 'R':
            retValue = 'Rejected'
            break
          case 'F':
            retValue = 'Completed'
            break
          default:
    // code block
        }
      } else {
        return value
      }
      return retValue
    },
    onRowSelected (items) {
      this.selected = items
    },
    setColumns () {
      this.x = this.listColumns.attr6.name
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    refreshData () {
      alert('refresh data')
      this.searchData = {
        sorting: { fieldName: this.listColumns.attr1.name, Sort: 'DESC' },
        filter: [
          {
            fieldName: this.listColumns.attr1.name,
            value: ''
          }
        ]
      }
      this.$emit('fetchD', this.searchData)
    },
    resetFilter () {
      // this.id = ''
      this.s1 = ''
      this.s2 = ''
      this.s3 = ''
      this.s4 = ''
      this.s5 = ''
      this.s6 = ''
      this.searchData = {
        sorting: { fieldName: this.listColumns.attr1.name, Sort: 'DESC' },
        filter: [
          {
            fieldName: this.listColumns.attr1.name,
            value: ''
          }
        ]
      }
      this.$emit('fetchD', this.searchData)
    },
    details () {
      console.log('Selected id:' + this.selected[0].id)
      this.$emit('OpenCurrent', this.selected[0].id)
    },
    openNewForm () {
      this.$emit('OpenNew', 0)
    },
    searchFilter (e) {
      this.searchData = {
        sorting: {
          fieldName: e.sortBy,
          Sort: e.sortDesc === true ? 'DESC' : 'ASC'
        },
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
      this.$emit('fetchD', this.searchData)
      this.sortBy = e.sortBy
    },
    search_text () {
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
      this.$emit('fetchD', this.searchData)
    },
    returnButton () {
      this.$emit('returnButtonAction')
    }
  },
  watch: {
    currentPage: {
      handler: function () {
        if (this.currentPage === 1) {
          this.startRec = 0
        } else {
          this.startRec = (this.currentPage - 1) * this.perPage
        }
        this.$emit('searchToParent', this.startRec)
        this.$emit('fetchD', this.searchData)
      }
    }
  }
}
</script>
