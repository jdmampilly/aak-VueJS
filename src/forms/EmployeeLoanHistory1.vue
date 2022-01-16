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
export default {
  data () {
    return {
      listColumns: {
        attr1: { name: 'id', label: 'Id' },
        attr2: { name: 'empCode', label: 'Employee Code' },
        attr3: { name: 'empName', label: 'Employee Name' },
        attr4: { name: 'drAmount', label: 'Debit Amount' },
        attr5: { name: 'crAmount', label: 'Credit Amount' },
        attr6: { name: 'trnDate', label: 'Transaction Date' }
      },
      moreDetails: {
        attr1: { name: 'trnDescription', label: 'Description' },
        attr2: { name: 'trnId', label: 'Transaction Id' },
        attr3: { name: 'voucherNo', label: 'Voucher No' },
        attr4: { name: 'passage', label: 'Passage' },
        attr5: { name: '', label: 'Basic Salary' },
        attr6: { name: '', label: '' }
      }
    }
  }
}
</script>

<style>

</style>
