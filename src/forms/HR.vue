<template>
  <div class="main-div">
    <div id="hrdForm" v-show="showCurrentForm" >
    <H4>HRD Request Entry</H4>
    <!-- Request Details{{this.hrRq.requestDetails[0].pmisId}} -->
    <b-form-row>
      <b-col cols="1" offset="1" style="padding-left:0px;padding-right:0">
        <b-form-group
          id="id"
          label="Id"
          label-for="requestId"
          label-align="left"
          class="mb-1 textBoxWidth"
        >
          <b-form-input
            class="form-control form-control-sm styleLine"
            id="requestId"
            v-model="hrRq.requestId"
            :readonly="true"
            tabindex="1"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="2" offset="1" style="padding-left:0px;padding-right:0">
        <b-form-group
          label="Request No"
          label-for="hrNoId"
          label-align="left"
          class="mb-1 textBoxWidth"
        >
          <b-input-group>
            <b-form-input
              class="form-control form-control-sm styleLine"
              id="hrNoId"
              v-model="hrRq.hrNo"
              :readonly="true"
              tabindex="2"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="2" style="padding-left:0px;padding-right:0">
       <b-form-group
            label="Request Date"
            label-align="left"
            class="mb-1"
          >
            <label class="form-control form-control-sm">
              {{ hrRq.requestDate | moment("DD-MM-YYYY  HH:mm:ss") }}</label
            >
          </b-form-group>

      </b-col>
      <b-col cols="1" offset="3">
        <b-form-group label="Status" label-align="left" label-for="status">
          <h3 v-if="hrRq.status==='C'">
            <b-badge href="#" variant="secondary">Created</b-badge>
          </h3>
          <h3 v-if="hrRq.status==='I'">
            <b-badge href="#" variant="primary">In progress</b-badge>
          </h3>
          <h3 v-if="hrRq.status==='X'">
            <b-badge href="#" variant="danger">Cancelled</b-badge>
          </h3>
          <h3 v-if="hrRq.status==='F'">
            <b-badge href="#" variant="success">Completed</b-badge>
          </h3>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col cols="5" offset="1" style="padding-left:0px">
        <b-form-group label="HR Description" label-for="hrDescription" label-align="left">
          <b-input-group>
            <b-form-input
              id="hrDescription"
              class="form-control form-control-sm styleLine input-required"
              v-model="hrRq.description"
              tabindex="4"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="5" style="padding-left:0px;padding-right:0">
        <b-form-group label="CPR's" label-for="cprNo" label-align="left">
          <b-input-group>
            <b-form-input
              id="cprNo"
              class="form-control form-control-sm styleLine"
              v-model="hrRq.cprNo"
              tabindex="5"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col cols="10" offset="1" style="padding-left:0px;padding-right:0">
        <b-form-group label="Justification" label-for="justification" label-align="left">
          <b-input-group>
            <b-form-input
              id="justification"
              class="form-control form-control-sm styleLine"
              v-model="hrRq.justification"
              tabindex="6"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col cols="2" offset="1" style="padding-left:0px">
        <b-form-group
          id="directorateLbl"
          label="Directorate Code"
          label-for="directorateCode"
          label-align="left"
          class="mb-1"
        >
          <b-input-group>
            <b-form-input
              class="form-control form-control-sm styleLine  input-required"
              id="directorateCode"
              v-model="hrRq.directorateCode"
              tabindex="8"
            ></b-form-input>
            <template v-slot:append>
              <SearchSm
                :column1Key="searchDirectorate.attr1.name"
                :column1label="searchDirectorate.attr1.label"
                :column2Key="searchDirectorate.attr2.name"
                :column2label="searchDirectorate.attr2.label"
                :totalRows="totalRows"
                :fetchItem="fetchDirectorateDataHrRq"
                @fetchD="fetchDirectorateListByRoleT"
                :items="directorateList"
              />
            </template>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group
          label="Directorate Short Code"
          label-for="directorateShortCode"
          label-align="left"
          class="mb-1 textBoxWidth"
        >
          <b-form-input
            class="form-control form-control-sm styleLine"
            id="directorateShortCode"
            v-model="hrRq.directorateShortCode"
            :readonly="true"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="2" style="padding-left:0px;padding-right:0">
        <b-form-group
          id="hrRole"
          label="HRD approver Id"
          label-for="hrApprover"
          label-align="left"
          class="mb-1"
        >
          <b-input-group>
            <b-form-input
              class="form-control form-control-sm styleLine input-required"
              id="hrApprover"
              v-model="hrRq.hrApprover"
              tabindex="9"
            ></b-form-input>
            <template v-slot:append>
              <SearchSm
                :column1Key="searchApprover.attr1.name"
                :column1label="searchApprover.attr1.label"
                :column2Key="searchApprover.attr2.name"
                :column2label="searchApprover.attr2.label"
                :fetchItem="fetchApproverDataHrRq"
                :totalRows="totalRows"
                @fetchD="fetchHrdApproverList(110)"
                :items="hrRqHrdApproverList"
              />
            </template>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group
          label="Approver Name"
          label-for="hrApproverName"
          label-align="left"
          class="mb-1 textBoxWidth"
        >
          <b-form-input
            class="form-control form-control-sm styleLine"
            id="hrApproverName"
            v-model="hrRq.hrApproverName"
            :readonly="true"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <span class="d-block p-0 bg-secondary text-white spacer">-</span>
    <div class="table-div">
      <b-container fluid>
        <b-table
          small
          show-empty
          stacked="md"
          :items="hrRq.requestDetails"
          :fields="hrRqDetailFields"
          :per-page="0"
          v-model="visibleRows"
        >
          <template slot="top-row">
            <td>
              <b-form-input    tabindex="10" class="form-control form-control-sm styleLine input-required" id="s1" v-model="hrRqs1"></b-form-input>
            </td>
            <td>
              <b-input-group>
                <b-form-input
                  tabindex="11"
                  class="form-control form-control-sm styleLine input-required"
                  id="s2"
                  v-model="hrRqs2"
                  :readonly='true'
                ></b-form-input>
                <template v-slot:append>
                  <Search3
                    :column1Key="searchPmis.attr1.name"
                    :column1label="searchPmis.attr1.label"
                    :column2Key="searchPmis.attr2.name"
                    :column2label="searchPmis.attr2.label"
                    :totalRows="totalRows"
                    v-on:searchToParent="fetchStartRecHrRq"
                    :fetchItem="fetchPmisDataHrRq"
                    @fetchD="fetchPmisList"
                    :items="pmisList"
                    :reset="resetGeneralItems"
                  />
                </template>
              </b-input-group>
            </td>
            <td>
              <b-input-group>
                <b-form-input
                   tabindex="12"
                  class="form-control form-control-sm styleLine input-required"
                  id="s3"
                  :readonly='true'
                  v-model="hrRqs3"
                ></b-form-input>
                <template v-slot:append>
                  <Search3
                    :column1Key="searchMofProject.attr1.name"
                    :column1label="searchMofProject.attr1.label"
                    :column2Key="searchMofProject.attr2.name"
                    :column2label="searchMofProject.attr2.label"
                    :totalRows="totalRows"
                    v-on:searchToParent="fetchStartRec"
                    :fetchItem="fetchProjectDataHrRq"
                    @fetchD="fetchProjectList"
                    :items="projectList"
                  />
                </template>
              </b-input-group>
            </td>
            <td>
              <template>
                <vue-numeric
                  class="form-control form-control-sm styleLine col-right input-required"
                  style="padding-left: 0px"
                  tabindex="13"
                  placeholder
                  :minus="true"
                  separator=","
                  :precision="3"
                  v-model="hrRqs4"
                ></vue-numeric>
              </template>
            </td>
            <td>
              <b-form-input  tabindex="14" class="form-control form-control-sm styleLine " id="s5" v-model="hrRqs5"></b-form-input>
            </td>
            <td>
              <b-button tabindex="15" variant="outline-primary" size="sm" @click="addItem()">Add</b-button>
            </td>
          </template>
          <template v-slot:cell(amount)="data">
            <b class="text-info">{{ data.value | formatter }}</b>
          </template>
          <template v-slot:cell(action)="row">
            <b-button size="sm" @click="deleteItem(row.item)">{{ '-' }}</b-button>
          </template>
      <template slot="bottom-row" >
        <td class="col-left"><h4><b-badge>Total</b-badge></h4></td>
        <td></td>
        <td></td>
        <td class="col-right-bold"> {{ t1.toFixed(3) | formatter }}</td>
      </template>
        </b-table>
      </b-container>
    </div>
    <span class="d-block p-0 bg-secondary text-white spacer">Other Information</span>
    <b-form-row>
      <b-col cols="1" offset="1" style="padding-left:0px;padding-right:0">
        <b-form-group
          id="priorApp"
          label="Prior Appr. Status"
          label-for="priorApp"
          label-align="left"
        >
          <h5 v-if="hrRq.priorApprovalStatus==='N'">
            <b-badge variant="secondary">Not Initiated</b-badge>
          </h5>
          <h5 v-if="hrRq.priorApprovalStatus==='I'">
            <b-badge variant="primary">In Progress</b-badge>
          </h5>
          <h5 v-if="hrRq.priorApprovalStatus==='A'">
            <b-badge variant="success">Approved</b-badge>
          </h5>
          <h5 v-if="hrRq.priorApprovalStatus==='R'">
            <b-badge variant="danger">Rejected</b-badge>
          </h5>
          <h5 v-if="hrRq.priorApprovalStatus==='X'">
            <b-badge variant="dark">Cancelled</b-badge>
          </h5>
        </b-form-group>
      </b-col>
      <b-col cols="1" offset="1" style="padding-left:0px;padding-right:0">
        <b-form-group
          id="mf1803Status"
          label="MF 1803 Status"
          label-for="mf1803Status"
          label-align="left"
        >
          <h5 v-if="hrRq.mf1803Status==='N'">
            <b-badge variant="secondary">Not Initiated</b-badge>
          </h5>
          <h5 v-if="hrRq.mf1803Status==='I'">
            <b-badge variant="primary">In Progress</b-badge>
          </h5>
          <h5 v-if="hrRq.mf1803Status==='A'">
            <b-badge variant="success">Approved</b-badge>
          </h5>
          <h5 v-if="hrRq.mf1803Status==='R'">
            <b-badge variant="danger">Rejected</b-badge>
          </h5>
          <h5 v-if="hrRq.mf1803Status==='X'">
            <b-badge variant="dark">Cancelled</b-badge>
          </h5>
        </b-form-group>
      </b-col>
    </b-form-row>
    <hr />
    <b-row align-h="center">
      <b-button
        v-show="hrRq.status==='C' || hrRq.status===''"
        variant="primary"
        class="mr-1"
        @click="save"
      >Save</b-button>
      <b-button
        v-show="hrRq.status==='C' && hrRq.priorApprovalStatus==='N'"
        class="mr-1"
        @click="action"
      >Prior Approval</b-button>
      <!-- <b-button class="mr-1">Prior Approval</b-button> -->
      <b-button class="mr-1"
        @click="showMf1803"
      >MF 1803</b-button>
      <b-button class="mr-1" @click="activityHistory()">Activity History</b-button>
      <b-button class="mr-1" v-show="hrRq.status!=''"  @click="openUrlAttachment" >Attachments</b-button>
      <b-button class="mr-1">Print</b-button>
      <b-button class="mr-1" @click="resetHrRq">Cancel</b-button>
      <b-button
        variant="outline-primary"
        v-show="showFormHrRq"
        class="mr-1"
        @click="setFormDisplay1({ 'module': 'hrRq', 'view': false })"
      >Close</b-button>
      <!-- <b-button v-show='isEditMode' class="mr-1" @click.prevent="saveRecord()">Submit</b-button> -->
      <!-- <b-button class="mr-1">Prior Approval</b-button>
      <b-button class="mr-1">MF 1803</b-button>
      <b-button class="mr-1">Activity History</b-button>
      <b-button class="mr-1">Attachments</b-button>
      <b-button class="mr-1">Print</b-button>
      <b-button class="mr-1" @click="resetHrRq">Cancel</b-button>
      <b-button variant="outline-primary" class="mr-1" @click="setFormDisplay1({ 'module': 'hrRq', 'view': false }), setIsEditMode(true)">Close</b-button>-->
    </b-row>
    <br />
    <br />
    <!-- <ActionForms
      :actionRole="this.userRole.id"
      :headLabel="this.userRole.roleName"
      :optionsRoles="this.roles"
      :optionsAssignTo="this.optionsAssignTo"
      @populateUsersByRoleForm="populateUsersByRole"
      @actionSave="formSubmitAction"
    /> -->
    </div>
    <!-- <div id="mf1803id" v-show="showForm1803">
        <MF1803
         :id="null"
         :tRequestId="hrRq.requestId"
         :isSubForm="true"
         />
      </div> -->
      <div id="mf1803list" v-show="showForm1803List">
        <Mf1803List
        :showBaseListCloseButton="true"
        :requestId="this.tRequestId"
        :subForm="true"/>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import Search3 from '../components/Search3.vue'
