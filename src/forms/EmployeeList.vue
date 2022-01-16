<template>
  <div>
    <div id="showformid" v-show="showForm">
      <masterForm />
    </div>
    <div id="showformlistid" v-show="showFormList">
      <div class="h-35 d-inline-block" style="width: 100%">
        <h5 class="align-left pad-left">Employee List</h5>
      </div>
      <baseList
        :listColumns="listColumns"
        :totalRows="totalRows"
        v-on:searchToParent="fetchStartRec"
        @fetchD="fetchEmployeeList1"
        :items="employeeList"
        :moreDetails="moreDetails"
        @OpenNew="NewPage"
        @OpenCurrent="getCurrentPage"
      />
    </div>
  </div>
</template>

<script>
import baseList from '../components/BaseList.vue'
import masterForm from './EmployeeMaster.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      listColumns: {
        attr1: { name: 'id', label: 'Employee Code' },
        attr2: { name: 'cprNo', label: 'CPR' },
        attr3: { name: 'empName', label: 'Employee Name' },
        attr4: { name: 'profession', label: 'Profession' },
        attr5: { name: 'nationality', label: 'Nationality' },
        attr6: { name: 'birthDate', label: 'Birth Date' }
      },
      moreDetails: {
        attr1: { name: 'workDesignation', label: 'Work Designation' },
        attr2: { name: 'contractType', label: 'Contract Type' },
        attr3: { name: 'gosiNo', label: 'Gosi No' },
        attr4: { name: 'passage', label: 'Passage' },
        attr5: { name: 'basicSalary', label: 'Basic Salary' },
        attr6: { name: 'passportNo', label: 'Passport No' }
      }
    }
  },
  created () {
    console.log('Created ', '')
  },
  computed: {
    ...mapGetters([
      'employeeList',
      'showForm',
      'showFormList',
      'totalRows',
      'startRec'
    ])
  },
  components: {
    baseList,
    masterForm
  },
  methods: {
    ...mapActions([
      'fetchEmployeeList1',
      'setFormDisplay',
      'defaultState',
      'setIsEditMode',
      'fetchEmployee',
      'fetchStartRec'
    ]),
    getCurrentPage: function (x) {
      this.setFormDisplay(true)
      this.setIsEditMode(false)
      this.fetchEmployee(x)
    },
    NewPage: function () {
      console.log('opening new form' + this.showForm)
      this.defaultState()
      this.setIsEditMode(true)
      this.setFormDisplay(true)
    }
    // openLoanHistory () {
    //   // this.showFormLH = true
    //   this.$bvModal.show('modal-LH')
    // }

  }
}
</script>

<style>
</style>
