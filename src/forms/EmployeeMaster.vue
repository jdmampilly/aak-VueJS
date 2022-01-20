<template>
  <div class="main-div">
    <b-row>
      <h6 >Employee Master</h6>
    </b-row>
     <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <h6 class="col-left">Personal Information</h6>
      </b-card-header>

      <b-card-body>
        <b-row class="mt-1">
          <b-col cols="1" class="col-left">
            <label for="input-code">Code:</label>
          </b-col>
          <b-col cols="2">
            <b-form-input
              class="form-control form-control-sm"
              id="input-code"
              v-model="employee.id"
              placeholder="Code"
              :readonly='true'
            ></b-form-input>
          </b-col>
          <b-col cols="1" class="col-left">
            <label for="input-name">Name:</label>
          </b-col>
          <b-col cols="4">
            <b-form-input
              class="form-control form-control-sm "
              id="empName"
              v-model="employee.empName"
              placeholder="Enter your name"
              required
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="1" class="col-left">
            <label for="input-birthDate">Birth Date:</label>
          </b-col>
          <b-col cols="2">
            <datepicker
              placeholder="Select Date"
              v-model="employee.birthDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
          </b-col>
          <b-col cols="1" class="col-left">
            <label for="input-nationality">Nationality:</label>
          </b-col>
          <b-col cols="4">
            <b-form-input
              class="form-control form-control-sm"
              id="input-nationality"
              v-model="employee.nationality"
              placeholder="Enter your nationality"
            ></b-form-input>
          </b-col>
        </b-row>
        <!-- <hr /> -->
        <b-row class="mt-1">
          <b-col cols="1" class="col-left">
            <label for="input-passportNo">Passport No.:</label>
          </b-col>
          <b-col cols="2">
            <b-form-input
              class="form-control form-control-sm"
              id="input-passportNo"
              v-model="employee.passportNo"
              placeholder="passport number"
            ></b-form-input>
          </b-col>
          <b-col cols="1" class="col-left">
            <label for="input-passportIssueDate">Issue Dt:</label>
          </b-col>
          <b-col cols="2">
            <datepicker
              placeholder="Select Date"
              v-model="employee.passportIssuedDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
          </b-col>
          <b-col cols="1" class="col-left">
            <label for="input-passportExpirtyDate">Expiry Date:</label>
          </b-col>
          <b-col cols="2">
             <datepicker
              placeholder="Select Date"
              v-model="employee.passportExpiryDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="1" class="col-left">
            <label for="input-cprNo">Cpr Number:</label>
          </b-col>
          <b-col cols="2">
            <b-form-input
              class="form-control form-control-sm"
              id="input-cprNo"
              v-model="employee.cprNo"
              placeholder="CPR no"
              required
            ></b-form-input>
          </b-col>
          <b-col cols="1" class="col-left">
            <label for="input-cprIssueDate">Issue Date:</label>
          </b-col>
          <b-col cols="2">
              <datepicker
              placeholder="Select Date"
              v-model="employee.cprIssuedDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
          </b-col>
          <b-col cols="1" class="col-left">
            <label for="input-cprExpiryDate">Expiry Date:</label>
          </b-col>
          <b-col cols="2">
              <datepicker
              placeholder="Select Date"
              v-model="employee.cprExpiryDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col cols="1" class="col-left">
            <label for="input-gosiNo">Gosi Number:</label>
          </b-col>
          <b-col cols="2">
            <b-form-input
              class="form-control form-control-sm"
              id="input-gosiNo"
              v-model="employee.gosiNo"
              placeholder="Gosi no"
            ></b-form-input>
          </b-col>
          <b-col cols="1" class="col-left">
            <label for="input-gosiRegistrationDate">Reg. Date:</label>
          </b-col>
          <b-col cols="2">
              <datepicker
              placeholder="Select Date"
              v-model="employee.gosiRegistrationDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-2 variant="light" class="col-left">
          <h6>Work Information</h6>
        </b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-row class="mt-1">
            <b-col cols="1" class="col-left">
              <label for="input-On Boarding Date">Service Date:</label>
            </b-col>
            <b-col cols="2">
                <datepicker
              placeholder="Select Date"
              v-model="employee.onBoardingDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
           </b-col>
            <b-col cols="1" class="col-left">
              <label for="input-Off Boarding Date">Service end Date:</label>
            </b-col>
            <b-col cols="2">
                <datepicker
              placeholder="Select Date"
              v-model="employee.offBoardingDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col cols="1" class="col-left">
              <label for="profession">Profession:</label>
            </b-col>
            <b-col cols="2">
              <b-form-input
                class="form-control form-control-sm"
                id="profession"
                v-model="employee.profession"
                placeholder="Enter employee profession"
              ></b-form-input>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for="workDesignation">Designation:</label>
            </b-col>
            <b-col cols="2">
              <b-form-input
                class="form-control form-control-sm"
                id="workDesignation"
                v-model="employee.workDesignation"
                placeholder="Enter employee work designation"
              ></b-form-input>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for>Department:</label>
            </b-col>
            <b-col cols="2">
              <b-form-input
                class="form-control form-control-sm"
                id
                v-model="employee.deptCode"
                placeholder
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col cols="1" class="col-left">
              <label for>Contract Type:</label>
            </b-col>
            <b-col cols="2">
              <div>
                <b-form-group class="col-left">
                  <b-form-radio v-model="employee.contractType" name="contractType" value="0">Local</b-form-radio>
                  <b-form-radio
                    v-model="employee.contractType"
                    name="contractType"
                    value="1"
                  >Expatriate</b-form-radio>
                  <b-form-radio
                    v-model="employee.contractType"
                    name="contractType"
                    value="2"
                  >Part Timer</b-form-radio>
                </b-form-group>
              </div>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for>Contract status:</label>
            </b-col>
            <b-col cols="2">
              <div>
                <b-form-group class="col-left">
                  <b-form-radio v-model="employee.passage" name="passage" value="0">Bachelor</b-form-radio>
                  <b-form-radio v-model="employee.passage" name="passage" value="1">Family</b-form-radio>
                  <b-form-radio v-model="employee.passage" name="passage" value="2">NA</b-form-radio>
                </b-form-group>
              </div>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for>Tickets:</label>
            </b-col>
            <b-col cols="2">
              <div>
                <b-form-group class="col-left">
                  <b-form-radio v-model="employee.ticket" name="ticket" value="0">Yearly</b-form-radio>
                  <b-form-radio v-model="employee.ticket" name="ticket" value="1">Once in 2 years</b-form-radio>
                  <b-form-radio v-model="employee.ticket" name="ticket" value="2">NA</b-form-radio>
                </b-form-group>
              </div>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="col-left">
              <label for>Resident Permit information</label>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="1" class="col-left">
              <label for="residencePermitNo">Permit No:</label>
            </b-col>
            <b-col cols="2">
              <b-form-input
                class="form-control form-control-sm"
                id="residentPermitNo"
                v-model="employee.residencePermitNo"
                placeholder
              ></b-form-input>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for="residentPermitIssueDt">Issue Dt:</label>
            </b-col>
            <b-col cols="2">
                <datepicker
              placeholder="Select Date"
              v-model="employee.residencePermitIssueDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for="residencePermitExpiryDate">Expiry Dt:</label>
            </b-col>
            <b-col cols="2">
                <datepicker
              placeholder="Select Date"
              v-model="employee.residencePermitExpiryDate"
              format="dd/MM/yyyy"
              input-class="form-control form-control-sm styleLine"
            ></datepicker>
           </b-col>
          </b-row>
          <hr />
          <b-row class="mt-1">
            <b-col cols="1" class="col-left">
              <label for="basicSalary">Basic Salary:</label>
            </b-col>
            <b-col cols="2">
               <vue-numeric
                class="form-control form-control-sm styleLine col-right group1-color"
                style="padding-right: 0px"
                placeholder
                separator=","
                :precision="3"
                v-model="employee.basicSalary"
              ></vue-numeric>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for>Pay Mode:</label>
            </b-col>
            <b-col cols="2">
              <div>
                <b-form-group class="col-left">
                  <b-form-radio v-model="employee.paymentMode" name="paymentMode" value="0">Cash</b-form-radio>
                  <b-form-radio v-model="employee.paymentMode" name="paymentMode" value="1">Cheque</b-form-radio>
                </b-form-group>
              </div>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for="bankCode">Bank Code:</label>
            </b-col>
            <b-col cols="2">
              <b-form-input
                class="form-control form-control-sm"
                id="bankCode"
                v-model="employee.bankCode"
                placeholder
              ></b-form-input>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for="acNumber">Account No:</label>
            </b-col>
            <b-col cols="2">
              <b-form-input
                class="form-control form-control-sm"
                id="acNumber"
                v-model="employee.acNumber"
                placeholder
              ></b-form-input>
            </b-col>
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-3 variant="light" class="col-left">
          <h6>Allowance & Deduction Information</h6>
        </b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-row class="mt-1">
            <b-col cols="1" class="col-left">
              <label for="rentAllowance">Rent Allowance:</label>
            </b-col>
            <b-col cols="1">
              <vue-numeric
                class="form-control form-control-sm styleLine col-right group1-color"
                style="padding-right: 0px"
                placeholder
                separator=","
                :precision="3"
                v-model="employee.rentAllowance"
              ></vue-numeric>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for="travelAllowance">Travel Allowance:</label>
            </b-col>
            <b-col cols="1">
              <vue-numeric
                class="form-control form-control-sm styleLine col-right group1-color"
                style="padding-right: 0px"
                placeholder
                separator=","
                :precision="3"
                v-model="employee.travelAllowance"
              ></vue-numeric>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for="specialAllowance">Special Allowance:</label>
            </b-col>
            <b-col cols="1">
             <vue-numeric
                class="form-control form-control-sm styleLine col-right group1-color"
                style="padding-right: 0px"
                placeholder
                separator=","
                :precision="3"
                v-model="employee.specialAllowance"
              ></vue-numeric>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for="otherAllowance">Other Allowance:</label>
            </b-col>
            <b-col cols="1">
             <vue-numeric
                class="form-control form-control-sm styleLine col-right group1-color"
                style="padding-right: 0px"
                placeholder
                separator=","
                :precision="3"
                v-model="employee.otherAllowance"
              ></vue-numeric>
            </b-col>
            <b-col cols="1" class="col-left">
              <label for="nightShiftAllowance">Night Shift Allowance:</label>
            </b-col>
            <b-col cols="1">
               <vue-numeric
                class="form-control form-control-sm styleLine col-right group1-color"
                style="padding-right: 0px"
                placeholder
                separator=","
                :precision="3"
                v-model="employee.nshAllowance"
              ></vue-numeric>
           </b-col>
          </b-row>
          <hr />
          <b-row class="mt-1">
            <b-col cols="1" class="col-left">
              <label for="housingBankAmount">Housing Bank Amount:</label>
            </b-col>
            <b-col cols="1">
              <vue-numeric
                class="form-control form-control-sm styleLine col-right group1-color"
                style="padding-right: 0px"
                placeholder
                separator=","
                :precision="3"
                v-model="employee.housingBankAmount"
              ></vue-numeric>
             </b-col>
            <b-col cols="1" class="col-left">
              <label for="input-gosiAmount">Gosi Amount:</label>
            </b-col>
            <b-col cols="1">
               <vue-numeric
                class="form-control form-control-sm styleLine col-right group1-color"
                style="padding-right: 0px"
                placeholder
                separator=","
                :precision="3"
                v-model="employee.gosiAmount"
              ></vue-numeric>
              </b-col>
          </b-row>
          <b-row class="mt-2"></b-row>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-4 variant="light" class="col-left">
          <h6>Guarantee Information</h6>
        </b-button>
      </b-card-header>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-row class="mt-3">
            <!-- <div> -->
            <b-col cols="2">
              <b-form-checkbox
                id="checkbox-1"
                v-model="employee.telephoneGuarantee"
                name="telephoneGuarantee"
                value="0"
                unchecked-value="1"
              >Telephone Guarantee</b-form-checkbox>
            </b-col>
            <b-col cols="2">
              <b-form-checkbox
                id="checkbox-2"
                v-model="employee.electricityGuarantee"
                name="electricityGuarantee"
                value="0"
                unchecked-value="1"
              >Electricity Guarantee</b-form-checkbox>
            </b-col>
            <b-col cols="2">
              <b-form-checkbox
                id="checkbox-3"
                v-model="employee.externalBankLoanGuarantee"
                name="externalBankLoantelephoneGuarantee"
                value="0"
                unchecked-value="1"
              >External Bank Loan Guarantee</b-form-checkbox>
            </b-col>
            <b-col cols="2">
              <b-form-input id="bankName" v-model="employee.bankName" placeholder></b-form-input>
            </b-col>
            <!-- </div> -->
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
    <!-- <b-card class="col-left">
      <b-button class="mr-1">Submit</b-button>
      <b-button>Cancel</b-button>
       <b-button v-show="showForm" class="mr-1" @click="setFormDisplay1(false), setIsEditMode(true)">Close</b-button>
    </b-card> -->
    <hr />
    <b-row align-h="center">
      <!-- <b-button v-show='isEditMode' class="mr-1" @click.prevent="saveRecord()">Submit</b-button> -->
      <b-button variant="success"  class="mr-1"  @click.prevent="save()">Save</b-button>
      <!-- <b-button class="mr-1">Print</b-button> -->
      <b-button variant="outline-primary" class="mr-1" @click="resetVar(), houseKeeping()">Clear</b-button>
      <b-button variant="primary"  v-show="showForm" class="mr-1" @click="setFormDisplay(false), setIsEditMode(true), houseKeeping()">Close</b-button>
    </b-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import VueNumeric from 'vue-numeric'
