<template>
  <div class="main-div">
    <b-row class="mt-1">
      <b-col cols="1" class="col-left">
        <label for="input-id">Id:</label>
      </b-col>
      <b-col cols="2">
        <b-form-input
          class="form-control form-control-sm"
          id="input-id"
          v-model="sample.id"
          placeholder="Id"
          :readonly="true"
        ></b-form-input>
      </b-col>
    </b-row>
    <!-- Select -->
    <b-row class="mt-1">
      <b-col cols="1" class="col-left">
        <label for="input-select">Select:</label>
      </b-col>
      <b-col cols="1">
        <b-form-select
          class="form-control-sm styleLine"
          tabindex="1"
          v-model="sample.selectId"
          :options="optSample"
          required
        ></b-form-select>
      </b-col>
    </b-row>
    <!-- Date -->
    <b-row class="mt-1">
      <b-col cols="1" class="col-left">
        <label for="input-date">Date:</label>
      </b-col>
      <b-col cols="2">
        <datepicker
          placeholder="Select Date"
          v-model="sample.date"
          format="dd/MM/yyyy"
          input-class="form-control form-control-sm styleLine"
        ></datepicker>
      </b-col>
    </b-row>
    <!-- NumberFormat -->
    <b-row class="mt-1">
      <b-col cols="1" class="col-left">
        <label for="input-Number">Number/Numeric:</label>
      </b-col>
      <b-col cols="1" style="padding-left: 13px; padding-right: 1">
        <template>
          <vue-numeric
            class="form-control form-control-sm styleLine col-right"
            style="padding-left: 0px"
            tabindex="74"
            placeholder
            separator=","
            :precision="3"
            v-model="sample.number"
          ></vue-numeric>
        </template>
      </b-col>
      <!-- Totals -->
      <b-row class="mt-1">
        <b-col cols="1" class="col-left">
          <label for="total">Total:</label>
        </b-col>
        <b-col cols="1" style="">
          <p
            class="
              text-right
              calculated-value
              form-control form-control-sm
              styleLine
              col-right
            "
          >
            {{ total | formatter }}
          </p>
        </b-col>
      </b-row>
    </b-row>
    <!-- Check box -->
    <b-row class="mt-1">
      <b-col cols="2">
        <b-form-checkbox
          id="checkbox-1"
          v-model="sample.status"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
          switch
        >
          I accept the terms and use
        </b-form-checkbox>
      </b-col>
    </b-row>
    <!-- Button -->
    <b-row class="mt-1">
      <b-col cols="2">
        <b-button class="button-style" variant="primary" @click="toggleBusy"
          >Toggle Busy State</b-button
        >
      </b-col>
    </b-row>
    <!-- Date/calender -->
    <b-row class="mt-1">
      <b-col cols="1" class="col-left">
        <label for="datepicker">Date:</label>
      </b-col>
      <b-col cols="2">
        <datepicker
          placeholder="Select Date"
          v-model="sample.date"
          format="dd/MM/yyyy"
          input-class="form-control form-control-sm styleLine"
        ></datepicker>
      </b-col>
    </b-row>
    <!-- Badge -->
    <b-row class="mt-1">
      <b-col cols="1">
        <b-badge variant="primary">Primary</b-badge>
      </b-col>
    </b-row>
    <!-- Show busy -->
    <div v-show="isBusy">
      <template>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <h4><strong>Please wait...</strong></h4>
        </div>
      </template>
    </div>
    <!-- Side bar / help -->
    <b-row class="mt-1">
      <b-col cols="2">
        <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
      </b-col>
    </b-row>
    <div>
      <b-sidebar id="sidebar-1" title="Sidebar" shadow>
        <div class="px-3 py-2">
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </div>
      </b-sidebar>
    </div>
    <!-- SearchBasic -->
    <!-- <b-form-group
      id="sId"
      label="Search"
      label-for="searchId"
      label-align="left"
    >
      <b-input-group>
        <b-form-input
          class="form-control form-control-sm styleLine input-required"
          id="searchId"
          v-model="sample.id"
        ></b-form-input>
        <template v-slot:append>
          <SearchBasic
            :fetchItem="fetchSearchData"
            @fetchD="fetchSearchList"
            :items="searchItemList"
            :fields="searchListFields"
          />
        </template>
      </b-input-group>
    </b-form-group> -->
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import VueNumeric from 'vue-numeric'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['myprop'],
  data () {
    return {
      isBusy: false,
      sample: {},
      t1: 0,
      t2: 0,
      optSample: [
        { text: 'Sample 1', value: '1' },
        { text: 'Sample 2', value: '2' }
      ],
      searchListFields: [
        {
          key: 'id',
          label: 'User Id',
          class: 'text-left',
          sortable: true,
          sortDirection: 'desc'
        }
      ]
    }
  },
  created () {},
  mounted () {},
  components: {
    Datepicker,
    VueNumeric
  },
  filters: {
    formatter: function (value) {
      if (isNaN(value)) {
        return 0
      } else {
        return new Intl.NumberFormat(undefined, {
          minimumFractionDigits: 3
        }).format(value)
      }
    }
  },
  watch: {},
  computed: {
    ...mapGetters([]),
    total: function () {
      return parseFloat(this.t1 || 0) + parseFloat(this.t2 || 0)
    }
  },
  methods: {
    ...mapActions([]),
    toggleBusy () {
      this.isBusy = !this.isBusy
    }
  }
}
</script>

<style scoped>
.main-div {
  width: 90%;
  font-size: small;
  font-family: Tahoma;
  margin: auto;
}
.center {
  text-align: center;
}
.col-right {
  text-align: right;
}
.col-left {
  text-align: left;
}
.div-border {
  border: 5cm;
}
input:invalid {
  border-color: red;
  background-color: rgb(243, 243, 203);
}
input:valid {
  border-color: rgb(125, 126, 125);
}
.error-message {
  display: block;
}
.button-style {
  margin: 5px;
}
.select-style {
  width: 240px;
}
.calculated-value {
  background-color: #d9dcdf;
}
</style>
