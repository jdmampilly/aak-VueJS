import axios from 'axios'

const state = {
  user: {},
  // startRec: 0,
  // totalRows: 0,
  showForm: false,
  showFormList: true,
  isEditMode: true,
  authenticated: true,
  showMETform: false
}
const getters = {
  user: state => state.user,
  // startRec: state => state.startRec,
  // totalRows: state => state.totalRows,
  showForm: state => state.showForm,
  showFormList: state => state.showFormList,
  isEditMode: state => state.isEditMode,
  authenticated: state => state.authenticated,
  showMETform: state => state.showMETform
}
const actions = {
  async fetchSectionList ({
    commit
  }, id) {
    const response = await axios.get(
      process.env.VUE_APP_API_URL + `/section/forDirectorate/${id}`
    )
    commit('setSectionList', response.data)
  },
  async METformDisplay ({
    commit
  }, data) {
    console.log('setMETformDisplay:' + data)
    commit('setMETformDisplay', data)
  },
  // async fetchStartRec ({
  //   commit
  // }, no) {
  //   console.log('start rec in state:' + no)
  //   commit('setStartRec', no)
  // },
  async setFormDisplay ({
    commit
  }, x) {
    commit('setFormDisplay', x)
  },
  async setIsEditMode ({
    commit
  }, mode) {
    commit('setEditMode', mode)
  }
}

const mutations = {
  setFormDisplay (state, x) {
    state.showForm = x
    state.showFormList = !x
    console.log('setFormDisplay')
  },
  setEditMode: (state, mode) => (state.isEditMode = mode),
  setUser: (state, user) => (state.user = user),
  // setStartRec: (state, startRec) => (state.startRec = startRec),
  // setTotalRows: (state, totalRows) => (state.totalRows = totalRows)
  setMETformDisplay: (state, mode) => (state.showMETform = mode)
}

export default {
  state,
  getters,
  actions,
  mutations
}
