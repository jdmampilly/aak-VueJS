import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted'
import VueNumeric from 'vue-numeric'
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'
// import VueMoment from 'vue-moment'
// import moment from 'moment-timezone'

Vue.use(BootstrapVue)
Vue.use(Toasted)
Vue.use(VueNumeric)
// Vue.use(VueMoment, {
//   moment
// })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
