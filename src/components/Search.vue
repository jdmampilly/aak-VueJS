<template>
  <div>
    <b-button id="sh" @click="show=true" variant="link" size="sm" >
      <i class="fas fa-search"></i>
    </b-button>
    <b-modal size="xl" v-model="show" title="Search..">
      <b-container fluid>
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
            <b-form-group label-cols-sm="4" label="Per page" class="mb-1">
              <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table
          small
          show-empty
          stacked="md"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <template slot="name" slot-scope="row">{{ row.value.first }} {{ row.value.last }}</template>
          <template v-slot:cell(action)="row">
            <b-button size="sm" @click="details(row.item.id)">{{ 'Select' }}</b-button>
          </template>
        </b-table>
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
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    column1Key: {},
    column1label: {},
    column2Key: {},
    column2label: {},
    column3Key: {},
    column3label: {},
    column4Key: {},
    column4label: {},
    items: {},
    totalRows: Number,
    fetchItem: { type: Function }
  },
  data () {
    return {
      show: false,
      x: 0,
      s1: '',
      s2: '',
      startRec: 0,
      // totalRows: this.items.length,
      // totalRows: 0,
      fields: [
        {
          key: this.column1Key,
          label: this.column1label,
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: this.column2Key,
          label: this.column2label,
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: this.column3Key,
          label: this.column3label,
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
        },
        {
          key: this.column4Key,
          label: this.column4label,
          sortable: true,
          sortDirection: 'desc',
          class: 'text-left'
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
    this.$emit('fetchD')
    // this.totalRows = this.items.length
  },
  filters: {
    formattedDate: function (value) {
      if (!value) return ''
      value = value.toString()
      return moment(String(value)).format('DD-MM-YYYY')
    }
  },

  methods: {
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    details (item) {
      this.fetchItem(item)
      this.show = false
    }
  }
}
</script>