export default {
  data: function () {
    return {
      errors: []
    }
  },
  components: {
    Datepicker,
    VueNumeric
  },
  methods: {
    ...mapActions(['getEmployee', 'resetPayrollVar', 'setFormDisplay',
      'setIsEditMode', 'saveEmployee', 'updateEmployee']),
    checkForm: function () {
      console.log('checking form data')
      this.errors = []
      if (!this.employee.empName) {
        this.errors.push('Name Required.')
      }
      if (!this.employee.deptCode) {
        this.errors.push('Department Required.')
      }
      if (!this.employee.cprNo) {
        this.errors.push('Employee CPR Required.')
      }
      if (!this.errors.length) {
        return true
      } else {
        this.errors.unshift(
          'Fields highlighted in yellow are required, please enter following ..'
        )
      }
    },
    houseKeeping () {
      this.errors = []
    },
    async save () {
      this.checkForm()
      // console.log('employee id:' + this.employee.id)
      // console.log('Total Errors:' + this.errors.length)
      if (!this.errors.length) {
        if (this.employee.id === 0) {
          await this.saveEmployee(this.employee)
        } else {
          await this.updateEmployee(this.employee)
        }
        this.$toasted.show(
          this.message,
          {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000
          })
      } else {
        // console.log('Show errors!!')
        this.$toasted.show(this.errors, {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000
        })
      }
      this.houseKeeping()
    }
  },
  computed: {
    ...mapGetters([
      'employee',
      'showForm',
      'isEditMode',
      'message'])
  }
}
</script>
<style  scoped>
.main-div {
  width: 95%;
  margin-left: 40px;
  margin-right: 40px;
  font-size: small;
}
.center {
  text-align: center;
  /* border: 3px solid green; */
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
    border-color: green;
}
  .error-message {
    display: block;
  }
</style>