import SearchSm from '../components/SearchSm.vue'
import VueNumeric from 'vue-numeric'
import { mapActions, mapGetters } from 'vuex'
import Mf1803List from './MF1803List.vue'
export default {
  data () {
    return {
      visibleRows: [],
      tRequestId: '',
      errors: [],
      selected: {},
      docType: '',
      description: '',
      priorityLabel: '',
      error: [],
      roles: [],
      optionsAssignTo: [],
      hrRqs1: '',
      hrRqs4: 0,
      hrRqs5: '',
      hrRqDetailFields: [
        {
          key: 'positionTitle',
          label: 'Position Title',
          class: 'text-left'
        },
        {
          key: 'pmisNo',
          label: 'PMIS No',
          class: 'text-left'
        },
        {
          key: 'mofProjectCode',
          label: 'MoF Project',
          class: 'text-left'
        },
        {
          key: 'estimatedAmount',
          label: 'Amount',
          class: 'text-right'
        },
        {
          key: 'remarks',
          label: 'Remarks',
          class: 'text-left'
        },
        { key: 'action', label: 'Action' }
      ],
      searchHrRq: {
        attr1: { name: 'id', label: 'Id' },
        attr2: { name: 'hrNo', label: 'HR Request No' },
        attr3: { name: 'description', label: 'Description' },
        attr4: { name: 'justification', label: 'Justification' },
        attr5: { name: 'cprNo', label: 'CPR No' },
        attr6: { name: 'createdDate', label: 'Created Date' }
      },
      searchDirectorate: {
        attr1: { name: 'id', label: 'Short Name' },
        attr2: { name: 'directorateName', label: 'Directorate Name' }
      },
      searchApprover: {
        attr1: { name: 'id', label: 'Id' },
        attr2: { name: 'userName', label: 'User' }
      },
      searchPmis: {
        attr1: { name: 'projectCode', label: 'Project Code' },
        attr2: { name: 'projectName', label: 'Project Name' }
      },
      searchMofProject: {
        attr1: { name: 'id', label: 'Project Code' },
        attr2: { name: 'projectName', label: 'Project Name' }
      },
      optionsMf1803Status: [
        { text: 'Not Initiated', value: 'N' },
        { text: 'In Progress', value: 'I' },
        { text: 'Approved', value: 'A' },
        { text: 'Rejected', value: 'R' },
        { text: 'Cancelled', value: 'C' }
      ],
      optionsPriorApprovalStatus: [
        { text: 'Not Initiated', value: 'N' },
        { text: 'In Progress', value: 'I' },
        { text: 'Approved', value: 'A' },
        { text: 'Rejected', value: 'R' },
        { text: 'Cancelled', value: 'C' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'message',
      'hrRq',
      'mf1803',
      'hrRqDetail',
      'hrRqList',
      'pmisList',
      'totalRows',
      'projectList',
      'directorateList',
      'sectionList',
      'startRecHrRq',
      'totalHrRqRow',
      'contractList',
      'hrRqs2',
      'hrRqs3',
      'hrRqsPmisId',
      'hrRqHrdApproverList',
      'showForm',
      'isEditMode',
      'user',
      'userDashBoardItem',
      'userRole',
      'userRoles',
      'usersListByRoles',
      'roleList',
      'showFormHrRq',
      'selectedRole',
      'showForm1803',
      'showCurrentForm',
      'showForm1803List'
    ]),
    t1 () {
      return this.visibleRows.reduce((accum, item) => {
        return accum + parseFloat(item.estimatedAmount)
      }, 0.000)
    }
  },
  components: {
    // Datepicker,
    // Search,
    Search3,
    SearchSm,
    // // Search4,
    VueNumeric,
    Mf1803List
  },
  filters: {
    formatter: function (value) {
      return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 3
      }).format(value)
    }
  },
  mounted () {
    this.getShowCurrentForm(true)
  },
  methods: {
    ...mapActions([
      'resetHrRq',
      'fetchHrRq',
      'fetchHrRqList',
      'fetchPmisList',
      'fetchPmisData',
      'fetchProjectList',
      'fetchProjectData',
      'fetchDirectorateList',
      'fetchDirectorateData',
      'fetchSectionList',
      'fetchSectionData',
      'fetchStartRecHrRq',
      'addRowHrRqDetail',
      'saveHrRq',
      'fetchContractList',
      'fetchContractData',
      'fetchStartRec',
      'deleteHrRqDetailRow',
      'fetchHrdApproverList',
      'fetchHrdApproverDataHrRq',
      'resetHrRqDetailItem',
      'setFormDisplay1',
      'setIsEditMode',
      'updateUserDashBoardItem',
      'saveUserDashboard',
      'fetchRoleList',
      'fetchUserListByRoles',
      'fetchSelectedRole',
      'updateHrRq',
      'fetchApprover',
      'getShowCurrentForm',
      'fetchMf1803ByRequestId',
      'reset1803',
      'fetchDirectorateListByRole',
      'fetchDirectorateList',
      'resetGeneralItems',
      'populateRoleListAction',
      'populateUsersByRoleAction',
      'populateRoleActions',
      'updateUserDashBoardItemTemp',
      'fetchActivityHistory',
      'reset1803List'
    ]),
    dateFormat (value) {
      return moment(value).format('DD-MM-YYYY')
    },
    async activityHistory () {
      this.fetchActivityHistory(this.hrRq.requestId)
      await this.$bvModal.show('modal-AH')
      // this.setFormDisplay1({ module: 'AH', view: !this.showFormAH, calledBy: 'DashBoard' })
    },
    fetchDirectorateListByRoleT () {
      // this.fetchDirectorateListByRole(this.user.userId)
      this.fetchDirectorateList()
    },
    async showMf1803 () {
      // alert('1803 request id:' + this.hrRq.requestId)
      this.tRequestId = this.hrRq.requestId
      await this.reset1803List()
      await this.fetchMf1803ByRequestId(this.tRequestId)
      if (this.mf1803.status === undefined) {
        this.reset1803()
        console.log('this.mf1803.status')
      }
      console.log(this.mf1803.status)
      this.setFormDisplay1({
        module: '1803List',
        view: this.showCurrentForm,
        subForm: true })
    },
    fetchApproverDataHrRq (id) {
      this.fetchApprover({ id: id, module: 'hrRq' })
    },
    fetchPmisDataHrRq (id) {
      console.log('pmis id:' + id)
      this.fetchPmisData({ id: id, module: 'hrRq' })
    },
    fetchProjectDataHrRq (id) {
      this.fetchProjectData({ id: id, module: 'hrRq' })
    },
    fetchDirectorateDataHrRq (id) {
      this.fetchDirectorateData({ id: id, module: 'hrRq' })
      this.dirChanged = id
    },
    addItem () {
      this.errors = []
      if (!this.hrRqs1) {
        this.errors.push('positionTitle')
      }
      if (!this.hrRqs2) {
        this.errors.push('positionTitle')
      }
      if (!this.hrRqsPmisId) {
        this.errors.push('pmisId')
      }
      if (!this.hrRqs3) {
        this.errors.push('mofProjectCode')
      }
      if (!this.hrRqs4) {
        this.errors.push('estimatedAmount')
      }
      // if (!this.hrRqs5) {
      //   this.errors.push('remarks')
      // }
      if (!this.errors.length) {
        let o = {
          positionTitle: this.hrRqs1,
          pmisNo: this.hrRqs2,
          pmisId: this.hrRqsPmisId,
          mofProjectCode: this.hrRqs3,
          estimatedAmount: this.hrRqs4,
          remarks: this.hrRqs5
        }
        this.addRowHrRqDetail(o)
        // this.resetHrRqItem()
        this.resetHrRqDetailItem()

        this.hrRqs1 = ''
        this.hrRqs4 = 0
        this.hrRqs5 = ''
      } else {
        this.errors.unshift('Fields highlighted in yellow are required, please enter following ..')
        this.$toasted.show(
          this.errors,
          { theme: 'bubble',
            position: 'top-right',
            duration: 5000
          })
      }
      // let o = {
      //   positionTitle: this.hrRqs1,
      //   pmisNo: this.hrRqs2,
      //   pmisId: this.hrRqsPmisId,
      //   mofProjectCode: this.hrRqs3,
      //   estimatedAmount: this.hrRqs4,
      //   remarks: this.hrRqs5
      // }
      // this.addRowHrRqDetail(o)
      // // this.resetHrRqItem()
      // this.resetHrRqDetailItem()

      // this.hrRqs1 = ''
      // this.hrRqs4 = 0
      // this.hrRqs5 = ''
    },
    deleteItem (item) {
      this.deleteHrRqDetailRow(item.positionTitle)
    },
    checkForm: function () {
      this.errors = []
      if (!this.hrRq.description) {
        this.errors.push('Description')
      }
      if (!this.hrRq.directorateCode) {
        this.errors.push('Directorate')
      }
      if (!this.hrRq.hrApprover) {
        this.errors.push('HRD Head/approver')
      }
      if (this.hrRq.requestDetails.length === 0) {
        this.errors.push('Details')
      }

      if (!this.errors.length) {
        return true
      } else {
        this.errors.unshift('Fields highlighted in yellow are required, please enter following ..')
      }
    },
    houseKeeping () {
      this.errors = []
    },
    async save () {
      this.checkForm()
      if (!this.errors.length) {
        if (this.hrRq.id === 0) {
          this.hrRq.createdBy = this.user.userId
          await this.saveHrRq(this.hrRq)
        } else {
          await this.updateHrRq(this.hrRq)
        }
        this.$toasted.show(
          this.message,
          { theme: 'bubble',
            position: 'top-right',
            duration: 5000
          })
      } else {
        this.$toasted.show(
          this.errors,
          { theme: 'bubble',
            position: 'top-right',
            duration: 5000
          })
      }
      this.houseKeeping()
    },
    async updateHrRqStatus (status) {
      this.hrRq.status = status
      await this.updateHrRq(this.hrRq)
    },
    openUrlAttachment () {
      let uri = process.env.VUE_APP_ATTACHMENT_URL + `/FrdBudget.xhtml?` +
      `&pmisid=${this.hrRq.requestDetails[0].pmisId}` +
      `&requestId=${this.hrRq.requestId}` +
      `&ppmispjno=${this.hrRq.requestDetails[0].pmisNo}` +
      `&pfcode=''` +
      `&ppjname=${this.hrRq.requestDetails[0].mofProjectCode}` +
      `&pspjname=${this.hrRq.description}` +
      `&ptype='HR Request'` +
      `&prequestno=${this.hrRq.hrNo}` +
      `&ptenreqno=` +
      `&pcreated_by=${this.hrRq.createdBy}` +
      `&pmispjname=${this.hrRq.pmisProjectName}` +
      `&roleId=5` +
      `&proleId=5` +
      `&readOnly=false`
      let res = encodeURI(uri)
      window.open(res, `_blank`)
    },
    // async action () {
    //   await this.fetchRoleList()
    //   await this.populateRoleList()
    //   await this.populateUsersByRole(50)
    //   await this.$bvModal.show('modal-N')
    // },
    populateRoleList () {
      console.log('populateRoleList:')
      this.roleList.forEach((i) => {
        let t = {}
        t['value'] = i.id
        t['text'] = i.roleName
        this.roles.push(t)
      })
    },
    async populateUsersByRole (x) {
      await this.fetchUserListByRoles(x)
      this.optionsAssignTo = []
      this.usersListByRoles.forEach((i) => {
        let t = {}
        t['value'] = i.userId
        t['text'] = i.userName
        this.optionsAssignTo.push(t)
      })
    },
    async action () {
      // alert('action')
      try {
        await this.fetchRoleList()
        await this.populateRoleListAction(this.roleList)
        await this.fetchUserListByRoles(50)
        console.log('this.usersListByRoles:' + this.usersListByRoles)
        await this.populateUsersByRoleAction(this.usersListByRoles)
        let x = {
          moduleType: 'MF',
          roleId: this.user.roleId
        }
        await this.populateRoleActions(x)
        // alert('FormSubmitAction in HR')
        const o = {
          moduleType: 'MF',
          id: 0,
          docType: 'Prior Approval',
          requestType: 'HRD Request',
          // currentDocumentType: 'Prior Approval',
          docNo: this.hrRq.id,
          requestId: this.hrRq.requestId,
          // priority: this.priorityLabel,
          description: this.hrRq.description,
          status: 'Awaiting for Approval',
          requestNo: this.hrRq.hrNo,
          mfStatus: 'I'
        }
        await this.updateUserDashBoardItemTemp(o)
        console.log('from HR - userDashBoardItemTemp:' + this.userDashBoardItemTemp)
        await this.$bvModal.show('modal-BA')
      } catch (error) {
        alert('error:' + error)
      } finally {
        this.fetchHrRq(this.hrRq.id)
      }
    }
    // populateRoleList () {
    //   console.log('populateRoleList:')
    //   this.roleList.forEach((i) => {
    //     let t = {}
    //     t['value'] = i.id
    //     t['text'] = i.roleName
    //     this.roles.push(t)
    //   })
    // },
    // async populateUsersByRole (x) {
    //   await this.fetchUserListByRoles(x)
    //   this.optionsAssignTo = []
    //   this.usersListByRoles.forEach((i) => {
    //     let t = {}
    //     t['value'] = i.userId
    //     t['text'] = i.userName
    //     this.optionsAssignTo.push(t)
    //   })
    // }
  },
  watch: {
    dirChanged: {
      handler: function () {
        this.fetchSectionList(this.dirChanged)
      }
    }
  }
}
</script>

<style>
.main-div {
  width: 97%;
  margin-left: 10px;
  margin-right: 10px;
  font-size: small;
}
.table-div {
  width: 90%;
  margin-left: 70px;
  margin-right: 0px;
  font-size: small;
}
.col-left {
  text-align: left;
}
.col-right {
  text-align: right;
}
.input-required {
  background-color: rgb(245, 242, 212);
}

#b-col {
  text-align: left;
}

.textBoxWidth {
  width: 160px;
}
.cellColor {
  background-color: #d9dcdf;
}
.calculated-value {
  background-color: #d9dcdf;
}
.sub-head {
  background-color: #d9dcdf;
}
.group1-color {
  background-color: rgb(242, 242, 242);
}
.group2-color {
  background-color: rgb(230, 230, 230);
}
p {
  margin-bottom: 0px;
}
.spacer {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
