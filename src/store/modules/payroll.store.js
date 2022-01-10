import axios from 'axios'
const getDefaultState = () => {
  return {
    employee: {
      id: 0
    },
    employeeMET: {},
    ot1Rate: '1',
    ot2Rate: '2',
    nsRate: '1',
    empLoanSummary: {},
    loanHistory: [],
    // employeeList: [],
    employeeLoan: {},
    employeeLeaveTransaction: [],
    employeeLeave: {},
    metAllowance: [],
    metDeduction: [],
    message: '',
    totalRows: 0
  }
}
const getDefaultStateEmpLoan = () => {
  return {
    empLoanSummary: {},
    employeeLoan: {}
  }
}
const state = {
  employee: {
    id: 0
  },
  employeeMET: {
    id: 0
  },
  ot1Rate: '1',
  ot2Rate: '2',
  nsRate: '1',
  empLoanSummary: {},
  loanHistory: [],
  employeeList: [],
  employeeLoan: {},
  employeeLeaveTransaction: [],
  employeeLeave: {},
  metAllowance: [],
  metDeduction: [],
  message: {},
  totalRows: 0,
  totalLHRows: 0,
  startRec: 0,
  activeMonth: {},
  loanHistoryList: []

}

const getters = {
  employee: state => state.employee,
  employeeList: state => state.employeeList,
  employeeMET: state => state.employeeMET,
  employeeLoan: state => state.employeeLoan,
  empLoanSummary: state => state.empLoanSummary,
  loanHistory: state => state.loanHistory,
  employeeLeave: state => state.employeeLeave,
  employeeLeaveTransaction: state => state.employeeLeaveTransaction,
  ot1Rate: state => state.ot1Rate,
  ot2Rate: state => state.ot2Rate,
  nsRate: state => state.nsRate,
  message: state => state.message,
  totalRows: state => state.totalRows,
  startRec: state => state.startRec,
  activeMonth: state => state.activeMonth,
  loanHistoryList: state => state.loanHistoryList,
  totalLHRows: state => state.totalLHRows,
  metAllowance: state => state.metAllowance
}

const actions = {
  defaultState ({
    commit
  }) {
    commit('resetVariables')
  },
  defaultStateEmpLoan ({
    commit
  }) {
    commit('resetEmpLoanInfo')
  },
  async fetchStartRec ({
    commit
  }, no) {
    console.log('start rec in state:' + no)
    commit('setStartRec', no)
  },
  async fetchEmployeeList1 ({
    commit
  }, data) {
    const url = process.env.VUE_APP_API_URL + `/filter/${state.startRec}/5`
    const Response = await axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    commit('setEmployeeList', Response.data)

    commit('setTotalRows', parseInt(Response.headers.x_total_count))
  },
  async fetchEmployeeList ({
    commit
  }) {
    const url = process.env.VUE_APP_API_URL + '/employees'
    const response = await axios.get(url
    )
    commit('setEmployeeList', response.data)
  },
  async fetchEmployee ({
    commit
  }, id) {
    console.log('fetchEmployee:' + id)
    const url = process.env.VUE_APP_API_URL + `/employee/${id}`
    const response = await axios.get(url)
    commit('setEmployeeData', response.data)
  },
  async saveEmployee ({
    commit
  }, data) {
    const url = process.env.VUE_APP_API_URL + '/employee/save'
    await axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('=== No Error returned ====')
        commit('setMessage', 'Sucess')
        commit('setEmployeeData', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
        commit('setMessage', 'Error:' + JSON.stringify(error.response.data.errorMessage))
      })
  },
  async updateEmployee ({
    commit
  }, data) {
    console.log('in update Employee - store')
    const url = process.env.VUE_APP_API_URL + '/employee/update'
    await axios
      .put(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('=== No Error returned ====')
        commit('setEmployeeData', response.data)
        commit('setMessage', 'Sucessfully saved!')
      })
      .catch(error => {
        console.log(error.response.data)
        commit('setMessage', 'Error:' + JSON.stringify(error.response.data.errorMessage))
      })

    // commit('setHrRq', response.data)
  },
  async fetchemployeeMET ({
    commit, 
  }, id) {
    const url = process.env.VUE_APP_API_URL + `/employee/met/${id}`
    commit('setMessage', '')
    await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        commit('setEmployeeMET', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
        commit('resetVariables')
        commit('setMessage', 'Error:' + JSON.stringify(error.response.data.errorMessage))
      })
  },
  async fetchLoanHistory ({
    commit
  }, data) {
    console.log('fetchLoanHistory', data)
    const url = process.env.VUE_APP_API_URL + `/filterLoanTransactions/${state.startRec}/5`
    await axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('LoanHistory:' + JSON.stringify(response.data))
        commit('setLoanHistoryList', response.data)
        commit('setTotalLHRows', parseInt(response.headers.x_total_count))
      })
      .catch(error => {
        console.log(error.response.data)
        commit('setMessage', 'Error:' + JSON.stringify(error.response.data.errorMessage))
      })
  },
  async saveLoanTransaction ({
    commit
  }, data) {
    const url = process.env.VUE_APP_API_URL + '/employee/loan/save'
    await axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('=== No Error returned ====')
        commit('setMessage', 'Sucess')
        commit('setLoanHistoryList', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
        commit('setMessage', 'Error:' + JSON.stringify(error.response.data.errorMessage))
      })
  },
  async fetchActiveMonth ({
    commit
  }) {
    const url = process.env.VUE_APP_API_URL + '/month/active'
    await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        commit('setActiveMonth', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  },
  async fetchEmployeeLoanInfo ({
    commit
  }, id) {
    const url = process.env.VUE_APP_API_URL + `/employee/loan/summary/${id}`
    const response = await axios.get(url)
    commit('setEmpLoanSummary', response.data)
  },
  async fetchEmployeeLoan ({
    commit
  }, id) {
    const url = process.env.VUE_APP_API_URL + `/employee/${id}`
    const response = await axios.get(url)
    commit('setEmployeeLoan', response.data)
  },
  async addRowMetAllowance ({
    commit
  }, o) {
    commit('addAllowanceRow', o)
  }

}

