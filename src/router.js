import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import store from '@/store'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('./forms/Dashboard.vue')
      // component: Home
    },
    {
      path: '/Test1',
      name: 'test1',
      component: () => import('./forms/Test1.vue')
    },
    {
      path: '/EmployeeLoanHistory',
      name: 'EmployeeLoanHistory',
      component: () => import('./forms/EmployeeLoanHistory.vue')
    },
    {
      path: '/EmployeeMaster',
      name: 'EmployeeMaster',
      component: () => import('./forms/EmployeeMaster.vue')
    },
    {
      path: '/EmployeeList',
      name: 'EmployeeList',
      component: () => import('./forms/EmployeeList.vue')
      // beforeEnter: (to, from, next) => {
      //   alert('store.state.authenticated:' + store.state.authenticated)
      //   if (!store.state.authenticated) {
      //     next({ name: 'sample' })
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/AddLoan',
      name: 'AddLoan',
      component: () => import('./forms/AddLoan.vue')
    },
    {
      path: '/MonthEndTransaction',
      name: 'MonthEndTransaction',
      component: () => import('./forms/MonthEndTransaction.vue')
    },
    {
      path: '/MonthEndTransactionList',
      name: 'MonthEndTransactionList',
      component: () => import('./forms/MonthEndTransactionList.vue')
    },
    {
      path: '/LoanSummary',
      name: 'LoanSummary',
      component: () => import('./forms/LoanSummary.vue')
    },
    {
      path: '/LoanHistory',
      name: 'LoanHistory',
      component: () => import('./forms/LoanHistory.vue')
    },
    {
      path: '/sample',
      name: 'sample',
      component: () => import('./forms/sample.vue')
    },
    {
      path: '/sample1',
      name: 'sample1',
      component: () => import('./forms/sample1.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