const mutations = {
  resetVariables (state) {
    Object.assign(state, getDefaultState())
  },
  resetEmpLoanInfo (state) {
    Object.assign(state, getDefaultStateEmpLoan())
  },
  setTotalRows: (state, totalRows) => (state.totalRows = totalRows),
  setStartRec: (state, startRec) => (state.startRec = startRec),
  setMessage: (state, message) => (state.message = message),
  setEmployeeData: (state, employee) => (state.employee = employee),
  setEmployeeList: (state, data) => (state.employeeList = data),
  setActiveMonth: (state, data) => (state.activeMonth = data),
  setEmployeeMET: (state, data) => (state.employeeMET = data),
  setLoanHistory: (state, data) => (state.loanHistory = data),
  setLoanHistoryList: (state, data) => (state.loanHistoryList = data),
  setTotalLHRows: (state, data) => (state.totalLHRows = data),
  setEmpLoanSummary: (state, data) => (state.empLoanSummary = data),
  setEmployeeLoan: (state, data) => {
    state.employeeLoan = { ...state.employeeLoan, empCode: data.id }
    state.employeeLoan = { ...state.employeeLoan, empName: data.empName }
    state.employeeLoan = { ...state.employeeLoan, bankCode: data.bankCode }
  },
  addAllowanceRow: (state, data) => {
    state.metAllowance.push(data)
  }
  // deleteAllowanceRow: (state, pt) => {
  //   state.hrRqtempFile = []
  //   for (let i = 0, len = state.hrRq.requestDetails.length; i < len; ++i) {
  //     console.log('validate' + state.hrRq.requestDetails[i].positionTitle !== pt)
  //     if (state.hrRq.requestDetails[i].positionTitle !== pt) {
  //       const x = state.hrRq.requestDetails[i]
  //       state.hrRqtempFile.push(x)
  //     }
  //   }
  //   state.hrRq.requestDetails = state.hrRqtempFile
  //   // state.hrRq = { ...state.hrRq, hrRqDetail: state.hrRqtempFile }
  //   // console.log('hrRq.hrRqDetail->' + state.hrRq.hrRqDetail.length)
  // },
}

export default {
  state,
  getters,
  actions,
  mutations
}
